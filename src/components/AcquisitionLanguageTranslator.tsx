import React, { useState } from 'react';
import { FileText, Loader2, Lock, Copy, PieChart, Target, Zap } from 'lucide-react';
import { translateAcquisitionLanguage } from '../services/businessFeatures';
import { AcquisitionLanguageResult } from '../types/businessFeatures';

interface AcquisitionLanguageTranslatorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AcquisitionLanguageTranslator: React.FC<AcquisitionLanguageTranslatorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [technicalSpecs, setTechnicalSpecs] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState<AcquisitionLanguageResult | null>(null);

  const handleTranslate = async () => {
    if (!technicalSpecs.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateAcquisitionLanguage(technicalSpecs);
      setTranslationResult(result);
    } catch (error) {
      console.error('Error translating acquisition language:', error);
    } finally {
      setIsTranslating(false);
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
            Acquisition Language Translator™
          </h2>
          <p className="text-gray-400">
            Transform technical specs into investor-ready storytelling
          </p>
        </div>

        {!translationResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Technical Specifications</label>
                <textarea
                  value={technicalSpecs}
                  onChange={(e) => setTechnicalSpecs(e.target.value)}
                  placeholder="Paste technical specifications (e.g., AI model architecture, product features, technical capabilities)..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleTranslate}
                disabled={isTranslating || !technicalSpecs.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Translating Technical Language...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Language Translator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Translate for Investors</span>
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
            {/* Technical Specs */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🔬 Technical Specifications</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{translationResult.technicalSpecs}</p>
              </div>
            </div>

            {/* Investor Narrative */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-green-400 font-bold text-lg">💰 Investor-Ready Narrative</h4>
                <button
                  onClick={() => handleCopy(`${translationResult.investorNarrative.simplifiedExplanation}\n\n${translationResult.investorNarrative.marketSizeHook}\n\n${translationResult.investorNarrative.competitiveAdvantage}\n\n${translationResult.investorNarrative.growthPotential}`)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Simplified Explanation</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{translationResult.investorNarrative.simplifiedExplanation}</p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <PieChart className="w-4 h-4 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Market Size Hook</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{translationResult.investorNarrative.marketSizeHook}</p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Competitive Advantage</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{translationResult.investorNarrative.competitiveAdvantage}</p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Growth Potential</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{translationResult.investorNarrative.growthPotential}</p>
                </div>
              </div>
            </div>

            {/* Analogies & Defensibility */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-blue-400 font-bold text-lg mb-4">🔄 Simple Analogies</h4>
                <div className="space-y-3">
                  {translationResult.analogies.map((analogy, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{analogy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-purple-400 font-bold text-lg mb-4">🛡️ Defensibility Points</h4>
                <div className="space-y-3">
                  {translationResult.defensibilityPoints.map((point, index) => (
                    <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pitch Deck */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">🎯 Pitch Deck Outline</h4>
                <button
                  onClick={() => handleCopy(`${translationResult.pitchDeck.title}\n\n${translationResult.pitchDeck.slides.map(slide => `${slide.slideTitle}\n${slide.content}`).join('\n\n')}`)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <h5 className="text-white font-semibold text-lg mb-4">{translationResult.pitchDeck.title}</h5>
              <div className="space-y-4">
                {translationResult.pitchDeck.slides.map((slide, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h6 className="text-yellow-400 font-semibold mb-2">Slide {index + 1}: {slide.slideTitle}</h6>
                    <p className="text-gray-300 text-sm">{slide.content}</p>
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

export default AcquisitionLanguageTranslator;