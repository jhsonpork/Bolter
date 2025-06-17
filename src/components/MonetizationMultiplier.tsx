import React, { useState } from 'react';
import { DollarSign, Loader2, Lock, Copy, TrendingUp, BarChart, Package } from 'lucide-react';
import { multiplyMonetization } from '../services/businessFeatures';
import { MonetizationMultiplierResult } from '../types/businessFeatures';

interface MonetizationMultiplierProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const MonetizationMultiplier: React.FC<MonetizationMultiplierProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [pricingInfo, setPricingInfo] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [monetizationResult, setMonetizationResult] = useState<MonetizationMultiplierResult | null>(null);

  const handleAnalyze = async () => {
    if (!pricingInfo.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await multiplyMonetization(pricingInfo);
      setMonetizationResult(result);
    } catch (error) {
      console.error('Error analyzing monetization opportunities:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Monetization Multiplier™
          </h2>
          <p className="text-gray-400">
            Discover untapped revenue streams and optimize your pricing structure
          </p>
        </div>

        {!monetizationResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">SaaS Pricing Page or Service Description</label>
                <textarea
                  value={pricingInfo}
                  onChange={(e) => setPricingInfo(e.target.value)}
                  placeholder="Paste your current pricing tiers, service description, or business model details..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !pricingInfo.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Revenue Opportunities...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Monetization Multiplier - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Discover Untapped Revenue</span>
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
            {/* Current Pricing */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📊 Current Pricing Analysis</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{monetizationResult.pricingInfo}</p>
              </div>
            </div>

            {/* Revenue Streams */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-green-400 font-bold text-lg mb-4">💰 Untapped Revenue Streams</h4>
              <div className="space-y-4">
                {monetizationResult.revenueStreams.map((stream, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <h5 className="text-green-400 font-semibold">{stream.stream}</h5>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{stream.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1">Implementation:</h6>
                        <p className="text-gray-300 text-sm">{stream.implementation}</p>
                      </div>
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1">Revenue Impact:</h6>
                        <p className="text-green-400 font-semibold">{stream.revenueImpact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier Restructuring */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-blue-400 font-bold text-lg mb-4">🔄 Tier Restructuring</h4>
              <div className="space-y-4">
                {monetizationResult.tierRestructuring.map((tier, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1">Current Tier:</h6>
                        <p className="text-gray-300 text-sm">{tier.currentTier}</p>
                      </div>
                      <div>
                        <h6 className="text-white text-sm font-semibold mb-1">Suggested Tier:</h6>
                        <p className="text-blue-400 font-semibold">{tier.suggestedTier}</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-white text-sm font-semibold mb-1">Changes:</h6>
                      <ul className="space-y-1">
                        {tier.changes.map((change, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 bg-blue-500/5 p-2 rounded">
                      <h6 className="text-white text-sm font-semibold mb-1">Projected Increase:</h6>
                      <p className="text-green-400 font-semibold">{tier.projectedIncrease}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Margin Add-Ons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">High-Margin Add-Ons</h4>
                </div>
                <div className="space-y-2">
                  {monetizationResult.addOns.map((addOn, index) => (
                    <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{addOn}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart className="w-6 h-6 text-yellow-400" />
                  <h4 className="text-yellow-400 font-bold text-lg">Enterprise Tier</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h6 className="text-white text-sm font-semibold mb-1">Features:</h6>
                    <ul className="space-y-1">
                      {monetizationResult.enterpriseTier.features.map((feature, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <h6 className="text-white text-sm font-semibold mb-1">Pricing Strategy:</h6>
                    <p className="text-gray-300 text-sm">{monetizationResult.enterpriseTier.pricing}</p>
                  </div>
                  <div>
                    <h6 className="text-white text-sm font-semibold mb-1">Target Customers:</h6>
                    <p className="text-gray-300 text-sm">{monetizationResult.enterpriseTier.targetCustomers}</p>
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

export default MonetizationMultiplier;