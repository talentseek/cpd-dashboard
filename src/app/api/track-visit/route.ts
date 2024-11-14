// src/app/api/track-visit/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientId, leadId, channel, userAgent } = body;

    // Validate required fields
    if (!clientId || !leadId) {
      return NextResponse.json(
        { error: 'Invalid clientId or leadId' },
        { status: 400 }
      );
    }

    // Log received data for debugging
    console.log('Received data:', { clientId, leadId, channel, userAgent });

    // Example: Add logic to determine if the device is mobile or not
    const isMobile = /Mobile|Android|iP(ad|hone)/i.test(userAgent);

    // Insert visit data (excluding user_agent)
    const { error } = await supabase.from('abm_page_visits').insert([
      {
        client_id: clientId,
        lead_id: leadId,
        channel: channel || '',
        visited_at: new Date(),
        is_mobile: isMobile,
        // Note: `ip_address` is missing here, consider adding logic to capture it if required
      },
    ]);

    if (error) {
      console.error('Error inserting visit data into Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to track visit' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Visit tracked successfully' });
  } catch (err) {
    console.error('Unexpected error handling POST request:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}