// src/app/[page]/page.tsx

import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import { Metadata } from 'next';
import { parseLandingPageURL, normalizeString } from '@/utils/urlHelpers';
import TrackVisit from '@/components/TrackVisit';
import { headers } from 'next/headers';

// ============ Utility: Construct full URL for OG Image
function constructFullUrl(relativePath: string): string {
  if (relativePath.startsWith('http')) {
    return relativePath; // Already absolute
  }
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'app.costperdemo.com';
  return `https://${domain}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}

// ============ 1) Fetch client by subdomain
async function fetchClientByHost(host: string) {
  console.log('DEBUG: Looking for client with subdomain =', host);

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('subdomain', host) // must match exactly what's in the DB
    .single();

  if (error) {
    console.error('Error fetching client by subdomain:', error);
    return null;
  }
  console.log('DEBUG: Found client =', client);
  return client;
}

// ============ 2) Fetch a single lead for that client
async function fetchLeadDataForClient(
  firstName: string,
  surnameInitial: string,
  companyName: string,
  clientId: number
) {
  console.log('DEBUG: fetchLeadDataForClient =>', {
    firstName,
    surnameInitial,
    companyName,
    clientId,
  });
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .eq('client_id', clientId)
    .ilike('first_name', firstName)
    .ilike('last_name', `${surnameInitial}%`);

  if (error || !leads || leads.length === 0) {
    console.error('Error or no leads found =>', error);
    return null;
  }

  // find the one that has a matching normalized company
  const matchingLead = leads.find((lead) => {
    const dbCompanyName = normalizeString(lead.company);
    return dbCompanyName === normalizeString(companyName);
  });

  if (!matchingLead) {
    console.error('No lead matched companyName =>', companyName);
  }
  return matchingLead || null;
}

// ============ 3) Fetch client content from client_content
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

// ============ Example: revalidate after 7 days
export const revalidate = 604800; // 7 * 24 * 60 * 60

// ============ 4) Generate dynamic metadata (optional)
export const generateMetadata = async ({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> => {
  const { page } = await params;
const { firstName, surnameInitial, companyName } = parseLandingPageURL(page);
const headersList = await headers();
const host = headersList.get('host') ?? '';
console.log('DEBUG: generateMetadata => host =', host);

  // If the user is on your main domain and you want fallback:
  if (host === 'app.costperdemo.com') {
    // EITHER do old logic, or skip subdomain matching, or set defaultClientId
    // For example:
    console.log('DEBUG: On main domain => fallback logic...');
    // If you skip subdomain logic entirely here, you might do your older approach:
    //   1) Just fetch all leads matching the name
    //   2) pick the first that matches the company
    //   3) (No eq('client_id', X))
    // This code is omitted for brevity. 
    // We'll continue with subdomain approach for everything else...
  }

  // Otherwise do subdomain approach
  const client = await fetchClientByHost(host);
  if (!client) {
    // Return some minimal error metadata
    return {
      title: 'Error loading data',
      description: `No client found for subdomain: ${host}`,
      openGraph: {
        title: 'Error',
        description: `No client found for host: ${host}`,
        images: ['/default-og-image.jpg'],
      },
    };
  }

  // fetch the lead
  const leadData = await fetchLeadDataForClient(firstName, surnameInitial, companyName, client.id);
  if (!leadData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch lead data for this client.',
      openGraph: { title: 'Error', description: 'No lead found.', images: ['/default-og-image.jpg'] },
    };
  }

  // fetch client content
  const clientData = await fetchClientData(client.id);
  if (!clientData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch client content for this client.',
      openGraph: { title: 'Error', description: 'No client content found.', images: ['/default-og-image.jpg'] },
    };
  }

  // Build final metadata
  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  // Example: use placeholders in the hero title, or fallback if missing
  const ogTitle =
    clientData.hero?.title
      ?.replace(/{first_name}/g, replacements.first_name)
      .replace(/{company}/g, replacements.company)
      .trim() || 'Custom Page Title';

  const ogDescription =
    clientData.description
      ?.replace(/{company}/g, replacements.company) ||
    'Default page description for the lead.';

  const ogImage = constructFullUrl(clientData.hero?.heroImage || '/default-og-image.jpg');
  const currentUrl = `https://${host}/${page}`;

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

// ============ 5) The main Page component
export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const { firstName, surnameInitial, companyName } = parseLandingPageURL(page);

// 1) Determine host
const headersList = await headers();
const host = headersList.get('host') ?? '';
console.log('DEBUG: Page => host =', host);

  // 2) (Optional) Fallback if on main domain
  if (host === 'app.costperdemo.com') {
    console.log('DEBUG: main domain fallback => either do old logic or custom approach');
    // If you want to keep the old logic for old links,
    // you could do your original fetchLeadData with no eq('client_id'...) etc. 
    // For brevity, skip that approach here. 
    // We'll continue subdomain approach for everything else...
  }

  // 3) Find the matching client by subdomain
  const client = await fetchClientByHost(host);
  if (!client) {
    return <div>No matching client found for subdomain: {host}</div>;
  }

  // 4) Now fetch the lead (client restricted)
  const leadData = await fetchLeadDataForClient(firstName, surnameInitial, companyName, client.id);
  if (!leadData) {
    return <div>Unable to load lead data. Possibly no match for this client + page slug.</div>;
  }

  // 5) Fetch the client content
  const clientData = await fetchClientData(client.id);
  if (!clientData) {
    return <div>Unable to load client data from client_content table.</div>;
  }

  // 6) Render the ABM page
  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
  };

  return (
    <>
      <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
      <AbmLandingPage clientData={clientData} replacements={replacements} />
    </>
  );
}