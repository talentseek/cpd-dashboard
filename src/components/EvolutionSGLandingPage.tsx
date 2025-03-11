// src/components/EvolutionSGLandingPage.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Building2,
  LineChart,
  Leaf,
  LightbulbIcon,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle2,
  Hotel,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import styles from "./styles/EvolutionSG.module.css";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText"; // Assuming this component exists

// Define the replacements interface
interface Replacements extends CustomReplacements {
  first_name: string;
  company: string;
}

const defaultReplacements: Replacements = {
  first_name: "{first_name}",
  company: "{company}",
};

// Counter animation component
const AnimatedCounter = ({
  value,
  label,
  prefix = "",
  suffix = "",
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(value * progress);

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(value);
        } else {
          setCount(currentCount);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, [isInView, value]);

  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div ref={ref} className={styles.counterContainer}>
      <div className={styles.counterValue}>
        {prefix}
        {formattedCount}
        {suffix}
      </div>
      <div className={styles.counterLabel}>{label}</div>
    </div>
  );
};

// Section header component
const SectionHeader = ({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) => (
  <div className={cn(styles.sectionHeader, centered && styles.centered)}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
  </div>
);

// Service card component
const ServiceCard = ({
  icon,
  title,
  description,
  link = "#",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}) => (
  <Card className={styles.serviceCard}>
    <CardHeader>
      <div className={styles.serviceIcon}>{icon}</div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className={styles.serviceDescription}>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Link href={link} className={styles.serviceLink}>
        Learn more <ArrowRight className={styles.arrowIcon} />
      </Link>
    </CardFooter>
  </Card>
);

// Company card component
const CompanyCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className={styles.companyCard}>
    <CardHeader>
      <div className={styles.companyIcon}>{icon}</div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className={styles.companyDescription}>{description}</CardDescription>
    </CardContent>
  </Card>
);

// News card component
const NewsCard = ({
  title,
  date,
  summary,
  link = "#",
}: {
  title: string;
  date: string;
  summary: string;
  link?: string;
}) => (
  <Card className={styles.newsCard}>
    <CardHeader>
      <div className={styles.newsDate}>{date}</div>
      <CardTitle className={styles.newsTitle}>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className={styles.newsDescription}>{summary}</CardDescription>
    </CardContent>
    <CardFooter>
      <Link href={link} className={styles.newsLink}>
        Read more <ArrowRight className={styles.arrowIcon} />
      </Link>
    </CardFooter>
  </Card>
);

// Certification badge component
const CertificationBadge = ({ name }: { name: string }) => (
  <div className={styles.certificationBadge}>{name}</div>
);

export default function EvolutionSGLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: Replacements;
}) {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const overviewRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const companiesRef = useRef(null);
  const expertiseRef = useRef(null);
  const solutionsRef = useRef(null);
  const caseStudyRef = useRef(null);
  const ctaRef = useRef(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: "-100px" });
  const whatWeDoInView = useInView(whatWeDoRef, { once: true, margin: "-100px" });
  const companiesInView = useInView(companiesRef, { once: true, margin: "-100px" });
  const expertiseInView = useInView(expertiseRef, { once: true, margin: "-100px" });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const caseStudyInView = useInView(caseStudyRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Leaf className={styles.logoIcon} />
            <span className={styles.logoText}>Evolution SG</span>
          </div>
          <nav className={styles.nav}>
            <Link href="#overview" className={styles.navLink}>
              Overview
            </Link>
            <Link href="#what-we-do" className={styles.navLink}>
              What We Do
            </Link>
            <Link href="#expertise" className={styles.navLink}>
              Expertise
            </Link>
            <Link href="#solutions" className={styles.navLink}>
              Solutions
            </Link>
            <Link href="#case-study" className={styles.navLink}>
              Case Study
            </Link>
            <Link href="#news" className={styles.navLink}>
              News
            </Link>
          </nav>
          <Button className={styles.contactButton}>Contact Us</Button>
        </div>
      </header>

      <main className={styles.main}>
        <motion.section
          className={styles.hero}
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className={styles.heroOverlay} />
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Sustainable building"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>Sustainable Energy Solutions</div>
            <h1 className={styles.heroTitle}>
              <ReplaceText
                text="Optimize Building Efficiency. <span class='text-primary'>Stabilize Energy Costs.</span> Simplify ESG Compliance."
                replacements={replacements}
              />
            </h1>
            <p className={styles.heroDescription}>
              <ReplaceText
                text="Evolution Sustainability Group delivers practical, innovative, and cost-effective energy solutions to empower {company}'s sustainability goals."
                replacements={replacements}
              />
            </p>
            <div className={styles.heroButtons}>
              <Button size="lg" className={styles.heroButton}>
                Schedule Your Free Audit
              </Button>
              <Button size="lg" variant="outline" className={styles.heroButtonOutline}>
                Learn More
              </Button>
            </div>
          </div>
          <div className={styles.heroScroll}>
            <ChevronRight className={styles.scrollIcon} />
          </div>
        </motion.section>

        <section className={styles.impactSection}>
          <div className={styles.container}>
            <div className={styles.impactGrid}>
              <AnimatedCounter value={341414705711} label="BTUs Decreased" suffix="" />
              <AnimatedCounter value={138962992} label="lbs of CO2e Avoided" suffix="" />
              <AnimatedCounter value={15008823} label="Saved for Clients" prefix="$" />
            </div>
          </div>
        </section>

        <section id="overview" className={styles.overviewSection} ref={overviewRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={overviewInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="Empowering Sustainable Futures"
                  subtitle="Evolution Sustainability Group develops practical, innovative, and cost-effective energy solutions to empower clients' sustainability goals."
                />
              </motion.div>
              <div className={styles.overviewGrid}>
                <motion.div variants={itemVariants} className={styles.overviewText}>
                  <h3 className={styles.overviewSubtitle}>Comprehensive Energy Solutions</h3>
                  <p className={styles.overviewDescription}>
                    We offer a comprehensive suite of services across energy procurement, building optimization, and ESG
                    compliance, tailored to your specific needs and goals.
                  </p>
                  <ul className={styles.overviewList}>
                    {[
                      "Mitigate risk and enhance asset value",
                      "Reduce operational costs and improve efficiency",
                      "Support corporate citizenship and sustainability goals",
                      "Simplify regulatory compliance and reporting",
                      "Optimize building performance and occupant comfort",
                    ].map((item, i) => (
                      <li key={i} className={styles.overviewListItem}>
                        <CheckCircle2 className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={itemVariants} className={styles.overviewImage}>
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Sustainable building solutions"
                    fill
                    className={styles.imageCover}
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayContent}>
                      <div className={styles.overlayTitle}>Collaborative Approach</div>
                      <p className={styles.overlayDescription}>
                        We work closely with our clients to understand their unique challenges and develop customized
                        solutions that deliver measurable results.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="what-we-do" className={styles.whatWeDoSection} ref={whatWeDoRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={whatWeDoInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="What We Do"
                  subtitle="We take a collaborative approach to develop customized solutions that deliver measurable results for our clients."
                />
              </motion.div>
              <motion.div variants={itemVariants} className={styles.whatWeDoGrid}>
                <div className={styles.whatWeDoCard}>
                  <div className={styles.cardIcon}>
                    <LineChart className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>Mitigate Risk</h3>
                  <p className={styles.cardDescription}>
                    Protect your assets from energy price volatility and regulatory changes with our strategic
                    procurement and compliance solutions.
                  </p>
                </div>
                <div className={styles.whatWeDoCard}>
                  <div className={styles.cardIcon}>
                    <Building2 className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>Enhance Asset Value</h3>
                  <p className={styles.cardDescription}>
                    Improve building performance, reduce operational costs, and increase property value through our
                    comprehensive optimization services.
                  </p>
                </div>
                <div className={styles.whatWeDoCard}>
                  <div className={styles.cardIcon}>
                    <Leaf className={styles.icon} />
                  </div>
                  <h3 className={styles.cardTitle}>Support Corporate Citizenship</h3>
                  <p className={styles.cardDescription}>
                    Demonstrate your commitment to sustainability and social responsibility with our ESG reporting and
                    compliance solutions.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className={styles.collaborativeSection}>
                <div className={styles.collaborativeContent}>
                  <h3 className={styles.collaborativeTitle}>Our Collaborative Approach</h3>
                  <p className={styles.collaborativeDescription}>
                    We work closely with our clients to understand their unique challenges and develop customized
                    solutions that deliver measurable results. Our team of experts brings decades of experience in energy
                    management, building optimization, and sustainability to every project.
                  </p>
                  <Button className={styles.collaborativeButton}>Learn About Our Process</Button>
                </div>
                <div className={styles.collaborativeImage}>
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Collaborative approach"
                    width={300}
                    height={300}
                    className={styles.imageRounded}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className={styles.companiesSection} ref={companiesRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={companiesInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="Our Family of Companies"
                  subtitle="Our specialized companies work together to provide comprehensive solutions for all your energy and sustainability needs."
                />
              </motion.div>
              <motion.div variants={itemVariants} className={styles.companiesGrid}>
                <CompanyCard
                  title="Evolution Energy Partners"
                  description="Specializing in energy procurement, risk management, and market intelligence to optimize your energy costs and mitigate price volatility."
                  icon={<LineChart className={styles.icon} />}
                />
                <CompanyCard
                  title="Evolution Engineering Partners"
                  description="Delivering building optimization solutions, energy audits, and efficiency projects to reduce consumption and improve building performance."
                  icon={<Building2 className={styles.icon} />}
                />
                <CompanyCard
                  title="Evolution ESG Partners"
                  description="Providing comprehensive ESG strategy, reporting, and compliance solutions to help you meet regulatory requirements and stakeholder expectations."
                  icon={<FileText className={styles.icon} />}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="expertise" className={styles.expertiseSection} ref={expertiseRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={expertiseInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="Areas of Expertise"
                  subtitle="Our comprehensive suite of services addresses all aspects of energy management and sustainability."
                />
              </motion.div>
              <motion.div variants={itemVariants} className={styles.expertiseGrid}>
                <ServiceCard
                  icon={<LineChart className={styles.icon} />}
                  title="Energy Procurement & Management"
                  description="Strategic energy procurement, risk management, and market intelligence to optimize costs and mitigate price volatility."
                />
                <ServiceCard
                  icon={<BarChart3 className={styles.icon} />}
                  title="Budgeting & Financial Planning"
                  description="Comprehensive energy budgeting, forecasting, and financial analysis to support your planning and decision-making."
                />
                <ServiceCard
                  icon={<FileText className={styles.icon} />}
                  title="ESG Strategy & Reporting"
                  description="Develop and implement ESG strategies, reporting frameworks, and compliance solutions to meet regulatory requirements."
                />
                <ServiceCard
                  icon={<Leaf className={styles.icon} />}
                  title="Renewable Energy & Project Financing"
                  description="Renewable energy procurement, on-site generation, and innovative financing solutions to achieve your sustainability goals."
                />
                <ServiceCard
                  icon={<Building2 className={styles.icon} />}
                  title="Building Energy Efficiency"
                  description="Energy audits, retrofits, and optimization projects to reduce consumption and improve building performance."
                />
                <ServiceCard
                  icon={<LightbulbIcon className={styles.icon} />}
                  title="Building Certifications"
                  description="Support for LEED, BREEAM, WELL, and other certification programs to demonstrate your commitment to sustainability."
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="solutions" className={styles.solutionsSection} ref={solutionsRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={solutionsInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="Industry-Specific Solutions"
                  subtitle="Tailored approaches for your unique challenges and opportunities."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                {/* Replaced Tabs with a simple div layout */}
                <div className={styles.solutionsContent}>
                  {/* Student Housing Section */}
                  <div className={styles.solutionsItem}>
                    <h3 className={styles.solutionsSubtitle}>
                      <GraduationCap className={styles.tabIcon} /> Purpose-Built Student Accommodation
                    </h3>
                    <div className={styles.solutionsGrid}>
                      <div>
                        <div className={styles.challengesSection}>
                          <h4 className={styles.challengesTitle}>The Challenges</h4>
                          <ul className={styles.challengesList}>
                            {[
                              "Rising energy costs impacting operational budgets",
                              "Regulatory compliance with MEES and EPBD directives",
                              "Meeting ESG and net-zero commitments",
                              "Student expectations for sustainable living environments",
                            ].map((item, i) => (
                              <li key={i} className={styles.challengesItem}>
                                <div className={styles.challengeIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className={styles.solutionsTitle}>Our Solution</h4>
                          <ul className={styles.solutionsList}>
                            {[
                              "Building optimization (HVAC, LED retrofits, BMS)",
                              "Strategic energy procurement and renewable transitions",
                              "ESG compliance strategies and reporting",
                              "Certification support (LEED, BREEAM, etc.)",
                            ].map((item, i) => (
                              <li key={i} className={styles.solutionsItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div>
                        <div className={styles.benefitsSection}>
                          <h4 className={styles.benefitsTitle}>Financial Benefits</h4>
                          <div className={styles.benefitsGrid}>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>£91K</div>
                              <div className={styles.benefitLabel}>Annual Savings</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>1.4M lbs</div>
                              <div className={styles.benefitLabel}>CO2 Reduction</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>2.8 years</div>
                              <div className={styles.benefitLabel}>Payback Period</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>£29K</div>
                              <div className={styles.benefitLabel}>Positive Cash Flow</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className={styles.certificationsTitle}>Certifications</h4>
                          <div className={styles.certificationsList}>
                            {["LEED", "BREEAM", "Passive House", "Fitwel", "WELL", "Green Globes", "ISO 50001"].map(
                              (cert, i) => (
                                <CertificationBadge key={i} name={cert} />
                              ),
                            )}
                          </div>
                          <h4 className={styles.trustedTitle}>Trusted By</h4>
                          <div className={styles.trustedLogos}>
                            <div className={styles.logoPlaceholder}>
                              <Image
                                src="/images/evolution-sg/american-campus-communities-logo.png"
                                alt="American Campus Communities logo"
                                width={120}
                                height={60}
                                className={styles.logoImage}
                              />
                            </div>
                            <div className={styles.logoPlaceholder}>
                              <Image
                                src="/images/evolution-sg/gsa-logo.png"
                                alt="GSA logo"
                                width={120}
                                height={60}
                                className={styles.logoImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hotels & Hospitality Section */}
                  <div className={styles.solutionsItem}>
                    <h3 className={styles.solutionsSubtitle}>
                      <Hotel className={styles.tabIcon} /> Hotels & Hospitality
                    </h3>
                    <div className={styles.solutionsGrid}>
                      <div>
                        <div className={styles.challengesSection}>
                          <h4 className={styles.challengesTitle}>The Challenges</h4>
                          <ul className={styles.challengesList}>
                            {[
                              "Sustainability pressures from guests and stakeholders",
                              "Rising energy costs affecting operational margins",
                              "Regulatory compliance with EU Green Deal directives",
                              "Maintaining guest experience while reducing consumption",
                            ].map((item, i) => (
                              <li key={i} className={styles.challengesItem}>
                                <div className={styles.challengeIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className={styles.solutionsTitle}>Our Solution</h4>
                          <ul className={styles.solutionsList}>
                            {[
                              "Energy audits and efficiency retrofits",
                              "Renewable energy procurement strategies",
                              "ESG reporting and compliance frameworks",
                              "Guest-facing sustainability initiatives",
                            ].map((item, i) => (
                              <li key={i} className={styles.solutionsItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div>
                        <div className={styles.benefitsSection}>
                          <h4 className={styles.benefitsTitle}>Financial Benefits</h4>
                          <div className={styles.benefitsGrid}>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>£200K</div>
                              <div className={styles.benefitLabel}>Annual Savings</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>423K lbs</div>
                              <div className={styles.benefitLabel}>CO2 Reduction</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>3.2 years</div>
                              <div className={styles.benefitLabel}>Payback Period</div>
                            </div>
                            <div className={styles.benefitCard}>
                              <div className={styles.benefitValue}>£65K</div>
                              <div className={styles.benefitLabel}>Positive Cash Flow</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className={styles.certificationsTitle}>Certifications</h4>
                          <div className={styles.certificationsList}>
                            {["LEED", "BREEAM", "Green Key", "EarthCheck", "ISO 14001", "WELL", "Green Globe"].map(
                              (cert, i) => (
                                <CertificationBadge key={i} name={cert} />
                              ),
                            )}
                          </div>
                          <h4 className={styles.trustedTitle}>Trusted By</h4>
                          <div className={styles.trustedLogos}>
                            <div className={styles.logoPlaceholder}>
                              <Image
                                src="/images/evolution-sg/marriott-logo.png"
                                alt="Marriott logo"
                                width={120}
                                height={60}
                                className={styles.logoImage}
                              />
                            </div>
                            <div className={styles.logoPlaceholder}>
                              <Image
                                src="/images/evolution-sg/hilton-logo.png"
                                alt="Hilton logo"
                                width={120}
                                height={60}
                                className={styles.logoImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="case-study" className={styles.caseStudySection} ref={caseStudyRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={caseStudyInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <SectionHeader
                  title="Success Story: GSA Partnership"
                  subtitle="See how we helped Global Student Accommodation achieve significant energy savings and sustainability goals."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className={styles.caseStudyCard}>
                  <div className={styles.caseStudyContent}>
                    <div className={styles.caseStudyHeader}>
                      <div className={styles.caseStudyLogo}>
                        <Image
                          src="/images/evolution-sg/gsa-logo.png"
                          alt="GSA logo"
                          width={60}
                          height={60}
                          className={styles.logoRounded}
                        />
                      </div>
                      <div>
                        <h3 className={styles.caseStudyTitle}>Global Student Accommodation</h3>
                        <p className={styles.caseStudySubtitle}>Purpose-Built Student Accommodation</p>
                      </div>
                    </div>
                    <div className={styles.caseStudyDetails}>
                      <div>
                        <h4 className={styles.caseStudySubTitle}>The Challenge</h4>
                        <p className={styles.caseStudyDescription}>
                          GSA needed to reduce energy costs across their portfolio while meeting ambitious sustainability
                          targets and improving the student experience.
                        </p>
                      </div>
                      <div>
                        <h4 className={styles.caseStudySubTitle}>Our Approach</h4>
                        <ul className={styles.caseStudyList}>
                          {[
                            "Comprehensive energy audits across multiple properties",
                            "Implementation of LED lighting and HVAC optimization",
                            "Strategic energy procurement and renewable energy integration",
                            "ESG reporting and certification support",
                          ].map((item, i) => (
                            <li key={i} className={styles.caseStudyItem}>
                              <CheckCircle2 className={styles.checkIcon} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className={styles.caseStudySubTitle}>The Results</h4>
                        <div className={styles.resultsGrid}>
                          <div className={styles.resultCard}>
                            <div className={styles.resultValue}>£91K</div>
                            <div className={styles.resultLabel}>Annual Savings</div>
                          </div>
                          <div className={styles.resultCard}>
                            <div className={styles.resultValue}>1.4M lbs</div>
                            <div className={styles.resultLabel}>CO2 Reduction</div>
                          </div>
                          <div className={styles.resultCard}>
                            <div className={styles.resultValue}>2.8 years</div>
                            <div className={styles.resultLabel}>Payback Period</div>
                          </div>
                          <div className={styles.resultCard}>
                            <div className={styles.resultValue}>£29K</div>
                            <div className={styles.resultLabel}>Positive Cash Flow</div>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="https://www.linkedin.com/feed/update/urn:li:activity:7285673270392070145/"
                        target="_blank"
                        className={styles.caseStudyLink}
                      >
                        Read the full case study on LinkedIn <ArrowRight className={styles.arrowIcon} />
                      </Link>
                    </div>
                  </div>
                  <div className={styles.caseStudyImage}>
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="GSA student accommodation"
                      fill
                      className={styles.imageCover}
                    />
                    <div className={styles.imageOverlay}>
                      <div className={styles.overlayContent}>
                        <div className={styles.overlayTitle}>
                          &quot;Evolution Sustainability Group has been a valuable partner in helping us achieve our sustainability goals.&quot;
                        </div>
                        <p className={styles.overlayDescription}>
                          - Director of Sustainability, Global Student Accommodation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className={styles.ctaSection} ref={ctaRef}>
          <div className={styles.container}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              className={styles.ctaCard}
            >
              <div className={styles.ctaGrid}>
                <motion.div variants={itemVariants}>
                  <h2 className={styles.ctaTitle}>
                    Uncover Hidden Fees and Stabilize Your Energy Costs
                  </h2>
                  <p className={styles.ctaDescription}>
                    Our free energy procurement audit will help you identify opportunities to reduce costs, mitigate
                    risk, and enhance your sustainability profile.
                  </p>
                  <div className={styles.ctaButtons}>
                    <Button size="lg" variant="secondary" className={styles.ctaButton}>
                      Schedule Your Free Audit
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className={styles.ctaButtonOutline}
                    >
                      Contact Sales
                    </Button>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className={styles.ctaImage}>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Energy audit"
                    fill
                    className={styles.imageCover}
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayContent}>
                      <div className={styles.overlayTitle}>Trusted by Industry Leaders</div>
                      <div className={styles.partnerLogos}>
                        {["Morgan Stanley", "Blackstone", "Harrison Street", "Ventas"].map((partner, i) => (
                          <div key={i} className={styles.partnerLogo}>
                            {partner}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className={styles.newsSection}>
          <div className={styles.container}>
            <SectionHeader
              title="News & Updates"
              subtitle="Stay informed about the latest developments in energy management and sustainability."
            />
            <div className={styles.newsGrid}>
              <NewsCard
                title="Strategic Partnership with Novele Announced"
                date="March 15, 2023"
                summary="Evolution Sustainability Group partners with Novele to expand building optimization capabilities and enhance client offerings."
                link="#"
              />
              <NewsCard
                title="Energy Management in Commercial Real Estate"
                date="February 28, 2023"
                summary="Our latest whitepaper explores innovative approaches to energy management in commercial real estate and the impact on asset value."
                link="#"
              />
              <NewsCard
                title="Hotel Industry Sustainability Trends"
                date="January 12, 2023"
                summary="Discover the latest sustainability trends in the hotel industry and how leading brands are reducing their environmental impact."
                link="#"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerLogo}>
                <Leaf className={styles.logoIcon} />
                <span className={styles.logoText}>Evolution SG</span>
              </div>
              <p className={styles.footerDescription}>
                Practical, innovative, and cost-effective energy solutions to empower your sustainability goals.
              </p>
              <div className={styles.socialLinks}>
                <Link href="#" className={styles.socialLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.socialIcon}
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className={styles.socialLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.socialIcon}
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className={styles.socialLink}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.socialIcon}
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Solutions</h4>
              <ul className={styles.footerList}>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Energy Procurement
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Building Optimization
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    ESG Compliance
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Renewable Energy
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Certifications
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Industries</h4>
              <ul className={styles.footerList}>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Student Housing
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Hotels & Hospitality
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Commercial Real Estate
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.footerLink}>
                    Industrial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerTitle}>Contact Us</h4>
              <ul className={styles.footerList}>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.contactIcon}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (215) 555-1234</span>
                </li>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.contactIcon}
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@evolutionsg.com</span>
                </li>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.contactIcon}
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>
                    1234 Market Street, Suite 500
                    <br />
                    Philadelphia, PA 19107
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} Evolution Sustainability Group. All rights reserved.
            </p>
            <div className={styles.footerLinks}>
              <Link href="#" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link href="#" className={styles.footerLink}>
                Terms of Service
              </Link>
              <Link href="#" className={styles.footerLink}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}