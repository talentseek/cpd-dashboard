'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct hook for dynamic routing
import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import hotelFriendData from '@/mocks/hotelFriendData';
import weagleData from '@/mocks/weagleData';
import proForecastData from '@/mocks/proForecastData';
import kindLinkData from '@/mocks/kindLinkData';

const clientDataMap = {
  hotelfriend: hotelFriendData,
  weagle: weagleData,
  proforecast: proForecastData,
  kindlink: kindLinkData,
};

export default function ClientCompanyPage() {
  const { client, company } = useParams();
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    async function fetchLead() {
      if (company) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('company', company.replace(/_/g, ' '))
          .single(); // Assuming unique company names
        if (error) {
          console.error('Error fetching lead data:', error);
        } else {
          setLeadData(data);
        }
      }
    }
    fetchLead();
  }, [company]);

  if (!leadData) return <div>Loading...</div>;

  const clientData = clientDataMap[client] || {}; // Fallback if client data is not found

  // Replace placeholders with lead data
  const personalizedData = {
    ...clientData,
    hero: {
      ...clientData.hero,
      heading: clientData.hero?.heading
        ?.replace('{first_name}', leadData.first_name)
        ?.replace('{company}', leadData.company),
      subheading: clientData.hero?.subheading
        ?.replace('{first_name}', leadData.first_name)
        ?.replace('{company}', leadData.company),
    },
    benefits: clientData.benefits && {
      ...clientData.benefits,
      items: clientData.benefits.items.map(item => ({
        ...item,
        heading: item.heading.replace('{company}', leadData.company),
        subheading: item.subheading.replace('{company}', leadData.company),
      })),
    },
    howItWorks: clientData.howItWorks && {
      ...clientData.howItWorks,
      steps: clientData.howItWorks.steps.map(step => ({
        ...step,
        heading: step.heading.replace('{company}', leadData.company),
        subheading: step.subheading.replace('{company}', leadData.company),
      })),
    },
    features: clientData.features && {
      ...clientData.features,
      items: clientData.features.items.map(feature => ({
        ...feature,
        heading: feature.heading.replace('{company}', leadData.company),
        subheading: feature.subheading.replace('{company}', leadData.company),
      })),
    },
    pricing: clientData.pricing && {
      ...clientData.pricing,
      mainHeading: clientData.pricing.mainHeading.replace('{company}', leadData.company),
      plans: clientData.pricing.plans.map(plan => ({
        ...plan,
        description: plan.description.replace('{company}', leadData.company),
      })),
    },
    callToAction: clientData.callToAction && {
      ...clientData.callToAction,
      mainHeading: clientData.callToAction.mainHeading.replace('{company}', leadData.company),
      subheading: clientData.callToAction.subheading.replace('{company}', leadData.company),
    },
  };

  return <AbmLandingPage {...personalizedData} />;
}