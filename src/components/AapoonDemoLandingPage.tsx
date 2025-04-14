// src/components/AapoonDemoLandingPage.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Shield, Zap, Server, Globe, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import styles from "@/components/styles/AapoonDemo.module.css";

interface AapoonDemoLandingPageProps {
  firstName?: string;
  company?: string;
}

export default function AapoonDemoLandingPage({
  firstName = "Alex",
  company = "TechVentures",
}: AapoonDemoLandingPageProps) {
  // Navigation Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quantum Threat Visual Animation (Adapted from QuantumThreatVisual)
  const QuantumThreatVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        const elements = container.querySelectorAll(`.${styles.animateElement}`);
        elements.forEach((el) => {
          const element = el as HTMLElement;
          const factor = Number.parseFloat(element.dataset.factor || "1");
          element.style.transform = `translate(${x * 20 * factor}px, ${y * 20 * factor}px)`;
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <div ref={containerRef} className={styles.quantumThreatVisual}>
        <div className={styles.quantumGrid}></div>
        <div className={`${styles.animateElement} ${styles.brokenLock}`} data-factor="1.5">
          <div className={styles.lockWrapper}>
            <Image
              src="/images/broken-lock.svg"
              alt="Broken encryption"
              width={300}
              height={300}
              className={styles.lockImage}
            />
            <div className={styles.pingEffect}>
              <div className={styles.pingCircle}></div>
            </div>
          </div>
        </div>
        <div className={`${styles.animateElement} ${styles.quantumComputer}`} data-factor="1">
          <Image src="/images/quantum-computer.svg" alt="Quantum computer" width={200} height={200} />
        </div>
        <div className={`${styles.animateElement} ${styles.binaryData}`} data-factor="2">
          <div className={styles.binaryText}>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={styles.binaryRow}>
                  {Array(20)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} className={j % 3 === 0 ? styles.highlightedBit : ""}>
                        {Math.random() > 0.5 ? "1" : "0"}
                      </span>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <div className={`${styles.animateElement} ${styles.warningIndicator}`} data-factor="1.2">
          <div className={styles.warningText}>ENCRYPTION VULNERABLE</div>
        </div>
      </div>
    );
  };

  // Scroll Reveal Component (Adapted from ScrollReveal)
  const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: delay * 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
    );
  };

  // Security Transition Component (Adapted from SecurityTransition)
  const SecurityTransition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      const currentRef = containerRef.current;
      if (currentRef) observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }, []);

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
    });

    return (
      <div ref={containerRef} className={styles.securityTransition}>
        <div className={styles.transitionWrapper}>
          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]),
              scale: useTransform(scrollYProgress, [0, 0.4], [1, 0.9]),
            }}
          >
            <div className={styles.vulnerableState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.warningIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Vulnerable Communications</h3>
              </div>
              <div className={styles.stateContent}>
                <div>
                  <ul className={styles.stateList}>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Standard encryption vulnerable to quantum attacks</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Data harvesting for future decryption</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.crossIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Intellectual property at risk</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.stateImage}>
                  <Image src="/images/vulnerable-data.svg" alt="Vulnerable data" fill className={styles.image} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 1, 0.9]),
            }}
          >
            <div className={styles.transitioningState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.transitionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Transition to Quantum Security</h3>
              </div>
              <div className={styles.transitionImage}>
                <div className={styles.transitionImageWrapper}>
                  <Image
                    src="/images/security-transition.svg"
                    alt="Security transition"
                    width={500}
                    height={200}
                    className={styles.image}
                  />
                  <div className={styles.transitionPing}>
                    <div className={styles.pingCircle}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.transitionState}
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 1], [0, 1]),
              scale: useTransform(scrollYProgress, [0.6, 1], [0.9, 1]),
            }}
          >
            <div className={styles.secureState}>
              <div className={styles.stateHeader}>
                <div className={styles.stateIcon}>
                  <svg className={styles.secureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className={styles.stateTitle}>Quantum-Resistant Security</h3>
              </div>
              <div className={styles.stateContent}>
                <div>
                  <ul className={styles.stateList}>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Post-quantum cryptography algorithms</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Future-proof data sovereignty</span>
                    </li>
                    <li className={styles.listItem}>
                      <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure against both classical and quantum attacks</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.stateImage}>
                  <Image src="/images/secure-data.svg" alt="Secure data" fill className={styles.image} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Product Feature Component (Adapted from ProductFeature)
  const ProductFeature = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className={styles.productFeature}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );

  // Testimonial Slider Component (Adapted from TestimonialSlider)
  const TestimonialSlider = () => {
    const testimonials = [
      {
        id: 1,
        quote:
          "aapoon’s Quantum Resistant Communication Suite positions them as a leader in the quantum-safe cybersecurity market—a must-watch for investors.",
        author: "Sarah Johnson",
        title: "CIO, Global Financial Services",
        logo: "/images/company-logo-1.svg",
      },
      {
        id: 2,
        quote:
          "The scalability of aapoon’s Quantum Secure VPN makes it a game-changer for industries facing quantum threats. A solid investment opportunity.",
        author: "Michael Chen",
        title: "CISO, Healthcare Technologies",
        logo: "/images/company-logo-2.svg",
      },
      {
        id: 3,
        quote:
          "aapoon’s alignment with NIST standards and federal mandates ensures long-term growth potential in the cybersecurity sector.",
        author: "Elena Rodriguez",
        title: "VP of Technology, Government Sector",
        logo: "/images/company-logo-3.svg",
      },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToPrevious = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, testimonials.length]);

    const goToNext = useCallback(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, testimonials.length]);

    useEffect(() => {
      const interval = setInterval(goToNext, 8000);
      return () => clearInterval(interval);
    }, [goToNext]);

    return (
      <div className={styles.testimonialSlider}>
        <div className={styles.sliderWrapper}>
          <div
            className={`${styles.sliderTrack} ${isAnimating ? styles.sliderAnimating : ""}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className={styles.sliderItems}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.sliderItem}>
                  <div className={styles.testimonialContent}>
                    <div className={styles.testimonialLogo}>
                      <Image
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={`${testimonial.author}'s company`}
                        width={120}
                        height={40}
                        className={styles.logoImage}
                      />
                    </div>
                    <blockquote className={styles.testimonialQuote}>
                      <p className={styles.quoteText}>&quot;{testimonial.quote}&quot;</p>
                      <footer className={styles.quoteFooter}>
                        <div className={styles.authorWrapper}>
                          <div className={styles.authorAvatar}></div>
                          <div>
                            <p className={styles.authorName}>{testimonial.author}</p>
                            <p className={styles.authorTitle}>{testimonial.title}</p>
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.sliderDots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <button
          className={styles.sliderButtonPrev}
          onClick={goToPrevious}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className={styles.sliderIcon} />
        </button>
        <button
          className={styles.sliderButtonNext}
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          <ChevronRight className={styles.sliderIcon} />
        </button>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <Image
              src="/images/aapoon-logo.svg"
              alt="aapoon"
              width={120}
              height={40}
              priority
            />
          </Link>
          <Link href="https://cal.com/aapoon/demo" className={styles.ctaButton}>
            Book a Demo
            <ArrowRight className={styles.ctaIcon} />
          </Link>
        </div>
      </header>

                        {/* Hero Section */}
                        <section className={styles.heroSection}>
                            <div className={styles.heroBackground}></div>
                            <div className={styles.sectionContainer}>
                                <div className={styles.heroContent}>
                                    <ScrollReveal>
                                        <div className={styles.heroText}>
                                            <div className={styles.alertBadge}>
                                                Quantum Security Alert
                                            </div>
                                            <h1 className={styles.heroTitle}>
                                                {firstName}, The Quantum Threat Could Disrupt {company}&apos;s Portfolio
                                            </h1>
                                            <p className={styles.heroSubtitle}>
                                                Quantum computers will soon break today’s encryption, creating a $1T+ cybersecurity market opportunity. aapoon is leading the charge.
                                            </p>
                                            <div className={styles.heroButtons}>
                                                <Link href="https://cal.com/aapoon/demo" className={styles.ctaButton}>
                                                    Book a Demo
                                                    <ArrowRight className={styles.ctaIcon} />
                                                </Link>
                                                <Link href="#solution" className={styles.secondaryButton}>
                                                    Learn More
                                                </Link>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal delay={200}>
                                        <div className={styles.heroVisual}>
                                            <QuantumThreatVisual />
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </section>

                        {/* Problem Statement Section */}
                        <section className={styles.problemSection}>
                            <div className={styles.sectionContainer}>
                                <ScrollReveal>
                                    <div className={styles.sectionHeader}>
                                        <h2 className={styles.sectionTitle}>The Quantum Threat Is Real</h2>
                                        <p className={styles.sectionSubtitle}>
                                            Quantum computers, using Shor’s algorithm, can break RSA-2048 encryption in hours, exposing a massive market gap.
                                        </p>
                                    </div>
                                </ScrollReveal>
                                <div className={styles.problemGrid}>
                                    <ScrollReveal delay={100}>
                                        <div className={styles.problemCard}>
                                            <div className={styles.cardIcon}>
                                                <Lock className={styles.icon} />
                                            </div>
                                            <h3 className={styles.cardTitle}>Encryption Vulnerability</h3>
                                            <p className={styles.cardDescription}>
                                                RSA, ECC, and DSA will be obsolete, creating urgent demand for quantum-resistant solutions.
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal delay={200}>
                                        <div className={styles.problemCard}>
                                            <div className={styles.cardIcon}>
                                                <Shield className={styles.icon} />
                                            </div>
                                            <h3 className={styles.cardTitle}>Regulatory Pressure</h3>
                                            <p className={styles.cardDescription}>
                                                The Quantum Computing Cybersecurity Preparedness Act mandates PQC adoption by 2030 for federal agencies.
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal delay={300}>
                                        <div className={styles.problemCard}>
                                            <div className={styles.cardIcon}>
                                                <Zap className={styles.icon} />
                                            </div>
                                            <h3 className={styles.cardTitle}>Market Opportunity</h3>
                                            <p className={styles.cardDescription}>
                                                Enterprises across banking, healthcare, and defense need PQC solutions, creating a scalable market for investors.
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </section>

                        {/* Transition Visual Section */}
                        <section className={styles.transitionSection}>
                            <div className={styles.sectionContainer}>
                                <ScrollReveal>
                                    <div className={styles.sectionHeader}>
                                        <h2 className={styles.sectionTitle}>The Path to Quantum Security</h2>
                                        <p className={styles.sectionSubtitle}>
                                            aapoon bridges the gap from vulnerability to quantum-safe protection.
                                        </p>
                                    </div>
                                </ScrollReveal>
                                <div className={styles.transitionVisual}>
                                    <SecurityTransition />
                                </div>
                            </div>
                        </section>

                        {/* Solution Section */}
                        <section className={styles.solutionSection}>
                            <div className={styles.sectionContainer}>
                                <ScrollReveal>
                                    <div className={styles.sectionHeader}>
                                        <div className={styles.solutionBadge}>The Solution</div>
                                        <h2 className={styles.sectionTitle}>Quantum Resistant Communication Suite</h2>
                                        <p className={styles.sectionSubtitle}>
                                            aapoon delivers scalable, NIST-compliant solutions for the quantum era.
                                        </p>
                                    </div>
                                </ScrollReveal>
                                <div className={styles.solutionContent}>
                                    <ScrollReveal>
                                        <div className={styles.solutionFeatures}>
                                            <ProductFeature
                                                icon={<Shield className={styles.icon} />}
                                                title="Quantum Secure VPN"
                                                description="Protect remote access with post-quantum encryption, featuring kill switch, multi-region nodes, and stealth mode."
                                            />
                                            <ProductFeature
                                                icon={<Server className={styles.icon} />}
                                                title="Quantum Secure Wrapper"
                                                description="Integrate PQC into existing systems with zero latency, ensuring compliance in banking, healthcare, and defense."
                                            />
                                            <ProductFeature
                                                icon={<Globe className={styles.icon} />}
                                                title="Future-Proof Compliance"
                                                description="Align with NIST PQC standards and federal mandates, ensuring long-term market relevance."
                                            />
                                        </div>
                                    </ScrollReveal>
                                    <ScrollReveal delay={200}>
                                        <div className={styles.solutionImage}>
                                            <Image
                                                src="/images/quantum-product.svg"
                                                alt="Quantum Resistant Communication Suite"
                                                width={600}
                                                height={400}
                                                className={styles.image}
                                            />
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </section>

                        {/* Testimonials Section */}
                        <section className={styles.testimonialsSection}>
                            <div className={styles.sectionContainer}>
                                <ScrollReveal>
                                    <div className={styles.sectionHeader}>
                                        <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
                                        <p className={styles.sectionSubtitle}>
                                            Hear why top organizations are partnering with aapoon.
                                        </p>
                                    </div>
                                </ScrollReveal>
                                <TestimonialSlider />
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className={styles.ctaSection}>
                            <div className={styles.sectionContainer}>
                                <ScrollReveal>
                                    <div className={styles.ctaContent}>
                                        <h2 className={styles.ctaTitle}>
                                            {firstName}, Invest in the Future of Cybersecurity with aapoon
                                        </h2>
                                        <p className={styles.ctaSubtitle}>
                                            Join the quantum-safe revolution and secure {company}&apos;s portfolio for the future.
                                        </p>
                                        <Link href="https://cal.com/aapoon/demo" className={styles.ctaButton}>
                                            Book a Demo
                                            <ArrowRight className={styles.ctaIcon} />
                                        </Link>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className={styles.footer}>
                            <div className={styles.footerContainer}>
                                <div className={styles.footerContent}>
                                    <div>
                                        <Image
                                            src="/images/aapoon-logo-white.svg"
                                            alt="aapoon"
                                            width={120}
                                            height={40}
                                            className={styles.footerLogo}
                                        />
                                        <p className={styles.footerText}>
                                            Quantum-resistant communication solutions for the future.
                                        </p>
                                    </div>
                                    <div className={styles.footerLinks}>
                                        <Link href="/privacy" className={styles.footerLink}>
                                            Privacy Policy
                                        </Link>
                                        <Link href="/terms" className={styles.footerLink}>
                                            Terms of Service
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.footerBottom}>
                                    <p className={styles.footerText}>
                                        © {new Date().getFullYear()} aapoon. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                );
            }
