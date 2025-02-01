import { supabase } from "@/lib/utils";
import { NODE_API_URL } from "@/lib/apiConfig"; // Import centralized API config
import type { SendMessageTaskData, MessageResult } from "@/types/tasks";

export async function handleSendMessagesTask(task: SendMessageTaskData): Promise<MessageResult> {
  try {
    console.log(`Processing send-messages task:`, task);

    if (!task.campaignId || !task.leadId) {
      throw new Error("Missing campaignId or leadId in task");
    }

    // Fetch cookies from Supabase
    const { data: campaignData, error: campaignError } = await supabase
      .from("campaigns")
      .select("cookies")
      .eq("id", task.campaignId)
      .single();

    if (campaignError || !campaignData?.cookies) {
      throw new Error(`Failed to fetch cookies for campaignId ${task.campaignId}`);
    }

    console.log(`Validated cookies for campaignId ${task.campaignId}:`, campaignData.cookies);

    // Format the cookies for your external message-sending API
    const cookies = {
      li_a: campaignData.cookies.li_a,
      li_at: campaignData.cookies.li_at,
    };

    // Fetch lead data
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .select("linkedin")
      .eq("id", task.leadId)
      .single();

    if (leadError || !leadData?.linkedin) {
      throw new Error(`Failed to fetch lead data for leadId ${task.leadId}`);
    }

    const leadUrl = leadData.linkedin;
    console.log(`Fetched lead URL for leadId ${task.leadId}: ${leadUrl}`);

    // ✅ Call the external /send-message API using the centralized URL
    const response = await fetch(`${NODE_API_URL}/api/send-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cookies, // Pass an object with li_a, li_at
        leadUrl,
        message: {
          subject: task.subject,
          content: task.message,
        },
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to send message: ${response.statusText}. Details: ${errorDetails}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(`Message API did not return success: ${result.error}`);
    }

    console.log(`✅ Message sent successfully for leadId ${task.leadId}:`, result);

    return { success: true, messageId: result.messageId };
  } catch (error: unknown) {
    let errorMessage = "Failed to process send-messages task";
    if (error instanceof Error) {
      console.error("Error in handleSendMessagesTask:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Error in handleSendMessagesTask (non-Error):", error);
    }

    return { success: false, error: errorMessage };
  }
}