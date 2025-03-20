// /Users/mbeckett/Documents/codeprojects/website_projects/cpd-dashboard/src/components/CleverlyLandingPage.tsx
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import styles from './styles/CleverlyLandingPage.module.css';
import { ArrowRight, FileWarning, Users, PoundSterling, Clipboard, Clock, Building, CheckCircle } from 'lucide-react';

interface Replacements {
  first_name: string;
  company: string;
  custom: Record<string, string>;
  vc: Record<string, string>;
}

interface CleverlyLandingPageProps {
  replacements: Replacements;
}

const CleverlyLandingPage: React.FC<CleverlyLandingPageProps> = ({ replacements }) => {
  const { first_name: firstName, company } = replacements;

  // Pain-to-Solution Data
  const painPoints = [
    {
      icon: <FileWarning className={styles.painIcon} />,
      title: 'Compliance Nightmares',
      problem: `Regulations keep shifting. Miss one check, and ${company} could face huge fines.`,
      solution: `Automated compliance tracking keeps ${company} ahead of the curve.`,
    },
    {
      icon: <Users className={styles.painIcon} />,
      title: 'Workforce Woes',
      problem: `Short-staffed and high turnover plague ${company}'s team.`,
      solution: `Streamlined tools boost ${company}'s workforce efficiency.`,
    },
    {
      icon: <PoundSterling className={styles.painIcon} />,
      title: 'Financial Strain',
      problem: `Rising costs squeeze ${company}'s margins daily.`,
      solution: `Real-time insights protect ${company}'s bottom line.`,
    },
    {
      icon: <Clipboard className={styles.painIcon} />,
      title: 'Operational Chaos',
      problem: `${company} juggles too many systems and breakdowns.`,
      solution: `One platform unifies ${company}'s operations.`,
    },
    {
      icon: <Clock className={styles.painIcon} />,
      title: 'Time Pressure',
      problem: `No time to grow ${company} amid constant crises.`,
      solution: `Automation saves ${firstName} 15+ hours weekly.`,
    },
    {
      icon: <Building className={styles.painIcon} />,
      title: 'Coordination Headaches',
      problem: `Multiple sites overwhelm ${company}'s oversight.`,
      solution: `Multi-site tools give ${firstName} total visibility.`,
    },
  ];

  // Day in the Life Timeline Data
  const timelineEvents = [
    {
      time: '8:00 AM',
      title: 'Inbox Overload',
      description: `${firstName}'s day at ${company} starts with a compliance scare.`,
    },
    {
      time: '9:15 AM',
      title: 'Emergency Call',
      description: `A client calls ${company} about a broken HVAC system—again. Two engineers are out sick.`,
    },
    {
      time: '11:30 AM',
      title: 'Compliance Deadline',
      description: `${firstName} scrambles to meet a regulatory deadline for ${company}.`,
    },
    {
      time: '1:45 PM',
      title: 'Budget Meeting',
      description: `Rising costs dominate ${company}'s budget talks, stressing ${firstName}.`,
    },
    {
      time: '4:30 PM',
      title: 'Late Finish',
      description: `${firstName} stays late to catch up on ${company}'s paperwork.`,
    },
    {
      time: '8:00 PM',
      title: 'Weekend Work',
      description: `${company}'s chaos spills into ${firstName}'s weekend.`,
    },
  ];

  // Success Metrics Data
  const successMetrics = [
    {
      value: '15',
      unit: 'hours',
      description: 'Average time saved per week on administrative tasks',
    },
    {
      value: '20',
      unit: '%',
      description: 'Reduction in equipment downtime through predictive maintenance',
    },
    {
      value: '100',
      unit: '%',
      description: 'Compliance confidence with automated tracking and reporting',
    },
  ];

  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <header className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Image
              src="/images/abm/cleverly/logo.webp"
              alt="Cleverly Works Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
          <a href="https://cal.com/cleverly/30min" className={styles.navButton}>
            Book a Demo
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Exclusively for {company}</span>
          <h1 className={styles.heroHeading}>
            Hey {firstName}, Tired of Fighting Fires at {company}?
          </h1>
          <p className={styles.heroSubheading}>
            We get it—FM chaos is overwhelming.{' '}
            <span className={styles.heroHighlight}>Cleverly Works restores your control.</span>
          </p>
          <a href="https://cal.com/cleverly/30min" className={styles.heroButton}>
            Book a Demo
            <ArrowRight className={styles.buttonIcon} />
          </a>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/abm/cleverly/Infographics1.png"
            alt="Cleverly Works Infographic"
            width={600}
            height={400}
            className={styles.dashboardImage}
          />
        </div>
      </section>

      {/* Struggle Section */}
      <section className={styles.struggle}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>
            A Day in Your Life at {company}, {firstName}
          </h2>
          <p className={styles.sectionSubheading}>
            Your day starts with a compliance scare, your team is stretched thin, and spreadsheets never end.
          </p>

          {/* Timeline */}
          <div className={styles.timeline}>
            {timelineEvents.map((event, index) => (
              <div key={index} className={styles.timelineEvent}>
                <span className={styles.timelineTime}>{event.time}</span>
                <div className={styles.timelineDetails}>
                  <h3 className={styles.timelineTitle}>{event.title}</h3>
                  <p className={styles.timelineDescription}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pain Points */}
          <div className={styles.painPoints}>
            {painPoints.map((pain, index) => (
              <div key={index} className={styles.flipCard}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    {pain.icon}
                    <h3 className={styles.painTitle}>{pain.title}</h3>
                    <p className={styles.painDescription}>{pain.problem}</p>
                  </div>
                  <div className={styles.flipCardBack}>
                    <h3 className={styles.painSolutionTitle}>Solution</h3>
                    <p className={styles.painSolutionDescription}>{pain.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turning Point Section */}
      <section className={styles.turningPoint}>
        <div className={styles.sectionContent}>
          <span className={styles.sectionBadge}>The Turning Point</span>
          <h2 className={styles.sectionHeading}>Then Cleverly Steps In</h2>
          <p className={styles.sectionSubheading}>
            One platform replaces ten tabs, automation kills busywork, and compliance becomes a breeze.
          </p>

          {/* Before Cleverly */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>Before Cleverly</span>
          </div>
          <div className={styles.beforeAfter}>
            <div className={styles.before}>
              <div className={styles.beforeDetails}>
                <div className={styles.detailItem}>
                  <Clock className={styles.detailIcon} />
                  <div>
                    <h3 className={styles.detailTitle}>Wasted Time</h3>
                    <p className={styles.detailDescription}>
                      15+ hours weekly spent on manual data entry, chasing updates, and compiling reports.
                    </p>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <FileWarning className={styles.detailIcon} />
                  <div>
                    <h3 className={styles.detailTitle}>Compliance Risks</h3>
                    <p className={styles.detailDescription}>
                      Critical safety checks falling through the cracks with potential for costly penalties.
                    </p>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <PoundSterling className={styles.detailIcon} />
                  <div>
                    <h3 className={styles.detailTitle}>Revenue Leakage</h3>
                    <p className={styles.detailDescription}>
                      Unbilled work, missed opportunities, and inefficient resource allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* With Cleverly */}
          <div className={styles.divider}>
            <span className={styles.dividerTextWith}>With Cleverly</span>
          </div>
          <div className={styles.beforeAfter}>
            <div className={styles.afterDetails}>
              <div className={styles.detailItem}>
                <CheckCircle className={styles.detailIconSuccess} />
                <div>
                  <h3 className={styles.detailTitle}>Time Reclaimed</h3>
                  <p className={styles.detailDescription}>
                    Automation handles routine tasks, freeing you to focus on strategic priorities.
                  </p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <CheckCircle className={styles.detailIconSuccess} />
                <div>
                  <h3 className={styles.detailTitle}>Compliance Confidence</h3>
                  <p className={styles.detailDescription}>
                    Automated tracking, reminders, and audit-ready reports keep you protected.
                  </p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <CheckCircle className={styles.detailIconSuccess} />
                <div>
                  <h3 className={styles.detailTitle}>Profitability Boost</h3>
                  <p className={styles.detailDescription}>
                    Capture all billable work, optimize resource allocation, and reduce waste.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.after}>
              <div className={styles.afterImage}>
                <Image
                  src="/images/abm/cleverly/Infographics4.png"
                  alt="Cleverly Works Infographic"
                  width={600}
                  height={400}
                  className={styles.dashboardImage}
                />
                <span className={styles.afterBadge}>All systems connected</span>
                <div className={styles.afterStatus}>
                  <p className={styles.statusItem}>
                    <CheckCircle className={styles.statusIcon} /> All compliance checks up-to-date
                  </p>
                  <p className={styles.statusItem}>
                    <CheckCircle className={styles.statusIcon} /> Maintenance schedule optimized
                  </p>
                  <p className={styles.statusItem}>
                    <CheckCircle className={styles.statusIcon} /> Reports generated automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Break */}
      <section className={styles.credibility}>
        <div className={styles.sectionContent}>
          <h3 className={styles.credibilityHeading}>Trusted by FM Leaders Like These</h3>
          <p className={styles.credibilitySubheading}>
            Join the community of forward-thinking facilities management companies.
          </p>
          <div className={styles.logos}>
            {['/images/abm/cleverly/company1.png', '/images/abm/cleverly/company2.png', '/images/abm/cleverly/company3.png', '/images/abm/cleverly/company4.png'].map((logo, index) => (
              <div key={index} className={styles.logoItem}>
                <Image
                  src={`/${logo}`}
                  alt={`Company ${index + 1}`}
                  height={60}
                  className={styles.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section className={styles.success}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Real Results for FM Leaders</h2>
          <p className={styles.sectionSubheading}>
            Don’t just take our word for it—see the tangible impact Cleverly has made for businesses like yours.
          </p>
          <div className={styles.metrics}>
            {successMetrics.map((metric, index) => (
              <div key={index} className={styles.metric}>
                <h3 className={styles.metricValue}>
                  {metric.value}
                  <span className={styles.metricUnit}>{metric.unit}</span>
                </h3>
                <p className={styles.metricDescription}>{metric.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <div className={styles.testimonialAvatar}>
                <span className={styles.avatarInitials}>EW</span>
              </div>
              <div>
                <div className={styles.testimonialHeader}>
                  <h4 className={styles.testimonialName}>Edward Wick</h4>
                  <span className={styles.testimonialTitle}>
                    Co-Founder & Managing Director, Penguin FM
                  </span>
                </div>
                <blockquote className={styles.testimonialQuote}>
                  "Before Cleverly, I was drowning in spreadsheets and constantly chasing my team for updates. Now I
                  have complete visibility across all our sites, compliance is automated, and I’ve reclaimed my Sundays.
                  The platform has transformed how we operate—it’s like having an extra operations manager without the
                  salary cost."
                </blockquote>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={styles.star} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.sectionContent}>
          <h2 className={styles.ctaHeading}>
            Ready to Transform {company}, {firstName}?
          </h2>
          <p className={styles.ctaSubheading}>
            Take control with Cleverly. Book your demo today.
          </p>
          <a href="https://cal.com/cleverly/30min" className={styles.ctaButton}>
            Book a Demo
            <ArrowRight className={styles.buttonIcon} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CleverlyLandingPage;