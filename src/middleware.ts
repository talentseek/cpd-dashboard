import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = request.headers.get('host') || '';

  // Skip processing for static assets or Next.js internal paths
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Allow static asset requests to pass through
  }

  // Extract subdomain from the host
  const subdomain = host.split('.')[0]; // e.g., "go" from go.costperdemo.com

  // We assume the subdomain corresponds to a client
  if (subdomain) {
    // Handle the case where we are dealing with a dynamic landing page like /Horwood_House
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 1) {
      // Dynamic landing page like "/Horwood_House"
      const [landingPageName] = pathSegments;

      // Rewrite the URL to `/subdomain/landingPageName`
      url.pathname = `/${subdomain}/${landingPageName}`;

      // Rewrite the request to the new URL
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