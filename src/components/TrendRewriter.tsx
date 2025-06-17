import React, { useState } from 'react';
import { TrendingUp, Loader2, Lock, Copy, Hash, Video, Zap } from 'lucide-react';
import { rewriteTrend } from '../services/analysis';
import { TrendRewrite } from '../types/analysis';

interface TrendRewriterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const TrendRewriter: React.FC<TrendRewriterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [trendTopic, setTrendTopic] = useState('');
  const [userNiche, setUserNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [rewrite, setRewrite] = useState<TrendRewrite | null>(null);

  const handleGenerate = async () => {
    if (!trendTopic.trim() || !userNiche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await rewriteTrend(trendTopic, userNiche);
      setRewrite(result);
    } catch (error) {
      console.error('Error rewriting trend:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const trendExamples = [
    "AI is taking over jobs",
    "New iPhone release",
    "Celebrity scandal",
    "Economic recession fears",
    "Climate change protests",
    "Viral TikTok dance",
    "Sports championship",
    "Movie release buzz"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            AI Trend Rewriter
          </h2>
          <p className="text-gray-400">
            Turn any trending topic into content for your niche without APIs
          </p>
        </div>

        {!rewrite ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Trending Topic</label>
                  <input
                    type="text"
                    value={trendTopic}
                    onChange={(e) => setTrendTopic(e.target.value)}
                    placeholder="e.g., AI is taking over jobs, New iPhone release..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                  <div className="mt-2">
                    <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {trendExamples.slice(0, 4).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setTrendTopic(example)}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Your Niche</label>
                  <input
                    type="text"
                    value={userNiche}
                    onChange={(e) => setUserNiche(e.target.value)}
                    placeholder="e.g., fitness coaching, real estate, productivity apps..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !trendTopic.trim() || !userNiche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Rewriting Trend...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Trend Rewriter - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Rewrite for My Niche</span>
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
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Trend Adapted for {rewrite.niche}
              </h3>
              <p className="text-gray-400">Original: "{rewrite.originalTrend}"</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Twitter Version */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-blue-400" />
                    <h4 className="text-blue-400 font-bold text-lg">Twitter/X Post</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(rewrite.tweetVersion)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{rewrite.tweetVersion}</p>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  {rewrite.tweetVersion.length}/280 characters
                </div>
              </div>

              {/* TikTok/Reel Script */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-pink-400" />
                    <h4 className="text-pink-400 font-bold text-lg">TikTok/Reel Script</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(rewrite.scriptVersion)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{rewrite.scriptVersion}</p>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  ~30 second script
                </div>
              </div>

              {/* Facebook Ad */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <h4 className="text-green-400 font-bold text-lg">Facebook Ad</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(rewrite.adVersion)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{rewrite.adVersion}</p>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Ready for Meta Ads Manager
                </div>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Trendjacking Tips</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Best Practices</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Post within 24-48 hours of trend peak</li>
                    <li>• Add your unique perspective or twist</li>
                    <li>• Use relevant hashtags for discoverability</li>
                    <li>• Engage with comments quickly</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Timing Strategy</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Twitter: Post immediately while trending</li>
                    <li>• TikTok: Create video within 2-3 days</li>
                    <li>• Facebook: Run ad when trend is still relevant</li>
                    <li>• Monitor trend lifecycle for optimal timing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendRewriter;