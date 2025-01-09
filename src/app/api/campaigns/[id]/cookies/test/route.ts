import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils";
import { testCookies } from "@/utils/scrapers/testCookies";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: campaignId } = await context.params;

  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("cookies, cookies_status")
      .eq("id", campaignId)
      .single();

    if (error || !data?.cookies) {
      console.error("Error fetching campaign cookies:", error || "No cookies found");
      return NextResponse.json({ error: "Failed to fetch cookies" }, { status: 404 });
    }

    const { li_a, li_at } = data.cookies;

    try {
      const message = await testCookies(li_a, li_at);

      await supabase
        .from("campaigns")
        .update({ cookies_status: "valid" })
        .eq("id", campaignId);

      return NextResponse.json({ message });
    } catch (validationError) {
    const errorMessage = 
        validationError && 
        typeof validationError === 'object' && 
        'message' in validationError && 
        typeof validationError.message === 'string'
        ? validationError.message
        : 'Invalid cookies detected.';

    console.warn("Cookie validation failed:", errorMessage);

    await supabase
        .from("campaigns")
        .update({ cookies_status: "invalid" })
        .eq("id", campaignId);

    return NextResponse.json(
        {
        error: errorMessage,
        },
        { status: 400 }
    );
    }
  } catch (error) {
    console.error("Unexpected error during cookie validation:", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}