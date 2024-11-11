// src/components/abm/BenefitsSection.tsx
'use client';

import { CalendarIcon, BarChartIcon, UsersIcon } from "@/components/abm/icons";

interface BenefitsSectionProps {
  mainHeading: string;
  items: Array<{
    heading: string;
    subheading: string;
  }>;
  primaryColor?: string;
}

export function BenefitsSection({ mainHeading, items, primaryColor }: BenefitsSectionProps) {
  const iconStyle = primaryColor ? { color: primaryColor } : {};
  const headingStyle = primaryColor ? { color: primaryColor } : {};

  // Icons array for demonstration purposes
  const icons = [CalendarIcon, BarChartIcon, UsersIcon];

  return (
    <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tighter text-center mb-12">
          {mainHeading}
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length]; // Cycles through icons if more than 3 items
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <Icon style={iconStyle} className="h-12 w-12" />
                <h3 className="text-xl font-bold" style={headingStyle}>{item.heading}</h3> {/* Apply primary color */}
                <p className="text-zinc-500 dark:text-zinc-400">{item.subheading}</p> {/* Default styling */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}