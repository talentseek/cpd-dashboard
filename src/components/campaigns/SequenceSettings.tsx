'use client';

import { useState } from 'react';

interface SequenceSettingsProps {
  initialMessages?: Message[];
  onSave: (messages: Message[]) => void;
}

interface Message {
  id?: number; // Optional for new messages
  subject: string;
  body: string;
  delay: number; // Delay in days
}

export default function SequenceSettings({ initialMessages = [], onSave }: SequenceSettingsProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleFieldChange = (index: number, field: keyof Message, value: string | number) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? {
              ...msg,
              [field]: value,
            }
          : msg
      )
    );
  };

  const handleAddMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: undefined, // New messages don't have an ID
        subject: '',
        body: '',
        delay: 1,
      },
    ]);
  };

  const handleRemoveMessage = (index: number) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(messages);
    alert('Sequence saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Craft Sequence</h2>
      <p className="text-gray-600">
        <p>This campaign isn&apos;t ready to &quot;go live&quot; yet.</p>
      </p>

      {messages.map((message, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject Line</label>
            <input
              type="text"
              value={message.subject}
              onChange={(e) => handleFieldChange(index, 'subject', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message Body</label>
            <textarea
              value={message.body}
              onChange={(e) => handleFieldChange(index, 'body', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delay (days)</label>
            <input
              type="number"
              value={message.delay}
              onChange={(e) => handleFieldChange(index, 'delay', parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => handleRemoveMessage(index)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Remove Message
          </button>
        </div>
      ))}

      <button
        onClick={handleAddMessage}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Add Message
      </button>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Sequence
      </button>
    </div>
  );
}