import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object
    const { id } = await context.params;
    if (!id) {
      throw new Error("Missing or invalid campaign ID");
    }

    const campaignId = parseInt(id, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json({ error: "Invalid campaign ID" }, { status: 400 });
    }

    // Fetch campaign data
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("client_id")
      .eq("id", campaignId)
      .single();

    if (error || !campaign) {
      throw new Error(error?.message || "Campaign not found");
    }

    return NextResponse.json({ client_id: campaign.client_id });
} catch (error) {
const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
console.error('Error fetching campaign data:', errorMessage);
return NextResponse.json({ error: errorMessage }, { status: 500 });
}
}