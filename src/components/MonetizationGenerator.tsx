import React, { useState } from 'react';
import { DollarSign, Loader2, Lock, Copy, Zap, Target, FileText } from 'lucide-react';
import { generateMonetization } from '../services/moreFeatures';
import { MonetizationGenerator as MonetizationGeneratorType } from '../types/moreFeatures';

interface MonetizationGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const MonetizationGenerator: React.FC<MonetizationGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [contentTopic, setContentTopic] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [currentProduct, setCurrentProduct] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [monetization, setMonetization] = useState<MonetizationGeneratorType | null>(null);

  const audienceSizes = [
    'Under 1,000 followers',
    '1,000 - 10,000 followers',
    '10,000 - 50,000 followers',
    '50,000 - 100,000 followers',
    '100,000 - 500,000 followers',
    '500,000+ followers'
  ];

  const handleGenerate = async () => {
    if (!contentTopic.trim() || !audienceSize.trim() || !currentProduct.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateMonetization(contentTopic, audienceSize, currentProduct);
      setMonetization(result);
    } catch (error) {
      console.error('Error generating monetization:', error);
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
            2-Minute Monetizer Generator
          </h2>
          <p className="text-gray-400">
            Find the perfect monetization path for your content and audience
          </p>
        </div>

        {!monetization ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">What's your content about?</label>
                  <input
                    type="text"
                    value={contentTopic}
                    onChange={(e) => setContentTopic(e.target.value)}
                    placeholder="e.g., fitness tips, marketing strategies, cooking tutorials..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">What size is your audience?</label>
                  <select
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Audience Size</option>
                    {audienceSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">What are you trying to sell?</label>
                  <input
                    type="text"
                    value={currentProduct}
                    onChange={(e) => setCurrentProduct(e.target.value)}
                    placeholder="e.g., coaching services, digital course, physical product, nothing yet..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !contentTopic.trim() || !audienceSize.trim() || !currentProduct.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Monetization Plan...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Monetizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>Generate Monetization Plan</span>
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
            {/* Monetization Path */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                💰 Recommended Monetization Path
              </h3>
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-green-500/20">
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-2xl font-bold text-green-400">{monetization.recommendation.path}</span>
              </div>
            </div>

            {/* Input Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📊 Your Information</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Content Topic</h5>
                  <p className="text-gray-300 text-sm">{monetization.contentTopic}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Audience Size</h5>
                  <p className="text-gray-300 text-sm">{monetization.audienceSize}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Current Product</h5>
                  <p className="text-gray-300 text-sm">{monetization.currentProduct}</p>
                </div>
              </div>
            </div>

            {/* Monetization Components */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hook */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-blue-400" />
                    <h4 className="text-blue-400 font-bold text-lg">Hook</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(monetization.recommendation.hook)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{monetization.recommendation.hook}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-green-400" />
                    <h4 className="text-green-400 font-bold text-lg">Call to Action</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(monetization.recommendation.cta)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{monetization.recommendation.cta}</p>
                </div>
              </div>
            </div>

            {/* Landing Copy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">Landing Page Copy</h4>
                </div>
                <button
                  onClick={() => handleCopy(monetization.recommendation.landingCopy)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{monetization.recommendation.landingCopy}</p>
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Why This Path Is Optimal</h4>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{monetization.recommendation.reasoning}</p>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Implementation Guide</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Step 1: Validate</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Test hook with audience</li>
                    <li>• Create simple landing page</li>
                    <li>• Collect email signups</li>
                    <li>• Survey audience needs</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Step 2: Create</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Develop minimum viable product</li>
                    <li>• Set up payment processing</li>
                    <li>• Create sales page</li>
                    <li>• Prepare email sequence</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Step 3: Launch</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Pre-launch content series</li>
                    <li>• Limited-time opening</li>
                    <li>• Collect testimonials</li>
                    <li>• Scale with paid traffic</li>
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

export default MonetizationGenerator;