'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function AbmLandingPage() {
  const benefitsRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sticky Navigation */}
      <header className="fixed w-full px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow z-50">
        <div className="flex items-center w-full max-w-5xl mx-auto">
          <Link className="flex items-center" href="#">
            {/* Replace MountainIcon with valid icon or remove */}
            <span className="font-bold text-lg">Acme Inc</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="ghost" onClick={() => scrollTo(benefitsRef)}>Benefits</Button>
            <Button variant="ghost" onClick={() => scrollTo(featuresRef)}>Features</Button>
            <Button variant="ghost" onClick={() => scrollTo(contactRef)}>Contact</Button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center w-full pt-16">
        {/* Hero Section */}
        <section className="w-full flex items-center justify-center min-h-screen py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <h1 className="text-4xl font-bold sm:text-5xl xl:text-6xl">
                  Hello John, Let&apos;s Get Acme Corp More Demos
                </h1>
                <p className="max-w-md mx-auto text-zinc-500 md:text-xl dark:text-zinc-400">
                  Boost your conversion rates and streamline your demo booking process with our cutting-edge solution.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button size="lg">Book my tour</Button>
                  <Button size="lg" variant="outline">Learn more</Button>
                </div>
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Replace CalendarIcon with valid icon */}
                <h3 className="text-xl font-bold">Effortless Booking</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Streamline your scheduling process and save time.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Replace BarChartIcon with valid icon */}
                <h3 className="text-xl font-bold">Data-Driven Insights</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Make informed decisions with powerful analytics.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                {/* Replace UsersIcon with valid icon */}
                <h3 className="text-xl font-bold">Personalized Experience</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Tailor your approach for each unique client.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Clients Say</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xl font-semibold">&quot;Exceptional service!&quot;</p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      The platform has revolutionized our demo booking process. It&apos;s user-friendly and highly efficient.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Image
                        alt="Client"
                        className="rounded-full"
                        height="40"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="40"
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium">Jane Doe</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">CEO, TechCorp</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}