import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the hostname from the request headers
  const host = request.headers.get('host') || '';

  // Check if the hostname starts with "go."
  if (host.startsWith('go.')) {
    // If the hostname is "go.<client>", check if the path is not already '/login'
    if (request.nextUrl.pathname !== '/login') {
      console.log(`${host} detected, redirecting to login`);
      return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login page
    }
  }

  // Proceed with the request if it doesn't match the conditions above
  return NextResponse.next();
}

// Optional: Config to specify when this middleware runs (optional depending on your needs)
export const config = {
  matcher: ['/:path*'], // Apply middleware to all paths
};