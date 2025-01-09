import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate task structure
    if (!body.type || typeof body.type !== "string") {
      return NextResponse.json({ error: "Task type is required" }, { status: 400 });
    }

    // Add additional validation for specific task types
    if (body.type === "cookie-validation") {
      if (!body.li_a || !body.li_at) {
        return NextResponse.json(
          { error: "li_a and li_at are required for cookie-validation tasks" },
          { status: 400 }
        );
      }
    }

    // Add the task to the Redis queue as a JSON string
    await redis.rpush("task-queue", JSON.stringify(body));

    return NextResponse.json({ message: "Task added to queue!" });
  } catch (error) {
    console.error("Error adding task to queue:", error);
    return NextResponse.json({ error: "Failed to add task to queue" }, { status: 500 });
  }
}