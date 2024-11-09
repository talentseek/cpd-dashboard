// src/mocks/weagleData.ts
import { LandingPageProps } from "@/types/abmLandingPage";

const weagleData: LandingPageProps = {
  primaryColor: "#FF9900",
  pageTitle: "Weagle - Elevate Your Online Security",
  description: "Protect your business's online activities with Weagle’s comprehensive browsing and AI chat security solutions.",
  socialSharingImage: "/images/weagle/sharing-image.webp",
  logo: "/images/abm/weagle/logo.svg",
  ctaButtonText: "Book my tour",
  ctaLink: "https://calendly.com/weagle-call/demo/", // New field for CTA link

  hero: {
    heading: "Hi {first_name}, secure {company}’s online activities effortlessly.",
    subheading: "Protect {company}’s sensitive data with Weagle’s comprehensive browsing and AI chat security solutions.",
    heroImage: "/images/abm/weagle/hero.png",
  },

  benefits: {
    mainHeading: "Key Benefits",
    items: [
      { 
        heading: "Data Control", 
        subheading: "Maintain full oversight of {company}’s online data to ensure it remains secure and within your control." 
      },
      { 
        heading: "Enhanced Security", 
        subheading: "Safeguard {company} against data leaks, cyber threats, and vulnerabilities in online browsing." 
      },
      { 
        heading: "Productivity Boost", 
        subheading: "Eliminate distractions and access reliable information to improve productivity across {company}’s teams." 
      },
    ],
  },

  testimonials: {
    mainHeading: "What Our Clients Say",
    items: [
      {
        title: "Exceptional Value",
        content: "With Weagle, we immediately understood the added value they could offer for our company’s web navigation.",
        name: "Mario Marzullo",
        jobTitle: "Chief Product Officer",
        company: "Content.com",
        imageUrl: "/images/abm/weagle/testimonial1.png",
      },
      {
        title: "Competitive and Innovative",
        content: "It is exciting to see Lorenzo and his team keep up with world-caliber companies in the technology space.",
        name: "Fatine Amante",
        jobTitle: "Microsoft for Startups Mentor",
        imageUrl: "/images/abm/weagle/testimonial2.jpg",
      },
      {
        title: "Self-Starter Mindset",
        content: "Weagle did not wait to be accelerated or have outside support to land in San Francisco.",
        name: "Leandro Agrò",
        jobTitle: "Head of Innovation",
        company: "Italian Innovation Center San Francisco",
        imageUrl: "/images/abm/weagle/testimonial3.jpg",
      },
    ],
  },

  howItWorks: {
    mainHeading: "How It Works",
    subheading: "Implement Weagle’s secure browsing solutions in three simple steps.",
    steps: [
      { heading: "Install Extension", subheading: "Add Weagle to {company}’s browsers for immediate security benefits." },
      { heading: "Configure Settings", subheading: "Customize security preferences to suit {company}’s unique needs and policies." },
      { heading: "Browse Securely", subheading: "Experience protected and efficient online activities with Weagle’s secure environment." },
    ],
  },

  features: {
    mainHeading: "Here's What You'll Get...",
    items: [
      { heading: "Data Wallet", subheading: "Anonymizes and securely stores {company}’s browsing data to ensure privacy." },
      { heading: "Power Search", subheading: "Conduct simultaneous searches across multiple engines for efficient and reliable results." },
      { heading: "AI Chat Protection", subheading: "Safeguard {company}’s sensitive information during AI interactions for added peace of mind." },
      { heading: "Content Filtering", subheading: "Eliminate fake news and irrelevant content to keep your teams informed and productive." },
      { heading: "CISO Dashboard", subheading: "Monitor and manage employee online activities with comprehensive oversight tools." },
      { heading: "Secure Extension", subheading: "Enhance browser security with Weagle’s extension, specifically built to protect {company}’s online environment." },
    ],
  },

  callToAction: {
    mainHeading: "Elevate Your Online Security",
    subheading: "Protect {company}’s digital environment with Weagle’s advanced security solutions.",
    buttonText: "Book my tour",
  },

  footer: {
    companyName: "Weagle",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },

  showPricing: false, // New flag to control Pricing display
};

export default weagleData;