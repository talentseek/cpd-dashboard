import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import Head from 'next/head'; // For adding OpenGraph and other meta tags

interface ClientDataProps {
  hero?: {
    title?: string;
    heroImage?: string;
  };
  description?: string;
}

interface LeadDataProps {
  first_name?: string;
  company?: string;
}

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

export default async function ClientCompanyPage(props: { params: Promise<{ client: string; company: string }> }) {
  const resolvedParams = await props.params; // Awaiting params as it may be a promise
  const { client, company } = resolvedParams;

  console.log('Params:', resolvedParams);

  const clientData: ClientDataProps | null = await fetchClientData(client);
  const leadData: LeadDataProps | null = await fetchLeadData(company);

  if (!clientData || !leadData) {
    console.error('Client or lead data could not be fetched');
    return <div>Unable to load data. Please try again later.</div>;
  }

  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  const ogTitle =
    clientData.hero?.title
      ?.replace(/{first_name}/g, replacements.first_name)
      .replace(/{company}/g, replacements.company)
      .trim() || 'Custom Page Title';

  const ogDescription =
    clientData.description?.replace(/{company}/g, replacements.company) ||
    'Default page description for the lead.';
  const ogImage = clientData.hero?.heroImage || '/default-og-image.jpg';

  // Determine current URL for custom domains
  const currentUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://${process.env.NEXT_PUBLIC_DOMAIN}/${client}/${company}`;

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <AbmLandingPage clientData={clientData} replacements={replacements} />
    </>
  );
}