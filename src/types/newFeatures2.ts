// Types for the final 12 new features

export interface AdVersionExplainer {
  adA: string;
  adB: string;
  analysis: {
    storytellingStyle: {
      adA: string;
      adB: string;
      winner: string;
      reasoning: string;
    };
    pacing: {
      adA: string;
      adB: string;
      winner: string;
      reasoning: string;
    };
    psychology: {
      adA: string;
      adB: string;
      winner: string;
      reasoning: string;
    };
    ctaFlow: {
      adA: string;
      adB: string;
      winner: string;
      reasoning: string;
    };
  };
  overallWinner: string;
  keyLearnings: string[];
}

export interface ModularAdAssembler {
  components: {
    hook: string;
    pain: string;
    solution: string;
    cta: string;
  };
  assembledAds: {
    version: string;
    fullAd: string;
    effectiveness: number;
  }[];
  templates: string[];
  randomizedVersion: string;
}

export interface AdGoalMatcher {
  campaignGoal: string;
  businessType: string;
  optimizations: {
    tone: string;
    cta: string;
    urgency: number;
    platform: string;
    emotionalDrivers: string[];
    contentLength: string;
    visualStyle: string;
  };
  sampleAds: {
    platform: string;
    ad: string;
    reasoning: string;
  }[];
  kpis: string[];
  budgetRecommendations: string;
}

export interface Deviralizer {
  adText: string;
  adKillers: {
    killer: string;
    severity: string;
    location: string;
    impact: string;
    fix: string;
  }[];
  viralityScore: number;
  fixedVersion: string;
  improvementAreas: {
    hook: string;
    value: string;
    cta: string;
    length: string;
  };
  shareabilityFactors: string[];
}

export interface FirstThreeSecondsOptimizer {
  originalScript: string;
  firstThreeSeconds: {
    original: string;
    optimized: string;
    hookPhrasing: string;
    bodyLanguage: string;
    soundEffects: string;
    visualElements: string;
  };
  retentionTechniques: {
    technique: string;
    implementation: string;
    impact: string;
  }[];
  platformOptimizations: {
    tiktok: string;
    instagram: string;
    youtube: string;
  };
}

export interface CTAPersonalizer {
  audience: string;
  product: string;
  personalizedCTAs: {
    cta: string;
    tone: string;
    urgency: number;
    personalization: string;
    platform: string;
  }[];
  audienceInsights: {
    language: string;
    motivations: string;
    objections: string;
    triggers: string;
  };
  avoidList: string[];
}

export interface PsychTestForCopy {
  inputs: {
    productType: string;
    brandPersonality: string;
    targetAudience: string;
  };
  diagnosis: {
    copyStyle: string;
    psychProfile: string;
    alignment: string;
    gaps: string;
  };
  recommendations: {
    betterStyles: string[];
    emotionalTriggers: string[];
    languagePatterns: string[];
    messagingFramework: string;
  };
  sampleCopy: {
    style: string;
    example: string;
    reasoning: string;
  }[];
}

export interface VisualAdBuilder {
  adCopy: string;
  platform: string;
  visualElements: {
    layout: string;
    colorScheme: string;
    typography: string;
    imagery: string;
  };
  overlayElements: {
    text: string;
    timing: string;
    position: string;
    style: string;
  }[];
  designSpecs: {
    dimensions: string;
    aspectRatio: string;
    fileFormat: string;
    duration: string;
  };
  mockupDescription: string;
  designTips: string[];
}

export interface AdStyleRoulette {
  businessType: string;
  randomStyles: {
    style: string;
    script: string;
    caption: string;
    hook: string;
    uniqueElements: string[];
    platform: string;
  }[];
  styleExplanations: {
    rant: string;
    skit: string;
    story: string;
    qa: string;
    interview: string;
    duet: string;
    stitch: string;
    vlog: string;
    pov: string;
  };
}

export interface AdMagnetBreakdown {
  originalAd: string;
  breakdown: {
    hookStyle: string;
    emotionalDriver: string;
    pacing: string;
    contentFormula: string;
    viralElements: string[];
    psychologyUsed: string[];
  };
  successFactors: {
    factor: string;
    explanation: string;
    replicability: string;
  }[];
  yourTurnVersion: {
    template: string;
    instructions: string;
    examples: string[];
  };
  keyTakeaways: string[];
}

export interface ViralPerformancePredictor {
  adCopy: string;
  platform: string;
  predictions: {
    scrollRate: string;
    saveRate: string;
    shareability: number;
    ctrRange: string;
    engagementRate: string;
    viralPotential: number;
  };
  platformSpecific: {
    tiktok: {
      fyp: number;
      completion: string;
      shares: string;
    };
    facebook: {
      reach: string;
      reactions: string;
      comments: string;
    };
    instagram: {
      explore: string;
      saves: string;
      stories: string;
    };
  };
  improvementAreas: string[];
  confidenceLevel: string;
}

export interface HookMemoryTest {
  hooks: {
    text: string;
    memoryScore: number;
    recallFactors: string[];
    forgettableElements: string[];
    improvements: string[];
  }[];
  rankings: {
    mostMemorable: string;
    leastMemorable: string;
    reasoning: string;
  };
  memoryPrinciples: {
    principle: string;
    explanation: string;
    application: string;
  }[];
  communityScores: string;
  optimizedVersions: string[];
}