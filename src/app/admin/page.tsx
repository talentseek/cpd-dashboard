'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils'; // Ensure correct path
import AdminLayout from '@/components/AdminLayout';
import DashboardComponent from '@/components/admindashboard'; // Import the DashboardComponent

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
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

        if (profile.role !== 'admin') {
          router.push('/unauthorized'); // Redirect to unauthorized page if not admin
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error('Unexpected error during data fetching:', error);
        router.push('/unauthorized');
      }
    }

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <DashboardComponent /> {/* Render the DashboardComponent within the AdminLayout */}
    </AdminLayout>
  );
}