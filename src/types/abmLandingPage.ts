// src/types/abmLandingPage.ts

export interface FeaturesSectionProps {
  mainHeading: string;
  items: Array<{
    heading: string;
    subheading: string;
  }>;
}

export interface FooterProps {
  companyName: string; // Updated to make companyName a required field
  links?: Array<{ label: string; href: string }>;
}

export interface HeroSectionProps {
  title: string;
  subheading: string;
  ctaText?: string;
  learnMoreText?: string;
  heroImage: string;
  primaryColor?: string;
  ctaLink?: string;
}

export interface HowItWorksSectionProps {
  mainHeading: string;
  subheading: string;
  steps: Array<{
    heading: string;
    subheading: string;
  }>;
}

export interface PricingSectionProps {
  mainHeading: string;
  description?: string;
  plans: Array<{
    name: string;
    price: string;
    description: string;
    features: Array<string>;
    buttonLabel?: string;
  }>;
}

export interface TestimonialsSectionProps {
  mainHeading: string;
  items: Array<{
    title: string;
    content: string;
    name: string;
    jobTitle: string;
    company: string;
    imageUrl?: string;
  }>;
}

export interface LandingPageProps {
  // Global Page Settings
  primaryColor?: string;
  pageTitle?: string;
  description?: string;
  socialSharingImage?: string;
  logo?: string;
  ctaButtonText?: string;
  ctaLink?: string;

  // Hero Section
  hero?: HeroSectionProps;

  // Benefits Section
  benefits?: {
    mainHeading: string;
    items: Array<{
      heading: string;
      subheading: string;
    }>;
  };

  // Testimonials Section
  testimonials?: TestimonialsSectionProps;

  // How It Works Section
  howItWorks?: HowItWorksSectionProps;

  // Features Section
  features?: FeaturesSectionProps;

  // Pricing Section (Dynamic)
  pricing?: PricingSectionProps;

  // Call to Action Section
  callToAction?: {
    mainHeading: string;
    subheading: string;
    buttonText: string;
  };

  // Footer Section
  footer?: FooterProps;
}