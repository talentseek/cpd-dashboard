// Base task interface with discriminator
export interface BaseTask {
type: string;
}

// Cookie validation task type
export interface CookieValidationTask extends BaseTask {
type: 'cookie-validation';
li_a: string;
li_at: string;
campaignId: string;
}

// Union type for all possible tasks
export type Task = CookieValidationTask;
// Add more task types here as needed

// Task result types
export interface TaskResult {
status: string;
message: string;
}

