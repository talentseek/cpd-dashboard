// /middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  if (host.startsWith('go.')) {
    const clientDomain = host.replace('go.', '').split('.')[0]; // Extract the client domain
    url.pathname = `/client/${clientDomain}`; // Redirect to the appropriate path
    return NextResponse.rewrite(url);
  }

  return NextResponse.next(); // Continue if no matching subdomain
}