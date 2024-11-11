import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  console.log('Middleware called. Host:', host); // Log the host to see what is being captured

  // Special rule for go.costperdemo.com
  if (host === 'go.costperdemo.com') {
    url.pathname = '/login'; // Redirect to the login page
    return NextResponse.rewrite(url); // or NextResponse.redirect(url) if you prefer a redirect
  }

  // Existing rule for other subdomains starting with 'go.'
  if (host.startsWith('go.')) {
    const clientDomain = host.replace('go.', '').split('.')[0]; // Extract the client domain
    console.log('Client Domain:', clientDomain); // Log the extracted client domain
    url.pathname = `/client/${clientDomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next(); // Continue if no matching subdomain
}