import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    // For a route like /api/campaigns/8/leads, split the pathname:
    const segments = req.nextUrl.pathname.split("/");
    // segments might be ["", "api", "campaigns", "8", "leads"]
    const id = segments[3]; 
    const campaignId = parseInt(id, 10);

    // Remove premium_profiles_found, duplicates, etc. from the .select(...) call
    const { data: results, error: resultsError } = await supabase
      .from("search_urls")
      .select(
        "url, open_profiles_found, other_profiles_found, status"
      )
      .eq("campaign_id", campaignId);

    if (resultsError) {
      throw new Error(resultsError.message);
    }

    // Calculate totals (only open_profiles_found + other_profiles_found)
    const totals = results.reduce(
      (acc, result) => {
        acc.openProfiles += result.open_profiles_found || 0;
        acc.otherProfiles += result.other_profiles_found || 0;
        return acc;
      },
      { openProfiles: 0, otherProfiles: 0 }
    );

    return NextResponse.json({
      // Return only the existing columns
      results: results.map((result) => ({
        url: result.url,
        openProfiles: result.open_profiles_found || 0,
        otherProfiles: result.other_profiles_found || 0,
        status: result.status,
      })),
      totals, // { openProfiles, otherProfiles }
    });
} catch (error) {
const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
console.error("Error fetching leads data:", errorMessage);
return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}