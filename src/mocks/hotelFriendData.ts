// src/mocks/hotelFriendData.ts
import { LandingPageProps } from "@/types/abmLandingPage";

const hotelFriendData: LandingPageProps = {
  primaryColor: "#24afe8",
  pageTitle: "HotelFriend - Revolutionizing Hotel Management for {company}",
  description: "Discover how HotelFriend can streamline operations and enhance guest satisfaction at {company}.",
  socialSharingImage: "/images/hotelfriend/sharing-image.webp",
  logo: "/images/abm/hotelfriend/logo.svg",
  ctaButtonText: "Book my tour",
  ctaLink: "https://cal.com/hotelfriend/30min", // New field for CTA link

  hero: {
    heading: "Hi {first_name}, Manage {company} Effortlessly",
    subheading: "Optimize {company}’s hospitality management with HotelFriend’s all-in-one platform designed for premium hotels.",
    heroImage: "/images/abm/hotelfriend/dashboard.webp",
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
        title: "Boosted Direct Bookings",
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

  features: {
    mainHeading: "Here's What You'll Get...",
    items: [
      { heading: "Channel Manager", subheading: "Synchronize bookings for {company} across multiple platforms to increase reach and visibility." },
      { heading: "Booking Engine", subheading: "Enable direct bookings on {company}’s website at zero commission, boosting profitability." },
      // More features can be personalized as needed
    ],
  },

  pricing: {
    mainHeading: "Choose Your Plan for {company}",
    plans: [
      {
        name: "Manage",
        price: "$6.97 per room / month",
        description: "Essential tools to handle daily operations for {company} in the cloud.",
        features: [
          "Cloud-based PMS",
          "Front Desk with drag-and-drop functionality",
          // Additional features as needed
        ],
        buttonLabel: "Select",
      },
      // Other plans as necessary
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
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
};

export default hotelFriendData;