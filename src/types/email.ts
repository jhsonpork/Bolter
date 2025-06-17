export interface ColdEmailResult {
  subject: string;
  emailBody: string;
  followUps: string[];
  spamScore: number;
  openRatePrediction: number;
  responseRatePrediction: number;
}

export interface EmailSendRequest {
  to: string;
  subject: string;
  content: string;
}

export interface EmailSendResult {
  messageId: string;
  status: 'sent' | 'failed';
  error?: string;
}