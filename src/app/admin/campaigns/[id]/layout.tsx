'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/utils'; // Ensure this is your Supabase client setup
import { AdminLayout } from '@/components/AdminLayout'; // Import AdminLayout

export default function CampaignLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('progress');

  // Resolve params and fetch campaign details
  useEffect(() => {
    async function fetchCampaignData() {
      try {
        const resolvedParams = await params; // Ensure params is awaited
        setId(resolvedParams.id);

        // Fetch campaign name
        const { data, error } = await supabase
          .from('campaigns')
          .select('name')
          .eq('id', resolvedParams.id)
          .single();

        if (error) {
          console.error('Error fetching campaign name:', error.message || error);
        } else {
          setCampaignName(data?.name || 'Unknown Campaign');
        }
      } catch (error) {
        console.error('Error resolving params or fetching campaign data:', error);
      }
    }

    fetchCampaignData();
  }, [params]);

  const tabs = id
  ? [
      { name: 'Progress', href: `/admin/campaigns/${id}/progress` },
      { name: 'Leads', href: `/admin/campaigns/${id}/leads` },
      { name: 'Sequence', href: `/admin/campaigns/${id}/sequence` },
      { name: 'Setup', href: `/admin/campaigns/${id}/setup` },
      { name: 'Preview', href: `/admin/campaigns/${id}/preview` }, // New Tab
    ]
  : [];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Dynamic Campaign Title */}
        <h1 className="text-3xl font-bold">
          {campaignName ? `${campaignName} - Campaign Management` : 'Campaign Management'}
        </h1>

        {/* Navigation Tabs */}
        <div className="mt-4">
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <Link key={tab.name} href={tab.href}>
                <div
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    activeTab === tab.name.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab.name.toLowerCase())}
                >
                  {tab.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Dynamic Content */}
        <div className="mt-6">{children}</div>
      </div>
    </AdminLayout>
  );
}