import { 
  HeadlineSplitTest, 
  AudienceResonance, 
  CTAPowerResult, 
  ViralRepurpose, 
  PsychographicMatch, 
  ShockHookResult, 
  ProblemAwarenessLadder, 
  WeaknessExtraction, 
  HookStyleMix, 
  IfThenHookResult 
} from '../types/newFeatures';
import { callGeminiAPI } from './gemini';

// 1. Headline Split Tester
export const testHeadlines = async (headlines: string[]): Promise<HeadlineSplitTest> => {
  const prompt = `
You are a headline optimization expert. Rank these ${headlines.length} headlines for performance.

Headlines to test:
${headlines.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Generate analysis in JSON format:
{
  "headlines": [
    {
      "text": "headline text",
      "rank": ranking position (1-${headlines.length}),
      "scrollStoppingPower": score out of 10,
      "emotionalImpact": score out of 10,
      "productRelevance": score out of 10,
      "overallScore": average score,
      "reasoning": "why this headline ranks here"
    }
  ],
  "improvedHeadline": "AI-suggested improved version of the best headline",
  "winner": "the winning headline text"
}

Rank by overall performance potential and provide detailed reasoning.
`;

  return await callGeminiAPI(prompt);
};

// 2. Audience Resonance Analyzer
export const analyzeAudienceResonance = async (
  adText: string, 
  targetAudience: string
): Promise<AudienceResonance> => {
  const prompt = `
You are an audience psychology expert. Analyze how well this ad resonates with the target audience.

Ad Text: "${adText}"
Target Audience: "${targetAudience}"

Generate analysis in JSON format:
{
  "adText": "${adText}",
  "targetAudience": "${targetAudience}",
  "relatabilityScore": score out of 10,
  "painPointCoverage": score out of 10,
  "buyingTriggerMatch": score out of 10,
  "overallResonance": average score,
  "analysis": {
    "strengths": ["what works well for this audience"],
    "weaknesses": ["what doesn't resonate"],
    "missingElements": ["what's missing for this audience"]
  },
  "improvements": ["specific suggestions to better match the persona"]
}

Be specific about audience psychology and buying behavior.
`;

  return await callGeminiAPI(prompt);
};

// 3. CTA Power Generator
export const generatePowerfulCTAs = async (goal: string): Promise<CTAPowerResult> => {
  const prompt = `
You are a conversion optimization expert. Generate 10 killer CTAs for this goal.

Goal: "${goal}"

Generate CTAs in JSON format:
{
  "goal": "${goal}",
  "ctas": [
    {
      "text": "CTA text",
      "style": "emotional/FOMO/aggressive/luxury/etc",
      "strengthScore": score out of 10,
      "platformRecommendation": "best platform for this CTA",
      "reasoning": "why this CTA works"
    }
  ]
}

Create 10 diverse CTAs across different psychological triggers and styles.
`;

  return await callGeminiAPI(prompt);
};

// 4. Viral Post Repurposer
export const repurposeViralPost = async (originalPost: string): Promise<ViralRepurpose> => {
  const prompt = `
You are a content repurposing expert. Transform this winning content for multiple platforms.

Original Post: "${originalPost}"

Generate repurposed content in JSON format:
{
  "originalPost": "${originalPost}",
  "tiktokScript": "30-second TikTok/Reel script version",
  "facebookAd": "Facebook ad copy version",
  "emailSubject": "Email subject line",
  "emailBody": "Email body content",
  "headlines": {
    "professional": "professional tone headline",
    "edgy": "edgy tone headline",
    "luxury": "luxury tone headline",
    "casual": "casual tone headline"
  },
  "bestPostingTimes": {
    "tiktok": "optimal TikTok posting time",
    "facebook": "optimal Facebook posting time",
    "email": "optimal email send time"
  }
}

Maintain the viral elements while adapting for each platform's unique characteristics.
`;

  return await callGeminiAPI(prompt);
};

// 5. Psychographic Ad Matcher
export const matchPsychographics = async (productDescription: string): Promise<PsychographicMatch> => {
  const prompt = `
You are a consumer psychology expert. Match this product with ideal psychographic traits.

Product: "${productDescription}"

Generate psychographic analysis in JSON format:
{
  "product": "${productDescription}",
  "psychographicTraits": {
    "beliefs": ["core beliefs of ideal customers"],
    "values": ["what they value most"],
    "habits": ["daily habits and behaviors"],
    "lifestyle": ["lifestyle characteristics"],
    "motivations": ["what drives their decisions"]
  },
  "emotionalHooks": [
    {
      "hook": "emotional hook text",
      "emotion": "primary emotion targeted",
      "reasoning": "why this works for this psychographic"
    }
  ],
  "adLanguageExamples": [
    "example ad copy that matches these psychographics"
  ]
}

Focus on deep psychological insights and emotional triggers.
`;

  return await callGeminiAPI(prompt);
};

// 6. Shock Hook Creator
export const createShockHooks = async (topicOrProduct: string): Promise<ShockHookResult> => {
  const prompt = `
You are a viral content creator specializing in shock value. Create 5 shock hooks for this topic.

Topic/Product: "${topicOrProduct}"

Generate shock hooks in JSON format:
{
  "topic": "${topicOrProduct}",
  "shockHooks": [
    {
      "hook": "shock hook text",
      "type": "outrageous stat/contrarian take/pattern interrupt",
      "shockLevel": score out of 10,
      "platform": "best platform for this hook",
      "reasoning": "why this creates shock value"
    }
  ]
}

Create hooks that stop scrolling through surprise, controversy, or unexpected angles.
`;

  return await callGeminiAPI(prompt);
};

// 7. Problem-Awareness Ladder
export const createAwarenessLadder = async (product: string): Promise<ProblemAwarenessLadder> => {
  const prompt = `
You are a marketing funnel expert. Create ads for different awareness stages.

Product: "${product}"

Generate awareness ladder in JSON format:
{
  "product": "${product}",
  "coldLeads": [
    {
      "ad": "ad copy for unaware prospects",
      "focus": "what this ad focuses on",
      "goal": "awareness goal"
    }
  ],
  "warmLeads": [
    {
      "ad": "ad copy for problem-aware prospects", 
      "focus": "what this ad focuses on",
      "goal": "consideration goal"
    }
  ],
  "hotLeads": [
    {
      "ad": "ad copy for ready-to-buy prospects",
      "focus": "what this ad focuses on", 
      "goal": "conversion goal"
    }
  ]
}

Create 3 ads for each stage (9 total) that match the prospect's awareness level.
`;

  return await callGeminiAPI(prompt);
};

// 8. Weakness Extractor
export const extractWeaknesses = async (adText: string): Promise<WeaknessExtraction> => {
  const prompt = `
You are an ad optimization expert. Identify weaknesses and provide fixes.

Ad Text: "${adText}"

Generate weakness analysis in JSON format:
{
  "originalAd": "${adText}",
  "weaknesses": [
    {
      "section": "which part is weak (hook/body/cta/etc)",
      "weakness": "what's wrong with it",
      "impact": "how this hurts performance",
      "fix": "specific improvement suggestion"
    }
  ],
  "improvedVersion": "complete rewritten ad with all fixes applied",
  "improvementSummary": ["key improvements made"]
}

Be specific about what's weak, vague, or generic and provide actionable fixes.
`;

  return await callGeminiAPI(prompt);
};

// 9. Hook Style Mixer
export const mixHookStyles = async (
  style1: string, 
  style2: string, 
  topic: string
): Promise<HookStyleMix> => {
  const prompt = `
You are a creative hook writer. Mix these two hook styles for unique content.

Style 1: "${style1}"
Style 2: "${style2}"  
Topic: "${topic}"

Generate mixed hooks in JSON format:
{
  "style1": "${style1}",
  "style2": "${style2}",
  "topic": "${topic}",
  "hybridHooks": [
    {
      "hook": "hybrid hook combining both styles",
      "explanation": "how it combines both styles",
      "platform": "best platform for this hook"
    }
  ],
  "tiktokOpeners": ["TikTok-specific hybrid openers"],
  "facebookHeadlines": ["Facebook ad hybrid headlines"]
}

Create 5 hybrid hooks that uniquely blend both styles for more original content.
`;

  return await callGeminiAPI(prompt);
};

// 10. "If This, Then That" Hook Generator
export const generateIfThenHooks = async (
  niche: string, 
  productGoal: string
): Promise<IfThenHookResult> => {
  const prompt = `
You are a conditional hook specialist. Create "If X, then Y" hooks for this niche.

Niche: "${niche}"
Product Goal: "${productGoal}"

Generate if-then hooks in JSON format:
{
  "niche": "${niche}",
  "productGoal": "${productGoal}",
  "hooks": [
    {
      "hook": "If you [condition], you need [solution]",
      "condition": "the 'if' part",
      "solution": "the 'then' part", 
      "urgency": "why they need it now",
      "platform": "best platform for this hook"
    }
  ]
}

Create 5 compelling if-then hooks that create immediate relevance and urgency.
`;

  return await callGeminiAPI(prompt);
};