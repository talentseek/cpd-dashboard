'use client';

import MessagingSettings from '@/components/campaigns/MessagingSettings';
import { CampaignSettings } from '@/types/campaign';
import { MessagingSettingsState } from '@/types/messaging';
import { useParams } from 'next/navigation';

export default function CampaignSetupPage() {
const params = useParams();
const campaignId = params.id as string;

const handleSaveSettings = (messagingSettings: MessagingSettingsState) => {
    // Combine messaging settings with campaign data
    const campaignSettings: CampaignSettings = {
    ...messagingSettings,
    campaignId,
    campaignName: 'Campaign Name', // TODO: Get from campaign context
    status: 'draft', // TODO: Get or set appropriate status
    timeDelayBetweenMessages: messagingSettings.timeDelayBetweenMessages
    };
    
    console.log('Saved settings:', campaignSettings);
    // TODO: Save the settings to the database via an API call or Supabase client
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Campaign Setup</h1>
      <MessagingSettings onSave={handleSaveSettings} />
    </div>
  );
}