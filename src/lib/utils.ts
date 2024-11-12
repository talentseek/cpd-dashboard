import { createClient } from '@supabase/supabase-js'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Supabase configuration with hardcoded keys (replace with environment variables in production for security)
const supabaseUrl = 'https://qrlmomnhvxjgueakraym.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybG1vbW5odnhqZ3VlYWtyYXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwOTQ1MDUsImV4cCI6MjA0NjY3MDUwNX0.5kLPxfIto-10SUF-As7nIpf9GWeq8qlfab6HkucA9oY'

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Utility function to merge and conditionally apply class names using clsx and twMerge.
 * @param inputs - An array of class values to merge.
 * @returns A single merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fetch client data by client name (subdomain) from the Supabase database.
 * @param clientName - The client name (subdomain) to fetch data for.
 * @returns The client data object from Supabase, or null if not found.
 */
export async function fetchClientData(clientName: string) {
  try {
    const { data, error } = await supabase
      .from('client_data') // Adjust table name if necessary
      .select('*')
      .eq('subdomain', clientName)
      .single()

    if (error) {
      console.error('Error fetching client data:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error fetching client data:', error)
    return null
  }
}