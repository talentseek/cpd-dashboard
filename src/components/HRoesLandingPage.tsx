// src/components/HRoesLandingPage.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Book, Calendar, Shield, UserCheck, Play, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/HRoesLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function HRoesLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const urgencyRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const webcastRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const urgencyControls = useAnimation();
  const solutionsControls = useAnimation();
  const testimonialControls = useAnimation();
  const webcastControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const urgencyInView = useInView(urgencyRef, { once: false, amount: 0.3 });
  const solutionsInView = useInView(solutionsRef, { once: false, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, { once: false, amount: 0.3 });
  const webcastInView = useInView(webcastRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (urgencyInView) urgencyControls.start("visible");
    if (solutionsInView) solutionsControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (webcastInView) webcastControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    urgencyInView,
    solutionsInView,
    testimonialInView,
    webcastInView,
    footerInView,
    navControls,
    heroControls,
    urgencyControls,
    solutionsControls,
    testimonialControls,
    webcastControls,
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
              src="/images/abm/hroes/logo.webp"
              alt="HRoes Logo"
              width={120}
              height={40}
            />
          </div>
          <Button
            className={styles.navCta}
            onClick={() => window.location.href = "https://cal.com/hroes/15min"}
          >
            Book a 15-Min Demo
          </Button>
        </div>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className={styles.navSpacer}></div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={styles.hero}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroBackground}></div>

        {/* Pulsating Alert Lines */}
        <div className={styles.alertLines}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.alertLine} style={{ animationDelay: `${i * 0.2}s` }}></div>
          ))}
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
              <ReplaceText
                text="{first_name}, Don't Let {company} Be the Next Headline!"
                replacements={replacements}
              />
            </motion.h1>

            <motion.p variants={fadeInUp} className={styles.heroText}>
              HR Teams are now dealing with the fall-out from those Christmas party mishaps! Sexual harassment claims can leave businesses facing legal issues long after the festivities end. Make sure your company stays out of the spotlight for all the wrong reasons...
            </motion.p>

            <motion.div variants={fadeInUp} className={styles.heroCtaWrapper}>
              <Button
                className={styles.heroCta}
                onClick={() => window.location.href = "https://cal.com/hroes/15min"}
              >
                Book a 15-Min Demo <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>

            {/* Quote Bubble */}
            <motion.div variants={fadeInUp} className={styles.quoteBubble}>
              <div className={styles.quoteImage}>
                <Image
                  src="/images/abm/hroes/elisa.jpeg"
                  alt="Elissa Thursfield"
                  width={100}
                  height={100}
                  className={styles.quoteImageInner}
                />
              </div>
              <p className={styles.quoteText}>
                A Tesco worker settled a £45k sexual harassment claim—don’t be next!
              </p>
              <p className={styles.quoteAuthor}>— Elissa Thursfield, HRoes Co-Founder</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Urgency Section */}
      <motion.section
        ref={urgencyRef}
        id="urgency"
        className={styles.urgency}
        initial="hidden"
        animate={urgencyControls}
        variants={staggerChildren}
      >
        <div className={styles.urgencyInner}>
          <div className={styles.urgencyContent}>
            <motion.div variants={fadeInUp} className={styles.urgencyHeader}>
              <AlertTriangle className={styles.urgencyIcon} />
              <h2 className={styles.urgencyTitle}>Another Day, Another Scandal!</h2>
            </motion.div>

            <motion.p variants={fadeInUp} className={styles.urgencyText}>
              New legislation introduced in the UK in October 2024 requires businesses to proactively prevent harassment. Who wants to be the next company Director in a tribunal court? Who wants to be the People leader who dropped the ball?
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button
                className={styles.urgencyCta}
                onClick={() => window.location.href = "https://cal.com/hroes/15min"}
              >
                Book a 15-Min Demo <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solution Section */}
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
              text="Protect {company} with HRoes"
              replacements={replacements}
            />
          </motion.h2>

          <motion.div className={styles.solutionsGrid} variants={staggerChildren}>
            {/* E-Learning Card */}
            <motion.div className={styles.solutionCard} variants={fadeInUp}>
              <div className={styles.solutionIcon}>
                <Book className={styles.icon} />
              </div>

              <h3 className={styles.solutionTitle}>CPD E-Learning</h3>

              <p className={styles.solutionText}>
                Ensure you are compliant with no government legislation on sexual harassment, in just a few hours, from anywhere, for only £35 per employee.
              </p>

              <Button
                className={styles.solutionCta}
                onClick={() => window.location.href = "https://cal.com/hroes/15min"}
              >
                Get Started <ArrowRight className={styles.ctaIcon} />
              </Button>
            </motion.div>
          </motion.div>

          {/* Embedded Video (Placeholder for vid.mp4) */}
          <motion.div variants={fadeInUp} className={styles.videoContainer}>
            <video
              autoPlay
              muted // Required for autoplay in most browsers
              loop
              controls
              className={styles.video}
              width={800}
              height={450}
              poster="/images/abm/hroes/video-poster.jpg"
            >
              <source src="/images/abm/hroes/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial/Quote Section */}
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
            <motion.div variants={fadeInUp} className={styles.testimonialImage}>
              <Image
                src="/images/abm/hroes/elisa.jpeg"
                alt="Elissa Thursfield"
                width={120}
                height={120}
                className={styles.testimonialImageInner}
              />
            </motion.div>

            <motion.blockquote variants={fadeInUp} className={styles.testimonialQuote}>
              We know what you’re thinking—new regulations are a pain. You just want a safe workplace where common sense prevails. When harassment claims arise, prove your efforts to avoid more costly risks!
            </motion.blockquote>

            <motion.p variants={fadeInUp} className={styles.testimonialAuthor}>
              — Elissa Thursfield, Co-Founder of HRoes
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Webcast Section */}
      <motion.section
        ref={webcastRef}
        id="webcast"
        className={styles.webcast}
        initial="hidden"
        animate={webcastControls}
        variants={staggerChildren}
      >
        <div className={styles.webcastInner}>
          <div className={styles.webcastContent}>
            <motion.div variants={fadeInUp} className={styles.webcastIcon}>
              <Play className={styles.icon} />
            </motion.div>

            <motion.h2 variants={fadeInUp} className={styles.webcastTitle}>
              Join Our Much-Loved Webcast
            </motion.h2>

            <motion.p variants={fadeInUp} className={styles.webcastText}>
              Will AI replace HR jobs? Join Elissa Thursfield, HRoes Co-Founder, as she reveals how HR leaders can future-proof their AI strategies—and their careers.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button
                className={styles.webcastCta}
                onClick={() => window.location.href = "https://hroes.clickmeeting.com/"}
              >
                Register for Webcast <Calendar className={styles.ctaIcon} />
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
            <div className={styles.footerLinks}>
              <Link href="https://www.hroes.co.uk/privacy-policy/" className={styles.footerLink}>
                Privacy
              </Link>
              <Link href="https://www.hroes.co.uk/unsubscribe/" className={styles.footerLink}>
                Unsubscribe
              </Link>
            </div>
            <div className={styles.footerCopyright}>
              © {new Date().getFullYear()} HRoes. All rights reserved.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}