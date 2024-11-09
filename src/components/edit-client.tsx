// src/components/edit-client.tsx

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from 'lucide-react'

// Mock function to fetch client data
const fetchClientData = async (id: string) => {
  // Simulate an API call here
  return {
    id: parseInt(id),
    companyName: 'Acme Corp',
    website: 'www.acmecorp.com',
    contactFirstName: 'John',
    contactLastName: 'Doe',
    contactEmail: 'john.doe@acmecorp.com',
    companyDescription: 'Leading widget manufacturer',
    status: 'Active',
  }
}

export function EditClientComponent({ id, onBack }: { id: string; onBack: () => void }) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    if (id) {
      fetchClientData(id).then(setClient)
    }
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClient(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setClient(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, submit updated client data to the API
    console.log('Updated client data:', client)
    onBack()  // Trigger onBack after saving
  }

  if (!client) {
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

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit Client: {client.companyName}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={client.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={client.website}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactFirstName">Contact First Name</Label>
          <Input
            id="contactFirstName"
            name="contactFirstName"
            value={client.contactFirstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactLastName">Contact Last Name</Label>
          <Input
            id="contactLastName"
            name="contactLastName"
            value={client.contactLastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={client.contactEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            name="companyDescription"
            value={client.companyDescription}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" value={client.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </div>
  )
}