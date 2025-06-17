import React, { useState } from 'react';
import { Zap, Loader2, Lock, Copy, Target, Brain, Heart } from 'lucide-react';
import { generateAudienceTriggers } from '../services/businessFeatures';
import { AudienceTriggerResult } from '../types/businessFeatures';

interface AudienceTriggerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AudienceTrigger: React.FC<AudienceTriggerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [audience, setAudience] = useState('');
  const [product, setProduct] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [triggerResult, setTriggerResult] = useState<AudienceTriggerResult | null>(null);

  const handleGenerate = async () => {
    if (!audience.trim() || !product.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAudienceTriggers(audience, product);
      setTriggerResult(result);
    } catch (error) {
      console.error('Error generating audience triggers:', error);
    } finally {
      setIsGenerating(false);
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
            Audience Trigger Finder™
          </h2>
          <p className="text-gray-400">
            Discover the exact psychological triggers that make your audience take action
          </p>
        </div>

        {!triggerResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Target Audience</label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., 'busy working parents' or 'fitness enthusiasts over 40'"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Product/Service</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g., 'meal planning app' or 'online fitness coaching'"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !audience.trim() || !product.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Finding Triggers...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Audience Triggers - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Find Psychological Triggers</span>
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
            {/* Audience Profile */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">👥 Audience Profile</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Target Audience:</h4>
                  <p className="text-gray-300">{triggerResult.audience}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Product/Service:</h4>
                  <p className="text-gray-300">{triggerResult.product}</p>
                </div>
              </div>
            </div>

            {/* Primary Triggers */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-green-400" />
                <h3 className="text-green-400 font-bold text-lg">Primary Psychological Triggers</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {triggerResult.primaryTriggers.map((trigger, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-green-400 font-semibold">{trigger.trigger}</h4>
                      <span className="bg-gray-900/50 rounded-full px-2 py-1 text-xs text-white font-medium">
                        {trigger.strength}/10
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{trigger.explanation}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h5 className="text-white text-sm font-medium mb-1">How to Activate:</h5>
                      <p className="text-gray-400 text-sm">{trigger.activation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messaging Examples */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <h3 className="text-blue-400 font-bold text-lg">Trigger-Based Messaging</h3>
                </div>
                <button
                  onClick={() => handleCopy(triggerResult.messagingExamples.map(ex => ex.message).join('\n\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {triggerResult.messagingExamples.map((example, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                        {example.triggerUsed}
                      </span>
                      <span className="bg-gray-900/50 text-gray-300 px-2 py-1 rounded-full text-xs">
                        {example.platform}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{example.message}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">{example.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Map */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <h3 className="text-pink-400 font-bold text-lg">Emotional Trigger Map</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {triggerResult.emotionalMap.map((emotion, index) => (
                  <div key={index} className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                    <h4 className="text-pink-400 font-semibold mb-2">{emotion.emotion}</h4>
                    <p className="text-gray-300 text-sm mb-2">{emotion.relevance}</p>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <p className="text-gray-400 text-xs">Trigger words: {emotion.triggerWords.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* A/B Testing Ideas */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🧪 A/B Testing Ideas</h3>
              <div className="space-y-3">
                {triggerResult.abTestingIdeas.map((idea, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{idea}</p>
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

export default AudienceTrigger;