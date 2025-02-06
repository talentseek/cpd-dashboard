// src/tasks/handlers/scrapeLinkedInProfiles.ts

import { NODE_API_URL } from "@/lib/apiConfig"; // centralized API URL
import type { TaskData, ScrapeResult } from "@/types/tasks"; 

// Define an interface for the items returned in `data`
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

// Extend the shape of the JSON returned by your Node API
interface ScrapeResponse {
  success: boolean;
  data: LinkedInProfile[];
  error?: string;
  profilesScraped?: number;
  successCount?: number;
  failureCount?: number;
}

interface ScrapingTaskData extends TaskData {
  id: string;
  searchUrl: string;
}

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

    // Call your Node API (which handles all DB logic internally)
    const response = await fetch(`${NODE_API_URL}/api/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Pass the essentials to the Node API:
        campaignId: task.campaignId,
        searchUrl: task.searchUrl,
        checkOpenProfiles: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to scrape data: ${response.statusText}`);
    }

    // Use the ScrapeResponse interface to avoid "any"
    const json: ScrapeResponse = await response.json();

    if (!json.success) {
      throw new Error(json.error || "Scraping API did not return success");
    }

    // Extract the scraping result counts from the response
    console.log(
      `Scraping completed. Found ${json.data.length} profiles. ` +
        `profilesScraped: ${json.profilesScraped}, ` +
        `successCount: ${json.successCount}, ` +
        `failureCount: ${json.failureCount}`
    );

    // Return the desired ScrapeResult
    return {
      profilesScraped: json.profilesScraped || 0,
      successCount: json.successCount || 0,
      failureCount: json.failureCount || 0,
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to process scraping task";
    if (error instanceof Error) {
      console.error("Error in handleScrapeLinkedInProfilesTask:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error in handleScrapeLinkedInProfilesTask:", error);
    }
    throw new Error(errorMessage);
  }
}