'use client';

import { useState, useEffect } from "react";
import { supabase } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, FileUser, MessageSquare, Eye } from 'lucide-react';
import LeadOverviewTable from '@/components/LeadOverviewTable';

interface Lead {
  id: string;
  created_at: string;
  client_id: number | null;
  company: string;
  first_name: string;
  last_name: string;
  linkedin?: string;
  website?: string;
  position?: string;
  message_sent?: boolean;
}

interface Client {
  id: number;
  client_name: string;
}

export default function DashboardComponent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalLeadsContacted, setTotalLeadsContacted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all'); // Filter state: 'all', 'sent', 'not_sent'

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*');

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
          setError('Error fetching leads');
        } else {
          console.log("Fetched leads:", leadsData); // Debug log
          setLeads(leadsData || []);
          setTotalLeadsContacted(leadsData?.filter(lead => lead.message_sent).length || 0);
          await calculatePageViews(leadsData || []);
        }

        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('*');

        if (clientsError) {
          console.error('Error fetching clients:', clientsError);
          setError('Error fetching clients');
        } else {
          setClients(clientsData || []);
        }
      } catch (fetchError) {
        console.error('Unexpected error fetching data:', fetchError);
        setError('Unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    async function calculatePageViews(leads: Lead[]) {
      let totalViews = 0;
      for (const lead of leads) {
        try {
          const { data, error } = await supabase
            .from('abm_page_visits')
            .select('id', { count: 'exact' })
            .eq('lead_id', lead.id);

          if (error) {
            console.error(`Error fetching visit count for lead ${lead.id}:`, error);
          } else {
            totalViews += data?.length || 0;
          }
        } catch (error) {
          console.error(`Unexpected error fetching visit count for lead ${lead.id}:`, error);
        }
      }
      setTotalPageViews(totalViews);
    }

    fetchData();
  }, []);

  const filteredLeads = (() => {
    console.log("Filter value:", filter);
    console.log("Leads before filtering:", leads); // Debug log
    if (filter === 'sent') {
      return leads.filter(lead => lead.message_sent);
    }
    if (filter === 'not_sent') {
      return leads.filter(lead => !lead.message_sent);
    }
    return leads;
  })();

  console.log("Filtered leads:", filteredLeads); // Debug log

  const calculatePercentage = (partial: number, total: number) =>
    total > 0 ? Math.round((partial / total) * 100) : 0;

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter Leads" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="sent">Message Sent</SelectItem>
            <SelectItem value="not_sent">Message Not Sent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { title: "Total Clients", value: clients.length, icon: <UserCheck className="h-6 w-6 text-blue-500" /> },
          { title: "Total Leads", value: leads.length, icon: <FileUser className="h-6 w-6 text-green-500" /> },
          {
            title: "Total Leads Contacted",
            value: totalLeadsContacted,
            percentage: calculatePercentage(totalLeadsContacted, leads.length),
            icon: <MessageSquare className="h-6 w-6 text-purple-500" />
          },
          {
            title: "Total Page Views",
            value: totalPageViews,
            percentage: calculatePercentage(totalPageViews, totalLeadsContacted),
            icon: <Eye className="h-6 w-6 text-yellow-500" />
          }
        ].map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {metric.percentage !== undefined && (
                <p className="text-xs text-green-600">
                  {metric.percentage}% of {metric.title.includes("Page Views") ? "Total Leads Contacted" : "Total Leads"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <LeadOverviewTable leads={filteredLeads} />
    </div>
  );
}