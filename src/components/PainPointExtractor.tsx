import React, { useState } from 'react';
import { AlertTriangle, Loader2, Lock, Copy, Target, Heart, Zap } from 'lucide-react';
import { extractPainPoints } from '../services/advancedFeatures';
import { PainPointExtraction } from '../types/advancedFeatures';

interface PainPointExtractorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PainPointExtractor: React.FC<PainPointExtractorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [product, setProduct] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extraction, setExtraction] = useState<PainPointExtraction | null>(null);

  const handleExtract = async () => {
    if (!product.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsExtracting(true);
    try {
      const result = await extractPainPoints(product);
      setExtraction(result);
    } catch (error) {
      console.error('Error extracting pain points:', error);
    } finally {
      setIsExtracting(false);
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
            Pain Point Extractor
          </h2>
          <p className="text-gray-400">
            Extract the top 5 pain points your product solves with emotional language and ad angles
          </p>
        </div>

        {!extraction ? (
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
                onClick={handleExtract}
                disabled={isExtracting || !product.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Extracting Pain Points...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Pain Point Extractor - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    <span>Extract Top 5 Pain Points</span>
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
                Pain Points for {extraction.product}
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {extraction.painPoints.map((pain, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500/20 p-2 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <h4 className="text-red-400 font-bold text-lg">Pain Point #{index + 1}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`Pain Point: ${pain.painPoint}\n\nEmotional Language: ${pain.emotionalLanguage}\n\nAd Copy: ${pain.adCopy}\n\nAngles: ${pain.suggestedAngles.join(', ')}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2 flex items-center space-x-2">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <span>Core Pain Point</span>
                      </h5>
                      <p className="text-gray-300 text-sm">{pain.painPoint}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2 flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span>Emotional Language</span>
                      </h5>
                      <p className="text-gray-300 text-sm italic">{pain.emotionalLanguage}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2 flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span>Suggested Angles</span>
                      </h5>
                      <ul className="space-y-1">
                        {pain.suggestedAngles.map((angle, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{angle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                      <h5 className="text-yellow-400 font-semibold mb-2">Sample Ad Copy</h5>
                      <p className="text-gray-300 text-sm">{pain.adCopy}</p>
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

export default PainPointExtractor;