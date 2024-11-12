'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import Head from 'next/head'; // For adding OpenGraph and other meta tags

import { ClientDataProps, Replacements } from '@/types/types';

interface LeadDataProps {
  first_name?: string;
  company?: string;
}

async function fetchClientData(clientId: number) {
  const { data, error } = await supabase
    .from('client_content')
    .select('*')
    .eq('client_id', clientId)
    .single();

  if (error) {
    console.error('Error fetching client data:', error);
    return null;
  }
  return data;
}

async function fetchLeadData(leadId: number) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (error) {
    console.error('Error fetching lead data:', error);
    return null;
  }
  return data;
}

export default function ClientCompanyPage() {
  const { client } = useParams();
  const [clientData, setClientData] = useState<ClientDataProps | null>(null);
  const [leadData, setLeadData] = useState<LeadDataProps | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Dynamically determine clientId and leadId as per your logic
      const clientId = client === 'hotelfriend' ? 1 : null; // Example, replace with dynamic logic
      const leadId = 1; // Example, should be dynamic

      if (clientId && leadId) {
        const fetchedClientData = await fetchClientData(clientId);
        const fetchedLeadData = await fetchLeadData(leadId);
        setClientData(fetchedClientData);
        setLeadData(fetchedLeadData);
      }
    }
    fetchData();
  }, [client]);

  if (!clientData || !leadData) return <div>Loading...</div>;

  const replacements: Replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  // Generate OpenGraph metadata content
  const ogTitle =
    clientData.hero?.title
      ?.replace(/{first_name}/g, replacements.first_name)
      .replace(/{company}/g, replacements.company)
      .trim() || 'Custom Page Title';

  const ogDescription =
    clientData.description?.replace(/{company}/g, replacements.company) ||
    'Default page description for the lead.';
  const ogImage = clientData.hero?.heroImage || '/default-og-image.jpg'; // Fallback OG image

  return (
    <>
      <Head>
        {/* Static or conditionally server-side fetched meta tags */}
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            typeof window !== 'undefined' ? window.location.href : ''
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <AbmLandingPage
        clientData={clientData}
        replacements={replacements} // Pass the replacements
      />
    </>
  );
}