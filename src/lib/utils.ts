import { createClient } from '@supabase/supabase-js'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const supabaseUrl = 'https://qrlmomnhvxjgueakraym.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybG1vbW5odnhqZ3VlYWtyYXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwOTQ1MDUsImV4cCI6MjA0NjY3MDUwNX0.5kLPxfIto-10SUF-As7nIpf9GWeq8qlfab6HkucA9oY'

export const supabase = createClient(supabaseUrl, supabaseKey)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}