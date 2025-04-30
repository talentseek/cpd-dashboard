/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, CreditCard, Shield, Users, MessageSquare, BarChart3, CheckCircle2 } from "lucide-react";
import styles from "@/components/styles/MedVirtualABM.module.css";

interface MedVirtualABMLandingPageProps {
  firstName?: string;
  company?: string;
}

export default function MedVirtualABMLandingPage({
  firstName = "Alex",
  company = "BrightSmile Dental",
}: MedVirtualABMLandingPageProps) {
  const testimonials = [
    {
      quote: "MedVirtual makes running my business easier with HIPAA-compliant VAs. I'm excited for the possibilities!",
      name: "Samantha Blank",
      role: "Director at Social Coaching Club",
      videoUrl: "https://www.youtube.com/watch?v=NgzxEvySJAY",
      image: "/confident-professional-1.png",
    },
    {
      quote: "MedVirtual has been a lifesaver for staffing emergencies, helping us focus on patient care.",
      name: "Aaron Johnson",
      role: "Chiropractor at DC Bautch Chiropractic",
      videoUrl: "https://www.youtube.com/watch?v=RZ3wZKLsZhk",
      image: "/confident-professional-2.png",
    },
    {
      quote: "MedVirtual’s team is responsive and makes my job easier. Highly recommend!",
      name: "Jared Burbidge",
      role: "Marketing Director at Valencia Periodontics",
      videoUrl: "https://www.youtube.com/watch?v=NsyfzE9MqqQ",
      image: "/confident-professional-3.png",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <div className={styles.logoImage}>
              <div style={{ position: "relative", height: "2rem", width: "2rem" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "9999px", background: "linear-gradient(to bottom right, #2dd4bf, #06b6d4)" }}></div>
                <div style={{ position: "absolute", inset: "0.25rem", borderRadius: "9999px", background: "white" }}></div>
                <div style={{ position: "absolute", inset: "0.5rem", borderRadius: "9999px", background: "linear-gradient(to bottom right, #2dd4bf, #06b6d4)" }}></div>
              </div>
            </div>
            <span className={styles.logoText}>MedVirtual</span>
          </div>
          <nav className={styles.nav}>
            <Link href="#features" className={styles.navLink}>Features</Link>
            <Link href="#testimonials" className={styles.navLink}>Testimonials</Link>
            <Link href="#benefits" className={styles.navLink}>Benefits</Link>
            <Link href="#management" className={styles.navLink}>Staff Management</Link>
          </nav>
          <Link href="https://cal.com/medvirtual/demo" className={styles.ctaButton}>Book a Demo</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
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
                <div className={`${styles.heroButtons} lg:justify-start`}>
                  <Link href="https://cal.com/medvirtual/demo" className={styles.ctaButtonLarge}>
                    Book a Demo <ArrowRight className={styles.ctaIcon} />
                  </Link>
                  <Link href="#demo" className={styles.ctaButtonOutline}>
                    Watch Demo
                  </Link>
                </div>
                <div className={`${styles.statsRow} lg:justify-start`}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>1000+</span>
                    <span className={styles.statLabel}>Practices Helped</span>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>1500+</span>
                    <span className={styles.statLabel}>Assistants Placed</span>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>95%</span>
                    <span className={styles.statLabel}>Client Retention</span>
                  </div>
                </div>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src="/dental-hero-image.png"
                  alt="Dental Practice Workflow"
                  fill
                  style={{ objectFit: "cover" }}
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
              <h2 className={styles.sectionTitle}>Tailored Virtual Assistants for Dental Practices</h2>
              <p className={styles.sectionSubtitle}>
                Our virtual assistants—Medical Billing, Administrative Assistants, Marketing Experts, and Bookkeeping Specialists—are trained to address the unique challenges of dental clinics.
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Calendar className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Intelligent Scheduling</h3>
                </div>
                <p className={styles.cardDescription}>
                  Administrative Assistants reduce no-shows by 80% and optimize your calendar for maximum efficiency.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><CreditCard className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Automated Billing</h3>
                </div>
                <p className={styles.cardDescription}>
                  Medical Billing specialists streamline insurance verification, claims processing, and patient payments.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><MessageSquare className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Patient Follow-ups</h3>
                </div>
                <p className={styles.cardDescription}>
                  Administrative Assistants handle personalized follow-ups, improving patient outcomes and satisfaction.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Shield className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>HIPAA Compliant</h3>
                </div>
                <p className={styles.cardDescription}>
                  All virtual assistants are trained in HIPAA protocols, ensuring your practice’s data is secure.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><Users className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Marketing Support</h3>
                </div>
                <p className={styles.cardDescription}>
                  Marketing Experts enhance your online presence, attracting more patients to your practice.
                </p>
              </div>
              <div className={styles.managementCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.iconWrapper}><BarChart3 className={styles.cardIcon} /></span>
                  <h3 className={styles.cardTitle}>Bookkeeping Efficiency</h3>
                </div>
                <p className={styles.cardDescription}>
                  Bookkeeping Specialists manage your finances, reducing overhead and ensuring accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Staff Management Section */}
        <section id="management" className={styles.managementSection}>
          <div className={styles.sectionContainer}>
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

        {/* Interactive Demo Section */}
        <section id="demo" className={styles.demoSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.demoContent}>
              <div>
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
                <Link href="https://cal.com/medvirtual/demo" className={styles.ctaButtonLarge}>
                  Request Full Demo
                </Link>
              </div>
              <div className={styles.demoVideo}>
                <div className={styles.demoVideoWrapper}>
                  <Image
                    src="/dental-software-assistant.png"
                    alt="MedVirtual Demo"
                    fill
                    className={styles.demoVideoImage}
                  />
                  <div className={styles.demoVideoOverlay}>
                    <div className={styles.demoVideoPlayButton}>
                      <svg className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className={styles.testimonialsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Hear from Medical Professionals</h2>
              <p className={styles.sectionSubtitle}>
                Discover how MedVirtual has transformed practices for dental and medical professionals.
              </p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <Link href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer">
                    <div className={styles.testimonialVideo}>
                      <div className={styles.testimonialVideoWrapper}>
                        <Image
                          src={testimonial.image}
                          alt={`${testimonial.name} Testimonial`}
                          fill
                          className={styles.testimonialVideoImage}
                        />
                        <div className={styles.testimonialVideoOverlay}>
                          <div className={styles.testimonialVideoPlayButton}>
                            <svg className="h-6 w-6 text-teal-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
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
        <section id="contact" className={styles.ctaSection}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.ctaTitle}>
              {firstName}, Ready to Transform {company} with MedVirtual?
            </h2>
            <p className={styles.ctaSubtitle}>
              Schedule a personalized demo to see how our virtual assistants can support your dental practice.
            </p>
            <Link href="https://cal.com/medvirtual/demo" className={styles.ctaButtonSecondary}>
              Book a Demo <ArrowRight className={styles.ctaIcon} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <div className={styles.logoImage} style={{ position: "relative", height: "2rem", width: "2rem" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "9999px", background: "linear-gradient(to bottom right, #2dd4bf, #06b6d4)" }}></div>
              <div style={{ position: "absolute", inset: "0.25rem", borderRadius: "9999px", background: "#111827" }}></div>
              <div style={{ position: "absolute", inset: "0.5rem", borderRadius: "9999px", background: "linear-gradient(to bottom right, #2dd4bf, #06b6d4)" }}></div>
            </div>
            <span className={styles.footerLogoText}>MedVirtual</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>
        </div>
        <div className={styles.footerText}>
          <p>© {new Date().getFullYear()} MedVirtual. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}