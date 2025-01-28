// src/utils/urlHelpers.ts

/**
 * Safely construct a landing page URL for a lead, even if some fields are null.
 */
export function constructLandingPageURL(lead: {
  first_name?: string | null;
  last_name?: string | null;
  company?: string | null;
}): string {
  // Fallback to 'unknown' if first_name is missing or empty
  const safeFirstName = lead.first_name && lead.first_name.trim()
    ? lead.first_name.trim().toLowerCase()
    : 'unknown';

  // Fallback to 'X' if last_name is missing or empty
  const safeLastName = lead.last_name && lead.last_name.trim()
    ? lead.last_name.trim()
    : 'X';

  // Take only the first character, uppercase it
  const surnameInitial = encodeURIComponent(safeLastName.charAt(0).toUpperCase());

  // Fallback to 'company' if company is missing or empty
  const safeCompany = lead.company && lead.company.trim()
    ? lead.company.trim().replace(/\s+/g, '').toLowerCase()
    : 'company';

  // Encode the firstName and company portions
  const firstName = encodeURIComponent(safeFirstName);
  const companyName = encodeURIComponent(safeCompany);

  return `/${firstName}${surnameInitial}.${companyName}`;
}

/**
 * Parse a landing page URL back into its component parts.
 * Example input: "/johnD.microsoft"
 * Returns { firstName: 'john', surnameInitial: 'D', companyName: 'microsoft' }
 */
export function parseLandingPageURL(page: string): {
  firstName: string;
  surnameInitial: string;
  companyName: string;
} {
  const [leadPartEncoded, companyNameEncoded] = page.split('.');

  // Decode URL components
  const leadPart = decodeURIComponent(leadPartEncoded);
  const companyName = decodeURIComponent(companyNameEncoded);

  // Everything up to the last character is the first name, last char is the initial
  const firstName = leadPart.slice(0, -1);
  const surnameInitial = leadPart.slice(-1);

  return { firstName, surnameInitial, companyName };
}

/**
 * Safely normalize a string by removing whitespace and converting to lowercase.
 * If the string is null or empty, returns an empty string.
 */
export function normalizeString(str: string | null | undefined): string {
  if (!str) return '';
  return str.replace(/\s+/g, '').toLowerCase();
}