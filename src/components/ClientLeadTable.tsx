'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Linkedin } from 'lucide-react';
import { constructLandingPageURL } from '@/utils/urlHelpers';
import { supabase } from '@/lib/utils'; // Import Supabase client

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  company: string;
  client: string;
  linkedin?: string;
  website?: string;
  clicks?: number;
  position?: string;
  created_at?: string;
}

interface ClientLeadTableProps {
  leads: Lead[];
}

export default function ClientLeadTable({ leads }: ClientLeadTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visitCounts, setVisitCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchVisitCounts = async () => {
      const counts: { [key: string]: number } = {};

      for (const lead of leads) {
        try {
          const { data, error } = await supabase
            .from('abm_page_visits')
            .select('id', { count: 'exact' })
            .eq('lead_id', lead.id);

          if (error) {
            console.error(`Error fetching visit count for lead ${lead.id}:`, error);
            counts[lead.id] = 0;
          } else {
            counts[lead.id] = data ? data.length : 0;
          }
        } catch (error) {
          console.error(`Unexpected error fetching visit count for lead ${lead.id}:`, error);
          counts[lead.id] = 0;
        }
      }

      setVisitCounts(counts);
    };

    fetchVisitCounts();
  }, [leads]);

  const filteredLeads = leads.filter(lead =>
    lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Created</TableHead>
              <TableHead>Lead Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Landing Page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Link href={lead.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 text-blue-600 mr-2" />
                    </Link>
                    {`${lead.first_name} ${lead.last_name}`}
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
                <TableCell>{visitCounts[lead.id] || 0}</TableCell>
                <TableCell>
                  <Link
                    href={constructLandingPageURL(lead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Page
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}