// src/components/abm/HeroSection.tsx

'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroSectionProps } from "@/types/abmLandingPage";
import Link from 'next/link';

export function HeroSection({
  title,
  subheading,
  ctaText = "Book my tour",
  learnMoreText = "Learn more",
  heroImage,
  primaryColor,
  ctaLink,
}: HeroSectionProps) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor } : {};

  return (
    <section className="w-full flex items-center justify-center min-h-screen py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-12 xl:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold sm:text-5xl xl:text-6xl text-left w-full leading-tight">
              {title}
            </h1>
            <p className="text-zinc-500 md:text-xl dark:text-zinc-400 max-w-xl mx-auto lg:mx-0">
              {subheading.trim()}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              {ctaLink ? (
                <Link href={ctaLink} passHref>
                  <Button size="lg" style={buttonStyle}>{ctaText}</Button>
                </Link>
              ) : (
                <Button size="lg" style={buttonStyle}>{ctaText}</Button>
              )}
              <Button size="lg" variant="outline" onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}>
                {learnMoreText}
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              alt="Hero"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:w-auto"
              height={500}
              width={500}
              src={heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}