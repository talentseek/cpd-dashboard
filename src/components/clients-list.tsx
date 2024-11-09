'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { AddClientForm } from './add-client-form'

// Mock data for clients
const clients = [
  { id: 1, name: 'Acme Corp', email: 'contact@acmecorp.com', totalLeads: 150, clicks: 2500, demosBooked: 30, replies: 80, status: 'Active' },
  { id: 2, name: 'TechStart', email: 'info@techstart.com', totalLeads: 75, clicks: 1200, demosBooked: 15, replies: 40, status: 'Inactive' },
  { id: 3, name: 'Global Solutions', email: 'hello@globalsolutions.com', totalLeads: 200, clicks: 3000, demosBooked: 45, replies: 120, status: 'Active' },
  { id: 4, name: 'Innovate Inc', email: 'support@innovateinc.com', totalLeads: 100, clicks: 1800, demosBooked: 25, replies: 60, status: 'Active' },
  { id: 5, name: 'Future Systems', email: 'info@futuresystems.com', totalLeads: 50, clicks: 800, demosBooked: 10, replies: 30, status: 'Pending' },
]

export function ClientsListComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the details of the new client here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <AddClientForm onClose={() => setIsAddClientOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search clients..."
            className="pl-8 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Leads</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Demos Booked</TableHead>
              <TableHead>Replies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.totalLeads}</TableCell>
                <TableCell>{client.clicks}</TableCell>
                <TableCell>{client.demosBooked}</TableCell>
                <TableCell>{client.replies}</TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' :
                    client.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link href={`/clients/${client.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/clients/${client.id}/edit`}>Edit Client</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/clients/${client.id}/configure-abm`}>Configure ABM Pages</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Client</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}