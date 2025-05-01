/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { Calendar, CreditCard, Shield, Users, MessageSquare, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import styles from "@/components/styles/MedVirtualABM.module.css";

interface MedVirtualABMLandingPageProps {
  firstName?: string;
  company?: string;
}

export default function MedVirtualABMLandingPage({
  firstName = "Lisa",
  company = "MedAssent DDS",
}: MedVirtualABMLandingPageProps) {
  const testimonials = [
    {
      quote: "MedVirtual makes running my business easier with HIPAA-compliant VAs. I'm excited for the possibilities!",
      name: "Samantha Blank",
      role: "Director at Social Coaching Club",
      image: "/confident-professional-1.png",
    },
    {
      quote: "MedVirtual has been a lifesaver for staffing emergencies, helping us focus on patient care.",
      name: "Aaron Johnson",
      role: "Chiropractor at DC Bautch Chiropractic",
      image: "/confident-professional-2.png",
    },
    {
      quote: "MedVirtual’s team is responsive and makes my job easier. Highly recommend!",
      name: "Jared Burbidge",
      role: "Marketing Director at Valencia Periodontics",
      image: "/confident-professional-3.png",
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className={`${styles.header} ${styles.fullWidth}`}>
        <div className={`${styles.headerContainer} ${styles.container}`}>
          <div className={styles.logo}>
            <div className={styles.logoImage}>
              <div style={{ position: "relative", height: "2rem", width: "2rem" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "9999px", background: "#14b8a6" }}></div>
                <div style={{ position: "absolute", inset: "0.25rem", borderRadius: "9999px", background: "white" }}></div>
                <div style={{ position: "absolute", inset: "0.5rem", borderRadius: "9999px", background: "#14b8a6" }}></div>
              </div>
            </div>
            <span className={styles.logoText}>MedVirtual</span>
          </div>
          <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButton}>
            Book a Demo
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={`${styles.heroSection} ${styles.fullWidth}`}>
          <div className={`${styles.container} ${styles.heroContent}`}>
            <div className={styles.heroText}>
              <div className={styles.badge}>
                <span style={{ marginRight: "0.25rem" }}>✨</span> HIPAA-Compliant Virtual Staffing
              </div>
              <h1 className={styles.heroTitle}>
                {firstName}, Is Administrative Overload Holding {company} Back?
              </h1>
              <p className={styles.heroSubtitle}>
                MedVirtual provides virtual staffing solutions tailored for dental practices, reducing costs and enhancing patient care.
              </p>
              <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButton}>
                Book a Demo
              </Link>
            </div>
            <div className={styles.heroImage}>
              <Image
                src="/images/abm/medvirtual/dental-assistant-dashboard.png"
                alt="Dental Practice Workflow"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`${styles.statsSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3 className={styles.statTitle}>Trusted by 1000+ Practices</h3>
                <p className={styles.statDescription}>
                  We’ve empowered dental and medical practices to grow with our virtual staffing solutions.
                </p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statTitle}>95% Client Success Rate</h3>
                <p className={styles.statDescription}>
                  Our high retention rates reflect the success of our virtual assistants in dental workflows.
                </p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statTitle}>1500+ Assistants Placed</h3>
                <p className={styles.statDescription}>
                  We ensure our assistants are perfectly matched to your dental practice’s needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`${styles.featuresSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tailored Virtual Assistants for Dental Practices</h2>
              <p className={styles.sectionSubtitle}>
                Our virtual assistants—Medical Billing, Administrative Assistants, Marketing Experts, and Bookkeeping Specialists—are trained to address the unique challenges of dental clinics.
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Calendar className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Intelligent Scheduling</h3>
                </div>
                <p className={styles.cardDescription}>
                  Reduce no-shows and optimize your calendar for efficiency.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><CreditCard className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Automated Billing</h3>
                </div>
                <p className={styles.cardDescription}>
                  Streamline insurance verification and patient payments.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><MessageSquare className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Patient Follow-ups</h3>
                </div>
                <p className={styles.cardDescription}>
                  Handle personalized follow-ups to improve patient outcomes.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Shield className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>HIPAA Compliant</h3>
                </div>
                <p className={styles.cardDescription}>
                  Ensure your practice’s data is secure with trained assistants.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Users className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Marketing Support</h3>
                </div>
                <p className={styles.cardDescription}>
                  Enhance your online presence to attract more patients.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><BarChart3 className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Bookkeeping Efficiency</h3>
                </div>
                <p className={styles.cardDescription}>
                  Manage your finances to reduce overhead and ensure accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Staff Management Section */}
        <section id="management" className={`${styles.managementSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Comprehensive Virtual Staff Management</h2>
              <p className={styles.sectionSubtitle}>
                MedVirtual takes care of hiring, security, attendance, and payroll, so your dental practice can focus on patient care.
              </p>
            </div>
            <div className={styles.managementGrid}>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Users className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Hiring Process</h3>
                </div>
                <p className={styles.cardDescription}>
                  We vet candidates for experience in dental workflows, ensuring you get skilled specialists.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Shield className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Enhanced Security</h3>
                </div>
                <p className={styles.cardDescription}>
                  Advanced cybersecurity and HIPAA compliance protect your practice’s sensitive data.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Calendar className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Attendance Management</h3>
                </div>
                <p className={styles.cardDescription}>
                  We monitor virtual assistants to ensure they’re focused on your tasks.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><CreditCard className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Payroll & HR</h3>
                </div>
                <p className={styles.cardDescription}>
                  Our team handles payroll and HR, saving you time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section (Banner) */}
        <section id="demo" className={`${styles.demoSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <h2 className={styles.demoText}>See MedVirtual in Action</h2>
            <p className={styles.demoSubtitle}>
              Watch how our virtual assistants manage dental practice tasks in real-time.
            </p>
            <ul className={styles.demoList}>
              {[
                "Scheduling a new patient appointment",
                "Processing insurance verification",
                "Sending automated reminders",
                "Managing post-treatment follow-ups",
              ].map((item, i) => (
                <li key={i} className={styles.demoListItem}>
                  <CheckCircle2 className={styles.demoListIcon} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButton}>
              Request Full Demo
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={`${styles.testimonialsSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Hear from Medical Professionals</h2>
              <p className={styles.sectionSubtitle}>
                Discover how MedVirtual has transformed practices for dental and medical professionals.
              </p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialImage}>
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name} Testimonial`}
                      fill
                    />
                  </div>
                  <blockquote className={styles.testimonialQuote}>
                    "{testimonial.quote}"
                  </blockquote>
                  <p className={styles.testimonialName}>{testimonial.name}</p>
                  <p className={styles.testimonialRole}>{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className={`${styles.benefitsSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Why Dental Practices Choose MedVirtual</h2>
              <p className={styles.sectionSubtitle}>
                Our solution is built for the unique needs of dental clinics, helping you scale while focusing on patient care.
              </p>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <Shield className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>HIPAA Compliant</h3>
                <p className={styles.benefitDescription}>
                  Bank-level encryption ensures all patient data is protected.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <CreditCard className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Cost Savings</h3>
                <p className={styles.benefitDescription}>
                  Reduce staffing costs by up to 40% while improving efficiency.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <ArrowRight className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Scalability</h3>
                <p className={styles.benefitDescription}>
                  Scale your team as your practice grows, without hiring headaches.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Users className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Patient Experience</h3>
                <p className={styles.benefitDescription}>
                  Enhance patient satisfaction with timely communication.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <Calendar className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Time Efficiency</h3>
                <p className={styles.benefitDescription}>
                  Reclaim up to 30 hours per week for patient care.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <BarChart3 className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Data Insights</h3>
                <p className={styles.benefitDescription}>
                  Gain insights with detailed analytics and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className={`${styles.ctaSection} ${styles.fullWidth}`}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>
              {firstName}, Ready to Transform {company} with MedVirtual?
            </h2>
            <p className={styles.ctaSubtitle}>
              Schedule a personalized demo to see how our virtual assistants can support your dental practice.
            </p>
            <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButton}>
              Book a Demo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${styles.footer} ${styles.fullWidth}`}>
        <div className={`${styles.container} ${styles.footerContainer}`}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoText}>MedVirtual</span>
          </div>
          <div>
            <Link href="https://www.medvirtual.ai/privacy-policy" className={styles.footerLink}>
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className={`${styles.container} ${styles.footerText}`}>
          <p>© {new Date().getFullYear()} MedVirtual. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}