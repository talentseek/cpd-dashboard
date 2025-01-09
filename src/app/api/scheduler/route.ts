import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { supabase } from "@/lib/utils"; // Assuming Supabase client is here

import { Task, TaskResult } from '@/lib/types';

async function taskWorker(task: Task): Promise<TaskResult> {
  console.log("Processing task:", task);

  switch (task.type) {
    case "cookie-validation":
      if (!task.li_a || !task.li_at) {
        throw new Error("Missing required fields for cookie validation");
      }

      // Simulate cookie validation logic
      const isValid =
        task.li_a !== "123" && task.li_at !== "321"; // Example: invalid if these values match
      const status = isValid ? "valid" : "invalid";

      // Update Supabase database with validation result
      const { error } = await supabase
        .from("campaigns")
        .update({ cookies_status: status })
        .eq("id", task.campaignId);

      if (error) {
        throw new Error(`Failed to update database: ${error.message}`);
      }

      return { status, message: `Cookies are ${status}` };

    default:
      throw new Error(`Unknown task type: ${task.type}`);
  }
}

export async function POST() {
  try {
    // Fetch a task from the queue
    const task = await redis.lpop("task-queue");

    if (!task) {
    return NextResponse.json({ message: "No tasks to process" });
    }

    // Ensure task is a string before parsing
    if (typeof task !== "string") {
    throw new Error("Task from queue is not a string");
    }

    // Parse the task as JSON and validate type
    const parsedTask = JSON.parse(task) as Task;
    console.log("Parsed task:", parsedTask);

    // Process the task
    const result = await taskWorker(parsedTask);

    return NextResponse.json({ message: "Task processed successfully", result });
  } catch (error) {
    console.error("Error processing task:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process task" },
      { status: 500 }
    );
  }
}