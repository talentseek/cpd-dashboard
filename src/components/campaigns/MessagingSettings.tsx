'use client';

import { useState } from 'react';
import { MessagingSettingsState } from '@/types/messaging';

interface MessagingSettingsProps {
  initialSettings?: {
    maxMessagesPerDay: number;
    timeDelay: number;
    startTime: string;
    endTime: string;
    timeZone: string;
  };
  onSave: (settings: MessagingSettingsState) => void;
}

interface ExtendedMessagingSettingsState extends MessagingSettingsState {
startTime: string;
endTime: string;
timeZone: string;
}

export default function MessagingSettings({ initialSettings, onSave }: MessagingSettingsProps) {
const [settings, setSettings] = useState<ExtendedMessagingSettingsState>({
    maxMessagesPerDay: initialSettings?.maxMessagesPerDay || 50,
    timeDelayBetweenMessages: initialSettings?.timeDelay || 30,
    startTime: initialSettings?.startTime || '09:00',
    endTime: initialSettings?.endTime || '17:00',
    timeZone: initialSettings?.timeZone || 'UTC',
  });

const handleChange = (field: keyof ExtendedMessagingSettingsState, value: string | number) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Messaging Settings</h2>
      <p className="text-gray-600">Configure the messaging behavior for this campaign.</p>

      {/* Maximum Messages Per Day */}
      <div>
        <label htmlFor="maxMessagesPerDay" className="block text-sm font-medium text-gray-700">
          Maximum Messages Per Day
        </label>
        <input
          type="number"
          id="maxMessagesPerDay"
          value={settings.maxMessagesPerDay}
          onChange={(e) => handleChange('maxMessagesPerDay', parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Time Delay Between Messages */}
      <div>
        <label htmlFor="timeDelayBetweenMessages" className="block text-sm font-medium text-gray-700">
        Time Delay Between Messages (minutes)
        </label>
        <input
        type="number"
        id="timeDelayBetweenMessages"
        value={settings.timeDelayBetweenMessages}
        onChange={(e) => handleChange('timeDelayBetweenMessages', parseInt(e.target.value, 10))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Start and End Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={settings.startTime}
            onChange={(e) => handleChange('startTime', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            value={settings.endTime}
            onChange={(e) => handleChange('endTime', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Time Zone */}
      <div>
        <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
          Time Zone
        </label>
        <select
          id="timeZone"
          value={settings.timeZone}
          onChange={(e) => handleChange('timeZone', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          {/* Add more time zones as needed */}
        </select>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}