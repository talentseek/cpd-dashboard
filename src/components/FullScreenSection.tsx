import type React from "react"
import styles from "@/components/styles/FullScreenSection.module.css"

interface FullScreenSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const FullScreenSection: React.FC<FullScreenSectionProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      {children}
    </section>
  )
}

export default FullScreenSection