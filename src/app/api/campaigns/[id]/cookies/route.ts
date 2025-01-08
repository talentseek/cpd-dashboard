import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

// GET: Fetch cookies for a campaign
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15, params must be awaited
    const { id: campaignId } = await context.params;

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    // Fetch cookies from the database
    const { data, error } = await supabase
      .from('campaigns')
      .select('cookies')
      .eq('id', campaignId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Cookies not found for this campaign' },
        { status: 404 }
      );
    }

    return NextResponse.json({ cookies: data.cookies }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PATCH: Update cookies for a campaign
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await context.params to avoid the sync access error
    const { id: campaignId } = await context.params;

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    // Parse the request body
    const { cookies } = await request.json();

    if (
      !cookies ||
      typeof cookies.li_a !== 'string' ||
      typeof cookies.li_at !== 'string' ||
      !cookies.li_a.trim() ||
      !cookies.li_at.trim()
    ) {
      return NextResponse.json({ error: 'Invalid cookies provided' }, { status: 400 });
    }

    // Update the campaign cookies in the database
    const { error } = await supabase
      .from('campaigns')
      .update({ cookies })
      .eq('id', campaignId);

    if (error) {
      console.error('Database update error:', error.message || error);
      return NextResponse.json(
        { error: 'Failed to update cookies in the database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Cookies updated successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}