'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from 'lucide-react'

const fetchABMConfig = async (id: string) => {
  return {
    clientId: parseInt(id),
    companyName: 'Acme Corp',
    targetICP: 'Marketing Managers, Sales Directors',
    customHeadline: 'Boost Your Sales with Acme Corp Solutions',
    customDescription: 'Tailored solutions for marketing and sales professionals.',
    ctaText: 'Book a Demo',
    specialInstructions: 'Highlight our new AI-powered features.'
  }
}

export function ConfigureAbmPages({ id, onBack }) {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    if (id) {
      fetchABMConfig(id).then(setConfig)
    }
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated ABM configuration:', config)
  }

  if (!config) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Configure ABM Pages: {config.companyName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="targetICP">Target ICP (Job Titles)</Label>
              <Input
                id="targetICP"
                name="targetICP"
                value={config.targetICP}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="customHeadline">Custom Headline</Label>
              <Input
                id="customHeadline"
                name="customHeadline"
                value={config.customHeadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="customDescription">Custom Description</Label>
              <Textarea
                id="customDescription"
                name="customDescription"
                value={config.customDescription}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="ctaText">CTA Text</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={config.ctaText}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                name="specialInstructions"
                value={config.specialInstructions}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save ABM Configuration
            </Button>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>ABM Page Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{config.customHeadline}</h2>
                <p>{config.customDescription}</p>
                <Button>{config.ctaText}</Button>
                <div>
                  <h3 className="font-semibold">Target ICP:</h3>
                  <p>{config.targetICP}</p>
                </div>
                {config.specialInstructions && (
                  <div>
                    <h3 className="font-semibold">Special Instructions:</h3>
                    <p>{config.specialInstructions}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}