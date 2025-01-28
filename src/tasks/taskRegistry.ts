import { handleCookieValidationTask } from "@/tasks/handlers/cookieValidation";
import { handleScrapeLinkedInProfilesTask } from "@/tasks/handlers/scrapeLinkedInProfiles";
import { handleSendMessagesTask } from "@/tasks/handlers/sendMessages";
import type { TaskHandler } from "@/types/tasks";

export const taskHandlers: Record<string, TaskHandler> = {
  "cookie-validation": handleCookieValidationTask,
  "scrape-linkedin-profiles": handleScrapeLinkedInProfilesTask,
  "send-messages": handleSendMessagesTask as TaskHandler,
};