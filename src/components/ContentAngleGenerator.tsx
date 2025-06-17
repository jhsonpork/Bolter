import React, { useState } from 'react';
import { Lightbulb, Loader2, Lock, Copy, Hash, MessageSquare, Zap } from 'lucide-react';
import { generateContentAngles } from '../services/analysis';
import { ContentAngle } from '../types/analysis';

interface ContentAngleGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ContentAngleGenerator: React.FC<ContentAngleGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [nicheOrProduct, setNicheOrProduct] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [angles, setAngles] = useState<ContentAngle[] | null>(null);

  const handleGenerate = async () => {
    if (!nicheOrProduct.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContentAngles(nicheOrProduct);
      setAngles(result);
    } catch (error) {
      console.error('Error generating content angles:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      'fear': 'bg-red-500/20 text-red-400',
      'excitement': 'bg-yellow-500/20 text-yellow-400',
      'curiosity': 'bg-purple-500/20 text-purple-400',
      'anger': 'bg-red-600/20 text-red-500',
      'joy': 'bg-green-500/20 text-green-400',
      'trust': 'bg-blue-500/20 text-blue-400',
      'surprise': 'bg-pink-500/20 text-pink-400',
      'anticipation': 'bg-orange-500/20 text-orange-400'
    };
    
    const lowerEmotion = emotion.toLowerCase();
    for (const [key, value] of Object.entries(colors)) {
      if (lowerEmotion.includes(key)) return value;
    }
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Content Angle Generator
          </h2>
          <p className="text-gray-400">
            Generate 15 unique content angles and hooks for endless creative ideas
          </p>
        </div>

        {!angles ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Niche or Product</label>
                <input
                  type="text"
                  value={nicheOrProduct}
                  onChange={(e) => setNicheOrProduct(e.target.value)}
                  placeholder="e.g., weight loss supplements, productivity apps, real estate..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !nicheOrProduct.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Angles...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Angle Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-5 h-5" />
                    <span>Generate 15 Content Angles</span>
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
                15 Content Angles for {nicheOrProduct}
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {angles.map((angle, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-yellow-400 font-bold text-lg">{angle.title}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getEmotionColor(angle.emotionalTrigger)}`}>
                        {angle.emotionalTrigger}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(`${angle.title}\n\nTikTok: ${angle.tiktokHook}\nTweet: ${angle.tweetFormat}\nAd: ${angle.adHeadline}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{angle.description}</p>

                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Hash className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-400 font-semibold text-sm">TikTok Hook</span>
                      </div>
                      <p className="text-gray-300 text-sm">{angle.tiktokHook}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold text-sm">Tweet Format</span>
                      </div>
                      <p className="text-gray-300 text-sm">{angle.tweetFormat}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold text-sm">Ad Headline</span>
                      </div>
                      <p className="text-gray-300 text-sm">{angle.adHeadline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentAngleGenerator;