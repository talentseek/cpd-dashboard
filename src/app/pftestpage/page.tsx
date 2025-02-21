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
import { useState } from "react"
import Link from "next/link"

// Dynamically import AnimatedBackground without SSR
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false })

// InteractiveCard Component with conditional z-index
interface InteractiveCardProps {
  title: string
  description: string
  imageSrc: string
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, description, imageSrc }) => {
  const [enlarged, setEnlarged] = useState(false)
  const toggleEnlarge = () => setEnlarged((prev) => !prev)

  return (
    <div
      onClick={toggleEnlarge}
      className={`group relative bg-[#0654c4]/80 backdrop-blur-md p-6 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ${
        enlarged ? "scale-150 z-50" : "scale-100 z-0"
      }`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
      <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">{title}</h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-[#00334B] text-white">
      <FloatingNav />

      {/* Header with logo */}
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
            Hello <span className="text-[#9dc423]">{"{first_name}"}</span>, Welcome to your Financial Odyssey at{" "}
            <span className="text-[#67b1e3]">{"{company}"}</span>
          </h1>
          <p className="text-xl animate-fade-in-up animation-delay-300 mb-8">
            Embark on a journey of financial transformation
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
            At <span className="text-[#9ecc3b]">{"{company}"}</span>, your mission—
            <span className="text-[#c4d0ff]">{"{custom.mission}"}</span>—drives every decision. Imagine a future where
            every financial action is guided by real-time insights and smart, proactive strategies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#9ecc3b]">Purpose</h3>
              <p className="text-white">Drive financial innovation with cutting-edge tools and strategies.</p>
            </div>
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#9ecc3b]">Vision</h3>
              <p className="text-white">Shape a future where financial decisions are powered by real-time insights.</p>
            </div>
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#9ecc3b]">Strategy</h3>
              <p className="text-white">Transform challenges into opportunities for growth and success.</p>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* 3. Mapping the Landscape: Challenges & Opportunities */}
      <FullScreenSection id="landscape" className="bg-[#0654c4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Mapping the Landscape: Challenges & Opportunities</h2>
          <p className="text-xl mb-12">
            Navigate the complex terrain of <span className="text-[#9ecc3b]">{"{custom.industry}"}</span> with precision and foresight.
          </p>
          <TerrainMap />
        </div>
      </FullScreenSection>

      {/* 4. What-If Scenarios: Explore Your Future Possibilities */}
      <FullScreenSection id="scenarios" className="bg-gradient-to-b from-[#0654c4] to-[#00334B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">What-If Scenarios: Explore Your Future Possibilities</h2>
          <p className="text-xl mb-12">
            What if you could predict the impact of every decision? Explore multiple future scenarios—from market shifts
            to operational tweaks—and visualize how each possibility reshapes <span className="text-[#9ecc3b]">{"{company}"}</span>
            &apos;s financial trajectory.
          </p>
          <WhatIfScenarios />
        </div>
      </FullScreenSection>

      {/* 5. Transforming Data into Actionable Intelligence with Rollover & Click Enlargement */}
      <FullScreenSection id="data" className="bg-[#00334B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Transforming Data into Actionable Intelligence</h2>
          <p className="text-xl mb-12">
            Unlock real-time, customized dashboards that convert raw data into strategic insights for{" "}
            <span className="text-[#9ecc3b]">{"{company}"}</span>. Each report is designed to guide your decisions and
            illuminate the path forward.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InteractiveCard
              title="Revenue Insights"
              description="Real-time revenue tracking and forecasting"
              imageSrc="/images/abm/proforecast/dashboards/sales.jpeg"
            />
            <InteractiveCard
              title="Expense Analysis"
              description="Detailed breakdown of costs and spending patterns"
              imageSrc="/images/abm/proforecast/dashboards/budget.jpg"
            />
            <InteractiveCard
              title="Cash Flow Projections"
              description="Predictive modeling for future cash flows"
              imageSrc="/images/abm/proforecast/dashboards/pl.jpg"
            />
          </div>
        </div>
      </FullScreenSection>

      {/* 6. Your Unique Financial Blueprint */}
      <FullScreenSection id="blueprint" className="bg-gradient-to-b from-[#00334B] to-[#0654c4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Your Unique Financial Blueprint</h2>
          <p className="text-xl mb-12">
            Discover a tailor-made financial blueprint that not only recognizes your strengths but also paves the way
            for a future of strategic growth and operational excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Core Strengths</h3>
              <ul className="list-disc list-inside animate-list text-white">
                <li>{"{custom.usp}"}</li>
                <li>Innovative financial strategies</li>
                <li>Robust risk management</li>
              </ul>
            </div>
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Key Products</h3>
              <ul className="list-disc list-inside animate-list text-white">
                <li>Real-time financial dashboards</li>
                <li>Predictive analytics tools</li>
                <li>Automated reporting systems</li>
              </ul>
            </div>
            <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">Strategic Objectives</h3>
              <ul className="list-disc list-inside animate-list text-white">
                <li>Increase operational efficiency</li>
                <li>Enhance decision-making accuracy</li>
                <li>Drive sustainable growth</li>
              </ul>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* 7. Seamless Integration & Intelligent Automation */}
      <FullScreenSection id="integration" className="bg-[#0654c4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Seamless Integration & Intelligent Automation</h2>
          <p className="text-xl mb-12">
            Experience a unified platform that streamlines your operations, automates routine processes, and empowers
            you to focus on what truly matters: strategic leadership.
          </p>
          <IntegrationSection />
        </div>
      </FullScreenSection>

{/* 8. Driving Financial Mastery & Strategic Transformation */}
<FullScreenSection id="transformation" className="bg-gradient-to-b from-[#0654c4] to-[#00334B]">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-8">Driving Financial Mastery & Strategic Transformation</h2>
    <p className="text-xl mb-12">
      Imagine a world where every decision is backed by precise, forward-looking insights. At{" "}
      <span className="text-[#9ecc3b]">{"{company}"}</span>, these insights empower you to navigate uncertainty,
      optimize cash flow, and drive transformative growth.
    </p>
    {/* New KPMG Data Block */}
    <div className="bg-[#00334B]/80 backdrop-blur-md p-6 rounded-lg text-left mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#c4d0ff]">The Power of Accurate Forecasting</h3>
      <ul className="list-disc list-inside text-white space-y-2">
        <li>Only 1 in 5 senior executives are able to produce accurate forecasts.</li>
        <li>On average, forecasts were off by 13%.</li>
        <li>Poor forecasting contributed to falling share prices due to investor reactions and a lack of trust from analysts.</li>
        <li>Companies with forecasts within 5% accuracy saw share prices increase.</li>
        <li>Accurate forecasting supports better management, enabling companies to recognize opportunities, manage risks, and set milestones.</li>
        <li>Organizations that achieve forecast accuracy hold managers accountable, reward accuracy, and extend their analysis through advanced scenario planning and sensitivity analysis.</li>
      </ul>
      <p className="mt-4 text-sm text-gray-300">
        Source: KPMG survey of 540 senior executives (including 168 CFOs)
      </p>
    </div>
    <TransformationSection />
  </div>
</FullScreenSection>

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
          title="Vimeo Video"
        ></iframe>
      </div>
    </div>
    <h2 className="text-4xl font-bold mb-8">Begin Your Transformation</h2>
    <p className="text-xl mb-12">
      Take the first step towards transforming <span className="text-[#9dc423]">{"{company}"}</span>&apos;s financial future.
      Begin your personalized journey to strategic clarity and operational excellence today.
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
      Every day brings new opportunities. Let ProForecast be your trusted partner in transforming challenges into
      actionable insights and turning potential into performance at <span className="text-[#67b1e3]">{"{company}"}</span>.
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
              <a href="#" className="hover:text-[#9dc423] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#9dc423] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#9dc423] transition-colors">
                Connect with Us
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}