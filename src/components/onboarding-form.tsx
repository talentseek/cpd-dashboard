"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"]

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [linkCount, setLinkCount] = useState(1)
  const [fileCount, setFileCount] = useState(1)

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Contact details</h2>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input id="firstName" required className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input id="lastName" required className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" required className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input id="company" required className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">
                  Website <span className="text-red-500">*</span>
                </Label>
                <Input id="website" required className="w-full border-gray-200" />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Describe your ideal customer</h2>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="persona">
                  ICP Persona <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="persona"
                  placeholder="Founders/CEOs/Head of Sales of SaaS companies."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="geography">
                  ICP Geography <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="geography"
                  placeholder="USA, UK."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">
                  ICP Industry <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="industry"
                  placeholder="Computer Software, Manufacturing, Healthcare, Real Estate."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jobTitles">
                  ICP Job Titles <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="jobTitles"
                  placeholder="CEO, CFO, COO, Co-Founder, Founder, Owner, Managing Director."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="companySize">
                  ICP Company Size <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between border-gray-200">
                      {selectedSizes.length > 0 ? `${selectedSizes.length} sizes selected` : "Select company sizes"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search sizes..." />
                      <CommandList>
                        <CommandEmpty>No size found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {companySizes.map((size) => (
                            <CommandItem
                              key={size}
                              onSelect={() => {
                                setSelectedSizes((prev) =>
                                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                                )
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedSizes.includes(size) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {size}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {selectedSizes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSizes.map((size) => (
                      <Badge
                        key={size}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => setSelectedSizes((prev) => prev.filter((s) => s !== size))}
                      >
                        {size}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Useful Information</h2>
              <p className="text-sm text-muted-foreground mt-2">
                The information below will help us create a landing page and message that truly reflects your brand.
                Please share your thoughts in your own words—avoid using AI-generated fluff. Also, steer clear of overly
                salesy language and buzzwords like &quot;cutting edge.&quot;
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="shortDesc">
                  Product Description - Short <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Describe your offering as simple as possible.</p>
                <Textarea
                  id="shortDesc"
                  placeholder="CostPerDemo is an email marketing agency for the SaaS industry."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detailedDesc">
                  Product Description - In-Depth <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Describe your product with all the necessary details. This should give a proper understanding of your
                  offering to the reader.
                </p>
                <Textarea
                  id="detailedDesc"
                  placeholder="CostPerDemo is an email marketing agency for the SaaS industry. We offer pre-screened demo meetings for a set price of $250, charged only after the meeting is completed and approved by you. First, we create domains that are similar to yours and start warming them up..."
                  required
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lead Magnet</h2>
              <p className="text-sm text-muted-foreground mt-2">
                The lead magnet is the most important part of outreach. It needs to provide real value and trigger
                responses from leads. Without that initial interest, the landing page won&apos;t be effective.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                For example, one of our clients, JustPark, offers a free revenue estimate that helps people discover
                their potential earnings. There&apos;s no sales pitch—just genuine value.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Consider a similar approach—anything that leads may find useful. For instance, you might offer a free
                financial report or a personalized eBook. The goal is to spark interest and encourage responses, rather
                than immediately pitching a demo or making a hard sell.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="whatToOffer">
                  What can you offer? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="whatToOffer" required className="min-h-[100px] w-full border-gray-200" />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Useful Data</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Anything that can help us better understand your product.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="productPresentation">Product Presentation</Label>
                <p className="text-sm text-muted-foreground">Link to the PDF.</p>
                <Input id="productPresentation" className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoPresentation">Video Presentation</Label>
                <p className="text-sm text-muted-foreground">Link to the video demonstration of your product.</p>
                <Input id="videoPresentation" className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usefulStuff">Useful Stuff</Label>
                <p className="text-sm text-muted-foreground">Something that can grab the lead&apos;s attention.</p>
                <Textarea
                  id="usefulStuff"
                  placeholder="Industry Report, Guide, Product Matrix, etc."
                  className="min-h-[100px] w-full border-gray-200"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Calendar Setup</h2>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="salesRep">
                  Sales Development Representative <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">Who will be conducting the demo meeting?</p>
                <Input id="salesRep" placeholder="Michael Beckett, CEO." required className="w-full border-gray-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calendarIntegration">
                  Calendar Integration <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Create a custom Cal.com link. No worries, it&apos;s free and can sync with your existing calendar. Just{" "}
                  <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>
                    follow the instructions
                  </a>
                  .
                </p>
                <Input
                  id="calendarIntegration"
                  placeholder="https://cal.com/costperdemo"
                  required
                  className="w-full border-gray-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="calApiKey">
                  Cal.com API Key <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Paste your Cal.com API Key. Instructions can be found{" "}
                  <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>
                    here
                  </a>
                  .
                </p>
                <Input id="calApiKey" type="password" required className="w-full border-gray-200" />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-8 space-y-4">
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      <div className="w-full rounded-lg border bg-white p-8">
        <div className="mx-auto w-full max-w-2xl">
          {renderStep()}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <Button variant="default" onClick={handleNext} className="bg-black text-white hover:bg-black/90">
              {currentStep === totalSteps ? "Submit" : "Next >"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}