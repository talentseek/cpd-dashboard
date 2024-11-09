'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Linkedin } from 'lucide-react';

export default function ClientLeadTable() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUserLeads() {
      try {
        // Get user data
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error('Error fetching user data or not authenticated:', userError);
          return;
        }
        console.log('Authenticated user ID:', user.id);

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError || !profile) {
          console.error('Error fetching user profile:', profileError);
          return;
        }
        console.log('Fetched profile:', profile);

        // Fetch leads based on profile's client ID
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads')
          .select('*')
          .eq('client', profile.client_id);

        if (leadsError) {
          console.error('Error fetching leads:', leadsError);
        } else {
          setLeads(leadsData);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
    fetchUserLeads();
  }, []);

  const filteredLeads = leads.filter(lead =>
    lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Created</TableHead>
              <TableHead>Lead Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Landing Page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Link href={lead.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 text-blue-600 mr-2" />
                    </Link>
                    {`${lead.first_name} ${lead.last_name}`}
                  </div>
                </TableCell>
                <TableCell>{lead.position || '-'}</TableCell>
                <TableCell>
                  {lead.website ? (
                    <Link href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {lead.company}
                    </Link>
                  ) : (
                    lead.company
                  )}
                </TableCell>
                <TableCell>{lead.clicks || '-'}</TableCell>
                <TableCell>
                  <Link href={`/${lead.client}/${lead.company.replace(/\s/g, '_')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Page
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}