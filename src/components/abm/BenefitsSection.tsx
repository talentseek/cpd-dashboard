// src/components/abm/BenefitsSection.tsx
'use client'

import { CalendarIcon, BarChartIcon, UsersIcon } from "@/components/abm/icons"

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

  return (
    <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tighter text-center mb-12">
          {mainHeading}
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-2">
            <CalendarIcon style={iconStyle} className="h-12 w-12" />
            <h3 className="text-xl font-bold">{items[0].heading}</h3>
            <p className="text-zinc-500 dark:text-zinc-400">{items[0].subheading}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <BarChartIcon style={iconStyle} className="h-12 w-12" />
            <h3 className="text-xl font-bold">{items[1].heading}</h3>
            <p className="text-zinc-500 dark:text-zinc-400">{items[1].subheading}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <UsersIcon style={iconStyle} className="h-12 w-12" />
            <h3 className="text-xl font-bold">{items[2].heading}</h3>
            <p className="text-zinc-500 dark:text-zinc-400">{items[2].subheading}</p>
          </div>
        </div>
      </div>
    </section>
  )
}