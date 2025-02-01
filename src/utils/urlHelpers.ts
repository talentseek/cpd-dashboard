// src/utils/urlHelpers.ts

/**
 * Safely construct a landing page URL for a lead, even if some fields are null.
 */
export function constructLandingPageURL(lead: {
  first_name?: string | null;
  last_name?: string | null;
  company?: string | null;
}): string {
  // Ensure first name is valid
  const safeFirstName = lead.first_name?.trim()?.toLowerCase() || 'unknown';

  // Ensure last name is valid before extracting initial
  let safeLastName = lead.last_name?.trim() || '';

  // Remove non-ASCII characters that might break encodeURIComponent
  safeLastName = safeLastName.replace(/[^\x00-\x7F]/g, '');

  // Ensure the last name still has valid characters before extracting initial
  const surnameInitial = safeLastName.length > 0 
    ? encodeURIComponent(safeLastName.charAt(0).toUpperCase()) 
    : ''; // ✅ Always return a string

  // Ensure company name is valid
  const safeCompany = lead.company?.trim()?.replace(/\s+/g, '').toLowerCase() || 'company';

  // Encode first name and company
  const firstName = encodeURIComponent(safeFirstName);
  const companyName = encodeURIComponent(safeCompany);

  // Construct URL without extra dots if `surnameInitial` is missing
  return surnameInitial 
    ? `/${firstName}${surnameInitial}.${companyName}` 
    : `/${firstName}.${companyName}`;
}

/**
 * Parse a landing page URL back into its component parts.
 */
export function parseLandingPageURL(page: string): {
  firstName: string;
  surnameInitial: string;
  companyName: string;
} {
  const [leadPartEncoded, companyNameEncoded] = page.split('.');

  // Decode URL components safely
  const leadPart = decodeURIComponent(leadPartEncoded || '');
  const companyName = decodeURIComponent(companyNameEncoded || '');

  // Extract first name & last initial, ensuring `surnameInitial` is always a string
  const firstName = leadPart.length > 1 ? leadPart.slice(0, -1) : leadPart;
  const surnameInitial = leadPart.length > 1 ? leadPart.slice(-1) : ''; // ✅ Always return a string

  return { firstName, surnameInitial, companyName };
}

/**
 * Safely normalize a string by removing whitespace and converting to lowercase.
 * If the string is null or empty, returns an empty string.
 */
export function normalizeString(str: string | null | undefined): string {
  return str?.replace(/\s+/g, '').toLowerCase() || '';
}