// src/app/dashboard/[client]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import ClientLeadTable from '@/components/ClientLeadTable'; // Ensure correct import

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

interface UserProfile {
  id: string;
  role: string;
  client_id: string;
}

export default function ClientDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
          router.push('/unauthorized');
          return;
        }

        setUserProfile(profile);

        // Check for client-specific access
        if (profile.role !== 'admin' && profile.client_id !== client) {
          router.push('/unauthorized');
          return;
        }

        // Fetch leads for the client
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .eq('client', client);

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else {
          setLeads(leadsData || []);
        }
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
        {userProfile ? (
          <h1>Welcome, {userProfile.client_id || 'User'}!</h1>
        ) : (
          <p>Error loading user profile.</p>
        )}
        <ClientLeadTable leads={leads} />
      </div>
    </ClientLayout>
  );
}