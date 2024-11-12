'use client';

import { CheckCircle } from "lucide-react";
import { FeaturesSectionProps } from "@/types/abmLandingPage";

export function FeaturesSection({
  mainHeading = "Here's What You'll Get...",
  items = [],
}: FeaturesSectionProps) {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">{mainHeading}</h2>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          {items.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="text-xl font-bold">{feature.heading}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{feature.subheading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}