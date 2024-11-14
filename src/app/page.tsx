'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [fullDomain, setFullDomain] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the full hostname, including subdomains if present
      const hostname = window.location.hostname;
      setFullDomain(hostname);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
        {fullDomain && (
          <p className="text-lg mb-4">
            You have successfully set up your subdomain: <strong>{fullDomain}</strong>
          </p>
        )}
        <Link
          href="/login"
          className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}