"use client";

import { useEffect } from 'react';

interface TrackVisitProps {
  clientId: number;
  leadId: number;
}

const TrackVisit = ({ clientId, leadId }: TrackVisitProps) => {
  useEffect(() => {
    console.log('TrackVisit component mounted with:', { clientId, leadId });

    const urlParams = new URLSearchParams(window.location.search);
    const channel = urlParams.get('linkedin'); // Adjust identifier as needed

    if (channel) {
      fetch('/api/track-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: clientId,
          leadId: leadId,
          channel: channel,
          userAgent: navigator.userAgent, // Send user agent string
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log('Tracking response:', data))
        .catch((error) => console.error('Error tracking visit:', error));
    }
  }, [clientId, leadId]);

  return null; // This component does not render anything visible
};

export default TrackVisit;