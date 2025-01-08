import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils';

// Note that the second arg has `params` as a Promise
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Destructure asynchronously
  const { id: searchUrlId } = await context.params;

  try {
    const { status, url } = await request.json();

    // Validate input
    if (!searchUrlId) {
      return NextResponse.json(
        { error: 'Search URL ID is required' },
        { status: 400 }
      );
    }
    if (!status && !url) {
      return NextResponse.json(
        {
          error: 'At least one field (status or URL) must be provided',
        },
        { status: 400 }
      );
    }

    // Build update payload
    const updateData: { status?: string; url?: string; updated_at: string } = {
      updated_at: new Date().toISOString(),
    };
    if (status) updateData.status = status;
    if (url) updateData.url = url;

    // Update the search URL in the database
    const { data, error } = await supabase
      .from('search_urls')
      .update(updateData)
      .eq('id', searchUrlId)
      .select();

    if (error) {
      console.error('Error updating search URL:', error.message || error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in PATCH /search-urls/:id:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}