'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      const user = data.user;
      if (!user) {
        console.error('User data not available after login.');
        return;
      }

      // Fetch user profile data
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      } else {
        // Redirect based on user role and client_id
        if (profile.role === 'admin') {
          router.push('/admin');
        } else {
          const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('client_name')
            .eq('id', profile.client_id)
            .single();

          if (clientError || !clientData) {
            console.error('Error fetching client data:', clientError);
            router.push('/unauthorized');
          } else {
            router.push(`/dashboard/${clientData.client_name}`);
          }
        }
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}