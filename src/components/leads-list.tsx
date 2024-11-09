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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Plus, Search, Upload, Linkedin } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data for leads
const leads = [
  { id: 1, name: 'John Doe', linkedIn: 'https://linkedin.com/in/johndoe', company: 'Acme Corp', client: 'TechGrow', lastContacted: '2023-05-15', clicks: 7, status: 'Not Replied', followUpProgress: 3, specialInstructions: 'Follow up in 2 weeks' },
  { id: 2, name: 'Jane Smith', linkedIn: 'https://linkedin.com/in/janesmith', company: 'TechStart', client: 'MarketPro', lastContacted: '2023-05-10', clicks: 12, status: 'Interested', followUpProgress: 4 },
  { id: 3, name: 'Bob Johnson', linkedIn: 'https://linkedin.com/in/bobjohnson', company: 'Global Solutions', client: 'SalesMaster', lastContacted: '2023-05-08', clicks: 5, status: 'Demo Booked', followUpProgress: 6 },
  { id: 4, name: 'Alice Brown', linkedIn: 'https://linkedin.com/in/alicebrown', company: 'Innovate Inc', client: 'GrowthHack', lastContacted: '2023-05-05', clicks: 3, status: 'Not Interested', followUpProgress: 2 },
  { id: 5, name: 'Charlie Wilson', linkedIn: 'https://linkedin.com/in/charliewilson', company: 'Future Systems', client: 'TechGrow', lastContacted: '2023-05-12', clicks: 9, status: 'Not Replied', followUpProgress: 1 },
]

const clients = ['All Clients', 'TechGrow', 'MarketPro', 'SalesMaster', 'GrowthHack']
const statuses = ['All Statuses', 'Not Replied', 'Not Interested', 'Interested', 'Demo Booked']

function FollowUpProgress({ progress }: { progress: number }) {
  const steps = [
    { day: 1, description: "Initial message sent" },
    { day: 3, description: "First followup" },
    { day: 7, description: "Second followup" },
    { day: 14, description: "Third followup" },
    { day: 28, description: "Fourth followup" },
    { day: 58, description: "Final followup" },
  ]
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1">
        {steps.map((step, index) => (
          <Tooltip key={step.day}>
            <TooltipTrigger>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${index < progress ? 'bg-green-500' : 'bg-gray-300'}`} />
                {index < steps.length - 1 && <div className="w-2 h-0.5 bg-gray-300" />}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`Day ${step.day}: ${step.description}`}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export function LeadsListComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [clientFilter, setClientFilter] = useState('All Clients')
  const [statusFilter, setStatusFilter] = useState('All Statuses')

  const filteredLeads = leads.filter(lead =>
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (clientFilter === 'All Clients' || lead.client === clientFilter) &&
    (statusFilter === 'All Statuses' || lead.status === statusFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Leads</h1>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="flex-1 flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search leads..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <Link href={lead.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {lead.name}
                    <Linkedin className="ml-2 h-4 w-4" />
                  </Link>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.client}</TableCell>
                <TableCell>{lead.lastContacted}</TableCell>
                <TableCell>{lead.clicks}</TableCell>
                <TableCell>
                  <Select defaultValue={lead.status} onValueChange={(value) => console.log(`Status changed to ${value} for ${lead.name}`)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Not Replied', 'Not Interested', 'Interested', 'Demo Booked'].map((status) => (
                        <SelectItem key={status} value={status}>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'Not Replied' ? 'bg-gray-100 text-gray-800' :
                            status === 'Not Interested' ? 'bg-red-100 text-red-800' :
                            status === 'Interested' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {status}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <FollowUpProgress progress={lead.followUpProgress} />
                  {lead.specialInstructions && (
                    <span className="ml-2 text-xs text-yellow-500">{lead.specialInstructions}</span>
                  )}
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
                        <Link href={`/leads/${lead.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                      <DropdownMenuItem>Update Follow-up</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Lead</DropdownMenuItem>
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