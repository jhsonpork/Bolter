import React, { useState } from 'react';
import { DollarSign, Loader2, Lock, Copy, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { multiplyExit } from '../services/businessFeatures';
import { ExitMultiplierResult } from '../types/businessFeatures';

interface ExitMultiplierEngineProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ExitMultiplierEngine: React.FC<ExitMultiplierEngineProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [offerTerms, setOfferTerms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [exitResult, setExitResult] = useState<ExitMultiplierResult | null>(null);

  const handleAnalyze = async () => {
    if (!offerTerms.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await multiplyExit(offerTerms);
      setExitResult(result);
    } catch (error) {
      console.error('Error analyzing exit strategy:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const offerExamples = [
    "$50M all-cash offer with 2-year earnout based on 120% revenue growth",
    "$25M with 60% cash, 40% stock, and 3-year founder lockup",
    "$75M acquisition offer with $50M upfront and $25M performance-based earnout"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Exit Multiplier Engine™
          </h2>
          <p className="text-gray-400">
            Analyze acquisition terms to maximize your exit value
          </p>
        </div>

        {!exitResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Acquisition Offer Terms</label>
                <textarea
                  value={offerTerms}
                  onChange={(e) => setOfferTerms(e.target.value)}
                  placeholder="Describe the acquisition offer terms in detail..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="mt-2">
                  <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                  <div className="flex flex-col space-y-2">
                    {offerExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setOfferTerms(example)}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !offerTerms.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Exit Strategy...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Exit Multiplier - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Maximize Exit Value</span>
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
            {/* Offer Terms */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📋 Acquisition Offer Terms</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{exitResult.offerTerms}</p>
              </div>
            </div>

            {/* Valuation Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">Valuation Analysis</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Current Valuation</h5>
                  <p className="text-gray-300 text-sm">{exitResult.valuationAnalysis.currentValuation}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Potential Valuation</h5>
                  <p className="text-green-400 font-semibold">{exitResult.valuationAnalysis.potentialValuation}</p>
                </div>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-2">Key Drivers to Emphasize</h5>
                <ul className="space-y-2">
                  {exitResult.valuationAnalysis.keyDrivers.map((driver, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Earnout Traps */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h4 className="text-red-400 font-bold text-lg">Earnout Traps</h4>
              </div>
              <div className="space-y-4">
                {exitResult.earnoutTraps.map((trap, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{trap.trap}</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-red-400 text-sm font-medium mb-1">Risk:</h6>
                        <p className="text-gray-300 text-sm">{trap.risk}</p>
                      </div>
                      <div>
                        <h6 className="text-green-400 text-sm font-medium mb-1">Counter-Strategy:</h6>
                        <p className="text-gray-300 text-sm">{trap.counterStrategy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competing Bid Tactics & Negotiation Leverage */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-blue-400 font-bold text-lg">🏆 Competing Bid Tactics</h4>
                  <button
                    onClick={() => handleCopy(exitResult.competingBidTactics.join('\n'))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {exitResult.competingBidTactics.map((tactic, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{tactic}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-purple-400 font-bold text-lg">💪 Negotiation Leverage</h4>
                  <button
                    onClick={() => handleCopy(exitResult.negotiationLeverage.join('\n'))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {exitResult.negotiationLeverage.map((leverage, index) => (
                    <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{leverage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Counter-Strategies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-yellow-400" />
                <h4 className="text-yellow-400 font-bold text-lg">Counter-Strategies</h4>
              </div>
              <div className="space-y-4">
                {exitResult.counterStrategies.map((strategy, index) => (
                  <div key={index} className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{strategy.strategy}</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-yellow-400 text-sm font-medium mb-1">Implementation:</h6>
                        <p className="text-gray-300 text-sm">{strategy.implementation}</p>
                      </div>
                      <div>
                        <h6 className="text-yellow-400 text-sm font-medium mb-1">Potential Outcome:</h6>
                        <p className="text-gray-300 text-sm">{strategy.potentialOutcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExitMultiplierEngine;