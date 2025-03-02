"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  History,
  AlertCircle,
  Users,
  LinkIcon,
  Timer,
  Shield,
  User,
  Gauge,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/QASolveLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function QASolveLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Refs for animation triggers
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Animation controls
  const navControls = useAnimation();
  const heroControls = useAnimation();
  const comparisonControls = useAnimation();
  const featuresControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  // InView hooks
  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const comparisonInView = useInView(comparisonRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  // Trigger animations
  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (comparisonInView) comparisonControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (testimonialsInView) testimonialsControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    comparisonInView,
    featuresInView,
    testimonialsInView,
    ctaInView,
    footerInView,
    navControls,
    heroControls,
    comparisonControls,
    featuresControls,
    testimonialsControls,
    ctaControls,
    footerControls,
  ]);

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: Math.random() > 0.5 ? "#5dbdf1" : "#3e65b2",
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }

      requestAnimationFrame(animateParticles);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.length = 0;
      createParticles();
    };

    createParticles();
    animateParticles();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const testimonials = [
    {
      quote: "QASolve AI agents test our app without needing the codebase. It&apos;s easy to adapt!",
      author: "Joy Dasgupta, CEO",
    },
    {
      quote: "QASolve generated 1000+ test cases in weeks—a critical tool for every release.",
      author: "Sahil Gore, Head of Engineering",
    },
    {
      quote: "QASolve validates our SaaS apps on multiple devices, reducing QA time and cost.",
      author: "Deepak Verma, CEO",
    },
  ];

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
              src="/images/abm/qasolve/logo.webp"
              alt="QASolve Logo"
              width={240}
              height={80}
            />
          </div>
          <Button
            className={styles.navCta}
            onClick={() => window.location.href = "#request-a-demo"}
          >
            Request a Demo
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
        <canvas ref={particleCanvasRef} className={styles.particles}></canvas>
        <div className={styles.heroContent}>
          <motion.h1 variants={fadeInUp}>
            <ReplaceText
              text="Hey {first_name}, Accelerate {company}’s Product Development with QASolve"
              replacements={replacements}
            />
          </motion.h1>
          <motion.p variants={fadeInUp}>
            <ReplaceText
              text="QASolve’s AI-driven solutions streamline testing, reduce errors, and speed up product delivery—empowering {company} to achieve flawless quality in just 1-2 weeks."
              replacements={replacements}
            />
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button
              className={styles.ctaButton}
              onClick={() => window.location.href = "#request-a-demo"}
            >
              Request a Demo
            </Button>
          </motion.div>
          <motion.div className={styles.heroAnimation} variants={fadeInUp}>
            <Image
              src="/images/abm/qasolve/test-animation.gif"
              alt="AI-powered test case generation"
              width={600}
              height={600}
              className={styles.animatedElement}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* With Us / Without Us Section */}
      <motion.section
        ref={comparisonRef}
        className={styles.comparison}
        initial="hidden"
        animate={comparisonControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="Testing Challenges Solved for {company}"
            replacements={replacements}
          />
        </motion.h2>
        <div className={styles.comparisonColumns}>
          <motion.div className={styles.withoutUs} variants={staggerChildren}>
            <motion.h3 variants={fadeInUp}>Without Us</motion.h3>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <Clock className={styles.icon} />
              </div>
              <p>Evaluation takes months, requiring coding effort.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <History className={styles.icon} />
              </div>
              <p>80% test coverage in 3-4 months.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <AlertCircle className={styles.icon} />
              </div>
              <p>Manual maintenance leads to broken tests.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <Users className={styles.icon} />
              </div>
              <p>15%-25% team effort for regression testing.</p>
            </motion.div>
          </motion.div>

          <motion.div className={styles.withUs} variants={staggerChildren}>
            <motion.h3 variants={fadeInUp}>With Us</motion.h3>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <LinkIcon className={styles.icon} />
              </div>
              <p>High-coverage tests from just a URL in 30 days.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <Timer className={styles.icon} />
              </div>
              <p>80%+ test coverage in 3-4 days.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <Shield className={styles.icon} />
              </div>
              <p>Self-healing tests adapt to app changes.</p>
            </motion.div>
            <motion.div className={styles.comparisonCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <User className={styles.icon} />
              </div>
              <p>Minimal effort—QASolve handles it all.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className={styles.features}
        initial="hidden"
        animate={featuresControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="Why QASolve is Right for {company}"
            replacements={replacements}
          />
        </motion.h2>
        <motion.div className={styles.featureGrid} variants={staggerChildren}>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <Gauge className={styles.featureIcon} />
            </div>
            <h3>Accelerate Sprint Cycles</h3>
            <p>
              <ReplaceText
                text="QASolve accelerates test creation, eliminates broken tests, and delivers faster, more reliable results for {company}."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <CheckCircle className={styles.featureIcon} />
            </div>
            <h3>Enhance Test Accuracy</h3>
            <p>
              <ReplaceText
                text="Minimize human error with intelligent automation that resolves issues before they impact {company}’s release."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <Shield className={styles.featureIcon} />
            </div>
            <h3>Increase Test Coverage</h3>
            <p>
              <ReplaceText
                text="Achieve 10x higher coverage than traditional QA, minimizing breaking changes for {company}."
                replacements={replacements}
              />
            </p>
          </motion.div>
          <motion.div className={styles.featureCard} variants={fadeInUp}>
            <div className={styles.featureIconWrapper}>
              <DollarSign className={styles.featureIcon} />
            </div>
            <h3>Cost-Effective Trial</h3>
            <p>Try QASolve with a 30-day zero-risk trial—see the impact with zero effort.</p>
          </motion.div>
        </motion.div>
        <motion.div className={styles.videoContainer} variants={fadeInUp}>
          <video
            className={styles.demoVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/images/abm/qasolve/demo-video-poster.jpg"
          >
            <source src="/images/abm/qasolve/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        className={styles.testimonials}
        initial="hidden"
        animate={testimonialsControls}
        variants={staggerChildren}
      >
        <motion.h2 variants={fadeInUp}>What Our Clients Say</motion.h2>
        <div className={styles.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`${styles.testimonialSlide} ${index === activeTestimonial ? styles.activeTestimonial : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeTestimonial ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className={styles.quote}>{testimonial.quote}</p>
              <p className={styles.author}>– {testimonial.author}</p>
            </motion.div>
          ))}
          <div className={styles.carouselDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeTestimonial ? styles.activeDot : ""}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
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
        <motion.h2 variants={fadeInUp}>
          <ReplaceText
            text="{first_name}, Ready to Transform {company}’s QA Process?"
            replacements={replacements}
          />
        </motion.h2>
        <motion.p variants={fadeInUp}>
          Start with a 30-day zero-risk trial and see how QASolve delivers results.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button
            className={styles.ctaButton}
            onClick={() => window.location.href = "#request-a-demo"}
          >
            Request a Demo
          </Button>
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
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
          </div>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} QASolve. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
}