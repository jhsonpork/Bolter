import React, { useState } from 'react';
import { Layers, Loader2, Lock, Copy, Lightbulb, Star } from 'lucide-react';
import { generateMetaphors } from '../services/advancedFeatures';
import { MetaphorMagic } from '../types/advancedFeatures';

interface MetaphorMagicToolProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const MetaphorMagicTool: React.FC<MetaphorMagicToolProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [product, setProduct] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [metaphors, setMetaphors] = useState<MetaphorMagic | null>(null);

  const handleGenerate = async () => {
    if (!product.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateMetaphors(product);
      setMetaphors(result);
    } catch (error) {
      console.error('Error generating metaphors:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEffectivenessBackground = (score: number) => {
    if (score >= 8) return 'bg-green-500/20';
    if (score >= 6) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Metaphor Magic Tool
          </h2>
          <p className="text-gray-400">
            Transform your product into memorable metaphors and analogies for powerful ad copy
          </p>
        </div>

        {!metaphors ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Product or Service</label>
                <textarea
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Describe your product or service in detail..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !product.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Metaphors...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Metaphor Magic - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    <span>Generate 5 Powerful Metaphors</span>
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
                ✨ Metaphors for {metaphors.product}
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {metaphors.metaphors.map((metaphor, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getEffectivenessBackground(metaphor.effectiveness)}`}>
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                      </div>
                      <h4 className="text-yellow-400 font-bold text-lg">Metaphor #{index + 1}</h4>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className={`font-bold ${getEffectivenessColor(metaphor.effectiveness)}`}>
                          {metaphor.effectiveness}/10
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(metaphor.adExample)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Metaphor */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
                    <h5 className="text-purple-400 font-semibold mb-2">🎭 The Metaphor</h5>
                    <p className="text-white font-medium text-lg">"{metaphor.metaphor}"</p>
                  </div>

                  {/* Explanation */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-blue-400 font-semibold mb-2">🧠 How It Works</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{metaphor.explanation}</p>
                  </div>

                  {/* Ad Example */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-green-400 font-semibold mb-2">📝 Ad Example</h5>
                    <p className="text-gray-300 text-sm leading-relaxed italic">"{metaphor.adExample}"</p>
                  </div>

                  {/* Best Use Case */}
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-semibold mb-2">💡 Best Used For</h5>
                    <p className="text-gray-300 text-sm">{metaphor.bestUse}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metaphor Strategy Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎯 Metaphor Marketing Strategy</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">✅ When Metaphors Work Best</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Complex products need simplification</li>
                    <li>• Abstract benefits need visualization</li>
                    <li>• Competitive markets need differentiation</li>
                    <li>• Technical audiences need relatability</li>
                    <li>• New concepts need familiar comparisons</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-3">🎨 Metaphor Types</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Functional:</strong> How it works</li>
                    <li>• <strong>Emotional:</strong> How it feels</li>
                    <li>• <strong>Visual:</strong> What it looks like</li>
                    <li>• <strong>Experiential:</strong> What it's like to use</li>
                    <li>• <strong>Aspirational:</strong> What you become</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold mb-3">🚀 Implementation Tips</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Test metaphors with your audience</li>
                    <li>• Use consistently across campaigns</li>
                    <li>• Extend metaphors into visuals</li>
                    <li>• Avoid mixing conflicting metaphors</li>
                    <li>• Update metaphors as culture evolves</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Famous Metaphor Examples */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🏆 Famous Marketing Metaphors</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">Red Bull: "Gives You Wings"</h6>
                    <p className="text-gray-400 text-sm">Energy drink → Flight/Freedom metaphor</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">Nike: "Just Do It"</h6>
                    <p className="text-gray-400 text-sm">Shoes → Personal empowerment metaphor</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">Apple: "Think Different"</h6>
                    <p className="text-gray-400 text-sm">Technology → Creative rebellion metaphor</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">Allstate: "You're in Good Hands"</h6>
                    <p className="text-gray-400 text-sm">Insurance → Protection/Care metaphor</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">Bounty: "The Quicker Picker Upper"</h6>
                    <p className="text-gray-400 text-sm">Paper towels → Speed/Efficiency metaphor</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h6 className="text-white font-semibold">MasterCard: "Priceless"</h6>
                    <p className="text-gray-400 text-sm">Credit card → Life experiences metaphor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MetaphorMagicTool;