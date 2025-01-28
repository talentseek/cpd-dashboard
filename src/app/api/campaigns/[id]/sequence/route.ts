import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/utils';
import {
  MessageTemplate,
  SequenceStep,
  FormattedSequenceStep,
  ApiErrorResponse,
} from '@/types/campaign';

/** 
 * Shape of each message in the request body for the POST route
 * Example: { subject: 'Hello', body: '...', delay: 30 }
 */
interface SequenceMessage {
  subject: string;
  body: string;
  delay: number;
}

/**
 * GET /api/campaigns/[id]/sequence
 * 
 * Returns array of formatted sequence steps (subject, body, delay).
 */
export async function GET(request: NextRequest) {
  try {
    // 1) Extract `[id]` from the URL path
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    // e.g. /api/campaigns/123/sequence => segments[3] = "123"
    const idString = segments[3];
    const campaignId = parseInt(idString, 10);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' } as ApiErrorResponse,
        { status: 400 }
      );
    }

    // 2) Fetch sequence steps from the DB
    const { data: sequenceSteps, error } = await supabase
      .from('message_sequence_steps')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('step_order', { ascending: true });

    if (error) {
      throw new Error('Failed to fetch sequence steps');
    }

    if (!sequenceSteps || sequenceSteps.length === 0) {
      console.warn(`No sequence steps found for campaign ID: ${campaignId}`);
      return NextResponse.json([]);
    }

    // 3) Parse & format each step’s message_template
    const formattedSteps: FormattedSequenceStep[] = sequenceSteps.map((step) => {
      let messageTemplate: MessageTemplate;
      try {
        messageTemplate = JSON.parse(step.message_template);
      } catch (parseError) {
        console.error(
          `Error parsing message_template for step ID: ${step.id}`,
          parseError
        );
        messageTemplate = { subject: '(No Subject)', body: '(No Body)' };
      }

      return {
        id: step.id,
        step_order: step.step_order,
        subject: messageTemplate.subject || '(No Subject)',
        body: messageTemplate.body || '(No Body)',
        delay: step.delay_min, // same as delay_max
      };
    });

    console.log('Formatted sequence steps:', formattedSteps);
    return NextResponse.json(formattedSteps);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching sequence:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/campaigns/[id]/sequence
 *
 * Body: array of messages like:
 *   [
 *     { subject: 'Hello', body: 'Body text', delay: 30 },
 *     { subject: 'Follow up', body: 'More text', delay: 60 },
 *   ]
 *
 * Overwrites the existing steps in `message_sequence_steps`.
 */
export async function POST(request: NextRequest) {
  try {
    // 1) Extract `[id]` from the URL path
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    const idString = segments[3];
    const campaignId = parseInt(idString, 10);

    if (isNaN(campaignId)) {
      return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
    }

    // 2) Parse the request body as an array of SequenceMessage
    const rawBody = await request.json();
    if (!Array.isArray(rawBody)) {
      return NextResponse.json({ error: 'Body must be an array of messages' }, { status: 400 });
    }
    const messages: SequenceMessage[] = rawBody;

    // 3) Convert each message to a SequenceStep
    const sequenceSteps: SequenceStep[] = messages.map((msg, index) => ({
      campaign_id: campaignId,
      step_order: index + 1,
      message_template: JSON.stringify({
        subject: msg.subject,
        body: msg.body,
      }),
      delay_min: msg.delay,
      delay_max: msg.delay,
    }));

    // 4) Delete old sequence steps for the campaign
    const { error: deleteError } = await supabase
      .from('message_sequence_steps')
      .delete()
      .eq('campaign_id', campaignId);

    if (deleteError) {
      throw new Error('Failed to clear existing sequence');
    }

    // 5) Insert the new sequence steps
    const { error: insertError } = await supabase
      .from('message_sequence_steps')
      .insert(sequenceSteps);

    if (insertError) {
      throw new Error('Failed to save sequence steps');
    }

    console.log(`Sequence steps saved for campaign ID: ${campaignId}`);
    return NextResponse.json({ message: 'Sequence saved successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error saving sequence:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}