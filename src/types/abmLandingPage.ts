// src/types/abmLandingPage.ts

export interface LandingPageProps {
  // Global Page Settings
  primaryColor?: string;
  pageTitle?: string;
  description?: string;
  socialSharingImage?: string;
  logo?: string;
  ctaButtonText?: string;

  // Hero Section
  hero: {
    heading: string;
    subheading: string;
    heroImage: string;
  };

  // Benefits Section
  benefits: {
    mainHeading: string;
    items: Array<{
      heading: string;
      subheading: string;
    }>;
  };

  // Testimonials Section
  testimonials: {
    mainHeading: string;
    items: Array<{
      title: string;
      content: string;
      name: string;
      jobTitle: string;
      company: string;
      imageUrl?: string; // Optional image URL for each testimonial
    }>;
  };

  // How It Works Section
  howItWorks: {
    mainHeading: string;
    subheading: string;
    steps: Array<{
      heading: string;
      subheading: string;
    }>;
  };

  // Features Section
  features: {
    mainHeading: string;
    items: Array<{
      heading: string;
      subheading: string;
    }>;
  };

  // Pricing Section (Dynamic)
  pricing?: {
    mainHeading: string;
    description?: string; // Added description field
    plans: Array<{
      name: string;
      price: string;
      description: string;
      features: Array<string>;
      cta?: string;
    }>;
  };

  // Call to Action Section
  callToAction: {
    mainHeading: string;
    subheading: string;
    buttonText: string;
  };

  // Footer Section
  footer?: {
    companyName?: string;
    links?: Array<{ label: string; href: string }>;
  };
}