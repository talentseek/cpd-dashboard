'use client';

import { useEffect, useState } from 'react';
import { fetchLeads } from '@/utils/supabaseFunctions';

export default function TestSupabasePage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchLeads();
      console.log("Supabase Data in Component:", data); // Check data in component
      setLeads(data);
    }
    getData();
  }, []);

  return (
    <div>
      <h1>Supabase Leads Test</h1>
      <pre>{JSON.stringify(leads, null, 2)}</pre>
    </div>
  );
}