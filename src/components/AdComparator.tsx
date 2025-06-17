import React, { useState } from 'react';
import { GitCompare, Loader2, Lock, Copy, TrendingUp, Target, Zap, MousePointer } from 'lucide-react';
import { compareAds } from '../services/analysis';
import { AdComparison } from '../types/analysis';

interface AdComparatorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdComparator: React.FC<AdComparatorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [ad1, setAd1] = useState('');
  const [ad2, setAd2] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comparison, setComparison] = useState<AdComparison | null>(null);

  const handleCompare = async () => {
    if (!ad1.trim() || !ad2.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await compareAds(ad1, ad2);
      setComparison(result);
    } catch (error) {
      console.error('Error comparing ads:', error);
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

  const getWinnerBadge = (winner: string, current: string) => {
    return winner === current ? (
      <span className="bg-green-400 text-black px-2 py-1 rounded-full text-xs font-bold">WINNER</span>
    ) : null;
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            AI Ad Comparator
          </h2>
          <p className="text-gray-400">
            Compare two ads side-by-side and get instant AI analysis of performance potential
          </p>
        </div>

        {!comparison ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-4">Ad #1</h3>
                <textarea
                  value={ad1}
                  onChange={(e) => setAd1(e.target.value)}
                  placeholder="Paste your first ad here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-4">Ad #2</h3>
                <textarea
                  value={ad2}
                  onChange={(e) => setAd2(e.target.value)}
                  placeholder="Paste your second ad here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleCompare}
                disabled={isAnalyzing || !ad1.trim() || !ad2.trim()}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Ads...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Ad Comparator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <GitCompare className="w-5 h-5" />
                    <span>Compare Ads</span>
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
                🏆 Overall Winner: Ad #{comparison.comparison.overallWinner === 'ad1' ? '1' : '2'}
              </h3>
            </div>

            {/* Detailed Comparison */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ad 1 */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-yellow-400 font-bold text-lg">Ad #1</h3>
                  {getWinnerBadge(comparison.comparison.overallWinner, 'ad1')}
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                  <p className="text-gray-300 text-sm">{comparison.ad1}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Engagement Potential</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.engagementPotential.ad1Score)}`}>
                      {comparison.comparison.engagementPotential.ad1Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Value Proposition</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.valueProposition.ad1Score)}`}>
                      {comparison.comparison.valueProposition.ad1Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">Viral Appeal</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.viralAppeal.ad1Score)}`}>
                      {comparison.comparison.viralAppeal.ad1Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">CTA Strength</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.ctaStrength.ad1Score)}`}>
                      {comparison.comparison.ctaStrength.ad1Score}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad 2 */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-yellow-400 font-bold text-lg">Ad #2</h3>
                  {getWinnerBadge(comparison.comparison.overallWinner, 'ad2')}
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                  <p className="text-gray-300 text-sm">{comparison.ad2}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Engagement Potential</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.engagementPotential.ad2Score)}`}>
                      {comparison.comparison.engagementPotential.ad2Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Value Proposition</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.valueProposition.ad2Score)}`}>
                      {comparison.comparison.valueProposition.ad2Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">Viral Appeal</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.viralAppeal.ad2Score)}`}>
                      {comparison.comparison.viralAppeal.ad2Score}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">CTA Strength</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(comparison.comparison.ctaStrength.ad2Score)}`}>
                      {comparison.comparison.ctaStrength.ad2Score}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">Engagement Analysis</h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Winner:</strong> Ad #{comparison.comparison.engagementPotential.winner === 'ad1' ? '1' : '2'}
                </p>
                <p className="text-gray-400 text-sm">{comparison.comparison.engagementPotential.reasoning}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">Value Proposition</h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Winner:</strong> Ad #{comparison.comparison.valueProposition.winner === 'ad1' ? '1' : '2'}
                </p>
                <p className="text-gray-400 text-sm">{comparison.comparison.valueProposition.reasoning}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">Viral Appeal</h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Winner:</strong> Ad #{comparison.comparison.viralAppeal.winner === 'ad1' ? '1' : '2'}
                </p>
                <p className="text-gray-400 text-sm">{comparison.comparison.viralAppeal.reasoning}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">CTA Strength</h4>
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Winner:</strong> Ad #{comparison.comparison.ctaStrength.winner === 'ad1' ? '1' : '2'}
                </p>
                <p className="text-gray-400 text-sm">{comparison.comparison.ctaStrength.reasoning}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Improvement Recommendations</h4>
              <div className="space-y-2">
                {comparison.comparison.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300 text-sm">{rec}</p>
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

export default AdComparator;