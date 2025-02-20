"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <ul className="flex flex-col gap-2">
        {["hero", "landscape", "data", "blueprint", "integration", "roi", "cta"].map((section) => (
          <li key={section}>
            <Button
              variant="outline"
              size="icon"
              className="w-3 h-3 rounded-full bg-[#9ecc3b] border-[#9ecc3b] hover:bg-[#c4d0ff] hover:border-[#c4d0ff]"
              onClick={() => scrollTo(section)}
            >
              <span className="sr-only">Scroll to {section}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FloatingNav

