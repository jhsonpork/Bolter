export interface AdComparison {
  ad1: string;
  ad2: string;
  comparison: {
    engagementPotential: {
      ad1Score: number;
      ad2Score: number;
      winner: 'ad1' | 'ad2';
      reasoning: string;
    };
    valueProposition: {
      ad1Score: number;
      ad2Score: number;
      winner: 'ad1' | 'ad2';
      reasoning: string;
    };
    viralAppeal: {
      ad1Score: number;
      ad2Score: number;
      winner: 'ad1' | 'ad2';
      reasoning: string;
    };
    ctaStrength: {
      ad1Score: number;
      ad2Score: number;
      winner: 'ad1' | 'ad2';
      reasoning: string;
    };
    overallWinner: 'ad1' | 'ad2';
    recommendations: string[];
  };
}

export interface CustomerPersona {
  name: string;
  age: string;
  occupation: string;
  painPoints: string[];
  buyingTriggers: string[];
  objections: string[];
  preferredChannels: string[];
  messagingStyle: string;
}

export interface ContentAngle {
  title: string;
  description: string;
  tiktokHook: string;
  tweetFormat: string;
  adHeadline: string;
  emotionalTrigger: string;
}

export interface TrendRewrite {
  originalTrend: string;
  tweetVersion: string;
  scriptVersion: string;
  adVersion: string;
  niche: string;
}

export interface AdVariation {
  original: string;
  variations: {
    hookStyle: string;
    tone: string;
    cta: string;
    fullAd: string;
  }[];
}

export interface TonePolish {
  originalText: string;
  polishedVersions: {
    genZ: string;
    luxury: string;
    edgy: string;
    minimalist: string;
    corporate: string;
  };
}

export interface CampaignPack {
  tweets: string[];
  tiktokHooks: string[];
  adCaptions: string[];
  niche: string;
  generatedAt: string;
}

export interface HookAnalysis {
  hookText: string;
  analysis: {
    hookEffectiveness: {
      score: number;
      reasoning: string;
      improvements: string[];
    };
    retentionWeaknesses: string[];
    ctaStrength: {
      score: number;
      improvements: string[];
    };
    overallScore: number;
    recommendations: string[];
  };
}