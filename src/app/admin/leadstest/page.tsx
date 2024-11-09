'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils';
import { AdminLayout } from '@/components/AdminLayout';
import { LeadOverviewTable } from '@/components/LeadOverviewTable';

export default function LeadsTestPage() {
  const [userRole, setUserRole] = useState('');
  const [leads, setLeads] = useState([]);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    async function fetchUserProfile() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('Error fetching user:', error);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      setUserRole(profile.role);
      setClientId(profile.client_id);

      let query = supabase.from('leads').select('*');

      if (profile.role !== 'admin') {
        query = query.eq('client', profile.client_id);
      }

      const { data, error: leadsError } = await query;
      if (leadsError) {
        console.error('Error fetching leads:', leadsError);
      } else {
        setLeads(data);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <AdminLayout>
      <LeadOverviewTable leads={leads} userRole={userRole} clientId={clientId} />
    </AdminLayout>
  );
}