import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Clock, FileCheck, Leaf, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import styles from "@/components/styles/FreightRollABMLandingPage.module.css";

interface CustomPersonalizations {
  rating: string;
  review_count: string;
  review1: { name: string; rating: number; comment: string };
  review2: { name: string; rating: number; comment: string };
  review3: { name: string; rating: number; comment: string };
}

interface FreightRollABMLandingPageProps {
  firstName: string;
  company: string;
  custom: CustomPersonalizations;
}

export default function FreightRollABMLandingPage({
  firstName,
  company,
  custom,
}: FreightRollABMLandingPageProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Truck className="h-6 w-6 text-primary" />
            <span>FreightRoll</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#problem" className="text-sm font-medium hover:text-primary">
              The Problem
            </Link>
            <Link href="#solution" className="text-sm font-medium hover:text-primary">
              Our Solution
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <Button>Book a Demo</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className={styles.heroTitle}>
                  Hello {firstName}, Is {company}’s{" "}
                  <span className={styles.highlight}>{custom.rating}/5 Rating</span> Hurting Your Business?
                </h1>
                <p className={styles.heroSubtitle}>
                  With only {custom.rating} stars from {custom.review_count} reviews, drivers are frustrated. FreightRoll can transform your yard into a reliable, driver-friendly hub.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className={styles.ctaButton}>
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className={styles.secondaryButton}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/abm/freightroll/yard-congestion.png"
                    width={800}
                    height={600}
                    alt="Congested Warehouse Yard"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section (Negative Reviews) */}
        <section id="problem" className={styles.problemSection}>
          <div className="container">
            <div className="text-center mb-12">
              <h2 className={styles.sectionTitle}>
                What Drivers Are Saying About {company}
              </h2>
              <p className={styles.sectionSubtitle}>
                Your {custom.rating}/5 rating from {custom.review_count} reviews highlights serious yard management issues.
              </p>
            </div>

            <div className={styles.reviewsGrid}>
              {[custom.review1, custom.review2, custom.review3].map((review, index) => (
                <Card key={index} className={styles.reviewCard}>
                  <CardContent className={styles.reviewContent}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerAvatar}>
                        {review.name.charAt(0)}
                      </div>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className={styles.solutionSection}>
          <div className="container">
            <div className="text-center mb-16">
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
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Reduce Wait Times",
                  description:
                    "Digital gate processes cut check-in/out times by 50%+, reducing driver wait times and yard congestion.",
                },
                {
                  icon: <FileCheck className="h-10 w-10 text-primary" />,
                  title: "Streamline Check-Ins",
                  description:
                    "Eliminate multiple check-in points with a self-service system, making the process seamless for drivers.",
                },
                {
                  icon: <Truck className="h-10 w-10 text-primary" />,
                  title: "Optimize Yard Flow",
                  description:
                    "Automate yard workflows to prevent backups, ensuring trucks can dock and move efficiently.",
                },
                {
                  icon: <Leaf className="h-10 w-10 text-primary" />,
                  title: "Go Paperless",
                  description:
                    "Switch to digital documentation, reducing errors and supporting a more sustainable operation.",
                },
              ].map((solution, index) => (
                <Card key={index} className={styles.solutionCard}>
                  <CardContent className={styles.solutionContent}>
                    <div className={styles.iconWrapper}>{solution.icon}</div>
                    <h3 className={styles.solutionTitle}>{solution.title}</h3>
                    <p className={styles.solutionDescription}>{solution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={styles.testimonialsSection}>
          <div className="container">
            <div className="text-center mb-12">
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
                <Card key={index} className={styles.testimonialCard}>
                  <CardContent className={styles.testimonialContent}>
                    <div className={styles.testimonialHeader}>
                      <div className={styles.testimonialAvatar}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className={styles.testimonialName}>{testimonial.name}</p>
                        <p className={styles.testimonialPosition}>{testimonial.position}</p>
                      </div>
                    </div>
                    <div className={styles.testimonialRating}>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                    <p className={styles.testimonialComment}>{testimonial.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <h2 className={styles.ctaTitle}>
                Ready to Improve {company}’s Reputation?
              </h2>
              <p className={styles.ctaSubtitle}>
                Schedule a demo and see how FreightRoll can transform your yard operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className={styles.ctaButton}>
                  Book a Demo
                </Button>
                <Button size="lg" variant="outline" className={styles.secondaryButton}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <span>FreightRoll</span>
              </div>
              <p className="text-sm text-muted-foreground">
                330 E Liberty St, Ann Arbor, MI 48104
                <br />
                Email: info@freightroll.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Yard Execution System
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Driver Experience
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FreightRoll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}