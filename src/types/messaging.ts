export interface MessageSequence {
  messages: Array<{
    stage: number;
    content: string;
    subject?: string; // Only for open_profile_messages
    delay_days?: number; // Omitted for Stage 1
  }>;
  connection_request_message?: {
    content: string;
  };
}

export interface MessagingSettingsState {
  maxMessagesPerDay: number;
  timeDelayBetweenMessages: number;
  startTime: string;
  endTime: string;
  timeZone: string;
}
