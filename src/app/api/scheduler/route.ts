import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { taskHandlers, TaskData } from "@/tasks/taskRegistry";

interface Task extends TaskData {
    type: string;
    id?: string;
}
export async function POST() {
  try {
    // Pop one task from the queue (returns a string or null)
    const rawTask = await redis.lpop("task-queue");

    if (!rawTask || typeof rawTask !== 'string') {
        // No tasks in queue or invalid task
        return NextResponse.json({ message: "No tasks in the queue" });
    }

    // Parse the JSON string
    const parsedTask = JSON.parse(rawTask) as Task;

    // Validate required fields based on task type
    if (!parsedTask.campaignId) {
        throw new Error('Missing required field: campaignId');
    }

    // Create a TaskData object with required fields
    const task: TaskData = {
        campaignId: parsedTask.campaignId,
        cookies: parsedTask.cookies,
        searchUrl: parsedTask.searchUrl
    };

    const handler = taskHandlers[parsedTask.type];
    if (!handler) {
        throw new Error(`No handler found for task type: ${parsedTask.type}`);
    }

    const result = await handler(task);

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