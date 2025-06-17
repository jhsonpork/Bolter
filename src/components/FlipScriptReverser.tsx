import React, { useState } from 'react';
import { RotateCcw, Loader2, Lock, Copy, ArrowRight, Shuffle } from 'lucide-react';
import { flipScript } from '../services/advancedFeatures';
import { FlipScriptResult } from '../types/advancedFeatures';

interface FlipScriptReverserProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const FlipScriptReverser: React.FC<FlipScriptReverserProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [originalAd, setOriginalAd] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippedResult, setFlippedResult] = useState<FlipScriptResult | null>(null);

  const handleFlip = async () => {
    if (!originalAd.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsFlipping(true);
    try {
      const result = await flipScript(originalAd);
      setFlippedResult(result);
    } catch (error) {
      console.error('Error flipping script:', error);
    } finally {
      setIsFlipping(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getFlipTypeIcon = (flipType: string) => {
    if (flipType.toLowerCase().includes('framing')) return '🖼️';
    if (flipType.toLowerCase().includes('perspective')) return '👁️';
    if (flipType.toLowerCase().includes('structure')) return '🏗️';
    return '🔄';
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Flip the Script Ad Reverser
          </h2>
          <p className="text-gray-400">
            Creatively flip your ads in unique ways for fresh perspectives
          </p>
        </div>

        {!flippedResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Original Ad Copy</label>
                <textarea
                  value={originalAd}
                  onChange={(e) => setOriginalAd(e.target.value)}
                  placeholder="Paste your ad copy here to flip it in creative ways..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleFlip}
                disabled={isFlipping || !originalAd.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isFlipping ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Flipping Script...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Script Flipper - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    <span>Flip My Script</span>
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
                <p className="text-gray-300 leading-relaxed">{flippedResult.originalAd}</p>
              </div>
            </div>

            {/* Flipped Versions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                🔄 Creative Flips
              </h3>
              
              {flippedResult.flippedVersions.map((version, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFlipTypeIcon(version.flipType)}</span>
                      <div>
                        <h4 className="text-purple-400 font-bold text-lg">{version.flipType} Flip</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-400 text-sm">Effectiveness:</span>
                          <span className={`font-bold ${getEffectivenessColor(version.effectiveness)}`}>
                            {version.effectiveness}/10
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(version.flippedAd)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Before/After Comparison */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 className="text-red-400 font-semibold mb-2 flex items-center space-x-2">
                        <span>Before</span>
                      </h5>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{flippedResult.originalAd}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-green-400 font-semibold mb-2 flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4" />
                        <span>After ({version.flipType})</span>
                      </h5>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{version.flippedAd}</p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h5 className="text-purple-400 font-semibold mb-2">🧠 How This Flip Works</h5>
                    <p className="text-gray-300 text-sm">{version.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Flip Strategy Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 When to Use Each Flip Type</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">🖼️ Framing Flips</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Change problem → solution to solution → problem</li>
                    <li>• Flip negative → positive messaging</li>
                    <li>• Reframe features as benefits</li>
                    <li>• Best for: Mature markets</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-green-400 font-semibold mb-2">👁️ Perspective Flips</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Switch from brand to customer voice</li>
                    <li>• Change first person to second person</li>
                    <li>• Flip insider to outsider view</li>
                    <li>• Best for: Building trust</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-purple-400 font-semibold mb-2">🏗️ Structure Flips</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reverse chronological order</li>
                    <li>• Start with CTA, end with hook</li>
                    <li>• Flip question/answer format</li>
                    <li>• Best for: Pattern interrupts</li>
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

export default FlipScriptReverser;