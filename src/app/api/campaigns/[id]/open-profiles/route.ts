import { NextResponse } from 'next/server'
import { supabase } from '@/lib/utils'

/**
 * GET /api/campaigns/[id]/open-profiles
 *
 * Query string:
 *   ?page=1&limit=25
 *
 * Response JSON:
 *   {
 *     leads: [...],
 *     total: number,
 *     page: number,
 *     limit: number
 *   }
 */
export async function GET(request: Request) {
  try {
    // 1) Extract the `[id]` segment from the URL path
    //    e.g. /api/campaigns/123/open-profiles => segments[3] = "123"
    const { pathname, searchParams } = new URL(request.url)
    const segments = pathname.split('/')

    // For a route like:
    //   /api/campaigns/[id]/open-profiles
    // segments might be: ["", "api", "campaigns", "123", "open-profiles"]
    const idString = segments[3]
    const campaignId = parseInt(idString, 10)

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' },
        { status: 400 }
      )
    }

    // 2) Parse query params for pagination (e.g. ?page=2&limit=10)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '25', 10)
    const offset = (page - 1) * limit

    // 3) Fetch all search_urls for this campaign
    const { data: searchUrls, error: searchError } = await supabase
      .from('search_urls')
      .select('id')
      .eq('campaign_id', campaignId)

    if (searchError || !searchUrls || searchUrls.length === 0) {
      // No search URLs => no leads
      return NextResponse.json({ leads: [], total: 0, page, limit })
    }

    const searchUrlIds = searchUrls.map((url) => url.id)

    // 4) Fetch leads with is_open_profile = true, applying pagination
    const { data: leads, count, error: leadsError } = await supabase
      .from('leads')
      .select('id, first_name, last_name, position, linkedin, is_open_profile, company', {
        count: 'exact',
      })
      .in('search_url_id', searchUrlIds)
      .eq('is_open_profile', true)
      .range(offset, offset + limit - 1)

    if (leadsError) {
      throw new Error('Failed to fetch open profiles')
    }

    // 5) Return JSON
    return NextResponse.json({
      leads: leads ?? [],
      total: count ?? 0,
      page,
      limit,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred'
    console.error('Error fetching open profiles:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}