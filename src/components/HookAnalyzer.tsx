import React, { useState } from 'react';
import { Search, Loader2, Lock, Copy, TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { analyzeHook } from '../services/analysis';
import { HookAnalysis } from '../types/analysis';

interface HookAnalyzerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const HookAnalyzer: React.FC<HookAnalyzerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [hookText, setHookText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<HookAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!hookText.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeHook(hookText);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing hook:', error);
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

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-500/20';
    if (score >= 6) return 'bg-yellow-500/20';
    if (score >= 4) return 'bg-orange-500/20';
    return 'bg-red-500/20';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hook Analyzer
          </h2>
          <p className="text-gray-400">
            Get instant AI analysis of your hooks and ads for maximum effectiveness
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Hook or Ad to Analyze</label>
                <textarea
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                  placeholder="Paste your hook, ad copy, or video script here for analysis..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !hookText.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Hook...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Hook Analyzer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze Hook</span>
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
            {/* Overall Score */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Hook Analysis Results</h3>
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${getScoreBackground(analysis.analysis.overallScore)}`}>
                <span className="text-2xl font-bold text-white">Overall Score:</span>
                <span className={`text-3xl font-bold ${getScoreColor(analysis.analysis.overallScore)}`}>
                  {analysis.analysis.overallScore}/10
                </span>
              </div>
            </div>

            {/* Original Hook */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">📝 Analyzed Content</h4>
                <button
                  onClick={() => handleCopy(analysis.hookText)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{analysis.hookText}</p>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hook Effectiveness */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h4 className="text-blue-400 font-bold text-lg">Hook Effectiveness</h4>
                  <span className={`font-bold text-xl ${getScoreColor(analysis.analysis.hookEffectiveness.score)}`}>
                    {analysis.analysis.hookEffectiveness.score}/10
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{analysis.analysis.hookEffectiveness.reasoning}</p>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">💡 Improvements</h5>
                  <ul className="space-y-1">
                    {analysis.analysis.hookEffectiveness.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Strength */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">CTA Strength</h4>
                  <span className={`font-bold text-xl ${getScoreColor(analysis.analysis.ctaStrength.score)}`}>
                    {analysis.analysis.ctaStrength.score}/10
                  </span>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">🎯 CTA Improvements</h5>
                  <ul className="space-y-1">
                    {analysis.analysis.ctaStrength.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Retention Weaknesses */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h4 className="text-red-400 font-bold text-lg">Retention Weaknesses</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.analysis.retentionWeaknesses.map((weakness, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🚀 Action Plan</h4>
              <div className="space-y-3">
                {analysis.analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Prediction */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📊 Performance Prediction</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(analysis.analysis.overallScore)}`}>
                    {analysis.analysis.overallScore >= 8 ? 'High' : 
                     analysis.analysis.overallScore >= 6 ? 'Medium' : 'Low'}
                  </div>
                  <p className="text-gray-400 text-sm">Viral Potential</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(analysis.analysis.hookEffectiveness.score)}`}>
                    {Math.round(analysis.analysis.hookEffectiveness.score * 1.2)}%
                  </div>
                  <p className="text-gray-400 text-sm">Est. Engagement Rate</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(analysis.analysis.ctaStrength.score)}`}>
                    {Math.round(analysis.analysis.ctaStrength.score * 0.8)}%
                  </div>
                  <p className="text-gray-400 text-sm">Est. Click-Through Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HookAnalyzer;