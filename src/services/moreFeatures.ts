import { 
  OfferAngleMatcher,
  HookFrameTester,
  CreatorFunnelBuilder,
  CourseSummaryGenerator,
  CommentExploder,
  ViralCTASequencer,
  PlatformTimingForecaster,
  ContentEthicsSanitizer,
  ValueLadderBuilder,
  MonetizationGenerator,
  ContentFrameworkBuilder,
  CourseCurriculumBuilder,
  // 10 NEW FEATURES
  ZeroToStartupEngine,
  ContentCalendarGenerator,
  PromptDebugger,
  OnePersonAgencyAutomator,
  ProductLaunchFlow,
  FailureAnalyzer,
  IncomeStreamGenerator,
  InfographicWizard,
  DigitalProductGenerator,
  CreatorCollabConnector
} from '../types/moreFeatures';
import { callGeminiAPI } from './gemini';

// 1. Offer Angle Matcher
export const matchOfferAngles = async (product: string): Promise<OfferAngleMatcher> => {
  const prompt = `
You are an offer optimization expert. Match this product to 7 proven offer types.

Product: "${product}"

Generate offer angle analysis in JSON format:
{
  "product": "${product}",
  "offerAngles": [
    {
      "type": "Free Trial/Limited-Time Guarantee/Bundle Stack/Price Anchor/Community Challenge/Scarcity Offer/Premium Positioning",
      "headline": "compelling headline for this offer type",
      "subheadline": "supporting subheadline",
      "primaryCTA": "main call-to-action",
      "hook": "opening hook for this offer",
      "effectiveness": score out of 10,
      "bestFor": "when to use this offer type"
    }
  ],
  "recommendations": {
    "virality": "best offer type for viral content",
    "conversion": "best offer type for conversions",
    "ltv": "best offer type for lifetime value"
  },
  "currentOfferDiagnosis": "analysis of why current offers might not be working"
}

Create all 7 offer types with complete copy for each.
`;

  return await callGeminiAPI(prompt);
};

// 2. Hook + Frame Split Tester
export const testHookFrames = async (hooks: string[]): Promise<HookFrameTester> => {
  const prompt = `
You are a TikTok performance expert. Test these hooks for scroll-stopping power.

Hooks to Test: ${hooks.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Generate hook frame test in JSON format:
{
  "hooks": [
    {
      "text": "hook text exactly as provided",
      "thumbnail": "suggested thumbnail description",
      "ctrPotential": score out of 10,
      "curiosityGap": score out of 10,
      "scrollStickiness": score out of 10,
      "predictedScrollTime": seconds before scroll,
      "improvements": {
        "betterOpeningShot": "improved opening shot suggestion",
        "rewrittenHook": "rewritten hook for better retention"
      }
    }
  ],
  "bestPerformer": "best performing hook text",
  "worstPerformer": "worst performing hook text"
}

Focus on the critical first 1.5 seconds that determine retention.
`;

  return await callGeminiAPI(prompt);
};

// 3. Instant Creator Funnel Builder
export const buildCreatorFunnel = async (accountHandle: string): Promise<CreatorFunnelBuilder> => {
  const prompt = `
You are a creator monetization expert. Build a complete funnel for this creator.

Account Handle: "${accountHandle}"

Generate creator funnel in JSON format:
{
  "accountHandle": "${accountHandle}",
  "leadMagnetIdea": "lead magnet idea based on typical audience for this type of account",
  "emailSequence": ["7 email sequence parts"],
  "monetizationApproach": "best monetization strategy (coaching/product/service/course)",
  "landingPage": {
    "headline": "compelling landing page headline",
    "socialProof": "social proof section",
    "cta": "main call-to-action",
    "faqs": ["5 common FAQs and answers"]
  },
  "exportFormat": "formatted layout description for ClickFunnels/Notion"
}

Create a complete funnel that converts influence to income.
`;

  return await callGeminiAPI(prompt);
};

// 4. AI Course Summary Generator
export const generateCourseSummary = async (syllabus: string): Promise<CourseSummaryGenerator> => {
  const prompt = `
You are a content reverse-engineering expert. Create content from this course syllabus.

Syllabus: "${syllabus}"

Generate course summary content in JSON format:
{
  "syllabus": "${syllabus}",
  "summary": {
    "threeMinuteScript": "3-minute YouTube/TikTok summary script",
    "scriptHooks": ["5 hooks for short-form content based on course"],
    "leadMagnet": "1-page lead magnet based on core takeaway",
    "infoproductSuggestions": ["3 infoproduct ideas to monetize this angle"]
  }
}

Make the creator look like a seasoned educator instantly.
`;

  return await callGeminiAPI(prompt);
};

// 5. Comment Exploder
export const explodeComments = async (viralPost: string): Promise<CommentExploder> => {
  const prompt = `
You are a viral content analyst. Extract and expand comments from this post.

Viral Post: "${viralPost}"

Generate comment explosion in JSON format:
{
  "viralPost": "${viralPost}",
  "extractedComments": ["5 most engaging comment types this post would generate"],
  "expandedContent": {
    "tiktokHooks": ["5 TikTok hooks based on comment themes"],
    "tweetThreads": ["3 tweet thread outlines from comment insights"],
    "videoAngles": ["5 short-form video angles from comment patterns"]
  }
}

Turn viral engagement patterns into new content opportunities.
`;

  return await callGeminiAPI(prompt);
};

// 6. Viral CTA Sequencer
export const createCTASequence = async (): Promise<ViralCTASequencer> => {
  const prompt = `
You are a conversion psychology expert. Create a 7-day viral CTA sequence.

Generate CTA sequence in JSON format:
{
  "sequencePlan": [
    {
      "day": 1,
      "ctaType": "Direct Offer/Community CTA/Scarcity CTA/Problem Reminder/Testimonial CTA/FOMO CTA/Hard Close",
      "content": "complete CTA copy for this day",
      "psychology": "psychological principle being used"
    }
  ]
}

Create 7 days of psychological sequencing: trust → desire → action.
`;

  return await callGeminiAPI(prompt);
};

// 7. Platform Timing Forecaster
export const forecastTiming = async (
  contentType: string,
  timezone: string,
  niche: string
): Promise<PlatformTimingForecaster> => {
  const prompt = `
You are a social media timing expert. Predict optimal posting times.

Content Type: "${contentType}"
Timezone: "${timezone}"
Niche: "${niche}"

Generate timing forecast in JSON format:
{
  "contentType": "${contentType}",
  "timezone": "${timezone}",
  "niche": "${niche}",
  "predictions": {
    "tiktok": "optimal TikTok posting time with reasoning",
    "instagram": "optimal Instagram posting time (Reel vs Carousel)",
    "youtubeShorts": "optimal YouTube Shorts posting time",
    "email": "optimal email send time based on niche"
  },
  "reasoning": "detailed explanation of timing logic for this niche and content type"
}

Base predictions on audience behavior patterns and platform algorithms.
`;

  return await callGeminiAPI(prompt);
};

// 8. Content Ethics Sanitizer
export const sanitizeContent = async (content: string): Promise<ContentEthicsSanitizer> => {
  const prompt = `
You are a content compliance expert. Sanitize this content for platform safety.

Content: "${content}"

Generate ethics sanitization in JSON format:
{
  "originalContent": "${content}",
  "flags": [
    {
      "issue": "specific issue identified",
      "severity": "High/Medium/Low",
      "platform": "which platform this affects",
      "explanation": "why this could cause problems"
    }
  ],
  "sanitizedContent": "rewritten content that preserves edge while staying compliant",
  "complianceScore": score out of 10
}

Keep creators viral and safe from takedowns.
`;

  return await callGeminiAPI(prompt);
};

// 9. Value Ladder Builder
export const buildValueLadder = async (currentOffer: string): Promise<ValueLadderBuilder> => {
  const prompt = `
You are a revenue optimization expert. Build a complete value ladder.

Current Offer: "${currentOffer}"

Generate value ladder in JSON format:
{
  "currentOffer": "${currentOffer}",
  "revenueLadder": [
    {
      "price": "$9/$49/$199/$1K",
      "offer": "offer description",
      "emailCopy": "email copy for this tier",
      "adCopy": "ad copy for this tier",
      "target": "target customer for this tier"
    }
  ]
}

Create 4 tiers that monetize every audience segment.
`;

  return await callGeminiAPI(prompt);
};

// 10. 2-Minute Monetizer
export const generateMonetization = async (
  contentTopic: string,
  audienceSize: string,
  currentProduct: string
): Promise<MonetizationGenerator> => {
  const prompt = `
You are a monetization strategist. Recommend the best monetization path.

Content Topic: "${contentTopic}"
Audience Size: "${audienceSize}"
Current Product: "${currentProduct}"

Generate monetization recommendation in JSON format:
{
  "contentTopic": "${contentTopic}",
  "audienceSize": "${audienceSize}",
  "currentProduct": "${currentProduct}",
  "recommendation": {
    "path": "ideal monetization path (ebook/service/cohort/SaaS)",
    "hook": "hook for this monetization approach",
    "cta": "call-to-action copy",
    "landingCopy": "landing page copy",
    "reasoning": "why this path is optimal for this creator"
  }
}

Perfect for beginners or confused creators.
`;

  return await callGeminiAPI(prompt);
};

// 11. Content Framework Builder
export const buildContentFramework = async (niche: string): Promise<ContentFrameworkBuilder> => {
  const prompt = `
You are a content structure expert. Create a viral framework for this niche.

Niche: "${niche}"

Generate content framework in JSON format:
{
  "niche": "${niche}",
  "framework": {
    "structure": ["5-part viral structure (e.g., PROBLEM → REFRAME → VISUAL → CTA → HOOK)"],
    "postPlan": [
      {
        "day": 1,
        "topic": "post topic",
        "hook": "opening hook",
        "content": "content outline"
      }
    ],
    "scriptSkeletons": {
      "shorts": "short-form video script skeleton",
      "carousels": "carousel post skeleton",
      "email": "email script skeleton"
    }
  }
}

Create 7-day plug-and-play content plan that eliminates creator block.
`;

  return await callGeminiAPI(prompt);
};

// 12. Course Curriculum Builder
export const buildCourseCurriculum = async (topic: string): Promise<CourseCurriculumBuilder> => {
  const prompt = `
You are a course creation expert. Build a complete curriculum for this topic.

Topic: "${topic}"

Generate course curriculum in JSON format:
{
  "topic": "${topic}",
  "courseDetails": {
    "title": "compelling course title",
    "subtitle": "supporting subtitle",
    "positioning": "unique positioning statement",
    "audienceLevel": "Beginner/Intermediate/Advanced"
  },
  "curriculum": [
    {
      "moduleNumber": 1,
      "moduleTitle": "module title",
      "lessons": [
        {
          "lessonNumber": 1,
          "lessonTitle": "lesson title",
          "goals": ["lesson goals"],
          "activities": ["lesson activities"],
          "quizPrompts": ["quiz questions"]
        }
      ],
      "cta": "module call-to-action"
    }
  ],
  "bonusUnits": {
    "slidePrompts": ["slide deck prompts"],
    "videoSegments": ["scriptable video segments"],
    "funnelLayout": "course monetization funnel layout",
    "ebookDraft": "companion eBook outline"
  }
}

Create 5-7 modules with 3-6 lessons each. Transform a TikTok educator into a $997 course seller.
`;

  return await callGeminiAPI(prompt);
};

// 13. Zero-to-Startup Engine
export const buildStartupEngine = async (problem: string, niche: string): Promise<ZeroToStartupEngine> => {
  const prompt = `
You are a startup expert. Create a complete startup blueprint from this idea.

Problem: "${problem}"
Niche/Industry: "${niche}"

Generate startup blueprint in JSON format:
{
  "problem": "${problem}",
  "niche": "${niche}",
  "businessModel": "recommended business model (freemium/SaaS/service/marketplace)",
  "monetizationStrategy": "detailed monetization approach",
  "mvpScope": {
    "features": ["prioritized feature list for MVP"],
    "prioritization": "explanation of feature prioritization"
  },
  "techStack": ["recommended technologies and tools"],
  "landingPageCopy": {
    "headline": "compelling headline",
    "subheadline": "supporting subheadline",
    "valueProps": ["3-5 key value propositions"],
    "cta": "primary call-to-action"
  },
  "coldEmails": ["3 cold outreach emails for different stakeholders"],
  "launchPlan": [
    {
      "day": 1,
      "tasks": ["specific tasks for this day"],
      "goals": "goals for this day"
    }
  ]
}

Create a 7-day launch plan with specific tasks and goals for each day.
`;

  return await callGeminiAPI(prompt);
};

// 14. 100-Year Content Calendar Generator
export const generateContentCalendar = async (niche: string, goal: string, platform: string): Promise<ContentCalendarGenerator> => {
  const prompt = `
You are a content strategy expert. Create an evergreen content library for this niche.

Niche: "${niche}"
Goal: "${goal}"
Platform: "${platform}"

Generate content calendar in JSON format:
{
  "niche": "${niche}",
  "goal": "${goal}",
  "platform": "${platform}",
  "contentLibrary": {
    "perennialTopics": ["365 evergreen content topics"],
    "weeklyThemes": [
      {
        "theme": "weekly theme name",
        "postCategories": ["post categories for this theme"]
      }
    ],
    "monthlyCampaigns": [
      {
        "month": "month name",
        "campaign": "campaign theme",
        "content": ["content ideas for this campaign"]
      }
    ],
    "anchorContent": ["lifetime anchor content pieces"],
    "seasonalIdeas": [
      {
        "season": "season or holiday name",
        "ideas": ["content ideas for this season"]
      }
    ]
  }
}

Focus on creating a mix of evergreen, seasonal, and trending content ideas.
`;

  return await callGeminiAPI(prompt);
};

// 15. Gemini-Powered Prompt Debugger
export const debugPrompt = async (failedPrompt: string): Promise<PromptDebugger> => {
  const prompt = `
You are a prompt engineering expert. Debug and fix this failed AI prompt.

Failed Prompt: "${failedPrompt}"

Generate prompt debugging in JSON format:
{
  "failedPrompt": "${failedPrompt}",
  "analysis": {
    "toneIssues": "analysis of tone problems",
    "vagueness": "analysis of vague elements",
    "ambiguity": "analysis of ambiguous instructions",
    "structuralProblems": "analysis of structural issues"
  },
  "optimizedPrompts": [
    {
      "variant": "variant name/focus",
      "prompt": "optimized prompt version",
      "improvements": "explanation of improvements made"
    }
  ],
  "explanation": "overall explanation of why the prompt failed and how to write better prompts"
}

Provide 3-5 optimized prompt variants that would work better.
`;

  return await callGeminiAPI(prompt);
};

// 16. One-Person Agency Automator
export const automateAgency = async (service: string, targetClient: string): Promise<OnePersonAgencyAutomator> => {
  const prompt = `
You are a freelance business expert. Create a complete agency system for this service.

Service: "${service}"
Target Client: "${targetClient}"

Generate agency automation in JSON format:
{
  "service": "${service}",
  "targetClient": "${targetClient}",
  "pricingTiers": [
    {
      "tier": "tier name",
      "price": "price point",
      "deliverables": ["what's included"],
      "timeframe": "delivery timeframe"
    }
  ],
  "portfolioOutline": {
    "sections": ["portfolio page sections"],
    "caseStudies": ["case study ideas"],
    "testimonials": ["testimonial templates"]
  },
  "coldPitchStrategy": {
    "prospectingMethod": "how to find clients",
    "outreachSequence": ["outreach message sequence"],
    "followUpStrategy": "follow-up approach"
  },
  "clientOnboarding": {
    "steps": ["onboarding process steps"],
    "questionnaire": ["client questionnaire questions"],
    "welcomeEmail": "welcome email template"
  },
  "sops": [
    {
      "title": "SOP title",
      "process": ["step-by-step process"],
      "tools": ["tools needed"]
    }
  ],
  "emailSequences": [
    {
      "purpose": "sequence purpose",
      "emails": ["email templates"]
    }
  ]
}

Create a complete system that helps freelancers become agencies.
`;

  return await callGeminiAPI(prompt);
};

// 17. Idea → Product → Launch AutoFlow
export const buildProductLaunch = async (idea: string): Promise<ProductLaunchFlow> => {
  const prompt = `
You are a product launch expert. Create a complete launch plan for this idea.

Idea: "${idea}"

Generate product launch flow in JSON format:
{
  "idea": "${idea}",
  "valuePropositionMap": {
    "customerPains": ["customer pain points"],
    "customerGains": ["customer desired gains"],
    "painRelievers": ["how product relieves pains"],
    "gainCreators": ["how product creates gains"]
  },
  "brandingDirection": {
    "name": "product name suggestion",
    "tagline": "tagline suggestion",
    "voiceTone": "brand voice description",
    "colorPalette": "color scheme suggestion"
  },
  "pricingModel": {
    "strategy": "pricing strategy",
    "tiers": [
      {
        "name": "tier name",
        "price": "price point",
        "features": ["features included"]
      }
    ]
  },
  "websiteCopy": {
    "headline": "main headline",
    "subheadline": "supporting subheadline",
    "features": [
      {
        "title": "feature title",
        "description": "feature description"
      }
    ],
    "faq": [
      {
        "question": "FAQ question",
        "answer": "FAQ answer"
      }
    ]
  },
  "waitlistPage": "waitlist landing page HTML",
  "launchTweets": ["tweet thread for launch"]
}

Create a complete product validation and launch plan.
`;

  return await callGeminiAPI(prompt);
};

// 18. The 'Why It Didn't Work' Analyzer
export const analyzeFailure = async (failedItem: string): Promise<FailureAnalyzer> => {
  const prompt = `
You are a marketing failure analysis expert. Analyze why this item didn't work.

Failed Item: "${failedItem}"

Generate failure analysis in JSON format:
{
  "failedItem": "${failedItem}",
  "analysis": {
    "positioning": {
      "issues": ["positioning problems identified"],
      "score": score out of 10
    },
    "hookStrength": {
      "issues": ["hook weaknesses"],
      "score": score out of 10
    },
    "visualStructure": {
      "issues": ["visual structure problems"],
      "score": score out of 10
    },
    "toneMismatch": {
      "issues": ["tone mismatch issues"],
      "score": score out of 10
    },
    "offerClarity": {
      "issues": ["offer clarity problems"],
      "score": score out of 10
    },
    "audienceFit": {
      "issues": ["audience fit problems"],
      "score": score out of 10
    }
  },
  "fixedVersion": "improved version of the item",
  "actionPlan": ["specific steps to fix and improve"]
}

Provide detailed analysis of why it failed and how to fix it.
`;

  return await callGeminiAPI(prompt);
};

// 19. Income Stream Generator 360
export const generateIncomeStreams = async (interests: string, skills: string, niche: string): Promise<IncomeStreamGenerator> => {
  const prompt = `
You are an income diversification expert. Create 5 income stream paths for this person.

Interests: "${interests}"
Skills: "${skills}"
Niche: "${niche}"

Generate income streams in JSON format:
{
  "interests": "${interests}",
  "skills": "${skills}",
  "niche": "${niche}",
  "incomeStreams": [
    {
      "type": "income stream type (service/course/SaaS/affiliate/etc.)",
      "description": "detailed description of this income stream",
      "actionPlan": ["step-by-step action plan"],
      "tools": ["recommended tools and platforms"],
      "timeVsReward": {
        "setupTime": "time needed to set up",
        "maintenanceTime": "ongoing time commitment",
        "potentialIncome": "income potential range",
        "scalability": scalability score out of 10
      },
      "rampUpChecklist": ["30-day ramp-up checklist items"]
    }
  ]
}

Create 5 diverse income streams with complete action plans for each.
`;

  return await callGeminiAPI(prompt);
};

// 20. Monetizable Infographic Wizard
export const createInfographic = async (topic: string): Promise<InfographicWizard> => {
  const prompt = `
You are an infographic design expert. Create a viral-style infographic for this topic.

Topic: "${topic}"

Generate infographic design in JSON format:
{
  "topic": "${topic}",
  "infographic": {
    "layout": "visual layout description",
    "headline": "attention-grabbing headline",
    "subheadline": "supporting subheadline",
    "sections": [
      {
        "title": "section title",
        "content": "section content",
        "iconSuggestion": "icon idea for this section"
      }
    ],
    "colorScheme": "recommended color scheme",
    "fontPairings": "recommended font pairings"
  },
  "caption": "social media caption for the infographic",
  "cta": "call-to-action for monetization",
  "monetizationAngle": "how to monetize this infographic",
  "leadMagnetIdea": "related lead magnet idea"
}

Create a visually appealing and monetizable infographic design.
`;

  return await callGeminiAPI(prompt);
};

// 21. Ultimate Digital Product Generator
export const generateDigitalProduct = async (niche: string): Promise<DigitalProductGenerator> => {
  const prompt = `
You are a digital product creation expert. Create a complete digital product for this niche.

Niche: "${niche}"

Generate digital product in JSON format:
{
  "niche": "${niche}",
  "product": {
    "type": "product type (eBook/course/template/etc.)",
    "title": "compelling product title",
    "description": "product description",
    "outline": ["detailed product outline/table of contents"],
    "uniqueSellingPoints": ["unique selling points"]
  },
  "ebook": {
    "chapters": ["chapter titles and descriptions"],
    "pageCount": estimated page count,
    "coverConcept": "cover design concept"
  },
  "leadMagnets": ["3 lead magnet ideas related to the product"],
  "templates": ["printable templates to include"],
  "slidedeckContent": {
    "sections": ["slide deck sections"],
    "slideCount": estimated slide count
  },
  "salesPage": {
    "headline": "sales page headline",
    "painPoints": ["pain points to address"],
    "benefits": ["key benefits to highlight"],
    "testimonialTemplates": ["testimonial templates"],
    "pricingStrategy": "pricing strategy recommendation"
  },
  "pricingTiers": [
    {
      "tier": "tier name",
      "price": price in dollars,
      "includes": ["what's included"],
      "licenseTerms": "license terms description"
    }
  ]
}

Create a complete, sellable digital product package.
`;

  return await callGeminiAPI(prompt);
};

// 22. Creator Collab Connector
export const connectCreatorCollabs = async (
  niche: string,
  followingSize: string,
  platform: string
): Promise<CreatorCollabConnector> => {
  const prompt = `
You are a creator collaboration expert. Design perfect-fit collaborations for this creator.

Niche: "${niche}"
Following Size: "${followingSize}"
Platform: "${platform}"

Generate collaboration plan in JSON format:
{
  "niche": "${niche}",
  "followingSize": "${followingSize}",
  "platform": "${platform}",
  "collaborations": [
    {
      "creatorType": "type of creator to collaborate with",
      "collaborationFormat": "format (duet/podcast/shoutout/etc.)",
      "scriptOutline": "collaboration script outline",
      "valueSplit": "how value is shared between creators",
      "crossPromoCTA": "cross-promotion call-to-action"
    }
  ],
  "outreachTemplates": ["outreach message templates"],
  "collaborationBenefits": ["specific benefits of these collaborations"],
  "successMetrics": ["metrics to track success"]
}

Design 3 perfect collaboration opportunities with detailed execution plans.
`;

  return await callGeminiAPI(prompt);
};