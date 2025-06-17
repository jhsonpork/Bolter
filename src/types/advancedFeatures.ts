// Types for the 12 new advanced features

export interface PainPointExtraction {
  product: string;
  painPoints: {
    painPoint: string;
    emotionalLanguage: string;
    suggestedAngles: string[];
    adCopy: string;
  }[];
}

export interface OfferOptimization {
  currentOffer: string;
  evaluation: {
    urgencyLevel: number;
    valueClarity: number;
    incentiveStrength: number;
    overallScore: number;
  };
  improvements: string[];
  optimizedOffers: string[];
  reasoning: string;
}

export interface ScriptToSkit {
  originalScript: string;
  characters: string[];
  dialogue: {
    character: string;
    line: string;
    timing: string;
    action: string;
  }[];
  pacingSuggestions: string[];
  ctaTiming: string;
  cameraAngles: string[];
}

export interface StoryboardBuilder {
  product: string;
  hook: string;
  shots: {
    shotNumber: number;
    timing: string;
    scene: string;
    cameraAngle: string;
    captionOverlay: string;
    action: string;
  }[];
  ctaPlacement: string;
  transitionTips: string[];
  engagementHooks: string[];
}

export interface EmotionalTriggerMap {
  adText: string;
  currentEmotions: string[];
  missingEmotions: string[];
  emotionStrength: {
    fear: number;
    desire: number;
    fomo: number;
    status: number;
    anger: number;
  };
  emotionalRewrites: {
    emotion: string;
    rewrite: string;
    reasoning: string;
  }[];
}

export interface ControversialTakes {
  topic: string;
  controversialTakes: {
    take: string;
    tone: string;
    supportingCopy: string;
    disclaimer: string;
    viralPotential: number;
    platform: string;
  }[];
}

export interface FlipScriptResult {
  originalAd: string;
  flippedVersions: {
    flipType: string;
    flippedAd: string;
    explanation: string;
    effectiveness: number;
  }[];
}

export interface PersonaCTAResult {
  personaType: string;
  ctas: {
    cta: string;
    reasoning: string;
    platform: string;
    urgencyLevel: number;
  }[];
  personaInsights: {
    painPoints: string[];
    motivations: string[];
    language: string[];
  };
}

export interface BeforeAfterAd {
  productOrNiche: string;
  beforeAfterAds: {
    before: string;
    after: string;
    fullAd: string;
    platform: string;
    emotionalImpact: number;
  }[];
}

export interface MetaphorMagic {
  product: string;
  metaphors: {
    metaphor: string;
    explanation: string;
    adExample: string;
    effectiveness: number;
    bestUse: string;
  }[];
}

export interface CommentBaitResult {
  postIdea: string;
  commentBaits: {
    bait: string;
    type: string;
    expectedEngagement: string;
    platform: string;
    reasoning: string;
  }[];
  engagementTips: string[];
}

export interface AdBuildingBlocks {
  components: {
    hookStyle: string;
    tone: string;
    ctaFormat: string;
    problemType: string;
  };
  assembledAd: string;
  breakdown: {
    hook: string;
    body: string;
    cta: string;
  };
  alternatives: string[];
  optimizationTips: string[];
}