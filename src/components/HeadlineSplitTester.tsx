import React, { useState } from 'react';
import { BarChart3, Loader2, Lock, Copy, Plus, X, Trophy, TrendingUp } from 'lucide-react';
import { testHeadlines } from '../services/newFeatures';
import { HeadlineSplitTest } from '../types/newFeatures';

interface HeadlineSplitTesterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const HeadlineSplitTester: React.FC<HeadlineSplitTesterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [headlines, setHeadlines] = useState<string[]>(['', '', '']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<HeadlineSplitTest | null>(null);

  const handleAddHeadline = () => {
    if (headlines.length < 5) {
      setHeadlines([...headlines, '']);
    }
  };

  const handleRemoveHeadline = (index: number) => {
    if (headlines.length > 2) {
      setHeadlines(headlines.filter((_, i) => i !== index));
    }
  };

  const handleHeadlineChange = (index: number, value: string) => {
    const newHeadlines = [...headlines];
    newHeadlines[index] = value;
    setHeadlines(newHeadlines);
  };

  const handleAnalyze = async () => {
    const validHeadlines = headlines.filter(h => h.trim());
    if (validHeadlines.length < 2) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await testHeadlines(validHeadlines);
      setResults(result);
    } catch (error) {
      console.error('Error testing headlines:', error);
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

  const getRankBadge = (rank: number) => {
    const colors = ['bg-yellow-400 text-black', 'bg-gray-400 text-black', 'bg-amber-600 text-white'];
    return colors[rank - 1] || 'bg-gray-600 text-white';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Headline Split Tester
          </h2>
          <p className="text-gray-400">
            Test 3-5 headlines and get AI rankings for scroll-stopping power and emotional impact
          </p>
        </div>

        {!results ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                {headlines.map((headline, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-yellow-400 font-semibold w-8">#{index + 1}</span>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => handleHeadlineChange(index, e.target.value)}
                      placeholder={`Enter headline ${index + 1}...`}
                      className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                               placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                    />
                    {headlines.length > 2 && (
                      <button
                        onClick={() => handleRemoveHeadline(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {headlines.length < 5 && (
                  <button
                    onClick={handleAddHeadline}
                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 
                             hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 
                             flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Headline</span>
                  </button>
                )}
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || headlines.filter(h => h.trim()).length < 2}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Headlines...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Split Tester - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    <span>Test Headlines</span>
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
            {/* Winner Announcement */}
            <div className="text-center bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Winning Headline</h3>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <p className="text-yellow-400 text-xl font-semibold">{results.winner}</p>
              </div>
              <button
                onClick={() => handleCopy(results.winner)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Winner</span>
              </button>
            </div>

            {/* Detailed Rankings */}
            <div className="space-y-4">
              <h4 className="text-yellow-400 font-bold text-lg text-center">Detailed Rankings</h4>
              {results.headlines.map((headline, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadge(headline.rank)}`}>
                        #{headline.rank}
                      </span>
                      <h5 className="text-white font-semibold">Headline {index + 1}</h5>
                    </div>
                    <button
                      onClick={() => handleCopy(headline.text)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-300">{headline.text}</p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(headline.scrollStoppingPower)}`}>
                        {headline.scrollStoppingPower}/10
                      </div>
                      <p className="text-gray-400 text-sm">Scroll-Stopping</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(headline.emotionalImpact)}`}>
                        {headline.emotionalImpact}/10
                      </div>
                      <p className="text-gray-400 text-sm">Emotional Impact</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(headline.productRelevance)}`}>
                        {headline.productRelevance}/10
                      </div>
                      <p className="text-gray-400 text-sm">Product Relevance</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(headline.overallScore)}`}>
                        {headline.overallScore}/10
                      </div>
                      <p className="text-gray-400 text-sm">Overall Score</p>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{headline.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Improved Version */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">AI-Improved Headline</h4>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-300 text-lg font-semibold">{results.improvedHeadline}</p>
              </div>
              <button
                onClick={() => handleCopy(results.improvedHeadline)}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Improved Version</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeadlineSplitTester;