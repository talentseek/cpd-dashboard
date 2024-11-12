// src/components/abm/AbmLandingPage.tsx

'use client';

import { Navigation } from "@/components/abm/Navigation";
import { HeroSection } from "@/components/abm/HeroSection";
import { BenefitsSection } from "@/components/abm/BenefitsSection";
import { TestimonialsSection } from "@/components/abm/TestimonialsSection";
import { HowItWorksSection } from "@/components/abm/HowItWorksSection";
import { PricingSection } from "@/components/abm/PricingSection";
import { FeaturesSection } from "@/components/abm/FeaturesSection";
import { CallToActionSection } from "@/components/abm/CallToActionSection";
import { Footer } from "@/components/abm/Footer";

import { ClientDataProps, Replacements } from '@/types/types';

interface Props {
  replacements: Replacements;
  clientData: ClientDataProps;
}

export function AbmLandingPage({ replacements, clientData }: Props) {
  // Map through testimonials and replace placeholders
  const updatedTestimonials = clientData.testimonials?.items?.map(item => ({
    content: item.content?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
    name: item.name?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
    title: item.title?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
    company: item.company?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
    jobTitle: item.jobTitle?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
    imageUrl: item.imageUrl || '/images/default-avatar.jpg',
  })) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navigation 
        logo={clientData.logo || '/images/default-logo.png'}
        ctaButtonText={clientData.call_to_action?.buttonText || clientData.ctaButtonText || 'Book my tour'}
        primaryColor={clientData.primary_color || '#0000FF'}
        showPricing={clientData.pricing !== undefined}
        ctaLink={clientData.calendar_link}
      />
      <main className="flex flex-col items-center w-full pt-16">
        {/* Hero Section Rendering */}
        <HeroSection 
          title={
            clientData.hero?.title?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
            'Default Title'
          }
          subheading={
            clientData.hero?.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
            ''
          }
          heroImage={clientData.hero?.heroImage || '/images/default-hero-image.jpg'}
          heroVideo={clientData.hero?.heroVideo || ''}
          ctaText={clientData.call_to_action?.buttonText || clientData.ctaButtonText || 'Book my tour'}
          primaryColor={clientData.primary_color || '#0000FF'}
          ctaLink={clientData.calendar_link}
        />
        {/* Benefits Section Rendering */}
        {clientData.benefits && (
          <BenefitsSection 
            mainHeading={
              clientData.benefits.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              'Key Benefits'
            }
            items={clientData.benefits.items?.map(item => ({
              heading: item.heading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              subheading: item.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
            })) || []}
            primaryColor={clientData.primary_color || '#0000FF'}
          />
        )}
        {/* Testimonials Section Rendering */}
        {clientData.testimonials && (
          <TestimonialsSection 
            mainHeading={
              clientData.testimonials.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              'What Our Clients Say'
            }
            items={updatedTestimonials}
          />
        )}
        {/* How It Works Section Rendering */}
        {clientData.how_it_works && (
          <HowItWorksSection 
            mainHeading={
              clientData.how_it_works.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              'How It Works'
            }
            subheading={
              clientData.how_it_works.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              ''
            }
            steps={clientData.how_it_works.steps?.map(step => ({
              heading: step.heading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              subheading: step.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
            })) || []}
            primaryColor={clientData.primary_color || '#0000FF'}
          />
        )}
        {/* Pricing Section Rendering */}
        {clientData.pricing && (
          <PricingSection 
            mainHeading={
              clientData.pricing.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              ''
            }
            description={
              clientData.pricing.description?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              ''
            }
            plans={clientData.pricing.plans?.map(plan => ({
              ...plan,
              name: plan.name?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              description: plan.description?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              price: plan.price?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              features: plan.features?.map(feature =>
                feature.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '')
              ) || [],
              buttonLabel: plan.buttonLabel?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
            })) || []}
          />
        )}
        {/* Features Section Rendering */}
        {clientData.features && (
          <FeaturesSection 
            mainHeading={
              clientData.features.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              "Here's What You'll Get..."
            }
            items={clientData.features.items?.map(item => ({
              heading: item.heading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
              subheading: item.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') || '',
            })) || []}
          />
        )}
        {/* Call to Action Section Rendering */}
        {clientData.call_to_action && (
          <CallToActionSection 
            mainHeading={
              clientData.call_to_action.mainHeading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              'Ready to Get Started?'
            }
            subheading={
              clientData.call_to_action.subheading?.replace(/{(\w+)}/g, (_, key) => replacements[key as keyof Replacements] || '') ||
              ''
            }
            ctaButtonText={clientData.call_to_action.buttonText || 'Contact Us'}
            primaryColor={clientData.primary_color || '#0000FF'}
            ctaLink={clientData.call_to_action.ctaLink || clientData.calendar_link}
          />
        )}
      </main>
      <Footer 
        companyName={clientData.footer?.companyName || 'Your Company'}
        links={clientData.footer?.links || []}
      />
    </div>
  );
}