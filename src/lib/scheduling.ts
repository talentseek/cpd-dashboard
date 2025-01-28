import { addMinutes, addDays, isBefore, parseISO, formatISO } from 'date-fns';

interface CampaignSettings {
  startTime: string; // e.g. "09:00:00"
  endTime: string;   // e.g. "18:00:00"
  timeZone?: string;
  maxMessagesPerDay: number;
  timeDelayBetweenMessages: number; // in minutes
}

interface MessageSequence {
  step_order: number;
  delay_in_days: number;  // must exist as a number in your DB or default to 0
  subject: string;
  body: string;
}

interface ScheduledMessage {
  lead_id: number;
  campaign_id: number;
  scheduled_time: string; // Should be valid ISO 8601
}

interface SchedulingInput {
leads: number[];
campaignSettings: CampaignSettings;
messageSequence: MessageSequence[];
existingScheduledMessages: ScheduledMessage[];
rawMessage: string;
rawSubject: string;
}

interface SchedulingOutput {
  lead_id: number;
  scheduled_time: string;  // ISO string
  raw_message: string;
  raw_subject: string;
}

/**
 * Generate a random delay within ±10% of the base delay.
 */
const applyRandomness = (baseDelay: number): number => {
  const variance = Math.floor(baseDelay * 0.1); // 10%
  return baseDelay + Math.floor(Math.random() * (variance * 2 + 1) - variance);
};

/**
 * Helper to parse a time string (HH:mm or HH:mm:ss) into a Date object (on baseDate).
 */
const parseTime = (timeStr: string, baseDate: Date): Date => {
  // Expect "HH:mm[:ss]" format from Supabase "time without time zone"
  const [hoursStr, minutesStr, secondsStr] = timeStr.split(':');
  const hours = parseInt(hoursStr || '0', 10);
  const minutes = parseInt(minutesStr || '0', 10);
  const seconds = parseInt(secondsStr || '0', 10);

  const parsed = new Date(baseDate.getTime());
  parsed.setHours(hours, minutes, seconds, 0);

  return parsed;
};

/**
 * Main scheduling utility function.
 */
export const scheduleMessages = ({
leads,
campaignSettings,
messageSequence,
existingScheduledMessages,
rawMessage,
rawSubject,
}: SchedulingInput): SchedulingOutput[] => {
  const { startTime, endTime, maxMessagesPerDay, timeDelayBetweenMessages } = campaignSettings;
  const schedule: SchedulingOutput[] = [];

  // We'll pick "today" as the base date. 
  // If you want to schedule strictly in the future (e.g. 2025-01-21), set baseDate to that date.
  const baseDate = new Date();

  // Parse working hours into Date objects
  const parsedStartTime = parseTime(startTime, baseDate);
  const parsedEndTime = parseTime(endTime, baseDate);

  console.log('Parsed Start Time:', parsedStartTime);
  console.log('Parsed End Time:', parsedEndTime);

  // Filter out invalid existing messages, to avoid parseISO errors
  const validScheduledMessages = existingScheduledMessages.filter((msg) => {
    if (!msg.scheduled_time) return false; // skip null or empty
    const parsed = Date.parse(msg.scheduled_time);
    if (Number.isNaN(parsed)) {
      console.warn('Skipping invalid scheduled_time:', msg.scheduled_time);
      return false;
    }
    return true;
  });

  // Sort by ascending time
  validScheduledMessages.sort((a, b) => {
    const dateA = parseISO(a.scheduled_time);
    const dateB = parseISO(b.scheduled_time);
    return dateA.getTime() - dateB.getTime();
  });

  // Now schedule new messages for each lead
  leads.forEach((leadId) => {
    let currentTime = parsedStartTime;
    let dailyCount = 0;

    messageSequence.forEach((message, idx) => {
      const delayDays = message.delay_in_days || 0;

      // If not the first message, shift currentTime by delay_in_days
      if (idx > 0) {
        currentTime = addDays(currentTime, delayDays);
      }

      // If currentTime is before the start, bump it to start
      if (isBefore(currentTime, parsedStartTime)) {
        currentTime = parsedStartTime;
      }

      // If we've reached daily limit or are past end time, go to next day at start
      if (dailyCount >= maxMessagesPerDay || currentTime >= parsedEndTime) {
        currentTime = addDays(parsedStartTime, 1);
        dailyCount = 0;
      }

      // Apply random delay between messages
      const randomizedDelay = applyRandomness(timeDelayBetweenMessages);
      currentTime = addMinutes(currentTime, randomizedDelay);

      // If that pushes us past endTime, jump to next day
      if (currentTime > parsedEndTime) {
        currentTime = addDays(parsedStartTime, 1);
        dailyCount = 0;
      }

      dailyCount++;

      // Do any placeholder replacements in rawMessage
      const personalizedMessage = rawMessage
        .replace(/{first_name}/g, '{placeholder_first_name}')
        .replace(/{company_name}/g, '{placeholder_company_name}')
        .replace(/{landingpage}/g, '{placeholder_landing_page}');

      schedule.push({
        lead_id: leadId,
        scheduled_time: formatISO(currentTime), // e.g. "2025-01-21T09:20:00Z"
        raw_message: personalizedMessage,
        raw_subject: rawSubject,
      });
    });
  });

  return schedule;
};