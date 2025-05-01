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
      videoUrl: "https://www.youtube.com/watch?v=NgzxEvySJAY",
    },
    {
      quote: "MedVirtual has been a lifesaver for staffing emergencies, helping us focus on patient care.",
      name: "Aaron Johnson",
      role: "Chiropractor at DC Bautch Chiropractic",
      videoUrl: "https://www.youtube.com/watch?v=RZ3wZKLsZhk",
    },
    {
      quote: "MedVirtual’s team is responsive and makes my job easier. Highly recommend!",
      name: "Jared Burbidge",
      role: "Marketing Director at Valencia Periodontics",
      videoUrl: "https://www.youtube.com/watch?v=NsyfzE9MqqQ",
    },
  ];

  // Function to extract video ID from YouTube URL and construct thumbnail URL
  const getYouTubeThumbnail = (videoUrl: string) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0]; // Extract video ID from URL
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
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
        <section className={styles.heroSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.heroContent}>
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
                <div className={styles.heroButtons}>
                  <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButtonLarge}>
                    Book a Demo
                    <ArrowRight className={styles.ctaIcon} />
                  </Link>
                </div>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src="/images/abm/medvirtual/dental-assistant-dashboard.png"
                  alt="Dental Practice Workflow"
                  fill
                  className={styles.image}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.sectionContainer}>
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
        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Tailored Virtual Assistants for Dental Practices</h2>
                <p className={styles.sectionSubtitle}>
                  Our virtual assistants—Medical Billing, Administrative Assistants, Marketing Experts, and Bookkeeping Specialists—are trained to address the unique challenges of dental clinics.
                </p>
              </div>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <Calendar className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Intelligent Scheduling</h3>
                <p className={styles.cardDescription}>
                  Reduce no-shows and optimize your calendar for efficiency.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <CreditCard className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Automated Billing</h3>
                <p className={styles.cardDescription}>
                  Streamline insurance verification and patient payments.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <MessageSquare className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Patient Follow-ups</h3>
                <p className={styles.cardDescription}>
                  Handle personalized follow-ups to improve patient outcomes.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <Shield className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>HIPAA Compliant</h3>
                <p className={styles.cardDescription}>
                  Ensure your practice’s data is secure with trained assistants.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <Users className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Marketing Support</h3>
                <p className={styles.cardDescription}>
                  Enhance your online presence to attract more patients.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.cardIcon}>
                  <BarChart3 className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Bookkeeping Efficiency</h3>
                <p className={styles.cardDescription}>
                  Manage your finances to reduce overhead and ensure accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Staff Management Section */}
        <section id="management" className={styles.managementSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Comprehensive Virtual Staff Management</h2>
                <p className={styles.sectionSubtitle}>
                  MedVirtual takes care of hiring, security, attendance, and payroll, so your dental practice can focus on patient care.
                </p>
              </div>
            </div>
            <div className={styles.managementGrid}>
              <div className={styles.managementCard}>
                <div className={styles.cardIcon}>
                  <Users className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Hiring Process</h3>
                <p className={styles.cardDescription}>
                  We vet candidates for experience in dental workflows, ensuring you get skilled specialists.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardIcon}>
                  <Shield className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Enhanced Security</h3>
                <p className={styles.cardDescription}>
                  Advanced cybersecurity and HIPAA compliance protect your practice’s sensitive data.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardIcon}>
                  <Calendar className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Attendance Management</h3>
                <p className={styles.cardDescription}>
                  We monitor virtual assistants to ensure they’re focused on your tasks.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardIcon}>
                  <CreditCard className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>Payroll & HR</h3>
                <p className={styles.cardDescription}>
                  Our team handles payroll and HR, saving you time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className={styles.demoSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>See MedVirtual in Action</h2>
                <p className={styles.sectionSubtitle}>
                  Watch how our virtual assistants manage dental practice tasks in real-time.
                </p>
              </div>
            </div>
            <div className={styles.demoContent}>
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
              <div className={styles.heroButtons}>
                <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButtonContrast}>
                  Request Full Demo
                  <ArrowRight className={styles.ctaIcon} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={styles.testimonialsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Hear from Medical Professionals</h2>
                <p className={styles.sectionSubtitle}>
                  Discover how MedVirtual has transformed practices for dental and medical professionals.
                </p>
              </div>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <Link href={testimonial.videoUrl} className={styles.testimonialImage}>
                    <Image
                      src={getYouTubeThumbnail(testimonial.videoUrl)}
                      alt={`${testimonial.name} Testimonial`}
                      fill
                      className={styles.image}
                    />
                  </Link>
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
        <section id="benefits" className={styles.benefitsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderInner}>
                <h2 className={styles.sectionTitle}>Why Dental Practices Choose MedVirtual</h2>
                <p className={styles.sectionSubtitle}>
                  Our solution is built for the unique needs of dental clinics, helping you scale while focusing on patient care.
                </p>
              </div>
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

        {/* Final CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaText}>
                <h2 className={styles.ctaTitle}>
                  {firstName}, Ready to Transform {company} with MedVirtual?
                </h2>
                <p className={styles.ctaSubtitle}>
                  Schedule a personalized demo to see how our virtual assistants can support your dental practice.
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="https://meetings.hubspot.com/call-scheduling/medvirtual" className={styles.ctaButtonContrast}>
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
              <span className={styles.footerLogoText}>MedVirtual</span>
              <p className={styles.footerText}>
                © {new Date().getFullYear()} MedVirtual. All rights reserved.
              </p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="https://www.medvirtual.ai/privacy-policy" className={styles.footerLink}>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}