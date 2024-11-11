import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';
  console.log('Middleware called. Host:', host); // Log to see if middleware is executed

  if (host.startsWith('go.')) {
    const clientDomain = host.replace('go.', '').split('.')[0]; // Extract the client domain
    console.log('Client Domain:', clientDomain); // Log the extracted client domain
    url.pathname = `/client/${clientDomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next(); // Continue if no matching subdomain
}