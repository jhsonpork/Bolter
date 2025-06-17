import { InfluencerPitchResult } from '../types/influencer';
import { callGeminiAPI } from './gemini';

export const generateInfluencerPitch = async (
  businessDescription: string,
  influencerType: string,
  niche: string,
  budget: string = ''
): Promise<InfluencerPitchResult> => {
  const tierSpecs = {
    nano: 'nano-influencers (1K-10K followers) - focus on high engagement and authenticity',
    micro: 'micro-influencers (10K-100K followers) - balance of reach and engagement',
    macro: 'macro-influencers (100K-1M followers) - significant reach and brand awareness',
    mega: 'mega-influencers (1M+ followers) - massive reach and celebrity status'
  };

  const prompt = `
You are an influencer marketing expert. Create a personalized pitch package for ${tierSpecs[influencerType as keyof typeof tierSpecs]} in the ${niche} niche.

Business: "${businessDescription}"
Influencer Tier: ${influencerType}
Niche: ${niche}
Budget: ${budget || 'Flexible'}

Generate the following in JSON format:
{
  "outreachMessage": "Personalized DM/email that gets responses. Include compliment, value proposition, and soft ask. Keep under 100 words.",
  "followUpMessages": ["3 different follow-up messages for non-responders"],
  "pitchDeck": {
    "brandOverview": "2-sentence brand description highlighting unique value",
    "benefits": ["5 specific benefits for the influencer"],
    "contentIdeas": ["5 creative content collaboration ideas"],
    "compensation": "Compensation structure based on tier and budget",
    "nextSteps": "Clear next steps and timeline"
  },
  "influencerTier": "${influencerType}",
  "niche": "${niche}"
}

Make it personal, professional, and mutually beneficial. Focus on value for the influencer, not just the brand.
`;

  return await callGeminiAPI(prompt);
};