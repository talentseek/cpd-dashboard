export interface LinkedInCookies {
    li_a: string;
    li_at: string;
}

export interface ScrapedLead {
  fullName: string;
  profileLink: string;
  company?: string;
  companyLink?: string;
  jobTitle?: string;
  isOpen: boolean;
  isPremium: boolean;
  connectionLevel?: number;
}

export interface DatabaseLead {
    id: string;
    created_at: string;
    company?: string;
    first_name: string;
    last_name: string;
    linkedin: string;
    website?: string;
    position?: string;
    client_id: number;
    message_sent: boolean;
    search_url_id: number;
    is_duplicate: boolean;
    is_open_profile: boolean;
    is_premium_profile: boolean;
    connection_level?: number;
}

export interface ScrapingApiResponse {
    success: boolean;
    data?: ScrapedLead[];
    error?: string;
}

export interface ScrapeResult {
    success: boolean;
    message?: string;
    error?: string;
    profiles?: ScrapedLead[];
}
