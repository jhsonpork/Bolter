import React, { useState } from 'react';
import { Users, Loader2, Lock, Copy, UserPlus, Brain, Zap, Target } from 'lucide-react';
import { generateHyperPersona } from '../services/businessFeatures';
import { HyperPersonaResult } from '../types/businessFeatures';

interface HyperPersonaProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const HyperPersona: React.FC<HyperPersonaProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [targetAudience, setTargetAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [personaResult, setPersonaResult] = useState<HyperPersonaResult | null>(null);

  const handleGenerate = async () => {
    if (!targetAudience.trim()) return;
    
    // Remove the upgrade check to make the feature fully functional
    // if (hasUsedFreeTrial) {
    //   onUpgradeClick();
    //   return;
    // }

    setIsGenerating(true);
    try {
      const result = await generateHyperPersona(targetAudience);
      setPersonaResult(result);
    } catch (error) {
      console.error('Error generating hyper persona:', error);
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
            HyperPersona™ Advanced Audience Profiler
          </h2>
          <p className="text-gray-400">
            Generate ultra-detailed audience personas with 5x more psychological depth than standard profiles
          </p>
        </div>

        {!personaResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Target Audience</label>
                <textarea
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Describe your target audience in detail (e.g., 'millennial tech professionals who work remotely and are interested in productivity tools')..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !targetAudience.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating HyperPersona...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Generate HyperPersona</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Persona Overview */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">🧠 HyperPersona Profile</h3>
                <button
                  onClick={() => handleCopy(JSON.stringify(personaResult, null, 2))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Demographic Profile</h4>
                  <p className="text-gray-300 text-sm">{personaResult.demographicProfile}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Psychographic Summary</h4>
                  <p className="text-gray-300 text-sm">{personaResult.psychographicSummary}</p>
                </div>
              </div>
            </div>

            {/* Psychological Drivers */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h4 className="text-purple-400 font-bold text-lg">Psychological Drivers</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {personaResult.psychologicalDrivers.map((driver, index) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h5 className="text-purple-400 font-semibold mb-2">{driver.driver}</h5>
                    <p className="text-gray-300 text-sm">{driver.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Patterns */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h4 className="text-yellow-400 font-bold text-lg">Decision-Making Patterns</h4>
              </div>
              <div className="space-y-4">
                {personaResult.decisionPatterns.map((pattern, index) => (
                  <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h5 className="text-yellow-400 font-semibold mb-2">{pattern.pattern}</h5>
                    <p className="text-gray-300 text-sm">{pattern.explanation}</p>
                    <div className="mt-2 bg-gray-900/50 rounded-lg p-3">
                      <h6 className="text-white text-sm font-medium mb-1">Marketing Implications:</h6>
                      <p className="text-gray-400 text-sm">{pattern.marketingImplications}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Strategies */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">Communication Strategies</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Messaging Approaches</h5>
                  <ul className="space-y-2">
                    {personaResult.communicationStrategies.messagingApproaches.map((approach, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{approach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Channel Preferences</h5>
                  <ul className="space-y-2">
                    {personaResult.communicationStrategies.channelPreferences.map((channel, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{channel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Objection Handling */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">🛑 Objection Handling Guide</h4>
              <div className="space-y-4">
                {personaResult.objectionHandling.map((objection, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h5 className="text-red-400 font-semibold mb-2">Objection: {objection.objection}</h5>
                    <p className="text-gray-300 text-sm mb-3">{objection.psychologicalRoot}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h6 className="text-white text-sm font-medium mb-1">Recommended Response:</h6>
                      <p className="text-gray-400 text-sm">{objection.recommendedResponse}</p>
                    </div>
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

export default HyperPersona;