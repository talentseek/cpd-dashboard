import { NextResponse } from "next/server";
import { getQueueLength } from "@/lib/queue";

export async function GET() {
  try {
    const queueLength = await getQueueLength();
    return NextResponse.json({ queueLength });
  } catch (error) {
    console.error("Error fetching queue status:", error);
    return NextResponse.json({ error: "Failed to fetch queue status" }, { status: 500 });
  }
}