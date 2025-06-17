import React, { useState } from 'react';
import { SplitSquareVertical, Loader2, Lock, Copy, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { generateDecisionClarity } from '../services/businessFeatures';
import { DecisionClarityResult } from '../types/businessFeatures';

interface DecisionClarityProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const DecisionClarity: React.FC<DecisionClarityProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [decision, setDecision] = useState('');
  const [options, setOptions] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [clarityResult, setClarityResult] = useState<DecisionClarityResult | null>(null);

  const handleAnalyze = async () => {
    if (!decision.trim() || !options.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await generateDecisionClarity(decision, options);
      setClarityResult(result);
    } catch (error) {
      console.error('Error generating decision clarity:', error);
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
            Decision Clarity Engine™
          </h2>
          <p className="text-gray-400">
            Make complex business decisions with confidence using AI-powered decision analysis
          </p>
        </div>

        {!clarityResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Decision to Make</label>
                  <input
                    type="text"
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    placeholder="e.g., 'Which marketing strategy should we pursue?' or 'Should we launch this product?'"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Options (one per line)</label>
                  <textarea
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    placeholder="List your options, one per line:
Option 1: Social media marketing campaign
Option 2: Content marketing strategy
Option 3: Influencer partnerships"
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !decision.trim() || !options.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Decision...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Decision Clarity - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <SplitSquareVertical className="w-5 h-5" />
                    <span>Analyze Decision</span>
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
            {/* Decision Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🧠 Decision Analysis</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Decision:</h4>
                <p className="text-gray-300">{clarityResult.decision}</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-green-400 font-bold text-lg">✅ Recommendation</h3>
                <button
                  onClick={() => handleCopy(clarityResult.recommendation.recommendation)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                <p className="text-white font-medium">{clarityResult.recommendation.recommendation}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Reasoning:</h4>
                <p className="text-gray-300 text-sm">{clarityResult.recommendation.reasoning}</p>
              </div>
            </div>

            {/* Options Analysis */}
            <div className="space-y-6">
              <h3 className="text-blue-400 font-bold text-lg">🔍 Options Analysis</h3>
              {clarityResult.optionsAnalysis.map((option, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {option.isRecommended ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <h4 className={`font-bold text-lg ${option.isRecommended ? 'text-green-400' : 'text-gray-300'}`}>
                        Option {index + 1}: {option.option}
                      </h4>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg px-2 py-1">
                      <span className="text-yellow-400 font-medium">Score: {option.score}/10</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <h5 className="text-green-400 font-semibold mb-2">Pros</h5>
                      <ul className="space-y-1">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <h5 className="text-red-400 font-semibold mb-2">Cons</h5>
                      <ul className="space-y-1">
                        {option.cons.map((con, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h5 className="text-white font-semibold mb-2">Analysis</h5>
                    <p className="text-gray-300 text-sm">{option.analysis}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Assessment */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <h4 className="text-orange-400 font-bold text-lg">Risk Assessment</h4>
              </div>
              <div className="space-y-4">
                {clarityResult.riskAssessment.map((risk, index) => (
                  <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-semibold">{risk.risk}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        risk.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                        risk.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{risk.impact}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h6 className="text-white text-sm font-medium mb-1">Mitigation Strategy:</h6>
                      <p className="text-gray-400 text-sm">{risk.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">🚀 Next Steps</h4>
                <button
                  onClick={() => handleCopy(clarityResult.nextSteps.join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {clarityResult.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{step}</p>
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

export default DecisionClarity;