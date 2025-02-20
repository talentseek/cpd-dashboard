"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset
      const sectionPosition = section.offsetTop
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      if (scrollPosition + viewportHeight > sectionPosition && scrollPosition < sectionPosition + sectionHeight) {
        const parallaxOffset = (scrollPosition + viewportHeight - sectionPosition) * 0.2 // Reduced from 0.4 to 0.2
        section.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00334B]/90"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default ParallaxSection

