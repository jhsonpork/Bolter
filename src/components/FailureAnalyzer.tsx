import React, { useState } from 'react';
import { AlertOctagon, Loader2, Lock, Copy, Target, Zap, Layout, Palette, FileText, Users } from 'lucide-react';
import { analyzeFailure } from '../services/moreFeatures';
import { FailureAnalyzer as FailureAnalyzerType } from '../types/moreFeatures';

interface FailureAnalyzerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const FailureAnalyzer: React.FC<FailureAnalyzerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [failedItem, setFailedItem] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FailureAnalyzerType | null>(null);

  const handleAnalyze = async () => {
    if (!failedItem.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeFailure(failedItem);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing failure:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            The 'Why It Didn't Work' Analyzer
          </h2>
          <p className="text-gray-400">
            Analyze why your ad, product, tweet, or launch didn't work and how to fix it
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Failed Item</label>
                <textarea
                  value={failedItem}
                  onChange={(e) => setFailedItem(e.target.value)}
                  placeholder="Paste your failed ad, product description, tweet, or launch announcement here..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !failedItem.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Failure...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Failure Analyzer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <AlertOctagon className="w-5 h-5" />
                    <span>Analyze Why It Failed</span>
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
            {/* Failed Item */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-4">❌ Failed Item</h3>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{analysis.failedItem}</p>
              </div>
            </div>

            {/* Analysis Scores */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <h4 className="text-blue-400 font-semibold text-sm mb-1">Positioning</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.positioning.score)}`}>
                  {analysis.analysis.positioning.score}/10
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <h4 className="text-yellow-400 font-semibold text-sm mb-1">Hook Strength</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.hookStrength.score)}`}>
                  {analysis.analysis.hookStrength.score}/10
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <Layout className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <h4 className="text-green-400 font-semibold text-sm mb-1">Visual Structure</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.visualStructure.score)}`}>
                  {analysis.analysis.visualStructure.score}/10
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <Palette className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <h4 className="text-purple-400 font-semibold text-sm mb-1">Tone Match</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.toneMismatch.score)}`}>
                  {analysis.analysis.toneMismatch.score}/10
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <FileText className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <h4 className="text-pink-400 font-semibold text-sm mb-1">Offer Clarity</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.offerClarity.score)}`}>
                  {analysis.analysis.offerClarity.score}/10
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <h4 className="text-orange-400 font-semibold text-sm mb-1">Audience Fit</h4>
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.audienceFit.score)}`}>
                  {analysis.analysis.audienceFit.score}/10
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-blue-400 font-bold text-lg mb-4">Positioning Issues</h4>
                <ul className="space-y-2">
                  {analysis.analysis.positioning.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">Hook Weaknesses</h4>
                <ul className="space-y-2">
                  {analysis.analysis.hookStrength.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-4">Visual Structure Problems</h4>
                <ul className="space-y-2">
                  {analysis.analysis.visualStructure.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-purple-400 font-bold text-lg mb-4">Tone Mismatch Issues</h4>
                <ul className="space-y-2">
                  {analysis.analysis.toneMismatch.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-pink-400 font-bold text-lg mb-4">Offer Clarity Problems</h4>
                <ul className="space-y-2">
                  {analysis.analysis.offerClarity.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-orange-400 font-bold text-lg mb-4">Audience Fit Problems</h4>
                <ul className="space-y-2">
                  {analysis.analysis.audienceFit.issues.map((issue, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fixed Version */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-green-400 font-bold text-lg">✅ Fixed Version</h4>
                <button
                  onClick={() => handleCopy(analysis.fixedVersion)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{analysis.fixedVersion}</p>
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🚀 Action Plan</h4>
              <div className="space-y-3">
                {analysis.actionPlan.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{action}</p>
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

export default FailureAnalyzer;