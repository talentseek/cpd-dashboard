import { supabase } from "@/lib/utils";
import { testCookies } from "@/utils/scrapers/testCookies";

interface Task {
type: 'cookie-validation' | string;
campaignId?: string;
[key: string]: unknown;
}

interface TaskResult {
success: boolean;
message?: string;
data?: unknown;
error?: string;
}
export async function taskWorker(task: Task): Promise<TaskResult> {
  console.log("Worker received task:", task);

  switch (task.type) {
    case "cookie-validation": {
      const { campaignId } = task;
      if (!campaignId) {
        throw new Error("Missing campaignId in task");
      }

      console.log(`Validating cookies for campaign ${campaignId}`);

      const { data, error } = await supabase
        .from("campaigns")
        .select("cookies")
        .eq("id", campaignId)
        .single();

      if (error || !data?.cookies) {
        throw new Error("Failed to fetch campaign cookies");
      }

      const { li_a, li_at } = data.cookies;
      const result = await testCookies(li_a, li_at);

      await supabase
        .from("campaigns")
        .update({ cookies_status: "valid" })
        .eq("id", campaignId);

      console.log("Cookies validated:", result);
      return { success: true, message: result };
    }

    default:
      throw new Error(`Unknown task type: ${task.type}`);
  }
}