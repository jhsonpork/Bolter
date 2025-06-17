import { 
  ContractClauseNegotiation,
  RegulationGapScan,
  MonetizationMultiplierResult,
  CrisisCommsResult,
  AcquisitionLanguageResult,
  ChurnAutopsyResult,
  GlobalPayrollResult,
  IPStrategyResult,
  BoardMeetingResult,
  ExitMultiplierResult,
  // New Blue Features
  IdeaToCompanyResult,
  GhostwriterResult,
  DecisionClarityResult,
  BreakpointFixerResult,
  HyperPersonaResult,
  PerfectPricingResult,
  AudienceTriggerResult,
  StartupStrategyResult,
  MiniSaaSResult,
  DistributionStackResult
} from '../types/businessFeatures';
import { callGeminiAPI } from './gemini';

// 1. Contract Clause Negotiator
export const negotiateContractClause = async (contractClause: string): Promise<ContractClauseNegotiation> => {
  const prompt = `
You are a world-class contract lawyer. Analyze this contract clause for red flags and provide negotiation tactics.

Contract Clause: "${contractClause}"

Generate analysis in JSON format:
{
  "contractClause": "${contractClause}",
  "redFlags": [
    {
      "clause": "specific problematic text",
      "risk": "detailed explanation of the risk",
      "severity": "High/Medium/Low",
      "alternativeWording": "suggested alternative language"
    }
  ],
  "negotiationTactics": ["3-5 specific negotiation tactics"],
  "powerBalanceAnalysis": "analysis of power dynamics in this clause",
  "emailScript": "email template to request changes to this clause"
}

Focus on identifying unfair terms, hidden liabilities, and power imbalances. Provide actionable negotiation tactics.
`;

  return await callGeminiAPI(prompt);
};

// 2. Regulation Gap Scanner
export const scanRegulationGaps = async (productDescription: string, targetMarket: string): Promise<RegulationGapScan> => {
  const prompt = `
You are a regulatory compliance expert. Identify compliance blind spots for this product in this market.

Product Description: "${productDescription}"
Target Market: "${targetMarket}"

Generate compliance analysis in JSON format:
{
  "productDescription": "${productDescription}",
  "targetMarket": "${targetMarket}",
  "complianceIssues": [
    {
      "regulation": "specific regulation name",
      "violation": "how the product violates this regulation",
      "risk": "potential consequences",
      "mitigationSteps": ["specific steps to fix this issue"]
    }
  ],
  "blindSpots": ["areas commonly overlooked"],
  "prelaunchChecklist": ["compliance steps to take before launch"]
}

Focus on GDPR, CCPA, FDA, financial regulations, or other relevant frameworks for the target market.
`;

  return await callGeminiAPI(prompt);
};

// 3. Monetization Multiplier
export const multiplyMonetization = async (pricingInfo: string): Promise<MonetizationMultiplierResult> => {
  const prompt = `
You are a SaaS pricing optimization expert. Identify untapped revenue streams and optimize pricing structure.

Pricing/Service Info: "${pricingInfo}"

Generate monetization analysis in JSON format:
{
  "pricingInfo": "${pricingInfo}",
  "revenueStreams": [
    {
      "stream": "revenue stream name",
      "description": "description of this revenue opportunity",
      "implementation": "how to implement this",
      "revenueImpact": "projected revenue impact"
    }
  ],
  "tierRestructuring": [
    {
      "currentTier": "current tier description",
      "suggestedTier": "optimized tier structure",
      "changes": ["specific changes to make"],
      "projectedIncrease": "projected revenue increase"
    }
  ],
  "addOns": ["potential high-margin add-ons"],
  "enterpriseTier": {
    "features": ["enterprise-specific features"],
    "pricing": "pricing strategy for enterprise",
    "targetCustomers": "ideal enterprise customer profile"
  }
}

Focus on tier restructuring, usage-based pricing, and high-margin add-ons that increase ARR.
`;

  return await callGeminiAPI(prompt);
};

// 4. Crisis Comms Generator
export const generateCrisisComms = async (crisisScenario: string): Promise<CrisisCommsResult> => {
  const prompt = `
You are a crisis communications expert. Create a complete communications playbook for this crisis.

Crisis Scenario: "${crisisScenario}"

Generate crisis communications in JSON format:
{
  "crisisScenario": "${crisisScenario}",
  "customerEmails": [
    {
      "subject": "email subject line",
      "body": "complete email body",
      "timing": "when to send",
      "audience": "which customers should receive this"
    }
  ],
  "pressStatements": [
    {
      "headline": "press release headline",
      "statement": "complete press statement",
      "timing": "when to release"
    }
  ],
  "internalMemos": [
    {
      "subject": "memo subject",
      "body": "complete memo text",
      "audience": "which team members should receive this"
    }
  ],
  "escalationProtocol": [
    {
      "level": "escalation level",
      "actions": ["specific actions to take"],
      "stakeholders": ["who to involve"]
    }
  ],
  "socialMediaResponses": ["prepared social media statements"]
}

Create a comprehensive playbook that neutralizes the crisis quickly and maintains trust.
`;

  return await callGeminiAPI(prompt);
};

// 5. Acquisition Language Translator
export const translateAcquisitionLanguage = async (technicalSpecs: string): Promise<AcquisitionLanguageResult> => {
  const prompt = `
You are an expert at translating technical concepts into investor-friendly language. Transform these technical specs into compelling acquisition narratives.

Technical Specs: "${technicalSpecs}"

Generate investor-ready content in JSON format:
{
  "technicalSpecs": "${technicalSpecs}",
  "investorNarrative": {
    "simplifiedExplanation": "non-technical explanation",
    "marketSizeHook": "compelling market size statement",
    "competitiveAdvantage": "key competitive advantage",
    "growthPotential": "growth narrative"
  },
  "analogies": ["3-5 simple analogies that explain the technology"],
  "defensibilityPoints": ["key points about why this technology is defensible"],
  "pitchDeck": {
    "title": "suggested pitch deck title",
    "slides": [
      {
        "slideTitle": "slide title",
        "content": "slide content"
      }
    ]
  }
}

Focus on simple analogies, market-size hooks, and defensibility narratives that would appeal to investors.
`;

  return await callGeminiAPI(prompt);
};

// 6. Churn Autopsy Report
export const generateChurnAutopsy = async (cancellationFeedback: string): Promise<ChurnAutopsyResult> => {
  const prompt = `
You are a customer retention expert. Analyze this cancellation feedback to identify root causes and retention strategies.

Cancellation Feedback: "${cancellationFeedback}"

Generate churn analysis in JSON format:
{
  "cancellationFeedback": "${cancellationFeedback}",
  "rootCauses": [
    {
      "category": "cause category",
      "issues": ["specific issues identified"],
      "percentage": "estimated percentage of churn",
      "impact": "business impact"
    }
  ],
  "customerSegments": [
    {
      "segment": "customer segment description",
      "churnRate": "estimated churn rate",
      "primaryReasons": ["main reasons this segment churns"]
    }
  ],
  "retentionPlaybook": [
    {
      "strategy": "retention strategy",
      "implementation": "how to implement",
      "expectedImpact": "projected impact on retention"
    }
  ],
  "quickFixes": ["3 immediate actions to reduce churn"]
}

Segment churn drivers by price, UX, and value perception, and provide a detailed retention playbook.
`;

  return await callGeminiAPI(prompt);
};

// 7. Global Payroll Architect
export const architectGlobalPayroll = async (role: string, country: string): Promise<GlobalPayrollResult> => {
  const prompt = `
You are an international employment law expert. Create a comprehensive guide for hiring this role in this country.

Role: "${role}"
Country: "${country}"

Generate global payroll information in JSON format:
{
  "role": "${role}",
  "country": "${country}",
  "laborLaws": {
    "mandatoryBenefits": ["required benefits in this country"],
    "taxThresholds": [
      {
        "threshold": "income threshold",
        "rate": "tax rate",
        "notes": "important notes"
      }
    ],
    "employmentTypes": [
      {
        "type": "employment type (contractor/employee/etc)",
        "pros": ["advantages"],
        "cons": ["disadvantages"],
        "requirements": ["legal requirements"]
      }
    ]
  },
  "complianceChecklist": ["key compliance requirements"],
  "hiringRecommendations": ["specific recommendations for this role/country"],
  "costBreakdown": {
    "salary": "typical salary range",
    "benefits": "estimated benefits cost",
    "taxes": "estimated tax burden",
    "totalCost": "total employment cost"
  }
}

Provide detailed information on mandatory benefits, tax thresholds, and contractor vs. employee rules.
`;

  return await callGeminiAPI(prompt);
};

// 8. IP Strategy Simulator
export const simulateIPStrategy = async (productFeatures: string): Promise<IPStrategyResult> => {
  const prompt = `
You are an intellectual property strategist. Create a protection roadmap for these product features.

Product Features: "${productFeatures}"

Generate IP strategy in JSON format:
{
  "productFeatures": "${productFeatures}",
  "patentableElements": [
    {
      "feature": "specific feature",
      "patentability": "assessment of patentability",
      "strategy": "recommended patent strategy"
    }
  ],
  "trademarkRisks": [
    {
      "term": "term with potential trademark issues",
      "risk": "nature of the risk",
      "alternative": "suggested alternative"
    }
  ],
  "openSourceRisks": [
    {
      "component": "open source component",
      "license": "license type",
      "risk": "potential risk",
      "mitigation": "mitigation strategy"
    }
  ],
  "protectionRoadmap": ["step-by-step IP protection plan"],
  "competitorAnalysis": "analysis of competitor IP landscape"
}

Identify patentable elements, trademark risks, and open-source loopholes with actionable strategies.
`;

  return await callGeminiAPI(prompt);
};

// 9. Board Meeting Alchemist
export const alchemizeBoardMeeting = async (metrics: string): Promise<BoardMeetingResult> => {
  const prompt = `
You are a strategic narrative expert. Transform these raw metrics into compelling board meeting narratives.

Metrics: "${metrics}"

Generate board meeting content in JSON format:
{
  "metrics": "${metrics}",
  "growthStory": {
    "narrative": "compelling growth narrative",
    "keyPoints": ["key talking points"],
    "visualizations": ["suggested data visualizations"]
  },
  "riskMitigation": {
    "risks": ["identified risks"],
    "mitigationStrategies": ["strategies to address risks"],
    "talkingPoints": ["how to discuss risks positively"]
  },
  "askStrategy": {
    "request": "what you're asking for",
    "justification": "compelling justification",
    "fallbackPositions": ["fallback positions if initial ask is rejected"]
  },
  "boardDeck": {
    "title": "suggested deck title",
    "slides": [
      {
        "slideTitle": "slide title",
        "content": "slide content"
      }
    ]
  }
}

Create investor-grade narratives with growth story angles, risk mitigation talking points, and a clear ask strategy.
`;

  return await callGeminiAPI(prompt);
};

// 10. Exit Multiplier Engine
export const multiplyExit = async (offerTerms: string): Promise<ExitMultiplierResult> => {
  const prompt = `
You are an M&A negotiation expert. Analyze these acquisition terms to maximize exit value.

Offer Terms: "${offerTerms}"

Generate exit analysis in JSON format:
{
  "offerTerms": "${offerTerms}",
  "valuationAnalysis": {
    "currentValuation": "current valuation assessment",
    "potentialValuation": "potential improved valuation",
    "keyDrivers": ["key valuation drivers to emphasize"]
  },
  "earnoutTraps": [
    {
      "trap": "potential earnout trap",
      "risk": "associated risk",
      "counterStrategy": "how to address this trap"
    }
  ],
  "competingBidTactics": ["tactics to attract competing bids"],
  "negotiationLeverage": ["sources of negotiation leverage"],
  "counterStrategies": [
    {
      "strategy": "counter-strategy name",
      "implementation": "how to implement",
      "potentialOutcome": "expected outcome"
    }
  ]
}

Identify valuation drivers to emphasize, earnout traps to avoid, and competing bid tactics to increase the offer.
`;

  return await callGeminiAPI(prompt);
};

// 11. Idea-to-Company Generator
export const generateIdeaToCompany = async (businessIdea: string): Promise<IdeaToCompanyResult> => {
  const prompt = `
You are a startup expert. Transform this business idea into a complete company blueprint.

Business Idea: "${businessIdea}"

Generate company blueprint in JSON format:
{
  "businessIdea": "${businessIdea}",
  "businessModel": "recommended business model with detailed explanation",
  "marketAnalysis": {
    "targetMarket": "detailed target market description",
    "marketSize": "market size estimation with numbers",
    "competitors": "analysis of key competitors",
    "uniqueValueProposition": "clear unique value proposition"
  },
  "revenueStreams": ["3-5 potential revenue streams"],
  "startupCosts": [
    {
      "item": "cost item",
      "estimate": "estimated amount"
    }
  ],
  "launchPlan": ["step-by-step launch plan"],
  "pitchDeckOutline": ["10-12 slide outline for investor pitch"]
}

Create a comprehensive blueprint that covers business model, market analysis, revenue, costs, and launch strategy.
`;

  return await callGeminiAPI(prompt);
};

// 12. Auto-Ghostwriter
export const generateGhostwrittenContent = async (contentTopic: string, contentType: string): Promise<GhostwriterResult> => {
  const prompt = `
You are a professional ghostwriter. Create publication-ready content on this topic.

Content Topic: "${contentTopic}"
Content Type: "${contentType}"

Generate ghostwritten content in JSON format:
{
  "contentTopic": "${contentTopic}",
  "contentType": "${contentType}",
  "title": "compelling title for the content",
  "content": "complete, publication-ready content (800-1200 words)",
  "seoKeywords": ["5-7 SEO keywords for this content"],
  "socialPromotion": ["3-4 social media posts to promote this content"]
}

Create professional, engaging content that sounds like it was written by a subject matter expert.
`;

  return await callGeminiAPI(prompt);
};

// 13. Decision Clarity Engine
export const generateDecisionClarity = async (decision: string, options: string): Promise<DecisionClarityResult> => {
  const prompt = `
You are a strategic decision-making expert. Analyze this decision and provide clarity.

Decision: "${decision}"
Options: "${options}"

Generate decision analysis in JSON format:
{
  "decision": "${decision}",
  "optionsAnalysis": [
    {
      "option": "option description",
      "score": score out of 10,
      "pros": ["key advantages"],
      "cons": ["key disadvantages"],
      "analysis": "detailed analysis",
      "isRecommended": true/false
    }
  ],
  "recommendation": {
    "recommendation": "clear recommendation",
    "reasoning": "detailed reasoning"
  },
  "riskAssessment": [
    {
      "risk": "potential risk",
      "severity": "High/Medium/Low",
      "impact": "potential impact",
      "mitigation": "mitigation strategy"
    }
  ],
  "nextSteps": ["specific next steps to implement the decision"]
}

Provide a comprehensive analysis that leads to a clear, actionable recommendation.
`;

  return await callGeminiAPI(prompt);
};

// 14. Breakpoint Fixer
export const generateBreakpointFix = async (bugDescription: string, codeSnippet: string): Promise<BreakpointFixerResult> => {
  const prompt = `
You are a senior software developer. Debug and fix this code issue.

Bug Description: "${bugDescription}"
Code Snippet: "${codeSnippet}"

Generate code fix in JSON format:
{
  "bugAnalysis": {
    "rootCause": "detailed explanation of the root cause"
  },
  "fixedCode": "complete fixed code snippet",
  "changesMade": ["specific changes made to fix the issue"],
  "testingRecommendations": ["how to test the fix"],
  "preventionAdvice": ["how to prevent similar issues in the future"]
}

Provide a complete, working solution with clear explanations of the changes made.
`;

  return await callGeminiAPI(prompt);
};

// 15. HyperPersona
export const generateHyperPersona = async (targetAudience: string): Promise<HyperPersonaResult> => {
  const prompt = `
You are an advanced audience psychology expert. Create a hyper-detailed persona profile.

Target Audience: "${targetAudience}"

Generate hyper-persona in JSON format:
{
  "demographicProfile": "detailed demographic description",
  "psychographicSummary": "deep psychological profile summary",
  "psychologicalDrivers": [
    {
      "driver": "psychological driver name",
      "explanation": "detailed explanation of this driver"
    }
  ],
  "decisionPatterns": [
    {
      "pattern": "decision-making pattern",
      "explanation": "how this pattern works",
      "marketingImplications": "how to leverage this in marketing"
    }
  ],
  "communicationStrategies": {
    "messagingApproaches": ["effective messaging approaches"],
    "channelPreferences": ["preferred communication channels"]
  },
  "objectionHandling": [
    {
      "objection": "common objection",
      "psychologicalRoot": "psychological basis of the objection",
      "recommendedResponse": "effective response strategy"
    }
  ]
}

Create an ultra-detailed psychological profile that goes far beyond standard personas.
`;

  return await callGeminiAPI(prompt);
};

// 16. Perfect Pricing Calculator
export const generatePerfectPricing = async (
  productDescription: string, 
  targetMarket: string, 
  competitorPricing: string = ''
): Promise<PerfectPricingResult> => {
  const prompt = `
You are a pricing strategy expert. Calculate optimal pricing for this product.

Product Description: "${productDescription}"
Target Market: "${targetMarket}"
Competitor Pricing: "${competitorPricing}"

Generate pricing analysis in JSON format:
{
  "optimalPricePoints": [
    {
      "tier": "pricing tier name",
      "price": "recommended price point",
      "description": "tier description"
    }
  ],
  "pricingStrategy": {
    "strategy": "recommended pricing strategy",
    "keyPoints": ["key implementation points"]
  },
  "marketAnalysis": {
    "positioning": "market positioning analysis",
    "competitiveLandscape": "competitive landscape analysis",
    "valuePerception": "value perception analysis"
  },
  "psychologicalTriggers": [
    {
      "trigger": "psychological pricing trigger",
      "explanation": "how this trigger works",
      "implementation": "how to implement this trigger"
    }
  ],
  "revenueProjections": [
    {
      "scenario": "projection scenario",
      "conversionRate": "estimated conversion rate",
      "monthlyRevenue": "projected monthly revenue",
      "annualRevenue": "projected annual revenue"
    }
  ]
}

Provide data-driven pricing recommendations based on psychological principles and market positioning.
`;

  return await callGeminiAPI(prompt);
};

// 17. Audience Trigger Finder
export const generateAudienceTriggers = async (audience: string, product: string): Promise<AudienceTriggerResult> => {
  const prompt = `
You are a consumer psychology expert. Identify the exact psychological triggers for this audience.

Audience: "${audience}"
Product: "${product}"

Generate trigger analysis in JSON format:
{
  "audience": "${audience}",
  "product": "${product}",
  "primaryTriggers": [
    {
      "trigger": "psychological trigger name",
      "strength": "strength rating",
      "explanation": "how this trigger affects this audience",
      "activation": "how to activate this trigger"
    }
  ],
  "messagingExamples": [
    {
      "triggerUsed": "trigger being used",
      "platform": "best platform for this message",
      "message": "example message using this trigger",
      "explanation": "why this works"
    }
  ],
  "emotionalMap": [
    {
      "emotion": "relevant emotion",
      "relevance": "why this emotion matters to this audience",
      "triggerWords": ["words that trigger this emotion"]
    }
  ],
  "abTestingIdeas": ["ideas for testing different triggers"]
}

Focus on deep psychological insights that drive action for this specific audience.
`;

  return await callGeminiAPI(prompt);
};

// 18. Startup Strategy Generator
export const generateStartupStrategy = async (startupDescription: string, stage: string): Promise<StartupStrategyResult> => {
  const prompt = `
You are a startup strategy consultant. Create a comprehensive strategy for this startup.

Startup Description: "${startupDescription}"
Stage: "${stage}"

Generate startup strategy in JSON format:
{
  "startupDescription": "${startupDescription}",
  "stage": "${stage}",
  "strategicPriorities": ["3-5 key strategic priorities"],
  "growthStrategy": "detailed growth strategy",
  "marketPositioning": "market positioning strategy",
  "competitiveAdvantage": "sustainable competitive advantage",
  "fundingStrategy": "funding approach for this stage",
  "actionPlan": ["90-day action plan items"],
  "keyMetrics": [
    {
      "metric": "key metric to track",
      "target": "target value"
    }
  ],
  "riskAssessment": [
    {
      "risk": "potential risk",
      "mitigation": "mitigation strategy"
    }
  ]
}

Create a comprehensive strategy tailored to the startup's current stage and challenges.
`;

  return await callGeminiAPI(prompt);
};

// 19. Mini SaaS Blueprint
export const generateMiniSaaS = async (saasIdea: string): Promise<MiniSaaSResult> => {
  const prompt = `
You are a SaaS product expert. Create a complete micro-SaaS business plan.

SaaS Idea: "${saasIdea}"

Generate SaaS blueprint in JSON format:
{
  "saasIdea": "${saasIdea}",
  "productDefinition": "clear product definition",
  "coreFeatures": ["essential features for MVP"],
  "techStack": {
    "frontend": "recommended frontend technology",
    "backend": "recommended backend technology",
    "database": "recommended database",
    "hosting": "recommended hosting solution",
    "thirdPartyServices": ["key third-party services"]
  },
  "mvpRoadmap": [
    {
      "milestone": "development milestone",
      "timeframe": "estimated timeframe",
      "tasks": ["specific tasks"]
    }
  ],
  "pricingModel": [
    {
      "tier": "pricing tier name",
      "price": "price point",
      "features": ["included features"]
    }
  ],
  "customerAcquisition": ["customer acquisition strategies"],
  "resourcesNeeded": [
    {
      "resource": "required resource",
      "estimate": "estimated cost/time"
    }
  ]
}

Create a practical, implementable plan for a bootstrapped micro-SaaS business.
`;

  return await callGeminiAPI(prompt);
};

// 20. Distribution Stack Builder
export const generateDistributionStack = async (
  productDescription: string, 
  targetAudience: string
): Promise<DistributionStackResult> => {
  const prompt = `
You are a go-to-market strategist. Build a complete distribution system for this product.

Product Description: "${productDescription}"
Target Audience: "${targetAudience}"

Generate distribution stack in JSON format:
{
  "productDescription": "${productDescription}",
  "targetAudience": "${targetAudience}",
  "distributionChannels": [
    {
      "channel": "distribution channel name",
      "priority": priority score (1-10),
      "strategy": "detailed strategy for this channel",
      "kpis": ["key performance indicators"]
    }
  ],
  "contentStrategy": [
    {
      "type": "content type",
      "purpose": "strategic purpose",
      "distribution": "distribution approach",
      "frequency": "publishing frequency"
    }
  ],
  "growthTactics": ["specific growth tactics"],
  "automationOpportunities": ["processes that can be automated"],
  "resourceAllocation": [
    {
      "area": "resource area",
      "allocation": "recommended allocation"
    }
  ]
}

Create a comprehensive distribution strategy that maximizes reach and conversion.
`;

  return await callGeminiAPI(prompt);
};