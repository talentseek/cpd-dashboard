'use client';

import SequenceSettings from '@/components/campaigns/SequenceSettings';

interface SequenceMessage {
  subject: string;
  body: string;
  // Add more fields as needed
}

export default function CampaignSequencePage() {
  const handleSaveSequence = (messages: SequenceMessage[]) => {
    console.log('Saved sequence:', messages);
    // TODO: Save the sequence to the database via an API call or Supabase client
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sequence Setup</h1>
      <SequenceSettings onSave={handleSaveSequence} />
    </div>
  );
}