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

/** =========================
 *  Interfaces / Types
 *  ========================= */
interface Client {
  id: number;
  client_name: string;
  subdomain?: string;
  status?: string;
  initial_message_template?: string; // we merge data from client_content here
}

// Adjust column names to match your DB
interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  client_id: number | null;
  linkedin?: string;
  website?: string;
  position?: string;
  message_sent?: boolean;
  is_open_profile?: boolean; // if you have a bool for open/closed
}

/**
 * Props from a parent component, if needed.
 */
interface LeadOverviewTableProps {
  clients: Client[]; // Explicitly declare the clients prop
  parentFilter?: string; // 'all', 'sent', 'not_sent' (optional from parent)
}

/** Fallback function if you don’t have a custom URL builder. */
function defaultConstructLandingPageURL(lead: Lead): string {
  return `/landing-page/${encodeURIComponent(lead.id)}`;
}

export default function LeadOverviewTable({ 
  clients, // Passed from parent component
  parentFilter = 'all',
}: LeadOverviewTableProps) {
  // ==================
  // 1) STATE
  // ==================
  // A. Leads
  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewsCount, setViewsCount] = useState<{ [key: string]: number }>({});
  
  // B. Pagination
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);

  // C. Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [localMessageFilter, setLocalMessageFilter] = useState<'all' | 'sent' | 'not_sent'>(
    parentFilter as 'all' | 'sent' | 'not_sent'
  );

  const [openProfileFilter, setOpenProfileFilter] = useState<'all' | 'open' | 'closed'>('all');

  // D. Loading state
  const [loading, setLoading] = useState(false);

  // ==================
  // FETCH LEADS (with pagination + filters)
  // ==================
  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);

        // Base query
        let query = supabase
          .from('leads')
          .select('*', { count: 'exact' });

        // A) Filter by message_sent
        if (localMessageFilter === 'sent') {
          query = query.eq('message_sent', true);
        } else if (localMessageFilter === 'not_sent') {
          query = query.eq('message_sent', false);
        }

        // B) Filter by client
        if (clientFilter !== 'All Clients') {
          const clientIdNum = parseInt(clientFilter, 10);
          if (!isNaN(clientIdNum)) {
            query = query.eq('client_id', clientIdNum);
          }
        }

        // C) Filter by open/closed (assuming your column is is_open_profile)
        if (openProfileFilter === 'open') {
          query = query.eq('is_open_profile', true);
        } else if (openProfileFilter === 'closed') {
          query = query.eq('is_open_profile', false);
        }

        // D) Search (first_name, last_name, company)
        if (searchTerm) {
          const lower = searchTerm.toLowerCase();
          query = query.or(
            `first_name.ilike.%${lower}%,last_name.ilike.%${lower}%,company.ilike.%${lower}%`
          );
        }

        // E) Pagination
        const fromIndex = (page - 1) * pageSize;
        const toIndex = fromIndex + pageSize - 1;
        query = query.range(fromIndex, toIndex);

        // Execute
        const { data, error, count } = await query;
        if (error) {
          console.error('Error fetching leads with pagination:', error);
          setLeads([]);
          setTotalLeadsCount(0);
        } else {
          setLeads(data || []);
          setTotalLeadsCount(count || 0);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setLeads([]);
        setTotalLeadsCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [
    page,
    searchTerm,
    clientFilter,
    localMessageFilter,
    openProfileFilter,
    pageSize,
  ]);

  // If the parent changes the filter, keep in sync
  useEffect(() => {
    setLocalMessageFilter(parentFilter as 'all' | 'sent' | 'not_sent');
    setPage(1);
  }, [parentFilter]);

  // ==================
  // 4) HELPER: Build final page URL
  // ==================
  function constructURLWithSubdomain(lead: Lead, queryParam = '') {
    const client = clients.find((c) => c.id === lead.client_id);

    // If you have your own helper in urlHelpers, use that
    const baseUrl = constructLandingPageURL
      ? constructLandingPageURL(lead)
      : defaultConstructLandingPageURL(lead);

    if (client && client.subdomain && client.status === 'verified') {
      return `https://${client.subdomain}/${baseUrl.replace(/^\/+/, '')}${queryParam}`;
    }
    return `${baseUrl}${queryParam}`;
  }


  // ==================
  // 6) HELPER: Copy message to clipboard using DB template
  // ==================
  const copyMessageToClipboard = (lead: Lead) => {
    // Find the matching client object
    const client = clients.find((c) => c.id === lead.client_id);

    // Use the client’s message template from DB, fallback if none
    const baseMessage =
      client?.initial_message_template ||
      "Hello {first_name} at {company}, we have a great opportunity to discuss.";

    const safeFirstName = lead.first_name ?? 'there';
    const safeCompany = lead.company ?? 'your company';

    const personalizedMessage = baseMessage
      .replace('{first_name}', safeFirstName)
      .replace('{company}', safeCompany)
      .concat(` ${constructURLWithSubdomain(lead, '?linkedin=true')}`)
      // If the DB stores \n as literal backslash-n, replace them with real newlines
      .replace(/\\n/g, '\n');

    navigator.clipboard.writeText(personalizedMessage).catch((err) => {
      console.error('Error copying message:', err);
    });
  };

  // ==================
  // 7) ACTION: Mark lead as message sent
  // ==================
  const markMessageAsSent = async (lead: Lead) => {
    // Immediately update UI
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, message_sent: true } : l))
    );

    try {
      const { error } = await supabase
        .from('leads')
        .update({ message_sent: true })
        .eq('id', lead.id);

      if (error) {
        console.error('Error updating message status:', error);
        // revert on error
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, message_sent: false } : l))
        );
      }
    } catch (error) {
      console.error('Unexpected error updating message:', error);
      // revert on error
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, message_sent: false } : l))
      );
    }
  };

  // ==================
  // 8) PAGINATION LOGIC
  // ==================
  const totalPages = Math.ceil(totalLeadsCount / pageSize);

  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => (prev < totalPages ? prev + 1 : prev));

  // Build a combined "All Clients" + real clients list for the dropdown
  const uniqueClients = [{ id: -1, client_name: 'All Clients' }, ...clients];

  // ==================
  // 9) RENDER
  // ==================
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ============================
       *  FILTERS: search, client, message-sent, open-profile
       * ============================ */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-start md:items-center">
        {/* SEARCH */}
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

        {/* CLIENT FILTER */}
        <div className="flex items-center space-x-2">
          <label className="font-semibold whitespace-nowrap">Client:</label>
          <Select
            value={clientFilter}
            onValueChange={(val) => {
              setClientFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {uniqueClients.map((client) => (
                <SelectItem
                  key={client.id}
                  value={client.id === -1 ? 'All Clients' : client.id.toString()}
                >
                  {client.client_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* MESSAGE-SENT FILTER */}
        <div className="flex items-center space-x-2">
          <label className="font-semibold whitespace-nowrap">Message:</label>
          <Select
            value={localMessageFilter}
            onValueChange={(val) => {
              setLocalMessageFilter(val as 'all' | 'sent' | 'not_sent');
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All/Sent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="not_sent">Not Sent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* OPEN PROFILE FILTER (if your DB column is is_open_profile) */}
        <div className="flex items-center space-x-2">
          <label className="font-semibold whitespace-nowrap">Profile:</label>
          <Select
            value={openProfileFilter}
            onValueChange={(val) => {
              setOpenProfileFilter(val as 'all' | 'open' | 'closed');
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Open/Closed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open Only</SelectItem>
              <SelectItem value="closed">Closed Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ============================
       *   TABLE
       * ============================ */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {loading && <div className="p-4">Loading leads...</div>}
        {!loading && leads.length === 0 && (
          <div className="p-4">No leads found.</div>
        )}
        {!loading && leads.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Message Sent</TableHead>
                <TableHead>Landing Page</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => {
                const client = clients.find((c) => c.id === lead.client_id);
                return (
                  <TableRow key={lead.id}>
                    {/* NAME w/ LinkedIn link if available */}
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {lead.linkedin ? (
                          <Link
                            href={lead.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Linkedin className="h-4 w-4 text-blue-600 mr-2" />
                          </Link>
                        ) : (
                          <Linkedin className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        {lead.linkedin ? (
                          <Link
                            href={lead.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {lead.first_name} {lead.last_name}
                          </Link>
                        ) : (
                          `${lead.first_name ?? ''} ${lead.last_name ?? ''}`.trim()
                        )}
                      </div>
                    </TableCell>

                    {/* POSITION */}
                    <TableCell>{lead.position || '-'}</TableCell>

                    {/* COMPANY */}
                    <TableCell>
                      {lead.website ? (
                        <Link
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {lead.company}
                        </Link>
                      ) : (
                        lead.company || '-'
                      )}
                    </TableCell>

                    {/* CLIENT NAME */}
                    <TableCell>
                      {client?.client_name ?? 'Unknown Client'}
                    </TableCell>

                    {/* PAGE VIEWS */}
                    <TableCell>{viewsCount[lead.id] ?? 0}</TableCell>

                    {/* is_open_profile => 'Open' or 'Closed' */}
                    <TableCell>
                      {lead.is_open_profile ? 'Open' : 'Closed'}
                    </TableCell>

                    {/* MESSAGE SENT => icon or text */}
                    <TableCell>
                      {lead.message_sent ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        'Not Sent'
                      )}
                    </TableCell>

                    {/* LANDING PAGE LINK */}
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

                    {/* ACTIONS: copy message / mark as sent / etc. */}
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
                          <DropdownMenuItem className="text-red-600">
                            Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ============================
       *  PAGINATION CONTROLS
       * ============================ */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}