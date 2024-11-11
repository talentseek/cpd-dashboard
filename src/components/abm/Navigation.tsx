// src/components/abm/Navigation.tsx

'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {
  logo?: string;
  ctaButtonText?: string;
  primaryColor?: string;
  showPricing?: boolean;
}

export function Navigation({ logo, ctaButtonText, primaryColor, showPricing = true }: NavigationProps) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor, color: '#fff' } : {};

  const handleScroll = (section: string) => {
    const targetSection = document.getElementById(section);
    targetSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed w-full px-4 lg:px-6 h-20 flex items-center bg-white dark:bg-gray-800 shadow z-50">
      <div className="flex items-center w-full max-w-5xl mx-auto">
        <Link className="flex items-center" href="#">
          {logo ? (
            <Image 
              src={logo} 
              alt="Logo" 
              width={150} // Set desired width
              height={150} // Set desired height
              className="mr-4" // Removed width and height restrictions
              unoptimized // Optional: remove this line if not needed
            />
          ) : (
            <span className="text-gray-600 dark:text-gray-300">Logo not provided</span> // Fallback text
          )}
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
  );
}