// src/components/admindashboard.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/utils'; // Ensure the path is correct and configured properly
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp } from 'lucide-react';
import LeadOverviewTable from '@/components/LeadOverviewTable'; // Ensure this import is correct
import { Lead } from '@/types/lead'; // Now importing Lead type from src/types/lead

export default function DashboardComponent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('id, created_at, client, client_id, company, first_name, last_name, position, website, linkedin, clicks'); // Including client_id in the select query
      if (error) {
        console.error('Error fetching leads:', error);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    }

    fetchLeads();
  }, []);

  if (loading) {
    return <div>Loading Lead Overview Table...</div>;
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
          { title: "Total Clients", value: 50, change: 5 },
          { title: "Total Leads", value: 150, change: -3 },
          { title: "Total Clicks", value: 1200, change: 10 },
          { title: "Demos Booked", value: 25, change: 2 },
          { title: "Replies", value: 75, change: 8 },
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