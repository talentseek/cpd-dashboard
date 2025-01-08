import { MessagingSettingsState } from './messaging';

export interface CampaignSettings extends MessagingSettingsState {
campaignId: string;
campaignName: string;
description?: string;
status: 'draft' | 'active' | 'paused' | 'completed';
clients?: {
    client_name?: string;
}[];
}

