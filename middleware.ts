// /middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Check if the host starts with 'go.' (for testing purposes)
  if (host.startsWith('go.')) {
    // For testing, route to login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Continue if no matching subdomain
}

// Config matcher to specifically match requests for 'go.*'
export const config = {
  matcher: ['/go.*'], // This matches subdomains starting with 'go.'
};