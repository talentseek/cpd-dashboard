"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreVertical, Search } from "lucide-react";

interface Lead {
  id: number;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  position: string | null;
  client_id: number | null;
  is_open_profile: boolean;
  message_sent: boolean;
  status: string;
}

interface Client {
  id: number;
  client_name: string;
}

export default function LeadManagementTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [openProfileFilter, setOpenProfileFilter] = useState<string>("all");

  // ✅ Pagination
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState<number>(1);

  // ✅ Fetch clients for dropdown
  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase.from("clients").select("id, client_name");
      if (error) {
        console.error("Error fetching clients:", error);
        return;
      }
      setClients(data || []);
    }
    fetchClients();
  }, []);

  // ✅ Fetch leads with filters and pagination
  useEffect(() => {
    async function fetchLeads() {
      let query = supabase.from("leads").select("*", { count: "exact" });

      query = query.eq("message_sent", true); // Only contacted leads

      // Filters
      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (clientFilter !== "all") query = query.eq("client_id", parseInt(clientFilter));
      if (openProfileFilter !== "all") query = query.eq("is_open_profile", openProfileFilter === "open");

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
        console.error("Error fetching leads:", error);
        return;
      }

      setLeads(data || []);
      setTotalPages(count ? Math.ceil(count / pageSize) : 1);
    }

    fetchLeads();
  }, [searchTerm, statusFilter, clientFilter, openProfileFilter, page]);

  // ✅ Function to update lead status
  async function updateLeadStatus(leadId: number, newStatus: string) {
    const response = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, status: newStatus }),
    });

    if (!response.ok) {
      console.error("Error updating lead status:", await response.text());
      return;
    }

    // Update the UI instantly
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
  }

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
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
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

        {/* Client Filter */}
        <Select value={clientFilter} onValueChange={(val) => setClientFilter(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.client_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Open Profile Filter */}
        <Select value={openProfileFilter} onValueChange={(val) => setOpenProfileFilter(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select profile type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open Profile</SelectItem>
            <SelectItem value="closed">Closed Profile</SelectItem>
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
            <TableHead>Actions</TableHead>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {["not_interested", "interested", "follow_up_needed", "demo_booked", "unqualified"].map((status) => (
                      <DropdownMenuItem key={status} onClick={() => updateLeadStatus(lead.id, status)}>
                        Mark as {status.replace(/_/g, " ")}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ Pagination Controls */}
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