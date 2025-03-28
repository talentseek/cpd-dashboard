'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MessageSequenceEditor } from '@/components/MessageSequenceEditor';
import { MessageSequence } from '@/types/messageSequence';
import { CampaignError } from '@/types/campaign';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/utils';

export default function CampaignSequencePage() {
  const params = useParams();
  const campaignId = parseInt(params.id as string, 10);
  const [openProfileMessages, setOpenProfileMessages] = useState<MessageSequence | null>(null);
  const [connectionMessages, setConnectionMessages] = useState<MessageSequence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<CampaignError | null>(null);

  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('open_profile_messages, connection_messages')
          .eq('id', campaignId)
          .single();

        if (error || !data) {
          throw new Error(`Failed to fetch campaign: ${error?.message || 'Campaign not found'}`);
        }

        console.log('Fetched campaign data:', data);

        // Extract open_profile_messages and connection_messages
        const openProfileData: MessageSequence = data.open_profile_messages || { messages: [] };
        const connectionData: MessageSequence = data.connection_messages || {
          messages: [],
          connection_request_message: { content: '' },
        };

        console.log('Fetched open_profile_messages:', openProfileData);
        console.log('Fetched connection_messages:', connectionData);

        // Clean Stage 1 messages to ensure no delay_days
        const cleanMessages = (messages: MessageSequence['messages']) =>
          messages.map((message) => {
            if (message.stage === 1) {
              const { delay_days, ...rest } = message;
              return rest;
            }
            return message;
          });

        const transformedOpenProfileMessages: MessageSequence = {
          messages: cleanMessages(openProfileData.messages || []),
        };

        const transformedConnectionMessages: MessageSequence = {
          messages: cleanMessages(connectionData.messages || []),
          connection_request_message: connectionData.connection_request_message || { content: '' },
        };

        console.log('Transformed open_profile_messages:', transformedOpenProfileMessages);
        console.log('Transformed connection_messages:', transformedConnectionMessages);

        setOpenProfileMessages(transformedOpenProfileMessages);
        setConnectionMessages(transformedConnectionMessages);
        setLoading(false);
      } catch (error) {
        const campaignError: CampaignError = {
          message: error instanceof Error ? error.message : 'An error occurred while fetching the sequence',
        };
        setError(campaignError);
        console.error('Error fetching sequence:', error);
      }
    };

    if (!isNaN(campaignId)) {
      fetchSequence();
    } else {
      setError({ message: 'Invalid campaign ID' });
      setLoading(false);
    }
  }, [campaignId]);

  const handleSaveSequence = async (type: 'openProfile' | 'connectionRequest', newSequence: MessageSequence) => {
    try {
      // Clean Stage 1 messages to ensure no delay_days
      const cleanedMessages = newSequence.messages.map((message) => {
        if (message.stage === 1) {
          const { delay_days, ...rest } = message;
          return rest;
        }
        return message;
      });

      const cleanedSequence: MessageSequence = {
        ...newSequence,
        messages: cleanedMessages,
      };

      // Prepare the payload based on the type
      const updateData =
        type === 'openProfile'
          ? { open_profile_messages: { messages: cleanedSequence.messages } }
          : {
              connection_messages: {
                messages: cleanedSequence.messages,
                connection_request_message: { content: cleanedSequence.connection_request_message?.content || '' },
              },
            };

      console.log('Saving payload:', JSON.stringify(updateData, null, 2));

      const { error } = await supabase
        .from('campaigns')
        .update(updateData)
        .eq('id', campaignId);

      if (error) {
        throw new Error(`Failed to save sequence: ${error.message}`);
      }

      // Update the state based on the type
      if (type === 'openProfile') {
        setOpenProfileMessages(cleanedSequence);
      } else {
        setConnectionMessages(cleanedSequence);
      }

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
        <Card>
          <CardHeader>
            <CardTitle>Manage Message Sequences</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="openProfile" className="space-y-4">
              <TabsList>
                <TabsTrigger value="openProfile">Open Profile Messages</TabsTrigger>
                <TabsTrigger value="connectionRequest">Connection Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="openProfile">
                <MessageSequenceEditor
                  type="openProfile"
                  initialSequence={
                    openProfileMessages || { messages: [{ stage: 1, content: '', subject: '' }] }
                  }
                  campaignId={campaignId.toString()}
                  onSave={(newSequence) => handleSaveSequence('openProfile', newSequence)}
                />
              </TabsContent>
              <TabsContent value="connectionRequest">
                <MessageSequenceEditor
                  type="connectionRequest"
                  initialSequence={
                    connectionMessages || {
                      messages: [{ stage: 1, content: '' }],
                      connection_request_message: { content: '' },
                    }
                  }
                  campaignId={campaignId.toString()}
                  onSave={(newSequence) => handleSaveSequence('connectionRequest', newSequence)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}