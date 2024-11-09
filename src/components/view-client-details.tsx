'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from 'lucide-react'

// Mock function to fetch client data
const fetchClientData = async (id: string) => {
  return {
    id: parseInt(id),
    companyName: 'Acme Corp',
    website: 'www.acmecorp.com',
    contactFirstName: 'John',
    contactLastName: 'Doe',
    contactEmail: 'john.doe@acmecorp.com',
    companyDescription: 'Leading widget manufacturer',
    totalLeads: 150,
    clicks: 2500,
    demosBooked: 30,
    replies: 80,
    status: 'Active'
  }
}

export function ViewClientDetailsComponent({ id, onBack }) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    if (id) {
      fetchClientData(id).then(setClient)
    }
  }, [id])

  if (!client) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{client.companyName}</h1>
        <Link href={`/clients/${client.id}/edit`} passHref>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Client
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Website</dt>
                <dd className="mt-1">{client.website}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Description</dt>
                <dd className="mt-1">{client.companyDescription}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' :
                    client.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Name</dt>
                <dd className="mt-1">{`${client.contactFirstName} ${client.contactLastName}`}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="mt-1">{client.contactEmail}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Total Leads</dt>
                <dd className="mt-1 text-3xl font-semibold">{client.totalLeads}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Clicks</dt>
                <dd className="mt-1 text-3xl font-semibold">{client.clicks}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Demos Booked</dt>
                <dd className="mt-1 text-3xl font-semibold">{client.demosBooked}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Replies</dt>
                <dd className="mt-1 text-3xl font-semibold">{client.replies}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Link href={`/clients/${client.id}/configure-abm`} passHref>
          <Button>Configure ABM Pages</Button>
        </Link>
      </div>
    </div>
  )
}