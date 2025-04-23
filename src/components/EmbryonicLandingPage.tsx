// src/components/EmbryonicLandingPage.tsx

"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Search, Users } from "lucide-react";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
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

 useEffect(() => {
  const steps = document.querySelectorAll(`.${styles.solutionStep}`);
  steps.forEach((step, index) => {
   (step as HTMLElement).style.setProperty("--animation-order", index.toString());
  });
 }, []);

 const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
 };
 const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
 };

 const ventures = [
  { name: "batchday" },
  { name: "Artisan" }, // Note: Client mentioned this logo looks small. Check the source image file for excess whitespace.
  { name: "Clyx" },
  { name: "Monc" },
  { name: "Opinion" },
 ];

 const scrollToBook = () => {
  const element = document.getElementById("book-a-call");
  if (element) {
   element.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
   console.warn("Element with ID 'book-a-call' not found for scrolling.");
  }
 };


 return (
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
      <Image
       src="/images/abm/embryonic/vector_logo.svg"
       alt="Embryonic Studio Logo"
       width={120}
       height={40}
       priority
      />
     </div>
     <button
      className={styles.navCta}
      onClick={scrollToBook}
     >
      BOOK A CALL
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
     <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
      <ReplaceText text="Hey {first_name}, Let's " replacements={replacements} />
      <span className={styles.svgUnderline}>De-Risk</span>
      <ReplaceText
       text=" and Build {company} with embryōnic"
       replacements={replacements}
      />
     </motion.h1>
     <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
      <ReplaceText
       text="Hatch your concept in a fraction of the time with embryōnic—the Startup Studio that problem-centric founders rely on to rapidly de-risk, build, and grow remarkable ventures in weeks."
       replacements={replacements}
      />
     </motion.p>
     {/* CHANGED: Text styling (size) updated in CSS to match subtitle */}
     <motion.p variants={fadeInUp} className={styles.heroTagline}>
      We believe in turning{" "}
      <span className={styles.svgUnderline}>visionary ideas</span> into validated
      ventures with speed and precision.
     </motion.p>
     <motion.div variants={fadeInUp}>
      <button
       className={styles.ctaButton}
       onClick={scrollToBook}
      >
       START TODAY
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
     <h2 className={styles.venturesTitle}>Ventures the Team Worked With</h2>
     <div className={styles.carouselTrack}>
      {[...ventures, ...ventures].map((venture, index) => (
       <div key={index} className={styles.carouselItem}>
        <Image
         src={`/images/abm/embryonic/logo-${venture.name
          .toLowerCase()
          .replace(/\s+/g, "-")}.avif`}
         alt={`${venture.name} logo`}
         width={100} // Note: Client mentioned Artisan logo looks small. Consider adjusting width/height or checking source image file.
         height={50}
         className={styles.ventureLogo}
         loading="lazy"
        />
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
    {/* CHANGED: Section Title Text */}
    <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
     <ReplaceText
      text="Challenges Startups Like {company} May Face"
      replacements={replacements}
     />
    </motion.h2>
    <motion.div className={styles.challengesGrid} variants={staggerChildren}>
     {/* Card 1 - CHANGED */}
     <motion.div className={styles.challengeCard} variants={fadeInUp}>
      {/* CHANGED: Card Title Text & Styling (font/size updated in CSS) */}
      <h3 className={styles.challengeTitle}>Seeking Product-market Fit Signals</h3>
      <p className={styles.challengeText}>
       {/* CHANGED: Card Body Text */}
       <ReplaceText
        text="You’ve raised funding, but finding {company} PMF it's a journey. Skipping key validation steps often leads to wasting time and resources."
        replacements={replacements}
       />
      </p>
     </motion.div>

     {/* Card 2 - No changes to text */}
     <motion.div className={styles.challengeCard} variants={fadeInUp}>
      <h3 className={styles.challengeTitle}>Uncertain Development Path</h3>
      <p className={styles.challengeText}>
       <ReplaceText
        text="Choosing between agencies or in-house hires for {company}’s MVP is daunting without clear validation."
        replacements={replacements}
       />
      </p>
     </motion.div>

     {/* Card 3 - CHANGED */}
     <motion.div className={styles.challengeCard} variants={fadeInUp}>
      <h3 className={styles.challengeTitle}>Need for Proactive Partners</h3>
      <p className={styles.challengeText}>
       {/* CHANGED: Card Body Text */}
       <ReplaceText
        text="You may considering a strategic partner who has been there before, that acts like co-founders do, and risk with you in the long run."
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
    {/* CHANGED: Section Title Text */}
    <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
     <ReplaceText
      text="How embryōnic can accelerate {company}'s Journey"
      replacements={replacements}
     />
    </motion.h2>
    <motion.div className={styles.solutionContent} variants={staggerChildren}>
     {/* Step 1 */}
     <motion.div className={`${styles.solutionStep}`} variants={fadeInUp}>
      {/* Note: Client mentioned underline looks large. Check SVG asset or adjust padding in CSS if needed. */}
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

   {/* CTA Section */}
   <motion.section
    ref={ctaRef}
    className={styles.ctaSection}
    initial="hidden"
    animate={ctaControls}
    variants={staggerChildren}
   >
    <motion.h2 variants={fadeInUp} className={styles.ctaTitle}>
     <ReplaceText
      text="{first_name}, Ready to Build {company} Without the Risks?"
      replacements={replacements}
     />
    </motion.h2>
    <motion.p variants={fadeInUp} className={styles.ctaSubtitle}>
     Schedule a 45-minute call to see how embryōnic can accelerate your
     startup’s journey.
    </motion.p>
    <motion.div variants={fadeInUp}>
     <button
      className={styles.ctaButtonLarge}
      onClick={scrollToBook}
     >
      BOOK A CALL
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

   {/* Scroll target */}
   <div id="book-a-call" style={{ scrollMarginTop: '100px' }}></div>

  </div>
 );
}