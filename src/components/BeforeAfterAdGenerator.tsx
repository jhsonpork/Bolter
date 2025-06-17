import React, { useState } from 'react';
import { ArrowUpDown, Loader2, Lock, Copy, TrendingDown, TrendingUp } from 'lucide-react';
import { generateBeforeAfterAds } from '../services/advancedFeatures';
import { BeforeAfterAd } from '../types/advancedFeatures';

interface BeforeAfterAdGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const BeforeAfterAdGenerator: React.FC<BeforeAfterAdGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productOrNiche, setProductOrNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [beforeAfterAds, setBeforeAfterAds] = useState<BeforeAfterAd | null>(null);

  const handleGenerate = async () => {
    if (!productOrNiche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateBeforeAfterAds(productOrNiche);
      setBeforeAfterAds(result);
    } catch (error) {
      console.error('Error generating before/after ads:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getImpactColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes('tiktok')) return '🎵';
    if (platform.toLowerCase().includes('facebook')) return '📘';
    if (platform.toLowerCase().includes('twitter') || platform.toLowerCase().includes('x')) return '🐦';
    return '📱';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Before/After Ad Generator
          </h2>
          <p className="text-gray-400">
            Create transformation-focused ads with powerful before/after contrasts
          </p>
        </div>

        {!beforeAfterAds ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Product or Niche</label>
                <input
                  type="text"
                  value={productOrNiche}
                  onChange={(e) => setProductOrNiche(e.target.value)}
                  placeholder="e.g., weight loss program, productivity app, skincare routine..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !productOrNiche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Before/After Ads...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Before/After Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="w-5 h-5" />
                    <span>Generate 3 Before/After Ads</span>
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
                🔄 Before/After Ads for {beforeAfterAds.productOrNiche}
              </h3>
            </div>

            <div className="space-y-8">
              {beforeAfterAds.beforeAfterAds.map((ad, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getPlatformIcon(ad.platform)}</span>
                      <div>
                        <h4 className="text-yellow-400 font-bold text-lg">Ad #{index + 1} - {ad.platform}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-400 text-sm">Emotional Impact:</span>
                          <span className={`font-bold ${getImpactColor(ad.emotionalImpact)}`}>
                            {ad.emotionalImpact}/10
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(ad.fullAd)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Before/After Contrast */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-red-400" />
                        <h5 className="text-red-400 font-semibold">BEFORE (Pain State)</h5>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{ad.before}</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <h5 className="text-green-400 font-semibold">AFTER (Desired State)</h5>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{ad.after}</p>
                    </div>
                  </div>

                  {/* Full Ad Copy */}
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-3">📝 Complete Ad Copy</h5>
                    <p className="text-gray-300 leading-relaxed">{ad.fullAd}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Before/After Strategy Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📈 Before/After Ad Strategy</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-red-400 font-semibold mb-3">😰 Crafting the "Before"</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Make it relatable and specific</li>
                    <li>• Use emotional language</li>
                    <li>• Include time/effort frustrations</li>
                    <li>• Reference failed attempts</li>
                    <li>• Paint a vivid picture of struggle</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">😍 Designing the "After"</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Show specific, measurable results</li>
                    <li>• Include emotional benefits</li>
                    <li>• Make it aspirational but believable</li>
                    <li>• Use sensory descriptions</li>
                    <li>• Connect to deeper desires</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold mb-3">🎯 Maximizing Impact</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Use visual metaphors</li>
                    <li>• Include timeframes</li>
                    <li>• Add social proof elements</li>
                    <li>• Create urgency around transformation</li>
                    <li>• End with clear next steps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Platform-Specific Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📱 Platform Optimization Tips</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-pink-400 font-semibold mb-2">🎵 TikTok/Reels</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use split-screen visuals</li>
                    <li>• Quick transitions between states</li>
                    <li>• Add trending audio</li>
                    <li>• Include text overlays</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">📘 Facebook/Instagram</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use carousel format</li>
                    <li>• Include testimonials</li>
                    <li>• Add before/after images</li>
                    <li>• Use longer-form storytelling</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-cyan-400 font-semibold mb-2">🐦 Twitter/X</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Create thread format</li>
                    <li>• Use emojis for contrast</li>
                    <li>• Include poll elements</li>
                    <li>• Add relevant hashtags</li>
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

export default BeforeAfterAdGenerator;