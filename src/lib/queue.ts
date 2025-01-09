import { redis } from "./redis";

/**
 * Adds a task to the Redis queue.
 * @param task - The task object to enqueue.
 */
import { Task } from './types';

export async function addToQueue(task: Task) {
  const taskString = JSON.stringify(task);
  await redis.lpush("task-queue", taskString); // Add the task to the left of the queue
}

/**
 * Fetches the next task from the Redis queue.
 * @returns The next task object or null if the queue is empty.
 */
export async function getNextTask(): Promise<Task | null> {
  const taskString = await redis.rpop("task-queue"); // Remove the task from the right of the queue
  return taskString ? JSON.parse(taskString) : null;
}

/**
 * Gets the current queue length.
 * @returns The number of tasks in the queue.
 */
export async function getQueueLength() {
  return await redis.llen("task-queue"); // Returns the length of the queue
}