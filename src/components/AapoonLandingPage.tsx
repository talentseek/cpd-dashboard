// src/components/AapoonLandingPage.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Users, Globe, Cpu, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingNav from "@/components/FloatingNav";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/Aapoon.module.css";

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
    marketSize: "{custom.marketSize}",
  },
};

export default function AapoonLandingPage({ replacements = defaultReplacements }: { replacements?: Replacements }) {
  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const patentsRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const opportunityRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const comparisonsRef = useRef<HTMLDivElement>(null); // New ref for comparisons section
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const productsControls = useAnimation();
  const patentsControls = useAnimation();
  const securityControls = useAnimation();
  const opportunityControls = useAnimation();
  const insightsControls = useAnimation();
  const comparisonsControls = useAnimation(); // New animation control for comparisons section
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const productsInView = useInView(productsRef, { once: false, amount: 0.3 });
  const patentsInView = useInView(patentsRef, { once: false, amount: 0.3 });
  const securityInView = useInView(securityRef, { once: false, amount: 0.3 });
  const opportunityInView = useInView(opportunityRef, { once: false, amount: 0.3 });
  const insightsInView = useInView(insightsRef, { once: false, amount: 0.3 });
  const comparisonsInView = useInView(comparisonsRef, { once: false, amount: 0.3 }); // New inView hook
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (productsInView) productsControls.start("visible");
    if (patentsInView) patentsControls.start("visible");
    if (securityInView) securityControls.start("visible");
    if (opportunityInView) opportunityControls.start("visible");
    if (insightsInView) insightsControls.start("visible");
    if (comparisonsInView) comparisonsControls.start("visible"); // Trigger animation for comparisons
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    productsInView,
    patentsInView,
    securityInView,
    opportunityInView,
    insightsInView,
    comparisonsInView, // Added to dependencies
    ctaInView,
    footerInView,
    navControls,
    heroControls,
    productsControls,
    patentsControls,
    securityControls,
    opportunityControls,
    insightsControls,
    comparisonsControls, // Added to dependencies
    ctaControls,
    footerControls,
  ]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Navigation */}
      <motion.nav
        ref={navRef}
        className={styles.nav}
        initial="hidden"
        animate={navControls}
        variants={fadeInUp}
      >
        <Image
          src="/images/abm/aapoon/logo.png"
          alt="Aapoon Logo"
          width={120}
          height={40}
          className={styles.navLogo}
        />
        <div className={styles.navLinks}>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("hero")}
            className={styles.navButton}
          >
            {"Welcome"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("products")}
            className={styles.navButton}
          >
            {"Products"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("patents")}
            className={styles.navButton}
          >
            {"Patents"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("security")}
            className={styles.navButton}
          >
            {"Security"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("opportunity")}
            className={styles.navButton}
          >
            {"Opportunity"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("insights")}
            className={styles.navButton}
          >
            {"Insights"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("comparisons")} // New nav link
            className={styles.navButton}
          >
            {"Comparisons"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleScrollTo("cta")}
            className={styles.navButton}
          >
            {"Next Steps"}
          </Button>
        </div>
      </motion.nav>

      <div className={styles.navSpacer}></div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        id="hero"
        className={styles.section}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.div variants={fadeInUp}>
            <Image
              src="/images/abm/aapoon/logo.png"
              alt="Aapoon Logo"
              width={200}
              height={60}
              className={styles.heroLogo}
            />
          </motion.div>
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            <ReplaceText
              text="Hi {first_name}, Welcome to the Future of Secure Communication"
              replacements={replacements}
            />
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroDescription}>
            {"In a world of rising cyber threats and data breaches, Aapoon provides B2B and B2G organizations with secure, sovereign messaging solutions that ensure complete data control and compliance."}
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.ctaContainer}>
            <Button
              className={styles.ctaButton}
              onClick={() => (window.location.href = "https://cal.com/aapoon/15min")}
            >
              <ReplaceText
                text="Explore Investment Opportunity for {company}"
                replacements={replacements}
              />{" "}
              <ArrowRight className={styles.arrowIcon} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        ref={productsRef}
        id="products"
        className={styles.section}
        initial="hidden"
        animate={productsControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.productsTitle}>
            {"Our Products"}
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.productGrid}>
            <motion.div variants={fadeInUp} className={styles.productCard}>
              <Users className={styles.productIcon} />
              <h3 className={styles.productTitle}>{"aapoon messenger"}</h3>
              <p className={styles.productDescription}>
                {"A white-labeled app delivering secure, sovereign messaging with full customization - far surpassing standard solutions."}
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.productCard}>
              <Globe className={styles.productIcon} />
              <h3 className={styles.productTitle}>{"aapoon meet"}</h3>
              <p className={styles.productDescription}>
                {"A secure virtual meeting solution offering advanced encryption, robust controls, and seamless integration."}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Patents Section */}
      <motion.section
        ref={patentsRef}
        id="patents"
        className={styles.section}
        initial="hidden"
        animate={patentsControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.patentsTitle}>
            {"Patent-Protected Technology"}
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.patentGrid}>
            <motion.div variants={fadeInUp} className={styles.patentCard}>
              <ScrollText className={styles.patentIcon} />
              <h3 className={styles.patentTitle}>{"Patent #18/386,748"}</h3>
              <p className={styles.patentDescription}>{"User Verification Technology"}</p>
              <ul className={styles.patentList}>
                <li>{"Multi-layer verification system"}</li>
                <li>{"AI-powered liveness detection"}</li>
                <li>{"Quantum-resistant security"}</li>
                <li>{"Offline capability"}</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.patentCard}>
              <ScrollText className={styles.patentIcon} />
              <h3 className={styles.patentTitle}>{"Patent #18/531,147"}</h3>
              <p className={styles.patentDescription}>{"Secure Hierarchical Communication"}</p>
              <ul className={styles.patentList}>
                <li>{"Dynamic messaging architecture"}</li>
                <li>{"Multi-layered security protocols"}</li>
                <li>{"Privilege-based routing"}</li>
                <li>{"Compliance-ready system"}</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.patentCard}>
              <ScrollText className={styles.patentIcon} />
              <h3 className={styles.patentTitle}>{"Patent #18/961,639"}</h3>
              <p className={styles.patentDescription}>{"Secure Device Communication Using Multi-Key Encapsulation"}</p>
              <ul className={styles.patentList}>
                <li>{"Multi-key encapsulation for secure device communication"}</li>
                <li>{"Enhanced encryption for device-to-device interactions"}</li>
                <li>{"Scalable security for IoT and enterprise networks"}</li>
                <li>{"Resilient against advanced cryptographic attacks"}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        ref={securityRef}
        id="security"
        className={styles.section}
        initial="hidden"
        animate={securityControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.securityTitle}>
            {"Advanced Security Features"}
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.securityGrid}>
            <motion.div variants={fadeInUp} className={styles.securityCard}>
              <Shield className={styles.securityIcon} />
              <h3 className={styles.securityTitleCard}>{"Post-Quantum Encryption"}</h3>
              <p className={styles.securityDescription}>{"Future-proof security against quantum threats."}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.securityCard}>
              <Lock className={styles.securityIcon} />
              <h3 className={styles.securityTitleCard}>{"Data Sovereignty"}</h3>
              <p className={styles.securityDescription}>{"Complete control over your organization's data."}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.securityCard}>
              <Cpu className={styles.securityIcon} />
              <h3 className={styles.securityTitleCard}>{"AI-Powered Security"}</h3>
              <p className={styles.securityDescription}>{"Advanced threat detection and real-time monitoring."}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Opportunity Section */}
      <motion.section
        ref={opportunityRef}
        id="opportunity"
        className={styles.section}
        initial="hidden"
        animate={opportunityControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.opportunityTitle}>
            {"Investment Opportunity"}
          </motion.h2>
          <motion.div variants={fadeInUp} className={styles.opportunityCard}>
            <div className={styles.opportunityGrid}>
              <div>
                <motion.h3 variants={fadeInUp} className={styles.opportunitySubtitle}>
                  {"Market Leadership"}
                </motion.h3>
                <motion.ul variants={staggerChildren} className={styles.opportunityList}>
                  <motion.li variants={fadeInUp} className={styles.opportunityListItem}>
                    <Shield className={styles.opportunityIcon} />
                    <span>{"Two granted patents creating strong market barriers"}</span>
                  </motion.li>
                  <motion.li variants={fadeInUp} className={styles.opportunityListItem}>
                    <Globe className={styles.opportunityIcon} />
                    <span>{"Growing B2B and B2G client base"}</span>
                  </motion.li>
                  <motion.li variants={fadeInUp} className={styles.opportunityListItem}>
                    <Lock className={styles.opportunityIcon} />
                    <span>{"Unique white-labeling and data sovereignty features"}</span>
                  </motion.li>
                </motion.ul>
              </div>
              <div>
                <motion.h3 variants={fadeInUp} className={styles.opportunitySubtitle}>
                  {"Growth Potential"}
                </motion.h3>
                <motion.ul variants={staggerChildren} className={styles.opportunityList}>
                  <motion.li variants={fadeInUp} className={styles.opportunityListItem}>
                    <Cpu className={styles.opportunityIcon} />
                    <span>{"Patent-protected revenue streams through licensing"}</span>
                  </motion.li>
                  <motion.li variants={fadeInUp} className={styles.opportunityListItem}>
                    <Users className={styles.opportunityIcon} />
                    <span>{"Expanding enterprise and government market"}</span>
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Industry Insights Section */}
      <motion.section
        ref={insightsRef}
        id="insights"
        className={styles.section}
        initial="hidden"
        animate={insightsControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.insightsTitle}>
            {"Industry Insights"}
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.insightsGrid}>
            <motion.div variants={fadeInUp} className={styles.insightCard}>
              <blockquote className={styles.insightQuote}>
                {"\"We’re moving from a world where SaaS was essentially CRUD databases with some business logic on top to one where AI agents can dynamically orchestrate and execute workflows.\""}
              </blockquote>
              <p className={styles.insightAuthor}>— Satya Nadella, CEO of Microsoft</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={styles.insightCard}>
              <blockquote className={styles.insightQuote}>
                {"\"The SaaS era as we know it might be ending—not because software is dead, but because it’s becoming a tool to transform businesses rather than a standalone subscription product.\""}
              </blockquote>
              <p className={styles.insightAuthor}>— Sam Lessin, General Partner at Slow Ventures</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Comparisons Section */}
      <motion.section
        ref={comparisonsRef}
        id="comparisons"
        className={styles.section}
        initial="hidden"
        animate={comparisonsControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContainer}>
          <motion.h2 variants={fadeInUp} className={styles.comparisonsTitle}>
            {"Why Choose Aapoon Over Slack or Microsoft Teams"}
          </motion.h2>
          <motion.div variants={fadeInUp} className={styles.comparisonsTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>{"Features"}</th>
                  <th className={styles.tableHeader}>
                    <Image
                      src="/images/abm/aapoon/logo.png"
                      alt="Aapoon Logo"
                      width={80}
                      height={24}
                      className={styles.comparisonLogo}
                    />
                  </th>
                  <th className={styles.tableHeader}>
                    <Image
                      src="/images/abm/aapoon/slack.png"
                      alt="Slack Logo"
                      width={80}
                      height={24}
                      className={styles.comparisonLogo}
                    />
                  </th>
                  <th className={styles.tableHeader}>
                    <Image
                      src="/images/abm/aapoon/teams.png"
                      alt="Microsoft Teams Logo"
                      width={80}
                      height={24}
                      className={styles.comparisonLogo}
                    />
                  </th>
                  <th className={styles.tableHeader}>
                    <Image
                      src="/images/abm/aapoon/whatsapp.png"
                      alt="WhatsApp Business Logo"
                      width={80}
                      height={24}
                      className={styles.comparisonLogo}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Data Ownership & Control"}</td>
                  <td className={styles.tableCell}>{"Full control with on-prem & private cloud hosting"}</td>
                  <td className={styles.tableCell}>{"Stored on Slack’s cloud servers"}</td>
                  <td className={styles.tableCell}>{"Stored on Microsoft Cloud"}</td>
                  <td className={styles.tableCell}>{"Meta-controlled Data Storage"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Hierarchical Messaging"}</td>
                  <td className={styles.tableCell}>{"Yes, aligns with the organizational structure"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Avoids Double Subpoena Risks"}</td>
                  <td className={styles.tableCell}>{"Yes, minimizes third-party legal exposure."}</td>
                  <td className={styles.tableCell}>{"No, subject to external subpoenas"}</td>
                  <td className={styles.tableCell}>{"No, subject to external subpoenas"}</td>
                  <td className={styles.tableCell}>{"No, Meta retains message metadata"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Customizable Privacy Controls"}</td>
                  <td className={styles.tableCell}>{"Yes, tailored to compliance needs"}</td>
                  <td className={styles.tableCell}>{"Limited, mostly admin-controlled"}</td>
                  <td className={styles.tableCell}>{"Limited, admin-controlled"}</td>
                  <td className={styles.tableCell}>{"Very limited, user-level controls only"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"AI Agents with Real-time Data Access"}</td>
                  <td className={styles.tableCell}>{"Yes, real-time proprietary data access"}</td>
                  <td className={styles.tableCell}>{"No, relies on API-based SaaS calls"}</td>
                  <td className={styles.tableCell}>{"No, relies on API-based SaaS calls"}</td>
                  <td className={styles.tableCell}>{"No, not designed for enterprise AI"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Edge Computing & On-Prem AI Models"}</td>
                  <td className={styles.tableCell}>{"Yes, supports on-prem AI and edge computing."}</td>
                  <td className={styles.tableCell}>{"No, SaaS-based cloud model"}</td>
                  <td className={styles.tableCell}>{"No, SaaS-based cloud model"}</td>
                  <td className={styles.tableCell}>{"No, cloud-based consumer model"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Flat Pricing Model"}</td>
                  <td className={styles.tableCell}>{"Yes, unlimited users at flat pricing"}</td>
                  <td className={styles.tableCell}>{"No, per-user pricing increases costs."}</td>
                  <td className={styles.tableCell}>{"No, per-user pricing increases costs."}</td>
                  <td className={styles.tableCell}>{"No, per-seat pricing for advanced features"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Integrated Enterprise Workflows"}</td>
                  <td className={styles.tableCell}>{"Yes, integrates with Sales, HR, and Compliance workflows"}</td>
                  <td className={styles.tableCell}>{"Limited, requires integrations"}</td>
                  <td className={styles.tableCell}>{"Yes, but within Microsoft ecosystem"}</td>
                  <td className={styles.tableCell}>{"No, not designed for enterprise workflows"}</td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={styles.tableFeature}>{"Post-Quantum Cryptography (PQC) Encryption"}</td>
                  <td className={styles.tableCell}>{"Yes, future-proof security"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                  <td className={styles.tableCell}>{"No"}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        id="cta"
        className={styles.section}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <div className={styles.ctaContainer}>
          <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
            {"Ready to Join Our Journey"}
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.ctaButtons}>
            <motion.div variants={fadeInUp}>
              <Button
                className={styles.ctaButton}
                onClick={() => (window.location.href = "https://cal.com/aapoon/15min")}
              >
                {"Schedule an Introduction"}
                <ArrowRight className={styles.arrowIcon} />
              </Button>
            </motion.div>
          </motion.div>
          <motion.p variants={fadeInUp} className={styles.ctaDescription}>
            {"Join us in revolutionizing secure communication technology."}
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        className={styles.footer}
        initial="hidden"
        animate={footerControls}
        variants={fadeInUp}
      >
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Image
              src="/images/abm/aapoon/logo.png"
              alt="Aapoon Logo"
              width={120}
              height={40}
            />
          </div>
          <p className={styles.footerText}>{"© " + new Date().getFullYear() + " Aapoon. All rights reserved."}</p>
          <div className={styles.footerLinks}>
            <Link href="#privacy" className={styles.footerLink}>
              {"Privacy Policy"}
            </Link>
            <Link href="#terms" className={styles.footerLink}>
              {"Terms of Service"}
            </Link>
            <Link href="#unsubscribe" className={styles.footerLink}>
              {"Unsubscribe"}
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}