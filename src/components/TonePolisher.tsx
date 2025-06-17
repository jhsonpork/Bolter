import React, { useState } from 'react';
import { Palette, Loader2, Lock, Copy, Sparkles, Crown, Zap, Building, Heart } from 'lucide-react';
import { polishTone } from '../services/analysis';
import { TonePolish } from '../types/analysis';

interface TonePolisherProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const TonePolisher: React.FC<TonePolisherProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [rawText, setRawText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [polishedVersions, setPolishedVersions] = useState<TonePolish | null>(null);

  const handleGenerate = async () => {
    if (!rawText.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await polishTone(rawText);
      setPolishedVersions(result);
    } catch (error) {
      console.error('Error polishing tone:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toneStyles = [
    {
      key: 'genZ' as keyof TonePolish['polishedVersions'],
      label: 'Gen Z',
      icon: Zap,
      color: 'from-pink-500 to-purple-500',
      description: 'Trendy, casual with modern slang'
    },
    {
      key: 'luxury' as keyof TonePolish['polishedVersions'],
      label: 'Luxury',
      icon: Crown,
      color: 'from-amber-500 to-yellow-500',
      description: 'Sophisticated and exclusive'
    },
    {
      key: 'edgy' as keyof TonePolish['polishedVersions'],
      label: 'Edgy',
      icon: Zap,
      color: 'from-red-500 to-orange-500',
      description: 'Bold and provocative'
    },
    {
      key: 'minimalist' as keyof TonePolish['polishedVersions'],
      label: 'Minimalist',
      icon: Sparkles,
      color: 'from-gray-500 to-slate-500',
      description: 'Clean, simple, and direct'
    },
    {
      key: 'corporate' as keyof TonePolish['polishedVersions'],
      label: 'Corporate',
      icon: Building,
      color: 'from-blue-500 to-indigo-500',
      description: 'Professional and business-focused'
    }
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Copy Tone Polisher
          </h2>
          <p className="text-gray-400">
            Transform your content for different audiences and platforms
          </p>
        </div>

        {!polishedVersions ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Raw Text to Polish</label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste your raw content here - could be a rough draft, notes, or any text you want to polish for different audiences..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !rawText.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Polishing for 5 Tones...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Tone Polisher - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-5 h-5" />
                    <span>Polish for 5 Different Tones</span>
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
            {/* Original Text */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📝 Original Text</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{polishedVersions.originalText}</p>
              </div>
            </div>

            {/* Polished Versions */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {toneStyles.map((style) => {
                const IconComponent = style.icon;
                return (
                  <div key={style.key} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${style.color}`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{style.label}</h4>
                          <p className="text-gray-400 text-xs">{style.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(polishedVersions.polishedVersions[style.key])}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {polishedVersions.polishedVersions[style.key]}
                      </p>
                    </div>

                    {/* Tone Characteristics */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {style.key === 'genZ' && (
                        <>
                          <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs">Casual</span>
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">Trendy</span>
                        </>
                      )}
                      {style.key === 'luxury' && (
                        <>
                          <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">Premium</span>
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Exclusive</span>
                        </>
                      )}
                      {style.key === 'edgy' && (
                        <>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Bold</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">Provocative</span>
                        </>
                      )}
                      {style.key === 'minimalist' && (
                        <>
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">Simple</span>
                          <span className="bg-slate-500/20 text-slate-400 px-2 py-1 rounded text-xs">Direct</span>
                        </>
                      )}
                      {style.key === 'corporate' && (
                        <>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Professional</span>
                          <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-xs">Formal</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Usage Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 When to Use Each Tone</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-pink-400 font-semibold mb-2">Gen Z Tone</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• TikTok content</li>
                    <li>• Instagram Stories</li>
                    <li>• Youth-focused brands</li>
                    <li>• Casual social media</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-amber-400 font-semibold mb-2">Luxury Tone</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• High-end products</li>
                    <li>• Premium services</li>
                    <li>• Exclusive offers</li>
                    <li>• Affluent audiences</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-red-400 font-semibold mb-2">Edgy Tone</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Disruptive brands</li>
                    <li>• Attention-grabbing ads</li>
                    <li>• Controversial topics</li>
                    <li>• Bold statements</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-gray-400 font-semibold mb-2">Minimalist Tone</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Tech products</li>
                    <li>• Clean brands</li>
                    <li>• Simple messaging</li>
                    <li>• Modern aesthetics</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">Corporate Tone</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• B2B communications</li>
                    <li>• Professional services</li>
                    <li>• Formal presentations</li>
                    <li>• Enterprise solutions</li>
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

export default TonePolisher;