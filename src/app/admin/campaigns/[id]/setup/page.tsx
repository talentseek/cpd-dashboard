'use client';

import MessagingSettings from '@/components/campaigns/MessagingSettings';
import { CampaignSettings, CampaignSettingsResponse } from '@/types/campaign';
import { MessagingSettingsState } from '@/types/messaging';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CampaignSetupPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [settings, setSettings] = useState<MessagingSettingsState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/campaigns/${campaignId}/settings`);
        if (!res.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data: CampaignSettingsResponse = await res.json();
        setSettings(data.settings);
        setError(null);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching settings:', errorMessage);
        setError('Unable to load settings. Default values will be used.');
        setSettings(null); // Use default values if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [campaignId]);

  const handleSaveSettings = async (messagingSettings: MessagingSettingsState) => {
    try {
      // This object can include extra fields like campaignId, etc.,
      // but the route only really needs the messaging fields.
      const campaignSettings: CampaignSettings = {
        ...messagingSettings,
        campaignId,
        campaignName: 'Campaign Name', // Placeholder
        status: 'draft', // Placeholder
      };

      const res = await fetch(`/api/campaigns/${campaignId}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignSettings),
      });

      if (!res.ok) {
        throw new Error('Failed to save settings');
      }

    const updatedSettings: CampaignSettingsResponse = await res.json();
    setSettings(updatedSettings.settings);
    alert('Settings saved successfully!');
} catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('Error saving settings:', errorMessage);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Campaign Setup</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <MessagingSettings
        initialSettings={settings || undefined}
        onSave={handleSaveSettings}
      />
    </div>
  );
}