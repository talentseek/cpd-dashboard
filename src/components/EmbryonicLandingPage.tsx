"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming this is styled separately or unstyled
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
  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const venturesRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const venturesControls = useAnimation();
  const challengesControls = useAnimation();
  const solutionControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const venturesInView = useInView(venturesRef, { once: false, amount: 0.3 });
  const challengesInView = useInView(challengesRef, { once: false, amount: 0.3 });
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (venturesInView) venturesControls.start("visible");
    if (challengesInView) challengesControls.start("visible");
    if (solutionInView) solutionControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    venturesInView,
    challengesInView,
    solutionInView,
    ctaInView,
    footerInView,
    navControls,
    heroControls,
    venturesControls,
    challengesControls,
    solutionControls,
    ctaControls,
    footerControls,
  ]);

  // Set CSS variable for solution step animation staggering
  useEffect(() => {
    const steps = document.querySelectorAll(`.${styles.solutionStep}`);
    steps.forEach((step, index) => {
      (step as HTMLElement).style.setProperty("--animation-order", index.toString());
    });
  }, []);

  // Animation variants (unchanged)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // Venture logos with captions (unchanged)
  const ventures = [
    { name: "batchday", caption: "Scaled to 10K users in 6 months" },
    { name: "Artisan", caption: "Raised $2M in seed funding" },
    { name: "Clyx", caption: "Launched MVP in 8 weeks" },
    { name: "Monc", caption: "Achieved 5K active users" },
    { name: "Opinion", caption: "Grew revenue by 300% in 1 year" },
  ];

  // Scroll to booking section function
  const scrollToBook = () => {
    const element = document.getElementById("book-a-call"); // Target element ID
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.warn("Element with ID 'book-a-call' not found for scrolling.");
      // Fallback or alternative behavior if needed
    }
  };


  return (
    // Use the main container class from the CSS module
    <div className={styles.container}>
      {/* Sticky Navigation */}
      <motion.nav
        ref={navRef}
        className={styles.nav}
        initial="hidden"
        animate={navControls}
        variants={fadeInUp}
      >
        <div className={styles.navContent}>
          <div className={styles.logo}>
            {/* Ensure logo path is correct */}
            <Image
              src="/images/abm/embryonic/logo.png"
              alt="Embryonic Studio Logo"
              width={120}
              height={40}
              priority // Prioritize loading the logo
            />
          </div>
          {/* Use the updated navCta style */}
          {/* Note: Using <button> directly as <Button> might add its own styles */}
          <button
            className={styles.navCta}
            onClick={scrollToBook} // Use smooth scroll function
          >
            Start Today
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          {/* Apply heroTitle style (now uses Creta) */}
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            <ReplaceText text="Hey {first_name}, Let's " replacements={replacements} />
            <span className={styles.underline}>De-Risk</span>
            <ReplaceText
              text=" and Build {company} with embryōnic"
              replacements={replacements}
            />
          </motion.h1>
          {/* Apply heroSubtitle style (uses Cactus Classical Serif) */}
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            <ReplaceText
              text="Hatch your concept in a fraction of the time with embryōnic—the Startup Studio that problem-centric founders rely on to rapidly de-risk, build, and grow remarkable ventures in weeks."
              replacements={replacements}
            />
          </motion.p>
          {/* Apply heroTagline style (uses Cactus Classical Serif) */}
          <motion.p variants={fadeInUp} className={styles.heroTagline}>
            We believe in turning{" "}
            <span className={styles.underline}>visionary ideas</span> into validated
            ventures with speed and precision.
          </motion.p>
          <motion.div variants={fadeInUp}>
            {/* Apply ctaButton style (now uses Creta) */}
            <button
              className={styles.ctaButton}
              onClick={scrollToBook} // Use smooth scroll function
            >
              Start Today
            </button>
          </motion.div>
        </div>

        {/* Ventures Carousel */}
        <motion.div
          ref={venturesRef}
          className={styles.venturesCarousel}
          initial="hidden"
          animate={venturesControls}
          variants={fadeInUp}
        >
           {/* Apply venturesTitle style (now uses Creta) */}
          <h2 className={styles.venturesTitle}>Ventures the Team Worked With</h2>
          <div className={styles.carouselTrack}>
            {[...ventures, ...ventures].map((venture, index) => (
              <div key={index} className={styles.carouselItem}>
                 {/* Ensure venture logo paths are correct and use .avif if available */}
                <Image
                  src={`/images/abm/embryonic/logo-${venture.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.avif`} // Prefer AVIF if available
                  alt={`${venture.name} logo`}
                  width={100} // Intrinsic width
                  height={50} // Intrinsic height
                  className={styles.ventureLogo}
                  loading="lazy" // Lazy load venture logos
                />
                 {/* Apply ventureCaption style (uses Cactus Classical Serif) */}
                <p className={styles.ventureCaption}>{venture.caption}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Challenges Section */}
      <motion.section
        ref={challengesRef}
        className={styles.challengesSection}
        initial="hidden"
        animate={challengesControls}
        variants={staggerChildren}
      >
        {/* Apply sectionTitle style (now uses Creta) */}
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText
            text="Challenges {company} Faces"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div className={styles.challengesGrid} variants={staggerChildren}>
          {/* Card 1 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}>
              <Briefcase className={styles.challengeIcon} />
            </div>
             {/* Apply challengeTitle style (uses Cactus Classical Serif - bold) */}
            <h3 className={styles.challengeTitle}>Lack of Product-Market Fit</h3>
             {/* Apply challengeText style (uses Cactus Classical Serif) */}
            <p className={styles.challengeText}>
              <ReplaceText
                text="You’ve raised funding, but {company} hasn’t nailed product-market fit yet. Skipping validation risks wasting time and resources."
                replacements={replacements}
              />
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}>
              <Search className={styles.challengeIcon} />
            </div>
            <h3 className={styles.challengeTitle}>Uncertain Development Path</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="Choosing between agencies or in-house hires for {company}’s MVP is daunting without clear validation."
                replacements={replacements}
              />
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconContainer}>
              <Users className={styles.challengeIcon} />
            </div>
            <h3 className={styles.challengeTitle}>Need for Proactive Partners</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="You need advisors ‘who get it’ to de-risk {company}’s journey without premature commitments."
                replacements={replacements}
              />
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        ref={solutionRef}
        className={styles.solutionSection}
        initial="hidden"
        animate={solutionControls}
        variants={staggerChildren}
      >
         {/* Apply sectionTitle style (now uses Creta) */}
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText
            text="How embryōnic Helps {company}"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div className={styles.solutionContent} variants={staggerChildren}>
          {/* Step 1 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
             {/* Apply solutionTitle style (now uses Creta) */}
            <h3 className={styles.solutionTitle}>
              Systematically <span className={styles.underline}>validate problems</span>
            </h3>
             {/* Apply solutionText style (uses Cactus Classical Serif) */}
            <p className={styles.solutionText}>
              Validate and get pre-product traction. embryōnic’s pragmatic system aims
              to de-risk and spot winning (and losing) opportunities, increasing the
              odds of success and saving Time.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            <h3 className={styles.solutionTitle}>
              Product + Marketing as <span className={styles.underline}>ONE team</span>
            </h3>
            <p className={styles.solutionText}>
              No need to hire on day one. With the Startup-as-a-Service Model you get a
              turnkey Squad and a battle-tested team with C-level operators in Product,
              Tech, and Marketing.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            <h3 className={styles.solutionTitle}>
              Predictable <span className={styles.underline}>burn rate</span>
            </h3>
            <p className={styles.solutionText}>
              Keep it flexible. With flexible subscriptions to fit your burn rate, you
              can harness Lean execution and progressive investment deployment by
              scaling up or down as you get traction.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        {/* Apply ctaTitle style (now uses Creta) */}
        <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
          <ReplaceText
            text="{first_name}, Ready to Build {company} Without the Risks?"
            replacements={replacements}
          />
        </motion.h2>
         {/* Apply ctaSubtitle style (uses Cactus Classical Serif) */}
        <motion.p variants={fadeInUp} className={styles.ctaSubtitle}>
          Schedule a 45-minute call to see how embryōnic can accelerate your
          startup’s journey.
        </motion.p>
        <motion.div variants={fadeInUp}>
          {/* Apply ctaButtonLarge style (now uses Creta) */}
          <button
            className={styles.ctaButtonLarge}
            onClick={scrollToBook} // Use smooth scroll function
          >
            Book a Call
          </button>
        </motion.div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        ref={footerRef}
        className={styles.footer}
        initial="hidden"
        animate={footerControls}
        variants={fadeInUp}
      >
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
             {/* Apply footerLink style (uses Cactus Classical Serif) */}
            <Link href="/terms" className={styles.footerLink}>
              Terms
            </Link>
            <Link href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
          </div>
           {/* Apply footerCopyright style (uses Cactus Classical Serif) */}
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Embryonic Studio. All rights reserved.
          </div>
        </div>
      </motion.footer>

       {/* Add a target element for the booking link, if not already present elsewhere */}
       {/* This could be an empty div or the container of your booking widget */}
       <div id="book-a-call" style={{ scrollMarginTop: '100px' }}></div> {/* Adjust scrollMarginTop as needed */}

    </div>
  );
}