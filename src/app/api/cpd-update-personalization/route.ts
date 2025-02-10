import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

interface UpdateObj {
  personalization: unknown;
  first_name: string;
  company: string;
  website?: string;
  company_data?: unknown;
}

// ✅ GET: Fetch CostPerDemo leads that have an empty personalization field AND are open profiles
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("id, first_name, last_name, company, position, personalization, linkedin, website, company_data")
      .eq("client_id", 22)
      .eq("is_open_profile", true)
      .or("personalization.is.null,personalization.eq.{}");

    if (error) {
      console.error("❌ Error fetching leads:", error);
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }

    console.log(`✅ Fetched ${data.length} leads with missing personalization`);
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Unexpected server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Now updates personalization, first_name, company, and optionally website and company_data
export async function PATCH(req: Request) {
  try {
    const { leadId, personalization, first_name, company, website, company_data } = await req.json();

    // Parse the personalization data (if it is a string) so we update with an object.
    let parsedPersonalization: unknown;
    try {
      parsedPersonalization =
        typeof personalization === "string"
          ? JSON.parse(personalization)
          : personalization;
    } catch (error) {
      console.error("Error parsing personalization JSON:", error);
      return NextResponse.json({ error: "Invalid personalization JSON format" }, { status: 400 });
    }

    // Build the update object using our defined interface.
    const updateObj: UpdateObj = {
      personalization: parsedPersonalization,
      first_name,
      company,
    };

    if (website !== undefined) {
      updateObj.website = website;
    }
    if (company_data !== undefined) {
      updateObj.company_data = company_data;
    }

    const { error } = await supabase
      .from("leads")
      .update(updateObj)
      .eq("id", leadId);

    if (error) {
      console.error("❌ Error updating lead:", error);
      return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }

    console.log(`✅ Successfully updated lead ID: ${leadId}`);
    return NextResponse.json({ message: "Lead updated successfully" });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}