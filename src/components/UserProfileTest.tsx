'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils'; // Ensure your Supabase client is set up

export default function UserProfileTest() {
  const [profiles, setProfiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*');

      if (error) {
        setErrorMessage(error.message);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">User Profiles</h1>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              {profile.email} - {profile.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}