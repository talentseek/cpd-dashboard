"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/GeneoLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function GeneoLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  // Refs for animation triggers
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Animation controls
  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const outcomesControls = useAnimation();
  const ctaControls = useAnimation();

  // InView hooks
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const outcomesInView = useInView(outcomesRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (outcomesInView) outcomesControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [heroInView, featuresInView, outcomesInView, ctaInView, heroControls, featuresControls, outcomesControls, ctaControls]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const features = [
    {
      title: "Scheduling Future Changes to Work Instructions",
      description:
        "Plan production changes seamlessly into the future. GEN-OPS automatically synchronizes revisions across all Job Element Sheets, highlights conflicts between overlapping Change Masters, and allows you to adjust the go-live sequence to fit your operations at {company}.",
      asset: "/images/abm/geneo/change.mp4",
      type: "video",
      backgroundImage: "/images/abm/geneo/documents-cm.png",
    },
    {
      title: "Managing Complex Arrangements",
      description:
        "Reduce the number of standards needed for complex assemblies at {company}. With Variant Job Element Sheets, write one sheet to cover all process variations by linking Derivative Sets, recording only the differences—saving time and ensuring accuracy.",
      asset: "/images/abm/geneo/variants.mp4",
      type: "video",
      backgroundImage: "/images/abm/geneo/variant-overrides.png",
    },
    {
      title: "Cycle Time, Customer Mix & Line Balancing",
      description:
        "Optimize production flow by setting weightings for each variant in a Derivative Set. GEN-OPS calculates cycle times from Work Instruction elements and auto-generates Yamazumi charts, enabling on-the-fly line balancing as demand shifts at {company}.",
      asset: "/images/abm/geneo/derivative.mp4",
      type: "video",
      backgroundImage: "/images/abm/geneo/weightings-ds.png",
    },
    {
      title: "BOM Management and Comparison",
      description:
        "Ensure no parts are missed with GEN-OPS’ 3-tier part system. Generate mBOM reports from Work Instructions for each Change Master and compare them with your eBOM, streamlining {company}’s assembly process.",
      asset: "/images/abm/geneo/bom.mp4",
      type: "video",
      backgroundImage: "/images/abm/geneo/yamazumi-perspective.jpeg",
    },
    {
      title: "What Sets GENEO Apart",
      description:
        "GEN-OPS combines NPI scheduling, complex variant management, mBOM integration, and real-time Yamazumi—all built by Lean OpEx experts. Unlike other platforms, it’s uncompromisingly designed to enhance {company}’s production efficiency.",
      asset: "/images/abm/geneo/yamazumi.png",
      type: "image",
      backgroundImage: "/images/abm/geneo/yamazumi.png",
    },
  ];

  const handleBookDemo = () => {
    console.log("Booking a demo");
  };

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <div className={styles.navigation}>
        <div className={styles.logo}>
          <Image src="/images/abm/geneo/logo.png" alt="GENEO Logo" width={100} height={40} />
        </div>
        <Button className={styles.bookDemoButton} onClick={handleBookDemo}>
          Book a Demo
        </Button>
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        initial="hidden"
        animate={heroControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          <motion.div className={styles.heroText} variants={fadeInUp}>
            <h1>
              <ReplaceText
                text="Michael, Revolutionize {company}’s Work Instructions with GEN-OPS"
                replacements={replacements}
              />
            </h1>
            <p>
              <ReplaceText
                text="Streamline the creation, management, and execution of manufacturing standards—saving time, reducing errors, and adapting to {company}’s complex needs."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.heroGif} variants={fadeInUp}>
            <Image
              src="/images/abm/geneo/factory.gif"
              alt="Factory Animation"
              width={300}
              height={300}
              className={styles.factoryGif}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={staggerChildren}
        className={styles.featuresContainer}
      >
        {features.map((feature, index) => (
          <motion.section
            key={index}
            className={styles.featureSection}
            style={{ backgroundImage: `url(${feature.backgroundImage})` }}
            variants={fadeInUp}
          >
            <div className={index % 2 === 0 ? styles.featureLeft : styles.featureRight}>
              <div className={styles.featureMedia}>
                {feature.type === "video" ? (
                  <video
                    src={feature.asset}
                    className={styles.featureVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    title={feature.title}
                  />
                ) : (
                  <Image
                    src={feature.asset}
                    alt={feature.title}
                    width={600}
                    height={300}
                    className={styles.featureImage}
                  />
                )}
              </div>
              <div className={styles.featureText}>
                <h3>{feature.title}</h3>
                <p>
                  <ReplaceText text={feature.description} replacements={replacements} />
                </p>
              </div>
            </div>
          </motion.section>
        ))}
      </motion.div>

      {/* Projected Outcomes Section */}
      <motion.section
        ref={outcomesRef}
        className={styles.outcomesSection}
        initial="hidden"
        animate={outcomesControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText text="Projected Outcomes for {company}" replacements={replacements} />
        </motion.h2>
        <motion.div className={styles.outcomesChart} variants={staggerChildren}>
          <div className={styles.chartContainer}>
            <div className={styles.chartBar}>
              <div className={styles.chartLabel}>Implementation Time</div>
              <div className={styles.barContainer}>
                <motion.div
                  className={styles.barBefore}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "90%" } }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div
                  className={styles.barAfter}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "40%" } }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <div className={styles.barLegend}>55% Reduction</div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartLabel}>Error Rate</div>
              <div className={styles.barContainer}>
                <motion.div
                  className={styles.barBefore}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "60%" } }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div
                  className={styles.barAfter}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "10%" } }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <div className={styles.barLegend}>83% Reduction</div>
            </div>
            <div className={styles.chartBar}>
              <div className={styles.chartLabel}>Efficiency</div>
              <div className={styles.barContainer}>
                <motion.div
                  className={styles.barBefore}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "50%" } }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.div
                  className={styles.barAfter}
                  initial={{ width: 0 }}
                  animate={outcomesControls}
                  variants={{ visible: { width: "90%" } }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <div className={styles.barLegend}>40% Increase</div>
            </div>
          </div>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: "#556277" }} />
              <span>Before GEN-OPS</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: "#18d3d3" }} />
              <span>With GEN-OPS</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={ctaControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="{first_name}, Ready to Transform {company}’s Production?"
            replacements={replacements}
          />
        </motion.h2>
        <motion.p variants={fadeInUp}>
          Book a personalized demo to see how GEN-OPS can address your challenges.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button className={styles.ctaButton} onClick={handleBookDemo}>
            Book a Demo
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
}