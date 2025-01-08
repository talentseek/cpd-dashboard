import { NextRequest, NextResponse } from 'next/server';
import { PostgrestError } from '@supabase/supabase-js';

interface Lead {
id: number;
search_url_id: number;
first_name: string;
last_name: string;
position: string;
company: string;
linkedin: string;
website?: string | null;
is_duplicate: boolean;
is_open_profile: boolean;
message_sent: boolean;
created_at: string;
}
import { supabase } from '@/lib/utils';

// GET: Fetch leads
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get('campaign_id');
  const searchUrlId = searchParams.get('search_url_id');

  try {
    if (campaignId) {
      // Get search URLs for the campaign
      const { data: searchUrls, error: searchUrlError } = await supabase
        .from('search_urls')
        .select('id')
        .eq('campaign_id', campaignId);

      if (searchUrlError || !searchUrls) {
        throw new Error('Failed to fetch search URLs');
      }

      const searchUrlIds = searchUrls.map((url) => url.id);

      // Get leads linked to those search URLs
    const { data: leads, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .in('search_url_id', searchUrlIds) as {
        data: Lead[] | null;
        error: PostgrestError | null;
    };
    

      if (leadError) {
        throw new Error('Failed to fetch leads');
      }

      return NextResponse.json({ data: leads });
    }

    if (searchUrlId) {
      // Fetch leads for a specific search URL
    const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('search_url_id', searchUrlId) as {
        data: Lead[] | null;
        error: PostgrestError | null;
    };

      if (error) {
        throw new Error('Failed to fetch leads');
      }

      return NextResponse.json({ data: leads });
    }

    // Default: Fetch all leads
    const { data: allLeads, error } = await supabase
        .from('leads')
        .select('*') as {
            data: Lead[] | null;
            error: PostgrestError | null;
        };
    if (error) {
      throw new Error('Failed to fetch leads');
    }

    return NextResponse.json({ data: allLeads });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}

// POST: Add a new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      search_url_id,
      first_name,
      last_name,
      position,
      company,
      linkedin,
      website,
      is_duplicate,
      is_open_profile,
      message_sent,
    } = body;

    if (!search_url_id || !first_name || !last_name || !position || !company || !linkedin) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('leads')
        .insert([
      {
        search_url_id,
        first_name,
        last_name,
        position,
        company,
        linkedin,
        website: website || null,
        is_duplicate: is_duplicate || false,
        is_open_profile: is_open_profile || false,
        message_sent: message_sent || false,
      },
    ]);

    if (error) {
      console.error('Error inserting lead:', error);
      return NextResponse.json({ error: 'Failed to insert lead' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    console.error('Error in POST /api/leads:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE: Remove a lead by its ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get('id');

    // Validate input
    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    // Delete the lead
    const { data, error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId) as {
            data: Lead[] | null;
            error: PostgrestError | null;
        };

    if (error) {
      console.error('Error deleting lead:', error);
      return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No lead found with the provided ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Lead deleted successfully', data });
  } catch (error: unknown) {
    console.error('Error in DELETE /api/leads:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}