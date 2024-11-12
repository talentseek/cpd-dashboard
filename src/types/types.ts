// src/types/types.ts

export interface Replacements {
  first_name: string;
  company: string;
}

export interface FeaturesItem {
  heading: string;
  subheading?: string; // Make subheading optional
}

export interface FeaturesProps {
  mainHeading?: string;
  items?: FeaturesItem[];
}

export interface ClientDataProps {
  primary_color?: string;
  page_title?: string;
  description?: string;
  logo?: string;
  ctaButtonText?: string;
  calendar_link?: string;
  hero?: {
    title?: string;
    heroImage?: string;
    heroVideo?: string;
    subheading?: string;
  };
  benefits?: {
    mainHeading?: string;
    items?: Array<{
      heading: string;
      subheading: string;
    }>;
  };
  testimonials?: {
    mainHeading?: string;
    items?: Array<{
      name?: string;
      title?: string;
      company?: string;
      content?: string;
      imageUrl?: string;
      jobTitle?: string;
    }>;
  };
  how_it_works?: {
    mainHeading?: string;
    subheading?: string;
    steps?: Array<{
      heading: string;
      subheading: string;
    }>;
  };
  pricing?: {
    mainHeading?: string;
    description?: string;
    plans?: Array<{
      name: string;
      price: string;
      description: string;
      features: Array<string>;
      buttonLabel?: string;
    }>;
  };
  features?: FeaturesProps;
  call_to_action?: {
    mainHeading?: string;
    subheading?: string;
    buttonText?: string;
    ctaLink?: string;
  };
  footer?: {
    companyName?: string;
    links?: Array<{ label: string; href: string }>;
  };
}