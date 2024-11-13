// src/components/abm/HeroSection.tsx

'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';

export interface HeroSectionProps {
  title: string;
  subheading?: string;
  ctaText?: string;
  learnMoreText?: string;
  heroImage?: string;
  heroVideo?: string;
  primaryColor?: string;
  ctaLink?: string;
}

export function HeroSection({
  title,
  subheading = '',
  ctaText = "Book my tour",
  learnMoreText = "Learn more",
  heroImage = '/images/default-hero-image.jpg',
  heroVideo,
  primaryColor,
  ctaLink,
}: HeroSectionProps) {
  const buttonStyle = primaryColor ? { backgroundColor: primaryColor } : {};

  return (
    <section className="w-full flex items-center justify-center min-h-screen py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-12 xl:grid-cols-[1fr_auto] items-center">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left max-w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight break-words max-w-full lg:max-w-2xl">
              {title}
            </h1>
            <p className="text-zinc-500 md:text-lg lg:text-xl dark:text-zinc-400 max-w-full lg:max-w-2xl">
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
          <div className="flex justify-center lg:justify-end w-full max-w-md lg:max-w-lg">
            {heroVideo ? (
              <video
                controls
                autoPlay
                loop
                muted
                className="rounded-xl overflow-hidden w-full max-h-[500px] object-contain"
                preload="metadata"
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                alt="Hero"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center w-full max-h-[500px]"
                height={500}
                width={500}
                src={heroImage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}