'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { constructLandingPageURL } from '@/utils/urlHelpers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Linkedin, Clipboard, CheckCircle } from 'lucide-react';
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
  position?: string;
  message_sent?: boolean; // New field for message status
}

interface Client {
  id: number;
  client_name: string;
  subdomain?: string;
  status?: string;
  initial_message_template?: string; // New field for the customizable message template
}

interface LeadOverviewTableProps {
  leads: Lead[];
}

export default function LeadOverviewTable({ leads: initialLeads }: LeadOverviewTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [clients, setClients] = useState<Client[]>([]);
  const [viewsCount, setViewsCount] = useState<{ [key: string]: number }>({});
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('id, client_name, subdomain, status');

        if (clientError) {
          console.error('Error fetching clients:', clientError.message || clientError);
          return;
        }

        const { data: contentData, error: contentError } = await supabase
          .from('client_content')
          .select('id, client_id, initial_message_template');

        if (contentError) {
          console.error('Error fetching client content:', contentError.message || contentError);
          return;
        }

        const mergedData = clientData.map(client => {
          const content = contentData.find(content => content.client_id === client.id);
          return {
            ...client,
            initial_message_template: content?.initial_message_template || ''
          };
        });

        setClients(mergedData);
      } catch (error) {
        console.error('Unexpected error fetching data:', error);
      }
    }

    fetchClients();
  }, []);

  useEffect(() => {
    async function fetchViewCounts() {
      const counts: { [key: string]: number } = {};
      for (const lead of leads) {
        try {
          const { count, error } = await supabase
            .from('abm_page_visits')
            .select('id', { count: 'exact' })
            .eq('lead_id', lead.id);

          if (error) {
            console.error(`Error fetching visit count for lead ${lead.id}:`, error);
          } else {
            counts[lead.id] = count || 0;
          }
        } catch (error) {
          console.error(`Error fetching visit count for lead ${lead.id}:`, error);
        }
      }
      setViewsCount(counts);
    }

    fetchViewCounts();
  }, [leads]);

  const uniqueClients = [{ id: -1, client_name: 'All Clients' }, ...clients];

  const filteredLeads = leads.filter(lead =>
    (lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (clientFilter === 'All Clients' || (lead.client_id && lead.client_id.toString() === clientFilter))
  );

  const constructURLWithSubdomain = (lead: Lead, queryParam = '') => {
  const client = clients.find(client => client.id === lead.client_id);
  const url = constructLandingPageURL(lead).replace(/^\/+/, ''); // Changed from `let` to `const`
  if (client && client.subdomain && client.status === 'verified') {
    return `https://${client.subdomain}/${url}${queryParam}`;
  }
  return `${url}${queryParam}`;
};

  const copyMessageToClipboard = (lead: Lead) => {
    const client = clients.find(client => client.id === lead.client_id);
    const baseMessage = client?.initial_message_template || "Hello {first_name} at {company}, we have a great opportunity to discuss.";
    const personalizedMessage = baseMessage
      .replace('{first_name}', lead.first_name)
      .replace('{company}', lead.company)
      .concat(` You can learn more at: ${constructURLWithSubdomain(lead, '?linkedin=true')}`);

    navigator.clipboard.writeText(personalizedMessage)
      .catch(err => {
        console.error('Error copying message:', err);
      });
  };

  const markMessageAsSent = async (lead: Lead) => {
    setLeads(prevLeads =>
      prevLeads.map(prevLead =>
        prevLead.id === lead.id ? { ...prevLead, message_sent: true } : prevLead
      )
    );

    try {
      const { error } = await supabase
        .from('leads')
        .update({ message_sent: true })
        .eq('id', lead.id);

      if (error) {
        console.error('Error updating message status:', error);
        setLeads(prevLeads =>
          prevLeads.map(prevLead =>
            prevLead.id === lead.id ? { ...prevLead, message_sent: false } : prevLead
          )
        );
      }
    } catch (error) {
      console.error('Unexpected error updating message status:', error);
      setLeads(prevLeads =>
        prevLeads.map(prevLead =>
          prevLead.id === lead.id ? { ...prevLead, message_sent: false } : prevLead
        )
      );
    }
  };

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
              <TableHead>Views</TableHead>
              <TableHead>Message Sent</TableHead>
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
                <TableCell>{viewsCount[lead.id] || 0}</TableCell>
                <TableCell>
                  {lead.message_sent ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    'Not Sent'
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={constructURLWithSubdomain(lead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
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
                      <DropdownMenuItem onClick={() => copyMessageToClipboard(lead)}>
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copy Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => markMessageAsSent(lead)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Message Sent
                      </DropdownMenuItem>
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