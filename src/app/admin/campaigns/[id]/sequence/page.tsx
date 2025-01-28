'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SequenceSettings from '@/components/campaigns/SequenceSettings';
import { Message, CampaignError } from '@/types/campaign';

export default function CampaignSequencePage() {
    const params = useParams();
    const campaignId = parseInt(params.id as string, 10);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<CampaignError | null>(null);

    useEffect(() => {
        const fetchSequence = async () => {
            try {
                const res = await fetch(`/api/campaigns/${campaignId}/sequence`, { method: 'GET' });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setMessages(data);
                setLoading(false);
            } catch (error) {
                const campaignError: CampaignError = {
                    message: error instanceof Error ? error.message : 'An error occurred while fetching the sequence',
                };
                setError(campaignError);
                console.error('Error fetching sequence:', error);
            }
        };

        fetchSequence();
    }, [campaignId]);

    const handleSaveSequence = async (newMessages: Message[]) => {
        try {
            const res = await fetch(`/api/campaigns/${campaignId}/sequence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessages),
            });

            if (!res.ok) {
                throw new Error('Failed to save sequence');
            }

            setMessages(newMessages);
            alert('Sequence saved successfully!');
        } catch (error) {
            const campaignError: CampaignError = {
                message: error instanceof Error ? error.message : 'An error occurred while saving the sequence',
            };
            setError(campaignError);
            console.error('Error saving sequence:', error);
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Sequence Setup</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <SequenceSettings initialMessages={messages} onSave={handleSaveSequence} />
            )}
        </div>
    );
}
