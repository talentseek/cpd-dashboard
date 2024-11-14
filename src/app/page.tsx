'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    // Parse subdomain from window location
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      if (parts.length > 2) {
        setSubdomain(parts[0]);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {subdomain ? `Welcome! Your subdomain '${subdomain}' has been successfully set up!` : 'Welcome!'}
        </h1>
        <p className="text-lg mb-6">
          Your subdomain is ready. To continue, please log in.
        </p>
        <Link href="/login">
          {/* No <a> needed inside Link */}
          <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
            Go to Login
          </span>
        </Link>
      </main>
    </div>
  );
}