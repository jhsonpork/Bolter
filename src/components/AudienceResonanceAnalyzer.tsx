import React, { useState } from 'react';
import { Target, Loader2, Lock, Copy, Users, Heart, Zap, AlertTriangle } from 'lucide-react';
import { analyzeAudienceResonance } from '../services/newFeatures';
import { AudienceResonance } from '../types/newFeatures';

interface AudienceResonanceAnalyzerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AudienceResonanceAnalyzer: React.FC<AudienceResonanceAnalyzerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adText, setAdText] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AudienceResonance | null>(null);

  const handleAnalyze = async () => {
    if (!adText.trim() || !targetAudience.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeAudienceResonance(adText, targetAudience);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing audience resonance:', error);
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
            Audience Resonance Analyzer
          </h2>
          <p className="text-gray-400">
            Analyze how well your ad resonates with your target audience
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Your Ad or Post</label>
                  <textarea
                    value={adText}
                    onChange={(e) => setAdText(e.target.value)}
                    placeholder="Paste your ad copy or post here..."
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Audience</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., busy working moms aged 25-40, tech entrepreneurs, fitness enthusiasts..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !adText.trim() || !targetAudience.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Resonance...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Resonance Analyzer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    <span>Analyze Audience Resonance</span>
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
            {/* Overall Resonance Score */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Overall Audience Resonance</h3>
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${getScoreBackground(analysis.overallResonance)}`}>
                <Users className="w-6 h-6 text-white" />
                <span className={`text-3xl font-bold ${getScoreColor(analysis.overallResonance)}`}>
                  {analysis.overallResonance}/10
                </span>
              </div>
            </div>

            {/* Original Content */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">📝 Your Ad</h4>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{analysis.adText}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Target Audience</h4>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{analysis.targetAudience}</p>
                </div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h4 className="text-pink-400 font-bold text-lg mb-2">Relatability</h4>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.relatabilityScore)}`}>
                  {analysis.relatabilityScore}/10
                </div>
                <p className="text-gray-400 text-sm mt-2">How relatable is your message</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="text-orange-400 font-bold text-lg mb-2">Pain Point Coverage</h4>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.painPointCoverage)}`}>
                  {analysis.painPointCoverage}/10
                </div>
                <p className="text-gray-400 text-sm mt-2">How well you address their pain</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-yellow-400 font-bold text-lg mb-2">Buying Trigger Match</h4>
                <div className={`text-3xl font-bold ${getScoreColor(analysis.buyingTriggerMatch)}`}>
                  {analysis.buyingTriggerMatch}/10
                </div>
                <p className="text-gray-400 text-sm mt-2">How well you trigger buying desire</p>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-4">✅ Strengths</h4>
                <ul className="space-y-2">
                  {analysis.analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">❌ Weaknesses</h4>
                <ul className="space-y-2">
                  {analysis.analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">🔍 Missing Elements</h4>
                <ul className="space-y-2">
                  {analysis.analysis.missingElements.map((element, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{element}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Improvement Suggestions</h4>
              <div className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{improvement}</p>
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

export default AudienceResonanceAnalyzer;