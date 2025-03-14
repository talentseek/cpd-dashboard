// src/components/MailMonitorLandingPage.tsx
/* eslint-disable react/no-unescaped-entities */
/* eslint @next/next/no-page-custom-font: "off" */ // Disable the font warning for this file
"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "@/components/styles/MailMonitorLandingPage.module.css";

interface MailMonitorLandingPageProps {
  firstName?: string;
  company?: string;
  role?: string;
  painPoint?: string;
}

export default function MailMonitorLandingPage({
  firstName = "John",
  company = "EmailPros",
  role = "email marketing lead",
  painPoint = "emails landing in spam",
}: MailMonitorLandingPageProps) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    opening: false,
    discovery: false,
    transformation: false,
    cta: false,
  });

  const [scrolled, setScrolled] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);
  const [emailPosition, setEmailPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (emailRef.current) {
        const scrollProgress = Math.min(
          1,
          window.scrollY / (document.body.scrollHeight - window.innerHeight)
        );
        setEmailPosition(scrollProgress * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        {/* Fixed Navigation */}
        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
          <div className={styles.navContent}>
            <div className={styles.logoContainer}>
              <Image
                src="/images/abm/mailmonitor/logo.png"
                alt="MailMonitor Logo"
                width={100}
                height={40}
                className={styles.logoIcon}
              />
            </div>
            <button className={styles.button}>
              <Link href="#demo">Book a Free Deliverability Assessment</Link>
            </button>
          </div>
        </nav>

        {/* Floating Email Animation */}
        <div ref={emailRef} className={styles.floatingEmail}>
          <div className={styles.emailContainer}>
            {/* Fixed SPAM indicator at top */}
            <div className={styles.spamIndicator}>
              <AlertCircle className={styles.spamIcon} />
              <div className={styles.spamText}>SPAM</div>
            </div>

            {/* Track line */}
            <div className={styles.trackLine}>
              <div
                className={styles.trackProgress}
                style={{ height: `${emailPosition}%` }}
              ></div>
            </div>

            {/* Fixed INBOX indicator at bottom */}
            <div className={styles.inboxIndicator}>
              <CheckCircle className={styles.inboxIcon} />
              <div className={styles.inboxText}>INBOX</div>
            </div>

            {/* Moving email icon */}
            <div
              className={styles.emailIconContainer}
              style={{ top: `${20 + emailPosition * 0.6}%` }}
            >
              <Mail
                className={`${styles.emailIcon} ${
                  emailPosition > 70
                    ? styles.emailSuccess
                    : emailPosition > 30
                    ? styles.emailWarning
                    : styles.emailError
                }`}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Opening Scene - The Struggle */}
          <section
            id="opening"
            className={`${styles.section} ${
              isVisible.opening ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.sectionContainer}>
              <div className={styles.sectionContent}>
                <h1 className={styles.sectionTitle}>
                  {firstName}, as {company}'s {role}, you've spent
                  countless hours crafting the perfect campaign.
                </h1>
                <div className={styles.sectionText}>
                  <p>
                    But <span className={styles.highlight}>{painPoint}</span>{" "}
                    are costing {company} revenue and opportunities.
                  </p>
                  <p>
                    Every undelivered email represents a missed connection with
                    your audience. Every campaign that lands in spam is wasted
                    effort and lost ROI.
                  </p>
                  <div className={styles.card}>
                    <div className={styles.cardContent}>
                      <div className={styles.cardIconContainer}>
                        <AlertCircle className={styles.cardIcon} />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>
                          The Deliverability Challenge
                        </h3>
                        <p>
                          <span className={styles.boldText}>
                            75% of marketers
                          </span>{" "}
                          don't know where their emails actually land. And
                          when they do find out there's a problem,
                          it's often too late.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Discovery */}
          <section
            id="discovery"
            className={`${styles.section} ${styles.discoverySection} ${
              isVisible.discovery ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.sectionContainer}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>
                  What if you could see exactly where your emails land{" "}
                  <span className={styles.highlight}>before</span> you hit send?
                </h2>
                <div className={styles.sectionText}>
                  <p>
                    Imagine having complete visibility into {company}'s
                    email deliverability by knowing precisely which messages
                    reach the inbox and which get filtered to spam.
                  </p>
                  <div className={styles.grid}>
                    <div className={styles.gridItem}>
                      <div className={styles.gridNumber}>400+</div>
                      <h3 className={styles.gridTitle}>Seed Accounts</h3>
                      <p>
                        MailMonitor's extensive network of seed accounts
                        gives you visibility across all major ISPs.
                      </p>
                    </div>
                    <div className={styles.gridItem}>
                      <div className={styles.gridNumber}>60+</div>
                      <h3 className={styles.gridTitle}>ISPs Covered</h3>
                      <p>
                        From Gmail to Outlook to Yahoo and beyond—we've got
                        your deliverability covered everywhere.
                      </p>
                    </div>
                  </div>
                  <p className={styles.italicText}>
                    {`"MailMonitor is like having x-ray vision for your email campaigns."`}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Transformation */}
          <section
            id="transformation"
            className={`${styles.section} ${
              isVisible.transformation ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.sectionContainer}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>
                  The "future" story of how {company} transformed their email
                  deliverability
                </h2>
                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <h3 className={styles.timelineTitle}>The Challenge</h3>
                    <p>
                      Like many companies, {company} struggled with inconsistent
                      deliverability. Campaigns that should have performed well
                      were underdelivering, and there was no clear insight into
                      why.
                    </p>
                  </div>
                  <div className={styles.timelineItem}>
                    <h3 className={styles.timelineTitle}>The Solution</h3>
                    <p>
                      With MailMonitor's reputation monitoring and smart
                      suggestions, {company} gained visibility into their
                      deliverability issues and actionable steps to fix them.
                    </p>
                  </div>
                  <div className={styles.timelineItem}>
                    <h3 className={styles.timelineTitle}>The Results</h3>
                    <p>
                      {company} now achieves{" "}
                      <span className={styles.highlight}>95% inbox rates</span>,
                      joining 7,500+ companies who've inboxed 3B+ emails
                      with MailMonitor.
                    </p>
                    <div className={styles.testimonial}>
                      <div className={styles.testimonialContent}>
                        <div className={styles.testimonialIconContainer}>
                          <CheckCircle className={styles.testimonialIcon} />
                        </div>
                        <div>
                          <p className={styles.testimonialText}>
                            {`"MailMonitor transformed our deliverability—quick setup and actionable insights! We've seen a 35% increase in open rates since implementing their recommendations."`}
                          </p>
                          <p className={styles.testimonialAuthor}>
                            — Todd B., Email Marketing Director
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="demo" className={styles.ctaSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  {firstName}, let's ensure {company}'s emails reach
                  the inbox every time.
                </h2>
                <p className={styles.ctaText}>
                  It's time to stop guessing where your emails land and
                  start knowing.
                </p>
                <div className={styles.clientLogos}>
                  <p className={styles.clientLogosText}>
                    Trusted by leading companies worldwide
                  </p>
                  <div className={styles.marqueeContainer}>
                    <div className={styles.marquee}>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={styles.clientLogo}>
                          <Image
                            src={`/images/abm/mailmonitor/client${i}.png`}
                            alt={`Client ${i}`}
                            width={120}
                            height={48}
                            className={styles.clientLogoImage}
                          />
                        </div>
                      ))}
                      {/* Duplicate for continuous scroll */}
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={`dup-${i}`} className={styles.clientLogo}>
                          <Image
                            src={`/images/abm/mailmonitor/client${i}.png`}
                            alt={`Client ${i}`}
                            width={120}
                            height={48}
                            className={styles.clientLogoImage}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button className={styles.ctaButton}>
                  Start Your Deliverability Journey<ArrowRight className={styles.ctaButtonIcon} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2025 MailMonitor. All rights reserved.</p>
            <div className={styles.footerLinks}>
              <Link href="#" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link href="#" className={styles.footerLink}>
                Terms of Service
              </Link>
              <Link href="#" className={styles.footerLink}>
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}