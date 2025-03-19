'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { supabase } from '@/lib/utils';
import Link from 'next/link';
import ManageCookiesModal from '@/components/campaigns/ManageCookiesModal';

interface SupabaseCampaign {
  id: number;
  name: string;
  campaign_type: string;
  status: string | null;
  created_at: string;
  cookies?: Record<string, string>;
  client_id: number; // Added to link campaigns to clients
}

interface Campaign {
  id: number;
  name: string;
  campaign_type: string;
  status: string | null;
  created_at: string;
  cookies?: Record<string, string>;
  client_name: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Sales Navigator Open Profiles'); // Default tab
  const [activeStatus, setActiveStatus] = useState<string>('active'); // Default status

  useEffect(() => {
    fetchCampaigns();
  }, [activeTab, activeStatus, fetchCampaigns]);

  async function fetchCampaigns() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          id,
          name,
          campaign_type,
          status,
          created_at,
          cookies,
          client_id
        `);

      if (error) {
        console.error('Error fetching campaigns:', error.message || error);
        setError('Failed to fetch campaigns.');
      } else if (data) {
        // Fetch client names based on client_id
        const clientPromises = data.map(async (campaign: SupabaseCampaign) => {
          const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('client_name')
            .eq('id', campaign.client_id)
            .single();

          if (clientError || !clientData) {
            console.warn(`No client found for campaign ID ${campaign.id}, client_id ${campaign.client_id}`);
            return { ...campaign, client_name: 'Unknown' };
          }

          return { ...campaign, client_name: clientData.client_name };
        });

        const resolvedCampaigns = await Promise.all(clientPromises);
        const filteredCampaigns = resolvedCampaigns.filter((campaign) => {
          const matchesCampaignType = campaign.campaign_type === activeTab;
          const matchesStatus = activeStatus === 'active' ? campaign.status === 'active' : campaign.status !== 'active';
          return matchesCampaignType && matchesStatus;
        });

        setCampaigns(filteredCampaigns);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred while fetching campaigns.');
    } finally {
      setLoading(false);
    }
  }

  async function deleteCampaign(campaignId: number) {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }

    try {
      const { error } = await supabase.from('campaigns').delete().eq('id', campaignId);

      if (error) {
        console.error('Error deleting campaign:', error.message || error);
        alert('Failed to delete the campaign.');
      } else {
        alert('Campaign deleted successfully!');
        fetchCampaigns(); // Refresh the list
      }
    } catch (err) {
      console.error('Unexpected error during deletion:', err);
      alert('An unexpected error occurred while deleting the campaign.');
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-gray-600">
          Manage all campaigns here. Create, edit, delete, and track the progress of your client campaigns.
        </p>

        {/* Action Button */}
        <div className="mt-6">
          <Link href="/admin/campaigns/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Create New Campaign
            </button>
          </Link>
        </div>

        {/* Tabs for Campaign Type and Status */}
        <div className="mt-6 flex space-x-4">
          {/* Campaign Type Tabs */}
          <div className="flex space-x-4">
            {['Sales Navigator Open Profiles', 'Sales Navigator Connection Requests'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveTab(type);
                  setActiveStatus('active'); // Reset to active when switching tabs
                }}
                className={`px-4 py-2 rounded-md ${activeTab === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-4">
            {['active', 'inactive/default'].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status === 'active' ? 'active' : 'inactive/default')}
                className={`px-4 py-2 rounded-md ${activeStatus === (status === 'active' ? 'active' : 'inactive/default') ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {status === 'active' ? 'Active' : 'Inactive/Default'}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
          {loading ? (
            <p>Loading campaigns...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : campaigns.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-500">No active campaigns found. Start by creating a new campaign!</p>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/admin/campaigns/${campaign.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {campaign.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{campaign.client_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => deleteCampaign(campaign.id)}
                          className="text-red-600 hover:text-red-800 font-medium mr-4"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setSelectedCampaign(campaign)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Manage Cookies
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedCampaign && (
          <ManageCookiesModal
            campaign={{ id: selectedCampaign.id, name: selectedCampaign.name }}
            onClose={() => setSelectedCampaign(null)}
            onSave={fetchCampaigns}
          />
        )}
      </div>
    </AdminLayout>
  );
}