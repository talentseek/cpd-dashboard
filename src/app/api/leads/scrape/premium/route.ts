import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils";
import { scrapePremiumProfiles } from "@/utils/scrapers/scrapePremiumProfiles";
import { LinkedInProfile } from "@/types/linkedin";
export async function POST(request: Request) {
  try {
    const { campaignId, salesNavigatorUrl } = await request.json();

    // Validate input
    if (!campaignId || !salesNavigatorUrl) {
      return NextResponse.json(
        { error: "campaignId and salesNavigatorUrl are required." },
        { status: 400 }
      );
    }

    // Fetch cookies for the campaign
    const { data: campaignData, error: fetchError } = await supabase
      .from("campaigns")
      .select("cookies")
      .eq("id", campaignId)
      .single();

    if (fetchError || !campaignData?.cookies) {
      console.error("Error fetching cookies from database:", fetchError?.message || "No cookies found.");
      return NextResponse.json(
        { error: "Failed to fetch cookies for the campaign." },
        { status: 404 }
      );
    }

    const { li_a, li_at } = campaignData.cookies;

    // Validate cookies
    if (!li_a || !li_at) {
      console.error("Invalid or missing cookies:", { li_a, li_at });
      return NextResponse.json(
        { error: "Invalid or missing cookies for the campaign." },
        { status: 400 }
      );
    }

    // Add the Sales Navigator URL to the search_urls table
    const { data: searchUrlData, error: insertSearchUrlError } = await supabase
      .from("search_urls")
      .insert({ campaign_id: campaignId, url: salesNavigatorUrl, status: "pending" })
      .select()
      .single();

    if (insertSearchUrlError) {
      console.error("Error inserting Sales Navigator URL into the database:", insertSearchUrlError.message);
      return NextResponse.json(
        { error: "Failed to save the Sales Navigator URL to the database." },
        { status: 500 }
      );
    }

    const searchUrlId = searchUrlData.id;

    // Perform scraping
    const profiles = await scrapePremiumProfiles(salesNavigatorUrl, { li_a, li_at });

    // Insert scraped profiles into the leads table
    const leadsData = profiles.map((profile: LinkedInProfile) => ({
      search_url_id: searchUrlId,
    first_name: profile.name?.split(" ")[0] ?? null,
    last_name: profile.name?.split(" ")[1] ?? null,
    linkedin: profile.profileLink ?? "",
    position: profile.position ?? null,
    company: profile.company ?? null,
      is_premium_profile: profile.isPremium,
    }));

    const { error: insertError } = await supabase.from("leads").insert(leadsData);

    if (insertError) {
      console.error("Error inserting leads into the database:", insertError.message);
      return NextResponse.json(
        { error: "Failed to save scraped profiles to the database." },
        { status: 500 }
      );
    }

    // Update the search_urls table status to "completed"
    const { error: updateSearchUrlError } = await supabase
      .from("search_urls")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", searchUrlId);

    if (updateSearchUrlError) {
      console.error("Error updating search URL status:", updateSearchUrlError.message);
      return NextResponse.json(
        { error: "Failed to update the search URL status in the database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Scraping and saving profiles completed successfully." });
} catch (error: unknown) {
const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
console.error("Error during scraping:", errorMessage);
return NextResponse.json({ error: "Scraping failed. Please check logs for details." }, { status: 500 });
  }
}