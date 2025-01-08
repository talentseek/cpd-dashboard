'use client';

import { useState } from 'react';

interface SequenceSettingsProps {
  initialMessages?: Message[];
  onSave: (messages: Message[]) => void;
}

interface Message {
  id: number;
  subject: string;
  body: string;
  delay: number; // Delay in days
}

export default function SequenceSettings({ initialMessages = [], onSave }: SequenceSettingsProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleFieldChange = (id: number, field: keyof Message, value: string | number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
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
        id: prev.length + 1,
        subject: '',
        body: '',
        delay: 1,
      },
    ]);
  };

  const handleRemoveMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleSave = () => {
    onSave(messages);
    alert('Sequence saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Sequence Settings</h2>
      <p className="text-gray-600">
        Configure the sequence of messages for this campaign. Each message can include a subject, body, and delay.
      </p>

      {messages.map((message) => (
        <div key={message.id} className="border border-gray-300 p-4 rounded-md space-y-4">
          <div>
            <label htmlFor={`subject-${message.id}`} className="block text-sm font-medium text-gray-700">
              Subject Line
            </label>
            <input
              type="text"
              id={`subject-${message.id}`}
              value={message.subject}
              onChange={(e) => handleFieldChange(message.id, 'subject', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor={`body-${message.id}`} className="block text-sm font-medium text-gray-700">
              Message Body
            </label>
            <textarea
              id={`body-${message.id}`}
              value={message.body}
              onChange={(e) => handleFieldChange(message.id, 'body', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor={`delay-${message.id}`} className="block text-sm font-medium text-gray-700">
              Delay Before Sending (in days)
            </label>
            <input
              type="number"
              id={`delay-${message.id}`}
              value={message.delay}
              onChange={(e) => handleFieldChange(message.id, 'delay', parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => handleRemoveMessage(message.id)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Remove Message
          </button>
        </div>
      ))}

      <div>
        <button
          onClick={handleAddMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Message
        </button>
      </div>

      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Sequence
        </button>
      </div>
    </div>
  );
}