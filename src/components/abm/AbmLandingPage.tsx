// src/components/abm/AbmLandingPage.tsx

import { Navigation } from "@/components/abm/Navigation"
import { HeroSection } from "@/components/abm/HeroSection"
import { BenefitsSection } from "@/components/abm/BenefitsSection"
import { TestimonialsSection } from "@/components/abm/TestimonialsSection"
import { HowItWorksSection } from "@/components/abm/HowItWorksSection"
import { FeaturesSection } from "@/components/abm/FeaturesSection"
import { PricingSection } from "@/components/abm/PricingSection"
import { CallToActionSection } from "@/components/abm/CallToActionSection"
import { Footer } from "@/components/abm/Footer"
import { LandingPageProps } from "@/types/abmLandingPage"

export function AbmLandingPage(props: LandingPageProps) {
  const hero = props.hero || { heading: "Default Heading", subheading: "Default Subheading", heroImage: "/images/default-hero.webp" };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navigation 
        logo={props.logo} 
        ctaButtonText={props.ctaButtonText} 
        primaryColor={props.primaryColor} 
        showPricing={props.showPricing} // Pass prop to Navigation
      />
      <main className="flex flex-col items-center w-full pt-16">
        <HeroSection 
          title={hero.heading}
          subheading={hero.subheading}
          heroImage={hero.heroImage}
          ctaText={props.ctaButtonText || "Book my tour"} 
          ctaLink={props.ctaLink} // Pass ctaLink prop
          primaryColor={props.primaryColor} 
          learnMoreText="Learn more" 
        />
        {props.benefits && <BenefitsSection {...props.benefits} primaryColor={props.primaryColor} />}
        {props.testimonials && <TestimonialsSection {...props.testimonials} />}
        {props.howItWorks && <HowItWorksSection {...props.howItWorks} primaryColor={props.primaryColor} />}
        {props.features && <FeaturesSection {...props.features} />}
        {props.pricing && props.showPricing !== false && (
          <PricingSection 
            mainHeading={props.pricing.mainHeading} 
            description={props.pricing.description} 
            plans={props.pricing.plans} 
          />
        )}
        {props.callToAction && (
          <CallToActionSection 
            mainHeading={props.callToAction.mainHeading} 
            subheading={props.callToAction.subheading} 
            ctaButtonText={props.callToAction.buttonText} 
            ctaLink={props.ctaLink} // Pass ctaLink prop
            primaryColor={props.primaryColor} 
          />
        )}
      </main>
      <Footer {...props.footer} />
    </div>
  )
}