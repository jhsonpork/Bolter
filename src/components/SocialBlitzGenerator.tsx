import React, { useState } from 'react';
import { Video, Loader2, Lock, Copy, Hash, TrendingUp, Music } from 'lucide-react';
import { generateSocialContent, getMockTrendingAudio } from '../services/social';
import { SocialContentResult } from '../types/social';

interface SocialBlitzGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const SocialBlitzGenerator: React.FC<SocialBlitzGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [contentType, setContentType] = useState('viral');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<SocialContentResult | null>(null);

  const platforms = [
    { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
    { id: 'twitter', label: 'Twitter/X', emoji: '🐦' },
    { id: 'instagram', label: 'Instagram', emoji: '📸' },
    { id: 'youtube', label: 'YouTube Shorts', emoji: '📺' },
  ];

  const contentTypes = [
    { id: 'viral', label: 'Viral Hook', emoji: '🔥' },
    { id: 'educational', label: 'Educational', emoji: '🎓' },
    { id: 'behind-scenes', label: 'Behind Scenes', emoji: '🎬' },
    { id: 'trending', label: 'Trending Topic', emoji: '📈' },
  ];

  const handleGenerate = async () => {
    if (!businessDescription.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateSocialContent(businessDescription, platform, contentType);
      setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating social content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const trendingAudio = getMockTrendingAudio();

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Social Media Blitz Generator
          </h2>
          <p className="text-gray-400">
            Generate viral hooks, scripts, hashtags, and trending content for all platforms
          </p>
        </div>

        {!generatedContent ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              {/* Platform Selector */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Platform</label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        platform === p.id
                          ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-lg mb-1">{p.emoji}</div>
                      <div>{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Selector */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Content Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        contentType === type.id
                          ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.emoji}</div>
                      <div>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">Business Description</label>
                <textarea
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="Describe your business and what content you want to create..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !businessDescription.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Content...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Social Blitz - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    <span>Generate Social Content</span>
                  </>
                )}
              </button>
              
              {!hasUsedFreeTrial && (
                <p className="text-center text-gray-400 text-sm mt-3">
                  ✨ Free trial • No credit card required
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Generated Content */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Viral Hook</h3>
                    <button
                      onClick={() => handleCopy(generatedContent.hook)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white text-lg font-semibold">{generatedContent.hook}</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Full Script</h3>
                    <button
                      onClick={() => handleCopy(generatedContent.script)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-gray-900/50 rounded-lg p-4">
                    {generatedContent.script}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Hashtags</h3>
                    <button
                      onClick={() => handleCopy(generatedContent.hashtags.join(' '))}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((hashtag, index) => (
                      <span key={index} className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Caption Variations</h3>
                  <div className="space-y-3">
                    {generatedContent.captions.map((caption, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-yellow-400 font-semibold">#{index + 1}</span>
                          <button
                            onClick={() => handleCopy(caption)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm">{caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Audio & Analytics */}
              <div className="space-y-6">
                {platform === 'tiktok' && (
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Music className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-yellow-400 font-bold text-lg">Popular Audio Suggestions</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {trendingAudio.slice(0, 5).map((audio, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">{audio.title}</p>
                              <p className="text-gray-400 text-sm">{audio.author}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-green-400 text-sm">
                              <TrendingUp className="w-3 h-3" />
                              <span>{Math.floor(audio.usage_count / 1000)}K</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Content Strategy</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">Best Posting Times</h4>
                      <p className="text-gray-300 text-sm">
                        {platform === 'tiktok' ? '6-10 AM, 7-9 PM EST' : 
                         platform === 'twitter' ? '8-10 AM, 7-9 PM EST' :
                         platform === 'instagram' ? '11 AM-1 PM, 7-9 PM EST' :
                         '2-4 PM, 8-10 PM EST'}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">Engagement Tips</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Post consistently (1-3x daily)</li>
                        <li>• Respond to comments within 1 hour</li>
                        <li>• Use trending sounds/hashtags</li>
                        <li>• Create series content</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Performance Predictions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Expected Views</span>
                      <span className="text-green-400 font-semibold">
                        {platform === 'tiktok' ? '50K-200K' : 
                         platform === 'twitter' ? '5K-25K' :
                         platform === 'instagram' ? '10K-50K' :
                         '25K-100K'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Engagement Rate</span>
                      <span className="text-green-400 font-semibold">
                        {platform === 'tiktok' ? '8-15%' : 
                         platform === 'twitter' ? '2-5%' :
                         platform === 'instagram' ? '3-8%' :
                         '5-12%'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Viral Potential</span>
                      <span className="text-green-400 font-semibold">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialBlitzGenerator;