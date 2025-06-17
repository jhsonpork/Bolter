export interface SocialContentResult {
  hook: string;
  script: string;
  hashtags: string[];
  captions: string[];
  platform: string;
  contentType: string;
  trendingElements?: string[];
}

export interface TrendingAudio {
  id: string;
  title: string;
  author: string;
  usage_count: number;
  trending_score: number;
}