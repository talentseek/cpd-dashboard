'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import hotelFriendData from '@/mocks/hotelFriendData';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';

export default function CompanyLandingPage() {
  const { company } = useParams();
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    async function fetchLead() {
      if (company) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('company', company.replace(/_/g, ' '))
          .single();
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

  // Replace placeholders with lead data
  const personalizedData = {
    ...hotelFriendData,
    hero: {
      ...hotelFriendData.hero,
      heading: hotelFriendData.hero.heading
        .replace('{first_name}', leadData.first_name)
        .replace('{company}', leadData.company),
      subheading: hotelFriendData.hero.subheading
        .replace('{first_name}', leadData.first_name)
        .replace('{company}', leadData.company),
    },
    benefits: {
      ...hotelFriendData.benefits,
      items: hotelFriendData.benefits.items.map(item => ({
        ...item,
        subheading: item.subheading
          .replace('{first_name}', leadData.first_name)
          .replace('{company}', leadData.company),
      })),
    },
    howItWorks: {
      ...hotelFriendData.howItWorks,
      subheading: hotelFriendData.howItWorks.subheading
        .replace('{first_name}', leadData.first_name)
        .replace('{company}', leadData.company),
      steps: hotelFriendData.howItWorks.steps.map(step => ({
        ...step,
        subheading: step.subheading
          .replace('{first_name}', leadData.first_name)
          .replace('{company}', leadData.company),
      })),
    },
    features: {
      ...hotelFriendData.features,
      items: hotelFriendData.features.items.map(item => ({
        ...item,
        subheading: item.subheading
          .replace('{first_name}', leadData.first_name)
          .replace('{company}', leadData.company),
      })),
    },
    pricing: {
      ...hotelFriendData.pricing,
      mainHeading: hotelFriendData.pricing.mainHeading.replace('{company}', leadData.company),
      plans: hotelFriendData.pricing.plans.map(plan => ({
        ...plan,
        description: plan.description
          .replace('{first_name}', leadData.first_name)
          .replace('{company}', leadData.company),
        features: plan.features.map(feature =>
          feature.replace('{first_name}', leadData.first_name).replace('{company}', leadData.company)
        ),
      })),
    },
    callToAction: {
      ...hotelFriendData.callToAction,
      mainHeading: hotelFriendData.callToAction.mainHeading.replace('{company}', leadData.company),
      subheading: hotelFriendData.callToAction.subheading
        .replace('{first_name}', leadData.first_name)
        .replace('{company}', leadData.company),
    },
  };

  return <AbmLandingPage {...personalizedData} />;
}