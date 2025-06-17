// Types for the 10 new business features

export interface ContractClauseNegotiation {
  contractClause: string;
  redFlags: {
    clause: string;
    risk: string;
    severity: 'High' | 'Medium' | 'Low';
    alternativeWording: string;
  }[];
  negotiationTactics: string[];
  powerBalanceAnalysis: string;
  emailScript: string;
}

export interface RegulationGapScan {
  productDescription: string;
  targetMarket: string;
  complianceIssues: {
    regulation: string;
    violation: string;
    risk: string;
    mitigationSteps: string[];
  }[];
  blindSpots: string[];
  prelaunchChecklist: string[];
}

export interface MonetizationMultiplierResult {
  pricingInfo: string;
  revenueStreams: {
    stream: string;
    description: string;
    implementation: string;
    revenueImpact: string;
  }[];
  tierRestructuring: {
    currentTier: string;
    suggestedTier: string;
    changes: string[];
    projectedIncrease: string;
  }[];
  addOns: string[];
  enterpriseTier: {
    features: string[];
    pricing: string;
    targetCustomers: string;
  };
}

export interface CrisisCommsResult {
  crisisScenario: string;
  customerEmails: {
    subject: string;
    body: string;
    timing: string;
    audience: string;
  }[];
  pressStatements: {
    headline: string;
    statement: string;
    timing: string;
  }[];
  internalMemos: {
    subject: string;
    body: string;
    audience: string;
  }[];
  escalationProtocol: {
    level: string;
    actions: string[];
    stakeholders: string[];
  }[];
  socialMediaResponses: string[];
}

export interface AcquisitionLanguageResult {
  technicalSpecs: string;
  investorNarrative: {
    simplifiedExplanation: string;
    marketSizeHook: string;
    competitiveAdvantage: string;
    growthPotential: string;
  };
  analogies: string[];
  defensibilityPoints: string[];
  pitchDeck: {
    title: string;
    slides: {
      slideTitle: string;
      content: string;
    }[];
  };
}

export interface ChurnAutopsyResult {
  cancellationFeedback: string;
  rootCauses: {
    category: string;
    issues: string[];
    percentage: string;
    impact: string;
  }[];
  customerSegments: {
    segment: string;
    churnRate: string;
    primaryReasons: string[];
  }[];
  retentionPlaybook: {
    strategy: string;
    implementation: string;
    expectedImpact: string;
  }[];
  quickFixes: string[];
}

export interface GlobalPayrollResult {
  role: string;
  country: string;
  laborLaws: {
    mandatoryBenefits: string[];
    taxThresholds: {
      threshold: string;
      rate: string;
      notes: string;
    }[];
    employmentTypes: {
      type: string;
      pros: string[];
      cons: string[];
      requirements: string[];
    }[];
  };
  complianceChecklist: string[];
  hiringRecommendations: string[];
  costBreakdown: {
    salary: string;
    benefits: string;
    taxes: string;
    totalCost: string;
  };
}

export interface IPStrategyResult {
  productFeatures: string;
  patentableElements: {
    feature: string;
    patentability: string;
    strategy: string;
  }[];
  trademarkRisks: {
    term: string;
    risk: string;
    alternative: string;
  }[];
  openSourceRisks: {
    component: string;
    license: string;
    risk: string;
    mitigation: string;
  }[];
  protectionRoadmap: string[];
  competitorAnalysis: string;
}

export interface BoardMeetingResult {
  metrics: string;
  growthStory: {
    narrative: string;
    keyPoints: string[];
    visualizations: string[];
  };
  riskMitigation: {
    risks: string[];
    mitigationStrategies: string[];
    talkingPoints: string[];
  };
  askStrategy: {
    request: string;
    justification: string;
    fallbackPositions: string[];
  };
  boardDeck: {
    title: string;
    slides: {
      slideTitle: string;
      content: string;
    }[];
  };
}

export interface ExitMultiplierResult {
  offerTerms: string;
  valuationAnalysis: {
    currentValuation: string;
    potentialValuation: string;
    keyDrivers: string[];
  };
  earnoutTraps: {
    trap: string;
    risk: string;
    counterStrategy: string;
  }[];
  competingBidTactics: string[];
  negotiationLeverage: string[];
  counterStrategies: {
    strategy: string;
    implementation: string;
    potentialOutcome: string;
  }[];
}

// New Blue Features
export interface IdeaToCompanyResult {
  businessIdea: string;
  businessModel: string;
  marketAnalysis: {
    targetMarket: string;
    marketSize: string;
    competitors: string;
    uniqueValueProposition: string;
  };
  revenueStreams: string[];
  startupCosts: {
    item: string;
    estimate: string;
  }[];
  launchPlan: string[];
  pitchDeckOutline: string[];
}

export interface GhostwriterResult {
  contentTopic: string;
  contentType: string;
  title: string;
  content: string;
  seoKeywords: string[];
  socialPromotion: string[];
}

export interface DecisionClarityResult {
  decision: string;
  optionsAnalysis: {
    option: string;
    score: number;
    pros: string[];
    cons: string[];
    analysis: string;
    isRecommended: boolean;
  }[];
  recommendation: {
    recommendation: string;
    reasoning: string;
  };
  riskAssessment: {
    risk: string;
    severity: string;
    impact: string;
    mitigation: string;
  }[];
  nextSteps: string[];
}

export interface BreakpointFixerResult {
  bugAnalysis: {
    rootCause: string;
  };
  fixedCode: string;
  changesMade: string[];
  testingRecommendations: string[];
  preventionAdvice: string[];
}

export interface HyperPersonaResult {
  demographicProfile: string;
  psychographicSummary: string;
  psychologicalDrivers: {
    driver: string;
    explanation: string;
  }[];
  decisionPatterns: {
    pattern: string;
    explanation: string;
    marketingImplications: string;
  }[];
  communicationStrategies: {
    messagingApproaches: string[];
    channelPreferences: string[];
  };
  objectionHandling: {
    objection: string;
    psychologicalRoot: string;
    recommendedResponse: string;
  }[];
}

export interface PerfectPricingResult {
  optimalPricePoints: {
    tier: string;
    price: string;
    description: string;
  }[];
  pricingStrategy: {
    strategy: string;
    keyPoints: string[];
  };
  marketAnalysis: {
    positioning: string;
    competitiveLandscape: string;
    valuePerception: string;
  };
  psychologicalTriggers: {
    trigger: string;
    explanation: string;
    implementation: string;
  }[];
  revenueProjections: {
    scenario: string;
    conversionRate: string;
    monthlyRevenue: string;
    annualRevenue: string;
  }[];
}

export interface AudienceTriggerResult {
  audience: string;
  product: string;
  primaryTriggers: {
    trigger: string;
    strength: string;
    explanation: string;
    activation: string;
  }[];
  messagingExamples: {
    triggerUsed: string;
    platform: string;
    message: string;
    explanation: string;
  }[];
  emotionalMap: {
    emotion: string;
    relevance: string;
    triggerWords: string[];
  }[];
  abTestingIdeas: string[];
}

export interface StartupStrategyResult {
  startupDescription: string;
  stage: string;
  strategicPriorities: string[];
  growthStrategy: string;
  marketPositioning: string;
  competitiveAdvantage: string;
  fundingStrategy: string;
  actionPlan: string[];
  keyMetrics: {
    metric: string;
    target: string;
  }[];
  riskAssessment: {
    risk: string;
    mitigation: string;
  }[];
}

export interface MiniSaaSResult {
  saasIdea: string;
  productDefinition: string;
  coreFeatures: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    hosting: string;
    thirdPartyServices: string[];
  };
  mvpRoadmap: {
    milestone: string;
    timeframe: string;
    tasks: string[];
  }[];
  pricingModel: {
    tier: string;
    price: string;
    features: string[];
  }[];
  customerAcquisition: string[];
  resourcesNeeded: {
    resource: string;
    estimate: string;
  }[];
}

export interface DistributionStackResult {
  productDescription: string;
  targetAudience: string;
  distributionChannels: {
    channel: string;
    priority: number;
    strategy: string;
    kpis: string[];
  }[];
  contentStrategy: {
    type: string;
    purpose: string;
    distribution: string;
    frequency: string;
  }[];
  growthTactics: string[];
  automationOpportunities: string[];
  resourceAllocation: {
    area: string;
    allocation: string;
  }[];
}