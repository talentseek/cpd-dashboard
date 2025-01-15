// /src/tasks/taskRegistry.ts
import { handleCookieValidationTask } from "./handlers/cookieValidation";
// import { handleAnotherTaskType } from "./handlers/anotherTask";
// ... etc.

export interface TaskData {
    campaignId: string;
    cookies?: {
        li_a: string;
        li_at: string;
    };
    searchUrl?: string;
}

export interface TaskResult {
success: boolean;
message?: string;
data?: unknown;
error?: string;
}
type TaskHandler = (taskData: TaskData) => Promise<TaskResult>;

export const taskHandlers: Record<string, TaskHandler> = {
  "cookie-validation": handleCookieValidationTask,
  // "another-task": handleAnotherTaskType,
  // etc...
};