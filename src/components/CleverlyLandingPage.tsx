// src/components/CleverlyLandingPage.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/CleverlyLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function CleverlyLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const painPointsRef = useRef(null);
  const solutionsRef = useRef(null);
  const featuresRef = useRef(null);
  const clientsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  const navControls = useAnimation();
  const heroControls = useAnimation();
  const painPointsControls = useAnimation();
  const solutionsControls = useAnimation();
  const featuresControls = useAnimation();
  const clientsControls = useAnimation();
  const testimonialControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  const navInView = useInView(navRef, { once: false, amount: 0.3 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const painPointsInView = useInView(painPointsRef, { once: false, amount: 0.3 });
  const solutionsInView = useInView(solutionsRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const clientsInView = useInView(clientsRef, { once: false, amount: 0.3 });
  const testimonialInView = useInView(testimonialRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (navInView) navControls.start("visible");
    if (heroInView) heroControls.start("visible");
    if (painPointsInView) painPointsControls.start("visible");
    if (solutionsInView) solutionsControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (clientsInView) clientsControls.start("visible");
    if (testimonialInView) testimonialControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
    if (footerInView) footerControls.start("visible");
  }, [
    navInView,
    heroInView,
    painPointsInView,
    solutionsInView,
    featuresInView,
    clientsInView,
    testimonialInView,
    ctaInView,
    footerInView,
    navControls,
    heroControls,
    painPointsControls,
    solutionsControls,
    featuresControls,
    clientsControls,
    testimonialControls,
    ctaControls,
    footerControls,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Fixed Navigation */}
      <div
        ref={navRef}
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.navContent}>
          <Link href="https://www.cleverly.works" className={styles.logoLink}>
            <Image
              src="/images/abm/cleverly/logo-black.png"
              alt="Cleverly Logo"
              width={120}
              height={40}
              className={styles.logo}
            />
          </Link>
          <Button
            className={styles.navCta}
            onClick={() => (window.location.href = "https://cal.com/cleverly")}
          >
            Book a Demo
          </Button>
        </div>
      </div>

      <div className={styles.navSpacer}></div>

      {/* Hero Section */}
      <div ref={heroRef} id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <ReplaceText
                text="{first_name}, Don’t Let Chaos Hold {company} Back!"
                replacements={replacements}
              />
            </h1>
            <p className={styles.heroSubtitle}>
              Cleverly slashes costs, saves time, and delivers powerful insights with an all-in-one platform built for your facilities workflows.
            </p>
            <div>
              <Button
                className={styles.primaryCta}
                onClick={() => (window.location.href = "https://cal.com/cleverly")}
              >
                Book a Demo Now <ArrowRight size={16} />
              </Button>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/abm/cleverly/Infographics1.png"
              alt="Cleverly Dashboard"
              width={600}
              height={400}
              className={styles.heroImage}
            />
            <div className={styles.testimonialBubble}>
              <div className={styles.testimonialContent}>
                <Image
                  src="/images/abm/cleverly/face.jpg"
                  alt="George Boldero"
                  width={60}
                  height={60}
                  className={styles.testimonialImage}
                />
                <p className={styles.testimonialText}>
                  {"\""}Cleverly provides a powerful platform for work order management and compliance. The system is really flexible!{"\""}
                </p>
                <p className={styles.testimonialAuthor}>— George Boldero, Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div ref={painPointsRef} id="pain-points" className={styles.painPoints}>
        <div className={styles.sectionContainer}>
          <div className={styles.painPointsContent}>
            <h2 className={styles.sectionTitle}>Struggling with These Challenges?</h2>
            <div className={styles.painPointsGrid}>
              <div className={styles.painPointsImage}>
                <Image
                  src="/images/abm/cleverly/Infographics2.png"
                  alt="Frustrated Facility Manager"
                  width={400}
                  height={300}
                  className={styles.painPointImg}
                />
              </div>
              <ul className={styles.painPointsList}>
                <li>
                  <ReplaceText
                    text="Overwhelmed by task volume across {company}’s sites?"
                    replacements={replacements}
                  />
                </li>
                <li>Constantly chasing updates from suppliers and teams?</li>
                <li>Information scattered across multiple systems?</li>
                <li>Struggling to access actionable reports?</li>
              </ul>
            </div>
            <Button
              className={styles.secondaryCta}
              onClick={() => {
                const element = document.getElementById("solutions");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See How Cleverly Solves This <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div ref={solutionsRef} id="solutions" className={styles.solutions}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>
            <ReplaceText
              text="Cleverly Transforms {company}’s Operations"
              replacements={replacements}
            />
          </h2>
          <div className={styles.solutionsGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Image
                  src="/images/abm/cleverly/icons/ease-of-use.svg"
                  alt="Ease of Use Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.solutionTitle}>Ease of Use</h3>
              <p className={styles.solutionText}>An intuitive platform to manage everything in one place.</p>
              <div className={styles.solutionImage}>
                <Image
                  src="/images/abm/cleverly/easy-interface.jpg"
                  alt="Easy to use interface"
                  width={250}
                  height={150}
                  className={styles.solutionImg}
                />
              </div>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Image
                  src="/images/abm/cleverly/icons/onboarding.svg"
                  alt="Onboarding Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.solutionTitle}>Done-for-You Onboarding</h3>
              <p className={styles.solutionText}>We handle setup—your data is imported for you.</p>
              <div className={styles.solutionImage}>
                <Image
                  src="/images/abm/cleverly/onboarding.jpg"
                  alt="Onboarding process"
                  width={250}
                  height={150}
                  className={styles.solutionImg}
                />
              </div>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <Image
                  src="/images/abm/cleverly/icons/support.svg"
                  alt="Support Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className={styles.solutionTitle}>World-Class Support</h3>
              <p className={styles.solutionText}>
                <ReplaceText
                  text="Tailored support to meet {company}’s needs."
                  replacements={replacements}
                />
              </p>
              <div className={styles.solutionImage}>
                <Image
                  src="/images/abm/cleverly/support.jpg"
                  alt="Customer support"
                  width={250}
                  height={150}
                  className={styles.solutionImg}
                />
              </div>
            </div>
          </div>
          <div className={styles.solutionsCta}>
            <Button
              className={styles.primaryCta}
              onClick={() => (window.location.href = "https://calendly.com/cleverlyworks/demo")}
            >
              Book a Demo to Transform Your Workflows <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} id="features" className={styles.features}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>All-in-One Facilities Management Platform</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featuresImage}>
              <Image
                src="/images/abm/cleverly/Infographics3.jpg"
                alt="Cleverly Platform Overview"
                width={500}
                height={350}
                className={styles.featureMainImg}
              />
            </div>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Image
                    src="/images/abm/cleverly/icons/workflow.svg"
                    alt="Workflow Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Workflow Automation & Task Management</h3>
                  <p>Streamline operations with automated workflows and task tracking.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Image
                    src="/images/abm/cleverly/icons/reports.svg"
                    alt="Reports Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Custom Reports & Dashboards</h3>
                  <p>Gain actionable insights with tailored reporting solutions.</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <Image
                    src="/images/abm/cleverly/icons/mobile.svg"
                    alt="Mobile Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Mobile App for Planned & Reactive Work</h3>
                  <p>Manage operations on-the-go with our powerful mobile solution.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.featuresCta}>
            <Button
              className={styles.secondaryCta}
              onClick={() => (window.location.href = "https://www.cleverly.works")}
            >
              Explore All Features <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div ref={clientsRef} id="clients" className={styles.clients}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Trusted by Leading Companies</h2>
          <div className={styles.clientsGrid}>
            <div className={styles.clientLogo}>
              <Image src="/images/abm/cleverly/client1.jpg" alt="Client 1" width={150} height={80} />
            </div>
            <div className={styles.clientLogo}>
              <Image src="/images/abm/cleverly/client2.jpg" alt="Client 2" width={150} height={80} />
            </div>
            <div className={styles.clientLogo}>
              <Image src="/images/abm/cleverly/client3.jpg" alt="Client 3" width={150} height={80} />
            </div>
            <div className={styles.clientLogo}>
              <Image src="/images/abm/cleverly/client4.jpg" alt="Client 4" width={150} height={80} />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div ref={testimonialRef} id="testimonial" className={styles.testimonial}>
        <div className={styles.sectionContainer}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialCardContent}>
              <div className={styles.testimonialCardImage}>
                <Image
                  src="/images/abm/cleverly/face2.jpg"
                  alt="Chuong, Founder"
                  width={200}
                  height={200}
                  className={styles.testimonialFullImage}
                />
              </div>
              <div className={styles.testimonialCardText}>
                <p className={styles.testimonialQuote}>
                  {"\""}With customisable job templates and checklists for our cleaners… The data and analytics are really appreciated by our clients.{"\""}
                </p>
                <p className={styles.testimonialSource}>— Chuong, Founder, Hammock Cleaning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} id="cta" className={styles.cta}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaGrid}>
              <div className={styles.ctaText}>
                <h2 className={styles.ctaTitle}>
                  <ReplaceText
                    text="{first_name}, Ready to Take Control at {company}?"
                    replacements={replacements}
                  />
                </h2>
                <p className={styles.ctaDescription}>
                  Find out how Cleverly can supercharge your facilities and real estate workflows. Book a demo today!
                </p>
                <div className={styles.ctaButtons}>
                  <div>
                    <Button
                      className={styles.primaryCta}
                      onClick={() => (window.location.href = "https://calendly.com/cleverlyworks/demo")}
                    >
                      Book a Demo Now <ArrowRight size={16} />
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={`${styles.secondaryCta} ${styles.whiteCta}`}
                      onClick={() => (window.location.href = "https://www.cleverly.works")}
                    >
                      Visit Our Website <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
                <div className={styles.ctaFeatures}>
                  <div className={styles.ctaFeatureItem}>
                    <Image
                      src="/images/abm/cleverly/icons/check-circle.svg"
                      alt="Check Circle Icon"
                      width={16}
                      height={16}
                      className={styles.ctaFeatureIcon}
                    />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className={styles.ctaFeatureItem}>
                    <Image
                      src="/images/abm/cleverly/icons/check-circle.svg"
                      alt="Check Circle Icon"
                      width={16}
                      height={16}
                      className={styles.ctaFeatureIcon}
                    />
                    <span>Free onboarding & training</span>
                  </div>
                  <div className={styles.ctaFeatureItem}>
                    <Image
                      src="/images/abm/cleverly/icons/check-circle.svg"
                      alt="Check Circle Icon"
                      width={16}
                      height={16}
                      className={styles.ctaFeatureIcon}
                    />
                    <span>Unlimited support</span>
                  </div>
                </div>
              </div>
              <div className={styles.ctaImage}>
                <Image
                  src="/images/abm/cleverly/mobile.webp"
                  alt="Cleverly Mobile App"
                  width={300}
                  height={500}
                  className={styles.ctaImg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div ref={footerRef} className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Image
              src="/images/abm/cleverly/logo-white.png"
              alt="Cleverly Logo"
              width={100}
              height={33}
              className={styles.footerLogoImage}
            />
          </div>
          <div className={styles.footerText}>© {new Date().getFullYear()} Cleverly. All rights reserved.</div>
          <div className={styles.footerLinks}>
            <Link href="https://www.cleverly.works/privacy-policy/" className={styles.footerLink}>
              Privacy
            </Link>
            <Link href="#unsubscribe" className={styles.footerLink}>
              Unsubscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}