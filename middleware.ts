import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  console.log('Host:', host); // Log to see if it's correctly capturing the host.

  // If the subdomain starts with "go", redirect to the login page
  if (host.startsWith('go.')) {
    console.log('Redirecting to login page...');
    url.pathname = '/login'; // Redirect to login
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Continue processing the request if no match
}

// Config to ensure middleware is triggered for all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};