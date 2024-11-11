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
import { LandingPageProps } from "@/types/abmLandingPage";

// New prop type definition for lead data
interface AbmLandingPageProps extends LandingPageProps {
  leadData?: {
    first_name?: string;
    company?: string;
  };
}

const replacePlaceholders = (text: string, replacements: Record<string, string>) => {
  if (!text) return text;
  return text.replace(/{(\w+)}/g, (_, key) => replacements[key] || '');
};

export function AbmLandingPage(props: AbmLandingPageProps) {
  const hero = props.hero || { title: "Default Title", subheading: "Default Subheading", heroImage: "/images/default-hero.webp" };

  // Use leadData if available, otherwise fall back to default values
  const replacements = {
    first_name: props.leadData?.first_name || 'Guest',
    company: props.leadData?.company || 'Your Company',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navigation 
        logo={props.logo} 
        ctaButtonText={props.ctaButtonText} 
        primaryColor={props.primaryColor} 
      />
      <main className="flex flex-col items-center w-full pt-16">
        <HeroSection 
          title={replacePlaceholders(hero.title, replacements)}
          subheading={replacePlaceholders(hero.subheading, replacements)}
          heroImage={hero.heroImage}
          ctaText={props.ctaButtonText || "Book my tour"} 
          ctaLink={props.ctaLink} 
          primaryColor={props.primaryColor} 
          learnMoreText="Learn more" 
        />
        {props.benefits && (
          <BenefitsSection 
            mainHeading={props.benefits.mainHeading}
            items={props.benefits.items.map(item => ({
              ...item,
              heading: replacePlaceholders(item.heading, replacements),
              subheading: replacePlaceholders(item.subheading, replacements),
            }))}
            primaryColor={props.primaryColor}
          />
        )}
        {props.testimonials && (
          <TestimonialsSection 
            mainHeading={props.testimonials.mainHeading}
            items={props.testimonials.items}
          />
        )}
        {props.howItWorks && (
          <HowItWorksSection 
            mainHeading={props.howItWorks.mainHeading}
            subheading={replacePlaceholders(props.howItWorks.subheading, replacements)}
            steps={props.howItWorks.steps.map(step => ({
              ...step,
              heading: replacePlaceholders(step.heading, replacements),
              subheading: replacePlaceholders(step.subheading, replacements),
            }))}
            primaryColor={props.primaryColor}
          />
        )}
        {props.pricing && (
          <PricingSection 
            mainHeading={replacePlaceholders(props.pricing.mainHeading, replacements)}
            description={replacePlaceholders(props.pricing.description || '', replacements)}
            plans={props.pricing.plans.map(plan => ({
              ...plan,
              description: replacePlaceholders(plan.description, replacements),
            }))}
          />
        )}
        {props.features && (
          <FeaturesSection 
            mainHeading={props.features.mainHeading}
            items={props.features.items.map(item => ({
              heading: replacePlaceholders(item.heading, replacements),
              subheading: replacePlaceholders(item.subheading, replacements),
            }))}
          />
        )}
        {props.callToAction && (
          <CallToActionSection 
            mainHeading={replacePlaceholders(props.callToAction.mainHeading, replacements)}
            subheading={replacePlaceholders(props.callToAction.subheading, replacements)}
            ctaButtonText={props.callToAction.buttonText}
            primaryColor={props.primaryColor}
            ctaLink={props.ctaLink}
          />
        )}
      </main>
      <Footer {...props.footer} />
    </div>
  );
}