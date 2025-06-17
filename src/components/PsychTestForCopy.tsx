import React, { useState } from 'react';
import { TestTube, Loader2, Lock, Copy, Brain, Target, Lightbulb } from 'lucide-react';
import { psychTestCopy } from '../services/newFeatures2';
import { PsychTestForCopy as PsychTestForCopyType } from '../types/newFeatures2';

interface PsychTestForCopyProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PsychTestForCopy: React.FC<PsychTestForCopyProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productType, setProductType] = useState('');
  const [brandPersonality, setBrandPersonality] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [psychTest, setPsychTest] = useState<PsychTestForCopyType | null>(null);

  const productTypes = [
    'SaaS/Software',
    'Physical Product',
    'Digital Course',
    'Coaching/Consulting',
    'E-commerce Store',
    'Mobile App',
    'Subscription Service',
    'Professional Service'
  ];

  const brandPersonalities = [
    'Innovative & Cutting-edge',
    'Trustworthy & Reliable',
    'Fun & Playful',
    'Luxury & Premium',
    'Down-to-earth & Authentic',
    'Bold & Disruptive',
    'Caring & Supportive',
    'Expert & Authoritative'
  ];

  const handleTest = async () => {
    if (!productType.trim() || !brandPersonality.trim() || !targetAudience.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsTesting(true);
    try {
      const result = await psychTestCopy(productType, brandPersonality, targetAudience);
      setPsychTest(result);
    } catch (error) {
      console.error('Error running psych test:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isFormComplete = productType && brandPersonality && targetAudience;

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Psych Test for Copy
          </h2>
          <p className="text-gray-400">
            Get a psychological diagnosis of your copy style and recommendations for better alignment
          </p>
        </div>

        {!psychTest ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Product Type</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Product Type</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Brand Personality</label>
                  <select
                    value={brandPersonality}
                    onChange={(e) => setBrandPersonality(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Brand Personality</option>
                    {brandPersonalities.map((personality) => (
                      <option key={personality} value={personality}>{personality}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Audience</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., busy professionals, creative entrepreneurs, health-conscious millennials..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleTest}
                disabled={isTesting || !isFormComplete}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Running Psych Test...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Psych Test - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <TestTube className="w-5 h-5" />
                    <span>Run Psychological Analysis</span>
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
            {/* Test Inputs */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📋 Test Parameters</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <h4 className="text-blue-400 font-semibold text-sm mb-2">Product Type</h4>
                  <p className="text-white text-sm">{psychTest.inputs.productType}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <h4 className="text-purple-400 font-semibold text-sm mb-2">Brand Personality</h4>
                  <p className="text-white text-sm">{psychTest.inputs.brandPersonality}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Target Audience</h4>
                  <p className="text-white text-sm">{psychTest.inputs.targetAudience}</p>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-red-400" />
                <h4 className="text-red-400 font-bold text-lg">🧠 Psychological Diagnosis</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Copy Style</h5>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{psychTest.diagnosis.copyStyle}</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Psychological Profile</h5>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{psychTest.diagnosis.psychProfile}</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Alignment Score</h5>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{psychTest.diagnosis.alignment}</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Psychological Gaps</h5>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{psychTest.diagnosis.gaps}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">💡 Recommendations</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">Better Copy Styles</h5>
                  <ul className="space-y-2">
                    {psychTest.recommendations.betterStyles.map((style, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{style}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-3">Emotional Triggers</h5>
                  <ul className="space-y-2">
                    {psychTest.recommendations.emotionalTriggers.map((trigger, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{trigger}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold mb-3">Language Patterns</h5>
                  <ul className="space-y-2">
                    {psychTest.recommendations.languagePatterns.map((pattern, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-3">Messaging Framework</h5>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{psychTest.recommendations.messagingFramework}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Copy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h4 className="text-yellow-400 font-bold text-lg">📝 Sample Copy Examples</h4>
              </div>
              <div className="space-y-4">
                {psychTest.sampleCopy.map((sample, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-white font-semibold">{sample.style}</h5>
                      <button
                        onClick={() => handleCopy(sample.example)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed italic">"{sample.example}"</p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <p className="text-yellow-300 text-sm">{sample.reasoning}</p>
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

export default PsychTestForCopy;