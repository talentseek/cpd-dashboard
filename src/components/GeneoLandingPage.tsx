"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText"
import styles from "@/components/styles/GeneoLandingPage.module.css"

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function GeneoLandingPage({ replacements = defaultReplacements }: { replacements?: CustomReplacements }) {
  // Refs for scroll navigation
  const homeRef = useRef<HTMLDivElement>(null)
  const challengeRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)

  // Animation controls
  const homeControls = useAnimation()
  const challengeControls = useAnimation()
  const solutionControls = useAnimation()
  const actionControls = useAnimation()

  // State for interactive elements
  const [activeProcess, setActiveProcess] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  // InView hooks with corrected 'amount'
  const homeInView = useInView(homeRef, { once: false, amount: 0.3 })
  const challengeInView = useInView(challengeRef, { once: false, amount: 0.3 })
  const solutionInView = useInView(solutionRef, { once: false, amount: 0.3 })
  const actionInView = useInView(actionRef, { once: false, amount: 0.3 })

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Animation triggers
  useEffect(() => {
    if (homeInView) homeControls.start("visible")
    if (challengeInView) challengeControls.start("visible")
    if (solutionInView) solutionControls.start("visible")
    if (actionInView) actionControls.start("visible")
  }, [homeInView, challengeInView, solutionInView, actionInView, homeControls, challengeControls, solutionControls, actionControls])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  // Process steps data (Geneo-specific challenges)
  const processSteps = [
    { title: "Frequent Updates", description: "Syncing safety, quality, and new product updates across complex variants is chaotic." },
    { title: "Complex Variants", description: "Documenting every product permutation manually slows production." },
    { title: "Line Imbalance", description: "Manual balancing struggles with demand shifts, overburdening your line." },
    { title: "Missing Parts", description: "Overlooked components in updates halt assembly and erode quality." },
  ]

  // Metrics data
  const metrics = [
    { label: "Variants Managed", value: "100+" },
    { label: "Setup Timeline", value: "3 Months" },
    { label: "Error Rate", value: "12%" },
    { label: "Efficiency Gain", value: "+40%" },
  ]

  // Solution features (Geneo-specific)
  const features = [
    {
      title: "NPI Scheduling",
      description: "Schedule and sync updates across all variants in real time.",
    },
    {
      title: "Derivative Standards",
      description: "Define complex variants efficiently with one Job Element Sheet.",
    },
    {
      title: "Real-Time Yamazumi",
      description: "Balance your line instantly with live work instruction data.",
    },
    {
      title: "mBOM Assurance",
      description: "Ensure no parts are missed with a 3-tier mBOM system.",
    },
  ]

  const handleBookDemo = () => {
    console.log("Booking a demo");
  }

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <Image
            src="/images/abm/geneo/logo.png"
            alt="Geneo Logo"
            width={120}
            height={30}
            className={styles.logo}
          />
          <ul className={styles.navLinks}>
            <li onClick={() => scrollToSection(homeRef)}>Overview</li>
            <li onClick={() => scrollToSection(challengeRef)}>Challenge</li>
            <li onClick={() => scrollToSection(solutionRef)}>Solution</li>
            <li onClick={() => scrollToSection(actionRef)}>Action</li>
          </ul>
          <Button className={styles.ctaButton} onClick={handleBookDemo}>
            Book a Demo
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={homeRef}
        className={styles.heroSection}
        initial="hidden"
        animate={homeControls}
        variants={staggerChildren}
      >
        <div className={styles.heroContent}>
          <motion.div className={styles.heroText} variants={fadeInUp}>
            <h1 className={styles.heroHeadline}>
              <ReplaceText text="{first_name}, transform {company}’s production with GEN-OPS" replacements={replacements} />
            </h1>
            <p className={styles.heroSubheadline}>
              Overcome the chaos of setting up standards for <span className={styles.highlight}>100+ variants</span> in just <span className={styles.highlight}>3 months</span>
            </p>
          </motion.div>
          <motion.div className={styles.heroGif} variants={fadeInUp}>
            <Image
              src="/images/abm/geneo/factory.gif"
              alt="Factory Animation"
              width={498}
              height={498}
              className={styles.factoryGif}
            />
          </motion.div>
          <motion.div className={styles.metricsContainer} variants={staggerChildren}>
            {metrics.map((metric, index) => (
              <motion.div key={index} className={styles.metricCard} variants={fadeInUp}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section
        ref={challengeRef}
        className={styles.challengeSection}
        initial="hidden"
        animate={challengeControls}
        variants={staggerChildren}
      >
        <motion.div className={styles.sectionHeader} variants={fadeInUp}>
          <h2><ReplaceText text="The Challenge at {company}" replacements={replacements} /></h2>
          <p>Complex assembly under tight deadlines is overwhelming your team</p>
        </motion.div>
        <motion.div className={styles.processVisualization} variants={fadeInUp}>
          <div className={styles.processTimeline}>
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`${styles.processStep} ${index === activeProcess ? styles.activeStep : ""}`}
                onClick={() => setActiveProcess(index)}
              >
                <div className={styles.processIcon}>{index + 1}</div>
                <div className={styles.processTitle}>{step.title}</div>
              </div>
            ))}
          </div>
          <div className={styles.processDetail}>
            <div className={styles.processDetailContent}>
              <h3>{processSteps[activeProcess].title}</h3>
              <p>{processSteps[activeProcess].description}</p>
            </div>
            <div className={styles.processDetailImage}>
              <Image
                src={`/images/abm/geneo/challenge-${activeProcess + 1}.jpg`}
                alt={processSteps[activeProcess].title}
                width={500}
                height={300}
                className={styles.processImage}
              />
            </div>
          </div>
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
        <motion.div className={styles.sectionHeader} variants={fadeInUp}>
          <h2>The GEN-OPS Solution</h2>
          <p><ReplaceText text="A best-in-class system to streamline {company}’s production" replacements={replacements} /></p>
        </motion.div>
        <motion.div className={styles.solutionShowcase} variants={fadeInUp}>
          <video
            src="/images/abm/geneo/yamazumi.mp4"
            width={1200}
            height={600}
            className={styles.showcaseImage}
            autoPlay
            loop
            muted
            playsInline
            title="GEN-OPS Yamazumi Demo"
          />
        </motion.div>
        <motion.div className={styles.keyFeatures} variants={staggerChildren}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${styles.featureCard} ${expandedCard === index ? styles.expanded : ""}`}
              variants={fadeInUp}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
              {expandedCard === index && (
                <div className={styles.featureExpanded}>
                  <Image
                    src={`/images/abm/geneo/feature-${index + 1}.png`}
                    alt={feature.title}
                    width={400}
                    height={250}
                    className={styles.factoryImage}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.div className={styles.resultsPreview} variants={fadeInUp}>
          <h3><ReplaceText text="Projected Outcomes for {company}" replacements={replacements} /></h3>
          <div className={styles.resultsChart}>
            <div className={styles.chartContainer}>
              <div className={styles.chartBar}>
                <div className={styles.chartLabel}>Implementation Time</div>
                <div className={styles.barContainer}>
                  <div className={styles.barBefore} style={{ width: "90%" }}></div>
                  <div className={styles.barAfter} style={{ width: "40%" }}></div>
                </div>
                <div className={styles.barLegend}>
                  <span>55% Reduction</span>
                </div>
              </div>
              <div className={styles.chartBar}>
                <div className={styles.chartLabel}>Error Rate</div>
                <div className={styles.barContainer}>
                  <div className={styles.barBefore} style={{ width: "60%" }}></div>
                  <div className={styles.barAfter} style={{ width: "10%" }}></div>
                </div>
                <div className={styles.barLegend}>
                  <span>83% Reduction</span>
                </div>
              </div>
              <div className={styles.chartBar}>
                <div className={styles.chartLabel}>Efficiency</div>
                <div className={styles.barContainer}>
                  <div className={styles.barBefore} style={{ width: "50%" }}></div>
                  <div className={styles.barAfter} style={{ width: "90%" }}></div>
                </div>
                <div className={styles.barLegend}>
                  <span>40% Increase</span>
                </div>
              </div>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: "var(--color-secondary)" }}></div>
                <span>Before GEN-OPS</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: "var(--color-primary)" }}></div>
                <span>With GEN-OPS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={actionRef}
        className={styles.ctaSection}
        initial="hidden"
        animate={actionControls}
        variants={staggerChildren}
      >
        <motion.div className={styles.ctaContent} variants={fadeInUp}>
          <h2>
            <ReplaceText text="{first_name}, Ready to Transform {company}’s Production?" replacements={replacements} />
          </h2>
          <p>Schedule a personalized demo to see how GEN-OPS can streamline your operations</p>
          <motion.button className={styles.ctaButtonLarge} onClick={handleBookDemo} variants={fadeInUp}>
            Book Your Demo Now
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  )
}