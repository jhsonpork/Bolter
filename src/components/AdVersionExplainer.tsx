import React, { useState } from 'react';
import { BookOpen, Loader2, Lock, Copy, TrendingUp, Brain, Zap, Target } from 'lucide-react';
import { explainAdVersions } from '../services/newFeatures2';
import { AdVersionExplainer as AdVersionExplainerType } from '../types/newFeatures2';

interface AdVersionExplainerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdVersionExplainer: React.FC<AdVersionExplainerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adA, setAdA] = useState('');
  const [adB, setAdB] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [explanation, setExplanation] = useState<AdVersionExplainerType | null>(null);

  const handleAnalyze = async () => {
    if (!adA.trim() || !adB.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await explainAdVersions(adA, adB);
      setExplanation(result);
    } catch (error) {
      console.error('Error explaining ad versions:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getWinnerColor = (winner: string, current: string) => {
    return winner === current ? 'text-green-400' : 'text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ad Version Explainer
          </h2>
          <p className="text-gray-400">
            Upload two ad versions and understand why one might outperform the other
          </p>
        </div>

        {!explanation ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-4">Ad Version A</h3>
                <textarea
                  value={adA}
                  onChange={(e) => setAdA(e.target.value)}
                  placeholder="Paste your first ad version here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-4">Ad Version B</h3>
                <textarea
                  value={adB}
                  onChange={(e) => setAdB(e.target.value)}
                  placeholder="Paste your second ad version here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !adA.trim() || !adB.trim()}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Versions...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Ad Explainer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    <span>Explain Why One Wins</span>
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
            {/* Overall Winner */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🏆 Overall Winner: Version {explanation.overallWinner}
              </h3>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Storytelling Style */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">Storytelling Style</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.storytellingStyle.winner, 'A')}`}>
                      Version A: {explanation.analysis.storytellingStyle.adA}
                    </h5>
                  </div>
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.storytellingStyle.winner, 'B')}`}>
                      Version B: {explanation.analysis.storytellingStyle.adB}
                    </h5>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{explanation.analysis.storytellingStyle.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Pacing */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h4 className="text-yellow-400 font-bold text-lg">Pacing</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.pacing.winner, 'A')}`}>
                      Version A: {explanation.analysis.pacing.adA}
                    </h5>
                  </div>
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.pacing.winner, 'B')}`}>
                      Version B: {explanation.analysis.pacing.adB}
                    </h5>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{explanation.analysis.pacing.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Psychology */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-blue-400" />
                  <h4 className="text-blue-400 font-bold text-lg">Psychology</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.psychology.winner, 'A')}`}>
                      Version A: {explanation.analysis.psychology.adA}
                    </h5>
                  </div>
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.psychology.winner, 'B')}`}>
                      Version B: {explanation.analysis.psychology.adB}
                    </h5>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{explanation.analysis.psychology.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* CTA Flow */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">CTA Flow</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.ctaFlow.winner, 'A')}`}>
                      Version A: {explanation.analysis.ctaFlow.adA}
                    </h5>
                  </div>
                  <div>
                    <h5 className={`font-semibold ${getWinnerColor(explanation.analysis.ctaFlow.winner, 'B')}`}>
                      Version B: {explanation.analysis.ctaFlow.adB}
                    </h5>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{explanation.analysis.ctaFlow.reasoning}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learnings */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Key Learnings About Ad Science</h4>
              <div className="space-y-3">
                {explanation.keyLearnings.map((learning, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{learning}</p>
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

export default AdVersionExplainer;