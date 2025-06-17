export interface InfluencerPitchResult {
  outreachMessage: string;
  followUpMessages: string[];
  pitchDeck: {
    brandOverview: string;
    benefits: string[];
    contentIdeas: string[];
    compensation: string;
    nextSteps: string;
  };
  influencerTier: string;
  niche: string;
}