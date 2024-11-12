// src/components/abm/HowItWorksSection.tsx
'use client';

import { HowItWorksSectionProps } from "@/types/abmLandingPage";

export function HowItWorksSection({
  mainHeading = "How It Works",
  subheading = "Our streamlined process ensures you get the most out of every demo.",
  steps = [],
  primaryColor = "#000000",
}: HowItWorksSectionProps & { primaryColor?: string }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{mainHeading}</h2>
            <p className="max-w-md text-zinc-500 md:text-xl dark:text-zinc-400">{subheading}</p>
          </div>
          <div className="flex flex-col space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className="flex items-center justify-center w-10 h-10 aspect-square rounded-full text-white font-semibold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{step.heading}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">{step.subheading}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}