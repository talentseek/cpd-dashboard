import { LandingPageProps } from "@/types/abmLandingPage";

const kindLinkData: LandingPageProps = {
  primaryColor: "#1768a6",
  pageTitle: "KindLink - Elevate Your CSR Efforts",
  description: "Manage CSR effortlessly with KindLink’s comprehensive platform.",
  socialSharingImage: "/images/kindlink/sharing-image.webp",
  logo: "/images/abm/kindlink/logo.svg",
  ctaButtonText: "Book my tour",
  ctaLink: "https://app.hubspot.com/meetings/iskren-kulev", // Added CTA link

  hero: {
    heading: "Hi {first_name}, manage {company}’s CSR effortlessly.",
    subheading: "Streamline {company}‘s corporate social responsibility with KindLink’s comprehensive management platform.",
    heroImage: "/images/abm/kindlink/hero.png",
    ctaLink: "https://app.hubspot.com/meetings/iskren-kulev", // Added CTA link in hero section
  },

  benefits: {
    mainHeading: "Key Benefits",
    items: [
      { heading: "Unified Platform", subheading: "Integrate all CSR activities seamlessly for {company}." },
      { heading: "Employee Engagement", subheading: "Boost staff participation in {company}’s CSR initiatives." },
      { heading: "Impact Reporting", subheading: "Track and showcase {company}’s CSR outcomes effectively." },
    ],
  },

  testimonials: {
    mainHeading: "What Our Clients Say",
    items: [
      {
        title: "Amazing Service!",
        content: "KindLink’s service is by far the cheapest and simplest to use.",
        name: "Emma Nicoll",
        jobTitle: "Fundraising Officer",
        company: "The Cat & Rabbit Rescue Centre",
      },
      {
        title: "Innovative CSR Platform",
        content: "KindLink is providing Royal London employees with a new way to manage their charitable donations through payroll giving.",
        name: "Sophie Love",
        jobTitle: "Social Responsibility Manager",
        company: "Royal London",
      },
      {
        title: "Exceptional Impact",
        content: "Our partnership with KindLink helped us focus our company’s efforts for our emergency humanitarian response in Ukraine.",
        name: "Carmen Butnariu",
        jobTitle: "Sustainability & CSR Consultant",
        company: "Endava",
      },
    ],
  },

  howItWorks: {
    mainHeading: "How It Works",
    subheading: "Streamline your CSR initiatives with KindLink.",
    steps: [
      { heading: "Sign Up", subheading: "Create your KindLink account tailored to {company}." },
      { heading: "Customize", subheading: "Tailor the platform to {company}’s CSR needs." },
      { heading: "Engage", subheading: "Launch initiatives and monitor impact for {company}." },
    ],
  },

  features: {
    mainHeading: "Here's What You'll Get...",
    items: [
      { heading: "Fundraising & Matching", subheading: "Coordinate corporate donations and matching programs for {company}." },
      { heading: "Volunteering Platform", subheading: "Manage and promote employee volunteer activities within {company}." },
      { heading: "ESG & SDG Reporting", subheading: "Track {company}’s environmental, social, and governance metrics." },
      { heading: "Payroll Giving", subheading: "Facilitate employee donations directly from {company}’s payroll." },
      { heading: "Opportunities Marketplace", subheading: "Connect {company} with charities seeking support." },
      { heading: "Grant Management", subheading: "Oversee {company}’s grant applications and distributions." },
      { heading: "Impact Tracking", subheading: "Monitor and report on {company}’s CSR project outcomes." },
      { heading: "Sustainability Platform", subheading: "Manage and showcase {company}’s sustainability initiatives." },
      { heading: "Employee Accounts", subheading: "Empower {company}’s staff with personal charitable accounts." },
      { heading: "CSRD Reporting", subheading: "Ensure {company}’s compliance with sustainability reporting directives." },
      { heading: "Disaster Relief", subheading: "Organize {company}’s responses to emergencies." },
      { heading: "Contactless Fundraising", subheading: "Utilize Zettle for {company}’s donation collection." },
    ],
  },

  pricing: {
    mainHeading: "Choose Your Plan",
    description: "Select the perfect plan to support {company}’s CSR journey with KindLink.",
    plans: [
      {
        name: "Free",
        price: "Free",
        description: "Basic plan for small organizations.",
        features: ["10 projects per year", "Basic support"],
      },
      {
        name: "Premium",
        price: "£11/month billed annually",
        description: "Ideal for medium-sized organizations.",
        features: ["Unlimited projects", "Priority support", "Reporting tools"],
      },
      {
        name: "Enterprise",
        price: "Contact Us",
        description: "Customized solutions for large enterprises.",
        features: ["Dedicated account manager", "Advanced reporting", "API access"],
      },
    ],
  },

  callToAction: {
    mainHeading: "Elevate Your CSR Efforts",
    subheading: "Transform {company}‘s social impact with KindLink’s all-in-one platform.",
    buttonText: "Get Started",
    ctaLink: "https://app.hubspot.com/meetings/iskren-kulev", // Added CTA link
  },

  footer: {
    companyName: "KindLink",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
};

export default kindLinkData;