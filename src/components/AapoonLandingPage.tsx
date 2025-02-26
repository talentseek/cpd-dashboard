"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Users, Globe, Cpu, ScrollText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText"
import styles from "./styles/Aapoon.module.css" // Import the CSS module

interface Replacements extends CustomReplacements {
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
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
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
              className={`${styles.navButton} hover:${styles.navButtonHover}`}
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
          className={styles.section}
        >
          {/* Hero Section */}
          {currentSection === 0 && (
            <div className={styles.heroContainer}>
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Image
                  src="/images/abm/aapoon/logo.png"
                  alt="Aapoon Logo"
                  width={200}
                  height={60}
                  className={styles.heroLogo}
                />
              </motion.div>
              <h1 className={styles.heroTitle}>
                <ReplaceText text="Hi {first_name}, Welcome to the Future of Secure Communication" replacements={replacements} />
              </h1>
              <p className={styles.heroDescription}>
                In a world of rising cyber threats and data breaches, Aapoon provides B2B and B2G organizations with secure, sovereign messaging solutions that ensure complete data control and compliance.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Button size="lg" className={styles.ctaButton}>
                  <ReplaceText text="Explore Investment Opportunity for {company}" replacements={replacements} /> <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Products Section */}
          {currentSection === 1 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.productsTitle}>Our Products</h2>
              <div className={styles.productGrid}>
                <div className={styles.productCard}>
                  <Users className={styles.productIcon} />
                  <h3 className={styles.productTitle}>aapoon messenger</h3>
                  <p className={styles.productDescription}>
                    A white-labeled app delivering secure, sovereign messaging with full customization – far surpassing standard solutions.
                  </p>
                </div>
                <div className={styles.productCard}>
                  <Globe className={styles.productIcon} />
                  <h3 className={styles.productTitle}>aapoon meet</h3>
                  <p className={styles.productDescription}>
                    A secure virtual meeting solution offering advanced encryption, robust controls, and seamless integration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Patents Section */}
          {currentSection === 2 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.patentsTitle}>Patent-Protected Technology</h2>
              <div className={styles.patentGrid}>
                <div className={styles.patentCard}>
                  <ScrollText className={styles.patentIcon} />
                  <h3 className={styles.patentTitle}>Patent #18/386,748</h3>
                  <p className={styles.patentDescription}>User Verification Technology</p>
                  <ul className={styles.patentList}>
                    <li>Multi-layer verification system</li>
                    <li>AI-powered liveness detection</li>
                    <li>Quantum-resistant security</li>
                    <li>Offline capability</li>
                  </ul>
                </div>
                <div className={styles.patentCard}>
                  <ScrollText className={styles.patentIcon} />
                  <h3 className={styles.patentTitle}>Patent #18/531,147</h3>
                  <p className={styles.patentDescription}>Secure Hierarchical Communication</p>
                  <ul className={styles.patentList}>
                    <li>Dynamic messaging architecture</li>
                    <li>Multi-layered security protocols</li>
                    <li>Privilege-based routing</li>
                    <li>Compliance-ready system</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {currentSection === 3 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.securityTitle}>Advanced Security Features</h2>
              <div className={styles.securityGrid}>
                <div className={styles.securityCard}>
                  <Shield className={styles.securityIcon} />
                  <h3 className={styles.securityTitleCard}>Post-Quantum Encryption</h3>
                  <p className={styles.securityDescription}>Future-proof security against quantum threats.</p>
                </div>
                <div className={styles.securityCard}>
                  <Lock className={styles.securityIcon} />
                  <h3 className={styles.securityTitleCard}>Data Sovereignty</h3>
                <p className={styles.securityDescription}>Complete control over your organization&apos;s data.</p>
                </div>
                <div className={styles.securityCard}>
                  <Cpu className={styles.securityIcon} />
                  <h3 className={styles.securityTitleCard}>AI-Powered Security</h3>
                  <p className={styles.securityDescription}>Advanced threat detection and real-time monitoring.</p>
                </div>
              </div>
            </div>
          )}

          {/* Opportunity Section */}
          {currentSection === 4 && (
            <div className={styles.heroContainer}>
              <h2 className={styles.opportunityTitle}>Investment Opportunity</h2>
              <div className={styles.opportunityCard}>
                <div className={styles.opportunityGrid}>
                  <div>
                    <h3 className={styles.opportunitySubtitle}>Market Leadership</h3>
                    <ul className={styles.opportunityList}>
                      <li className={styles.opportunityListItem}>
                        <Shield className={styles.opportunityIcon} />
                        <span>Two granted patents creating strong market barriers</span>
                      </li>
                      <li className={styles.opportunityListItem}>
                        <Globe className={styles.opportunityIcon} />
                        <span>Growing B2B and B2G client base</span>
                      </li>
                      <li className={styles.opportunityListItem}>
                        <Lock className={styles.opportunityIcon} />
                        <span>Unique white-labeling and data sovereignty features</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={styles.opportunitySubtitle}>Growth Potential</h3>
                    <ul className={styles.opportunityList}>
                      <li className={styles.opportunityListItem}>
                        <Cpu className={styles.opportunityIcon} />
                        <span>Patent-protected revenue streams through licensing</span>
                      </li>
                      <li className={styles.opportunityListItem}>
                        <Users className={styles.opportunityIcon} />
                        <span>Expanding enterprise and government market</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {currentSection === 5 && (
            <div className={styles.ctaContainer}>
              <h2 className={styles.ctaTitle}>Ready to Join Our Journey</h2>
              <div className="space-y-4">
                <Button size="lg" variant="default" className={styles.ctaButtonFull}>
                  Download Investor Presentation
                </Button>
                <Button size="lg" variant="outline" className={styles.ctaButtonOutline}>
                  Schedule an Introduction
                </Button>
              </div>
              <p className={styles.ctaDescription}>
                Join us in revolutionizing secure communication technology.
              </p>
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}