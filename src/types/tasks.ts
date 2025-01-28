/**
 * Indicates the result of a cookie validation task.
 */
export interface CookieValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Represents the result of a scraping operation.
 */
export interface ScrapeResult {
  profilesScraped: number;
  successCount: number;
  failureCount: number;
  errors?: string[];
}

/**
 * Represents the result of sending one or more messages.
 */
export interface MessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * A union of all possible task results.
 */
export type TaskResult = CookieValidationResult | ScrapeResult | MessageResult;

/**
 * Represents a dictionary of LinkedIn cookies used for scraping or API calls.
 */
export interface LinkedInCookies {
  li_a?: string;
  li_at?: string;
  JSESSIONID?: string;
  [key: string]: string | undefined;
}

/**
 * Base task data structure.
 */
export interface TaskData {
  campaignId: number;
  leadId?: number;
  cookies?: LinkedInCookies;
  searchUrl?: string;
  subject?: string;
  message?: string;
  id?: string; // Optional field for unique task ID
  type?: string; // Optional field for task type
}

/**
 * Specific task data for sending messages.
 */
export interface SendMessageTaskData extends TaskData {
  id: string; // Required for this task
  campaignId: number;
  leadId: number;
  subject: string;
  message: string;
}

/**
 * Represents a scraping task with additional fields.
 */
export interface ScrapingTaskData extends TaskData {
  id: string; // Required for scraping tasks
  type: string; // Required for scraping tasks
}

/**
 * Each task handler is a function that takes TaskData
 * and returns (or resolves) a TaskResult.
 */
export type TaskHandler = (task: TaskData) => Promise<TaskResult>;