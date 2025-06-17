import React, { useState } from 'react';
import { Target, Loader2, Lock, Copy, TrendingUp, DollarSign, Users } from 'lucide-react';
import { matchOfferAngles } from '../services/moreFeatures';
import { OfferAngleMatcher as OfferAngleMatcherType } from '../types/moreFeatures';

interface OfferAngleMatcherProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const OfferAngleMatcher: React.FC<OfferAngleMatcherProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [product, setProduct] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [offerMatch, setOfferMatch] = useState<OfferAngleMatcherType | null>(null);

  const handleMatch = async () => {
    if (!product.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsMatching(true);
    try {
      const result = await matchOfferAngles(product);
      setOfferMatch(result);
    } catch (error) {
      console.error('Error matching offer angles:', error);
    } finally {
      setIsMatching(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
            Offer Angle Matcher
          </h2>
          <p className="text-gray-400">
            Match your product to 7 proven offer types and find what converts best
          </p>
        </div>

        {!offerMatch ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Product Description</label>
                <textarea
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Describe your product or service in detail..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleMatch}
                disabled={isMatching || !product.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Matching Offer Angles...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Offer Matcher - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    <span>Match to 7 Offer Types</span>
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
            {/* Product */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📦 Product Analysis</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300">{offerMatch.product}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Best Angles by Goal</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                  <h5 className="text-pink-400 font-semibold mb-2">For Virality</h5>
                  <p className="text-white text-sm">{offerMatch.recommendations.virality}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <h5 className="text-green-400 font-semibold mb-2">For Conversion</h5>
                  <p className="text-white text-sm">{offerMatch.recommendations.conversion}</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-blue-400 font-semibold mb-2">For LTV</h5>
                  <p className="text-white text-sm">{offerMatch.recommendations.ltv}</p>
                </div>
              </div>
            </div>

            {/* Offer Angles */}
            <div className="grid lg:grid-cols-2 gap-6">
              {offerMatch.offerAngles.map((angle, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-yellow-400 font-bold text-lg">{angle.type}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-gray-400 text-sm">Effectiveness:</span>
                        <span className={`font-bold ${getEffectivenessColor(angle.effectiveness)}`}>
                          {angle.effectiveness}/10
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(`${angle.headline}\n${angle.subheadline}\n\n${angle.hook}\n\n${angle.primaryCTA}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold mb-1">Headline</h5>
                      <p className="text-gray-300 text-sm">{angle.headline}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold mb-1">Subheadline</h5>
                      <p className="text-gray-300 text-sm">{angle.subheadline}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold mb-1">Hook</h5>
                      <p className="text-gray-300 text-sm">{angle.hook}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold mb-1">Primary CTA</h5>
                      <p className="text-yellow-400 text-sm font-medium">{angle.primaryCTA}</p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <h5 className="text-blue-400 font-semibold mb-1">Best For</h5>
                      <p className="text-gray-300 text-sm">{angle.bestFor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Offer Diagnosis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">🔍 Current Offer Diagnosis</h4>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-gray-300">{offerMatch.currentOfferDiagnosis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferAngleMatcher;