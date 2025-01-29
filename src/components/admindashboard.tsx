'use client';

import { useState, useEffect } from "react";
import { supabase } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, FileUser, MessageSquare, Eye } from 'lucide-react';
import LeadOverviewTable from '@/components/LeadOverviewTable';
import type { PostgrestError } from '@supabase/supabase-js'; // For error handling if needed

interface Client {
  id: number;
  client_name: string;
  subdomain?: string;
  status?: string;
  initial_message_template?: string; // we'll merge from client_content
}

export default function DashboardComponent() {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalLeadsContacted, setTotalLeadsContacted] = useState(0);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If you want to filter leads from the parent, define it here
  const [filter, setFilter] = useState<string>('all'); // 'all', 'sent', 'not_sent'

  useEffect(() => {
    async function fetchData() {
      try {
        // 1) total leads
        const { error: leadsError, count: leadsCount } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true });
        if (leadsError) throw leadsError;

        // 2) total leads contacted
        const { error: contactedError, count: contactedCount } = await supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .eq('message_sent', true);
        if (contactedError) throw contactedError;

        // 3) total page views
        const { error: pageViewsError, count: pageViewsCount } = await supabase
          .from('abm_page_visits')
          .select('id', { count: 'exact', head: true });
        if (pageViewsError) throw pageViewsError;

        // 4) Fetch main clients table (id, client_name, subdomain, etc.)
        const {
          data: baseClients,
          error: baseClientsError,
          count: baseClientsCount
        } = await supabase
          .from('clients')
          .select('id, client_name, subdomain, status', { count: 'exact' });

        if (baseClientsError) throw baseClientsError;

        // 5) Fetch client_content for each client to get initial_message_template
        const {
          data: contentData,
          error: contentError
        } = await supabase
          .from('client_content')
          .select('client_id, initial_message_template');

        if (contentError) throw contentError;

        // 6) Merge the template from client_content into each client
        //    so that "client.initial_message_template" is set
        const mergedClients = (baseClients || []).map((client) => {
          const content = contentData?.find(
            (item) => item.client_id === client.id
          );
          return {
            ...client,
            // If missing, fallback to empty string
            initial_message_template: content?.initial_message_template || ''
          };
        });

        // 7) Update states
        setTotalLeads(leadsCount || 0);
        setTotalLeadsContacted(contactedCount || 0);
        setTotalPageViews(pageViewsCount || 0);
        setClients(mergedClients);
        setTotalClients(baseClientsCount || 0);

      } catch (fetchError) {
        console.error('Unexpected error fetching data:', fetchError);
        // If it's a Supabase PostgrestError, show that message
        if ((fetchError as PostgrestError)?.message) {
          setError((fetchError as PostgrestError).message);
        } else {
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function calculatePercentage(partial: number, total: number) {
    return total > 0 ? Math.round((partial / total) * 100) : 0;
  }

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header + optional leads filter */}
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

      {/* Quick stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          {
            title: "Total Clients",
            value: totalClients,
            icon: <UserCheck className="h-6 w-6 text-blue-500" />,
          },
          {
            title: "Total Leads",
            value: totalLeads,
            icon: <FileUser className="h-6 w-6 text-green-500" />,
          },
          {
            title: "Total Leads Contacted",
            value: totalLeadsContacted,
            percentage: calculatePercentage(totalLeadsContacted, totalLeads),
            icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
          },
          {
            title: "Total Page Views",
            value: totalPageViews,
            percentage: calculatePercentage(totalPageViews, totalLeadsContacted),
            icon: <Eye className="h-6 w-6 text-yellow-500" />,
          },
        ].map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              {typeof metric.percentage === 'number' && (
                <p className="text-xs text-green-600">
                  {metric.percentage}% of{' '}
                  {metric.title.includes("Page Views")
                    ? "Total Leads Contacted"
                    : "Total Leads"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leads table - pass "clients" & "filter" */}
      <LeadOverviewTable clients={clients} parentFilter={filter} />
    </div>
  );
}