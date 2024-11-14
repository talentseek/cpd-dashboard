// src/utils/urlHelpers.ts

export function constructLandingPageURL(lead: {
  first_name: string;
  last_name: string;
  company: string;
}): string {
  const firstName = encodeURIComponent(lead.first_name.toLowerCase());
  const surnameInitial = encodeURIComponent(lead.last_name.charAt(0).toUpperCase());
  const companyName = encodeURIComponent(lead.company.replace(/\s+/g, '').toLowerCase());
  return `/${firstName}${surnameInitial}.${companyName}`;
}

export function parseLandingPageURL(page: string): {
  firstName: string;
  surnameInitial: string;
  companyName: string;
} {
  const [leadPartEncoded, companyNameEncoded] = page.split('.');

  // Decode URL components
  const leadPart = decodeURIComponent(leadPartEncoded);
  const companyName = decodeURIComponent(companyNameEncoded);

  const firstName = leadPart.slice(0, -1);
  const surnameInitial = leadPart.slice(-1);

  return { firstName, surnameInitial, companyName };
}

export function normalizeString(str: string): string {
  return str.replace(/\s+/g, '').toLowerCase();
}