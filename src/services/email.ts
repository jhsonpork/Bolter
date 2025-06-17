import { ColdEmailResult, EmailSendRequest, EmailSendResult } from '../types/email';
import { callGeminiAPI } from './gemini';

// Mailjet API configuration
const MAILJET_API_KEY = '816e8b678b0aab05cd0c067a3708e634';
const MAILJET_SECRET_KEY = 'b6cac741d325ccd47231b23f16e7bdfe';

export const generateColdEmail = async (
  businessDescription: string,
  targetNiche: string,
  emailType: string = 'outreach'
): Promise<ColdEmailResult> => {
  const prompt = `
You are a world-class email marketing expert. Create a high-conversion cold email for this business targeting the specified niche.

Business: "${businessDescription}"
Target Niche: "${targetNiche}"
Email Type: "${emailType}"

Generate the following in JSON format:
{
  "subject": "Compelling subject line that gets opened (max 50 characters)",
  "emailBody": "Complete email body with personalization placeholders like [Name], [Company]. Include hook, value proposition, social proof, and clear CTA. Keep it under 150 words.",
  "followUps": ["3 different follow-up email templates for non-responders"],
  "spamScore": "realistic score between 1-10 (lower is better)",
  "openRatePrediction": "realistic percentage between 15-45",
  "responseRatePrediction": "realistic percentage between 2-15"
}

Make it personal, valuable, and conversion-focused. Avoid spam triggers and use proven email marketing psychology.
`;

  return await callGeminiAPI(prompt);
};

export const sendEmail = async (emailData: EmailSendRequest): Promise<EmailSendResult> => {
  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`)}`
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "noreply@adrocket.ai",
              Name: "AdRocket AI"
            },
            To: [
              {
                Email: emailData.to,
                Name: "Prospect"
              }
            ],
            Subject: emailData.subject,
            TextPart: emailData.content,
            HTMLPart: emailData.content.replace(/\n/g, '<br>')
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Mailjet API error: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      messageId: result.Messages[0].MessageID,
      status: 'sent'
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      messageId: '',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};