import { supabase } from "@/lib/utils";
import { NextResponse } from "next/server";

/** Delay function */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Define TypeScript Interfaces */
interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  linkedin?: string;
  position?: string;
  client_id: number;
  personalization?: string | Record<string, string>;
}

interface Client {
  subdomain?: string;
  status?: string;
}

/**
 * Function to construct landing page URL in `{firstNameLastInitial}.{companySlug}` format.
 */
function constructLandingPageURL(lead: Lead) {
  if (!lead.first_name || !lead.last_name || !lead.company) {
    console.warn("🚨 Missing lead details for landing page:", lead);
    return `/landing-page/${encodeURIComponent(lead.id)}?linkedin=true`; // Fallback
  }
  const firstName = lead.first_name.toLowerCase();
  const lastInitial = lead.last_name.charAt(0).toLowerCase();
  const companySlug = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `/${firstName}${lastInitial}.${companySlug}`;
}

/**
 * Function to construct the correct landing page URL.
 */
function constructURLWithSubdomain(lead: Lead, client: Client, queryParam = "") {
  const basePath = constructLandingPageURL(lead);
  if (client?.subdomain && client.status === "verified") {
    return `https://${client.subdomain}${basePath}${queryParam}`;
  }
  return `https://default-landing-page.com${basePath}${queryParam}`;
}

export async function POST(req: Request) {
  try {
    const { campaignId } = await req.json();
    if (!campaignId) {
      return NextResponse.json({ error: "Missing campaignId" }, { status: 400 });
    }

    console.log(`🚀 Starting message sequence for campaign ${campaignId}`);

    // FIRST: Fetch the campaign details (including its client_id and cookies)
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("id, client_id, cookies")
      .eq("id", campaignId)
      .single();

    if (campaignError || !campaign) {
      console.error("❌ Error fetching campaign:", campaignError);
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Use the campaign's client_id to fetch the relevant leads.
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("id, first_name, last_name, company, linkedin, position, client_id, personalization")
      .eq("message_sent", false)
      .eq("is_open_profile", true)
      .eq("client_id", campaign.client_id);

    if (leadsError || !leads || leads.length === 0) {
      return NextResponse.json({ message: "No unsent leads found for this campaign" });
    }

    console.log(`✅ Found ${leads.length} unsent leads for campaign ${campaignId}`);

    // Loop over each lead
    for (const lead of leads) {
      // Fetch client details from the clients table
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .select("subdomain, status")
        .eq("id", lead.client_id)
        .single();

      if (clientError) {
        console.error(`❌ Error fetching client details for lead ${lead.id}:`, clientError);
        continue;
      }

      // Fetch message template from client_content for this client
      const { data: clientContent, error: contentError } = await supabase
        .from("client_content")
        .select("initial_message_template, initial_message_subject")
        .eq("client_id", lead.client_id)
        .single();

      if (contentError || !clientContent) {
        console.error(`❌ Error fetching message template for lead ${lead.id}:`, contentError);
        continue;
      }

      // Construct landing page URLs:
      const landingPageURL = constructURLWithSubdomain(lead, client, "?linkedin=true");
      const cpdLandingPage = `https://costperdemo.com${constructLandingPageURL(lead)}`;

      // Parse personalization JSON safely
      let customFields: Record<string, string> = {};
      try {
        if (typeof lead.personalization === "string") {
          customFields = JSON.parse(lead.personalization);
        } else if (typeof lead.personalization === "object" && lead.personalization !== null) {
          customFields = lead.personalization;
        }
      } catch (error) {
        console.error("Error parsing personalization JSON:", error);
      }

      // Personalize the message
      const baseMessage =
        clientContent.initial_message_template ||
        "Hello {first_name} at {company}, check this out: {landingpage}";
      const subject = clientContent.initial_message_subject || "Quick Opportunity";

      let personalizedMessage = baseMessage
        .replace("{first_name}", lead.first_name ?? "there")
        .replace("{company}", lead.company ?? "your company")
        .replace("{landingpage}", landingPageURL)
        .replace("{cpdlanding}", cpdLandingPage);

      // Replace any {custom.KEY} placeholders with values from the personalization JSON:
      personalizedMessage = personalizedMessage.replace(/\{custom\.(.*?)\}/g, (_: string, key: string) => {
        return customFields[key] ?? `{custom.${key}}`;
      });
      // Ensure \n renders as newlines
      personalizedMessage = personalizedMessage.replace(/\\n/g, "\n");

      console.log(`📩 Sending message to ${lead.first_name} at ${lead.company}`);

      // Use campaign cookies (already fetched) for sending the message
      if (!campaign.cookies) {
        console.error(`❌ No cookies available for campaign ${campaignId}`);
        continue;
      }
      const cookies = {
        li_a: campaign.cookies.li_a,
        li_at: campaign.cookies.li_at,
      };

      // Call external API to send message
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