import type React from "react"

interface FullScreenSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const FullScreenSection: React.FC<FullScreenSectionProps> = ({ children, className, id }) => {
  return (
    <section id={id} className={`min-h-screen flex items-center justify-center py-20 ${className}`}>
      {children}
    </section>
  )
}

export default FullScreenSection

