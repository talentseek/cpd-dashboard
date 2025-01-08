import { NextRequest, NextResponse } from 'next/server';
import { scrapeLeads } from '@/utils/leadScraper';
import { supabase } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { search_url_id } = await req.json();

    if (!search_url_id) {
      return NextResponse.json({ error: 'Missing search_url_id' }, { status: 400 });
    }

    // Fetch the search URL from the database
    const { data: searchUrlEntry, error: fetchError } = await supabase
      .from('search_urls')
      .select('id, url, campaign_id, status')
      .eq('id', search_url_id)
      .single();

    if (fetchError || !searchUrlEntry) {
      return NextResponse.json({ error: 'Search URL not found or database error' }, { status: 404 });
    }

    const { url, campaign_id, status } = searchUrlEntry;

    if (status === 'in progress') {
      return NextResponse.json({ error: 'Scraping already in progress for this URL' }, { status: 400 });
    }

    // Update search URL status to "in progress"
    await supabase.from('search_urls').update({ status: 'in progress' }).eq('id', search_url_id);

    try {
      // Perform scraping
      const scrapeResults = await scrapeLeads(url, campaign_id);

      // Save leads to Supabase
      const { data: savedLeads, error: saveError } = await supabase
        .from('leads')
        .insert(
          scrapeResults.leads.map((lead) => ({
            search_url_id,
            ...lead,
          }))
        );

      if (saveError) {
        console.error('Error saving leads:', saveError);
        throw new Error('Failed to save leads');
      }

      // Update search URL status to "completed"
      await supabase
        .from('search_urls')
        .update({ status: 'completed' })
        .eq('id', search_url_id);

      return NextResponse.json({
        message: 'Scraping completed successfully',
        scrapeResults,
        savedLeads,
      });
    } catch (scrapingError: unknown) {
      console.error('Scraping error:', scrapingError);

      // Update search URL status to "failed"
      await supabase
        .from('search_urls')
        .update({ status: 'failed' })
        .eq('id', search_url_id);

      if (scrapingError instanceof Error) {
        return NextResponse.json({ error: scrapingError.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An error occurred during scraping' }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Unexpected error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}