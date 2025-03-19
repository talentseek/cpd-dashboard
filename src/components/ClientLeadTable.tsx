'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Lead {
  id: number;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  position: string | null;
  client_id: number;
  status: string;
  created_at: string;
  linkedin?: string; // Added linkedin field
}

interface ClientLeadTableProps {
  clientId: number;
}

export default function ClientLeadTable({ clientId }: ClientLeadTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function fetchLeads() {
      let query = supabase.from('leads').select('*', { count: 'exact' });

      // Filter by client_id
      query = query.eq('client_id', clientId);

      // Filter by status
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);

      // Search
      if (searchTerm) {
        query = query.or(
          `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`
        );
      }

      // Pagination
      const fromIndex = (page - 1) * pageSize;
      const toIndex = fromIndex + pageSize - 1;
      query = query.range(fromIndex, toIndex);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching leads:', error);
        return;
      }

      setLeads(data || []);
      setTotalPages(count ? Math.ceil(count / pageSize) : 1);
    }

    fetchLeads();
  }, [clientId, searchTerm, statusFilter, page]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setPage(1); }}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="not_replied">Not Replied</SelectItem>
            <SelectItem value="not_interested">Not Interested</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="follow_up_needed">Follow-up Needed</SelectItem>
            <SelectItem value="demo_booked">Demo Booked</SelectItem>
            <SelectItem value="unqualified">Unqualified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lead Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>LinkedIn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.first_name} {lead.last_name}</TableCell>
              <TableCell>{lead.position}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                {lead.linkedin ? (
                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>Previous</Button>
          <span>Page {page} of {totalPages}</span>
          <Button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}