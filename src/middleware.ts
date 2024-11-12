// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = request.headers.get('host') || '';

  // Skip processing for static assets or Next.js internal paths
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Allow static asset requests to pass through
  }

  // Allow testing with both local and production subdomains
  if (host.startsWith('go.localhost') || host.startsWith('go.costperdemo.com')) {
    // Handle the case where we are dealing with a dynamic landing page
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 1) {
      // Dynamic landing page like "/Horwood_House"
      const [landingPageName] = pathSegments;
      const subdomain = host.split('.')[0]; // Extract the subdomain part, i.e., "go"
      
      // Rewrite the URL to redirect to the client-specific path dynamically
      url.pathname = `/${subdomain}/${landingPageName}`;
      return NextResponse.rewrite(url); // Perform the rewrite
    }
  }

  // For all other paths, continue processing
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};