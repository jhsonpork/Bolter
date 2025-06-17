import React, { useState } from 'react';
import { Activity, Loader2, Lock, Copy, TrendingUp, Eye, Heart } from 'lucide-react';
import { predictViralPerformance } from '../services/newFeatures2';
import { ViralPerformancePredictor as ViralPerformancePredictorType } from '../types/newFeatures2';

interface ViralPerformancePredictorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ViralPerformancePredictor: React.FC<ViralPerformancePredictorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adCopy, setAdCopy] = useState('');
  const [platform, setPlatform] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<ViralPerformancePredictorType | null>(null);

  const platforms = [
    'TikTok',
    'Instagram Reels',
    'Instagram Stories',
    'Facebook Feed',
    'YouTube Shorts',
    'Twitter/X'
  ];

  const handlePredict = async () => {
    if (!adCopy.trim() || !platform.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsPredicting(true);
    try {
      const result = await predictViralPerformance(adCopy, platform);
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting viral performance:', error);
    } finally {
      setIsPredicting(false);
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

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Viral Performance Predictor
          </h2>
          <p className="text-gray-400">
            Get AI predictions on how your ad will perform across different platforms
          </p>
        </div>

        {!prediction ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Ad Copy</label>
                  <textarea
                    value={adCopy}
                    onChange={(e) => setAdCopy(e.target.value)}
                    placeholder="Paste your ad copy here to predict its viral performance..."
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Platform</option>
                    {platforms.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handlePredict}
                disabled={isPredicting || !adCopy.trim() || !platform.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPredicting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Predicting Performance...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Performance Predictor - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    <span>Predict Viral Performance</span>
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
            {/* Platform & Copy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📱 {prediction.platform} Performance Prediction</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm leading-relaxed">{prediction.adCopy}</p>
              </div>
            </div>

            {/* Overall Predictions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-green-400 font-bold text-lg mb-2">Viral Potential</h4>
                <div className={`text-3xl font-bold ${getScoreColor(prediction.predictions.viralPotential)}`}>
                  {prediction.predictions.viralPotential}/10
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-blue-400 font-bold text-lg mb-2">Shareability</h4>
                <div className={`text-3xl font-bold ${getScoreColor(prediction.predictions.shareability)}`}>
                  {prediction.predictions.shareability}/10
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h4 className="text-pink-400 font-bold text-lg mb-2">Engagement Rate</h4>
                <div className="text-3xl font-bold text-white">
                  {prediction.predictions.engagementRate}
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📊 Detailed Performance Metrics</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-blue-400 font-semibold mb-2">Scroll Rate</h5>
                  <p className="text-white text-lg font-bold">{prediction.predictions.scrollRate}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-green-400 font-semibold mb-2">Save Rate</h5>
                  <p className="text-white text-lg font-bold">{prediction.predictions.saveRate}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-purple-400 font-semibold mb-2">CTR Range</h5>
                  <p className="text-white text-lg font-bold">{prediction.predictions.ctrRange}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-orange-400 font-semibold mb-2">Confidence</h5>
                  <p className="text-white text-lg font-bold">{prediction.confidenceLevel}</p>
                </div>
              </div>
            </div>

            {/* Platform Specific Metrics */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Platform-Specific Insights</h4>
              {platform === 'TikTok' && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-pink-400 font-semibold mb-2">FYP Potential</h5>
                    <p className={`text-2xl font-bold ${getScoreColor(prediction.platformSpecific.tiktok.fyp)}`}>
                      {prediction.platformSpecific.tiktok.fyp}/10
                    </p>
                  </div>
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-pink-400 font-semibold mb-2">Completion Rate</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.tiktok.completion}</p>
                  </div>
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-pink-400 font-semibold mb-2">Share Rate</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.tiktok.shares}</p>
                  </div>
                </div>
              )}
              
              {platform === 'Facebook Feed' && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-blue-400 font-semibold mb-2">Organic Reach</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.facebook.reach}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-blue-400 font-semibold mb-2">Reaction Rate</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.facebook.reactions}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-blue-400 font-semibold mb-2">Comment Rate</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.facebook.comments}</p>
                  </div>
                </div>
              )}

              {(platform === 'Instagram Reels' || platform === 'Instagram Stories') && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-purple-400 font-semibold mb-2">Explore Potential</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.instagram.explore}</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-purple-400 font-semibold mb-2">Save Rate</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.instagram.saves}</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                    <h5 className="text-purple-400 font-semibold mb-2">Story Shares</h5>
                    <p className="text-white text-lg font-bold">{prediction.platformSpecific.instagram.stories}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Improvement Areas */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Areas for Improvement</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {prediction.improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{area}</p>
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

export default ViralPerformancePredictor;