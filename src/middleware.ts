import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './lib/utils'; // Ensure you have access to supabase from the middleware

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = request.headers.get('host') || '';

  // Skip processing for static assets or Next.js internal paths
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Allow static asset requests to pass through
  }

  // Extract the subdomain from the host
  const subdomain = host.split('.')[0]; // For example, "go" or "hotelfriend"

  // If we are dealing with a dynamic landing page, like "/Horwood_House"
  const pathSegments = pathname.split('/').filter(Boolean);

  // Check if the path is just the landing page name
  if (pathSegments.length === 1) {
    const [landingPageName] = pathSegments;

    // Fetch client details from the database using the subdomain
    const { data, error } = await supabase
      .from('clients')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();

    if (error || !data) {
      console.error('Error fetching client data:', error);
      return NextResponse.next(); // If error, continue without rewriting
    }

    // Rewrite the URL to the correct client-specific path
    url.pathname = `/${subdomain}/${landingPageName}`; // Ensure it rewrites to "/go/{landingPageName}"
    return NextResponse.rewrite(url); // Perform the rewrite
  }

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};