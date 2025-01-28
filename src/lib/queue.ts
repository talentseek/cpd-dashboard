import { redis } from "@/lib/redis";
import type { TaskData } from "@/types/tasks"; // Correct import

interface QueueTask extends TaskData {
  type: string;
  id?: string;
}

export async function getNextTask(): Promise<QueueTask | null> {
  const taskString = await redis.lpop("task-queue");
  console.log("Raw task string from Redis:", taskString);

  if (!taskString || typeof taskString !== "string") {
    return null;
  }

  try {
    return JSON.parse(taskString) as QueueTask;
  } catch (error) {
    console.error("Error parsing task from queue:", error);
    return null;
  }
}