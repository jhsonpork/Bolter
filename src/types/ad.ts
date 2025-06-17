export interface AdResult {
  headline: string;
  adCopy: string;
  tiktokScript: string;
  captions: string[];
  businessType: string;
  tone?: string;
  performanceEstimate?: {
    engagementRate: number;
    clickThroughRate: number;
    conversionRate: number;
  };
}

export interface CampaignDay {
  day: number;
  theme: string;
  headline: string;
  adCopy: string;
  tiktokScript: string;
  captions: string[];
}

export interface SavedCampaign {
  id: string;
  name: string;
  ad?: AdResult;
  campaign?: CampaignDay[];
  createdAt: string;
  type: 'single' | 'campaign';
}

export interface RewriteResult {
  originalAd: string;
  rewrittenAd: string;
  improvements: string[];
  tone: string;
}