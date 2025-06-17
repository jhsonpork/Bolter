// Types for the 10 new million-dollar features

export interface HeadlineSplitTest {
  headlines: {
    text: string;
    rank: number;
    scrollStoppingPower: number;
    emotionalImpact: number;
    productRelevance: number;
    overallScore: number;
    reasoning: string;
  }[];
  improvedHeadline: string;
  winner: string;
}

export interface AudienceResonance {
  adText: string;
  targetAudience: string;
  relatabilityScore: number;
  painPointCoverage: number;
  buyingTriggerMatch: number;
  overallResonance: number;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    missingElements: string[];
  };
  improvements: string[];
}

export interface CTAPowerResult {
  goal: string;
  ctas: {
    text: string;
    style: string;
    strengthScore: number;
    platformRecommendation: string;
    reasoning: string;
  }[];
}

export interface ViralRepurpose {
  originalPost: string;
  tiktokScript: string;
  facebookAd: string;
  emailSubject: string;
  emailBody: string;
  headlines: {
    professional: string;
    edgy: string;
    luxury: string;
    casual: string;
  };
  bestPostingTimes: {
    tiktok: string;
    facebook: string;
    email: string;
  };
}

export interface PsychographicMatch {
  product: string;
  psychographicTraits: {
    beliefs: string[];
    values: string[];
    habits: string[];
    lifestyle: string[];
    motivations: string[];
  };
  emotionalHooks: {
    hook: string;
    emotion: string;
    reasoning: string;
  }[];
  adLanguageExamples: string[];
}

export interface ShockHookResult {
  topic: string;
  shockHooks: {
    hook: string;
    type: string;
    shockLevel: number;
    platform: string;
    reasoning: string;
  }[];
}

export interface ProblemAwarenessLadder {
  product: string;
  coldLeads: {
    ad: string;
    focus: string;
    goal: string;
  }[];
  warmLeads: {
    ad: string;
    focus: string;
    goal: string;
  }[];
  hotLeads: {
    ad: string;
    focus: string;
    goal: string;
  }[];
}

export interface WeaknessExtraction {
  originalAd: string;
  weaknesses: {
    section: string;
    weakness: string;
    impact: string;
    fix: string;
  }[];
  improvedVersion: string;
  improvementSummary: string[];
}

export interface HookStyleMix {
  style1: string;
  style2: string;
  topic: string;
  hybridHooks: {
    hook: string;
    explanation: string;
    platform: string;
  }[];
  tiktokOpeners: string[];
  facebookHeadlines: string[];
}

export interface IfThenHookResult {
  niche: string;
  productGoal: string;
  hooks: {
    hook: string;
    condition: string;
    solution: string;
    urgency: string;
    platform: string;
  }[];
}