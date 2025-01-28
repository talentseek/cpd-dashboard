// src/tasks/handlers/scrapeLinkedInProfiles.ts

import { supabase } from "@/lib/utils";
import type { TaskData, ScrapeResult } from "@/types/tasks"; // Import TaskData and ScrapeResult types

interface LinkedInProfile {
  isOpen: boolean;
  isPremium: boolean;
  company: string;
  fullName: string;
  profileLink: string;
  companyLink: string;
  jobTitle: string;
  connectionLevel: number;
}

interface ScrapingTaskData extends TaskData {
  id: string; // Ensure id is required
  searchUrl: string; // Ensure searchUrl is required
}

// Type guard to check if a TaskData object is a ScrapingTaskData
function isScrapingTaskData(task: TaskData): task is ScrapingTaskData {
  return typeof task.id === "string" && typeof task.searchUrl === "string";
}

export async function handleScrapeLinkedInProfilesTask(
  task: TaskData
): Promise<ScrapeResult> {
  if (!isScrapingTaskData(task)) {
    throw new Error("Invalid task data for scraping LinkedIn profiles");
  }

  try {
    console.log(
      `Starting scraping for campaignId ${task.campaignId}, searchUrl: ${task.searchUrl}`
    );

    // Fetch campaign data
    const { data: campaignData, error: campaignError } = await supabase
      .from("campaigns")
      .select("cookies, client_id")
      .eq("id", task.campaignId)
      .single();

    if (campaignError || !campaignData?.cookies || !campaignData?.client_id) {
      throw new Error(
        `Failed to fetch campaign data for campaignId ${task.campaignId}`
      );
    }

    const cookies = campaignData.cookies;
    const clientId = campaignData.client_id;

    console.log(`Fetched cookies and client_id for campaignId ${task.campaignId}:`, {
      cookies,
      clientId,
    });

    // Call the scraping API
    const response = await fetch("http://localhost:4000/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cookies: [
          { name: "li_a", value: cookies.li_a, domain: ".linkedin.com" },
          { name: "li_at", value: cookies.li_at, domain: ".linkedin.com" },
        ],
        searchUrl: task.searchUrl,
        checkOpenProfiles: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch scraping data: ${response.statusText}`);
    }

    const { success, data } = await response.json();
    if (!success) {
      throw new Error("Scraping API did not return success");
    }

    console.log(
      `Scraping task completed for campaignId ${task.campaignId}. Found ${data.length} profiles.`
    );

    // Count open vs. other profiles
    const openProfilesCount = data.filter(
      (profile: LinkedInProfile) => profile.isOpen
    ).length;
    const otherProfilesCount = data.length - openProfilesCount;

    // Insert row into "search_urls"
    const { data: searchUrlData, error: searchUrlError } = await supabase
      .from("search_urls")
      .insert({
        url: task.searchUrl,
        campaign_id: task.campaignId,
        status: "completed",
        open_profiles_found: openProfilesCount,
        other_profiles_found: otherProfilesCount,
      })
      .select("id")
      .single();

    if (searchUrlError) {
      throw new Error(`Failed to insert search URL: ${searchUrlError.message}`);
    }

    const searchUrlId = searchUrlData.id;

    // Insert leads, skipping duplicates
    const leads = data.map((profile: LinkedInProfile) => ({
      company: profile.company,
      first_name: profile.fullName.split(" ")[0] || null,
      last_name: profile.fullName.split(" ").slice(1).join(" ") || null,
      linkedin: profile.profileLink,
      website: profile.companyLink,
      position: profile.jobTitle,
      client_id: clientId,
      is_open_profile: profile.isOpen,
      is_premium_profile: profile.isPremium,
      search_url_id: searchUrlId,
      connection_level: profile.connectionLevel,
    }));

    for (const lead of leads) {
      const { data: existingLead, error: leadError } = await supabase
        .from("leads")
        .select("id")
        .eq("linkedin", lead.linkedin)
        .eq("client_id", lead.client_id)
        .single();

      if (leadError || !existingLead) {
        // Insert
        const { error: insertError } = await supabase.from("leads").insert(lead);
        if (insertError) {
          console.error(`Failed to insert lead: ${insertError.message}`);
        }
      } else {
        console.log(`Duplicate lead skipped: ${lead.linkedin}`);
      }
    }

    console.log(`Inserted or skipped leads for campaignId ${task.campaignId}`);

    // Return a ScrapeResult
    return {
      profilesScraped: data.length,
      successCount: openProfilesCount,
      failureCount: otherProfilesCount,
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to process scraping task";

    if (error instanceof Error) {
      console.error("Error in handleScrapeLinkedInProfilesTask:", error.message);
      errorMessage = error.message;
    } else {
      console.error(
        "Error in handleScrapeLinkedInProfilesTask (non-Error):",
        error
      );
    }

    throw new Error(errorMessage);
  }
}