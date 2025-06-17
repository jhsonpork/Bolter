// Types for the 12 additional "More" features

export interface OfferAngleMatcher {
  product: string;
  offerAngles: {
    type: string;
    headline: string;
    subheadline: string;
    primaryCTA: string;
    hook: string;
    effectiveness: number;
    bestFor: string;
  }[];
  recommendations: {
    virality: string;
    conversion: string;
    ltv: string;
  };
  currentOfferDiagnosis: string;
}

export interface HookFrameTester {
  hooks: {
    text: string;
    thumbnail: string;
    ctrPotential: number;
    curiosityGap: number;
    scrollStickiness: number;
    predictedScrollTime: number;
    improvements: {
      betterOpeningShot: string;
      rewrittenHook: string;
    };
  }[];
  bestPerformer: string;
  worstPerformer: string;
}

export interface CreatorFunnelBuilder {
  accountHandle: string;
  leadMagnetIdea: string;
  emailSequence: string[];
  monetizationApproach: string;
  landingPage: {
    headline: string;
    socialProof: string;
    cta: string;
    faqs: string[];
  };
  exportFormat: string;
}

export interface CourseSummaryGenerator {
  syllabus: string;
  summary: {
    threeMinuteScript: string;
    scriptHooks: string[];
    leadMagnet: string;
    infoproductSuggestions: string[];
  };
}

export interface CommentExploder {
  viralPost: string;
  extractedComments: string[];
  expandedContent: {
    tiktokHooks: string[];
    tweetThreads: string[];
    videoAngles: string[];
  };
}

export interface ViralCTASequencer {
  sequencePlan: {
    day: number;
    ctaType: string;
    content: string;
    psychology: string;
  }[];
}

export interface PlatformTimingForecaster {
  contentType: string;
  timezone: string;
  niche: string;
  predictions: {
    tiktok: string;
    instagram: string;
    youtubeShorts: string;
    email: string;
  };
  reasoning: string;
}

export interface ContentEthicsSanitizer {
  originalContent: string;
  flags: {
    issue: string;
    severity: string;
    platform: string;
    explanation: string;
  }[];
  sanitizedContent: string;
  complianceScore: number;
}

export interface ValueLadderBuilder {
  currentOffer: string;
  revenueLadder: {
    price: string;
    offer: string;
    emailCopy: string;
    adCopy: string;
    target: string;
  }[];
}

export interface MonetizationGenerator {
  contentTopic: string;
  audienceSize: string;
  currentProduct: string;
  recommendation: {
    path: string;
    hook: string;
    cta: string;
    landingCopy: string;
    reasoning: string;
  };
}

export interface ContentFrameworkBuilder {
  niche: string;
  framework: {
    structure: string[];
    postPlan: {
      day: number;
      topic: string;
      hook: string;
      content: string;
    }[];
    scriptSkeletons: {
      shorts: string;
      carousels: string;
      email: string;
    };
  };
}

export interface CourseCurriculumBuilder {
  topic: string;
  courseDetails: {
    title: string;
    subtitle: string;
    positioning: string;
    audienceLevel: string;
  };
  curriculum: {
    moduleNumber: number;
    moduleTitle: string;
    lessons: {
      lessonNumber: number;
      lessonTitle: string;
      goals: string[];
      activities: string[];
      quizPrompts: string[];
    }[];
    cta: string;
  }[];
  bonusUnits: {
    slidePrompts: string[];
    videoSegments: string[];
    funnelLayout: string;
    ebookDraft: string;
  };
}

// 10 NEW FEATURES

export interface ZeroToStartupEngine {
  problem: string;
  niche: string;
  businessModel: string;
  monetizationStrategy: string;
  mvpScope: {
    features: string[];
    prioritization: string;
  };
  techStack: string[];
  landingPageCopy: {
    headline: string;
    subheadline: string;
    valueProps: string[];
    cta: string;
  };
  coldEmails: string[];
  launchPlan: {
    day: number;
    tasks: string[];
    goals: string;
  }[];
}

export interface ContentCalendarGenerator {
  niche: string;
  goal: string;
  platform: string;
  contentLibrary: {
    perennialTopics: string[];
    weeklyThemes: {
      theme: string;
      postCategories: string[];
    }[];
    monthlyCampaigns: {
      month: string;
      campaign: string;
      content: string[];
    }[];
    anchorContent: string[];
    seasonalIdeas: {
      season: string;
      ideas: string[];
    }[];
  };
}

export interface PromptDebugger {
  failedPrompt: string;
  analysis: {
    toneIssues: string;
    vagueness: string;
    ambiguity: string;
    structuralProblems: string;
  };
  optimizedPrompts: {
    variant: string;
    prompt: string;
    improvements: string;
  }[];
  explanation: string;
}

export interface OnePersonAgencyAutomator {
  service: string;
  targetClient: string;
  pricingTiers: {
    tier: string;
    price: string;
    deliverables: string[];
    timeframe: string;
  }[];
  portfolioOutline: {
    sections: string[];
    caseStudies: string[];
    testimonials: string[];
  };
  coldPitchStrategy: {
    prospectingMethod: string;
    outreachSequence: string[];
    followUpStrategy: string;
  };
  clientOnboarding: {
    steps: string[];
    questionnaire: string[];
    welcomeEmail: string;
  };
  sops: {
    title: string;
    process: string[];
    tools: string[];
  }[];
  emailSequences: {
    purpose: string;
    emails: string[];
  }[];
}

export interface ProductLaunchFlow {
  idea: string;
  valuePropositionMap: {
    customerPains: string[];
    customerGains: string[];
    painRelievers: string[];
    gainCreators: string[];
  };
  brandingDirection: {
    name: string;
    tagline: string;
    voiceTone: string;
    colorPalette: string;
  };
  pricingModel: {
    strategy: string;
    tiers: {
      name: string;
      price: string;
      features: string[];
    }[];
  };
  websiteCopy: {
    headline: string;
    subheadline: string;
    features: {
      title: string;
      description: string;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
  };
  waitlistPage: string;
  launchTweets: string[];
}

export interface FailureAnalyzer {
  failedItem: string;
  analysis: {
    positioning: {
      issues: string[];
      score: number;
    };
    hookStrength: {
      issues: string[];
      score: number;
    };
    visualStructure: {
      issues: string[];
      score: number;
    };
    toneMismatch: {
      issues: string[];
      score: number;
    };
    offerClarity: {
      issues: string[];
      score: number;
    };
    audienceFit: {
      issues: string[];
      score: number;
    };
  };
  fixedVersion: string;
  actionPlan: string[];
}

export interface IncomeStreamGenerator {
  interests: string;
  skills: string;
  niche: string;
  incomeStreams: {
    type: string;
    description: string;
    actionPlan: string[];
    tools: string[];
    timeVsReward: {
      setupTime: string;
      maintenanceTime: string;
      potentialIncome: string;
      scalability: number;
    };
    rampUpChecklist: string[];
  }[];
}

export interface InfographicWizard {
  topic: string;
  infographic: {
    layout: string;
    headline: string;
    subheadline: string;
    sections: {
      title: string;
      content: string;
      iconSuggestion: string;
    }[];
    colorScheme: string;
    fontPairings: string;
  };
  caption: string;
  cta: string;
  monetizationAngle: string;
  leadMagnetIdea: string;
}

export interface DigitalProductGenerator {
  niche: string;
  product: {
    type: string;
    title: string;
    description: string;
    outline: string[];
    uniqueSellingPoints: string[];
  };
  ebook: {
    chapters: string[];
    pageCount: number;
    coverConcept: string;
  };
  leadMagnets: string[];
  templates: string[];
  slidedeckContent: {
    sections: string[];
    slideCount: number;
  };
  salesPage: {
    headline: string;
    painPoints: string[];
    benefits: string[];
    testimonialTemplates: string[];
    pricingStrategy: string;
  };
  pricingTiers: {
    tier: string;
    price: number;
    includes: string[];
    licenseTerms: string;
  }[];
}

export interface CreatorCollabConnector {
  niche: string;
  followingSize: string;
  platform: string;
  collaborations: {
    creatorType: string;
    collaborationFormat: string;
    scriptOutline: string;
    valueSplit: string;
    crossPromoCTA: string;
  }[];
  outreachTemplates: string[];
  collaborationBenefits: string[];
  successMetrics: string[];
}