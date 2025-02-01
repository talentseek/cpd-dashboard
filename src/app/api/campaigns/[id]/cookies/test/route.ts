import { NextResponse } from "next/server";
import { supabase } from "@/lib/utils";
import { NODE_API_URL } from "@/lib/apiConfig"; // Import centralized API config

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: campaignId } = await context.params;

  try {
    // Fetch cookies from the database
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

    // ✅ Call Node.js API to validate cookies
    const response = await fetch(`${NODE_API_URL}/api/validate-cookies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ li_a, li_at }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      console.warn("Cookie validation failed:", errorMsg);

      await supabase
        .from("campaigns")
        .update({ cookies_status: "invalid" })
        .eq("id", campaignId);

      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { message } = await response.json();

    // ✅ Update Supabase with the validation status
    const status = message.includes("valid") ? "valid" : "invalid";
    await supabase
      .from("campaigns")
      .update({ cookies_status: status })
      .eq("id", campaignId);

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Unexpected error during cookie validation:", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}