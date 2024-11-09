// src/components/abm/Navigation.tsx

'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MountainIcon } from "@/components/abm/icons"

export function Navigation({ logo, ctaButtonText, primaryColor, showPricing = true }) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor, color: '#fff' } : {}

  const handleScroll = (section: string) => {
    const targetSection = document.getElementById(section)
    targetSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed w-full px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow z-50">
      <div className="flex items-center w-full max-w-5xl mx-auto">
        <Link className="flex items-center" href="#">
          {logo && <img src={logo} alt="Logo" className="h-6 mr-2" />}
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" onClick={() => handleScroll('benefits')}>
            Benefits
          </Button>
          <Button variant="ghost" onClick={() => handleScroll('features')}>
            Features
          </Button>
          {showPricing && (
            <Button variant="ghost" onClick={() => handleScroll('pricing')}>
              Pricing
            </Button>
          )}
          <Button style={buttonStyle} size="lg" onClick={() => handleScroll('contact')}>
            {ctaButtonText || 'Book my tour'}
          </Button>
        </nav>
      </div>
    </header>
  )
}