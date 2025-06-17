import React, { useState } from 'react';
import { Send, Loader2, Lock, Download, Copy, Upload, Palette } from 'lucide-react';
import { AdResult } from '../types/ad';
import { generateAd } from '../services/gemini';
import AdPreview from './AdPreview';
import ToneSelector from './ToneSelector';
import { downloadAdPackage } from '../utils/download';

interface AdGeneratorProps {
  onAdGenerated: (ad: AdResult) => void;
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
  generatedAd: AdResult | null;
}

const AdGenerator: React.FC<AdGeneratorProps> = ({ 
  onAdGenerated, 
  onUpgradeClick, 
  hasUsedFreeTrial, 
  generatedAd 
}) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessInfo, setBusinessInfo] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [inputMode, setInputMode] = useState<'description' | 'info'>('description');

  const handleGenerate = async () => {
    const input = inputMode === 'description' ? businessDescription : businessInfo;
    if (!input.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAd(input, selectedTone, inputMode);
      onAdGenerated(result);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating ad:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (generatedAd) {
      downloadAdPackage(generatedAd);
    }
  };

  const handleNewAd = () => {
    setShowResults(false);
    setBusinessDescription('');
    setBusinessInfo('');
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Create Your Viral Ad
            </h2>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              {/* Input Mode Toggle */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setInputMode('description')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    inputMode === 'description'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Quick Description</span>
                </button>
                <button
                  onClick={() => setInputMode('info')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    inputMode === 'info'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Business Info</span>
                </button>
              </div>

              {/* Tone Selector */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Palette className="w-4 h-4 text-yellow-400" />
                  <label className="text-white font-medium">Ad Tone</label>
                </div>
                <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
              </div>
              
              {inputMode === 'description' ? (
                <textarea
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="e.g., I own a coffee shop in downtown that's modern and trendy, targeting young professionals who love artisanal coffee and cozy vibes..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              ) : (
                <textarea
                  value={businessInfo}
                  onChange={(e) => setBusinessInfo(e.target.value)}
                  placeholder="Paste your complete business information, About page, or detailed company description here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              )}
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!businessDescription.trim() && !businessInfo.trim())}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Your Viral Ad...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock More Ads - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate My Viral Ad</span>
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
        ) : generatedAd && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Viral Ad Package is Ready! 🚀
              </h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold 
                           rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                           flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Package</span>
                </button>
                <button
                  onClick={handleNewAd}
                  className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 
                           transition-all duration-300 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Create New Ad</span>
                </button>
                <button
                  onClick={onUpgradeClick}
                  className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 
                           transition-all duration-300 flex items-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Generate More Ads</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ad Content */}
              <div className="space-y-6">
                {/* Headline */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Viral Headline</h3>
                    <button
                      onClick={() => handleCopy(generatedAd.headline)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white text-xl font-semibold">{generatedAd.headline}</p>
                </div>

                {/* Ad Copy */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Ad Copy</h3>
                    <button
                      onClick={() => handleCopy(generatedAd.adCopy)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{generatedAd.adCopy}</p>
                </div>

                {/* TikTok Script */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">TikTok Script</h3>
                    <button
                      onClick={() => handleCopy(generatedAd.tiktokScript)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{generatedAd.tiktokScript}</p>
                </div>

                {/* Captions */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Caption Variations</h3>
                  <div className="space-y-4">
                    {generatedAd.captions.map((caption, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="text-yellow-400 font-semibold">#{index + 1}</span>
                          <p className="text-gray-300 mt-1">{caption}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(caption)}
                          className="p-2 text-gray-400 hover:text-white transition-colors ml-4"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ad Preview */}
              <div>
                <AdPreview ad={generatedAd} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdGenerator;