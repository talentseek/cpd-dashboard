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
          <h1 className="text-3xl font-bold mb-6 text-center">Quick Start Guide</h1>
          
          {/* Instructions for setting up DNS */}
          <div className="bg-gray-50 p-6 rounded-md shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Domain Setup Instructions</h2>
            <p className="text-lg">
              To complete the setup, you need to point your subdomain to the correct address. Follow these steps:
            </p>
            <ol className="list-decimal list-inside mt-4 text-lg">
              <li>Login to your DNS provider&#39;s management dashboard.</li>
              <li>Create a new DNS record:
                <ul className="list-inside">
                  <li><strong>Type:</strong> CNAME</li>
                  <li><strong>Name:</strong> go</li>
                  <li><strong>Value:</strong> cname.vercel-dns.com.</li>
                </ul>
              </li>
              <li>Save the DNS changes. The update may take a few minutes to propagate.</li>
              <li>Once your DNS is set up, come back here to verify the domain.</li>
            </ol>
          </div>

          {/* Current Subdomain & Status */}
          <div className="bg-gray-50 p-6 rounded-md shadow-md mb-8">
            <p className="text-lg">Your subdomain is: <strong>{clientData.subdomain}</strong></p>
            <p className="text-lg mt-2">Status: <strong>{clientData.status}</strong></p>
          </div>

          {/* Domain Verification */}
          {clientData.status === 'pending' && (
            <>
              <div className="mb-6">
                <label htmlFor="domain" className="block text-lg font-medium">Enter your subdomain:</label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  placeholder="e.g. go.yourdomain.com"
                />
              </div>

              <button
                onClick={handleDomainVerification}
                className="w-full p-3 bg-blue-500 text-white rounded-lg"
              >
                Verify Domain
              </button>
            </>
          )}

          {/* Verification Message */}
          {message && (
            <div className={`mt-4 p-4 ${message.includes('success') ? 'bg-green-100' : 'bg-red-100'} rounded-lg`}>
              <p className="text-center">{message}</p>
            </div>
          )}

          {/* After successful verification, show link to Dashboard */}
          {message.includes('success') && (
            <div className="mt-6 text-center">
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
    <div className="text-center py-8">Loading...</div> // Show loading state until client data is fetched
  );
};

export default QuickStartPage;