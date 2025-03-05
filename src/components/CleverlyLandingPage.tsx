// src/components/CleverlyLandingPage.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/CleverlyLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function CleverlyLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs for animation triggers
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const painPointsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const headerControls = useAnimation();
  const heroControls = useAnimation();
  const painPointsControls = useAnimation();
  const solutionsControls = useAnimation();
  const testimonialControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const painPointsInView = useInView(painPointsRef, { once: false, amount: 0.3 });
  const solutionsInView = useInView(solutionsRef, { once: false, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (headerInView) headerControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (painPointsInView) painPointsControls.start("visible");
    if (solutionsInView) solutionsControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    headerInView,
    heroInView,
    painPointsInView,
    solutionsInView,
    testimonialInView,
    ctaInView,
    footerInView,
    headerControls,
    heroControls,
    painPointsControls,
    solutionsControls,
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

  return (
    <div className={styles.container}>
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Animated background */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      {/* Header */}
      <motion.header
        ref={headerRef}
        className={styles.header}
        initial="hidden"
        animate={headerControls}
        variants={fadeInUp}
      >
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/cleverly/logo.svg"
              alt="Cleverly Logo"
              width={120}
              height={40}
            />
          </div>
          <Button
            className={styles.ctaButton}
            onClick={() => window.location.href = "mailto:contact@cleverly.works"}
          >
            Contact Us
          </Button>
        </div>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className={styles.headerSpacer}></div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        id="hero"
        className={styles.hero}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
              <ReplaceText
                text="{first_name}, Don’t Let Chaos Hold {company} Back!"
                replacements={replacements}
              />
            </motion.h1>
            <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
              Cleverly slashes costs, saves time, and delivers powerful insights with an all-in-one platform built for your facilities workflows.
            </motion.p>
            <motion.div variants={fadeInUp} className={styles.heroBadge}>
              <span className={styles.badgeIcon}>🏆</span> Named Startup of the Month by Vestbee (Jan 2025)
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Button
                className={styles.heroButton}
                onClick={() => window.location.href = "mailto:contact@cleverly.works"}
              >
                Contact Us Now
              </Button>
            </motion.div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImage}>
              <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                  <div className={styles.dashboardMockup}>
                    <div className={styles.mockupHeader}>
                      <div className={styles.mockupDot}></div>
                      <div className={styles.mockupDot}></div>
                      <div className={styles.mockupDot}></div>
                    </div>
                    <div className={styles.mockupContent}>
                      <div className={styles.mockupSidebar}>
                        <div className={styles.mockupMenuItem}></div>
                        <div className={styles.mockupMenuItem}></div>
                        <div className={styles.mockupMenuItem}></div>
                        <div className={styles.mockupMenuItem}></div>
                      </div>
                      <div className={styles.mockupMain}>
                        <div className={styles.mockupCard}></div>
                        <div className={styles.mockupCard}></div>
                        <div className={styles.mockupGrid}>
                          <div className={styles.mockupGridItem}></div>
                          <div className={styles.mockupGridItem}></div>
                          <div className={styles.mockupGridItem}></div>
                          <div className={styles.mockupGridItem}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          Struggling with These Rental Management Challenges?
        </motion.h2>
        <motion.div variants={staggerChildren} className={styles.painPointsGrid}>
          <motion.div className={styles.painPointCard} variants={fadeInUp}>
            <div className={styles.painPointIcon}>⏱️</div>
            <h3 className={styles.painPointTitle}>Manual Operations</h3>
            <p className={styles.painPointText}>
              Overwhelmed by time-consuming manual operations at <ReplaceText text="{company}" replacements={replacements} />?
            </p>
          </motion.div>
          <motion.div className={styles.painPointCard} variants={fadeInUp}>
            <div className={styles.painPointIcon}>💸</div>
            <h3 className={styles.painPointTitle}>Late Payments</h3>
            <p className={styles.painPointText}>Chasing late payments and losing revenue every month?</p>
          </motion.div>
          <motion.div className={styles.painPointCard} variants={fadeInUp}>
            <div className={styles.painPointIcon}>🔄</div>
            <h3 className={styles.painPointTitle}>Disorganized Communication</h3>
            <p className={styles.painPointText}>Struggling with disorganized tenant communications?</p>
          </motion.div>
          <motion.div className={styles.painPointCard} variants={fadeInUp}>
            <div className={styles.painPointIcon}>📈</div>
            <h3 className={styles.painPointTitle}>Scaling Issues</h3>
            <p className={styles.painPointText}>Unable to scale your business without adding complexity?</p>
          </motion.div>
        </motion.div>
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
        <div className={styles.solutionsContent}>
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            <ReplaceText
              text="Cleverly Transforms {company}’s Operations"
              replacements={replacements}
            />
          </motion.h2>
          <motion.div variants={staggerChildren} className={styles.solutionsCards}>
            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionNumber}>01</div>
              <h3 className={styles.solutionTitle}>Ease of Use</h3>
              <p className={styles.solutionText}>
                An intuitive platform to manage everything in one place.
              </p>
            </motion.div>
            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionNumber}>02</div>
              <h3 className={styles.solutionTitle}>Done-for-You Onboarding</h3>
              <p className={styles.solutionText}>
                We handle setup—your data is imported for you.
              </p>
            </motion.div>
            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionNumber}>03</div>
              <h3 className={styles.solutionTitle}>World-Class Support</h3>
              <p className={styles.solutionText}>
                Tailored support to meet <ReplaceText text="{company}" replacements={replacements} />{"’"}s needs.
              </p>
            </motion.div>
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
        <div className={styles.testimonialContent}>
          <motion.div variants={fadeInUp} className={styles.testimonialQuoteIcon}>
            {"\""}
          </motion.div>
          <motion.blockquote variants={fadeInUp} className={styles.testimonialQuote}>
            With customisable job templates and checklists for our cleaners… The data and analytics are really appreciated by our clients.
          </motion.blockquote>
          <motion.div variants={fadeInUp} className={styles.testimonialAuthor}>
            <div className={styles.testimonialAvatar}>OK</div>
            <div className={styles.testimonialInfo}>
              <p className={styles.testimonialName}>Chuong, Founder</p>
              <p className={styles.testimonialRole}>Hammock Cleaning</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        id="cta"
        className={styles.cta}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <div className={styles.ctaContent}>
          <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
            <ReplaceText
              text="{first_name}, Ready to Take Control at {company}?"
              replacements={replacements}
            />
          </motion.h2>
          <motion.p variants={fadeInUp} className={styles.ctaText}>
            Find out how Cleverly can supercharge your facilities and real estate workflows. Contact us today!
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.ctaButtons}>
            <Button
              className={styles.primaryButton}
              onClick={() => window.location.href = "mailto:contact@cleverly.works"}
            >
              Contact Us Now
            </Button>
            <Button
              className={styles.secondaryButton}
              onClick={() => window.location.href = "https://www.cleverly.works"}
            >
              Visit Our Website
            </Button>
          </motion.div>
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
              src="/images/abm/cleverly/logo.svg"
              alt="Cleverly Logo"
              width={120}
              height={40}
            />
          </div>
          <p className={styles.footerCopyright}>© {new Date().getFullYear()} Cleverly. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="https://www.cleverly.works/privacy-policy/" className={styles.footerLink}>Privacy</Link>
            <Link href="#unsubscribe" className={styles.footerLink}>Unsubscribe</Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}