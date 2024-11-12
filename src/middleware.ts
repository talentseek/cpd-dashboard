import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = request.headers.get('host') || '';

  // Skip processing for static assets or Next.js internal paths
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Allow static asset requests to pass through
  }

  // Extract subdomain from the host (e.g., 'go' from 'go.localhost' or 'go.costperdemo.com')
  const subdomain = host.split('.')[0]; // This works for both 'go.localhost' and 'go.costperdemo.com'

  // If the subdomain is 'go' (for dynamic clients), we process the landing page path
  if (subdomain && host.startsWith('go.')) {
    const pathSegments = pathname.split('/').filter(Boolean);

    // If the path is a single segment (like /Horwood_House), rewrite the URL dynamically
    if (pathSegments.length === 1) {
      // Extract the landing page name, e.g., 'Horwood_House'
      const [landingPageName] = pathSegments;

      // Rewrite the URL to be dynamic based on the subdomain
      url.pathname = `/${subdomain}/${landingPageName}`;

      // Perform the rewrite and redirect
      return NextResponse.rewrite(url);
    }
  }

  // For all other paths, continue processing
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};