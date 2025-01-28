import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils";
import { scrapeLinkedInProfiles } from "@/utils/scrapers/scrapeLinkedInProfiles";
import { ScrapedLead } from "@/types/scraping";

/**
 * POST /api/leads/scrape/premium
 *
 * Body JSON:
 *   {
 *     "campaignId": number,
 *     "salesNavigatorUrl": string
 *   }
 *
 * 1. Fetch cookies for the given campaign
 * 2. Insert the "salesNavigatorUrl" into "search_urls"
 * 3. Call the scraping function to get ScrapedLead[]
 * 4. Map those leads to the DB "leads" structure
 * 5. Insert them, then update "search_urls" status
 */
export async function POST(request: Request) {
  try {
    const { campaignId, salesNavigatorUrl } = await request.json();

    if (!campaignId || !salesNavigatorUrl) {
      return NextResponse.json(
        { error: "campaignId and salesNavigatorUrl are required." },
        { status: 400 }
      );
    }

    // 1) Fetch cookies from the 'campaigns' table
    const { data: campaignData, error: fetchError } = await supabase
      .from("campaigns")
      .select("cookies")
      .eq("id", campaignId)
      .single();

    if (fetchError || !campaignData?.cookies) {
      console.error(
        "Error fetching cookies from DB:",
        fetchError?.message || "No cookies found."
      );
      return NextResponse.json(
        { error: "Failed to fetch cookies for this campaign." },
        { status: 404 }
      );
    }

    const { li_a, li_at } = campaignData.cookies;
    if (!li_a || !li_at) {
      return NextResponse.json(
        { error: "Invalid or missing cookies for the campaign." },
        { status: 400 }
      );
    }

    // 2) Insert the Sales Navigator URL into the "search_urls" table
    const { data: searchUrlData, error: insertSearchUrlError } = await supabase
      .from("search_urls")
      .insert({
        campaign_id: campaignId,
        url: salesNavigatorUrl,
        status: "pending",
      })
      .select()
      .single();

    if (insertSearchUrlError) {
      console.error(
        "Error inserting Sales Navigator URL into DB:",
        insertSearchUrlError.message
      );
      return NextResponse.json(
        { error: "Failed to save the Sales Navigator URL." },
        { status: 500 }
      );
    }

    const searchUrlId = searchUrlData.id;

    // 3) Scrape LinkedIn profiles => returns ScrapedLead[]
    //    If your function lacks explicit types, cast the result:
    const profiles = (await scrapeLinkedInProfiles(salesNavigatorUrl, {
      li_a,
      li_at,
    })) as ScrapedLead[];

    // 4) Map ScrapedLead -> DB leads table
    //    We'll parse first_name, last_name from 'fullName'
    //    We'll store 'jobTitle' in 'position', 'isPremium' in 'is_premium_profile', etc.
    const leadsData = profiles.map((profile) => ({
      search_url_id: searchUrlId,
      first_name: profile.fullName?.split(" ")[0] ?? null,
      last_name: profile.fullName?.split(" ")[1] ?? null,
      linkedin: profile.profileLink ?? "",
      position: profile.jobTitle ?? null,
      company: profile.company ?? null,
      is_premium_profile: profile.isPremium ?? false,
      // If you want to store 'isOpen' or 'connectionLevel', add them to your DB columns if needed
      // e.g. is_open_profile: profile.isOpen, connection_level: profile.connectionLevel
    }));

    // 5) Insert new leads
    const { error: insertError } = await supabase
      .from("leads")
      .insert(leadsData);

    if (insertError) {
      console.error("Error inserting leads:", insertError.message);
      return NextResponse.json(
        { error: "Failed to save scraped profiles." },
        { status: 500 }
      );
    }

    // 6) Mark "search_urls" status as "completed"
    const { error: updateSearchUrlError } = await supabase
      .from("search_urls")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", searchUrlId);

    if (updateSearchUrlError) {
      console.error(
        "Error updating search URL status:",
        updateSearchUrlError.message
      );
      return NextResponse.json(
        { error: "Failed to update search URL status." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Scraping and saving profiles completed successfully.",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error during scraping:", errorMessage);
    return NextResponse.json(
      { error: "Scraping failed. Please check logs for details." },
      { status: 500 }
    );
  }
}