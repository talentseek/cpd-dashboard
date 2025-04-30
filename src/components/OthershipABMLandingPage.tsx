import Link from "next/link";
import Image from "next/image";
import { Building2, Users, DollarSign, ArrowRight, Calendar, LayoutDashboard, CalendarClock, Bell, LineChart } from "lucide-react";
import styles from "@/components/styles/OthershipABM.module.css";

interface OthershipABMLandingPageProps {
  firstName?: string;
  company?: string;
}

export default function OthershipABMLandingPage({
  firstName = "Jordan",
  company = "InnovateCorp",
}: OthershipABMLandingPageProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/othership/logo.png"
              alt="Othership Logo"
              width={24}
              height={24}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Othership</span>
          </div>
          <nav className={styles.nav}>
            <Link href="#problems" className={styles.navLink}>
              Problems
            </Link>
            <Link href="#solutions" className={styles.navLink}>
              Solutions
            </Link>
            <Link href="#case-studies" className={styles.navLink}>
              Case Studies
            </Link>
          </nav>
          <Link href="https://cal.com/othership/demo" className={styles.ctaButton}>
            Book a Demo
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  {firstName}, Is Hybrid Work Chaos Holding {company} Back?
                </h1>
                <p className={styles.heroSubtitle}>
                  Othership&apos;s Hybrid Solutions Cut Costs, Streamline Workspaces, and Boost Team Collaboration.
                </p>
                <div className={styles.heroButtons}>
                  <Link href="https://cal.com/othership/demo" className={styles.ctaButtonLarge}>
                    Book a Demo
                    <ArrowRight className={styles.ctaIcon} />
                  </Link>
                </div>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src="/images/abm/othership/modern-hybrid-workspace.png"
                  alt="Modern hybrid workspace"
                  fill
                  className={styles.image}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problems" className={styles.problemsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>The Challenges of Hybrid Work</h2>
                <p className={styles.sectionSubtitle}>
                  High office costs, scattered teams, and scheduling nightmares? Companies like {company} deserve a better way to manage hybrid work.
                </p>
              </div>
            </div>
            <div className={styles.problemsGrid}>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <DollarSign className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Unpredictable Costs</h3>
                <p className={styles.cardDescription}>
                  Fluctuating office usage leads to inefficient space utilization and wasted resources, draining budgets for growing startups.
                </p>
              </div>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Users className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Disconnected Teams</h3>
                <p className={styles.cardDescription}>
                  Remote and hybrid setups often isolate employees, reducing collaboration and weakening company culture.
                </p>
              </div>
              <div className={styles.problemCard}>
                <div className={styles.cardIcon}>
                  <Calendar className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Scheduling Overload</h3>
                <p className={styles.cardDescription}>
                  Manual coordination of desks, meeting rooms, and hybrid schedules creates administrative chaos and eats up valuable time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className={styles.solutionsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Our Comprehensive Solution</h2>
                <p className={styles.sectionSubtitle}>
                  Othership blends a global workspace network with smart software—Workplace Scheduler, desk booking, and more—to make hybrid work seamless for {company}.
                </p>
              </div>
            </div>
            <div className={styles.solutionsGrid}>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <Building2 className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>On-Demand Workspaces</h3>
                <p className={styles.itemDescription}>
                  Access a global network of vetted workspaces for flexible, cost-effective office solutions without long-term leases.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <Calendar className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>Workplace Scheduler</h3>
                <p className={styles.itemDescription}>
                  Coordinate hybrid teams effortlessly with a cloud-based tool that syncs schedules and fosters in-person collaboration.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <LayoutDashboard className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>Desk Booking Software</h3>
                <p className={styles.itemDescription}>
                  Simplify desk allocation with an intuitive app that remembers team preferences and optimizes space usage.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <CalendarClock className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>Meeting Room Booking</h3>
                <p className={styles.itemDescription}>
                  Streamline meeting room reservations with a flexible system tailored to your hybrid workflow.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <Bell className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>Behavioral Nudges</h3>
                <p className={styles.itemDescription}>
                  Boost team connectivity with personalized notifications that suggest meetups based on location and availability.
                </p>
              </div>
              <div className={styles.solutionItem}>
                <div className={styles.itemIcon}>
                  <LineChart className={styles.icon} />
                </div>
                <h3 className={styles.itemTitle}>Mixed Inventory Model</h3>
                <p className={styles.itemDescription}>
                  Monetize underutilized office space by selling it on our platform, turning costs into revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className={styles.caseStudiesSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Real Results from Real Clients</h2>
                <p className={styles.sectionSubtitle}>
                  See how organizations like {company} have transformed their hybrid work environments.
                </p>
              </div>
            </div>
            <div className={styles.caseStudiesGrid}>
              <div className={styles.caseStudyCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.stat}>91%</div>
                  <div className={styles.logoWrapper}>
                    <Image
                      src="/images/abm/othership/natwest-logo-abstract.png"
                      alt="NatWest"
                      width={96}
                      height={48}
                      className={styles.logoImage}
                    />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>Employee Satisfaction</h3>
                <p className={styles.cardDescription}>
                  NatWest achieved exceptional employee satisfaction through a flexible hybrid model.
                </p>
              </div>
              <div className={styles.caseStudyCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.stat}>92%</div>
                  <div className={styles.logoWrapper}>
                    <Image
                      src="/images/abm/othership/socitm-logo-concept.png"
                      alt="SOCITM"
                      width={96}
                      height={48}
                      className={styles.logoImage}
                    />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>Cost Reduction</h3>
                <p className={styles.cardDescription}>
                  SOCITM realized significant cost savings and a 600% increase in collaboration time.
                </p>
              </div>
              <div className={styles.caseStudyCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.stat}>600%</div>
                  <div className={styles.logoWrapper}>
                    <Image
                      src="/images/abm/othership/santander-logo.png"
                      alt="Santander"
                      width={96}
                      height={48}
                      className={styles.logoImage}
                    />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>Collaboration Increase</h3>
                <p className={styles.cardDescription}>
                  Santander transformed existing spaces into dynamic Work Cafés for their teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className={styles.socialProofSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
                <p className={styles.sectionSubtitle}>
                  Join hundreds of forward-thinking organizations already using our solution.
                </p>
              </div>
            </div>
            <div className={styles.logosGrid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.logoItem}>
                  <Image
                    src={`/images/abm/othership/generic-company-logo.png?height=80&width=160&query=company logo ${i} minimal`}
                    alt={`Company ${i}`}
                    width={160}
                    height={80}
                    className={styles.logoImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaText}>
                <h2 className={styles.ctaTitle}>
                  {firstName}, Ready to Transform {company}’s Hybrid Workspace?
                </h2>
                <p className={styles.ctaSubtitle}>
                  Schedule a personalized demo to see how our solution can address your specific challenges.
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="https://cal.com/othership/demo" className={styles.ctaButtonSecondary}>
                  Book a Demo
                  <ArrowRight className={styles.ctaIcon} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Image
                src="/images/abm/othership/logo.png"
                alt="Othership Logo"
                width={20}
                height={20}
                className={styles.logoImage}
              />
              <p className={styles.footerText}>
                © {new Date().getFullYear()} Othership. All rights reserved.
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
        </div>
      </footer>
    </div>
  );
}