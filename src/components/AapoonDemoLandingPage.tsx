// src/components/AapoonDemoLandingPage.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Shield, Server, Globe, Zap, ArrowRight } from "lucide-react";
import styles from "@/components/styles/AapoonDemo.module.css";

interface AapoonDemoLandingPageProps {
  firstName?: string;
  company?: string;
}

export default function AapoonDemoLandingPage({
  firstName = "Alex",
  company = "TechVentures",
}: AapoonDemoLandingPageProps) {
  // Navigation Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for Learn More button
  const handleLearnMoreClick = () => {
    const solutionSection = document.getElementById("solution");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Product Feature Component
  const ProductFeature = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className={styles.productFeature}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <Image
              src="/images/abm/aapoon/logo.png"
              alt="aapoon"
              width={120}
              height={40}
              priority
            />
          </Link>
          <a href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
            Schedule a Call
            <ArrowRight className={styles.ctaIcon} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.alertBadge}>Quantum Security Alert</div>
              <h1 className={styles.heroTitle}>
                {firstName}, Protect {company} from the Quantum Threat
              </h1>
              <p className={styles.heroSubtitle}>
                Quantum computers will soon break current encryption, putting your sensitive data at risk. Aapoon’s quantum-resistant solutions ensure your organization stays secure.
              </p>
              <div className={styles.heroButtons}>
                <a href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
                  Schedule a Call
                  <ArrowRight className={styles.ctaIcon} />
                </a>
                <button onClick={handleLearnMoreClick} className={styles.secondaryButton}>
                  Learn More
                </button>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <Image
                src="/images/abm/aapoon/threat.png"
                alt="Quantum Threat"
                width={500}
                height={400}
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className={styles.problemSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Quantum Threat to Your Organization</h2>
            <p className={styles.sectionSubtitle}>
              As a CISO, you’re responsible for safeguarding sensitive data. Quantum computing poses an unprecedented risk to your current security measures.
            </p>
          </div>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.cardIcon}>
                <Lock className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>Encryption Vulnerability</h3>
              <p className={styles.cardDescription}>
                Quantum computers using Shor’s algorithm can break RSA-2048 and ECC encryption in hours, rendering current standards obsolete.
              </p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.cardIcon}>
                <Shield className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>Regulatory Compliance Risks</h3>
              <p className={styles.cardDescription}>
                The Quantum Computing Cybersecurity Preparedness Act mandates federal agencies to adopt post-quantum cryptography (PQC) by 2030. Non-compliance could lead to penalties and loss of contracts.
              </p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.cardIcon}>
                <Zap className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>Data Harvesting Threat</h3>
              <p className={styles.cardDescription}>
                Adversaries are already harvesting encrypted data today, waiting for quantum computers to decrypt it in the future—a "harvest now, decrypt later" attack.
              </p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.cardIcon}>
                <Server className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>Industry-Wide Impact</h3>
              <p className={styles.cardDescription}>
                Sectors like finance, healthcare, and defense, which rely on secure communications, face significant risks if encryption fails, leading to data breaches and reputational damage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className={styles.solutionSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.solutionBadge}>The Solution</div>
            <h2 className={styles.sectionTitle}>Aapoon’s Quantum Resistant Communication Suite</h2>
            <p className={styles.sectionSubtitle}>
              Designed for CISOs, Aapoon provides a seamless, NIST-compliant solution to safeguard your organization against quantum threats.
            </p>
          </div>
          <div className={styles.solutionContent}>
            <div className={styles.solutionFeatures}>
              <ProductFeature
                icon={<Shield className={styles.icon} />}
                title="Quantum Secure VPN"
                description="Protect remote access with post-quantum encryption, featuring a kill switch, multi-region nodes, and stealth mode to ensure secure communications."
              />
              <ProductFeature
                icon={<Server className={styles.icon} />}
                title="Quantum Secure Wrapper"
                description="Integrate PQC into your existing systems with zero latency, ensuring compliance across industries like banking, healthcare, and defense."
              />
              <ProductFeature
                icon={<Globe className={styles.icon} />}
                title="Future-Proof Compliance"
                description="Align with NIST PQC standards and federal mandates, ensuring your organization meets regulatory requirements by 2030 and beyond."
              />
              <ProductFeature
                icon={<Zap className={styles.icon} />}
                title="Scalable Deployment"
                description="Easily deploy across your organization with minimal disruption, supporting both on-premises and cloud environments."
              />
            </div>
            <div className={styles.solutionImage}>
              <Image
                src="/images/abm/aapoon/suite.png"
                alt="Quantum Resistant Communication Suite"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.benefitsSection}>
            <h3 className={styles.benefitsTitle}>Why Choose Aapoon?</h3>
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <strong>Proactive Protection:</strong> Stay ahead of quantum threats by implementing PQC today.
              </li>
              <li className={styles.benefitItem}>
                <strong>Regulatory Readiness:</strong> Meet federal mandates and industry standards with NIST-compliant solutions.
              </li>
              <li className={styles.benefitItem}>
                <strong>Seamless Integration:</strong> Integrate with your existing infrastructure without downtime or performance impact.
              </li>
              <li className={styles.benefitItem}>
                <strong>Trusted Security:</strong> Protect sensitive data from both classical and quantum attacks, ensuring data sovereignty.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              {firstName}, Secure {company} Against Quantum Threats
            </h2>
            <p className={styles.ctaSubtitle}>
              Schedule a 30-minute call with our team to see how Aapoon can protect your organization.
            </p>
            <a href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
              Schedule a Call
              <ArrowRight className={styles.ctaIcon} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div>
              <Image
                src="/images/abm/aapoon/logo.png"
                alt="aapoon"
                width={120}
                height={40}
                className={styles.footerLogo}
              />
              <p className={styles.footerText}>
                Quantum-resistant communication solutions for the future.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <a href="https://aapoon.com/privacy-policy/" className={styles.footerLink}>
                Privacy Policy
              </a>
              <a href="https://aapoon.com/terms-of-service/" className={styles.footerLink}>
                Terms of Service
              </a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Aapoon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}