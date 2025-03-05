// src/components/CleverlyLandingPage.tsx
"use client";

// Disable react/no-unescaped-entities rule for the entire file
/* eslint-disable react/no-unescaped-entities */

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Smile, UserCheck, Headphones, Zap, BarChart2, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingNav from "@/components/FloatingNav";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/CleverlyLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

// Helper function to perform replacements and return a single string
const replaceTextString = (text: string, replacements: CustomReplacements): string => {
  let result = text;
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, "g");
    // Convert value to string to ensure compatibility with String.replace
    result = result.replace(regex, String(value) || "");
  });
  return result;
};

export default function CleverlyLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const painPointsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const painPointsControls = useAnimation();
  const solutionsControls = useAnimation();
  const featuresControls = useAnimation();
  const testimonialControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const painPointsInView = useInView(painPointsRef, { once: false, amount: 0.3 });
  const solutionsInView = useInView(solutionsRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (painPointsInView) painPointsControls.start("visible");
    if (solutionsInView) solutionsControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    painPointsInView,
    solutionsInView,
    featuresInView,
    testimonialInView,
    ctaInView,
    footerInView,
    navControls,
    heroControls,
    painPointsControls,
    solutionsControls,
    featuresControls,
    testimonialControls,
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

  // Compute headline and CTA title as single strings using template literals
  const heroHeadlineText = replaceTextString(`{first_name}, Don't Let Chaos Hold {company} Back!`, replacements);
  const ctaTitleText = replaceTextString(`{first_name}, Ready to Take Control at {company}?`, replacements);

  return (
    <div className={styles.container}>
      <FloatingNav />

      {/* Fixed Navigation */}
      <motion.nav
        ref={navRef}
        className={styles.nav}
        initial="hidden"
        animate={navControls}
        variants={fadeInUp}
      >
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/cleverly/logo.webp"
              alt="Cleverly Logo"
              width={120}
              height={40}
            />
          </div>
          <Button
            className={styles.navCta}
            onClick={() => window.location.href = "https://calendly.com/cleverlyworks/demo"}
          >
            Book a Demo
          </Button>
        </div>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className={styles.navSpacer}></div>

      {/* Hero Section - Line 184-186 */}
      <motion.section
        ref={heroRef}
        id="hero"
        className={styles.hero}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroBackground}></div>

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
              {heroHeadlineText} {/* Line 186 */}
            </motion.h1>

            <motion.p variants={fadeInUp} className={styles.heroText}>
              Cleverly slashes costs, saves time, and delivers powerful insights with an all-in-one platform built for your facilities workflows.
            </motion.p>

            <motion.div variants={fadeInUp} className={styles.heroCtaWrapper}>
              <Button
                className={styles.heroCta}
                onClick={() => window.location.href = "https://calendly.com/cleverlyworks/demo"}
              >
                Book a Demo Now <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>

            {/* Quote Bubble */}
            <motion.div variants={fadeInUp} className={styles.quoteBubble}>
              <div className={styles.quoteImage}>
                <Image
                  src="/images/abm/cleverly/testimonial.jpg"
                  alt="George Boldero"
                  width={100}
                  height={100}
                  className={styles.quoteImageInner}
                />
              </div>
              <p className={styles.quoteText}>
                "Cleverly provides a powerful platform for work order management and compliance. The system is really flexible!"
              </p>
              <p className={styles.quoteAuthor}>— George Boldero, Operations Manager</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pain Points Section */}
      <motion.section
        ref={painPointsRef}
        id="pain-points"
        className={styles.painPoints}
        initial="hidden"
        animate={painPointsControls}
        variants={staggerChildren}
      >
        <div className={styles.painPointsInner}>
          <div className={styles.painPointsContent}>
            <motion.h2 variants={fadeInUp} className={styles.painPointsTitle}>
              Struggling with These Challenges?
            </motion.h2>

            <motion.ul variants={staggerChildren} className={styles.painPointsList}>
              <motion.li variants={fadeInUp}>
                Overwhelmed by task volume across <ReplaceText text="{company}" replacements={replacements} />{"’"}s sites?
              </motion.li>
              <motion.li variants={fadeInUp}>
                Constantly chasing updates from suppliers and teams?
              </motion.li>
              <motion.li variants={fadeInUp}>
                Information scattered across multiple systems?
              </motion.li>
              <motion.li variants={fadeInUp}>
                Struggling to access actionable reports?
              </motion.li>
            </motion.ul>

            <motion.div variants={fadeInUp}>
              <Button
                className={styles.painPointsCta}
                onClick={() => {
                  const element = document.getElementById("solutions");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See How Cleverly Solves This <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solutions Section */}
      <motion.section
        ref={solutionsRef}
        id="solutions"
        className={styles.solutions}
        initial="hidden"
        animate={solutionsControls}
        variants={staggerChildren}
      >
        <div className={styles.solutionsInner}>
          <motion.h2 variants={fadeInUp} className={styles.solutionsTitle}>
            <ReplaceText
              text="Cleverly Transforms {company}’s Operations"
              replacements={replacements}
            />
          </motion.h2>

          <motion.div className={styles.solutionsGrid} variants={staggerChildren}>
            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionIcon}>
                <Smile className={styles.icon} />
              </div>
              <h3 className={styles.solutionTitle}>Ease of Use</h3>
              <p className={styles.solutionText}>
                An intuitive platform to manage everything in one place.
              </p>
            </motion.div>

            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionIcon}>
                <UserCheck className={styles.icon} />
              </div>
              <h3 className={styles.solutionTitle}>Done-for-You Onboarding</h3>
              <p className={styles.solutionText}>
                We handle setup—your data is imported for you.
              </p>
            </motion.div>

            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionIcon}>
                <Headphones className={styles.icon} />
              </div>
              <h3 className={styles.solutionTitle}>World-Class Support</h3>
              <p className={styles.solutionText}>
                Tailored support to meet <ReplaceText text="{company}" replacements={replacements} />{"’"}s needs.
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              className={styles.solutionsCta}
              onClick={() => window.location.href = "https://calendly.com/cleverlyworks/demo"}
            >
              Book a Demo to Transform Your Workflows <ArrowRight className={styles.ctaIcon} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        id="features"
        className={styles.features}
        initial="hidden"
        animate={featuresControls}
        variants={staggerChildren}
      >
        <div className={styles.featuresInner}>
          <motion.h2 variants={fadeInUp} className={styles.featuresTitle}>
            All-in-One Facilities Management Platform
          </motion.h2>

          <motion.ul variants={staggerChildren} className={styles.featuresList}>
            <motion.li variants={fadeInUp} className={styles.featureItem}>
              <Zap className={styles.featureIcon} />
              Workflow Automation & Task Management
            </motion.li>
            <motion.li variants={fadeInUp} className={styles.featureItem}>
              <BarChart2 className={styles.featureIcon} />
              Custom Reports & Dashboards
            </motion.li>
            <motion.li variants={fadeInUp} className={styles.featureItem}>
              <Smartphone className={styles.featureIcon} />
              Mobile App for Planned & Reactive Work
            </motion.li>
          </motion.ul>

          <motion.div variants={fadeInUp}>
            <Button
              className={styles.featuresCta}
              onClick={() => window.location.href = "https://www.cleverly.works"}
            >
              Explore All Features <ArrowRight className={styles.ctaIcon} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        ref={testimonialRef}
        id="testimonial"
        className={styles.testimonial}
        initial="hidden"
        animate={testimonialControls}
        variants={staggerChildren}
      >
        <div className={styles.testimonialInner}>
          <div className={styles.testimonialContent}>
            <motion.blockquote variants={fadeInUp} className={styles.testimonialQuote}>
              "With customisable job templates and checklists for our cleaners… The data and analytics are really appreciated by our clients."
            </motion.blockquote>

            <motion.p variants={fadeInUp} className={styles.testimonialAuthor}>
              — Chuong, Founder, Hammock Cleaning
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Line 349-351 */}
      <motion.section
        ref={ctaRef}
        id="cta"
        className={styles.cta}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <div className={styles.ctaInner}>
          <div className={styles.ctaContent}>
            <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
              {ctaTitleText} {/* Line 351 */}
            </motion.h2>

            <motion.p variants={fadeInUp} className={styles.ctaText}>
              Find out how Cleverly can supercharge your facilities and real estate workflows. Book a demo today!
            </motion.p>

            <motion.div variants={fadeInUp} className={styles.ctaButtons}>
              <Button
                className={styles.ctaPrimary}
                onClick={() => window.location.href = "https://calendly.com/cleverlyworks/demo"}
              >
                Book a Demo Now <ArrowRight className={styles.ctaIcon} />
              </Button>
              <Button
                className={styles.ctaSecondary}
                onClick={() => window.location.href = "https://www.cleverly.works"}
              >
                Visit Our Website <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        ref={footerRef}
        className={styles.footer}
        initial="hidden"
        animate={footerControls}
        variants={fadeInUp}
      >
        <div className={styles.footerInner}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Image
                src="/images/abm/cleverly/logo.svg"
                alt="Cleverly Logo"
                width={120}
                height={40}
              />
            </div>
            <div className={styles.footerLinks}>
              <Link href="https://www.cleverly.works/privacy-policy/" className={styles.footerLink}>Privacy</Link>
              <Link href="#unsubscribe" className={styles.footerLink}>Unsubscribe</Link>
            </div>
            <div className={styles.footerCopyright}>
              © {new Date().getFullYear()} Cleverly. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}