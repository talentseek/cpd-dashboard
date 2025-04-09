"use client";

// Imports remain the same
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Search, Users } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Button component likely not needed now
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/EmbryonicLandingPage.module.css"; // Using updated styles

// defaultReplacements remain the same
const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

// Component definition remains the same
export default function EmbryonicLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs remain the same
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const venturesRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls remain the same
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const venturesControls = useAnimation();
  const challengesControls = useAnimation();
  const solutionControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks remain the same
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const venturesInView = useInView(venturesRef, { once: false, amount: 0.3 });
  const challengesInView = useInView(challengesRef, { once: false, amount: 0.3 });
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations effect remains the same
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

  // CSS variable staggering effect remains the same
  useEffect(() => {
    const steps = document.querySelectorAll(`.${styles.solutionStep}`);
    steps.forEach((step, index) => {
      (step as HTMLElement).style.setProperty("--animation-order", index.toString());
    });
  }, []);

  // Animation variants remain the same
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // UPDATED: Venture logos data (captions removed)
  const ventures = [
    { name: "batchday" },
    { name: "Artisan" },
    { name: "Clyx" },
    { name: "Monc" },
    { name: "Opinion" },
  ];

  // Scroll function remains the same
  const scrollToBook = () => {
    const element = document.getElementById("book-a-call");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.warn("Element with ID 'book-a-call' not found for scrolling.");
    }
  };


  return (
    // Container div remains the same
    <div className={styles.container}>
      {/* Sticky Navigation - Structure remains the same */}
      <motion.nav
        ref={navRef}
        className={styles.nav} // Uses original nav style for stickiness
        initial="hidden"
        animate={navControls}
        variants={fadeInUp}
      >
        <div className={styles.navContent}>
          <div className={styles.logo}>
            {/* Logo SVG path remains the same */}
            <Image
              src="/images/abm/embryonic/vector_logo.svg"
              alt="Embryonic Studio Logo"
              width={120}
              height={40}
              priority
            />
          </div>
          {/* UPDATED: Navigation button text and styling */}
          <button
            className={styles.navCta} // Applies new SVG background and font styles
            onClick={scrollToBook}
          >
            Book a Call {/* UPDATED TEXT */}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section - Structure remains the same */}
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          {/* Hero Title uses new size from CSS */}
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            <ReplaceText text="Hey {first_name}, Let's " replacements={replacements} />
             {/* UPDATED: Apply SVG underline via span */}
            <span className={styles.svgUnderline}>De-Risk</span>
            <ReplaceText
              text=" and Build {company} with embryōnic"
              replacements={replacements}
            />
          </motion.h1>
          {/* Hero Subtitle uses new color from CSS */}
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            <ReplaceText
              text="Hatch your concept in a fraction of the time with embryōnic—the Startup Studio that problem-centric founders rely on to rapidly de-risk, build, and grow remarkable ventures in weeks."
              replacements={replacements}
            />
          </motion.p>
           {/* Hero Tagline uses new SVG underline via span */}
          <motion.p variants={fadeInUp} className={styles.heroTagline}>
            We believe in turning{" "}
            <span className={styles.svgUnderline}>visionary ideas</span> into validated
            ventures with speed and precision.
          </motion.p>
          <motion.div variants={fadeInUp}>
            {/* UPDATED: Hero button styling */}
            <button
              className={styles.ctaButton} // Applies new SVG background and font styles
              onClick={scrollToBook}
            >
              Start Today {/* Original Text - Client didn't ask to change this one */}
            </button>
          </motion.div>
        </div>

        {/* Ventures Carousel - Structure remains the same */}
        <motion.div
          ref={venturesRef}
          className={styles.venturesCarousel}
          initial="hidden"
          animate={venturesControls}
          variants={fadeInUp}
        >
           {/* Ventures Title uses new color from CSS */}
          <h2 className={styles.venturesTitle}>Ventures the Team Worked With</h2>
          <div className={styles.carouselTrack}>
            {/* UPDATED: Map over ventures, captions removed */}
            {[...ventures, ...ventures].map((venture, index) => (
              <div key={index} className={styles.carouselItem}>
                <Image
                  src={`/images/abm/embryonic/logo-${venture.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.avif`} // Path remains the same
                  alt={`${venture.name} logo`}
                  width={100}
                  height={50}
                  className={styles.ventureLogo} // Applies greyscale via CSS
                  loading="lazy"
                />
                {/* REMOVED Caption <p> tag */}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Challenges Section - Structure remains the same */}
      <motion.section
        ref={challengesRef}
        className={styles.challengesSection}
        initial="hidden"
        animate={challengesControls}
        variants={staggerChildren}
      >
         {/* Section Title uses Creta font */}
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
            {/* Challenge Title uses new color from CSS */}
            <h3 className={styles.challengeTitle}>Lack of Product-Market Fit</h3>
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
            {/* Challenge Title uses new color from CSS */}
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
            {/* Challenge Title uses new color from CSS */}
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

      {/* Solution Section - Structure remains the same */}
      <motion.section
        ref={solutionRef}
        className={styles.solutionSection}
        initial="hidden"
        animate={solutionControls}
        variants={staggerChildren}
      >
        {/* Section Title uses Creta font */}
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText
            text="How embryōnic Helps {company}"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div className={styles.solutionContent} variants={staggerChildren}>
          {/* Step 1 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
            {/* Solution Title uses Creta font, apply SVG underline via span */}
            <h3 className={styles.solutionTitle}>
              Systematically <span className={styles.svgUnderline}>validate problems</span>
            </h3>
            <p className={styles.solutionText}>
              Validate and get pre-product traction. embryōnic’s pragmatic system aims
              to de-risk and spot winning (and losing) opportunities, increasing the
              odds of success and saving Time.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
             {/* Solution Title uses Creta font, apply SVG underline via span */}
            <h3 className={styles.solutionTitle}>
              Product + Marketing as <span className={styles.svgUnderline}>ONE team</span>
            </h3>
            <p className={styles.solutionText}>
              No need to hire on day one. With the Startup-as-a-Service Model you get a
              turnkey Squad and a battle-tested team with C-level operators in Product,
              Tech, and Marketing.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
             {/* Solution Title uses Creta font, apply SVG underline via span */}
            <h3 className={styles.solutionTitle}>
              Predictable <span className={styles.svgUnderline}>burn rate</span>
            </h3>
            <p className={styles.solutionText}>
              Keep it flexible. With flexible subscriptions to fit your burn rate, you
              can harness Lean execution and progressive investment deployment by
              scaling up or down as you get traction.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section - Structure remains the same */}
      <motion.section
        ref={ctaRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        {/* CTA Title uses new size from CSS */}
        <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
          <ReplaceText
            text="{first_name}, Ready to Build {company} Without the Risks?"
            replacements={replacements}
          />
        </motion.h2>
        {/* CTA Subtitle remains the same */}
        <motion.p variants={fadeInUp} className={styles.ctaSubtitle}>
          Schedule a 45-minute call to see how embryōnic can accelerate your
          startup’s journey.
        </motion.p>
        <motion.div variants={fadeInUp}>
          {/* UPDATED: CTA button styling */}
          <button
            className={styles.ctaButtonLarge} // Applies new SVG background and font styles
            onClick={scrollToBook}
          >
            Book a Call {/* Original Text - Client didn't ask to change this one */}
          </button>
        </motion.div>
      </motion.section>

      {/* Footer Section - Structure remains exactly the same */}
      <motion.footer
        ref={footerRef}
        className={styles.footer} // Uses original footer styles
        initial="hidden"
        animate={footerControls}
        variants={fadeInUp}
      >
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link href="/terms" className={styles.footerLink}>
              Terms
            </Link>
            <Link href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </Link>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Embryonic Studio. All rights reserved.
          </div>
        </div>
      </motion.footer>

       {/* Scroll target remains the same */}
       <div id="book-a-call" style={{ scrollMarginTop: '100px' }}></div>

    </div>
  );
}