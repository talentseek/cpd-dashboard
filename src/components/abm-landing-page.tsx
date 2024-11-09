'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star } from "lucide-react"
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
            <MountainIcon className="h-6 w-6 text-primary mr-2" />
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
                  Hello John, Let's Get Acme Corp More Demos
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
                <CalendarIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Effortless Booking</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Streamline your scheduling process and save time.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <BarChartIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Data-Driven Insights</h3>
                <p className="text-zinc-500 dark:text-zinc-400">Make informed decisions with powerful analytics.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <UsersIcon className="h-12 w-12 text-primary" />
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
                    <p className="text-xl font-semibold">"Exceptional service!"</p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      The platform has revolutionized our demo booking process. It's user-friendly and highly efficient.
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

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
                  Our streamlined process ensures you get the most out of every demo.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                {[
                  { title: "Personalized Outreach", description: "We tailor our approach to your specific needs and industry.", icon: UserIcon },
                  { title: "Schedule Your Demo", description: "Choose a time that works best for you with our easy booking system.", icon: CalendarIcon },
                  { title: "Experience the Difference", description: "See firsthand how our solution can transform your business.", icon: PresentationIcon },
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">{index + 1}</div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-zinc-500 dark:text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Here's What You'll Get...</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              {["Data-Driven Insights", "Customizable Workflows", "Real-time Analytics", "Seamless Integration", "24/7 Support", "Mobile Optimization", "Advanced Security", "Scalable Solutions", "Automated Reporting", "User-friendly Interface"].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="text-xl font-bold">{feature}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">Enhance your business with our {feature.toLowerCase()} feature.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to get started?</h2>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">Book your personalized demo today and see how we can transform your business.</p>
              <Button size="lg">Book my tour</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  )
}

/* Icons */
function CalendarIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function BarChartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  )
}
function UsersIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function MountainIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
function PresentationIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  )
}
function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}