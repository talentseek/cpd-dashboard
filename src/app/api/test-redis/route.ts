import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // Write a test key
    await redis.set("test-key", "Hello from Redis!");

    // Read the test key
    const value = await redis.get("test-key");

    return NextResponse.json({ message: `Redis says: ${value}` });
  } catch (error) {
    console.error("Redis test failed:", error);
    return NextResponse.json({ error: "Failed to connect to Redis" }, { status: 500 });
  }
}