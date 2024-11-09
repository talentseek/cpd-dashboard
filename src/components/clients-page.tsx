// src/components/clients-page.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MoreHorizontal, Plus } from 'lucide-react'
import { ViewClientDetailsComponent } from './view-client-details'
import { EditClientComponent } from './edit-client'
import { ConfigureAbmPages } from './configure-abm-pages'

const initialClients = [
  { id: 1, companyName: 'Acme Corp', website: 'www.acmecorp.com', contactFirstName: 'John', contactLastName: 'Doe', contactEmail: 'john.doe@acmecorp.com', companyDescription: 'Leading widget manufacturer', totalLeads: 150, clicks: 2500, demosBooked: 30, replies: 80, status: 'Active' },
  { id: 2, companyName: 'TechStart', website: 'www.techstart.com', contactFirstName: 'Jane', contactLastName: 'Smith', contactEmail: 'jane.smith@techstart.com', companyDescription: 'Innovative tech solutions provider', totalLeads: 75, clicks: 1200, demosBooked: 15, replies: 40, status: 'Inactive' },
  { id: 3, companyName: 'Global Solutions', website: 'www.globalsolutions.com', contactFirstName: 'Mike', contactLastName: 'Johnson', contactEmail: 'mike.johnson@globalsolutions.com', companyDescription: 'Worldwide consulting services', totalLeads: 200, clicks: 3000, demosBooked: 45, replies: 120, status: 'Active' },
]

export function ClientsPageComponent() {
  const [clients, setClients] = useState(initialClients)
  const [selectedClient, setSelectedClient] = useState(null)
  const [action, setAction] = useState('')
  const [isAddClientOpen, setIsAddClientOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    companyName: '',
    website: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    companyDescription: '',
    status: 'Active',
  })

  const openDialog = (client, actionType) => {
    setSelectedClient(client)
    setAction(actionType)
  }

  const closeDialog = () => {
    setSelectedClient(null)
    setAction('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewClient(prev => ({ ...prev, [name]: value }))
  }

  const handleAddClient = (e) => {
    e.preventDefault()
    const id = clients.length + 1
    const clientToAdd = {
      ...newClient,
      id,
      totalLeads: 0,
      clicks: 0,
      demosBooked: 0,
      replies: 0,
    }
    setClients(prev => [...prev, clientToAdd])
    setIsAddClientOpen(false)
    setNewClient({
      companyName: '',
      website: '',
      contactFirstName: '',
      contactLastName: '',
      contactEmail: '',
      companyDescription: '',
      status: 'Active',
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={newClient.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={newClient.website}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactFirstName">First Name</Label>
                <Input
                  id="contactFirstName"
                  name="contactFirstName"
                  value={newClient.contactFirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactLastName">Last Name</Label>
                <Input
                  id="contactLastName"
                  name="contactLastName"
                  value={newClient.contactLastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  value={newClient.contactEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyDescription">Description</Label>
                <Textarea
                  id="companyDescription"
                  name="companyDescription"
                  value={newClient.companyDescription}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              <Button type="submit">Save Client</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.companyName}</TableCell>
                <TableCell>{`${client.contactFirstName} ${client.contactLastName}`}</TableCell>
                <TableCell>{client.contactEmail}</TableCell>
                <TableCell>
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
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
                      <DropdownMenuItem onClick={() => openDialog(client, 'view')}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDialog(client, 'edit')}>
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDialog(client, 'configure')}>
                        Configure ABM Pages
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedClient} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'view' && `Viewing Details for ${selectedClient?.companyName}`}
              {action === 'edit' && `Editing ${selectedClient?.companyName}`}
              {action === 'configure' && `Configuring ABM Pages for ${selectedClient?.companyName}`}
            </DialogTitle>
          </DialogHeader>
          {action === 'view' && <ViewClientDetailsComponent id={selectedClient?.id} onBack={closeDialog} />}
          {action === 'edit' && <EditClientComponent id={selectedClient?.id} onBack={closeDialog} />}
          {action === 'configure' && <ConfigureAbmPages id={selectedClient?.id} onBack={closeDialog} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}