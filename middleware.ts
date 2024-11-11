// /middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Handle requests that match the `go.` subdomain pattern
  if (host.startsWith('go.')) {
    // Extract the client domain from the host
    const clientDomain = host.replace('go.', '').split('.')[0];

    // Redirect logic for the client page
    url.pathname = `/client/${clientDomain}${url.pathname}`; // Preserve the pathname for deeper routes
    return NextResponse.rewrite(url);
  }

  // Continue processing for all other requests
  return NextResponse.next();
}