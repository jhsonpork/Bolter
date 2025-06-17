import React, { useState } from 'react';
import { Brain, Loader2, Lock, Copy, Heart, Zap, AlertTriangle, Crown, Flame } from 'lucide-react';
import { mapEmotionalTriggers } from '../services/advancedFeatures';
import { EmotionalTriggerMap } from '../types/advancedFeatures';

interface EmotionalTriggerMapperProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const EmotionalTriggerMapper: React.FC<EmotionalTriggerMapperProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adText, setAdText] = useState('');
  const [isMapping, setIsMapping] = useState(false);
  const [emotionMap, setEmotionMap] = useState<EmotionalTriggerMap | null>(null);

  const handleMap = async () => {
    if (!adText.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsMapping(true);
    try {
      const result = await mapEmotionalTriggers(adText);
      setEmotionMap(result);
    } catch (error) {
      console.error('Error mapping emotions:', error);
    } finally {
      setIsMapping(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getEmotionIcon = (emotion: string) => {
    const icons: { [key: string]: any } = {
      fear: AlertTriangle,
      desire: Heart,
      fomo: Zap,
      status: Crown,
      anger: Flame
    };
    return icons[emotion] || Brain;
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      fear: 'text-red-400',
      desire: 'text-pink-400',
      fomo: 'text-yellow-400',
      status: 'text-purple-400',
      anger: 'text-orange-400'
    };
    return colors[emotion] || 'text-gray-400';
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
            Emotional Trigger Mapper
          </h2>
          <p className="text-gray-400">
            Map emotions in your ads and get stronger emotion-based rewrites
          </p>
        </div>

        {!emotionMap ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Ad Text to Analyze</label>
                <textarea
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  placeholder="Paste your ad copy here to analyze emotional triggers..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleMap}
                disabled={isMapping || !adText.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isMapping ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mapping Emotions...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Emotion Mapper - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Map Emotional Triggers</span>
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
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📝 Original Ad</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{emotionMap.adText}</p>
              </div>
            </div>

            {/* Current vs Missing Emotions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-4">✅ Current Emotions</h4>
                <div className="space-y-2">
                  {emotionMap.currentEmotions.map((emotion, index) => (
                    <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <span className="text-green-400 font-medium">{emotion}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">❌ Missing Emotions</h4>
                <div className="space-y-2">
                  {emotionMap.missingEmotions.map((emotion, index) => (
                    <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <span className="text-red-400 font-medium">{emotion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emotion Strength Scores */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Emotion Strength Analysis</h4>
              <div className="grid md:grid-cols-5 gap-4">
                {Object.entries(emotionMap.emotionStrength).map(([emotion, score]) => {
                  const IconComponent = getEmotionIcon(emotion);
                  return (
                    <div key={emotion} className="text-center">
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <IconComponent className={`w-8 h-8 mx-auto mb-2 ${getEmotionColor(emotion)}`} />
                        <h5 className="text-white font-semibold capitalize mb-2">{emotion}</h5>
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score}/10
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emotional Rewrites */}
            <div className="space-y-6">
              <h4 className="text-yellow-400 font-bold text-lg">🔥 Stronger Emotional Rewrites</h4>
              {emotionMap.emotionalRewrites.map((rewrite, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20`}>
                        <Heart className="w-5 h-5 text-purple-400" />
                      </div>
                      <h5 className="text-purple-400 font-bold text-lg capitalize">{rewrite.emotion} Focus</h5>
                    </div>
                    <button
                      onClick={() => handleCopy(rewrite.rewrite)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 leading-relaxed">{rewrite.rewrite}</p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <h6 className="text-purple-400 font-semibold mb-2">Why This Works:</h6>
                    <p className="text-gray-300 text-sm">{rewrite.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmotionalTriggerMapper;