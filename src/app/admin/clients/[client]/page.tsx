'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/utils';
import AdminLayout from '@/components/AdminLayout';

interface Client {
  client_name: string;
}

export default function ClientPage() {
  const params = useParams();
  const clientId = parseInt(
    Array.isArray(params?.client) ? params.client[0] : params?.client || ''
  );

  const [clientDetails, setClientDetails] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientDetails() {
      if (isNaN(clientId)) {
        console.error('Invalid client ID in the URL.');
        setError('Client not found.');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching client details for ID:', clientId);

        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name')
          .eq('id', clientId)
          .single();

        if (clientError || !clientData) {
          throw new Error(`Client not found. Supabase error: ${clientError.message}`);
        }

        setClientDetails(clientData);
        console.log('Fetched client details:', clientData);
      } catch (err) {
        console.error('Unexpected error:', (err as Error).message || err);
        setError('Unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchClientDetails();
  }, [clientId]);

  if (loading) {
    return <AdminLayout>Loading client details...</AdminLayout>;
  }

  if (error) {
    return <AdminLayout>Error: {error}</AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">
        Client Details: {clientDetails?.client_name || 'Not Found'}
      </h1>
    </AdminLayout>
  );
}