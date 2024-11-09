'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import ClientLeadTable from '@/components/ClientLeadTable'; // Ensure correct import

export default function ClientDashboardPage() {
  const [leads, setLeads] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const { client } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

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
          return;
        }

        setUserProfile(profile);

        if (profile.role !== 'admin' && profile.client_id !== client) {
          router.push('/unauthorized');
          return;
        }

        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .eq('client', client);

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else {
          setLeads(leadsData);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    }

    fetchData();
  }, [client, router]);

  return (
    <ClientLayout>
      <div className="p-4">
        {userProfile && <h1>Welcome, {userProfile.client_id}!</h1>}
        <ClientLeadTable leads={leads} />
      </div>
    </ClientLayout>
  );
}