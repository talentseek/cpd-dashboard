"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Import Link for internal navigation
import { Button } from "@/components/ui/button";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/FocusHQLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function FocusHQLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // State for sticky navigation
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const challengesControls = useAnimation();
  const solutionControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const challengesInView = useInView(challengesRef, { once: false, amount: 0.3 });
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (challengesInView) challengesControls.start("visible");
    if (solutionInView) solutionControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [navInView, heroInView, challengesInView, solutionInView, ctaInView, footerInView, navControls, heroControls, challengesControls, solutionControls, ctaControls, footerControls]);

  // Trigger video playback when in view
  useEffect(() => {
    if (solutionInView && videoRef.current) {
      videoRef.current.play();
    }
  }, [solutionInView]);

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Sticky Navigation */}
      <motion.nav
        ref={navRef}
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}
        initial="hidden"
        animate={navControls}
        variants={fadeInUp}
      >
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/focushq/logo.png"
              alt="Focus HQ Logo"
              width={120}
              height={40}
            />
          </div>
          <Button
            className={styles.navCta}
            onClick={() => window.location.href = "#book-a-demo"}
          >
            Book a Demo
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={styles.hero}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            <ReplaceText
              text="Hey {first_name}, Transform {company}’s Portfolio with Focus HQ"
              replacements={replacements}
            />
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            Gain real-time transparency, streamline governance, and deliver projects on time, on budget, and with the outcomes promised—across your entire portfolio.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button className={styles.ctaButton} onClick={() => window.location.href = "#book-a-demo"}>Book a Demo</Button>
          </motion.div>
        </div>
        <motion.div className={styles.heroVisual} variants={fadeInUp}>
          <Image
            src="/images/abm/focushq/dashboard-animation.gif"
            alt="Focus HQ Dashboard Animation"
            width={500}
            height={500}
            className={styles.animatedDashboard}
          />
        </motion.div>
      </motion.section>

      {/* Challenges Section */}
      <motion.section
        ref={challengesRef}
        className={styles.challenges}
        initial="hidden"
        animate={challengesControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText
            text="Challenges {company} Faces in Portfolio Management"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div className={styles.challengesGrid} variants={staggerChildren}>
          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconWrapper}>
              <Image src="/images/abm/focushq/icon-visibility.png" alt="Visibility Icon" width={50} height={50} />
            </div>
            <h3 className={styles.challengeTitle}>Lack of Visibility</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="Struggling to gain comprehensive visibility into project performance across {company}’s portfolio to meet executive reporting expectations."
                replacements={replacements}
              />
            </p>
          </motion.div>

          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconWrapper}>
              <Image src="/images/abm/focushq/icon-financial.png" alt="Financial Icon" width={50} height={50} />
            </div>
            <h3 className={styles.challengeTitle}>Financial Tracking Issues</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="Difficulty tracking project costs accurately to stay within {company}’s budget commitments due to fragmented reporting."
                replacements={replacements}
              />
            </p>
          </motion.div>

          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconWrapper}>
              <Image src="/images/abm/focushq/icon-resources.png" alt="Resources Icon" width={50} height={50} />
            </div>
            <h3 className={styles.challengeTitle}>Resource Prioritization</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="Challenges in prioritizing and resourcing projects effectively to deliver on {company}’s strategic objectives."
                replacements={replacements}
              />
            </p>
          </motion.div>

          <motion.div className={styles.challengeCard} variants={fadeInUp}>
            <div className={styles.iconWrapper}>
              <Image src="/images/abm/focushq/icon-agility.png" alt="Agility Icon" width={50} height={50} />
            </div>
            <h3 className={styles.challengeTitle}>Business Agility</h3>
            <p className={styles.challengeText}>
              <ReplaceText
                text="Struggles to adapt to changing project demands while maintaining stakeholder confidence at {company}."
                replacements={replacements}
              />
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        ref={solutionRef}
        className={styles.solution}
        initial="hidden"
        animate={solutionControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
          <ReplaceText
            text="How Focus HQ Empowers {company}"
            replacements={replacements}
          />
        </motion.h2>
        <div className={styles.solutionContent}>
          <motion.div className={styles.solutionGrid} variants={staggerChildren}>
            <motion.div className={styles.solutionItem} variants={fadeInUp}>
              <h3 className={styles.solutionTitle}>Real-Time Transparency</h3>
              <p className={styles.solutionText}>
                <ReplaceText
                  text="Achieve real-time transparency across {company}’s portfolio with a single source of truth."
                  replacements={replacements}
                />
              </p>
            </motion.div>

            <motion.div className={styles.solutionItem} variants={fadeInUp}>
              <h3 className={styles.solutionTitle}>Benefits Realization</h3>
              <p className={styles.solutionText}>
                <ReplaceText
                  text="Track and manage ROI throughout the project lifecycle, ensuring {company} delivers promised outcomes."
                  replacements={replacements}
                />
              </p>
            </motion.div>

            <motion.div className={styles.solutionItem} variants={fadeInUp}>
              <h3 className={styles.solutionTitle}>Simplicity & Automation</h3>
              <p className={styles.solutionText}>
                <ReplaceText
                  text="Automate reporting so {company}’s PMs focus on managing projects, not status updates—designed for accidental project managers."
                  replacements={replacements}
                />
              </p>
            </motion.div>

            <motion.div className={styles.solutionItem} variants={fadeInUp}>
              <h3 className={styles.solutionTitle}>Tailored Governance</h3>
              <p className={styles.solutionText}>
                <ReplaceText
                  text="Flex governance to suit any project size or complexity, ensuring consistency across {company}’s portfolio."
                  replacements={replacements}
                />
              </p>
            </motion.div>
          </motion.div>

          <motion.div className={styles.videoContainer} variants={fadeInUp}>
            <video
              ref={videoRef}
              className={styles.dashboardVideo}
              width={1200}
              height={600}
              muted
              loop
              playsInline
              poster="/images/abm/focushq/dashboard-video-poster.jpg"
            >
              <source src="/images/abm/focushq/dashboard-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        className={styles.cta}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <motion.div className={styles.ctaContent} variants={fadeInUp}>
          <h2 className={styles.ctaTitle}>
            <ReplaceText
              text="{first_name}, Ready to Streamline {company}’s Project Delivery?"
              replacements={replacements}
            />
          </h2>
          <p className={styles.ctaSubtitle}>
            Book a demo to see how Focus HQ can enhance control, reduce risks, and deliver better outcomes.
          </p>
          <motion.div variants={fadeInUp}>
            <Button className={styles.ctaButtonLarge} onClick={() => window.location.href = "#book-a-demo"}>Book a Demo</Button>
          </motion.div>
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
            <Link href="/terms" className={styles.footerLink}>Terms</Link>
            <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Focus HQ. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}