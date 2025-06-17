import React, { useState } from 'react';
import { ListOrdered, Loader2, Lock, Copy, Calendar, Zap } from 'lucide-react';
import { createCTASequence } from '../services/moreFeatures';
import { ViralCTASequencer as ViralCTASequencerType } from '../types/moreFeatures';

interface ViralCTASequencerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ViralCTASequencer: React.FC<ViralCTASequencerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [sequence, setSequence] = useState<ViralCTASequencerType | null>(null);

  const handleGenerate = async () => {
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await createCTASequence();
      setSequence(result);
    } catch (error) {
      console.error('Error creating CTA sequence:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCTATypeColor = (type: string) => {
    if (type.includes('Direct')) return 'bg-blue-500/20 text-blue-400';
    if (type.includes('Community')) return 'bg-green-500/20 text-green-400';
    if (type.includes('Scarcity')) return 'bg-red-500/20 text-red-400';
    if (type.includes('Problem')) return 'bg-orange-500/20 text-orange-400';
    if (type.includes('Testimonial')) return 'bg-purple-500/20 text-purple-400';
    if (type.includes('FOMO')) return 'bg-pink-500/20 text-pink-400';
    if (type.includes('Hard Close')) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Viral CTA Sequencer
          </h2>
          <p className="text-gray-400">
            Create a 7-day CTA sequence that builds trust, desire, and action
          </p>
        </div>

        {!sequence ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl">7-Day CTA Sequence</h3>
                <p className="text-gray-400 mt-2">
                  Generate a complete 7-day CTA sequence using proven psychological principles
                </p>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Sequence...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock CTA Sequencer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <ListOrdered className="w-5 h-5" />
                    <span>Generate 7-Day CTA Sequence</span>
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
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 7-Day Viral CTA Sequence
              </h3>
              <p className="text-gray-400">
                Follow this sequence to build trust → desire → action
              </p>
            </div>

            <div className="space-y-6">
              {sequence.sequencePlan.map((day, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Day {day.day}</h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCTATypeColor(day.ctaType)}`}>
                          {day.ctaType}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(day.content)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 text-sm">{day.content}</p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <h5 className="text-purple-400 font-semibold text-sm">Psychology</h5>
                    </div>
                    <p className="text-gray-300 text-sm">{day.psychology}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sequence Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Sequence Psychology</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-blue-400 font-semibold mb-3">Days 1-2: Trust Building</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Establish credibility and authority</li>
                    <li>• Focus on relationship before selling</li>
                    <li>• Provide immediate value</li>
                    <li>• Create community connection</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold mb-3">Days 3-5: Desire Creation</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Amplify pain points</li>
                    <li>• Create urgency and scarcity</li>
                    <li>• Show transformation potential</li>
                    <li>• Use social proof strategically</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">Days 6-7: Action Triggers</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Create FOMO (fear of missing out)</li>
                    <li>• Reduce risk with guarantees</li>
                    <li>• Provide clear next steps</li>
                    <li>• Use strong closing language</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Implementation Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Implementation Guide</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Platform Adaptation</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Email:</strong> Use full sequence as written</li>
                    <li>• <strong>Social:</strong> Adapt to platform character limits</li>
                    <li>• <strong>Video:</strong> Use as script endings for each day</li>
                    <li>• <strong>Ads:</strong> Use in ad copy for retargeting sequence</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Best Practices</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Personalize with audience-specific language</li>
                    <li>• Test different CTAs with split testing</li>
                    <li>• Track which day converts best for your audience</li>
                    <li>• Adjust timing based on engagement metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViralCTASequencer;