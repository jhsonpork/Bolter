import React, { useState } from 'react';
import { MessageSquare, Loader2, Lock, Copy, Flame, AlertTriangle, TrendingUp } from 'lucide-react';
import { generateControversialTakes } from '../services/advancedFeatures';
import { ControversialTakes } from '../types/advancedFeatures';

interface ControversialTakeGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ControversialTakeGenerator: React.FC<ControversialTakeGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [takes, setTakes] = useState<ControversialTakes | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateControversialTakes(topic);
      setTakes(result);
    } catch (error) {
      console.error('Error generating controversial takes:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getToneColor = (tone: string) => {
    const colors: { [key: string]: string } = {
      'Bold': 'bg-red-500/20 text-red-400',
      'Playful': 'bg-green-500/20 text-green-400',
      'Satirical': 'bg-purple-500/20 text-purple-400'
    };
    return colors[tone] || 'bg-gray-500/20 text-gray-400';
  };

  const getViralColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Controversial Take Generator
          </h2>
          <p className="text-gray-400">
            Generate spicy takes that fuel debate and viral engagement
          </p>
        </div>

        {!takes ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Topic or Industry</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., social media marketing, fitness industry, remote work..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topic.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Controversial Takes...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Controversial Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Generate 5 Spicy Takes</span>
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
                🔥 Controversial Takes for {takes.topic}
              </h3>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center space-x-2 justify-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold">Use Responsibly</span>
                </div>
                <p className="text-gray-300 text-sm">
                  These takes are designed to spark engagement. Always consider your brand values and audience.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {takes.controversialTakes.map((take, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-red-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <Flame className="w-5 h-5 text-red-400" />
                      </div>
                      <h4 className="text-red-400 font-bold text-lg">Take #{index + 1}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`${take.take}\n\n${take.supportingCopy}\n\n${take.disclaimer ? `Disclaimer: ${take.disclaimer}` : ''}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Take Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToneColor(take.tone)}`}>
                      {take.tone}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      {take.platform}
                    </span>
                    <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span className={getViralColor(take.viralPotential)}>
                        {take.viralPotential}/10 Viral
                      </span>
                    </div>
                  </div>

                  {/* Main Take */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">🔥 The Take</h5>
                    <p className="text-red-300 font-medium text-lg">{take.take}</p>
                  </div>

                  {/* Supporting Copy */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">📝 Supporting Copy</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{take.supportingCopy}</p>
                  </div>

                  {/* Disclaimer */}
                  {take.disclaimer && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">⚠️ Disclaimer</h5>
                      <p className="text-gray-300 text-sm">{take.disclaimer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Usage Guidelines */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Controversial Content Guidelines</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ Do This</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Stay true to your brand values</li>
                    <li>• Back up claims with evidence</li>
                    <li>• Engage respectfully with responses</li>
                    <li>• Monitor comments closely</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">❌ Avoid This</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Personal attacks on individuals</li>
                    <li>• Spreading misinformation</li>
                    <li>• Offensive or discriminatory content</li>
                    <li>• Ignoring negative feedback</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">💡 Pro Tips</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Test with smaller audiences first</li>
                    <li>• Have a response strategy ready</li>
                    <li>• Use data to support your position</li>
                    <li>• Know when to double down vs. clarify</li>
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

export default ControversialTakeGenerator;