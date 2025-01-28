import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";

// Base type for all tasks
interface TaskData {
    type: string;
    campaignId: number;
}

interface ScrapeLinkedInProfilesData extends TaskData {
    type: 'scrape-linkedin-profiles';
    searchUrl: string;
}

interface CookieValidationData extends TaskData {
    type: 'cookie-validation';
    validateOnly?: boolean; // Added to make interface distinct
}

type ValidatorFunction = (data: TaskData) => string | null;

// Define validation rules for each task type
const taskValidationRules: Record<string, ValidatorFunction> = {
"scrape-linkedin-profiles": (data: TaskData) => {
    const profileData = data as ScrapeLinkedInProfilesData;
    if (!profileData.campaignId) return "Missing 'campaignId'";
    if (!profileData.searchUrl) return "Missing 'searchUrl'";
    return null; // Validation passed
},
"cookie-validation": (data: TaskData) => {
    const cookieData = data as CookieValidationData;
    if (!cookieData.campaignId) return "Missing 'campaignId'";
    return null; // Validation passed
},
// Add other task types as needed
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (typeof body.type !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'type'" }, { status: 400 });
    }

    // Check if validation rules exist for the given task type
    const validate = taskValidationRules[body.type];
    if (validate) {
      const validationError = validate(body);
      if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
      }
    }

    // Create a consistent shape for the task
    const task = {
      id: randomUUID(), // Unique ID
      ...body,         // Dynamically include all task-specific fields
      addedAt: new Date().toISOString(),
    };

    // Store the task in Redis as a string
    await redis.rpush("task-queue", JSON.stringify(task));

    return NextResponse.json({ message: "Task added to queue!" });
  } catch (error) {
    console.error("Error in POST /api/tasks:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}