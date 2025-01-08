import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

// Add a new search URL
export async function POST(req: Request) {
  try {
    const { campaign_id, url } = await req.json();

    // Validate input
    if (!campaign_id || !url) {
      return NextResponse.json(
        { error: 'campaign_id and url are required.' },
        { status: 400 }
      );
    }

    // Insert the new search URL into the database
    const { data, error } = await supabase
      .from('search_urls')
      .insert({ campaign_id, url, status: 'pending' })
      .select();

    if (error) {
      console.error('Error inserting search URL:', error);
      return NextResponse.json({ error: 'Failed to add search URL.' }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/search-urls:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}

// Retrieve all search URLs
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('search_urls')
      .select('*');

    if (error) {
      console.error('Error fetching search URLs:', error);
      return NextResponse.json({ error: 'Failed to fetch search URLs.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Error in GET /api/search-urls:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}