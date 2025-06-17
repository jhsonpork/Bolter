import React, { useState } from 'react';
import { Calendar, Loader2, Lock, Download, Copy } from 'lucide-react';
import { generateCampaign } from '../services/gemini';
import { SavedCampaign, CampaignDay } from '../types/ad';
import ToneSelector from './ToneSelector';
import { downloadCampaignPackage } from '../utils/download';

interface CampaignGeneratorProps {
  onCampaignGenerated: (campaign: SavedCampaign) => void;
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CampaignGenerator: React.FC<CampaignGeneratorProps> = ({
  onCampaignGenerated,
  onUpgradeClick,
  hasUsedFreeTrial
}) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<CampaignDay[] | null>(null);

  const handleGenerate = async () => {
    if (!businessDescription.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const campaign = await generateCampaign(businessDescription, selectedTone);
      setGeneratedCampaign(campaign);
      
      const savedCampaign: SavedCampaign = {
        id: Date.now().toString(),
        name: `7-Day Campaign`,
        campaign,
        createdAt: new Date().toISOString(),
        type: 'campaign'
      };
      
      onCampaignGenerated(savedCampaign);
    } catch (error) {
      console.error('Error generating campaign:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (generatedCampaign) {
      downloadCampaignPackage(generatedCampaign);
    }
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {!generatedCampaign ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              7-Day Viral Campaign Generator
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Generate a complete week of viral ad content with different angles and approaches
            </p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Campaign Tone</label>
                <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
              </div>
              
              <textarea
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Describe your business for a 7-day campaign. Include your target audience, unique selling points, and goals..."
                className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                         placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
              />
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !businessDescription.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating 7-Day Campaign...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Campaign Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Generate 7-Day Campaign</span>
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
                Your 7-Day Campaign is Ready! 📅
              </h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold 
                           rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                           flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Campaign</span>
                </button>
                <button
                  onClick={onUpgradeClick}
                  className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 
                           transition-all duration-300 flex items-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Generate More Campaigns</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {generatedCampaign.map((day, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-yellow-400 font-bold text-xl">Day {day.day}</h3>
                      <p className="text-gray-400">{day.theme}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(`Day ${day.day}: ${day.theme}\n\nHeadline: ${day.headline}\n\nAd Copy: ${day.adCopy}\n\nTikTok Script: ${day.tiktokScript}\n\nCaptions: ${day.captions.join('\n')}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Headline</h4>
                        <p className="text-gray-300">{day.headline}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Ad Copy</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{day.adCopy}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">TikTok Script</h4>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{day.tiktokScript}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Captions</h4>
                        <div className="space-y-2">
                          {day.captions.map((caption, captionIndex) => (
                            <p key={captionIndex} className="text-gray-300 text-sm">
                              <span className="text-yellow-400">#{captionIndex + 1}</span> {caption}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
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

export default CampaignGenerator;