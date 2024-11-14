// src/app/[page]/page.tsx

import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import { Metadata } from 'next';
import { parseLandingPageURL, normalizeString } from '@/utils/urlHelpers';
import TrackVisit from '@/components/TrackVisit'; // Importing TrackVisit component

// Utility to ensure full URL for OG Image
function constructFullUrl(relativePath: string): string {
  if (relativePath.startsWith('http')) {
    return relativePath; // Already a full URL
  }
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'app.costperdemo.com';
  return `https://${domain}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}

// Fetch Lead Data from Supabase
async function fetchLeadData(firstName: string, surnameInitial: string, companyName: string) {
  console.log('Fetching lead data with:', { firstName, surnameInitial, companyName });

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .ilike('first_name', firstName)
    .ilike('last_name', `${surnameInitial}%`);

  if (error || !leads || leads.length === 0) {
    console.error('Error fetching lead data:', error || 'No leads found');
    return null;
  }

  const matchingLead = leads.find((lead) => {
    const dbCompanyName = normalizeString(lead.company);
    return dbCompanyName === normalizeString(companyName);
  });

  return matchingLead || null;
}

// Fetch Client Data from Supabase
async function fetchClientData(clientId: number) {
  const { data: clientData, error: clientDataError } = await supabase
    .from('client_content')
    .select('*')
    .eq('client_id', clientId)
    .single();

  if (clientDataError) {
    console.error('Error fetching client content data:', clientDataError);
  }

  return clientData || null;
}


// Static Revalidation Time (7 days)
export const revalidate = 604800;

// Dynamic Metadata generation
export const generateMetadata = async ({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> => {
  const { page } = await params;
  const { firstName, surnameInitial, companyName } = parseLandingPageURL(page);
  const leadData = await fetchLeadData(firstName, surnameInitial, companyName);

  if (!leadData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch lead data for the requested page.',
      openGraph: { title: 'Error', description: 'There was an error fetching data.', images: ['/default-og-image.jpg'], type: 'website' },
      twitter: { card: 'summary_large_image', title: 'Error', description: 'There was an error fetching data.', images: ['/default-og-image.jpg'] },
    };
  }

  const clientData = await fetchClientData(leadData.client_id);

  if (!clientData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch client data for the requested page.',
      openGraph: { title: 'Error', description: 'There was an error fetching data.', images: ['/default-og-image.jpg'], type: 'website' },
      twitter: { card: 'summary_large_image', title: 'Error', description: 'There was an error fetching data.', images: ['/default-og-image.jpg'] },
    };
  }

  const replacements = { first_name: leadData.first_name || 'Guest', company: leadData.company || 'Your Company' };
  const ogTitle = clientData.hero?.title?.replace(/{first_name}/g, replacements.first_name).replace(/{company}/g, replacements.company).trim() || 'Custom Page Title';
  const ogDescription = clientData.description?.replace(/{company}/g, replacements.company) || 'Default page description for the lead.';
  const ogImage = constructFullUrl(clientData.hero?.heroImage || '/default-og-image.jpg');
  const currentUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${page}`;

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: { title: ogTitle, description: ogDescription, images: [ogImage], type: 'website', url: currentUrl },
    twitter: { card: 'summary_large_image', title: ogTitle, description: ogDescription, images: [ogImage] },
  };
};

// Page Component to display content
export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const { firstName, surnameInitial, companyName } = parseLandingPageURL(page);
  const leadData = await fetchLeadData(firstName, surnameInitial, companyName);

  if (!leadData) {
    return <div>Unable to load data. Please try again later.</div>;
  }

  const clientData = await fetchClientData(leadData.client_id);

  if (!clientData) {
    return <div>Unable to load data. Please try again later.</div>;
  }

  const replacements = { first_name: leadData.first_name || 'Guest', company: leadData.company || 'Your Company' };

  return (
    <>
      {/* TrackVisit component for visit tracking */}
      <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />

      <AbmLandingPage clientData={clientData} replacements={replacements} />
    </>
  );
}