// src/types/lead.ts
export interface Lead {
  id: string;
  created_at: string;
  client: string;
  client_id: number | null; // client_id can be nullable
  company: string;
  first_name: string;
  last_name: string;
  position?: string;
  website?: string;
  linkedin?: string;
  clicks?: number;
}