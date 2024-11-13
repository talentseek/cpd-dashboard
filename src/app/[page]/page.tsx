import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import { Metadata } from 'next';

// Fetch Client Data from Supabase
async function fetchClientData(clientName: string) {
  const { data: clientRecord, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .ilike('client_name', clientName)
    .single();

  if (clientError || !clientRecord) {
    console.error('Error fetching client ID:', clientError || 'No client found');
    return null;
  }

  const clientId = clientRecord.id;

  const { data: clientData, error: clientDataError } = await supabase
    .from('client_content')
    .select('*')
    .eq('client_id', clientId)
    .single();

  if (clientDataError) {
    console.error('Error fetching client content data:', clientDataError);
    return null;
  }

  return clientData;
}

// Fetch Lead Data from Supabase
async function fetchLeadData(company: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .ilike('company', company)
    .single();

  if (error || !data) {
    console.error('Error fetching lead data:', error || 'No lead found');
    return null;
  }
  return data;
}

// Static Revalidation Time (7 days)
export const revalidate = 604800; // 7 days in seconds

// Dynamic Metadata generation
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> => {
  // Await the params since it's now a Promise
  const { page } = await params;
  const [client, company] = page.split('-');

  // Fetch data for metadata generation
  const clientData = await fetchClientData(client);
  const leadData = await fetchLeadData(company);

  if (!clientData || !leadData) {
    console.error('Client or lead data could not be fetched for metadata');
    return {
      title: 'Error loading data',
      description: 'Unable to fetch client or lead data for the requested page.',
      openGraph: {
        title: 'Error',
        description: 'There was an error fetching data for this page.',
        images: ['/default-og-image.jpg'],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Error',
        description: 'There was an error fetching data for this page.',
        images: ['/default-og-image.jpg'],
      },
    };
  }

  // Replacements for dynamic values in metadata
  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  // Dynamic Open Graph and Twitter meta information
  const ogTitle =
    clientData.hero?.title
      ?.replace(/{first_name}/g, replacements.first_name)
      .replace(/{company}/g, replacements.company)
      .trim() || 'Custom Page Title';

  const ogDescription =
    clientData.description?.replace(/{company}/g, replacements.company) ||
    'Default page description for the lead.';
  const ogImage = clientData.hero?.heroImage || '/default-og-image.jpg';

  const currentUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${client}-${company}`;

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
      type: 'website',
      url: currentUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
};

// Page Component to display content
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  // Await the params since it's now a Promise
  const { page } = await params;
  const [client, company] = page.split('-');

  // Fetch data for page content
  const clientData = await fetchClientData(client);
  const leadData = await fetchLeadData(company);

  if (!clientData || !leadData) {
    console.error('Client or lead data could not be fetched');
    return <div>Unable to load data. Please try again later.</div>;
  }

  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  return (
    <>
      {/* Dynamic content */}
      <AbmLandingPage clientData={clientData} replacements={replacements} />
    </>
  );
}