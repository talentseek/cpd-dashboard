'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface CallToActionProps {
  mainHeading: string;
  subheading: string;
  ctaButtonText: string;
  primaryColor?: string;
  ctaLink?: string;
}

export function CallToActionSection({ mainHeading, subheading, ctaButtonText, primaryColor, ctaLink }: CallToActionProps) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor, color: '#fff' } : {};

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{mainHeading}</h2>
          <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">{subheading}</p>
          {ctaLink ? (
            <Link href={ctaLink} passHref>
              <Button size="lg" style={buttonStyle}>{ctaButtonText}</Button>
            </Link>
          ) : (
            <Button size="lg" style={buttonStyle}>{ctaButtonText}</Button>
          )}
        </div>
      </div>
    </section>
  );
}