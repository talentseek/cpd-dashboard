'use client';

import { useEffect, useState } from 'react';
import { fetchLeads } from '@/utils/supabaseFunctions'; // Ensure the path is correct
import { supabase } from '@/lib/utils';

export default function ClientStatusPage() {
  const [clientData, setClientData] = useState({ subdomain: '', status: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientData() {
      // Check Authentication
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      if (!user) {
        console.log("No authenticated user found.");
        return;
      }

      // Fetch User Profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('client_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching user profile:", profileError);
        return;
      }

      // Fetch Client Data
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('subdomain, status')
        .eq('id', profile.client_id)
        .single();

      if (clientError || !client) {
        console.error("Error fetching client data:", clientError || "No data found");
        setClientData({ subdomain: 'Not configured', status: 'Unknown' });
      } else {
        setClientData(client);
      }

      // Fetch Leads
      const leads = await fetchLeads();
      console.log("Fetched leads data:", leads);

      setLoading(false);
    }

    fetchClientData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello, User!</h1>
      <p>Your subdomain is: {clientData.subdomain}</p>
      <p>Status: {clientData.status}</p>
    </div>
  );
}