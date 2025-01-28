import { MessagingSettingsState } from './messaging';

export interface MessageTemplate {
    subject: string;
    body: string;
}

export interface SequenceStep {
    id?: number;
    step_order: number;
    message_template: string;
    delay_min: number;
    delay_max: number;
    campaign_id: number;
}

export interface FormattedSequenceStep {
    id: number;
    step_order: number;
    subject: string;
    body: string;
    delay: number;
}

export interface ApiError {
    message: string;
    code?: string; 
}

export interface ApiErrorResponse {
    error: string;
    status?: number;
}

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
}

export interface CampaignSettingsResponse extends ApiResponse<CampaignSettings> {
    settings: MessagingSettingsState;
}

export interface Message {
    id?: number;
    subject: string;
    body: string;
    delay: number;
}

export interface SearchUrlResult {
    url: string;
    open_profiles_found: number;
    other_profiles_found: number;
    status: string;
}

export interface LeadsTotals {
    openProfiles: number;
    otherProfiles: number;
}

export interface LeadsApiResponse {
    results: Array<{
        url: string;
        openProfiles: number;
        otherProfiles: number;
        status: string;
    }>;
    totals: LeadsTotals;
    error?: string;
}

export interface Campaign {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface CampaignError {
    message: string;
    status?: number;
}

export interface CampaignSettings extends MessagingSettingsState {
    campaignId: string;
    campaignName: string;
    description?: string;
    status: 'draft' | 'active' | 'paused' | 'completed';
    clients?: {
        client_name?: string;
    }[];
}

export interface TaskPayload {
    type: string;
    campaignId: number;
    searchUrl: string;
}

export interface LeadsApiError extends Error {
    status?: number;
    code?: string;
}

export interface SchedulePayload {
    leads: number[];
    scheduled_time: string;
    raw_message: string;
    raw_subject: string;
}

export interface ScheduleResponse {
    success: boolean;
    error?: string;
}

export interface ScrapeResult {
    url: string;
    leadsFound: number;
    openProfiles: number;
    status: "In Progress" | "Completed" | "Failed";
}
