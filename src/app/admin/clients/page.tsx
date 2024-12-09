'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/utils';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ExternalLink } from 'lucide-react';
import { constructLandingPageURL } from '@/utils/urlHelpers';

interface Client {
  id: number;
  client_name: string;
  status: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [leadsCount, setLeadsCount] = useState<Record<number, number>>({});
  const [pageViews, setPageViews] = useState<Record<number, number>>({});
  const [firstLeadURLs, setFirstLeadURLs] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('*')
          .order('id', { ascending: true });

        if (clientsError) {
          console.error('Error fetching clients:', clientsError.message);
          setError('Failed to fetch clients.');
          return;
        }

        setClients(clientsData || []);

        const leadsCountData: Record<number, number> = {};
        const pageViewsData: Record<number, number> = {};
        const firstLeadURLsData: Record<number, string> = {};

        for (const client of clientsData || []) {
          const { count: leadsCount, error: leadsError } = await supabase
            .from('leads')
            .select('id', { count: 'exact' })
            .eq('client_id', client.id);

          if (leadsError) {
            console.error(`Error fetching leads for client ${client.id}:`, leadsError.message);
            leadsCountData[client.id] = 0;
          } else {
            leadsCountData[client.id] = leadsCount || 0;
          }

          const { count: viewsCount, error: viewsError } = await supabase
            .from('abm_page_visits')
            .select('id', { count: 'exact' })
            .eq('client_id', client.id);

          if (viewsError) {
            console.error(`Error fetching page views for client ${client.id}:`, viewsError.message);
            pageViewsData[client.id] = 0;
          } else {
            pageViewsData[client.id] = viewsCount || 0;
          }

          const { data: firstLead, error: leadError } = await supabase
            .from('leads')
            .select('*')
            .eq('client_id', client.id)
            .order('created_at', { ascending: true })
            .limit(1)
            .single();

          if (!leadError && firstLead) {
            const landingPageURL = constructLandingPageURL(firstLead);
            firstLeadURLsData[client.id] = landingPageURL;
          }
        }

        setLeadsCount(leadsCountData);
        setPageViews(pageViewsData);
        setFirstLeadURLs(firstLeadURLsData);
      } catch (fetchError) {
        console.error('Unexpected error:', fetchError);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">All Clients</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading clients...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">
                <p>{error}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>Page Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Page</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {client.client_name}
                          </Link>
                        </TableCell>
                        <TableCell>{leadsCount[client.id] ?? 0}</TableCell>
                        <TableCell>{pageViews[client.id] ?? 0}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-white ${
                              client.status === 'active'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {client.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {firstLeadURLs[client.id] ? (
                            <Link
                              href={firstLeadURLs[client.id]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              View Page
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </Link>
                          ) : (
                            <span className="text-gray-500">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No clients found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}