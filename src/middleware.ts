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

  // Allow testing with both local and production subdomains
  if (host.startsWith('go.localhost') || host.startsWith('go.costperdemo.com')) {
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 1) {
      const [landingPageName] = pathSegments;
      const subdomain = host.split('.')[0]; // Extract subdomain (e.g., go)

      // Fetch the client data based on the subdomain
      const { data, error } = await supabase
        .from('clients')
        .select('subdomain')
        .eq('subdomain', subdomain)
        .single();

      if (error || !data) {
        console.error('Error fetching client data:', error);
        return NextResponse.next(); // If error, continue as normal
      }

      // Now we can use the subdomain to redirect to the correct client path
      // Rewrite the URL to /{client}/{landingPageName}
      url.pathname = `/${data.subdomain}/${landingPageName}`;
      return NextResponse.rewrite(url); // Perform the rewrite
    }
  }

  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*', // Apply to all paths
};