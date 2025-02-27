"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText"
import styles from "@/components/styles/GeneoLandingPage.module.css"

interface Replacements extends CustomReplacements {
  first_name: string;
  company: string;
  custom: {
    problem: string;
    solution: string;
    variants: string;
    timeline: string;
  };
}

const defaultReplacements: Replacements = {
  first_name: "{first_name}",
  company: "{company}",
  custom: {
    problem: "{custom.problem}",
    solution: "{custom.solution}",
    variants: "{custom.variants}",
    timeline: "{custom.timeline}",
  },
};

export default function GeneoLandingPage({ replacements = defaultReplacements }: { replacements?: Replacements }) {
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
  const [activeChallenge, setActiveChallenge] = useState(0)
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null)

  // InView hooks with corrected 'amount' option
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

  // Challenge data (ICP pain points)
  const challenges = [
    {
      title: "Frequent Updates",
      description: "Keeping safety, quality, and new product updates in sync across {custom.variants} variants is a logistical nightmare, threatening your {custom.timeline} deadline.",
    },
    {
      title: "Complex Variants",
      description: "Documenting every one of {custom.variants} product variations manually is slow, error-prone, and leaves gaps in your production line.",
    },
    {
      title: "Line Imbalance",
      description: "Outdated Yamazumi charts can’t adjust to demand shifts, overburdening your team and missing Takt time goals.",
    },
    {
      title: "Missing Parts",
      description: "Overlooked components during updates derail your {custom.timeline} timeline and compromise quality at {company}.",
    },
  ]

  // Solution data (GEN-OPS features)
  const solutions = [
    {
      title: "NPI Scheduling",
      description: "Sync every update across {custom.variants} variants instantly, meeting your {custom.timeline} deadline.",
      detail: "GEN-OPS’s NPI tool schedules future changes, automatically resolving conflicts so your production stays on track.",
      image: "/images/abm/geneo/npi-scheduling.png",
    },
    {
      title: "Derivative Standards",
      description: "Define all {custom.variants} variants with one elegant Job Element Sheet, slashing documentation time.",
      detail: "Our Derivative functionality captures every variation efficiently, ensuring no process is left undefined.",
      image: "/images/abm/geneo/derivative-standards.png",
    },
    {
      title: "Real-Time Yamazumi",
      description: "Balance your line instantly with live data from your work instructions.",
      detail: "GEN-OPS generates Yamazumi charts in real time, adapting to demand changes to keep {company}’s production flowing.",
      image: "/images/abm/geneo/yamazumi.png",
    },
    {
      title: "mBOM Assurance",
      description: "Eliminate missing parts with an mBOM built from your instructions.",
      detail: "A 3-tier part system compares e-BOM to m-BOM, guaranteeing every component is covered across {custom.variants} variants.",
      image: "/images/abm/geneo/mbom.png",
    },
  ]

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <Image
            src="/images/abm/geneo/logo.png"
            alt="Geneo Logo"
            width={120}
            height={30}
            className={styles.logo}
          />
          <ul className={styles.navLinks}>
            <li onClick={() => scrollToSection(homeRef)}>Home</li>
            <li onClick={() => scrollToSection(challengeRef)}>Challenge</li>
            <li onClick={() => scrollToSection(solutionRef)}>Solution</li>
            <li onClick={() => scrollToSection(actionRef)}>Action</li>
          </ul>
          <Button className={styles.ctaButton}>Book a Demo</Button>
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
          <motion.h1 variants={fadeInUp} className={styles.heroHeadline}>
            <ReplaceText text="Hey {first_name}, is {company}’s new line a standards chaos?" replacements={replacements} />
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSubheadline}>
            <ReplaceText
              text="Setting up {custom.variants} variants in {custom.timeline} doesn’t have to derail your team."
              replacements={replacements}
            />
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button className={styles.heroCta} onClick={() => scrollToSection(solutionRef)}>Discover GEN-OPS</Button>
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
          <h2>Your Manufacturing Struggles</h2>
          <p>
            <ReplaceText
              text="At {company}, {custom.problem} is slowing you down—here’s why."
              replacements={replacements}
            />
          </p>
        </motion.div>
        <motion.div className={styles.challengeContent} variants={staggerChildren}>
          <div className={styles.challengeTabs}>
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className={`${styles.challengeTab} ${activeChallenge === index ? styles.activeTab : ""}`}
                onClick={() => setActiveChallenge(index)}
                variants={fadeInUp}
              >
                {challenge.title}
              </motion.div>
            ))}
          </div>
          <motion.div className={styles.challengeDetail} variants={fadeInUp}>
            <h3>{challenges[activeChallenge].title}</h3>
            <p>
              <ReplaceText text={challenges[activeChallenge].description} replacements={replacements} />
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
        <motion.div className={styles.sectionHeader} variants={fadeInUp}>
          <h2>GEN-OPS: Precision for {replacements.company}</h2>
          <p>
            <ReplaceText
              text="Solve {custom.problem} with {custom.solution}—built for complex assembly."
              replacements={replacements}
            />
          </p>
        </motion.div>
        <motion.div className={styles.solutionFeatures} variants={staggerChildren}>
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className={`${styles.featureCard} ${expandedSolution === index ? styles.expanded : ""}`}
              variants={fadeInUp}
              onClick={() => setExpandedSolution(expandedSolution === index ? null : index)}
            >
              <h4>{solution.title}</h4>
              <p>
                <ReplaceText text={solution.description} replacements={replacements} />
              </p>
              {expandedSolution === index && (
                <div className={styles.featureDetail}>
                  <p>
                    <ReplaceText text={solution.detail} replacements={replacements} />
                  </p>
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={400}
                    height={250}
                    className={styles.featureImage}
                  />
                </div>
              )}
            </motion.div>
          ))}
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
            <ReplaceText text="{first_name}, Ready to Streamline {company}?" replacements={replacements} />
          </h2>
          <p>
            <ReplaceText
              text="See how GEN-OPS tackles {custom.problem} in {custom.timeline}—book your demo now."
              replacements={replacements}
            />
          </p>
          <motion.div variants={fadeInUp}>
            <Button className={styles.ctaButtonLarge}>Schedule a Demo</Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}