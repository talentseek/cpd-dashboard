// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/utils'; // Ensure correct path
import AdminLayout from '@/components/AdminLayout';
import DashboardComponent from '@/components/admindashboard'; // Adjust import if needed

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not authenticated:', userError);
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('Error fetching user profile:', profileError);
        router.push('/unauthorized'); // Redirect if profile fetch fails
        return;
      }

      // Check if user has admin role
      if (profile.role !== 'admin') {
        router.push('/unauthorized'); // Redirect to unauthorized page if not admin
        return;
      }

      setLoading(false);
    }

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <DashboardComponent />
    </AdminLayout>
  );
}