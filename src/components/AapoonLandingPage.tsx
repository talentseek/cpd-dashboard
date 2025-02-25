"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Users, Globe, Cpu, ScrollText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReplaceText } from "@/components/ReplaceText"

interface Replacements {
  first_name: string;
  company: string;
  vc: {
    tagline: string;
    investmentFocus: string;
    fundSize: string;
  };
  custom: {
    mission: string;
    industry: string;
    usp: string;
    investment: string;
    technology: string;
    marketSize: string;
  };
}

// Default dynamic placeholders (for testing/demo purposes)
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
    marketSize: "{custom.marketSize}"
  }
};

export default function AapoonLandingPage({ replacements = defaultReplacements }: { replacements?: Replacements }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("down")

  const sections = [
    { id: "hero", title: "Welcome" },
    { id: "products", title: "Products" },
    { id: "patents", title: "Patents" },
    { id: "security", title: "Security" },
    { id: "opportunity", title: "Opportunity" },
    { id: "cta", title: "Next Steps" },
  ]

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1)
        setScrollDirection("down")
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
        setScrollDirection("up")
      }
    }
    window.addEventListener("wheel", handleScroll)
    return () => window.removeEventListener("wheel", handleScroll)
  }, [currentSection, sections.length])

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
        <Image
          src="/images/abm/aapoon/logo.png"
          alt="Aapoon Logo"
          width={120}
          height={40}
          className="h-8 w-auto"
        />
        <div className="space-x-4">
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={currentSection === index ? "default" : "ghost"}
              onClick={() => setCurrentSection(index)}
              className="text-base"
            >
              {section.title}
            </Button>
          ))}
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
                  src="/images/abm/aapoon/logo.png"
                  alt="Aapoon Logo"
                  width={200}
                  height={60}
                  className="h-16 w-auto mx-auto mb-8"
                />
              </motion.div>
              <h1 className="text-5xl font-bold text-white mb-6">
                <ReplaceText text="Hi {first_name}, Welcome to the Future of Secure Communication" replacements={replacements} />
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                In a world of rising cyber threats and data breaches, Aapoon provides B2B and B2G organizations with secure, sovereign messaging solutions that ensure complete data control and compliance.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Button size="lg" className="text-lg">
                  <ReplaceText text="Explore Investment Opportunity for {company}" replacements={replacements} /> <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentSection === 1 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Our Products</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                  <Users className="w-12 h-12 text-aapoon mb-4 mx-auto" />
                  <h3 className="text-2xl font-semibold text-white mb-4">aapoon messenger</h3>
                  <p className="text-white/90">
                    A white-labeled app delivering secure, sovereign messaging with full customization – far surpassing standard solutions.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl">
                  <Globe className="w-12 h-12 text-aapoon mb-4 mx-auto" />
                  <h3 className="text-2xl font-semibold text-white mb-4">aapoon meet</h3>
                  <p className="text-white/90">
                    A secure virtual meeting solution offering advanced encryption, robust controls, and seamless integration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Patent-Protected Technology</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-left">
                  <ScrollText className="w-12 h-12 text-aapoon mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Patent #18/386,748</h3>
                  <p className="text-white/90 mb-4">User Verification Technology</p>
                  <ul className="text-white/80 space-y-2 list-disc list-inside">
                    <li>Multi-layer verification system</li>
                    <li>AI-powered liveness detection</li>
                    <li>Quantum-resistant security</li>
                    <li>Offline capability</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-left">
                  <ScrollText className="w-12 h-12 text-aapoon mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">Patent #18/531,147</h3>
                  <p className="text-white/90 mb-4">Secure Hierarchical Communication</p>
                  <ul className="text-white/80 space-y-2 list-disc list-inside">
                    <li>Dynamic messaging architecture</li>
                    <li>Multi-layered security protocols</li>
                    <li>Privilege-based routing</li>
                    <li>Compliance-ready system</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Advanced Security Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <Shield className="w-10 h-10 text-aapoon mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Post-Quantum Encryption</h3>
                  <p className="text-white/80">Future-proof security against quantum threats.</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <Lock className="w-10 h-10 text-aapoon mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Data Sovereignty</h3>
                <p className="text-white/80">Complete control over your organization&apos;s data.</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <Cpu className="w-10 h-10 text-aapoon mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Security</h3>
                  <p className="text-white/80">Advanced threat detection and real-time monitoring.</p>
                </div>
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Investment Opportunity</h2>
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl text-left">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Market Leadership</h3>
                    <ul className="text-white/80 space-y-3">
                      <li className="flex items-start gap-2">
                        <Shield className="w-6 h-6 text-aapoon mt-1 flex-shrink-0" />
                        <span>Two granted patents creating strong market barriers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-6 h-6 text-aapoon mt-1 flex-shrink-0" />
                        <span>Growing B2B and B2G client base</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Lock className="w-6 h-6 text-aapoon mt-1 flex-shrink-0" />
                        <span>Unique white-labeling and data sovereignty features</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Growth Potential</h3>
                    <ul className="text-white/80 space-y-3">
                      <li className="flex items-start gap-2">
                        <Cpu className="w-6 h-6 text-aapoon mt-1 flex-shrink-0" />
                        <span>Patent-protected revenue streams through licensing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="w-6 h-6 text-aapoon mt-1 flex-shrink-0" />
                        <span>Expanding enterprise and government market</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 5 && (
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white mb-8">Ready to Join Our Journey</h2>
              <div className="space-y-4">
                <Button size="lg" variant="default" className="w-full py-6 text-xl">
                  Download Investor Presentation
                </Button>
                <Button size="lg" variant="outline" className="w-full py-6 text-xl">
                  Schedule an Introduction
                </Button>
              </div>
              <p className="text-white/80 text-lg">
                Join us in revolutionizing secure communication technology.
              </p>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}