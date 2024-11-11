import { NextRequest, NextResponse } from 'next/server';

// Middleware function that handles requests
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  const pathname = url.pathname;

  // Log for debugging: Display the incoming request details
  console.log('Host:', host);
  console.log('Pathname:', pathname);

  // Skip processing for static assets or Next.js internal paths
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Allow static asset requests to pass through
  }

  // Check if the host contains 'go.' (for both local and production environments)
  if (host.startsWith('go.')) {
    // If already on /login, do nothing
    if (pathname === '/login') {
      console.log('Already on /login page, not redirecting');
      return NextResponse.next(); // Allow the request to continue
    }

    // Redirect to /login if it's not already /login
    console.log(`${host} detected, redirecting to login`);
    url.pathname = '/login'; // Set the pathname to login
    return NextResponse.redirect(url); // Redirect to /login
  }

  // For all other paths, let the request proceed as normal
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};