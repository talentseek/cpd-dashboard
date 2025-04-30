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
  // Define companies for Case Studies and Social Proof
  const caseStudyCompanies = [
    { name: "NatWest", file: "natwest-logo.png", stat: "91%", title: "Employee Satisfaction", description: "NatWest achieved exceptional employee satisfaction through a flexible hybrid model." },
    { name: "SOCITM", file: "socitm-logo.png", stat: "92%", title: "Cost Reduction", description: "SOCITM realized significant cost savings and a 600% increase in collaboration time." },
    { name: "Santander", file: "santander-logo.png", stat: "600%", title: "Collaboration Increase", description: "Santander transformed existing spaces into dynamic Work Cafés for their teams." },
  ];

  const socialProofCompanies = [
    ...caseStudyCompanies.map(company => ({ name: company.name, file: company.file })),
    { name: "Google", file: "google-logo.png" },
    { name: "Microsoft", file: "microsoft-logo.png" },
    { name: "Slack", file: "slack-logo.png" },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/othership/logo.png"
              alt="Othership Logo"
              width={90}
              height={37}
              className={styles.logoImage}
            />
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
          <Link href="https://cal.com/cole-othership.com/30min" className={styles.ctaButton}>
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
                <h1 className={styles.heroTitle}>Flexible Workspace Solutions for {company}</h1>
                <p className={styles.heroSubtitle}>
                  Hi {firstName}, discover how {company} can transform its workplace strategy with Othership&apos;s network of premium flexible workspaces.
                </p>
                <div className={styles.ctaContainer}>
                  <Link href="https://cal.com/cole-othership.com/30min" className={styles.primaryCta}>
                    Book a Demo <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className={styles.heroImageContainer}>
                <Image
                  src="/images/abm/othership/hero-image.jpg"
                  alt="Othership Workspace"
                  width={500}
                  height={400}
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>How Othership Helps {company}</h2>
            <div className={styles.featuresGrid}>
              {/* Feature cards would go here */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>© {new Date().getFullYear()} Othership. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
