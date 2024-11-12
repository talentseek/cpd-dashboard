// src/components/abm/Navigation.tsx

'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export interface NavigationProps {
  logo?: string;
  ctaButtonText?: string;
  primaryColor?: string;
  showPricing?: boolean;
  ctaLink?: string;
}

export function Navigation({
  logo = '/images/default-logo.png',
  ctaButtonText = 'Book my tour',
  primaryColor = '#0000FF',
  showPricing = true,
  ctaLink,
}: NavigationProps) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor, color: '#fff' } : {};

  return (
    <header className="fixed w-full px-4 lg:px-6 h-20 flex items-center bg-white dark:bg-gray-800 shadow z-50">
      <div className="flex items-center w-full max-w-5xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image 
            src={logo} 
            alt="Client Logo" 
            width={150}
            height={150}
            className="mr-4"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: "smooth" })}>
            Benefits
          </Button>
          <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: "smooth" })}>
            Features
          </Button>
          {showPricing && (
            <Button variant="ghost" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: "smooth" })}>
              Pricing
            </Button>
          )}
          {ctaLink ? (
            <Link href={ctaLink} passHref>
              <Button style={buttonStyle} size="lg">
                {ctaButtonText}
              </Button>
            </Link>
          ) : (
            <Button style={buttonStyle} size="lg">
              {ctaButtonText}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}