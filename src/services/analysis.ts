import { 
  AdComparison, 
  CustomerPersona, 
  ContentAngle, 
  TrendRewrite, 
  AdVariation, 
  TonePolish, 
  CampaignPack, 
  HookAnalysis 
} from '../types/analysis';
import { callGeminiAPI } from './gemini';

export const compareAds = async (ad1: string, ad2: string): Promise<AdComparison> => {
  const prompt = `
You are a world-class ad performance analyst. Compare these two ads across key metrics.

Ad 1: "${ad1}"
Ad 2: "${ad2}"

Generate a detailed comparison in JSON format:
{
  "ad1": "${ad1}",
  "ad2": "${ad2}",
  "comparison": {
    "engagementPotential": {
      "ad1Score": score out of 10,
      "ad2Score": score out of 10,
      "winner": "ad1" or "ad2",
      "reasoning": "detailed explanation"
    },
    "valueProposition": {
      "ad1Score": score out of 10,
      "ad2Score": score out of 10,
      "winner": "ad1" or "ad2",
      "reasoning": "detailed explanation"
    },
    "viralAppeal": {
      "ad1Score": score out of 10,
      "ad2Score": score out of 10,
      "winner": "ad1" or "ad2",
      "reasoning": "detailed explanation"
    },
    "ctaStrength": {
      "ad1Score": score out of 10,
      "ad2Score": score out of 10,
      "winner": "ad1" or "ad2",
      "reasoning": "detailed explanation"
    },
    "overallWinner": "ad1" or "ad2",
    "recommendations": ["3-5 specific improvement suggestions"]
  }
}

Be objective, detailed, and provide actionable insights.
`;

  return await callGeminiAPI(prompt);
};

export const generatePersonas = async (productOrNiche: string): Promise<CustomerPersona[]> => {
  const prompt = `
You are a customer research expert. Create 3 detailed customer personas for this product/niche.

Product/Niche: "${productOrNiche}"

Generate 3 personas in JSON array format:
[
  {
    "name": "Persona name (e.g., 'Busy Professional Sarah')",
    "age": "age range",
    "occupation": "job title/role",
    "painPoints": ["3-4 specific pain points"],
    "buyingTriggers": ["3-4 triggers that make them buy"],
    "objections": ["3-4 common objections they have"],
    "preferredChannels": ["where they consume content"],
    "messagingStyle": "how to communicate with them"
  }
]

Make them realistic, detailed, and actionable for marketing purposes.
`;

  return await callGeminiAPI(prompt);
};

export const generateContentAngles = async (nicheOrProduct: string): Promise<ContentAngle[]> => {
  const prompt = `
You are a viral content strategist. Generate 15 unique content angles for this niche/product.

Niche/Product: "${nicheOrProduct}"

Generate 15 different angles in JSON array format:
[
  {
    "title": "Angle name (e.g., 'Emotional Transformation')",
    "description": "Brief description of the angle",
    "tiktokHook": "TikTok opening line using this angle",
    "tweetFormat": "Twitter post using this angle",
    "adHeadline": "Facebook ad headline using this angle",
    "emotionalTrigger": "Primary emotion this angle targets"
  }
]

Include diverse angles: emotional, controversial, lifestyle, contrarian, UGC-style, educational, behind-scenes, social proof, urgency, curiosity, transformation, comparison, storytelling, problem-solution, and aspirational.
`;

  return await callGeminiAPI(prompt);
};

export const rewriteTrend = async (trendTopic: string, userNiche: string): Promise<TrendRewrite> => {
  const prompt = `
You are a trendjacking expert. Take this trending topic and adapt it for this niche.

Trending Topic: "${trendTopic}"
User's Niche: "${userNiche}"

Generate adaptations in JSON format:
{
  "originalTrend": "${trendTopic}",
  "tweetVersion": "Twitter post that connects the trend to the niche (max 280 chars)",
  "scriptVersion": "30-second TikTok/Reel script connecting trend to niche",
  "adVersion": "Facebook ad that leverages the trend for the niche",
  "niche": "${userNiche}"
}

Make it natural, relevant, and engaging while staying true to both the trend and the niche.
`;

  return await callGeminiAPI(prompt);
};

export const generateAdVariations = async (originalAd: string): Promise<AdVariation> => {
  const prompt = `
You are a conversion optimization expert. Create 5 variations of this ad with different approaches.

Original Ad: "${originalAd}"

Generate variations in JSON format:
{
  "original": "${originalAd}",
  "variations": [
    {
      "hookStyle": "Hook approach (e.g., 'Question Hook', 'Shock Hook')",
      "tone": "Tone used (e.g., 'Urgent', 'Friendly', 'Edgy')",
      "cta": "Call-to-action style",
      "fullAd": "Complete rewritten ad"
    }
  ]
}

Create 5 distinct variations with different hook styles, tones, and CTAs. Make each unique and compelling.
`;

  return await callGeminiAPI(prompt);
};

export const polishTone = async (rawText: string): Promise<TonePolish> => {
  const prompt = `
You are a copywriting expert. Polish this text for 5 different tones/audiences.

Raw Text: "${rawText}"

Generate polished versions in JSON format:
{
  "originalText": "${rawText}",
  "polishedVersions": {
    "genZ": "Version that sounds Gen Z (casual, trendy, with slang)",
    "luxury": "Version that sounds luxury/premium (sophisticated, exclusive)",
    "edgy": "Version that sounds edgy/bold (provocative, attention-grabbing)",
    "minimalist": "Version that sounds minimalist (clean, simple, direct)",
    "corporate": "Version that sounds corporate (professional, formal, business-focused)"
  }
}

Keep the core message but adapt the language, style, and approach for each audience.
`;

  return await callGeminiAPI(prompt);
};

export const generateCampaignPack = async (niche: string): Promise<CampaignPack> => {
  const prompt = `
You are a content marketing expert. Create a complete campaign pack for this niche.

Niche: "${niche}"

Generate a campaign pack in JSON format:
{
  "tweets": ["10 different tweet drafts for ${niche}"],
  "tiktokHooks": ["10 different TikTok opening hooks for ${niche}"],
  "adCaptions": ["10 different ad captions for ${niche}"],
  "niche": "${niche}",
  "generatedAt": "${new Date().toISOString()}"
}

Make each piece unique, engaging, and optimized for its platform. Include variety in angles and approaches.
`;

  return await callGeminiAPI(prompt);
};

export const analyzeHook = async (hookText: string): Promise<HookAnalysis> => {
  const prompt = `
You are a viral content analyst. Analyze this hook/ad for effectiveness.

Hook/Ad Text: "${hookText}"

Generate analysis in JSON format:
{
  "hookText": "${hookText}",
  "analysis": {
    "hookEffectiveness": {
      "score": score out of 10,
      "reasoning": "detailed explanation of why it works or doesn't",
      "improvements": ["3-4 specific ways to improve the hook"]
    },
    "retentionWeaknesses": ["3-4 elements that might cause people to scroll away"],
    "ctaStrength": {
      "score": score out of 10,
      "improvements": ["2-3 ways to strengthen the call-to-action"]
    },
    "overallScore": overall score out of 10,
    "recommendations": ["3-5 actionable recommendations to improve performance"]
  }
}

Be detailed, specific, and provide actionable insights for improvement.
`;

  return await callGeminiAPI(prompt);
};