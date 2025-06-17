import React, { useState } from 'react';
import { Dice6, Loader2, Lock, Copy, Shuffle, Play } from 'lucide-react';
import { spinAdStyleRoulette } from '../services/newFeatures2';
import { AdStyleRoulette as AdStyleRouletteType } from '../types/newFeatures2';

interface AdStyleRouletteProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdStyleRoulette: React.FC<AdStyleRouletteProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [businessType, setBusinessType] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rouletteResult, setRouletteResult] = useState<AdStyleRouletteType | null>(null);

  const businessTypes = [
    'SaaS/Software',
    'E-commerce',
    'Fitness/Health',
    'Food/Restaurant',
    'Beauty/Skincare',
    'Education/Courses',
    'Real Estate',
    'Finance/Investment',
    'Travel/Tourism',
    'Fashion/Apparel'
  ];

  const handleSpin = async () => {
    if (!businessType.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsSpinning(true);
    try {
      const result = await spinAdStyleRoulette(businessType);
      setRouletteResult(result);
    } catch (error) {
      console.error('Error spinning ad style roulette:', error);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStyleIcon = (style: string) => {
    const icons: { [key: string]: string } = {
      'rant': '😤',
      'skit': '🎭',
      'story': '📖',
      'q&a': '❓',
      'interview': '🎤',
      'duet': '👥',
      'stitch': '✂️',
      'vlog': '📹',
      'pov': '👁️'
    };
    return icons[style.toLowerCase()] || '🎬';
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'tiktok': 'text-pink-400',
      'instagram': 'text-purple-400',
      'youtube': 'text-red-400',
      'facebook': 'text-blue-400',
      'twitter': 'text-cyan-400'
    };
    return colors[platform.toLowerCase()] || 'text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ad Style Roulette
          </h2>
          <p className="text-gray-400">
            Spin the wheel and get 10 random ad styles with complete content for each
          </p>
        </div>

        {!rouletteResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Business Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select Business Type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSpin}
                disabled={isSpinning || !businessType.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSpinning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Spinning Roulette...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Style Roulette - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Dice6 className="w-5 h-5" />
                    <span>Spin for 10 Random Styles</span>
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
            {/* Header */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎰 10 Random Ad Styles for {rouletteResult.businessType}
              </h3>
              <button
                onClick={handleSpin}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Shuffle className="w-4 h-4" />
                <span>Spin Again</span>
              </button>
            </div>

            {/* Random Styles */}
            <div className="grid lg:grid-cols-2 gap-6">
              {rouletteResult.randomStyles.map((style, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getStyleIcon(style.style)}</span>
                      <div>
                        <h4 className="text-yellow-400 font-bold text-lg">{style.style}</h4>
                        <span className={`text-sm font-medium ${getPlatformColor(style.platform)}`}>
                          Best for {style.platform}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(`${style.style} Style\n\nScript:\n${style.script}\n\nCaption:\n${style.caption}\n\nHook:\n${style.hook}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hook */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                    <h5 className="text-blue-400 font-semibold mb-2">🎣 Hook</h5>
                    <p className="text-gray-300 text-sm">{style.hook}</p>
                  </div>

                  {/* Script */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">📝 Complete Script</h5>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{style.script}</p>
                  </div>

                  {/* Caption */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                    <h5 className="text-green-400 font-semibold mb-2">📱 Caption</h5>
                    <p className="text-gray-300 text-sm">{style.caption}</p>
                  </div>

                  {/* Unique Elements */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <h5 className="text-purple-400 font-semibold mb-2">✨ Unique Elements</h5>
                    <ul className="space-y-1">
                      {style.uniqueElements.map((element, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{element}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Style Explanations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📚 Style Execution Guide</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-red-400 font-semibold mb-2">😤 Rant Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.rant}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-purple-400 font-semibold mb-2">🎭 Skit Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.skit}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-blue-400 font-semibold mb-2">📖 Story Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.story}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-green-400 font-semibold mb-2">❓ Q&A Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.qa}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">🎤 Interview Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.interview}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-pink-400 font-semibold mb-2">👥 Duet Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.duet}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-cyan-400 font-semibold mb-2">✂️ Stitch Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.stitch}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-orange-400 font-semibold mb-2">📹 Vlog Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.vlog}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-indigo-400 font-semibold mb-2">👁️ POV Style</h5>
                    <p className="text-gray-300 text-sm">{rouletteResult.styleExplanations.pov}</p>
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

export default AdStyleRoulette;