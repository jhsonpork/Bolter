import { SocialContentResult } from '../types/social';
import { callGeminiAPI } from './gemini';

export const generateSocialContent = async (
  businessDescription: string,
  platform: string,
  contentType: string
): Promise<SocialContentResult> => {
  const platformSpecs = {
    tiktok: 'TikTok (15-60 seconds, vertical video, trending sounds)',
    twitter: 'Twitter/X (280 characters, engaging threads)',
    instagram: 'Instagram (Reels, Stories, Posts with visual appeal)',
    youtube: 'YouTube Shorts (60 seconds, vertical, engaging thumbnails)'
  };

  const contentTypeSpecs = {
    viral: 'viral hooks that stop scrolling and get massive engagement',
    educational: 'educational content that provides value and builds authority',
    'behind-scenes': 'behind-the-scenes content that builds personal connection',
    trending: 'trending topic content that rides current waves'
  };

  const prompt = `
You are a viral social media expert. Create ${contentTypeSpecs[contentType as keyof typeof contentTypeSpecs]} for ${platformSpecs[platform as keyof typeof platformSpecs]}.

Business: "${businessDescription}"
Platform: ${platform}
Content Type: ${contentType}

Generate the following in JSON format:
{
  "hook": "Attention-grabbing opening line that stops scrolling (max 10 words)",
  "script": "Complete ${platform} script with timing, visual cues, and dialogue. Include hook, content, and CTA.",
  "hashtags": ["15-20 relevant hashtags without # symbol"],
  "captions": ["3 different caption variations optimized for ${platform}"],
  "platform": "${platform}",
  "contentType": "${contentType}",
  "trendingElements": ["3-5 trending elements to incorporate (sounds, effects, formats)"]
}

Make it platform-specific, highly engaging, and optimized for viral potential. Include current trends and proven viral formulas.
`;

  return await callGeminiAPI(prompt);
};

// Mock trending audio data instead of API call
export const getMockTrendingAudio = () => {
  return [
    {
      id: 'trending-1',
      title: 'Viral Business Sound',
      author: 'TikTok Creator',
      usage_count: 45000,
      trending_score: 95
    },
    {
      id: 'trending-2',
      title: 'Motivational Beat',
      author: 'Music Producer',
      usage_count: 32000,
      trending_score: 88
    },
    {
      id: 'trending-3',
      title: 'Success Story Audio',
      author: 'Entrepreneur',
      usage_count: 28000,
      trending_score: 82
    },
    {
      id: 'trending-4',
      title: 'Growth Mindset Sound',
      author: 'Business Coach',
      usage_count: 21000,
      trending_score: 76
    },
    {
      id: 'trending-5',
      title: 'Hustle Culture Beat',
      author: 'Content Creator',
      usage_count: 18000,
      trending_score: 71
    }
  ];
};