'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import ClientLeadTable from '@/components/ClientLeadTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from 'lucide-react';

interface Lead {
  id: string;
  client: string;
  first_name: string;
  last_name: string;
  company: string;
  linkedin?: string;
  website?: string;
  clicks?: number;
  position?: string;
  created_at?: string;
}

export default function ClientDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subdomain, setSubdomain] = useState<string | null>(null); // State to store subdomain
  const router = useRouter();
  const { client } = useParams(); // This will be used to ensure the correct client ID in the URL

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('User not authenticated:', userError);
          router.push('/login');
          return;
        }

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

        // Fetch client data using the client_id from user profile
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name, subdomain, status')
          .eq('id', profile.client_id)
          .single();

        if (clientError || !clientData) {
          console.error('Error fetching client data:', clientError);
          return;
        }

        // Store subdomain in state for usage in the child component
        setSubdomain(clientData.subdomain);

        // If status is pending, redirect to quick-start page
        if (clientData.status === 'pending') {
          router.push(`/dashboard/${client}/quick-start`);
        }

        // Fetch leads for the client based on client_id
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .eq('client_id', profile.client_id);

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else {
          setLeads(leadsData || []);

          // Calculate total clicks
          const totalClicks = leadsData.reduce((sum, lead) => sum + (lead.clicks || 0), 0);
          setTotalClicks(totalClicks);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [client, router]); // Include client in the dependency array to avoid missing dependency warning

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ClientLayout>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />  {/* Static change indicator */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-green-600">+0% from last period (static for now)</p>  {/* Placeholder change */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />  {/* Static change indicator */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks}</div>
              <p className="text-xs text-red-600">-0% from last period (static for now)</p>  {/* Placeholder change */}
            </CardContent>
          </Card>
        </div>
        {leads.length === 0 ? (
          <p>No leads found for this client.</p>
        ) : (
          // Pass subdomain as a prop to ClientLeadTable (ensure subdomain is a valid string or undefined)
          <ClientLeadTable leads={leads} clientSubdomain={subdomain || undefined} />
        )}
      </div>
    </ClientLayout>
  );
}