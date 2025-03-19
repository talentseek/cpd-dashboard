'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientLeadTable from '@/components/ClientLeadTable';

// -----------------------------------------------
// Type definitions
// -----------------------------------------------
interface Lead {
  id: string;
  client_id: number;
  first_name: string;
  last_name: string;
  company: string;
  position: string;
  status: string;
  is_open_profile: boolean;
  created_at: string;
}

// -----------------------------------------------
// Main Dashboard Component
// -----------------------------------------------
export default function ClientDashboardPage() {
  const [totalLeadsContacted, setTotalLeadsContacted] = useState(0);
  const [totalABMPageViews, setTotalABMPageViews] = useState(0);
  const [totalReplies, setTotalReplies] = useState(0);
  const [totalPositiveReplies, setTotalPositiveReplies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState<number | null>(null);
  const router = useRouter();
  const params = useParams();
  const client = params.client as string;

  useEffect(() => {
    async function fetchData() {
      try {
        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error('User not authenticated:', userError);
          router.push('/login');
          return;
        }

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileError || !profile) {
          console.error('Error fetching user profile:', profileError);
          router.push('/unauthorized');
          return;
        }
        const clientIdNum = Number(profile.client_id);
        setClientId(clientIdNum);

        // Get client details
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name, status')
          .eq('id', clientIdNum)
          .single();
        if (clientError || !clientData) {
          console.error('Error fetching client data:', clientError);
          return;
        }
        if (clientData.status === 'pending') {
          router.push(`/dashboard/${client}/quick-start`);
          return;
        }

        // Fetch stats for Open Profiles Only
        // Total Leads Contacted (message_sent = true, is_open_profile = true)
        const { count: leadsContactedCount, error: leadsContactedError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .eq('is_open_profile', true)
          .eq('message_sent', true);
        if (leadsContactedError) {
          console.error('Error fetching leads contacted count:', leadsContactedError);
        }
        setTotalLeadsContacted(leadsContactedCount || 0);

        // Total ABM Page Views (using abm_page_visits table)
        const { data: openProfileLeads, error: leadsError } = await supabase
          .from('leads')
          .select('id')
          .eq('is_open_profile', true)
          .eq('client_id', clientIdNum);
        if (leadsError) {
          console.error('Error fetching open profile leads for ABM page views:', leadsError);
        }
        const openProfileLeadIds = openProfileLeads?.map((lead: { id: string }) => lead.id) || [];
        console.log('Open Profile Lead IDs:', openProfileLeadIds); // Debug log

        const { count: pageViewsCount, error: pageViewsError } = await supabase
          .from('abm_page_visits')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .in('lead_id', openProfileLeadIds);
        if (pageViewsError) {
          console.error('Error fetching ABM page views count:', pageViewsError);
        }
        console.log('Total ABM Page Views Count:', pageViewsCount); // Debug log
        setTotalABMPageViews(pageViewsCount || 0);

        // Total Replies (status in ['not_interested', 'interested', 'follow_up_needed', 'demo_booked'])
        const { count: repliesCount, error: repliesError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .eq('is_open_profile', true)
          .in('status', ['not_interested', 'interested', 'follow_up_needed', 'demo_booked']);
        if (repliesError) {
          console.error('Error fetching replies count:', repliesError);
        }
        setTotalReplies(repliesCount || 0);

        // Total Positive Replies (status in ['interested', 'follow_up_needed', 'demo_booked'])
        const { count: positiveRepliesCount, error: positiveRepliesError } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', clientIdNum)
          .eq('is_open_profile', true)
          .in('status', ['interested', 'follow_up_needed', 'demo_booked']);
        if (positiveRepliesError) {
          console.error('Error fetching positive replies count:', positiveRepliesError);
        }
        setTotalPositiveReplies(positiveRepliesCount || 0);

      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [client, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout>
      <div className="p-4">
        {/* Tabs for Open Profile Leads and Connection Requests */}
        <Tabs defaultValue="open-profile-leads" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open-profile-leads">Open Profile Leads</TabsTrigger>
            <TabsTrigger value="connection-requests" disabled>Connection Requests (Coming Soon)</TabsTrigger>
          </TabsList>

          <TabsContent value="open-profile-leads">
            {/* Summary Cards */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 italic">Statistics for Open Profiles Only</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads Contacted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalLeadsContacted}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total ABM Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalABMPageViews}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalReplies}</div>
                  <p className="text-xs text-gray-500">Includes not interested</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Positive Replies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPositiveReplies}</div>
                </CardContent>
              </Card>
            </div>

            {/* Lead Table */}
            {clientId && (
              <ClientLeadTable clientId={clientId} />
            )}
          </TabsContent>

          <TabsContent value="connection-requests">
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">Connection Requests</h2>
              <p className="text-gray-500">This feature is coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
}