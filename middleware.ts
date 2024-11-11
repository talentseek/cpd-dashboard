// middleware.ts
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  console.log('Host:', host); // Logs the host to check if it's correct

  if (host.startsWith('go.')) {
    console.log('Redirecting to login'); // Logs when a request is redirected
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}