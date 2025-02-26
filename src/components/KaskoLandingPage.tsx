"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, CheckCircle, Globe, Lock, ShieldCheck, Timer } from "lucide-react"
import styles from "./Kasko.module.css"

// Define the replacements interface for ABM personalization
interface Replacements {
  first_name: string
  company: string
}

// Default replacements for fallback
const defaultReplacements: Replacements = {
  first_name: "{first_name}",
  company: "{company}",
}

// Simple utility for conditional classNames
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ")

export default function KaskoLandingPage({ replacements = defaultReplacements }: { replacements?: Replacements }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")

  const sections = [
    { id: "hero", title: "Home" },
    { id: "solutions", title: "Solutions" },
    { id: "benefits", title: "Benefits" },
    { id: "value", title: "Why KASKO" },
    { id: "cta", title: "Get Started" },
  ]

  // Handle wheel events for section navigation
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
  }, [currentSection])

  return (
    <div className={styles.container}>
      {/* Fixed Navigation */}
      <nav className={cn(styles.nav, "fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md")}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/abm/kasko/logo.svg" // Adjust this path to your KASKO logo
              alt="KASKO"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-4">
            {sections.map((section, index) => (
              <Button
                key={section.id}
                variant={currentSection === index ? "default" : "ghost"}
                onClick={() => setCurrentSection(index)}
                className="text-white hover:text-[#ECBB2C]"
              >
                {section.title}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Section Content with Animation */}
      <AnimatePresence initial={false} custom={scrollDirection}>
        <motion.section
          key={currentSection}
          initial={{ opacity: 0, y: scrollDirection === "down" ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: scrollDirection === "down" ? -20 : 20 }}
          transition={{ duration: 0.5 }}
          className="h-screen flex items-center justify-center px-4 pt-20"
        >
          {/* Hero Section */}
          {currentSection === 0 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h1 className="text-5xl font-bold text-white">
                Hi {replacements.first_name}, does {replacements.company} have a Brexit solution in place?
              </h1>
              <h2 className="text-3xl text-white/90 font-medium">Your Gateway to EU Market Access</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Let us help {replacements.company} navigate the post-Brexit landscape. Our comprehensive solution handles
                everything—from licensing and compliance to banking and tax—so you can focus on growing your business in
                the EU market.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-[#ECBB2C] hover:bg-[#ECBB2C]/90 text-black">
                  Start Your EU Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  Schedule a Call
                </Button>
              </div>
            </div>
          )}

          {/* Solutions Section */}
          {currentSection === 1 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">
                Your Complete Brexit Solution for {replacements.company}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Since Brexit, we’ve helped over 40 MGAs/brokers establish a fully regulated intermediary in Germany,
                enabling EU-wide operations.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 bg-white/10 backdrop-blur-md">
                  <Timer className="h-8 w-8 text-[#ECBB2C] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Quick Setup</h3>
                  <p className="text-white/80">
                    Light-touch regulatory regime with approximately 3 months to go live.
                  </p>
                </Card>
                <Card className="p-6 bg-white/10 backdrop-blur-md">
                  <Globe className="h-8 w-8 text-[#ECBB2C] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">EEA Passporting</h3>
                  <p className="text-white/80">
                    German insurance intermediary license providing access to 31 countries.
                  </p>
                </Card>
                <Card className="p-6 bg-white/10 backdrop-blur-md">
                  <ShieldCheck className="h-8 w-8 text-[#ECBB2C] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Complete Support</h3>
                  <p className="text-white/80">
                    Local directors, banking solutions, and compliance services included.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {currentSection === 2 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">Key Benefits</h2>
              <ul className="grid md:grid-cols-2 gap-4 text-white/80">
                {[
                  "No ongoing reporting obligations to the regulator",
                  "Proven track record with 40+ successful expansions",
                  "100% success rate in market expansion",
                  "Minimum £50,000 GWP requirement in first year",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#ECBB2C]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Value Proposition Section */}
          {currentSection === 3 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">Why Choose KASKO?</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-8">
                  <div className="flex gap-4">
                    <Building2 className="h-6 w-6 text-[#ECBB2C]" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Turnkey Solution</h3>
                      <p className="text-white/80">
                        We simplify complex regulatory and operational challenges, enabling rapid market entry within 12
                        weeks.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Lock className="h-6 w-6 text-[#ECBB2C]" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Cost-Effective & Predictable</h3>
                      <p className="text-white/80">
                        Our pricing model reduces administrative burden and provides clear cost structures, allowing you
                        to focus on growth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ECBB2C]/20 to-transparent rounded-2xl" />
                  <Image
                    src="/images/abm/kasko/value-prop.jpg" // Adjust this path to your image
                    alt="KASKO Value Proposition"
                    width={600}
                    height={400}
                    className="relative rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {currentSection === 4 && (
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">
                Ready to help {replacements.company} access the EU market?
              </h2>
              <p className="text-xl text-white/80">
                Let’s discuss your EU expansion strategy, {replacements.first_name}!
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-[#ECBB2C] hover:bg-[#ECBB2C]/90 text-black">
                  Schedule a Call
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  Download Our Brochure
                </Button>
              </div>
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Footer (Static, outside of sections) */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center space-x-12 mb-12">
            <Image
              src="/images/abm/kasko/iso27001.svg" // Adjust this path
              alt="ISO27001 Certified"
              width={120}
              height={60}
              className="h-15 w-auto"
            />
            <Image
              src="/images/abm/kasko/eu-funded.svg" // Adjust this path
              alt="Co-funded by the European Union"
              width={180}
              height={60}
              className="h-15 w-auto"
            />
          </div>
          <p className="text-sm text-gray-600">© 2024 KASKO LTD</p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Registered in England and Wales No. 09607496. Registered address: 78 York Street, London, United Kingdom,
            W1H 1DP
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#ECBB2C]">
              Privacy Notice
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#ECBB2C]">
              Terms & Conditions
            </Link>
            <Link href="/legal" className="text-sm text-gray-500 hover:text-[#ECBB2C]">
              Legal Notice
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}