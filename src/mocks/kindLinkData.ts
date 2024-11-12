// src/mocks/proForecastData.ts

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
      company: string; // Ensured consistency with `hotelFriendData`
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
    companyName: string;
    links: Array<{ label: string; href: string }>;
  };
}

const proForecastData: ClientDataProps = {
  primaryColor: "#9ecc3b",
  pageTitle: "ProForecast - Elevate Your Financial Strategy",
  description: "Optimize FinTech Solutions’ financial strategy with ProForecast’s comprehensive forecasting and reporting platform tailored for mid-sized businesses.",
  ctaButtonText: "Book my tour",
  ctaLink: "https://calendly.com/proforecastdemo/proforecast-demonstration-1",
  logo: "/images/abm/proforecast/logo.svg",
  hero: {
    title: "Hi {first_name}, streamline {company}’s financial planning effortlessly.",
    subheading: "Optimize {company}’s financial strategy with ProForecast’s comprehensive forecasting and reporting platform, tailored to meet the needs of mid-sized businesses.",
    heroImage: "/images/abm/proforecast/hero.png",
  },
  benefits: {
    mainHeading: "Key Benefits",
    items: [
      {
        heading: "Integrated Forecasting",
        subheading: "Seamlessly unify cash flow, balance sheet, and P&L forecasts, ensuring comprehensive financial insight for {company}.",
      },
      {
        heading: "Scenario Planning",
        subheading: "Evaluate multiple ‘What If’ scenarios to inform strategic decisions and prepare {company} for market fluctuations.",
      },
      {
        heading: "Advanced Reporting",
        subheading: "Generate detailed, customizable reports and dashboards to support data-driven decisions at {company}.",
      },
    ],
  },
  testimonials: {
    mainHeading: "What Our Clients Say",
    items: [
      {
        title: "Efficient Budgeting",
        content: "ProForecast has transformed our budgeting process, reducing preparation time by 80%.",
        name: "Brian R.",
        jobTitle: "Director",
        company: "Finance Corp", // Ensured company is provided
        imageUrl: "/images/abm/proforecast/testimonial1.png",
      },
      {
        title: "Effective Scenario Planning",
        content: "The scenario planning feature allows us to anticipate and adapt to market changes effectively.",
        name: "John M.",
        jobTitle: "Health, Wellness & Fitness Industry",
        company: "Wellness Ltd", // Ensured company is provided
        imageUrl: "/images/abm/proforecast/testimonial2.png",
      },
      {
        title: "Seamless Integration",
        content: "The integration with our existing accounting software was seamless and enhanced our reporting capabilities.",
        name: "Emma S.",
        jobTitle: "Financial Analyst",
        company: "Analytics Inc.", // Ensured company is provided
        imageUrl: "/images/abm/proforecast/testimonial3.png",
      },
    ],
  },
  howItWorks: {
    mainHeading: "How It Works",
    subheading: "Implement ProForecast’s strategic financial planning solutions in three simple steps.",
    steps: [
      {
        heading: "Data Integration",
        subheading: "Connect ProForecast to {company}’s accounting systems for a seamless data flow.",
      },
      {
        heading: "Customize Models",
        subheading: "Tailor financial models to align precisely with {company}’s unique objectives and KPIs.",
      },
      {
        heading: "Analyze & Report",
        subheading: "Generate data-driven insights and comprehensive reports to guide {company}’s strategic decisions.",
      },
    ],
  },
  pricing: {
    mainHeading: "Choose Your Plan",
    description: "Select the perfect plan to support {company}’s financial strategy with ProForecast.",
    plans: [
      {
        name: "Standard Plan",
        price: "Contact Us",
        description: "Perfect for midsize companies like {company}. Includes core forecasting and reporting features to improve budgeting accuracy and operational visibility.",
        features: ["Unlimited reporting features", "Integration with major accounting software", "Multi-user access", "24/7 support"],
      },
      {
        name: "Professional Plan",
        price: "Contact Us",
        description: "Advanced plan suitable for growing businesses like {company}. Adds more advanced forecasting tools, scenario planning, and expanded data integration.",
        features: ["Enhanced forecasting tools", "‘What If’ analysis", "Priority support", "Expanded data integration"],
      },
      {
        name: "Enterprise Plan",
        price: "Contact Us",
        description: "Designed for complex needs. Provides full customization, top-level analytics, and full team collaboration capabilities for {company}.",
        features: ["Complete customization", "Dedicated account manager", "Full analytics suite", "Team collaboration tools"],
      },
    ],
  },
  features: {
    mainHeading: "Here's What You'll Get...",
    items: [
      {
        heading: "Comprehensive Forecasting",
        subheading: "Integrate cash flow, balance sheet, and P&L forecasts tailored to {company}’s growth trajectory.",
      },
      {
        heading: "‘What If’ Analysis",
        subheading: "Evaluate different scenarios to anticipate market changes and refine {company}’s strategy.",
      },
      {
        heading: "Customizable Dashboards",
        subheading: "Design dashboards that track {company}’s financial health in real time.",
      },
      {
        heading: "AI-Driven Insights",
        subheading: "Utilize machine learning to gain insights into demand forecasting and financial projections for {company}.",
      },
      {
        heading: "Multi-User Collaboration",
        subheading: "Enable collaboration with role-based permissions for {company}’s finance team.",
      },
      {
        heading: "Data Import/Export",
        subheading: "Import and export data from various accounting software seamlessly for {company}.",
      },
      {
        heading: "Benchmarking Tools",
        subheading: "Compare {company}’s performance against industry standards for informed decision-making.",
      },
      {
        heading: "Variance Reporting",
        subheading: "Identify deviations between actuals and forecasts to keep {company}’s strategy on track.",
      },
      {
        heading: "KPI Tracking",
        subheading: "Monitor key performance indicators essential to {company}’s success.",
      },
      {
        heading: "Cloud Accessibility",
        subheading: "Access ProForecast’s tools from anywhere, ensuring flexibility and convenience for {company}.",
      },
    ],
  },
  callToAction: {
    mainHeading: "Elevate Your Financial Strategy",
    subheading: "Transform {company}’s financial planning with ProForecast’s suite of advanced tools.",
    buttonText: "Book my tour",
  },
  footer: {
    companyName: "ProForecast",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
};

export default proForecastData;