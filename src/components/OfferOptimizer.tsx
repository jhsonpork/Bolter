import React, { useState } from 'react';
import { TrendingUp, Loader2, Lock, Copy, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { optimizeOffer } from '../services/advancedFeatures';
import { OfferOptimization } from '../types/advancedFeatures';

interface OfferOptimizerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const OfferOptimizer: React.FC<OfferOptimizerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [currentOffer, setCurrentOffer] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<OfferOptimization | null>(null);

  const handleOptimize = async () => {
    if (!currentOffer.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await optimizeOffer(currentOffer);
      setOptimization(result);
    } catch (error) {
      console.error('Error optimizing offer:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-500/20';
    if (score >= 6) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Offer Optimizer
          </h2>
          <p className="text-gray-400">
            Analyze and optimize your offers for maximum conversion potential
          </p>
        </div>

        {!optimization ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Current Offer</label>
                <textarea
                  value={currentOffer}
                  onChange={(e) => setCurrentOffer(e.target.value)}
                  placeholder="Describe your current offer, pricing, bonuses, guarantees, etc..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleOptimize}
                disabled={isOptimizing || !currentOffer.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Optimizing Offer...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Offer Optimizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Optimize My Offer</span>
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
            {/* Original Offer */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📝 Original Offer</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{optimization.currentOffer}</p>
              </div>
            </div>

            {/* Evaluation Scores */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className={`text-center p-6 rounded-xl ${getScoreBackground(optimization.evaluation.urgencyLevel)}`}>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(optimization.evaluation.urgencyLevel)}`}>
                  {optimization.evaluation.urgencyLevel}/10
                </div>
                <p className="text-white font-semibold">Urgency Level</p>
              </div>
              <div className={`text-center p-6 rounded-xl ${getScoreBackground(optimization.evaluation.valueClarity)}`}>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(optimization.evaluation.valueClarity)}`}>
                  {optimization.evaluation.valueClarity}/10
                </div>
                <p className="text-white font-semibold">Value Clarity</p>
              </div>
              <div className={`text-center p-6 rounded-xl ${getScoreBackground(optimization.evaluation.incentiveStrength)}`}>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(optimization.evaluation.incentiveStrength)}`}>
                  {optimization.evaluation.incentiveStrength}/10
                </div>
                <p className="text-white font-semibold">Incentive Strength</p>
              </div>
              <div className={`text-center p-6 rounded-xl ${getScoreBackground(optimization.evaluation.overallScore)}`}>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(optimization.evaluation.overallScore)}`}>
                  {optimization.evaluation.overallScore}/10
                </div>
                <p className="text-white font-semibold">Overall Score</p>
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                <h4 className="text-orange-400 font-bold text-lg">Improvement Suggestions</h4>
              </div>
              <div className="space-y-3">
                {optimization.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-orange-400/10 border border-orange-400/20 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimized Offers */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">Optimized Offer Headlines</h4>
              </div>
              <div className="space-y-4">
                {optimization.optimizedOffers.map((offer, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-green-400 font-semibold">Optimized Offer #{index + 1}</h5>
                      <button
                        onClick={() => handleCopy(offer)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white font-medium">{offer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Why These Optimizations Work</h4>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{optimization.reasoning}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferOptimizer;