import React, { useState } from 'react';
import { Users, Loader2, Lock, Copy, Download, FileText } from 'lucide-react';
import { generateInfluencerPitch } from '../services/influencer';
import { InfluencerPitchResult } from '../types/influencer';
import { downloadInfluencerPitch } from '../utils/download';

interface InfluencerPitchGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const InfluencerPitchGenerator: React.FC<InfluencerPitchGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [influencerType, setInfluencerType] = useState('micro');
  const [niche, setNiche] = useState('');
  const [budget, setBudget] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<InfluencerPitchResult | null>(null);

  const influencerTypes = [
    { id: 'nano', label: 'Nano (1K-10K)', emoji: '🌱' },
    { id: 'micro', label: 'Micro (10K-100K)', emoji: '🌿' },
    { id: 'macro', label: 'Macro (100K-1M)', emoji: '🌳' },
    { id: 'mega', label: 'Mega (1M+)', emoji: '🌲' },
  ];

  const handleGenerate = async () => {
    if (!businessDescription.trim() || !niche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateInfluencerPitch(businessDescription, influencerType, niche, budget);
      setGeneratedPitch(result);
    } catch (error) {
      console.error('Error generating influencer pitch:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (generatedPitch) {
      downloadInfluencerPitch(generatedPitch);
    }
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            AI Influencer Pitch Generator
          </h2>
          <p className="text-gray-400">
            Generate personalized outreach messages and pitch decks for influencer partnerships
          </p>
        </div>

        {!generatedPitch ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              {/* Influencer Type Selector */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Influencer Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  {influencerTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setInfluencerType(type.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        influencerType === type.id
                          ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.emoji}</div>
                      <div>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Your Business</label>
                  <textarea
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe your business, products/services, and what makes you unique..."
                    className="w-full h-24 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Niche</label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., fitness, beauty, tech, lifestyle, food..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Budget Range (Optional)</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $500-1000, Product exchange, Revenue share..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !businessDescription.trim() || !niche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Pitch...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Influencer Pitch - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    <span>Generate Influencer Pitch</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Influencer Pitch Package is Ready! 🤝
              </h2>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold 
                         rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         flex items-center space-x-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Pitch Deck</span>
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Outreach Message */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Outreach Message</h3>
                    <button
                      onClick={() => handleCopy(generatedPitch.outreachMessage)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-gray-900/50 rounded-lg p-4">
                    {generatedPitch.outreachMessage}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Follow-up Messages</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedPitch.followUpMessages.map((message, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">Follow-up #{index + 1}</h4>
                          <button
                            onClick={() => handleCopy(message)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm">{message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pitch Deck */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-yellow-400 font-bold text-lg">One-Page Pitch Deck</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Brand Overview</h4>
                      <p className="text-gray-300 text-sm">{generatedPitch.pitchDeck.brandOverview}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Partnership Benefits</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {generatedPitch.pitchDeck.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Content Ideas</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {generatedPitch.pitchDeck.contentIdeas.map((idea, index) => (
                          <li key={index}>• {idea}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Compensation</h4>
                      <p className="text-gray-300 text-sm">{generatedPitch.pitchDeck.compensation}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Next Steps</h4>
                      <p className="text-gray-300 text-sm">{generatedPitch.pitchDeck.nextSteps}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Outreach Strategy</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">Best Contact Methods</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Instagram DM (highest response rate)</li>
                        <li>• Email (professional approach)</li>
                        <li>• TikTok comments (for engagement)</li>
                        <li>• Business manager contact</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">Timing Tips</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Reach out Tuesday-Thursday</li>
                        <li>• Send between 10 AM - 2 PM</li>
                        <li>• Follow up after 3-5 days</li>
                        <li>• Avoid weekends and holidays</li>
                      </ul>
                    </div>
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

export default InfluencerPitchGenerator;