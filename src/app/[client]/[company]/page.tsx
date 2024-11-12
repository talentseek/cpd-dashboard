'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import { AbmLandingPage } from '@/components/abm/AbmLandingPage';
import hotelFriendData from '@/mocks/hotelFriendData';

interface ClientDataProps {
  hero?: {
    title: string;
    subheading: string;
    heroImage: string;
  };
  primaryColor?: string;
  pageTitle?: string;
  description?: string;
  ctaButtonText?: string;
  ctaLink?: string;
  logo?: string;
  benefits?: {
    mainHeading: string;
    items: Array<{
      heading: string;
      subheading: string;
    }>;
  };
  testimonials?: {
    mainHeading: string;
    items: Array<{
      title: string;
      content: string;
      name: string;
      jobTitle: string;
      company: string;
      imageUrl?: string;
    }>;
  };
  howItWorks?: {
    mainHeading: string;
    subheading: string;
    steps: Array<{
      heading: string;
      subheading: string;
    }>;
  };
  pricing?: {
    mainHeading: string;
    description?: string;
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: Array<string>;
      buttonLabel?: string;
    }>;
  };
  features?: {
    mainHeading: string;
    items: Array<{
      heading: string;
      subheading: string;
    }>;
  };
  callToAction?: {
    mainHeading: string;
    subheading: string;
    buttonText: string;
  };
  footer?: {
    companyName: string; // Made sure this is always defined
    links: Array<{ label: string; href: string }>;
  };
}

const clientDataMap: Record<string, ClientDataProps> = {
  hotelfriend: hotelFriendData,
};

export default function ClientCompanyPage() {
  const { client, company } = useParams();
  const [leadData, setLeadData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function fetchLead() {
      if (company && typeof company === 'string') {
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

  const clientStr = typeof client === 'string' ? client : '';
  const clientData = clientDataMap[clientStr] || {
    hero: { title: 'Default Title', subheading: 'Default Subheading', heroImage: '/default-image.jpg' },
    primaryColor: '#000',
    pageTitle: 'Default Title',
    description: 'Default Description',
    ctaButtonText: 'Learn More',
    ctaLink: '#',
    logo: '',
    benefits: {
      mainHeading: 'Default Benefits Heading',
      items: [
        { heading: 'Default Benefit 1', subheading: 'Default subheading 1' },
        { heading: 'Default Benefit 2', subheading: 'Default subheading 2' },
      ],
    },
    testimonials: {
      mainHeading: 'Default Testimonials Heading',
      items: [
        { title: 'Default Testimonial 1', content: 'Default content 1', name: 'Default Name 1', jobTitle: 'Default Job 1', company: 'Default Company 1', imageUrl: '/placeholder.svg' },
        { title: 'Default Testimonial 2', content: 'Default content 2', name: 'Default Name 2', jobTitle: 'Default Job 2', company: 'Default Company 2', imageUrl: '/placeholder.svg' },
      ],
    },
    howItWorks: {
      mainHeading: 'Default How It Works Heading',
      subheading: 'Default How It Works Subheading',
      steps: [
        { heading: 'Default Step 1', subheading: 'Default subheading 1' },
        { heading: 'Default Step 2', subheading: 'Default subheading 2' },
      ],
    },
    pricing: {
      mainHeading: 'Default Pricing Heading',
      description: 'Default pricing description',
      plans: [
        { name: 'Default Plan', price: '$0/month', description: 'Default description', features: ['Default feature 1'], buttonLabel: 'Select' },
      ],
    },
    features: {
      mainHeading: "Default Features Heading",
      items: [
        { heading: "Default Feature 1", subheading: "Default Feature 1 Subheading" },
        { heading: "Default Feature 2", subheading: "Default Feature 2 Subheading" },
      ],
    },
    callToAction: {
      mainHeading: "Default CTA Heading",
      subheading: "Default CTA Subheading",
      buttonText: "Default CTA Button",
    },
    footer: {
      companyName: "Default Company", // Ensured default companyName is always present
      links: [],
    },
  };

  const replacePlaceholders = (text: string, replacements: Record<string, string>) => {
    if (!text) return text;
    return text.replace(/{(\w+)}/g, (_, key) => replacements[key] || '');
  };

  const replacements = {
    first_name: leadData?.first_name || '',
    company: leadData?.company || '',
  };

  const personalizedData: ClientDataProps = {
    ...clientData,
    hero: clientData.hero
      ? {
          ...clientData.hero,
          title: replacePlaceholders(clientData.hero.title, replacements),
          subheading: replacePlaceholders(clientData.hero.subheading, replacements),
          heroImage: clientData.hero.heroImage,
        }
      : undefined,
    pageTitle: replacePlaceholders(clientData.pageTitle || '', replacements),
    description: replacePlaceholders(clientData.description || '', replacements),
    benefits: clientData.benefits
      ? {
          ...clientData.benefits,
          items: clientData.benefits.items.map(item => ({
            heading: replacePlaceholders(item.heading, replacements),
            subheading: replacePlaceholders(item.subheading, replacements),
          })),
        }
      : undefined,
    testimonials: clientData.testimonials,
    howItWorks: clientData.howItWorks
      ? {
          ...clientData.howItWorks,
          mainHeading: replacePlaceholders(clientData.howItWorks.mainHeading, replacements),
          subheading: replacePlaceholders(clientData.howItWorks.subheading, replacements),
          steps: clientData.howItWorks.steps.map(step => ({
            heading: replacePlaceholders(step.heading, replacements),
            subheading: replacePlaceholders(step.subheading, replacements),
          })),
        }
      : undefined,
    pricing: clientData.pricing
      ? {
          ...clientData.pricing,
          mainHeading: replacePlaceholders(clientData.pricing.mainHeading, replacements),
          description: replacePlaceholders(clientData.pricing.description || '', replacements),
          plans: clientData.pricing.plans.map(plan => ({
            ...plan,
            description: replacePlaceholders(plan.description, replacements),
          })),
        }
      : undefined,
    features: clientData.features
      ? {
          ...clientData.features,
          items: clientData.features.items.map(item => ({
            heading: replacePlaceholders(item.heading, replacements),
            subheading: replacePlaceholders(item.subheading, replacements),
          })),
        }
      : undefined,
    callToAction: clientData.callToAction
      ? {
          ...clientData.callToAction,
          mainHeading: replacePlaceholders(clientData.callToAction.mainHeading, replacements),
          subheading: replacePlaceholders(clientData.callToAction.subheading, replacements),
        }
      : undefined,
  };

  return <AbmLandingPage {...personalizedData} />;
}