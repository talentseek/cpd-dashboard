import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

/** Delay function */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** Define TypeScript Interfaces */
interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  linkedin?: string;
  position?: string;
  client_id: number;
}

interface Client {
  subdomain?: string;
  status?: string;
}

/**
 * Function to construct landing page URL in `{firstNameLastInitial}.{companySlug}` format.
 */
function constructLandingPageURL(lead: Lead, client: Client) {
  if (!lead.first_name || !lead.last_name || !lead.company) {
    console.warn("🚨 Missing lead details for landing page:", lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`; // Fallback
  }

  // Extract first name and first initial of last name
  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();

  // Convert company name to a clean slug (remove spaces, special chars)
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Construct the personalized landing page path
  const landingPagePath = `${firstName}${lastInitial}.${companySlug}`;

  // If client has a verified subdomain, use it
  if (client?.subdomain && client.status === "verified") {
    return `https://${client.subdomain}/${landingPagePath}?linkedin=true`;
  }

  // Default fallback if no verified subdomain exists
  return `https://default-landing-page.com/${landingPagePath}?linkedin=true`;
}

export async function POST(req: Request) {
  try {
    const { campaignId } = await req.json();
    if (!campaignId) {
      return NextResponse.json({ error: "Missing campaignId" }, { status: 400 });
    }

    console.log(`🚀 Starting message sequence for campaign ${campaignId}`);

    // Fetch leads for this campaign that haven't been messaged and have an open profile
    const { data: searchUrls, error: searchError } = await supabase
      .from("search_urls")
      .select("id")
      .eq("campaign_id", campaignId);

    if (searchError || !searchUrls || searchUrls.length === 0) {
      console.error(`❌ No search URLs found for campaign ${campaignId}`);
      return NextResponse.json({ message: "No matching search URLs found" });
    }

    const searchUrlIds = searchUrls.map(url => url.id);

    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("id, first_name, last_name, company, linkedin, position, client_id")
      .in("search_url_id", searchUrlIds)
      .eq("message_sent", false)
      .eq("is_open_profile", true);

    if (leadsError || !leads || leads.length === 0) {
      return NextResponse.json({ message: "No unsent leads found" });
    }

    console.log(`✅ Found ${leads.length} unsent leads for campaign ${campaignId}`);

    for (const lead of leads) {
      // Fetch client details
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("subdomain, status")
        .eq("id", lead.client_id)
        .single();

      if (clientError) {
        console.error(`❌ Error fetching client details for lead ${lead.id}:`, clientError);
        continue; // Skip this lead if client details can't be retrieved
      }

      // Fetch the initial message template and subject
      const { data: clientContent, error: contentError } = await supabase
        .from("client_content")
        .select("initial_message_template, initial_message_subject")
        .eq("client_id", lead.client_id)
        .single();

      if (contentError || !clientContent) {
        console.error(`❌ Error fetching message template for lead ${lead.id}:`, contentError);
        continue;
      }

      // Construct the correct landing page URL
      const landingPageURL = constructLandingPageURL(lead, client);

      // Personalize message
      const baseMessage = clientContent.initial_message_template || 
        "Hello {first_name} at {company}, check this out: {landingpage}";
      const subject = clientContent.initial_message_subject || "Quick Opportunity";

      const personalizedMessage = baseMessage
        .replace("{first_name}", lead.first_name ?? "there")
        .replace("{company}", lead.company ?? "your company")
        .replace("{landingpage}", landingPageURL)
        .replace(/\\n/g, "\n"); // Ensure newlines render correctly

      console.log(`📩 Sending message to ${lead.first_name} at ${lead.company}`);

      // Fetch cookies for LinkedIn session
      const { data: campaignData, error: campaignError } = await supabase
        .from("campaigns")
        .select("cookies")
        .eq("id", campaignId)
        .single();

      if (campaignError || !campaignData?.cookies) {
        console.error(`❌ Error fetching cookies for campaign ${campaignId}:`, campaignError);
        continue;
      }

      const cookies = {
        li_a: campaignData.cookies.li_a,
        li_at: campaignData.cookies.li_at,
      };

      // Call the external message-sending API
      const response = await fetch("http://localhost:4000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cookies,
          leadUrl: lead.linkedin,
          message: {
            subject,
            content: personalizedMessage,
          },
        }),
      });

      if (!response.ok) {
        console.error(`❌ Failed to send message to ${lead.first_name}:`, await response.text());
        continue;
      }

      console.log(`✅ Successfully sent message to ${lead.first_name}`);

      // Mark lead as messaged
      await supabase.from("leads").update({ message_sent: true }).eq("id", lead.id);

      // Wait before sending the next message
      console.log("⏳ Waiting 30 seconds before sending the next message...");
      await delay(30000);
    }

    return NextResponse.json({ message: "Message sequence completed" });
  } catch (error) {
    console.error("❌ Error in message sequence:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}