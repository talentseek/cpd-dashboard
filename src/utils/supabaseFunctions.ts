import { supabase } from '@/lib/utils';

export async function fetchLeads() {
  console.log("Fetching leads from Supabase...");
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    console.error("Error fetching leads from Supabase:", error);
    return [];
  }
  console.log("Fetched data:", data); // Enhanced logging
  return data;
}