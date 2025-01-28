import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

interface MessagingSettings {
    maxMessagesPerDay: number;
    timeDelayBetweenMessages: number;
    startTime: string;
    endTime: string;
    timeZone: string;
}

// GET handler: returns existing settings or default settings
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the dynamic params
    const { id } = await params;
    const campaignId = parseInt(id, 10);

    if (isNaN(campaignId)) {
      return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
    }

    // Fetch the existing settings for this campaign
    const { data: existingSettings, error: fetchError } = await supabase
      .from('messaging_settings')
      .select('*')
      .eq('campaign_id', campaignId)
      .single();

    // If there's an error other than "row not found" (PGRST116), throw it
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // If no settings row found, return defaults
    if (!existingSettings) {
    return NextResponse.json({
        maxMessagesPerDay: 50,
        timeDelayBetweenMessages: 30,
        startTime: '09:00',
        endTime: '17:00',
        timeZone: 'UTC',
    } as MessagingSettings);
    }

    // Otherwise, return the existing settings in a consistent shape
    const settings: MessagingSettings = {
        maxMessagesPerDay: existingSettings.max_messages_per_day,
        timeDelayBetweenMessages: existingSettings.time_delay_between_messages,
        startTime: existingSettings.start_time,
        endTime: existingSettings.end_time,
        timeZone: existingSettings.time_zone,
    };
    return NextResponse.json(settings);
} catch (error) {
const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
console.error('Error fetching settings:', errorMessage);
return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST handler: create or update one row per campaign
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the dynamic params
    const { id } = await params;
    const campaignId = parseInt(id, 10);

    if (isNaN(campaignId)) {
      return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
    }

    const body = await request.json() as MessagingSettings;
    const {
    maxMessagesPerDay,
    timeDelayBetweenMessages,
    startTime,
    endTime,
    timeZone,
    } = body;

    // Check if a row already exists for this campaign
    const { data: existingSettings, error: fetchError } = await supabase
      .from('messaging_settings')
      .select('id')
      .eq('campaign_id', campaignId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingSettings) {
      // Update the existing row
      const { error: updateError } = await supabase
        .from('messaging_settings')
        .update({
          max_messages_per_day: maxMessagesPerDay,
          time_delay_between_messages: timeDelayBetweenMessages,
          start_time: startTime,
          end_time: endTime,
          time_zone: timeZone,
        })
        .eq('id', existingSettings.id);

      if (updateError) {
        throw updateError;
      }

      // Return the updated settings in the same shape
      return NextResponse.json({
        maxMessagesPerDay,
        timeDelayBetweenMessages,
        startTime,
        endTime,
        timeZone,
      });
    }

    // Otherwise, insert a new row
    const { error: insertError } = await supabase
      .from('messaging_settings')
      .insert({
        campaign_id: campaignId,
        max_messages_per_day: maxMessagesPerDay,
        time_delay_between_messages: timeDelayBetweenMessages,
        start_time: startTime,
        end_time: endTime,
        time_zone: timeZone,
      });

    if (insertError) {
      throw insertError;
    }

    // Return the newly created settings
    return NextResponse.json({
      maxMessagesPerDay,
      timeDelayBetweenMessages,
      startTime,
      endTime,
      timeZone,
    });
} catch (error) {
const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
console.error('Error handling settings:', errorMessage);
return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}