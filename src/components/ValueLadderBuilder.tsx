import React, { useState } from 'react';
import { BarChartHorizontal, Loader2, Lock, Copy, DollarSign } from 'lucide-react';
import { buildValueLadder } from '../services/moreFeatures';
import { ValueLadderBuilder as ValueLadderBuilderType } from '../types/moreFeatures';

interface ValueLadderBuilderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ValueLadderBuilder: React.FC<ValueLadderBuilderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [currentOffer, setCurrentOffer] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [valueLadder, setValueLadder] = useState<ValueLadderBuilderType | null>(null);

  const handleBuild = async () => {
    if (!currentOffer.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsBuilding(true);
    try {
      const result = await buildValueLadder(currentOffer);
      setValueLadder(result);
    } catch (error) {
      console.error('Error building value ladder:', error);
    } finally {
      setIsBuilding(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPriceColor = (price: string) => {
    if (price.includes('$9')) return 'text-blue-400';
    if (price.includes('$49')) return 'text-green-400';
    if (price.includes('$199')) return 'text-purple-400';
    if (price.includes('$1K')) return 'text-yellow-400';
    return 'text-white';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Value Ladder Builder
          </h2>
          <p className="text-gray-400">
            Build a complete revenue ladder from $9 to $1K+ offers
          </p>
        </div>

        {!valueLadder ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Current Offer</label>
                <textarea
                  value={currentOffer}
                  onChange={(e) => setCurrentOffer(e.target.value)}
                  placeholder="Describe your current product or offer in detail..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleBuild}
                disabled={isBuilding || !currentOffer.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Building Value Ladder...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Value Ladder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <BarChartHorizontal className="w-5 h-5" />
                    <span>Build Value Ladder</span>
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
            {/* Current Offer */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📦 Current Offer</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300">{valueLadder.currentOffer}</p>
              </div>
            </div>

            {/* Value Ladder Visualization */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-6">🪜 Value Ladder</h4>
              <div className="relative">
                {/* Ladder Steps */}
                <div className="flex flex-col space-y-4">
                  {valueLadder.revenueLadder.map((tier, index) => (
                    <div 
                      key={index} 
                      className={`bg-gray-900/50 rounded-lg p-4 border-l-4 ${
                        tier.price.includes('$9') ? 'border-blue-400' :
                        tier.price.includes('$49') ? 'border-green-400' :
                        tier.price.includes('$199') ? 'border-purple-400' :
                        'border-yellow-400'
                      }`}
                      style={{
                        width: `${75 + (index * 8)}%`,
                        marginLeft: `${index * 5}%`
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className={`font-bold ${getPriceColor(tier.price)}`}>{tier.price}</h5>
                        <button
                          onClick={() => handleCopy(`${tier.price} - ${tier.offer}\n\nEmail: ${tier.emailCopy}\n\nAd: ${tier.adCopy}`)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white font-medium mb-2">{tier.offer}</p>
                      <p className="text-gray-400 text-sm mb-1">Target: {tier.target}</p>
                    </div>
                  ))}
                </div>
                
                {/* Connecting Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-green-400 to-yellow-400 rounded-full" style={{ left: '2%' }}></div>
              </div>
            </div>

            {/* Detailed Tiers */}
            <div className="space-y-6">
              {valueLadder.revenueLadder.map((tier, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        tier.price.includes('$9') ? 'bg-blue-500/20' :
                        tier.price.includes('$49') ? 'bg-green-500/20' :
                        tier.price.includes('$199') ? 'bg-purple-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        <DollarSign className={`w-5 h-5 ${getPriceColor(tier.price)}`} />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg ${getPriceColor(tier.price)}`}>{tier.price}</h4>
                        <p className="text-gray-400 text-sm">Target: {tier.target}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">Offer</h5>
                    <p className="text-gray-300 text-sm">{tier.offer}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-semibold">Email Copy</h5>
                        <button
                          onClick={() => handleCopy(tier.emailCopy)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{tier.emailCopy}</p>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-semibold">Ad Copy</h5>
                        <button
                          onClick={() => handleCopy(tier.adCopy)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{tier.adCopy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategy Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Value Ladder Strategy</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Implementation Tips</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Launch tiers sequentially, not all at once</li>
                    <li>• Create clear upgrade paths between tiers</li>
                    <li>• Use email sequences to move customers up</li>
                    <li>• Offer bundle discounts for multiple tiers</li>
                    <li>• Test different price points within each tier</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Conversion Optimization</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Start with low-ticket offers to build trust</li>
                    <li>• Use order bumps and upsells strategically</li>
                    <li>• Create scarcity for higher-ticket offers</li>
                    <li>• Segment email list by purchase history</li>
                    <li>• Provide exceptional value at each tier</li>
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

export default ValueLadderBuilder;