'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Linkedin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  client_id: number | null; // client_id can be null
  linkedin?: string;
  website?: string;
  clicks?: number;
  position?: string;
}

interface Client {
  id: number;
  client_name: string;
}

interface LeadOverviewTableProps {
  leads: Lead[];
}

export default function LeadOverviewTable({ leads }: LeadOverviewTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [clients, setClients] = useState<Client[]>([]);

  // Fetch unique clients for the dropdown
  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from('clients').select('id, client_name');
      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data || []);
        console.log('Fetched clients:', data); // Log fetched clients
      }
    }
    fetchClients();
  }, []);

  // Prepare unique clients, including "All Clients" option
  const uniqueClients = [{ id: -1, client_name: 'All Clients' }, ...clients];

  // Filter leads based on search term and client filter
  const filteredLeads = leads.filter(lead =>
    (lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (clientFilter === 'All Clients' || (lead.client_id && lead.client_id.toString() === clientFilter))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4 space-x-4">
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
            {uniqueClients.map((client) => (
              <SelectItem key={client.id} value={client.id === -1 ? 'All Clients' : client.id.toString()}>
                {client.client_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Landing Page</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Link href={lead.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 text-blue-600 mr-2" />
                    </Link>
                    <Link href={lead.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                      {`${lead.first_name} ${lead.last_name}`}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{lead.position || '-'}</TableCell>
                <TableCell>
                  {lead.website ? (
                    <Link href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.company}
                    </Link>
                  ) : (
                    lead.company
                  )}
                </TableCell>
                <TableCell>
                  {clients.find(client => client.id === lead.client_id)?.client_name || 'Unknown Client'}
                </TableCell>
                <TableCell>{lead.clicks || '-'}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/${lead.client_id === null ? 'unknown' : lead.client_id}/${lead.company.replace(/\s/g, '_')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Page
                  </Link>
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
                      <DropdownMenuItem>Edit Lead</DropdownMenuItem>
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
  );
}