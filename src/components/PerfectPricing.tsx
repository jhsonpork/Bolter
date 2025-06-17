import React, { useState } from 'react';
import { DollarSign, Loader2, Lock, Copy, BarChart, TrendingUp, Users } from 'lucide-react';
import { generatePerfectPricing } from '../services/businessFeatures';
import { PerfectPricingResult } from '../types/businessFeatures';

interface PerfectPricingProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PerfectPricing: React.FC<PerfectPricingProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productDescription, setProductDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [competitorPricing, setCompetitorPricing] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [pricingResult, setPricingResult] = useState<PerfectPricingResult | null>(null);

  const handleCalculate = async () => {
    if (!productDescription.trim() || !targetMarket.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsCalculating(true);
    try {
      const result = await generatePerfectPricing(productDescription, targetMarket, competitorPricing);
      setPricingResult(result);
    } catch (error) {
      console.error('Error generating perfect pricing:', error);
    } finally {
      setIsCalculating(false);
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
            Perfect Pricing Calculator™
          </h2>
          <p className="text-gray-400">
            Calculate optimal pricing strategies based on market data and psychological triggers
          </p>
        </div>

        {!pricingResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Product/Service Description</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Describe your product or service in detail..."
                    className="w-full h-24 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Market</label>
                  <input
                    type="text"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    placeholder="e.g., 'Small businesses in the US' or 'Millennial professionals'"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Competitor Pricing (Optional)</label>
                  <textarea
                    value={competitorPricing}
                    onChange={(e) => setCompetitorPricing(e.target.value)}
                    placeholder="List competitor products and their pricing, one per line:
Competitor A: $X/month
Competitor B: $Y/year"
                    className="w-full h-24 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleCalculate}
                disabled={isCalculating || !productDescription.trim() || !targetMarket.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calculating Perfect Pricing...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Perfect Pricing - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Calculate Perfect Pricing</span>
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
            {/* Optimal Price Points */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">💰 Optimal Price Points</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingResult.optimalPricePoints.map((price, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <h4 className="text-white font-semibold mb-2">{price.tier}</h4>
                    <div className="text-3xl font-bold text-green-400 mb-2">{price.price}</div>
                    <p className="text-gray-400 text-sm">{price.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <BarChart className="w-6 h-6 text-blue-400" />
                  <h3 className="text-blue-400 font-bold text-lg">Pricing Strategy</h3>
                </div>
                <button
                  onClick={() => handleCopy(pricingResult.pricingStrategy.strategy)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <p className="text-gray-300">{pricingResult.pricingStrategy.strategy}</p>
              </div>
              <div className="space-y-3">
                {pricingResult.pricingStrategy.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-900/50 rounded-lg p-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-400 font-bold text-lg">Market Analysis</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Market Positioning:</h4>
                  <p className="text-gray-300 text-sm">{pricingResult.marketAnalysis.positioning}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Competitive Landscape:</h4>
                  <p className="text-gray-300 text-sm">{pricingResult.marketAnalysis.competitiveLandscape}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Value Perception:</h4>
                  <p className="text-gray-300 text-sm">{pricingResult.marketAnalysis.valuePerception}</p>
                </div>
              </div>
            </div>

            {/* Psychological Triggers */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-green-400 font-bold text-lg mb-4">🧠 Psychological Pricing Triggers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pricingResult.psychologicalTriggers.map((trigger, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">{trigger.trigger}</h4>
                    <p className="text-gray-300 text-sm mb-3">{trigger.explanation}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h5 className="text-white text-sm font-medium mb-1">Implementation:</h5>
                      <p className="text-gray-400 text-sm">{trigger.implementation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Projections */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-red-400" />
                <h3 className="text-red-400 font-bold text-lg">Revenue Projections</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 text-gray-400">Scenario</th>
                      <th className="py-2 px-4 text-gray-400">Conversion Rate</th>
                      <th className="py-2 px-4 text-gray-400">Monthly Revenue</th>
                      <th className="py-2 px-4 text-gray-400">Annual Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingResult.revenueProjections.map((projection, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-2 px-4 text-gray-300">{projection.scenario}</td>
                        <td className="py-2 px-4 text-gray-300">{projection.conversionRate}</td>
                        <td className="py-2 px-4 text-gray-300">{projection.monthlyRevenue}</td>
                        <td className="py-2 px-4 text-gray-300">{projection.annualRevenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerfectPricing;