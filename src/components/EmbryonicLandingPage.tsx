"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Search, Users } from "lucide-react";
// Assuming Button component is not needed if using custom SVG buttons
// import { Button } from "@/components/ui/button";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
// Import the UPDATED CSS Module
import styles from "@/components/styles/EmbryonicLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function EmbryonicLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs and animation hooks (unchanged)
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const venturesRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const navControls = useAnimation();
  const heroControls = useAnimation();
  const venturesControls = useAnimation();
  const challengesControls = useAnimation();
  const solutionControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const venturesInView = useInView(venturesRef, { once: false, amount: 0.3 });
  const challengesInView = useInView(challengesRef, { once: false, amount: 0.3 });
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations (unchanged)
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (venturesInView) venturesControls.start("visible");
    if (challengesInView) challengesControls.start("visible");
    if (solutionInView) solutionControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView, heroInView, venturesInView, challengesInView, solutionInView,
    ctaInView, footerInView, navControls, heroControls, venturesControls,
    challengesControls, solutionControls, ctaControls, footerControls,
  ]);

  // Set CSS variable for solution step animation staggering (unchanged)
  useEffect(() => {
    const steps = document.querySelectorAll(`.${styles.solutionStep}`);
    steps.forEach((step, index) => {
      (step as HTMLElement).style.setProperty("--animation-order", index.toString());
    });
  }, []);

  // Animation variants (unchanged)
  const fadeInUp = { /* ... */ };
  const staggerChildren = { /* ... */ };

  // Venture logos data (captions removed)
  const ventures = [
    { name: "batchday" },
    { name: "Artisan" },
    { name: "Clyx" },
    { name: "Monc" },
    { name: "Opinion" },
  ];

  // Scroll to booking section function (unchanged)
  const scrollToBook = () => { /* ... */ };

  return (
    <div className={styles.container}>
      {/* Sticky Navigation */}
      <motion.nav /* ... */ >
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/embryonic/vector_logo.svg" // Keep SVG logo
              alt="Embryonic Studio Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          {/* Use standard button with updated text and SVG styles */}
          <button
            className={styles.navCta} // Applies SVG background and Bespoke Serif font
            onClick={scrollToBook}
          >
            Book a Call {/* UPDATED TEXT */}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section /* ... */ >
        <div className={styles.heroContent}>
          {/* Hero Title - Size updated in CSS */}
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            <ReplaceText text="Hey {first_name}, Let's " replacements={replacements} />
            {/* UPDATED: Wrap text in span with SVG underline class */}
            <span className={styles.svgUnderline}>De-Risk</span>
            <ReplaceText
              text=" and Build {company} with embryōnic"
              replacements={replacements}
            />
          </motion.h1>
          {/* Hero Subtitle - Color updated in CSS */}
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            {/* ... text ... */}
          </motion.p>
          {/* Hero Tagline - Apply SVG underline */}
          <motion.p variants={fadeInUp} className={styles.heroTagline}>
            We believe in turning{" "}
            <span className={styles.svgUnderline}>visionary ideas</span> into validated
            ventures with speed and precision.
          </motion.p>
          <motion.div variants={fadeInUp}>
             {/* Apply ctaButton style (SVG background, Bespoke Serif) */}
            <button
              className={styles.ctaButton}
              onClick={scrollToBook}
            >
              Start Today
            </button>
          </motion.div>
        </div>

        {/* Ventures Carousel - Greyscale logos, captions removed */}
        <motion.div /* ... */ >
           {/* Ventures Title - Color updated in CSS */}
          <h2 className={styles.venturesTitle}>Ventures the Team Worked With</h2>
          <div className={styles.carouselTrack}>
            {[...ventures, ...ventures].map((venture, index) => (
              <div key={index} className={styles.carouselItem}>
                <Image
                  src={`/images/abm/embryonic/logo-${venture.name.toLowerCase().replace(/\s+/g, "-")}.avif`}
                  alt={`${venture.name} logo`}
                  width={100}
                  height={50}
                  className={styles.ventureLogo} // Applies greyscale filter via CSS
                  loading="lazy"
                />
                {/* REMOVED Caption Paragraph */}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Challenges Section */}
      <motion.section /* ... */ >
         {/* Section Title - Uses Creta */}
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText text="Common Challenges for {company}" replacements={replacements} />
        </motion.h2>
        <motion.div className={styles.challengesGrid} variants={staggerChildren}>
          {/* Card 1 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}><Briefcase className={styles.challengeIcon} /></div>
             {/* Challenge Title - Color updated in CSS */}
            <h3 className={styles.challengeTitle}>Lack of Product-Market Fit</h3>
             {/* Challenge Text */}
            <p className={styles.challengeText}> <ReplaceText text="Without proper validation, {company} might invest resources in products that don't truly address market needs." replacements={replacements} /> </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}><Search className={styles.challengeIcon} /></div>
            <h3 className={styles.challengeTitle}>Uncertain Development Path</h3>
            <p className={styles.challengeText}> <ReplaceText text="Building technology without a clear roadmap can lead to scope creep and budget overruns for {company}." replacements={replacements} /> </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}><Users className={styles.challengeIcon} /></div>
            <h3 className={styles.challengeTitle}>Need for Proactive Partners</h3>
            <p className={styles.challengeText}> <ReplaceText text="{company} needs partners who proactively identify risks and opportunities, not just execute tasks." replacements={replacements} /> </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Solution Section */}
      <motion.section /* ... */ >
         {/* Section Title - Uses Creta */}
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText text="How We Help {company} Succeed" replacements={replacements} />
        </motion.h2>
        <motion.div className={styles.solutionContent} variants={staggerChildren}>
          {/* Step 1 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            {/* Apply SVG underline within spans */}
            <h3 className={styles.solutionTitle}>
              Systematically <span className={styles.svgUnderline}>validate problems</span>
            </h3>
            <p className={styles.solutionText}> {/* ... */} </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            <h3 className={styles.solutionTitle}>
              Product + Marketing as <span className={styles.svgUnderline}>ONE team</span>
            </h3>
            <p className={styles.solutionText}> {/* ... */} </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            <h3 className={styles.solutionTitle}>
              Predictable <span className={styles.svgUnderline}>burn rate</span>
            </h3>
            <p className={styles.solutionText}> {/* ... */} </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section /* ... */ >
         {/* CTA Title - Size updated in CSS */}
        <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
          <ReplaceText text="Ready to Accelerate {company}'s Growth?" replacements={replacements} />
        </motion.h2>
        <motion.p variants={fadeInUp} className={styles.ctaSubtitle}> {/* ... */} </motion.p>
        <motion.div variants={fadeInUp}>
           {/* Apply ctaButtonLarge style (SVG background, Bespoke Serif) */}
          <button
            className={styles.ctaButtonLarge}
            onClick={scrollToBook}
          >
            Book a Call
          </button>
        </motion.div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer /* ... */ >
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link href="/terms" className={styles.footerLink}> Terms </Link>
            <Link href="/privacy" className={styles.footerLink}> Privacy Policy </Link>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Embryonic Studio. All rights reserved.
          </div>
        </div>
      </motion.footer>

       {/* Scroll target (unchanged) */}
       <div id="book-a-call" style={{ scrollMarginTop: '100px' }}></div>
    </div>
  );
}