// /src/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (typeof body.type !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'type'" }, { status: 400 });
    }

    // Create a consistent shape for the task
    const task = {
      id: randomUUID(),                // unique ID
      type: body.type,
      campaignId: body.campaignId,     // or "payload", or anything else
      addedAt: new Date().toISOString(),
    };

    // Store the task as a string
    await redis.rpush("task-queue", JSON.stringify(task));

    return NextResponse.json({ message: "Task added to queue!" });
  } catch (error) {
    console.error("Error in POST /api/tasks:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}