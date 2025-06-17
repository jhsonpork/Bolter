import React, { useState } from 'react';
import { Magnet, Loader2, Lock, Copy, Lightbulb, Target, Zap } from 'lucide-react';
import { breakdownAdMagnet } from '../services/newFeatures2';
import { AdMagnetBreakdown as AdMagnetBreakdownType } from '../types/newFeatures2';

interface AdMagnetBreakdownProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdMagnetBreakdown: React.FC<AdMagnetBreakdownProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [popularAd, setPopularAd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [breakdown, setBreakdown] = useState<AdMagnetBreakdownType | null>(null);

  const handleAnalyze = async () => {
    if (!popularAd.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await breakdownAdMagnet(popularAd);
      setBreakdown(result);
    } catch (error) {
      console.error('Error breaking down ad magnet:', error);
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
            Ad Magnet Breakdown
          </h2>
          <p className="text-gray-400">
            Reverse-engineer viral ads to understand their success formula and replicate it
          </p>
        </div>

        {!breakdown ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Popular/Viral Ad</label>
                <textarea
                  value={popularAd}
                  onChange={(e) => setPopularAd(e.target.value)}
                  placeholder="Paste a viral or high-performing ad here to reverse-engineer its success formula..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !popularAd.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Breaking Down Ad Magnet...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Ad Magnet Breakdown - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Magnet className="w-5 h-5" />
                    <span>Reverse-Engineer This Ad</span>
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
            {/* Original Ad */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🧲 Original Viral Ad</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{breakdown.originalAd}</p>
              </div>
            </div>

            {/* Success Formula Breakdown */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🔬 Success Formula Analysis</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">🎣 Hook Style</h5>
                  <p className="text-gray-300 text-sm">{breakdown.breakdown.hookStyle}</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h5 className="text-purple-400 font-semibold mb-2">💭 Emotional Driver</h5>
                  <p className="text-gray-300 text-sm">{breakdown.breakdown.emotionalDriver}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h5 className="text-green-400 font-semibold mb-2">⏱️ Pacing</h5>
                  <p className="text-gray-300 text-sm">{breakdown.breakdown.pacing}</p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h5 className="text-orange-400 font-semibold mb-2">📐 Content Formula</h5>
                  <p className="text-gray-300 text-sm">{breakdown.breakdown.contentFormula}</p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h5 className="text-red-400 font-semibold mb-2">🚀 Viral Elements</h5>
                  <ul className="space-y-1">
                    {breakdown.breakdown.viralElements.map((element, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <h5 className="text-pink-400 font-semibold mb-2">🧠 Psychology Used</h5>
                  <ul className="space-y-1">
                    {breakdown.breakdown.psychologyUsed.map((psych, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{psych}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Success Factors */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">⭐ Key Success Factors</h4>
              <div className="space-y-4">
                {breakdown.successFactors.map((factor, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{factor.factor}</h5>
                    <p className="text-gray-300 text-sm mb-3">{factor.explanation}</p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <h6 className="text-green-400 font-semibold mb-1">How to Replicate:</h6>
                      <p className="text-green-300 text-sm">{factor.replicability}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Turn Version */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Your Turn: Customizable Template</h4>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-green-400 font-semibold">📋 Template</h5>
                  <button
                    onClick={() => handleCopy(breakdown.yourTurnVersion.template)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{breakdown.yourTurnVersion.template}</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <h5 className="text-blue-400 font-semibold mb-2">📝 Instructions</h5>
                <p className="text-gray-300 text-sm">{breakdown.yourTurnVersion.instructions}</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-purple-400 font-semibold">💡 Examples for Different Niches</h5>
                {breakdown.yourTurnVersion.examples.map((example, index) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-purple-400 font-medium">Example #{index + 1}</span>
                      <button
                        onClick={() => handleCopy(example)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎓 Key Takeaways</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {breakdown.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{takeaway}</p>
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

export default AdMagnetBreakdown;