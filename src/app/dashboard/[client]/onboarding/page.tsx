'use client';

import OnboardingForm from '@/components/onboarding-form';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const params = useParams();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get client param safely
  const clientParam = params.client as string;

  useEffect(() => {
    async function checkAccess() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.push('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          console.error('Error fetching profile data:', profileError);
          router.push('/login');
          return;
        }

        // Check if user has already submitted onboarding form
        const { data: onboardingData, error: onboardingError } = await supabase
          .from('client_onboarding')
          .select('*')
          .eq('client_id', profile.client_id)
          .single();

        if (onboardingData) {
          // If form already submitted, redirect to dashboard
          router.push(`/dashboard/${clientParam}`);
          return;
        }

        setIsAllowed(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking access:', error);
        router.push('/login');
      }
    }

    checkAccess();
  }, [router, clientParam]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Client Onboarding</h1>
        <p className="text-gray-500 mt-2">
          Please complete this form to help us understand your business and goals better.
        </p>
      </div>
      <OnboardingForm clientSlug={clientParam} />
    </div>
  );
}