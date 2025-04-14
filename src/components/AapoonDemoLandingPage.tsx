// src/components/AapoonDemoLandingPage.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Shield, Server, Globe, Zap, ArrowRight } from "lucide-react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
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

  // Scroll Reveal Component
  const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: delay * 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
    );
  };

  // Security Transition Component (Simplified)
  const SecurityTransition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
    });

    return (
      <div ref={containerRef} className={styles.securityTransition}>
        <div className={styles.transitionWrapper}>
          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]),
              scale: useTransform(scrollYProgress, [0, 0.4], [1, 0.9]),
            }}
          >
            <div className={styles.vulnerableState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.warningIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Vulnerable Communications</h3>
              </div>
              <div className={styles.stateContent}>
                <div>
                  <ul className={styles.stateList}>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Standard encryption vulnerable to quantum attacks</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Data harvesting for future decryption</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Intellectual property at risk</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.stateImage}>
                  <Image
                    src="/images/abm/aapoon/vulnerable-data.svg"
                    alt="Vulnerable data"
                    fill
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 1, 0.9]),
            }}
          >
            <div className={styles.transitioningState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.transitionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Transition to Quantum Security</h3>
              </div>
              <div className={styles.transitionImage}>
                <div className={styles.transitionImageWrapper}>
                  <Image
                    src="/images/abm/aapoon/security-transition.svg"
                    alt="Security transition"
                    width={500}
                    height={200}
                    className={styles.image}
                  />
                  <div className={styles.transitionPing}>
                    <div className={styles.pingCircle}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]),
              scale: useTransform(scrollYProgress, [0.6, 1], [0.9, 1]),
            }}
          >
            <div className={styles.secureState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.secureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Quantum-Resistant Security</h3>
              </div>
              <div className={styles.stateContent}>
                <div>
                  <ul className={styles.stateList}>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Post-quantum cryptography algorithms</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Future-proof data sovereignty</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure against both classical and quantum attacks</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.stateImage}>
                  <Image
                    src="/images/abm/aapoon/secure-data.svg"
                    alt="Secure data"
                    fill
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
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
          <Link href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
            Schedule a Call
            <ArrowRight className={styles.ctaIcon} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.sectionContainer}>
          <div className={styles.heroContent}>
            <ScrollReveal>
              <div className={styles.heroText}>
                <div className={styles.alertBadge}>Quantum Security Alert</div>
                <h1 className={styles.heroTitle}>
                  {firstName}, Protect {company} from the Quantum Threat
                </h1>
                <p className={styles.heroSubtitle}>
                  Quantum computers will soon break current encryption, putting your sensitive data at risk. Aapoon’s quantum-resistant solutions ensure your organization stays secure.
                </p>
                <div className={styles.heroButtons}>
                  <Link href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
                    Schedule a Call
                    <ArrowRight className={styles.ctaIcon} />
                  </Link>
                  <Link href="#solution" className={styles.secondaryButton}>
                    Learn More
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.heroVisual}>
                <Image
                  src="/images/abm/aapoon/quantum-threat.svg"
                  alt="Quantum Threat"
                  width={500}
                  height={400}
                  className={styles.heroImage}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className={styles.problemSection}>
        <div className={styles.sectionContainer}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>The Quantum Threat to Your Organization</h2>
              <p className={styles.sectionSubtitle}>
                As a CISO, you’re responsible for safeguarding sensitive data. Quantum computing poses an unprecedented risk to your current security measures.
              </p>
            </div>
          </ScrollReveal>
          <div className={styles.problemGrid}>
            <ScrollReveal delay={100}>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Lock className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Encryption Vulnerability</h3>
                <p className={styles.cardDescription}>
                  Quantum computers using Shor’s algorithm can break RSA-2048 and ECC encryption in hours, rendering current standards obsolete.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Shield className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Regulatory Compliance Risks</h3>
                <p className={styles.cardDescription}>
                  The Quantum Computing Cybersecurity Preparedness Act mandates federal agencies to adopt post-quantum cryptography (PQC) by 2030. Non-compliance could lead to penalties and loss of contracts.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Zap className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Data Harvesting Threat</h3>
                <p className={styles.cardDescription}>
                  Adversaries are already harvesting encrypted data today, waiting for quantum computers to decrypt it in the future—a &quot;harvest now, decrypt later&quot; attack.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Server className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Industry-Wide Impact</h3>
                <p className={styles.cardDescription}>
                  Sectors like finance, healthcare, and defense, which rely on secure communications, face significant risks if encryption fails, leading to data breaches and reputational damage.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Transition Visual Section */}
      <section className={styles.transitionSection}>
        <div className={styles.sectionContainer}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Secure Your Future Today</h2>
              <p className={styles.sectionSubtitle}>
                Transition to quantum-resistant security with Aapoon to protect your organization from emerging threats.
              </p>
            </div>
          </ScrollReveal>
          <div className={styles.transitionVisual}>
            <SecurityTransition />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.solutionSection}>
        <div className={styles.sectionContainer}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <div className={styles.solutionBadge}>The Solution</div>
              <h2 className={styles.sectionTitle}>Aapoon’s Quantum Resistant Communication Suite</h2>
              <p className={styles.sectionSubtitle}>
                Designed for CISOs, Aapoon provides a seamless, NIST-compliant solution to safeguard your organization against quantum threats.
              </p>
            </div>
          </ScrollReveal>
          <div className={styles.solutionContent}>
            <ScrollReveal>
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
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.solutionImage}>
                <Image
                  src="/images/abm/aapoon/quantum-product.svg"
                  alt="Quantum Resistant Communication Suite"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={300}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <ScrollReveal>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                {firstName}, Secure {company} Against Quantum Threats
              </h2>
              <p className={styles.ctaSubtitle}>
                Schedule a 30-minute call with our team to see how Aapoon can protect your organization.
              </p>
              <Link href="https://cal.com/aapoon/30min" className={styles.ctaButton}>
                Schedule a Call
                <ArrowRight className={styles.ctaIcon} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div>
              <Image
                src="/images/abm/aapoon/logo-white.png"
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
              <Link href="/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.footerLink}>
                Terms of Service
              </Link>
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