"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Lock, Users, Globe, Cpu, ScrollText, Building2, CheckCircle, Timer, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ReplaceText } from "@/components/ReplaceText"

interface Replacements {
  first_name: string;
  company: string;
  vc?: {
    tagline: string;
    investmentFocus: string;
    fundSize: string;
  };
custom: {
// You can add additional keys as needed for further personalization
mission?: string;
industry?: string;
usp?: string;
investment?: string;
technology?: string;
marketSize?: string;
[key: string]: string | undefined;
};
}

// For demo/testing purposes
const defaultReplacements: Replacements = {
  first_name: "{first_name}",
  company: "{company}",
  vc: {
    tagline: "{vc.tagline}",
    investmentFocus: "{vc.investmentFocus}",
    fundSize: "{vc.fundSize}",
  },
  custom: {
    mission: "{custom.mission}",
    industry: "{custom.industry}",
    usp: "{custom.usp}",
    investment: "{custom.investment}",
    technology: "{custom.technology}",
    marketSize: "{custom.marketSize}",
  },
};

export default function KaskoLandingPage({ replacements = defaultReplacements }: { replacements?: Replacements }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("down")

  const sections = [
    { id: "hero", title: "Welcome" },
    { id: "solutions", title: "Solutions" },
    { id: "benefits", title: "Benefits" },
    { id: "value", title: "Value Proposition" },
    { id: "cta", title: "Next Steps" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1)
        setScrollDirection("down")
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1)
        setScrollDirection("up")
      }
    }
    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentSection, sections.length])

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/kasko-logo.svg" // Replace with the actual KASKO logo
                alt="KASKO"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#solutions" className="text-sm font-medium text-gray-600 hover:text-[#ECBB2C] transition-colors">
                Solutions
              </Link>
              <Link href="#benefits" className="text-sm font-medium text-gray-600 hover:text-[#ECBB2C] transition-colors">
                Benefits
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#ECBB2C] transition-colors">
                Contact
              </Link>
              <Button className="bg-[#ECBB2C] hover:bg-[#ECBB2C]/90 text-black">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence initial={false} custom={scrollDirection}>
        <motion.section
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="h-screen flex items-center justify-center px-4 pt-20"
        >
          {currentSection === 0 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Image
                  src="/kasko-logo.svg"
                  alt="KASKO Logo"
                  width={200}
                  height={60}
                  className="h-16 w-auto mx-auto mb-8"
                />
              </motion.div>
              <h1 className="text-5xl font-bold text-white mb-6">
                <ReplaceText text="Hi {first_name}, Welcome to the Future of Secure Communication" replacements={replacements} />
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                In today&apos;s challenging regulatory landscape, KASKO empowers MGAs and brokers with a seamless Brexit solution, enabling expansion into the EU and UK markets.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Button size="lg" className="text-lg bg-[#ECBB2C] hover:bg-[#ECBB2C]/90 text-black">
                  <ReplaceText text="Explore Investment Opportunity for {company}" replacements={replacements} /> <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentSection === 1 && (
            <div className="max-w-5xl mx-auto text-center space-y-8" id="solutions">
            <h2 className="text-4xl font-bold text-white mb-8">
                <ReplaceText text="Your Complete Brexit Solution for {company}" replacements={replacements} />
            </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Since Brexit, we&#39;ve helped over 40 MGAs and brokers establish fully regulated intermediaries, enabling seamless EU and UK market entry.
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6">
                  <Timer className="mb-4 h-8 w-8 text-[#ECBB2C]" />
                  <h3 className="mb-2 text-xl font-semibold">Quick Setup</h3>
                  <p className="text-muted-foreground">
                    Light-touch regulatory regime and a go-live time of around 3 months.
                  </p>
                </Card>
                <Card className="p-6">
                  <Globe className="mb-4 h-8 w-8 text-[#ECBB2C]" />
                  <h3 className="mb-2 text-xl font-semibold">EEA Passporting</h3>
                  <p className="text-muted-foreground">
                    A German intermediary license granting access to 31 countries.
                  </p>
                </Card>
                <Card className="p-6">
                  <ShieldCheck className="mb-4 h-8 w-8 text-[#ECBB2C]" />
                  <h3 className="mb-2 text-xl font-semibold">Complete Support</h3>
                  <p className="text-muted-foreground">
                    Comprehensive assistance including local directors, banking, and compliance services.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="max-w-5xl mx-auto text-center space-y-8" id="benefits">
              <h2 className="text-4xl font-bold text-white mb-8">Key Benefits</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  "No ongoing regulatory reporting obligations",
                  "Proven track record with 40+ successful expansions",
                  "100% success rate in market entry",
                  "Minimum £50,000 GWP requirement in the first year",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-5 w-5 text-[#ECBB2C]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentSection === 3 && (
            <div className="max-w-5xl mx-auto text-center space-y-8" id="value">
              <h2 className="text-4xl font-bold text-white mb-8">Why Choose KASKO?</h2>
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-8 text-left">
                  <div className="flex gap-4">
                    <Building2 className="h-6 w-6 text-[#ECBB2C]" />
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">Turnkey Solution</h3>
                      <p className="text-muted-foreground">
                        We handle everything from licensing and compliance to banking and tax, so <ReplaceText text="{company}" replacements={replacements} /> can focus on growth.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Lock className="h-6 w-6 text-[#ECBB2C]" />
                    <div>
                      <h3 className="mb-2 text-xl font-semibold">Cost-Effective & Predictable</h3>
                      <p className="text-muted-foreground">
                        Our fixed pricing model reduces uncertainty and minimizes the administrative burden.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ECBB2C]/20 to-transparent rounded-2xl" />
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="KASKO Value Proposition"
                    width={600}
                    height={400}
                    className="relative rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div className="max-w-5xl mx-auto text-center space-y-8" id="cta">
              <h2 className="text-4xl font-bold text-white mb-8">
                <ReplaceText text="Contact us to discuss how KASKO can help {company} expand into the EU and UK markets" replacements={replacements} />
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Begin your expansion journey, {replacements.first_name}!
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button className="bg-[#ECBB2C] hover:bg-[#ECBB2C]/90" size="lg">
                  Schedule a Call
                </Button>
                <Button variant="outline" size="lg">
                  Download Our Brochure
                </Button>
              </div>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  )
}