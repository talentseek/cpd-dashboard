// src/components/QASolveLandingPage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Clock,
  History,
  AlertCircle,
  Users,
  LinkIcon,
  Timer,
  Shield,
  User,
  Gauge,
  CheckCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingNav from "@/components/FloatingNav";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/QASolveLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function QASolveLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Refs for animation triggers
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const withoutUsRef = useRef<HTMLDivElement>(null);
  const withUsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const headerControls = useAnimation();
  const heroControls = useAnimation();
  const withoutUsControls = useAnimation();
  const withUsControls = useAnimation();
  const featuresControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const withoutUsInView = useInView(withoutUsRef, { once: false, amount: 0.3 });
  const withUsInView = useInView(withUsRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (headerInView) headerControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (withoutUsInView) withoutUsControls.start("visible");
    if (withUsInView) withUsControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (testimonialsInView) testimonialsControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    headerInView,
    heroInView,
    withoutUsInView,
    withUsInView,
    featuresInView,
    testimonialsInView,
    ctaInView,
    footerInView,
    headerControls,
    heroControls,
    withoutUsControls,
    withUsControls,
    featuresControls,
    testimonialsControls,
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

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      quote: "QASolve AI agents test our app without needing the codebase. It\'s easy to adapt!",
      author: "Joy Dasgupta, CEO",
    },
    {
      quote: "QASolve generated 1000+ test cases in weeks—a critical tool for every release.",
      author: "Sahil Gore, Head of Engineering",
    },
    {
      quote: "QASolve validates our SaaS apps on multiple devices, reducing QA time and cost.",
      author: "Deepak Verma, CEO",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Sticky Navigation */}
      <motion.nav
        ref={headerRef}
        className={styles.stickyNav}
        initial="hidden"
        animate={headerControls}
        variants={fadeInUp}
      >
        <div className={styles.navContent}>
          <Image
            src="/images/abm/qasolve/Logo.svg"
            alt="QASolve Logo"
            width={120}
            height={40}
            className={styles.logo}
          />
          <Button
            className={styles.navCta}
            onClick={() => (window.location.href = "https://cal.com/qasolve/15min")}
          >
            Request a Demo
          </Button>
        </div>
      </motion.nav>

      <div className={styles.navSpacer}></div>

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
          <motion.h1 variants={fadeInUp}>
            <ReplaceText
              text="Hey {first_name}, Accelerate {company}'s Product Development with QASolve"
              replacements={replacements}
            />
          </motion.h1>
          <motion.p variants={fadeInUp}>
            <ReplaceText
              text="QASolve's AI-driven solutions streamline testing, reduce errors, and speed up product delivery—empowering {company} to achieve flawless quality in just 1-2 weeks."
              replacements={replacements}
            />
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              className={styles.ctaButton}
              onClick={() => (window.location.href = "https://cal.com/qasolve/15min")}
            >
              Request a Demo <ArrowRight size={16} />
            </Button>
          </motion.div>
          <motion.div variants={fadeInUp} className={styles.heroAnimation}>
            <Image
              src="/images/abm/qasolve/hero.jpeg"
              alt="QASolve Knowledge Graph Visualization"
              width={600}
              height={400}
              className={styles.knowledgeGraph}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* With Us / Without Us Section */}
      <motion.section
        ref={withoutUsRef}
        id="comparison"
        className={styles.comparison}
        initial="hidden"
        animate={withoutUsControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="Testing Challenges Solved for {company}"
            replacements={replacements}
          />
        </motion.h2>
        <div className={styles.comparisonColumns}>
          <div className={styles.withoutUs}>
            <motion.h3 variants={fadeInUp}>Without Us</motion.h3>
            <motion.div variants={staggerChildren}>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <Clock className={styles.icon} />
                </div>
                <p>Evaluation takes months, requiring coding effort.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <History className={styles.icon} />
                </div>
                <p>80% test coverage in 3-4 months.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <AlertCircle className={styles.icon} />
                </div>
                <p>Manual maintenance leads to broken tests.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <Users className={styles.icon} />
                </div>
                <p>15%-25% team effort for regression testing.</p>
              </motion.div>
            </motion.div>
          </div>

          <div className={styles.withUs} ref={withUsRef}>
            <motion.h3 variants={fadeInUp}>With Us</motion.h3>
            <motion.div variants={staggerChildren}>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <LinkIcon className={styles.icon} />
                </div>
                <p>High-coverage tests from just a URL in 30 days.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <Timer className={styles.icon} />
                </div>
                <p>80%+ test coverage in 3-4 days.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <Shield className={styles.icon} />
                </div>
                <p>Self-healing tests adapt to app changes.</p>
              </motion.div>
              <motion.div className={styles.comparisonCard} variants={fadeInUp}>
                <div className={styles.iconWrapper}>
                  <User className={styles.icon} />
                </div>
                <p>Minimal effort—QASolve handles it all.</p>
              </motion.div>
            </motion.div>
          </div>
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
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="Why QASolve is Right for {company}"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div variants={staggerChildren} className={styles.featureGrid}>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <Gauge className={styles.featureIcon} />
            </div>
            <h3>Accelerate Sprint Cycles</h3>
            <p>
              <ReplaceText
                text="QASolve accelerates test creation, eliminates broken tests, and delivers faster, more reliable results for {company}."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <CheckCircle className={styles.featureIcon} />
            </div>
            <h3>Enhance Test Accuracy</h3>
            <p>
              <ReplaceText
                text="Minimize human error with intelligent automation that resolves issues before they impact {company}'s release."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <Shield className={styles.featureIcon} />
            </div>
            <h3>Increase Test Coverage</h3>
            <p>
              <ReplaceText
                text="Achieve 10x higher coverage than traditional QA, minimizing breaking changes for {company}."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <DollarSign className={styles.featureIcon} />
            </div>
            <h3>Cost-Effective Trial</h3>
            <p>Try QASolve with a 30-day zero-risk trial—see the impact with zero effort.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        id="testimonials"
        className={styles.testimonials}
        initial="hidden"
        animate={testimonialsControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>What Our Clients Say</motion.h2>
        <motion.div variants={staggerChildren} className={styles.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${styles.testimonialSlide} ${index === activeTestimonial ? styles.activeTestimonial : ""}`}
            >
              <motion.p variants={fadeInUp} className={styles.quote}>
                {testimonial.quote}
              </motion.p>
              <motion.p variants={fadeInUp} className={styles.author}>
                — {testimonial.author}
              </motion.p>
            </div>
          ))}
          <motion.div variants={fadeInUp} className={styles.carouselDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeTestimonial ? styles.activeDot : ""}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        id="cta"
        className={styles.cta}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="{first_name}, Ready to Transform {company}'s QA Process?"
            replacements={replacements}
          />
        </motion.h2>
        <motion.p variants={fadeInUp}>
          Start with a 30-day zero-risk trial and see how QASolve delivers results.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button
            className={styles.ctaButton}
            onClick={() => (window.location.href = "https://cal.com/qasolve/15min")}
          >
            Request a Demo <ArrowRight size={16} />
          </Button>
        </motion.div>
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
              src="/images/abm/qasolve/Logo.svg"
              alt="QASolve Logo"
              width={120}
              height={40}
            />
          </div>
          <p className={styles.footerText}>© {new Date().getFullYear()} QASolve. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="#privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link href="#terms" className={styles.footerLink}>
              Terms of Service
            </Link>
            <Link href="#unsubscribe" className={styles.footerLink}>
              Unsubscribe
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}