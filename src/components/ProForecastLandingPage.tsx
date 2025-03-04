"use client";

import Image from "next/image";
import InteractiveCard from "@/components/InteractiveCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import FullScreenSection from "@/components/FullScreenSection";
import TerrainMap from "@/components/TerrainMap";
import IntegrationSection from "@/components/IntegrationSection";
import TransformationSection from "@/components/TransformationSection";
import Link from "next/link";
import { ReplaceText, CustomReplacements } from "@/components/ReplaceText";
import styles from "@/components/styles/ProForecastLandingPage.module.css";

const defaultReplacements: CustomReplacements = {
  first_name: "{first_name}",
  company: "{company}",
};

export default function ProForecastLandingPage({
  replacements = defaultReplacements,
}: {
  replacements?: CustomReplacements;
}) {
  return (
    <div className={styles.container}>
      <FloatingNav />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Image
            src="/images/abm/proforecast/logo.svg"
            alt="ProForecast Logo"
            width={150}
            height={20}
          />
          <Button
            className={styles.bookDemoButton}
            onClick={() => window.location.href = "#book-demo"} // Placeholder until actual demo link is provided
          >
            Book a Demo
          </Button>
        </div>
      </header>

      {/* 1. Welcome & Introduction */}
      <FullScreenSection id="hero" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Hello <span className={styles.highlight}><ReplaceText text="{first_name}" replacements={replacements} /></span>, Welcome to Your Financial Odyssey at{" "}
            <span className={styles.companyHighlight}><ReplaceText text="{company}" replacements={replacements} /></span>
          </h1>
          <p className={styles.heroDescription}>
            Embark on a journey of financial transformation where every decision is driven by accurate forecasts and actionable insights.
          </p>
          <Button
            className={styles.heroButton}
            onClick={() => window.location.href = "#book-demo"} // Placeholder until actual demo link is provided
          >
            Begin Your Journey
          </Button>
        </div>
      </FullScreenSection>

      {/* 2. Your Vision & Mission */}
      <FullScreenSection id="vision" className={styles.visionSection}>
        <div className={styles.visionContainer}>
          <h2 className={styles.visionTitle}>Your Vision & Mission</h2>
          <p className={styles.visionDescription}>
            At <ReplaceText text="{company}" replacements={replacements} />, your mission drives every decision. Imagine a future where every financial action is guided by real-time insights and smart, proactive strategies.
          </p>
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <h3 className={styles.visionCardTitle}>Purpose</h3>
              <p className={styles.visionCardText}>Drive financial innovation with cutting-edge tools and strategic foresight.</p>
            </div>
            <div className={styles.visionCard}>
              <h3 className={styles.visionCardTitle}>Vision</h3>
              <p className={styles.visionCardText}>Shape a future where data and insight fuel growth and long-term value.</p>
            </div>
            <div className={styles.visionCard}>
              <h3 className={styles.visionCardTitle}>Strategy</h3>
              <p className={styles.visionCardText}>Transform challenges into opportunities through precise forecasting and detailed scenario planning.</p>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* 3. Mapping the Landscape */}
      <FullScreenSection id="landscape" className={styles.landscapeSection}>
        <div className={styles.landscapeContainer}>
          <h2 className={styles.landscapeTitle}>Mapping the Landscape: Challenges & Opportunities</h2>
          <p className={styles.landscapeDescription}>
            Navigate the complex terrain of your industry with precision and foresight, uncovering hidden risks and emerging opportunities that impact <ReplaceText text="{company}" replacements={replacements} />{"'"}s bottom line.
          </p>
          <TerrainMap />
        </div>
      </FullScreenSection>

      {/* 4. Transforming Data */}
      <FullScreenSection id="data" className={styles.dataSection}>
        <div className={styles.dataContainer}>
          <h2 className={styles.dataTitle}>Transforming Data into Actionable Intelligence</h2>
          <p className={styles.dataDescription}>
            Unlock real-time, customized dashboards that convert raw data into strategic insights for <span className={styles.highlight}><ReplaceText text="{company}" replacements={replacements} /></span>.
            Leverage detailed analytics to recognize opportunities, manage risks, and drive sustainable growth.
          </p>
          <div className={styles.dataGrid}>
            <InteractiveCard
              title="Revenue Insights"
              description="Accurately track revenue trends and forecast growth with real-time data."
              imageSrc="/images/abm/proforecast/dashboards/sales.jpeg"
            />
            <InteractiveCard
              title="Expense Analysis"
              description="Identify cost drivers and optimize spending patterns with detailed breakdowns."
              imageSrc="/images/abm/proforecast/dashboards/budget.jpg"
            />
            <InteractiveCard
              title="Cash Flow Projections"
              description="Anticipate future cash flows and mitigate risks with predictive modeling."
              imageSrc="/images/abm/proforecast/dashboards/pl.jpg"
            />
          </div>
        </div>
      </FullScreenSection>

      {/* 5. Your Unique Financial Blueprint */}
      <FullScreenSection id="blueprint" className={styles.blueprintSection}>
        <div className={styles.blueprintContainer}>
          <h2 className={styles.blueprintTitle}>Your Unique Financial Blueprint</h2>
          <p className={styles.blueprintDescription}>
            Discover a tailor-made financial blueprint that positions <ReplaceText text="{company}" replacements={replacements} /> as a leader in your industry. Our solution drives innovation, improves forecasting accuracy, and unlocks long-term value.
          </p>
          <div className={styles.blueprintGrid}>
            <div className={styles.blueprintCard}>
              <h3 className={styles.blueprintCardTitle}>Core Strengths</h3>
              <ul className={styles.blueprintList}>
                <li>Innovative financial strategies</li>
                <li>Robust risk management</li>
              </ul>
            </div>
            <div className={styles.blueprintCard}>
              <h3 className={styles.blueprintCardTitle}>Key Products</h3>
              <ul className={styles.blueprintList}>
                <li>Real-time financial dashboards</li>
                <li>Predictive analytics tools</li>
                <li>Automated reporting systems</li>
              </ul>
            </div>
            <div className={styles.blueprintCard}>
              <h3 className={styles.blueprintCardTitle}>Strategic Objectives</h3>
              <ul className={styles.blueprintList}>
                <li>Increase operational efficiency</li>
                <li>Enhance decision-making accuracy</li>
                <li>Drive sustainable growth</li>
              </ul>
            </div>
          </div>
        </div>
      </FullScreenSection>

      {/* 6. Seamless Integration */}
      <FullScreenSection id="integration" className={styles.integrationSection}>
        <div className={styles.integrationContainer}>
          <h2 className={styles.integrationTitle}>Seamless Integration & Intelligent Automation</h2>
          <p className={styles.integrationDescription}>
            Experience a unified platform that streamlines <ReplaceText text="{company}" replacements={replacements} />{"'"}s operations, automates routine processes, and empowers you to focus on what truly matters: strategic leadership.
          </p>
          <IntegrationSection />
        </div>
      </FullScreenSection>

      {/* 7. Driving Financial Mastery */}
      <FullScreenSection id="transformation" className={styles.transformationSection}>
        <div className={styles.transformationContainer}>
          <h2 className={styles.transformationTitle}>Driving Financial Mastery & Strategic Transformation</h2>
          <p className={styles.transformationDescription}>
            Imagine a world where every decision at <ReplaceText text="{company}" replacements={replacements} /> is backed by precise, forward-looking insights. These insights empower you to navigate uncertainty, optimize cash flow, and drive transformative growth.
          </p>
          <div className={styles.successCard}>
            <h3 className={styles.successCardTitle}>The Power of Accurate Forecasting</h3>
            <ul className={styles.successList}>
              <li>Only 1 in 5 senior executives produce accurate forecasts.</li>
              <li>On average, forecasts deviate by 13%.</li>
              <li>Poor forecasting erodes investor confidence and share prices.</li>
              <li>Organizations with forecasts within 5% accuracy experience share price increases.</li>
              <li>Accurate forecasting enables better risk management, opportunity recognition, and milestone setting.</li>
              <li>Leaders who reward forecast accuracy and employ advanced scenario planning achieve superior performance.</li>
            </ul>
            <p className={styles.successSource}>Source: KPMG survey of 540 senior executives (including 168 CFOs)</p>
          </div>
          <TransformationSection />
        </div>
      </FullScreenSection>

      {/* 8. Call-to-Action */}
      <FullScreenSection id="cta" className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://player.vimeo.com/video/800686265"
              className={styles.videoIframe}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="ProForecast Overview Video"
            ></iframe>
          </div>
          <h2 className={styles.ctaTitle}>
            Begin Your Transformation, <ReplaceText text="{first_name}" replacements={replacements} />!
          </h2>
          <p className={styles.ctaDescription}>
            Take the first step towards transforming <ReplaceText text="{company}" replacements={replacements} />{"'"}s financial future. Begin your personalized journey to strategic clarity and operational excellence today.
          </p>
          <Button
            className={styles.ctaButton}
            onClick={() => window.location.href = "#book-demo"} // Placeholder until actual demo link is provided
          >
            Book Your Demo
          </Button>
        </div>
      </FullScreenSection>

      {/* 9. Closing */}
      <FullScreenSection id="closing" className={styles.closingSection}>
        <div className={styles.closingContainer}>
          <h2 className={styles.closingTitle}>Your Continuous Journey</h2>
          <p className={styles.closingDescription}>
            Every day brings new opportunities. Let ProForecast be your trusted partner in transforming challenges into actionable insights and turning potential into performance at <ReplaceText text="{company}" replacements={replacements} />.
          </p>
          <Link href="https://proforecast.com/tutorials/" target="_blank" className={styles.tutorialLink}>
            Not ready for a demo yet but want to learn more? Visit our tutorials section <ArrowRight className={styles.arrowIcon} />
          </Link>
        </div>
      </FullScreenSection>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Image src="/images/abm/proforecast/logo.svg" alt="ProForecast Logo" width={120} height={16} />
          <p className={styles.footerText}>© {new Date().getFullYear()} ProForecast. All rights reserved.</p>
          <nav className={styles.footerNav}>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            <Link href="#connect" className={styles.footerLink}>Connect with Us</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}