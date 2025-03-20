// src/app/[page]/page.tsx

import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import ProForecastLandingPage from '@/components/ProForecastLandingPage'; // Custom ProForecast template
import AapoonLandingPage from '@/components/AapoonLandingPage'; // Custom Aapoon template
import KaskoLandingPage from '@/components/KaskoLandingPage'; // Custom KASKO template
import GeneoLandingPage from '@/components/GeneoLandingPage'; // Custom Geneo template
import FocusHQLandingPage from '@/components/FocusHQLandingPage'; // Custom Focus HQ template
import QASolveLandingPage from '@/components/QASolveLandingPage'; // Custom QASolve template
import EmbryonicLandingPage from '@/components/EmbryonicLandingPage'; // Custom Embryonic Studio template
import HRoesLandingPage from '@/components/HRoesLandingPage'; // Custom HRoes template
import CleverlyLandingPage from '@/components/CleverlyLandingPage'; // Custom Cleverly template
import LeezlyLandingPage from '@/components/LeezlyLandingPage'; // Custom Leezly template
import EvolutionSGLandingPage from '@/components/EvolutionSGLandingPage'; // Custom Evolution SG template
import MailMonitorLandingPage from '@/components/MailMonitorLandingPage'; // Custom MailMonitor template
import AdasightLandingPage from '@/components/AdasightLandingPage'; // Custom Adasight template
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
    .eq('subdomain', host)
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
  console.log('DEBUG: fetchLeadDataForClient =>', { firstName, surnameInitial, companyName, clientId });
  
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

  const matchingLead = leads.find((lead) => {
    const dbCompanyName = normalizeString(lead.company);
    return dbCompanyName === normalizeString(companyName);
  });

  console.log('DEBUG: Full lead data:', matchingLead);

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
export const revalidate = 604800; // 7 days in seconds

// ============ 4) Generate dynamic metadata (optional)
export const generateMetadata = async ({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> => {
  const { page } = await params;
  const { firstName, surnameInitial, companyName } = parseLandingPageURL(page);
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  console.log('DEBUG: generateMetadata => host =', host);

  if (host === 'app.costperdemo.com') {
    console.log('DEBUG: On main domain => fallback logic...');
  }

  const client = await fetchClientByHost(host);
  if (!client) {
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

  const leadData = await fetchLeadDataForClient(firstName, surnameInitial, companyName, client.id);
  if (!leadData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch lead data for this client.',
      openGraph: { title: 'Error', description: 'No lead found.', images: ['/default-og-image.jpg'] },
    };
  }

  const clientData = await fetchClientData(client.id);
  if (!clientData) {
    return {
      title: 'Error loading data',
      description: 'Unable to fetch client content for this client.',
      openGraph: { title: 'Error', description: 'No client content found.', images: ['/default-og-image.jpg'] },
    };
  }

  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
    custom: leadData.personalization || {},
    vc: leadData.vc || {}
  };

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

  // Normalize landing_page_template value for comparison
  const template = client.landing_page_template?.toLowerCase().trim();

  // Conditionally set robots meta tag to noindex for the embryonic template
  const robots = template === "embryonic" ? "noindex" : undefined;

  return {
    title: ogTitle,
    description: ogDescription,
    robots, // Add robots metadata to prevent indexing for embryonic template
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
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  console.log('DEBUG: Page => host =', host);

  if (host === 'app.costperdemo.com') {
    console.log('DEBUG: main domain fallback => custom approach');
  }

  const client = await fetchClientByHost(host);
  if (!client) {
    return <div>No matching client found for subdomain: {host}</div>;
  }

  const leadData = await fetchLeadDataForClient(firstName, surnameInitial, companyName, client.id);
  if (!leadData) {
    return <div>Unable to load lead data. Possibly no match for this client + page slug.</div>;
  }

  const clientData = await fetchClientData(client.id);
  if (!clientData) {
    return <div>Unable to load client data from client_content table.</div>;
  }

  const replacements = {
    first_name: leadData.first_name || 'Guest',
    company: leadData.company || 'Your Company',
    custom: leadData.personalization || {},
    vc: leadData.vc || {}
  };

  // Normalize landing_page_template value for comparison
  const template = client.landing_page_template?.toLowerCase().trim();

  if (client.landing_page_type === "custom") {
    if (template === "proforecast") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <ProForecastLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "aapoon") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <AapoonLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "kasko") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <KaskoLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "geneo") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <GeneoLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "focushq") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <FocusHQLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "qasolve") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <QASolveLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "embryonic") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <EmbryonicLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "hroes") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <HRoesLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "cleverly") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <CleverlyLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "leezly") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <LeezlyLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "evolutionsg") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <EvolutionSGLandingPage replacements={replacements} />
        </>
      );
    }
    if (template === "mailmonitor") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <MailMonitorLandingPage
            firstName={replacements.first_name}
            company={replacements.company}
            role={replacements.custom.role || "email marketing lead"}
            painPoint={replacements.custom.pain_point || "emails landing in spam"}
          />
        </>
      );
    }
    if (template === "adasight") {
      return (
        <>
          <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
          <AdasightLandingPage
            firstName={replacements.first_name}
            lastName={leadData.last_name || ""}
            company={replacements.company}
            position={leadData.position || ""}
          />
        </>
      );
    }
  }

  // Otherwise, render the default ABM landing page
  return (
    <>
      <TrackVisit clientId={leadData.client_id} leadId={leadData.id} />
      <AbmLandingPage clientData={clientData} replacements={replacements} />
    </>
  );
}