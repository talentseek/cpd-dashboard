"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, CheckCircle, Globe, Lock, ShieldCheck, Timer } from "lucide-react"
import styles from "./styles/Kasko.module.css" // Import the CSS module

interface Replacements {
  first_name: string
  company: string
}

const defaultReplacements: Replacements = {
  first_name: "{first_name}",
  company: "{company}",
}

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
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/abm/kasko/logo.svg"
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
                className={`${styles.navButton} hover:${styles.navButtonHover}`}
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
          className={styles.section}
        >
          {/* Hero Section */}
          {currentSection === 0 && (
            <div className={styles.heroContainer}>
              <h1 className={styles.heroTitle}>
                Hi {replacements.first_name}, does {replacements.company} have a Brexit solution in place?
              </h1>
              <h2 className={styles.heroSubtitle}>Your Gateway to EU Market Access</h2>
              <p className={styles.heroDescription}>
                Let us help {replacements.company} navigate the post-Brexit landscape. Our comprehensive solution handles
                everything—from licensing and compliance to banking and tax—so you can focus on growing your business in
                the EU market.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className={styles.ctaButton}>
                  Start Your EU Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className={styles.ctaButtonOutline}>
                  Schedule a Call
                </Button>
              </div>
            </div>
          )}

          {/* Solutions Section */}
          {currentSection === 1 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.solutionsTitle}>
                Your Complete Brexit Solution for {replacements.company}
              </h2>
              <p className={styles.solutionsDescription}>
                Since Brexit, we’ve helped over 40 MGAs/brokers establish a fully regulated intermediary in Germany,
                enabling EU-wide operations.
              </p>
              <div className={styles.solutionGrid}>
                <Card className={styles.solutionCard}>
                  <Timer className={styles.solutionIcon} />
                  <h3 className={styles.solutionTitle}>Quick Setup</h3>
                  <p className={styles.solutionDescription}>
                    Light-touch regulatory regime with approximately 3 months to go live.
                  </p>
                </Card>
                <Card className={styles.solutionCard}>
                  <Globe className={styles.solutionIcon} />
                  <h3 className={styles.solutionTitle}>EEA Passporting</h3>
                  <p className={styles.solutionDescription}>
                    German insurance intermediary license providing access to 31 countries.
                  </p>
                </Card>
                <Card className={styles.solutionCard}>
                  <ShieldCheck className={styles.solutionIcon} />
                  <h3 className={styles.solutionTitle}>Complete Support</h3>
                  <p className={styles.solutionDescription}>
                    Local directors, banking solutions, and compliance services included.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {currentSection === 2 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.benefitsTitle}>Key Benefits</h2>
              <ul className={styles.benefitList}>
                {[
                  "No ongoing reporting obligations to the regulator",
                  "Proven track record with 40+ successful expansions",
                  "100% success rate in market expansion",
                  "Minimum £50,000 GWP requirement in first year",
                ].map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Value Proposition Section */}
          {currentSection === 3 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.valueTitle}>Why Choose KASKO?</h2>
              <div className={styles.valueGrid}>
                <div className={styles.valueCard}>
                  <div className={styles.valueItem}>
                    <Building2 className={styles.valueIcon} />
                    <div>
                      <h3 className={styles.valueSubtitle}>Turnkey Solution</h3>
                      <p className={styles.valueDescription}>
                        We simplify complex regulatory and operational challenges, enabling rapid market entry within 12
                        weeks.
                      </p>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <Lock className={styles.valueIcon} />
                    <div>
                      <h3 className={styles.valueSubtitle}>Cost-Effective & Predictable</h3>
                      <p className={styles.valueDescription}>
                        Our pricing model reduces administrative burden and provides clear cost structures, allowing you
                        to focus on growth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.valueImageContainer}>
                  <div className={styles.valueImageGradient} />
                  <Image
                    src="/images/abm/kasko/value-prop.jpg"
                    alt="KASKO Value Proposition"
                    width={600}
                    height={400}
                    className={styles.valueImage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {currentSection === 4 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.ctaTitle}>
                Ready to help {replacements.company} access the EU market?
              </h2>
              <p className={styles.ctaDescription}>
                Let’s discuss your EU expansion strategy, {replacements.first_name}!
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className={styles.ctaButton}>
                  Schedule a Call
                </Button>
                <Button variant="outline" size="lg" className={styles.ctaButtonOutline}>
                  Download Our Brochure
                </Button>
              </div>
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogos}>
            <Image
              src="/images/abm/kasko/iso27001.svg"
              alt="ISO27001 Certified"
              width={120}
              height={60}
              className={styles.footerLogo}
            />
            <Image
              src="/images/abm/kasko/eu-funded.svg"
              alt="Co-funded by the European Union"
              width={180}
              height={60}
              className={styles.footerLogo}
            />
          </div>
          <p className={styles.footerText}>© 2024 KASKO LTD</p>
          <p className={styles.footerAddress}>
            Registered in England and Wales No. 09607496. Registered address: 78 York Street, London, United Kingdom,
            W1H 1DP
          </p>
          <div className={styles.footerLinks}>
            <Link href="/privacy" className={`${styles.footerLink} hover:${styles.footerLinkHover}`}>
              Privacy Notice
            </Link>
            <Link href="/terms" className={`${styles.footerLink} hover:${styles.footerLinkHover}`}>
              Terms & Conditions
            </Link>
            <Link href="/legal" className={`${styles.footerLink} hover:${styles.footerLinkHover}`}>
              Legal Notice
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}