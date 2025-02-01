import { supabase } from "@/lib/utils";
import { NODE_API_URL } from "@/lib/apiConfig"; // Import centralized API config
import type { TaskData, TaskResult } from "@/types/tasks"; // Correct import

export async function handleCookieValidationTask(
  taskData: TaskData
): Promise<TaskResult> {
  const { campaignId } = taskData;
  if (!campaignId) {
    throw new Error("Missing campaignId in cookie-validation task");
  }

  const { data, error } = await supabase
    .from("campaigns")
    .select("cookies")
    .eq("id", campaignId)
    .single();

  if (error || !data?.cookies) {
    throw new Error(`Failed to fetch cookies for campaign ${campaignId}`);
  }

  const { li_a, li_at } = data.cookies;

  // ✅ Call the Node.js API instead of running Puppeteer directly
  const response = await fetch(`${NODE_API_URL}/api/validate-cookies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ li_a, li_at }),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`Failed to validate cookies: ${errorMsg}`);
  }

  const { message } = await response.json();

  // Update database based on result
  const status = message.includes("valid") ? "valid" : "invalid";
  await supabase
    .from("campaigns")
    .update({ cookies_status: status })
    .eq("id", campaignId);

  return { success: true, message };
}