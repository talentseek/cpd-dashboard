// /src/tasks/handlers/cookieValidation.ts
import { supabase } from "@/lib/utils";
import { testCookies } from "@/utils/scrapers/testCookies";

import { TaskData, TaskResult } from "../taskRegistry";
export async function handleCookieValidationTask(taskData: TaskData): Promise<TaskResult> {
  const { campaignId } = taskData;

  if (!campaignId) {
    throw new Error("Missing campaignId in cookie-validation task");
  }

  // 1) Fetch campaign's cookies from DB
  const { data, error } = await supabase
    .from("campaigns")
    .select("cookies")
    .eq("id", campaignId)
    .single();

  if (error || !data?.cookies) {
    throw new Error(`Failed to fetch cookies for campaign ${campaignId}`);
  }

  // 2) Validate them with Puppeteer
  const { li_a, li_at } = data.cookies;
  const result = await testCookies(li_a, li_at);

  // 3) Update DB with new cookie status
  await supabase
    .from("campaigns")
    .update({ cookies_status: "valid" })
    .eq("id", campaignId);

return { success: true, message: result };
}