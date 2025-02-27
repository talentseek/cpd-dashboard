"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Building2, CheckCircle, Globe, Lock, ShieldCheck, Timer } from "lucide-react"
import styles from "@/components/styles/Kasko.module.css"

interface Replacements {
  first_name: string;
  company: string;
}

export default function KaskoLandingPage({ replacements }: { replacements: Replacements }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : styles.navTransparent}`}>
        <div className={styles.navContainer}>
          <div className={styles.navFlex}>
            <Link href="/" className={styles.navLogo}>
              <Image
                src="/kasko-logo.svg"
                alt="KASKO"
                width={140}
                height={40}
                className={styles.logoImage}
                priority
              />
            </Link>
            <div className={styles.navLinks}>
              <Link href="#solutions" className={styles.navLink}>
                Solutions
              </Link>
              <Link href="#benefits" className={styles.navLink}>
                Benefits
              </Link>
              <Link href="#contact" className={styles.navLink}>
                Contact
              </Link>
              <Button className={styles.getStartedButton}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Hi {replacements.first_name}, does {replacements.company} have a Brexit solution in place?
              </h1>
              <h2 className={styles.heroSubtitle}>Your Gateway to EU Market Access</h2>
              <p className={styles.heroDescription}>
                Let us help {replacements.company} navigate the post-Brexit landscape. Our comprehensive solution
                handles everything—from licensing and compliance to banking and tax—so you can focus on growing your
                business in the EU market.
              </p>
              <div className={styles.ctaContainer}>
                <Button className={styles.ctaButton}>
                  Start Your EU Journey
                  <ArrowRight className={styles.arrowIcon} />
                </Button>
                <Button className={styles.ctaButtonOutline}>Schedule a Call</Button>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.valueImageGradient} />
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="EU Market Access"
                width={600}
                height={600}
                className={styles.valueImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>
              Your Complete Brexit Solution for {replacements.company}
            </h2>
            <p className={styles.featuresDescription}>
              Since Brexit, we&#39;ve helped over 40 MGAs/brokers establish a fully regulated intermediary in Germany,
              enabling EU-wide operations.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <Card className={styles.featureCard}>
              <Timer className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Quick Setup</h3>
              <p className={styles.featureDescription}>
                Light-touch regulatory regime with approximately 3 months to go live
              </p>
            </Card>
            <Card className={styles.featureCard}>
              <Globe className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>EEA Passporting</h3>
              <p className={styles.featureDescription}>
                German insurance intermediary license providing access to 31 countries
              </p>
            </Card>
            <Card className={styles.featureCard}>
              <ShieldCheck className={styles.featureIcon} />
              <h3 className={styles.featureTitle}>Complete Support</h3>
              <p className={styles.featureDescription}>
                Local directors, banking solutions, and compliance services included
              </p>
            </Card>
          </div>

          <div className={styles.benefitsSection}>
            <h3 className={styles.benefitsTitle}>Key Benefits</h3>
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
        </div>
      </section>

      {/* Value Proposition */}
      <section className={styles.valueSection}>
        <div className={styles.valueContainer}>
          <div className={styles.valueGrid}>
            <div className={styles.valueContent}>
              <h2 className={styles.valueTitle}>Why Choose KASKO?</h2>
              <div className={styles.valueItems}>
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
            </div>
            <div className={styles.valueImageContainer}>
              <div className={styles.valueImageGradient} />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="KASKO Value Proposition"
                width={600}
                height={400}
                className={styles.valueImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>
            Ready to help {replacements.company} access the EU market?
          </h2>
          <p className={styles.ctaDescription}>
            Let&#39;s discuss your EU expansion strategy, {replacements.first_name}!
          </p>
          <div className={styles.ctaButtons}>
            <Button className={styles.ctaButton}>Schedule a Call</Button>
            <Button className={styles.ctaButtonOutline}>Download Our Brochure</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogos}>
            <Image
              src="/iso27001.svg"
              alt="ISO27001 Certified"
              width={120}
              height={60}
              className={styles.footerLogo}
            />
            <Image
              src="/eu-funded.svg"
              alt="Co-funded by the European Union"
              width={180}
              height={60}
              className={styles.footerLogo}
            />
          </div>
          <div className={styles.footerText}>
            <p className={styles.footerCopyright}>© 2024 KASKO LTD</p>
            <p className={styles.footerAddress}>
              Registered in England and Wales No. 09607496. Registered address: 78 York Street, London, United Kingdom,
              W1H 1DP
            </p>
            <div className={styles.footerLinks}>
              <Link href="/privacy" className={styles.footerLink}>
                Privacy Notice
              </Link>
              <Link href="/terms" className={styles.footerLink}>
                Terms & Conditions
              </Link>
              <Link href="/legal" className={styles.footerLink}>
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}