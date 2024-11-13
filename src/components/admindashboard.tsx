'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils'; // Ensure the path is correct and configured properly
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp } from 'lucide-react';
import LeadOverviewTable from '@/components/LeadOverviewTable'; // Ensure this import is correct

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
  clicks?: number;
}

interface Client {
  id: number;
  client_name: string;
}

export default function DashboardComponent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch leads data
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*');

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
          setError('Error fetching leads');
        } else {
          setLeads(leadsData || []);
        }

        // Fetch clients data
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

    fetchData();
  }, []);

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
        <Select defaultValue="last7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="custom">Custom Date Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { title: "Total Clients", value: clients.length, change: 5 }, // Dynamically use fetched clients length
          { title: "Total Leads", value: leads.length, change: -3 },
          { title: "Total Clicks", value: leads.reduce((sum, lead) => sum + (lead.clicks || 0), 0), change: 10 }
        ].map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.change > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <LeadOverviewTable leads={leads} />
    </div>
  );
}