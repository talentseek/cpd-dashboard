"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import FloatingNav from "@/components/FloatingNav"
import FullScreenSection from "@/components/FullScreenSection"
import TerrainMap from "@/components/TerrainMap"
import WhatIfScenarios from "@/components/WhatIfScenarios"
import IntegrationSection from "@/components/IntegrationSection"
import TransformationSection from "@/components/TransformationSection"
import Link from "next/link"
import { ReplaceText } from "@/components/ReplaceText"

export interface CustomReplacements {
first_name: string;
company: string;
custom: {
    mission?: string;
    industry?: string;
    usp?: string;
    [key: string]: string | undefined;
};
}

interface ClientData {
id: string;
name: string;
email: string;
}

// Dynamically import AnimatedBackground without SSR
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false })

interface ProForecastLandingPageProps {
clientData: ClientData;
replacements: CustomReplacements;
}

export default function ProForecastLandingPage({ clientData, replacements }: ProForecastLandingPageProps) {
  return (
    <div className="bg-[#00334B] text-white">
      <FloatingNav />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#00334B]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Image src="/images/abm/proforecast/logo.svg" alt="ProForecast Logo" width={150} height={20} />
          <Button variant="default" size="sm" className="bg-[#f29102] hover:bg-[#f29102]/90 text-white">
            Book a Demo
          </Button>
        </div>
      </header>

      {/* 1. Welcome & Introduction */}
      <FullScreenSection id="hero" className="relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Hello <span className="text-[#9dc423]">{replacements.first_name}</span>, Welcome to your Financial Odyssey at{" "}
            <span className="text-[#67b1e3]">{replacements.company}</span>
          </h1>
          <p className="text-xl animate-fade-in-up animation-delay-300 mb-8">
            <ReplaceText
              text="Embark on a journey of financial transformation where every decision is driven by accurate forecasts and actionable insights."
              replacements={replacements}
            />
          </p>
          <Button
            className="animate-fade-in-up animation-delay-600 bg-[#f29102] hover:bg-[#f29102]/90 text-white"
            size="lg"
          >
            Begin Your Journey
          </Button>
        </div>
      </FullScreenSection>

      {/* 2. Your Vision & Mission */}
      <FullScreenSection id="vision" className="bg-gradient-to-b from-[#00334B] to-[#0654c4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Your Vision & Mission</h2>
          <p className="text-xl mb-12">
            <ReplaceText
              text="At {company}, your mission—{custom.mission}—drives every decision. Imagine a future where every financial action is guided by real-time insights and smart, proactive strategies."
              replacements={replacements}
            />
          </p>
          {/* Other sections remain unchanged */}
          {/* ... */}
        </div>
      </FullScreenSection>

      {/* ... (Other sections, updated similarly if needed) ... */}

      {/* 9. Call-to-Action – Begin Your Transformation */}
      <FullScreenSection id="cta" className="bg-[#00334B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Embedded Vimeo Video at the Top */}
          <div className="mb-8">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
              <iframe
                src="https://player.vimeo.com/video/800686265"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="ProForecast Overview Video"
              ></iframe>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-8">
            Begin Your Transformation, <ReplaceText text="{first_name}" replacements={replacements} />!
          </h2>
          <p className="text-xl mb-12">
            <ReplaceText
              text="Take the first step towards transforming {company}'s financial future. Begin your personalized journey to strategic clarity and operational excellence today."
              replacements={replacements}
            />
          </p>
          <Button variant="default" size="lg" className="bg-[#f29102] hover:bg-[#f29102]/90 text-white">
            Book Your Demo
          </Button>
        </div>
      </FullScreenSection>

      {/* 10. Closing & Continuous Journey */}
      <FullScreenSection id="closing" className="bg-gradient-to-b from-[#00334B] to-[#0654c4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Your Continuous Journey</h2>
          <p className="text-xl mb-12">
            <ReplaceText
              text="Every day brings new opportunities. Let ProForecast be your trusted partner in transforming challenges into actionable insights and turning potential into performance at {company}."
              replacements={replacements}
            />
          </p>
          <Link href="https://proforecast.com/tutorials/" target="_blank" legacyBehavior>
            <a>
              <Button variant="link" size="lg" className="text-[#9dc423] hover:text-white">
                Not ready for a demo yet but want to learn more? Visit our tutorials section <ArrowRight className="ml-2" />
              </Button>
            </a>
          </Link>
        </div>
      </FullScreenSection>

      {/* Footer */}
      <footer className="py-8 bg-[#00334B] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Image src="/images/abm/proforecast/logo.svg" alt="ProForecast Logo" width={120} height={16} />
            <p>&copy; {new Date().getFullYear()} ProForecast. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#9dc423] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#9dc423] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#9dc423] transition-colors">Connect with Us</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}