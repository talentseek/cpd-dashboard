import { supabase } from '@/lib/utils';

interface Lead {
  id?: number;
  search_url_id?: number;
  first_name?: string;
  last_name?: string;
  position?: string;
  company?: string;
  linkedin?: string;
  website?: string | null;
  is_duplicate?: boolean;
  is_open_profile?: boolean;
  message_sent?: boolean;
  // changed from 'any' to 'unknown' to avoid no-explicit-any
  [key: string]: unknown;
}

// Fetch all leads from the Supabase database
export async function fetchLeads(): Promise<Lead[]> {
  console.log('Fetching leads from Supabase...');
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    console.error('Error fetching leads from Supabase:', error);
    return [];
  }
  console.log('Fetched data:', data);
  return data || [];
}

// Save leads to the Supabase database
export async function saveLeads(leads: Lead[]): Promise<void> {
  console.log('Saving leads to Supabase...');
  const { error } = await supabase.from('leads').insert(leads);
  if (error) {
    console.error('Error saving leads to Supabase:', error);
    throw error;
  }
  console.log('Leads successfully saved to Supabase.');
}

// Fetch leads by search URL
export async function fetchLeadsBySearchUrl(searchUrl: string): Promise<Lead[]> {
  console.log(`Fetching leads for search URL: ${searchUrl}`);
  const { data, error } = await supabase.from('leads').select('*').eq('searchUrl', searchUrl);
  if (error) {
    console.error('Error fetching leads by search URL:', error);
    return [];
  }
  console.log('Fetched leads for search URL:', data);
  return data || [];
}

// Delete leads by ID
export async function deleteLeadById(id: string): Promise<void> {
  console.log(`Deleting lead with ID: ${id}`);
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
  console.log('Lead successfully deleted.');
}

// Fetch leads summary (total leads and duplicates)
export async function fetchLeadsSummary(): Promise<{ totalLeads: number; duplicates: number }> {
  console.log('Fetching leads summary...');
  const { data: leads, error } = await supabase.from('leads').select('profileUrl');
  if (error || !leads) {
    console.error('Error fetching leads summary:', error);
    return { totalLeads: 0, duplicates: 0 };
  }

  const totalLeads = leads.length;
  const duplicates = leads.filter((lead, index, self) =>
    self.findIndex((l) => l.profileUrl === lead.profileUrl) !== index
  ).length;

  console.log(`Total Leads: ${totalLeads}, Duplicates: ${duplicates}`);
  return { totalLeads, duplicates };
}

// Exported for status route
export async function getLeads(): Promise<Lead[]> {
  return fetchLeads();
}