import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/utils";
import { PostgrestError } from "@supabase/supabase-js";

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  company: string;
  linkedin: string;
  website?: string | null;
  is_duplicate: boolean;
  is_open_profile: boolean;
  message_sent: boolean;
  status: string;
  client_id: number;
  created_at: string;
}

// ✅ GET: Fetch leads with filtering
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const clientId = searchParams.get("client_id");
  const status = searchParams.get("status");
  const messageSent = searchParams.get("message_sent");
  const isOpenProfile = searchParams.get("is_open_profile");

  try {
    let query = supabase.from("leads").select("*");

    if (id) query = query.eq("id", id);
    if (clientId) query = query.eq("client_id", clientId);
    if (status) query = query.eq("status", status);
    if (messageSent !== null) query = query.eq("message_sent", messageSent === "true");
    if (isOpenProfile !== null) query = query.eq("is_open_profile", isOpenProfile === "true");

    const { data, error } = await query;
    if (error) {
      throw new Error("Failed to fetch leads");
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    console.error("Error in GET /api/leads:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ PATCH: Update lead status
export async function PATCH(req: NextRequest) {
  try {
    const { leadId, status } = await req.json();

    if (!leadId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate status
    const validStatuses = [
      "not_replied",
      "not_interested",
      "interested",
      "follow_up_needed",
      "demo_booked",
      "unqualified",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // ✅ Update the status in Supabase
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    if (error) {
      console.error("Error updating lead status:", error);
      return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
    }

    return NextResponse.json({ message: "Lead status updated successfully" });
  } catch (error: unknown) {
    console.error("Error in PATCH /api/leads:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
