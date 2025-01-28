import { supabase } from "@/lib/utils";
import { testCookies } from "@/utils/scrapers/testCookies";
import type { TaskData, TaskResult } from "@/types/tasks"; // Correct import

export async function handleCookieValidationTask(
  taskData: TaskData
): Promise<TaskResult> {
  const { campaignId } = taskData;
  if (!campaignId) {
    throw new Error("Missing campaignId in cookie-validation task");
  }

  // 1) Fetch campaign's cookies
  const { data, error } = await supabase
    .from("campaigns")
    .select("cookies")
    .eq("id", campaignId)
    .single();

  if (error || !data?.cookies) {
    throw new Error(`Failed to fetch cookies for campaign ${campaignId}`);
  }

  // 2) Validate them
  const { li_a, li_at } = data.cookies;
  const result = await testCookies(li_a, li_at);

  // 3) Mark cookies_status = "valid" in DB, etc.
  await supabase
    .from("campaigns")
    .update({ cookies_status: "valid" })
    .eq("id", campaignId);

  return { success: true, message: result };
}