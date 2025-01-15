// /src/app/api/queue-status/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // Returns an array of JSON strings, or empty array if none
    const rawTasks = await redis.lrange("task-queue", 0, -1);

    // Safely parse each
    const parsedTasks = rawTasks.map((taskStr, i) => {
      try {
        return JSON.parse(taskStr);
      } catch (err) {
        console.error(`Failed to parse task at index ${i}:`, err, taskStr);
        return { error: "Invalid JSON data", rawTask: taskStr };
      }
    });

    return NextResponse.json({
      queueLength: parsedTasks.length,
      tasks: parsedTasks,
    });
  } catch (error) {
    console.error("Error in GET /api/queue-status:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}