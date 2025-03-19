'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';
import { AdminLayout } from '@/components/AdminLayout';

interface Client {
  id: number;
  client_name: string;
}

export default function NewCampaignPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('Sales Navigator Open Profiles'); // Default value
  const [loading, setLoading] = useState(false);

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase.from('clients').select('id, client_name');
        if (error) {
          console.error('Error fetching clients:', error.message || error);
        } else {
          setClients(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching clients:', err);
      }
    };

    fetchClients();
  }, []);

  const handleCreateCampaign = async () => {
    // Validate inputs
    if (!clientId || !campaignName) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);

      // Insert new campaign into the database
      const { error } = await supabase.from('campaigns').insert({
        name: campaignName,
        client_id: parseInt(clientId, 10),
        campaign_type: campaignType,
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
      setCampaignType('Sales Navigator Open Profiles'); // Reset to default
    } catch (err) {
      console.error('Unexpected error creating campaign:', err);
      alert('An unexpected error occurred while creating the campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
        <div className="mt-6 space-y-4">
          {/* Client Dropdown */}
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">
              Select Client
            </label>
            <select
              id="client"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="" disabled>
                Select a client
              </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.client_name} (ID: {client.id})
                </option>
              ))}
            </select>
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

          {/* Campaign Type Dropdown */}
          <div>
            <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700">
              Campaign Type
            </label>
            <select
              id="campaignType"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
            >
              <option value="Sales Navigator Open Profiles">Sales Navigator Open Profiles</option>
              <option value="Sales Navigator Connection Requests">Sales Navigator Connection Requests</option>
            </select>
          </div>

          {/* Create Campaign Button */}
          <button
            type="button"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={handleCreateCampaign}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}