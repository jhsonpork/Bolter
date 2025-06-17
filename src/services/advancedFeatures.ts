import { 
  PainPointExtraction,
  OfferOptimization,
  ScriptToSkit,
  StoryboardBuilder,
  EmotionalTriggerMap,
  ControversialTakes,
  FlipScriptResult,
  PersonaCTAResult,
  BeforeAfterAd,
  MetaphorMagic,
  CommentBaitResult,
  AdBuildingBlocks
} from '../types/advancedFeatures';
import { callGeminiAPI } from './gemini';

// 1. Pain Point Extractor
export const extractPainPoints = async (product: string): Promise<PainPointExtraction> => {
  const prompt = `
You are a customer psychology expert. Extract pain points for this product.

Product: "${product}"

Generate pain point analysis in JSON format:
{
  "product": "${product}",
  "painPoints": [
    {
      "painPoint": "specific pain point",
      "emotionalLanguage": "emotional description of this pain",
      "suggestedAngles": ["3 ad angles for this pain"],
      "adCopy": "sample ad copy targeting this pain"
    }
  ]
}

Identify 5 core pain points with emotional language and marketing angles.
`;

  return await callGeminiAPI(prompt);
};

// 2. Offer Optimizer
export const optimizeOffer = async (currentOffer: string): Promise<OfferOptimization> => {
  const prompt = `
You are an offer optimization expert. Analyze and improve this offer.

Current Offer: "${currentOffer}"

Generate optimization in JSON format:
{
  "currentOffer": "${currentOffer}",
  "evaluation": {
    "urgencyLevel": score out of 10,
    "valueClarity": score out of 10,
    "incentiveStrength": score out of 10,
    "overallScore": average score
  },
  "improvements": ["specific tweaks to make it irresistible"],
  "optimizedOffers": ["3 high-converting offer headlines"],
  "reasoning": "why these improvements work"
}

Focus on urgency, clarity, and incentive strength.
`;

  return await callGeminiAPI(prompt);
};

// 3. Script to Skit Converter
export const convertToSkit = async (basicScript: string): Promise<ScriptToSkit> => {
  const prompt = `
You are a UGC content expert. Convert this script into a 3-character skit.

Basic Script: "${basicScript}"

Generate skit in JSON format:
{
  "originalScript": "${basicScript}",
  "characters": ["Character 1 description", "Character 2 description", "Character 3 description"],
  "dialogue": [
    {
      "character": "Character name",
      "line": "dialogue line",
      "timing": "seconds (e.g., 0-3s)",
      "action": "what they're doing"
    }
  ],
  "pacingSuggestions": ["timing and pacing tips"],
  "ctaTiming": "when to show CTA",
  "cameraAngles": ["suggested camera angles for each scene"]
}

Make it engaging, natural, and UGC-style.
`;

  return await callGeminiAPI(prompt);
};

// 4. 30-Second Storyboard Builder
export const buildStoryboard = async (product: string, hook: string): Promise<StoryboardBuilder> => {
  const prompt = `
You are a video storyboard expert. Create a 30-second TikTok storyboard.

Product: "${product}"
Hook: "${hook}"

Generate storyboard in JSON format:
{
  "product": "${product}",
  "hook": "${hook}",
  "shots": [
    {
      "shotNumber": 1,
      "timing": "0-7s",
      "scene": "Hook scene description",
      "cameraAngle": "camera angle suggestion",
      "captionOverlay": "text overlay suggestion",
      "action": "what happens in this shot"
    }
  ],
  "ctaPlacement": "when and how to show CTA",
  "transitionTips": ["how to transition between shots"],
  "engagementHooks": ["elements to boost engagement"]
}

Create 4 shots: Hook → Problem → Solution → CTA
`;

  return await callGeminiAPI(prompt);
};

// 5. Emotional Trigger Mapper
export const mapEmotionalTriggers = async (adText: string): Promise<EmotionalTriggerMap> => {
  const prompt = `
You are an emotional psychology expert. Map emotions in this ad.

Ad Text: "${adText}"

Generate emotional analysis in JSON format:
{
  "adText": "${adText}",
  "currentEmotions": ["emotions currently used"],
  "missingEmotions": ["powerful emotions not used"],
  "emotionStrength": {
    "fear": score out of 10,
    "desire": score out of 10,
    "fomo": score out of 10,
    "status": score out of 10,
    "anger": score out of 10
  },
  "emotionalRewrites": [
    {
      "emotion": "target emotion",
      "rewrite": "ad rewritten to emphasize this emotion",
      "reasoning": "why this emotion works"
    }
  ]
}

Provide 3 emotion-based rewrites that are stronger.
`;

  return await callGeminiAPI(prompt);
};

// 6. Controversial Take Generator
export const generateControversialTakes = async (topic: string): Promise<ControversialTakes> => {
  const prompt = `
You are a viral content strategist. Generate controversial takes for this topic.

Topic: "${topic}"

Generate controversial content in JSON format:
{
  "topic": "${topic}",
  "controversialTakes": [
    {
      "take": "controversial statement",
      "tone": "Bold/Playful/Satirical",
      "supportingCopy": "copy to support the take",
      "disclaimer": "optional disclaimer",
      "viralPotential": score out of 10,
      "platform": "best platform for this take"
    }
  ]
}

Create 5 spicy takes that fuel debate and engagement while staying ethical.
`;

  return await callGeminiAPI(prompt);
};

// 7. Flip the Script Ad Reverser
export const flipScript = async (originalAd: string): Promise<FlipScriptResult> => {
  const prompt = `
You are a creative ad strategist. Flip this ad in creative ways.

Original Ad: "${originalAd}"

Generate flipped versions in JSON format:
{
  "originalAd": "${originalAd}",
  "flippedVersions": [
    {
      "flipType": "type of flip (framing/perspective/structure)",
      "flippedAd": "the flipped version",
      "explanation": "how this flip works",
      "effectiveness": score out of 10
    }
  ]
}

Create 3 creative flips: framing, perspective, and structure changes.
`;

  return await callGeminiAPI(prompt);
};

// 8. Persona-Specific CTA Generator
export const generatePersonaCTAs = async (personaType: string): Promise<PersonaCTAResult> => {
  const prompt = `
You are a persona marketing expert. Generate CTAs for this persona.

Persona Type: "${personaType}"

Generate persona CTAs in JSON format:
{
  "personaType": "${personaType}",
  "ctas": [
    {
      "cta": "CTA text that speaks to this persona",
      "reasoning": "why this works for this persona",
      "platform": "best platform for this CTA",
      "urgencyLevel": score out of 10
    }
  ],
  "personaInsights": {
    "painPoints": ["key pain points for this persona"],
    "motivations": ["what drives this persona"],
    "language": ["how this persona talks"]
  }
}

Create 5 CTAs that speak directly to this persona's identity and needs.
`;

  return await callGeminiAPI(prompt);
};

// 9. Before/After Ad Generator
export const generateBeforeAfterAds = async (productOrNiche: string): Promise<BeforeAfterAd> => {
  const prompt = `
You are a transformation marketing expert. Create before/after ads.

Product/Niche: "${productOrNiche}"

Generate before/after ads in JSON format:
{
  "productOrNiche": "${productOrNiche}",
  "beforeAfterAds": [
    {
      "before": "relatable pain state",
      "after": "desirable outcome state",
      "fullAd": "complete ad copy with before/after contrast",
      "platform": "optimized for which platform",
      "emotionalImpact": score out of 10
    }
  ]
}

Create 3 before/after ads optimized for TikTok, X, and Facebook.
`;

  return await callGeminiAPI(prompt);
};

// 10. Metaphor Magic Tool
export const generateMetaphors = async (product: string): Promise<MetaphorMagic> => {
  const prompt = `
You are a creative copywriter specializing in metaphors. Create metaphors for this product.

Product: "${product}"

Generate metaphors in JSON format:
{
  "product": "${product}",
  "metaphors": [
    {
      "metaphor": "creative metaphor or analogy",
      "explanation": "how the metaphor works",
      "adExample": "sample ad using this metaphor",
      "effectiveness": score out of 10,
      "bestUse": "when to use this metaphor"
    }
  ]
}

Create 5 powerful metaphors that make the product memorable and relatable.
`;

  return await callGeminiAPI(prompt);
};

// 11. Comment Bait Generator
export const generateCommentBait = async (postIdea: string): Promise<CommentBaitResult> => {
  const prompt = `
You are an engagement optimization expert. Create comment bait for this post.

Post Idea: "${postIdea}"

Generate comment bait in JSON format:
{
  "postIdea": "${postIdea}",
  "commentBaits": [
    {
      "bait": "comment bait text",
      "type": "type of bait (tag/question/poll/controversial)",
      "expectedEngagement": "predicted engagement level",
      "platform": "best platform for this bait",
      "reasoning": "why this triggers comments"
    }
  ],
  "engagementTips": ["additional tips to boost discussion"]
}

Create 3 comment baits optimized to trigger discussion and saves.
`;

  return await callGeminiAPI(prompt);
};

// 12. Ad Building Block Assembler
export const assembleAdBlocks = async (
  hookStyle: string,
  tone: string,
  ctaFormat: string,
  problemType: string
): Promise<AdBuildingBlocks> => {
  const prompt = `
You are an ad assembly expert. Build ads using these modular components.

Hook Style: "${hookStyle}"
Tone: "${tone}"
CTA Format: "${ctaFormat}"
Problem Type: "${problemType}"

Generate assembled ad in JSON format:
{
  "components": {
    "hookStyle": "${hookStyle}",
    "tone": "${tone}",
    "ctaFormat": "${ctaFormat}",
    "problemType": "${problemType}"
  },
  "assembledAd": "complete ad using all components",
  "breakdown": {
    "hook": "hook section using specified style",
    "body": "body section with specified tone and problem",
    "cta": "CTA using specified format"
  },
  "alternatives": ["2 alternative versions with same components"],
  "optimizationTips": ["tips to improve this combination"]
}

Assemble a cohesive ad that flows naturally with all specified components.
`;

  return await callGeminiAPI(prompt);
};