'use client';

import { useState } from 'react';
import { supabase } from '@/lib/utils';
import { AdminLayout } from '@/components/AdminLayout';

export default function NewCampaignPage() {
  const [clientId, setClientId] = useState('');
  const [campaignName, setCampaignName] = useState('');

  const handleCreateCampaign = async () => {
    // Validate inputs
    if (!clientId || !campaignName) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Insert new campaign into the database
      const { error } = await supabase.from('campaigns').insert({
        name: campaignName,
        client_id: clientId,
        campaign_type: 'Sales Navigator Open Profiles',
        status: 'draft',
      });

      if (error) {
        console.error('Error creating campaign:', error.message || error);
        alert('Failed to create campaign.');
        return;
      }

      alert('Campaign created successfully!');
      setCampaignName('');
      setClientId('');
    } catch (err) {
      console.error('Unexpected error creating campaign:', err);
      alert('An unexpected error occurred while creating the campaign.');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
        <div className="mt-6 space-y-4">
          {/* Client ID Input */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">
              Client ID
            </label>
            <input
              type="text"
              id="client"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            />
          </div>

          {/* Campaign Name Input */}
          <div>
            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
              Campaign Name
            </label>
            <input
              type="text"
              id="campaignName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          {/* Create Campaign Button */}
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={handleCreateCampaign}
          >
            Create Campaign
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}