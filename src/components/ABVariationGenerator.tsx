import React, { useState } from 'react';
import { Shuffle, Loader2, Lock, Copy, Zap, MessageSquare, MousePointer } from 'lucide-react';
import { generateAdVariations } from '../services/analysis';
import { AdVariation } from '../types/analysis';

interface ABVariationGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ABVariationGenerator: React.FC<ABVariationGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [originalAd, setOriginalAd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<AdVariation | null>(null);

  const handleGenerate = async () => {
    if (!originalAd.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAdVariations(originalAd);
      setVariations(result);
    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getHookIcon = (hookStyle: string) => {
    if (hookStyle.toLowerCase().includes('question')) return '❓';
    if (hookStyle.toLowerCase().includes('shock')) return '⚡';
    if (hookStyle.toLowerCase().includes('story')) return '📖';
    if (hookStyle.toLowerCase().includes('number')) return '🔢';
    if (hookStyle.toLowerCase().includes('curiosity')) return '🤔';
    return '🎯';
  };

  const getToneColor = (tone: string) => {
    const toneColors: { [key: string]: string } = {
      'urgent': 'bg-red-500/20 text-red-400',
      'friendly': 'bg-green-500/20 text-green-400',
      'edgy': 'bg-purple-500/20 text-purple-400',
      'professional': 'bg-blue-500/20 text-blue-400',
      'casual': 'bg-yellow-500/20 text-yellow-400',
      'luxury': 'bg-amber-500/20 text-amber-400'
    };
    
    const lowerTone = tone.toLowerCase();
    for (const [key, value] of Object.entries(toneColors)) {
      if (lowerTone.includes(key)) return value;
    }
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            A/B Variation Generator
          </h2>
          <p className="text-gray-400">
            Generate 5 different variations of your ad for A/B testing
          </p>
        </div>

        {!variations ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Original Ad</label>
                <textarea
                  value={originalAd}
                  onChange={(e) => setOriginalAd(e.target.value)}
                  placeholder="Paste your original ad copy here..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !originalAd.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Variations...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock A/B Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Shuffle className="w-5 h-5" />
                    <span>Generate 5 Variations</span>
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
            {/* Original Ad */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📝 Original Ad</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{variations.original}</p>
              </div>
            </div>

            {/* Variations Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {variations.variations.map((variation, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getHookIcon(variation.hookStyle)}</span>
                      <h4 className="text-white font-bold text-lg">Variation {index + 1}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(variation.fullAd)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Variation Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center space-x-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      <Zap className="w-3 h-3" />
                      <span>{variation.hookStyle}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getToneColor(variation.tone)}`}>
                      {variation.tone}
                    </div>
                    <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      <MousePointer className="w-3 h-3" />
                      <span>{variation.cta}</span>
                    </div>
                  </div>

                  {/* Full Ad Content */}
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed text-sm">{variation.fullAd}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* A/B Testing Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧪 A/B Testing Strategy</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-2">Testing Framework</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Test one element at a time</li>
                    <li>• Run for at least 7 days</li>
                    <li>• Need 100+ conversions for significance</li>
                    <li>• Split traffic 50/50</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Key Metrics</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Click-through rate (CTR)</li>
                    <li>• Conversion rate</li>
                    <li>• Cost per acquisition (CPA)</li>
                    <li>• Return on ad spend (ROAS)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Best Practices</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Test during same time periods</li>
                    <li>• Use same audience targeting</li>
                    <li>• Document all changes</li>
                    <li>• Scale winning variations</li>
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

export default ABVariationGenerator;