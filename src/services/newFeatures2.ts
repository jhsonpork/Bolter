import { 
  AdVersionExplainer,
  ModularAdAssembler,
  AdGoalMatcher,
  Deviralizer,
  FirstThreeSecondsOptimizer,
  CTAPersonalizer,
  PsychTestForCopy,
  VisualAdBuilder,
  AdStyleRoulette,
  AdMagnetBreakdown,
  ViralPerformancePredictor,
  HookMemoryTest
} from '../types/newFeatures2';
import { callGeminiAPI } from './gemini';

// 1. Ad Version Explainer
export const explainAdVersions = async (adA: string, adB: string): Promise<AdVersionExplainer> => {
  const prompt = `
You are an ad performance expert. Explain why version A might outperform version B.

Ad Version A: "${adA}"
Ad Version B: "${adB}"

Generate explanation in JSON format:
{
  "adA": "${adA}",
  "adB": "${adB}",
  "analysis": {
    "storytellingStyle": {
      "adA": "storytelling approach in A",
      "adB": "storytelling approach in B",
      "winner": "A or B",
      "reasoning": "why this approach works better"
    },
    "pacing": {
      "adA": "pacing analysis for A",
      "adB": "pacing analysis for B", 
      "winner": "A or B",
      "reasoning": "why this pacing is more effective"
    },
    "psychology": {
      "adA": "psychological triggers in A",
      "adB": "psychological triggers in B",
      "winner": "A or B", 
      "reasoning": "why these triggers are stronger"
    },
    "ctaFlow": {
      "adA": "CTA flow in A",
      "adB": "CTA flow in B",
      "winner": "A or B",
      "reasoning": "why this CTA flow converts better"
    }
  },
  "overallWinner": "A or B",
  "keyLearnings": ["3-5 key insights about ad science"]
}

Focus on educational insights that help users understand ad performance principles.
`;

  return await callGeminiAPI(prompt);
};

// 2. Modular Ad Assembler 2.0
export const assembleModularAd = async (
  hook: string,
  pain: string,
  solution: string,
  cta: string
): Promise<ModularAdAssembler> => {
  const prompt = `
You are a modular ad assembly expert. Combine these components into cohesive ads.

Hook: "${hook}"
Pain: "${pain}"
Solution: "${solution}"
CTA: "${cta}"

Generate modular assembly in JSON format:
{
  "components": {
    "hook": "${hook}",
    "pain": "${pain}",
    "solution": "${solution}",
    "cta": "${cta}"
  },
  "assembledAds": [
    {
      "version": "Standard Flow",
      "fullAd": "complete ad using hook→pain→solution→cta",
      "effectiveness": score out of 10
    },
    {
      "version": "Problem-First",
      "fullAd": "complete ad using pain→hook→solution→cta",
      "effectiveness": score out of 10
    },
    {
      "version": "Solution-Led",
      "fullAd": "complete ad using solution→pain→hook→cta",
      "effectiveness": score out of 10
    }
  ],
  "templates": ["3 reusable templates based on these components"],
  "randomizedVersion": "completely randomized component order ad"
}

Create multiple arrangements showing how component order affects performance.
`;

  return await callGeminiAPI(prompt);
};

// 3. Ad Goal Matcher
export const matchAdGoal = async (campaignGoal: string, businessType: string): Promise<AdGoalMatcher> => {
  const prompt = `
You are a campaign optimization expert. Optimize ad elements for this specific goal.

Campaign Goal: "${campaignGoal}"
Business Type: "${businessType}"

Generate goal-matched optimization in JSON format:
{
  "campaignGoal": "${campaignGoal}",
  "businessType": "${businessType}",
  "optimizations": {
    "tone": "optimal tone for this goal",
    "cta": "best CTA style for this goal",
    "urgency": "urgency level (1-10) for this goal",
    "platform": "best platform for this goal",
    "emotionalDrivers": ["key emotions to target"],
    "contentLength": "optimal content length",
    "visualStyle": "recommended visual approach"
  },
  "sampleAds": [
    {
      "platform": "platform name",
      "ad": "complete ad optimized for the goal",
      "reasoning": "why this works for the goal"
    }
  ],
  "kpis": ["key metrics to track for this goal"],
  "budgetRecommendations": "budget allocation suggestions"
}

Tailor everything specifically to achieve the stated campaign goal.
`;

  return await callGeminiAPI(prompt);
};

// 4. Deviralizer (Ad Kill Check)
export const deviralizeAd = async (adText: string): Promise<Deviralizer> => {
  const prompt = `
You are an ad killer detector. Flag everything that prevents this ad from going viral.

Ad Text: "${adText}"

Generate deviralization analysis in JSON format:
{
  "adText": "${adText}",
  "adKillers": [
    {
      "killer": "specific ad killer identified",
      "severity": "High/Medium/Low",
      "location": "where in the ad this appears",
      "impact": "how this hurts performance",
      "fix": "specific fix for this killer"
    }
  ],
  "viralityScore": "current virality potential (1-10)",
  "fixedVersion": "ad with all killers removed",
  "improvementAreas": {
    "hook": "hook improvement needed",
    "value": "value proposition clarity issues", 
    "cta": "CTA problems",
    "length": "length optimization needed"
  },
  "shareabilityFactors": ["what makes content shareable that this ad lacks"]
}

Be brutally honest about what kills viral potential and provide specific fixes.
`;

  return await callGeminiAPI(prompt);
};

// 5. First 3 Seconds Optimizer
export const optimizeFirstThreeSeconds = async (videoScript: string): Promise<FirstThreeSecondsOptimizer> => {
  const prompt = `
You are a video retention expert. Optimize just the first 3 seconds for maximum retention.

Video Script: "${videoScript}"

Generate first 3 seconds optimization in JSON format:
{
  "originalScript": "${videoScript}",
  "firstThreeSeconds": {
    "original": "original first 3 seconds",
    "optimized": "optimized first 3 seconds",
    "hookPhrasing": "improved hook phrasing",
    "bodyLanguage": "recommended body language",
    "soundEffects": "sound effect timing suggestions",
    "visualElements": "visual elements to add"
  },
  "retentionTechniques": [
    {
      "technique": "retention technique name",
      "implementation": "how to implement in first 3 seconds",
      "impact": "expected retention improvement"
    }
  ],
  "platformOptimizations": {
    "tiktok": "TikTok-specific first 3 seconds",
    "instagram": "Instagram Reels-specific version",
    "youtube": "YouTube Shorts-specific version"
  }
}

Focus specifically on the critical first 3 seconds that determine if viewers stay or scroll.
`;

  return await callGeminiAPI(prompt);
};

// 6. CTA Personalizer
export const personalizeCTA = async (audience: string, product: string): Promise<CTAPersonalizer> => {
  const prompt = `
You are a CTA personalization expert. Create CTAs perfectly matched to this audience.

Audience: "${audience}"
Product: "${product}"

Generate personalized CTAs in JSON format:
{
  "audience": "${audience}",
  "product": "${product}",
  "personalizedCTAs": [
    {
      "cta": "CTA text in perfect tone for this audience",
      "tone": "tone used (urgent/casual/professional/etc)",
      "urgency": "urgency level (1-10)",
      "personalization": "how this speaks to their identity",
      "platform": "best platform for this CTA"
    }
  ],
  "audienceInsights": {
    "language": "how this audience communicates",
    "motivations": "what drives their decisions",
    "objections": "common objections they have",
    "triggers": "what makes them take action"
  },
  "avoidList": ["CTA styles that would turn off this audience"]
}

Create 5 CTAs that feel like they were written specifically for this audience's identity.
`;

  return await callGeminiAPI(prompt);
};

// 7. Psych Test for Copy
export const psychTestCopy = async (
  productType: string,
  brandPersonality: string,
  targetAudience: string
): Promise<PsychTestForCopy> => {
  const prompt = `
You are a copy psychology expert. Diagnose the copy style and suggest improvements.

Product Type: "${productType}"
Brand Personality: "${brandPersonality}"
Target Audience: "${targetAudience}"

Generate psychological copy analysis in JSON format:
{
  "inputs": {
    "productType": "${productType}",
    "brandPersonality": "${brandPersonality}",
    "targetAudience": "${targetAudience}"
  },
  "diagnosis": {
    "copyStyle": "diagnosed copy style (status-driven/fear-based/community-led/etc)",
    "psychProfile": "psychological profile of the brand",
    "alignment": "how well current approach matches audience",
    "gaps": "psychological gaps in current approach"
  },
  "recommendations": {
    "betterStyles": ["copy styles that would work better"],
    "emotionalTriggers": ["emotions to emphasize more"],
    "languagePatterns": ["language patterns to adopt"],
    "messagingFramework": "recommended messaging framework"
  },
  "sampleCopy": [
    {
      "style": "recommended style name",
      "example": "sample copy in this style",
      "reasoning": "why this style works for this combination"
    }
  ]
}

Provide a psychological diagnosis and actionable recommendations for better copy alignment.
`;

  return await callGeminiAPI(prompt);
};

// 8. Visual Ad Builder
export const buildVisualAd = async (adCopy: string, platform: string): Promise<VisualAdBuilder> => {
  const prompt = `
You are a visual ad designer. Create visual mockup instructions for this ad.

Ad Copy: "${adCopy}"
Platform: "${platform}"

Generate visual ad builder instructions in JSON format:
{
  "adCopy": "${adCopy}",
  "platform": "${platform}",
  "visualElements": {
    "layout": "recommended layout structure",
    "colorScheme": "color scheme suggestions",
    "typography": "font and text styling recommendations",
    "imagery": "image/video style recommendations"
  },
  "overlayElements": [
    {
      "text": "overlay text",
      "timing": "when to show (for video)",
      "position": "where to place on screen",
      "style": "styling recommendations"
    }
  ],
  "designSpecs": {
    "dimensions": "optimal dimensions for platform",
    "aspectRatio": "recommended aspect ratio",
    "fileFormat": "best file format",
    "duration": "optimal duration (for video)"
  },
  "mockupDescription": "detailed description of how the final ad should look",
  "designTips": ["specific design tips for this platform and copy"]
}

Provide detailed visual design instructions that non-designers can follow.
`;

  return await callGeminiAPI(prompt);
};

// 9. Ad Style Roulette
export const spinAdStyleRoulette = async (businessType: string): Promise<AdStyleRoulette> => {
  const prompt = `
You are a creative ad style generator. Create random ad styles with complete content.

Business Type: "${businessType}"

Generate random ad styles in JSON format:
{
  "businessType": "${businessType}",
  "randomStyles": [
    {
      "style": "ad style name (Rant/Skit/Story/Q&A/etc)",
      "script": "complete script for this style",
      "caption": "social media caption",
      "hook": "opening hook",
      "uniqueElements": ["what makes this style unique"],
      "platform": "best platform for this style"
    }
  ],
  "styleExplanations": {
    "rant": "how to execute rant-style ads",
    "skit": "how to create skit-style content",
    "story": "storytelling ad approach",
    "qa": "Q&A format execution",
    "interview": "fake interview style",
    "duet": "duet/response style",
    "stitch": "stitch/reaction style",
    "vlog": "vlog-style ad approach",
    "pov": "POV ad execution"
  }
}

Generate 10 completely different ad styles with full content for each.
`;

  return await callGeminiAPI(prompt);
};

// 10. Ad Magnet Breakdown
export const breakdownAdMagnet = async (popularAd: string): Promise<AdMagnetBreakdown> => {
  const prompt = `
You are a viral ad analyst. Reverse-engineer this popular ad's success formula.

Popular Ad: "${popularAd}"

Generate ad magnet breakdown in JSON format:
{
  "originalAd": "${popularAd}",
  "breakdown": {
    "hookStyle": "type of hook used and why it works",
    "emotionalDriver": "primary emotion that drives engagement",
    "pacing": "how the ad is paced and structured",
    "contentFormula": "underlying content formula used",
    "viralElements": ["specific elements that make it shareable"],
    "psychologyUsed": ["psychological principles employed"]
  },
  "successFactors": [
    {
      "factor": "success factor name",
      "explanation": "how this contributes to performance",
      "replicability": "how to replicate this in other ads"
    }
  ],
  "yourTurnVersion": {
    "template": "template version you can customize",
    "instructions": "how to adapt this for your niche",
    "examples": ["2-3 examples adapted for different niches"]
  },
  "keyTakeaways": ["actionable insights for creating similar viral content"]
}

Provide deep analysis that helps users understand and replicate viral ad success.
`;

  return await callGeminiAPI(prompt);
};

// 11. Viral Performance Predictor
export const predictViralPerformance = async (adCopy: string, platform: string): Promise<ViralPerformancePredictor> => {
  const prompt = `
You are a viral performance prediction expert. Predict this ad's performance metrics.

Ad Copy: "${adCopy}"
Platform: "${platform}"

Generate performance prediction in JSON format:
{
  "adCopy": "${adCopy}",
  "platform": "${platform}",
  "predictions": {
    "scrollRate": "predicted scroll-through rate percentage",
    "saveRate": "predicted save rate percentage", 
    "shareability": "shareability score (1-10)",
    "ctrRange": "predicted CTR range",
    "engagementRate": "predicted engagement rate",
    "viralPotential": "viral potential score (1-10)"
  },
  "platformSpecific": {
    "tiktok": {
      "fyp": "For You Page potential (1-10)",
      "completion": "predicted completion rate",
      "shares": "predicted share rate"
    },
    "facebook": {
      "reach": "organic reach potential",
      "reactions": "predicted reaction rate",
      "comments": "predicted comment rate"
    },
    "instagram": {
      "explore": "Explore page potential",
      "saves": "predicted save rate",
      "stories": "story share potential"
    }
  },
  "improvementAreas": ["specific areas to improve for better performance"],
  "confidenceLevel": "prediction confidence percentage"
}

Provide realistic performance predictions with platform-specific insights.
`;

  return await callGeminiAPI(prompt);
};

// 12. Hook Memory Test - FIXED VERSION
export const testHookMemory = async (hooks: string[]): Promise<HookMemoryTest> => {
  const prompt = `
You are a memory and recall expert. Test these hooks for memorability and recall.

Hooks to Test: ${hooks.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Generate hook memory test in JSON format:
{
  "hooks": [
    {
      "text": "hook text exactly as provided",
      "memoryScore": score out of 10,
      "recallFactors": ["what makes this memorable"],
      "forgettableElements": ["what makes this forgettable"],
      "improvements": ["how to make it more memorable"]
    }
  ],
  "rankings": {
    "mostMemorable": "most memorable hook text",
    "leastMemorable": "least memorable hook text",
    "reasoning": "why the ranking is this way"
  },
  "memoryPrinciples": [
    {
      "principle": "memory principle name",
      "explanation": "how this affects recall",
      "application": "how to apply this to hooks"
    }
  ],
  "communityScores": "simulated community leaderboard description",
  "optimizedVersions": ["improved versions of the hooks for better recall"]
}

CRITICAL: Return hooks as an ARRAY of objects, not as an object with hook text as keys. Each hook object must have text, memoryScore, recallFactors (array), forgettableElements (array), and improvements (array).

Focus on psychological principles of memory and recall for marketing hooks.
`;

  return await callGeminiAPI(prompt);
};