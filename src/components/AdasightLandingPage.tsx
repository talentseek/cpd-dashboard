// /Users/mbeckett/Documents/codeprojects/website_projects/cpd-dashboard/src/components/AdasightLandingPage.tsx

/* eslint-disable react/no-unescaped-entities */

"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import styles from "@/components/styles/adasight-landing-page.module.css"

interface AdasightLandingPageProps {
  firstName: string
  lastName: string
  company: string
  position: string // New prop for pre-populating the role
}

export default function AdasightLandingPage({ firstName, lastName, company, position }: AdasightLandingPageProps) {
  const formRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    companyName: company || "",
    role: position || "", // Pre-populate with position
    challenge: "",
    topics: {
      eventTracking: false,
      funnels: false,
      retention: false,
      attribution: false,
      experimentation: false,
      other: false,
      otherText: "",
    },
  })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      topics: {
        ...prev.topics,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare query parameters for Cal.com
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    const selectedTopics = Object.entries(formData.topics)
      .filter(([key, value]) => value && key !== "other" && key !== "otherText")
      .map(([key]) => key)
      .join(", ")

    const queryParams = new URLSearchParams({
      name: fullName,
      company: formData.companyName,
      role: formData.role,
      notes: formData.challenge,
      topics: selectedTopics,
    })

    // Redirect to Cal.com with pre-filled fields
    const calComUrl = `https://cal.com/gregor.spielmann/amplitude-training?${queryParams.toString()}`
    window.location.href = calComUrl
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const experts = [
    {
      name: "Gregor Spielmann",
      role: "Former Amplitude | Product & Behavioral Analytics",
      image: "/images/abm/adasight/gregor.jpeg?height=120&width=120",
    },
    {
      name: "Moaaz Khan",
      role: "Data Analyst at Make.com | Product, Growth & Marketing Analytics",
      image: "/images/abm/adasight/moaaz.jpeg?height=120&width=120",
    },
    {
      name: "Dayana Marin",
      role: "Former Booking | Growth at Adasight",
      image: "/images/abm/adasight/dayana.jpeg?height=120&width=120",
    },
    {
      name: "Oleg Musteata",
      role: "Former Crunchyroll | Growth & Experimentation at Adasight",
      image: "/images/abm/adasight/oleg.jpeg?height=120&width=120",
    },
    {
      name: "Olivia Natasha",
      role: "Former Gojek | Marketing Analytics at Adasight",
      image: "/images/abm/adasight/olivia.jpeg?height=120&width=120",
    },
    {
      name: "Ahmad Malik",
      role: "Former Markaz | Data Infrastructure & Integrations",
      image: "/images/abm/adasight/ahmad.jpeg?height=120&width=120",
    },
  ]

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.logo}>
          <Image src="/images/abm/adasight/logo.svg" alt="Adasight Logo" width={160} height={40} />
        </div>
        <button onClick={scrollToForm} className={styles.ctaButton}>
          Apply Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <motion.div className={styles.heroContent} initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className={styles.heroTitle}>
              {firstName}, Unlock Amplitude's Full Potential for {company}
            </h1>
            <p className={styles.heroSubtitle}>
              🚀 Struggling to get insights from Amplitude at {company}? Most training is generic—this isn't. We work
              live with your data to solve real challenges.
            </p>
            <button onClick={scrollToForm} className={styles.ctaButton}>
              Join Our Free Pilot
            </button>
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className={styles.heroImageContainer}>
            <Image
              src="/images/abm/adasight/amplitude.png"
              alt="Amplitude Training"
              width={500}
              height={400}
              className={styles.heroImage}
            />
          </motion.div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className={styles.benefitsSection}>
        <motion.div
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className={styles.sectionTitle}>What You'll Get</h2>

          <div className={styles.benefitsList}>
            <ul className={styles.checkList}>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>✅</span>
                <span>Hands-on problem-solving with your Amplitude data</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>✅</span>
                <span>Live expert-led session—no theory, just real solutions</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>✅</span>
                <span>Tangible results—walk away with answers to your specific challenges</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Meet the Experts Section */}
      <section className={styles.expertsSection}>
        <motion.div
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet the Experts</h2>
            <p className={styles.sectionSubtitle}>
              Our Amplitude-certified team has worked with companies like Booking.com, Crunchyroll, Amplitude, Gojek,
              and more:
            </p>
          </div>

          <div className={styles.expertsGrid}>
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                className={styles.expertCard}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.expertImageContainer}>
                  <Image
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    width={120}
                    height={120}
                    className={styles.expertImage}
                  />
                </div>
                <h3 className={styles.expertName}>{expert.name}</h3>
                <p className={styles.expertRole}>{expert.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Form Section */}
      <section id="apply" ref={formRef} className={styles.formSection}>
        <motion.div
          className={styles.sectionContent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Join Our Free Pilot</h2>
            <p className={styles.sectionSubtitle}>
              🚀 We're refining this format and offering five free spots before launching as a paid service.
            </p>
          </div>

          <div className={styles.benefitsList}>
            <ul className={styles.checkList}>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>
                  <Check size={20} />
                </span>
                <span>Simple sign-up—no friction.</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>📅</span>
                <span>We schedule your session if selected—no lengthy process.</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkIcon}>📩</span>
                <span>Limited spots! Apply now before they fill up.</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="companyName" className={styles.formLabel}>
                  Company Name*
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="role" className={styles.formLabel}>
                  Your Role*
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="challenge" className={styles.formLabel}>
                What's your biggest Amplitude challenge?
              </label>
              <textarea
                id="challenge"
                name="challenge"
                rows={4}
                value={formData.challenge}
                onChange={handleInputChange}
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.formGroup}>
              <p className={styles.formLabel}>What topics interest you most?</p>
              <div className={styles.checkboxGrid}>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="eventTracking"
                    name="eventTracking"
                    checked={formData.topics.eventTracking}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="eventTracking" className={styles.checkboxLabel}>
                    Event tracking & implementation
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="funnels"
                    name="funnels"
                    checked={formData.topics.funnels}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="funnels" className={styles.checkboxLabel}>
                    Funnels & conversion
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="retention"
                    name="retention"
                    checked={formData.topics.retention}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="retention" className={styles.checkboxLabel}>
                    Retention analysis
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="attribution"
                    name="attribution"
                    checked={formData.topics.attribution}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="attribution" className={styles.checkboxLabel}>
                    Attribution & marketing performance
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="experimentation"
                    name="experimentation"
                    checked={formData.topics.experimentation}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="experimentation" className={styles.checkboxLabel}>
                    Experimentation & A/B testing
                  </label>
                </div>

                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    checked={formData.topics.other}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor="other" className={styles.checkboxLabel}>
                    Other
                  </label>
                </div>
              </div>

              {formData.topics.other && (
                <div className={styles.formGroup}>
                  <label htmlFor="otherText" className={styles.formLabel}>
                    Please specify:
                  </label>
                  <input
                    type="text"
                    id="otherText"
                    name="otherText"
                    value={formData.topics.otherText}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        topics: {
                          ...prev.topics,
                          otherText: e.target.value,
                        },
                      }))
                    }
                    className={styles.formInput}
                  />
                </div>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              Apply Now – 5 Spots Available for the Amplitude Community
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>© {new Date().getFullYear()} Adasight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}