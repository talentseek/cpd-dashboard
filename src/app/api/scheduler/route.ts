import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { taskHandlers } from "@/tasks/taskRegistry";
import type { TaskData } from "@/types/tasks"; // Correct import

interface Task extends TaskData {
  type: string;
  id?: string;
}

export async function POST() {
  try {
    // Pop one task from the queue (returns a string or null)
    const rawTask = await redis.lpop("task-queue");

    if (!rawTask || typeof rawTask !== "string") {
      // No tasks in queue or invalid task
      return NextResponse.json({ message: "No tasks in the queue" });
    }

    // Parse the JSON string
    const parsedTask = JSON.parse(rawTask) as Task;

    // Validate required fields based on task type
    switch (parsedTask.type) {
      case "scrape-linkedin-profiles":
        if (!parsedTask.campaignId || !parsedTask.searchUrl) {
          throw new Error("Missing required fields: campaignId or searchUrl");
        }
        break;
      case "send-messages":
        if (!parsedTask.campaignId || !parsedTask.leadId) {
          throw new Error("Missing required fields: campaignId or leadId");
        }
        break;
      default:
        throw new Error(`Unknown task type: ${parsedTask.type}`);
    }

    const handler = taskHandlers[parsedTask.type];
    if (!handler) {
      throw new Error(`No handler found for task type: ${parsedTask.type}`);
    }

    const result = await handler(parsedTask);

    return NextResponse.json({
      message: "Task processed successfully",
      taskId: parsedTask.id,
      result,
    });
  } catch (error) {
    console.error("Error in POST /api/scheduler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}