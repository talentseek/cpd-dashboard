import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/utils'
import { scheduleMessages } from '@/lib/scheduling'

/**
 * POST /api/campaigns/[id]/schedule
 *
 * Body:
 *   {
 *     "leads": number[]
 *   }
 *
 * Response JSON:
 *   {
 *     success: boolean,
 *     data?: any[],
 *     error?: string
 *   }
 */
export async function POST(request: NextRequest) {
  try {
    // 1) Parse the `[id]` segment from the URL path
    //    e.g. /api/campaigns/123/schedule => segments[3] = "123"
    const { pathname } = new URL(request.url)
    const segments = pathname.split('/')
    // segments might be: ["", "api", "campaigns", "123", "schedule"]
    const idString = segments[3]
    const campaignId = parseInt(idString, 10)

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid campaign ID' },
        { status: 400 }
      )
    }

    // 2) Parse the request body
    const body = await request.json()
    const leads = body.leads as number[] | undefined

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Leads are required' },
        { status: 400 }
      )
    }

    // 3) Fetch campaign settings from the database
    const { data: campaignSettings, error: settingsError } = await supabase
      .from('messaging_settings')
      .select('*')
      .eq('campaign_id', campaignId)
      .single()

    if (settingsError || !campaignSettings) {
      throw new Error('Invalid or incomplete campaign settings')
    }

    const { start_time, end_time, ...restSettings } = campaignSettings
    if (!start_time || !end_time) {
      throw new Error('Campaign settings must include valid start_time and end_time')
    }

    // 4) Fetch message sequence for the campaign
    const { data: messageSequence, error: sequenceError } = await supabase
      .from('message_sequence_steps')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('step_order', { ascending: true })

    if (sequenceError || !messageSequence || messageSequence.length === 0) {
      throw new Error('Message sequence is missing or incomplete')
    }

    const firstStepBody = messageSequence[0]?.body || 'Hi {first_name}!'
    const firstStepSubject = messageSequence[0]?.subject || 'Demo Invitation'

    // 5) Fetch existing scheduled messages for the campaign
    const { data: existingScheduledMessages, error: scheduledError } = await supabase
      .from('scheduled_messages')
      .select('*')
      .eq('campaign_id', campaignId)

    if (scheduledError) {
      throw new Error('Failed to fetch existing scheduled messages')
    }

    // 6) Use your scheduling helper to create new messages
    const scheduledMessages = scheduleMessages({
      leads,
      campaignSettings: {
        ...restSettings,
        startTime: start_time,
        endTime: end_time,
      },
      messageSequence,
      existingScheduledMessages: existingScheduledMessages || [],
      rawMessage: firstStepBody,
      rawSubject: firstStepSubject,
    })

    // 7) Insert the newly scheduled messages into the database
    const { data: insertedMessages, error: insertError } = await supabase
      .from('scheduled_messages')
      .insert(scheduledMessages)
      .select('*')

    if (insertError) {
      throw new Error('Failed to insert scheduled messages')
    }

    return NextResponse.json({ success: true, data: insertedMessages })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error scheduling messages:', errorMessage)
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}