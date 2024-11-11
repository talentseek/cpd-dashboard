// src/mocks/hotelFriendData.ts

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
    companyName: string;
    links: Array<{ label: string; href: string }>;
  };
}

const hotelFriendData: ClientDataProps = {
  primaryColor: "#24afe8",
  pageTitle: "HotelFriend - Revolutionizing Hotel Management for {company}",
  description: "Discover how HotelFriend can streamline operations and enhance guest satisfaction at {company}.",
  ctaButtonText: "Book my tour",
  ctaLink: "https://cal.com/hotelfriend/30min",
  logo: "/images/abm/hotelfriend/logo.svg",
  hero: {
    title: "Hi {first_name}, Manage {company} Effortlessly",
    subheading: "Optimize {company}’s hospitality management with HotelFriend’s all-in-one platform.",
    heroImage: "/images/abm/hotelfriend/dashboard2.webp",
  },
  benefits: {
    mainHeading: "Key Benefits",
    items: [
      {
        heading: "Centralized Management",
        subheading: "Easily manage bookings, room availability, guest preferences, and billing at {company}, ensuring a seamless workflow and superior guest experience.",
      },
      {
        heading: "Enhanced Guest Experience",
        subheading: "Improve guest satisfaction at {company} with tailored services, streamlined check-in/check-out, and quick access to amenities, creating memorable stays.",
      },
      {
        heading: "Revenue Optimization",
        subheading: "Utilize advanced pricing tools to maximize revenue for {company} through dynamic pricing, upselling opportunities, and data-driven decision-making.",
      },
    ],
  },
  testimonials: {
    mainHeading: "What Our Clients Say",
    items: [
      {
        title: "Transformed Our Operations",
        content: "HotelFriend’s PMS has transformed our daily operations, making management more efficient and guest-centric.",
        name: "John Smith",
        jobTitle: "General Manager",
        company: "Grand Hotel",
        imageUrl: "/images/abm/hotelfriend/testimonial1.jpeg",
      },
      {
        title: "Increased Direct Bookings",
        content: "The integrated booking engine increased our direct bookings by 30%, improving our revenue significantly.",
        name: "Emily Johnson",
        jobTitle: "Owner",
        company: "Seaside Inn",
        imageUrl: "/images/abm/hotelfriend/testimonial2.jpeg",
      },
      {
        title: "Exceptional Support",
        content: "Their support team is always ready to assist with any queries, providing reliable and personalized service.",
        name: "Michael Brown",
        jobTitle: "Operations Director",
        company: "City Lodge",
        imageUrl: "/images/abm/hotelfriend/testimonial3.jpeg",
      },
    ],
  },
  howItWorks: {
    mainHeading: "How It Works",
    subheading: "Easily manage and optimize {company}’s operations with HotelFriend.",
    steps: [
      {
        heading: "Sign Up",
        subheading: "Create your HotelFriend account, customized for {company}, to streamline all hotel operations in one platform.",
      },
      {
        heading: "Customize",
        subheading: "Tailor the platform specifically to {company}’s operational and guest service requirements for a seamless experience.",
      },
      {
        heading: "Operate",
        subheading: "Manage bookings, payments, guest services, and reporting effortlessly at {company} through our user-friendly dashboard.",
      },
    ],
  },
  pricing: {
    mainHeading: "Plans for {company}",
    description: "Flexible and cost-effective plans to meet the unique needs of {company}.",
    plans: [
      {
        name: "Manage",
        price: "$6.90 per room / month",
        description: "Get all the tools to manage the daily operations of your property in the cloud.",
        features: [
          "Cloud-based PMS with drag-n-drop Front Desk",
          "Group & Corporate bookings",
          "Staff management",
          "Housekeeping",
          "Accounting & Reporting",
          "Guest Check-in request",
          "Multilingual interface"
        ],
        buttonLabel: "Select",
      },
      {
        name: "Grow",
        price: "$10.78 per room / month",
        description: "Sell your rooms online via booking platforms and your own website.",
        features: [
          "Integrated Channel Manager (Booking, HRS, Expedia)",
          "Booking Engine (at 0% commission)",
          "Contactless Room Opening (Salto KS)",
          "Digital Payments (POS), (Gastronovi)",
          "Mobile App (Guestbook, Service Ordering)",
          "Cloud TSS"
        ],
        buttonLabel: "Select",
      },
      {
        name: "Enterprise",
        price: "$12.93 per room / month",
        description: "Get access to custom development and multi-property-management.",
        features: [
          "Multi-property management",
          "Order management",
          "Department Management (wellness, restaurant, etc.)",
          "Custom Development",
          "Custom Integrations",
          "Staff trainings"
        ],
        buttonLabel: "Select",
      }
    ],
  },
  features: {
    mainHeading: "Here's What You'll Get...",
    items: [
      {
        heading: "Channel Manager",
        subheading: "Synchronize bookings for {company} across multiple platforms to increase reach and visibility.",
      },
      {
        heading: "Booking Engine",
        subheading: "Enable direct bookings on {company}’s website at zero commission, boosting profitability.",
      },
    ],
  },
  callToAction: {
    mainHeading: "Transform {company}'s Hotel Operations",
    subheading: "Elevate {company}'s hospitality services with HotelFriend’s all-in-one platform.",
    buttonText: "Book my tour",
  },
  footer: {
    companyName: "HotelFriend",
    links: [
      { label: "Terms of Service", href: "https://hotelfriend.com/b/terms-and-conditions-saas" },
      { label: "Privacy", href: "https://hotelfriend.com/b/privacy-policy" },
    ],
  },
};

export default hotelFriendData;