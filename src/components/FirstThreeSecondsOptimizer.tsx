import React, { useState } from 'react';
import { Clock, Loader2, Lock, Copy, Eye, Volume2, Zap } from 'lucide-react';
import { optimizeFirstThreeSeconds } from '../services/newFeatures2';
import { FirstThreeSecondsOptimizer as FirstThreeSecondsOptimizerType } from '../types/newFeatures2';

interface FirstThreeSecondsOptimizerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const FirstThreeSecondsOptimizer: React.FC<FirstThreeSecondsOptimizerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [videoScript, setVideoScript] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<FirstThreeSecondsOptimizerType | null>(null);

  const handleOptimize = async () => {
    if (!videoScript.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsOptimizing(true);
    try {
      const result = await optimizeFirstThreeSeconds(videoScript);
      setOptimization(result);
    } catch (error) {
      console.error('Error optimizing first 3 seconds:', error);
    } finally {
      setIsOptimizing(false);
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
            First 3 Seconds Optimizer
          </h2>
          <p className="text-gray-400">
            Optimize the critical first 3 seconds of your video for maximum retention
          </p>
        </div>

        {!optimization ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Video Script</label>
                <textarea
                  value={videoScript}
                  onChange={(e) => setVideoScript(e.target.value)}
                  placeholder="Paste your TikTok/video script here to optimize the first 3 seconds..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleOptimize}
                disabled={isOptimizing || !videoScript.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Optimizing First 3 Seconds...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock 3-Second Optimizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    <span>Optimize First 3 Seconds</span>
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
            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">❌ Original First 3 Seconds</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{optimization.firstThreeSeconds.original}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-green-400 font-bold text-lg">✅ Optimized First 3 Seconds</h4>
                  <button
                    onClick={() => handleCopy(optimization.firstThreeSeconds.optimized)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{optimization.firstThreeSeconds.optimized}</p>
                </div>
              </div>
            </div>

            {/* Optimization Details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h5 className="text-yellow-400 font-semibold">Hook Phrasing</h5>
                </div>
                <p className="text-gray-300 text-sm">{optimization.firstThreeSeconds.hookPhrasing}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <h5 className="text-blue-400 font-semibold">Body Language</h5>
                </div>
                <p className="text-gray-300 text-sm">{optimization.firstThreeSeconds.bodyLanguage}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Volume2 className="w-6 h-6 text-green-400" />
                  <h5 className="text-green-400 font-semibold">Sound Effects</h5>
                </div>
                <p className="text-gray-300 text-sm">{optimization.firstThreeSeconds.soundEffects}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                  <h5 className="text-purple-400 font-semibold">Visual Elements</h5>
                </div>
                <p className="text-gray-300 text-sm">{optimization.firstThreeSeconds.visualElements}</p>
              </div>
            </div>

            {/* Retention Techniques */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Retention Techniques</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {optimization.retentionTechniques.map((technique, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{technique.technique}</h5>
                    <p className="text-gray-300 text-sm mb-2">{technique.implementation}</p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                      <p className="text-blue-300 text-sm">{technique.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Optimizations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📱 Platform-Specific Optimizations</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-pink-400 font-semibold">🎵 TikTok</h5>
                    <button
                      onClick={() => handleCopy(optimization.platformOptimizations.tiktok)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{optimization.platformOptimizations.tiktok}</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-purple-400 font-semibold">📸 Instagram</h5>
                    <button
                      onClick={() => handleCopy(optimization.platformOptimizations.instagram)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{optimization.platformOptimizations.instagram}</p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="text-red-400 font-semibold">📺 YouTube</h5>
                    <button
                      onClick={() => handleCopy(optimization.platformOptimizations.youtube)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{optimization.platformOptimizations.youtube}</p>
                </div>
              </div>
            </div>

            {/* Original Script */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-gray-400 font-bold text-lg mb-4">📄 Original Script</h4>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{optimization.originalScript}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FirstThreeSecondsOptimizer;