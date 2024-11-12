'use client'; // Mark this component as a client component

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';

interface ClientData {
  subdomain: string;
  status: string;
  client_name: string; // Added client name to dynamically link to dashboard
}

interface UserProfile {
  client_id: string;
}

const QuickStartPage = () => {
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');
  const [clientData, setClientData] = useState<ClientData | null>(null);  // State to store client data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);  // To store user profile and get dynamic client data

  // Fetch user profile from supabase (to dynamically get the client name)
  useEffect(() => {
    async function fetchUserProfile() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      } else {
        // If user is available, proceed with fetching the profile
        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError || !profile) {
            console.error('Error fetching user profile:', profileError);
          } else {
            setUserProfile(profile);
            fetchSubdomainStatus(profile.client_id);  // Use the client_id from the user profile to fetch client data
          }
        }
      }
    }

    fetchUserProfile();
  }, []);

  const fetchSubdomainStatus = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('subdomain, status, client_name')  // Fetch client_name dynamically
        .eq('id', clientId)  // Use dynamic client_id
        .single();

      if (error) {
        console.error('Error fetching subdomain status', error);
        setMessage('Unable to fetch subdomain details. Please try again later.');
      } else {
        setClientData(data); // Store the subdomain status
      }
    } catch (error) {
      console.error('Error fetching subdomain status', error);
      setMessage('Unable to fetch subdomain details. Please try again later.');
    }
  };

  // Function to handle domain verification
  const handleDomainVerification = async () => {
    if (clientData && domain === clientData.subdomain) {
      // Update the status to 'verified' in the Supabase table
      const { error } = await supabase
        .from('clients')
        .update({ status: 'verified' })
        .eq('id', userProfile!.client_id);  // Dynamically update using client_id

      if (error) {
        setMessage('Error verifying domain. Please try again.');
        console.error('Error verifying domain:', error);
      } else {
        setMessage('Domain verified successfully! You can now proceed.');
      }
    } else {
      setMessage('Invalid domain. Please check your DNS configuration.');
    }
  };

  // If client data is fetched, display accordingly
  if (clientData) {
    return (
      <ClientLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold">Quick Start Guide</h1>
          <div className="mt-6">
            <p>Your subdomain is: {clientData.subdomain}</p>
            <p>Status: {clientData.status}</p>
          </div>

          {/* If the domain is not verified, show the input field */}
          {clientData.status === 'pending' && (
            <>
              <div className="mt-6">
                <label htmlFor="domain" className="block text-lg">Enter your subdomain:</label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded"
                  placeholder="e.g. go.costperdemo.com"
                />
              </div>

              <button
                onClick={handleDomainVerification}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Verify Domain
              </button>
            </>
          )}

          {/* Display verification status message */}
          {message && (
            <div className={`mt-4 p-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'} rounded`}>
              <p>{message}</p>
            </div>
          )}

          {/* After successful verification, include a link to the dashboard */}
          {message.includes('success') && (
            <div className="mt-6">
              <Link href={`/dashboard/${clientData.client_name}`} className="text-blue-600 hover:underline">
                Go to your Dashboard
              </Link>
            </div>
          )}
        </div>
      </ClientLayout>
    );
  }

  return (
    <div>Loading...</div> // Show loading state until client data is fetched
  );
};

export default QuickStartPage;