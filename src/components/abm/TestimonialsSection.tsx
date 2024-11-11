// src/components/abm/TestimonialsSection.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { TestimonialsSectionProps } from "@/types/abmLandingPage";

export function TestimonialsSection({ mainHeading, items }: TestimonialsSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {mainHeading}
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          {items.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current text-yellow-500" />
                  ))}
                </div>
                <p className="text-xl font-semibold">&quot;{testimonial.title}&quot;</p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {testimonial.content}
                </p>
                <div className="flex items-center space-x-2">
                  <Image
                    alt={testimonial.name}
                    className="rounded-full"
                    height="40"
                    src={testimonial.imageUrl || "/placeholder.svg"}
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    width="40"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {testimonial.jobTitle}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}