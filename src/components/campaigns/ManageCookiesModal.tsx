'use client';

import React, { useState, useEffect } from 'react';

interface ManageCookiesModalProps {
  campaign: { id: number; name: string };
  onClose: () => void;
  onSave: () => void;
}

const ManageCookiesModal: React.FC<ManageCookiesModalProps> = ({
  campaign,
  onClose,
  onSave,
}) => {
  const [li_a, setLiA] = useState('');
  const [li_at, setLiAt] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaign.id}/cookies`, {
          method: 'GET',
        });

        if (response.ok) {
          const { cookies } = await response.json();
          setLiA(cookies?.li_a || ''); // Handle missing li_a gracefully
          setLiAt(cookies?.li_at || ''); // Handle missing li_at gracefully
        } else {
          const { error } = await response.json();
          setStatusMessage(error || 'Failed to fetch cookies');
        }
      } catch (error: unknown) {
        console.error('Error fetching cookies:', error);
        if (error instanceof Error) {
          setStatusMessage(error.message);
        } else {
          setStatusMessage('Error fetching cookies');
        }
      }
    };

    fetchCookies();
  }, [campaign.id]);

  const handleSaveCookies = async () => {
    setStatusMessage(null);
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/cookies`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookies: { li_a, li_at } }),
      });

      if (response.ok) {
        setStatusMessage('Cookies saved successfully!');
        onSave();
      } else {
        const { error } = await response.json();
        throw new Error(error || 'Failed to save cookies');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage('An unknown error occurred.');
      }
    }
  };

  const handleTestCookies = async () => {
    setIsTesting(true);
    setStatusMessage(null);

    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/cookies/test`, {
        method: 'POST',
      });

      if (response.ok) {
        setStatusMessage('Cookies are valid!');
      } else {
        const { error } = await response.json();
        throw new Error(error || 'Cookies are invalid');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage('An unknown error occurred.');
      }
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          Manage Cookies for {campaign.name}
        </h2>
        {statusMessage && <p className="mb-2 text-sm text-red-500">{statusMessage}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveCookies();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">li_a Cookie</label>
            <input
              type="text"
              value={li_a}
              onChange={(e) => setLiA(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">li_at Cookie</label>
            <input
              type="text"
              value={li_at}
              onChange={(e) => setLiAt(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleTestCookies}
              className={`px-4 py-2 rounded text-white ${
                isTesting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={isTesting}
            >
              {isTesting ? 'Testing...' : 'Test Cookies'}
            </button>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCookiesModal;