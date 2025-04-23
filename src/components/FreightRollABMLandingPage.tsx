"use client"; // Add this line

import Image from "next/image";
import Link from "next/link";
import { Clock, FileText, Truck, Leaf, Star, Facebook, Linkedin, ArrowRight } from "lucide-react";
import styles from "@/components/styles/FreightRollABMLandingPage.module.css";

interface CustomPersonalizations {
  rating: string;
  review_count: string;
  review1: { name: string; rating: number; comment: string };
  review2: { name: string; rating: number; comment: string };
  review3: { name: string; rating: number; comment: string };
}

interface FreightRollLandingPageProps {
  firstName: string;
  company: string;
  custom: CustomPersonalizations;
}

export default function FreightRollLandingPage({
  firstName,
  company,
  custom,
}: FreightRollLandingPageProps) {
  const handleLearnMoreClick = () => {
    const problemSection = document.getElementById("problem");
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Sticky Navigation */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <Image
              src="/images/abm/freightroll/logo.png"
              alt="FreightRoll Logo"
              width={180}
              height={60}
              className={styles.logo}
            />
          </Link>
          <nav className={styles.nav}>
            <Link href="#problem" className={styles.navLink}>
              The Problem
            </Link>
            <Link href="#solution" className={styles.navLink}>
              Our Solution
            </Link>
            <a href="#demo" className={styles.navButton}>
              Book a Demo
            </a>
          </nav>
          <button className={styles.mobileMenuButton}>
            <span className="sr-only">Open menu</span>
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
              className={styles.menuIcon}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hello {firstName}, Is {company}’s{" "}
              <span className={styles.heroHighlight}>{custom.rating}/5 Rating</span> Hurting Your Business?
            </h1>
            <p className={styles.heroSubtitle}>
              With only {custom.rating} stars from {custom.review_count} reviews, drivers are frustrated. FreightRoll
              can transform your yard into a reliable, driver-friendly hub.
            </p>
            <div className={styles.heroButtons}>
              <a href="#demo" className={styles.ctaButton}>
                Schedule a Demo
              </a>
              <button onClick={handleLearnMoreClick} className={styles.secondaryButton}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className={styles.problemSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.problemContent}>
            <h2 className={styles.sectionTitle}>
              What Drivers Are Saying About {company}
            </h2>
            <p className={styles.sectionSubtitle}>
              Your {custom.rating}/5 rating from {custom.review_count} reviews highlights serious yard management
              issues.
            </p>
            <p className={styles.problemDescription}>
              Truck drivers spend up to 40% of their time waiting for pickup or delivery, costing the industry up to
              $100 billion every year.
            </p>

            <div className={styles.reviewsGrid}>
              {[custom.review1, custom.review2, custom.review3].map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerAvatar}>{review.name.charAt(0)}</div>
                    <div>
                      <p className={styles.reviewerName}>{review.name}</p>
                      <div className={styles.rating}>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.statsGrid}>
            <div className={styles.statsText}>
              <h2 className={styles.statsTitle}>$100K+ in Annual Savings per Facility</h2>
              <a href="#demo" className={styles.ctaButton}>
                Schedule a Demo
              </a>
            </div>
            <div className={styles.statsCards}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>95%</div>
                <p className={styles.statDescription}>
                  Reduction in Human-to-Human Interaction with Drivers
                </p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  UP TO <span className={styles.statHighlight}>50%</span>
                </div>
                <p className={styles.statDescription}>
                  Reduction in Check-in/out and Dock Office Time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.testimonialsContent}>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
            <p className={styles.sectionSubtitle}>
              See how FreightRoll has transformed yard operations for others.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {[
              {
                name: "Jane Doe",
                position: "Operations Manager, Trucking Co.",
                rating: 5,
                comment:
                  "FreightRoll revolutionized our yard management. Driver wait times and errors are down significantly.",
              },
              {
                name: "John Smith",
                position: "Logistics Coordinator, LogisticsPro",
                rating: 5,
                comment: "The automation tools saved us countless hours every week.",
              },
              {
                name: "Emily Johnson",
                position: "Supply Chain Manager, FleetCorp",
                rating: 5,
                comment:
                  "FreightVISION gave us complete visibility over our shipments, improving decision-making and cutting costs.",
              },
            ].map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>{testimonial.name.charAt(0)}</div>
                  <div>
                    <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                    <p className={styles.testimonialPosition}>{testimonial.position}</p>
                  </div>
                </div>
                <div className={styles.testimonialRating}>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <p className={styles.testimonialComment}>{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solution" className={styles.solutionSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.solutionContent}>
            <h2 className={styles.sectionTitle}>
              How FreightRoll Can Improve {company}’s Operations
            </h2>
            <p className={styles.sectionSubtitle}>
              Our Yard Execution System addresses these pain points to boost reliability and driver satisfaction.
            </p>
          </div>
          <div className={styles.solutionGrid}>
            {[
              {
                icon: <Clock className="h-6 w-6 text-accent" />,
                title: "Reduce Wait Times",
                description:
                  "Digital gate processes cut check-in/out times by 50%+, reducing driver wait times and yard congestion.",
              },
              {
                icon: <FileText className="h-6 w-6 text-accent" />,
                title: "Streamline Check-Ins",
                description:
                  "Eliminate multiple check-in points with a self-service system, making the process seamless for drivers.",
              },
              {
                icon: <Truck className="h-6 w-6 text-accent" />,
                title: "Optimize Yard Flow",
                description:
                  "Automate yard workflows to prevent backups, ensuring trucks can dock and move efficiently.",
              },
              {
                icon: <Leaf className="h-6 w-6 text-accent" />,
                title: "Go Paperless",
                description:
                  "Switch to digital documentation, reducing errors and supporting a more sustainable operation.",
              },
            ].map((solution, index) => (
              <div key={index} className={styles.solutionCard}>
                <div className={styles.iconWrapper}>{solution.icon}</div>
                <h3 className={styles.solutionTitle}>{solution.title}</h3>
                <p className={styles.solutionDescription}>{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Improve {company}’s Reputation?
            </h2>
            <p className={styles.ctaSubtitle}>
              Schedule a demo and see how FreightRoll can transform your yard operations.
            </p>
            <a href="#demo" className={styles.ctaButton}>
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCtaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.finalCtaContent}>
            <h2 className={styles.finalCtaTitle}>
              Get Your Savings <span className={styles.ctaHighlight}>Rolling</span> Today
            </h2>
            <a href="#demo" className={styles.ctaButton}>
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Image
                src="/images/abm/freightroll/logo.png"
                alt="FreightRoll Logo"
                width={150}
                height={50}
                className={styles.logo}
              />
            </div>
            <div className={styles.footerText}>
              Copyright FreightRoll © {new Date().getFullYear()} All Rights Reserved
            </div>
            <div className={styles.footerLinks}>
              <Link href="#" aria-label="LinkedIn" className={styles.footerLink}>
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className={styles.footerLink}>
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}