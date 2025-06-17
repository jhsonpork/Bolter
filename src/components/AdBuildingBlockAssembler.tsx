import React, { useState } from 'react';
import { Blocks, Loader2, Lock, Copy, Settings, Palette, MousePointer, AlertTriangle } from 'lucide-react';
import { assembleAdBlocks } from '../services/advancedFeatures';
import { AdBuildingBlocks } from '../types/advancedFeatures';

interface AdBuildingBlockAssemblerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdBuildingBlockAssembler: React.FC<AdBuildingBlockAssemblerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [hookStyle, setHookStyle] = useState('');
  const [tone, setTone] = useState('');
  const [ctaFormat, setCTAFormat] = useState('');
  const [problemType, setProblemType] = useState('');
  const [isAssembling, setIsAssembling] = useState(false);
  const [assembledAd, setAssembledAd] = useState<AdBuildingBlocks | null>(null);

  const hookStyles = [
    'Question Hook', 'Shock Hook', 'Story Hook', 'Curiosity Hook', 'Problem Hook',
    'Benefit Hook', 'Social Proof Hook', 'Urgency Hook', 'Contrarian Hook', 'Personal Hook'
  ];

  const tones = [
    'Professional', 'Casual', 'Urgent', 'Friendly', 'Luxury', 'Edgy', 'Humorous', 'Authoritative'
  ];

  const ctaFormats = [
    'Direct Command', 'Question CTA', 'Benefit-Driven', 'Urgency-Based', 'Social Proof',
    'Risk Reversal', 'Curiosity Gap', 'Exclusive Offer'
  ];

  const problemTypes = [
    'Time Scarcity', 'Money Problems', 'Status Issues', 'Health Concerns', 'Relationship Problems',
    'Skill Gaps', 'Efficiency Issues', 'Security Fears'
  ];

  const handleAssemble = async () => {
    if (!hookStyle || !tone || !ctaFormat || !problemType) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAssembling(true);
    try {
      const result = await assembleAdBlocks(hookStyle, tone, ctaFormat, problemType);
      setAssembledAd(result);
    } catch (error) {
      console.error('Error assembling ad blocks:', error);
    } finally {
      setIsAssembling(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isFormComplete = hookStyle && tone && ctaFormat && problemType;

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ad Building Block Assembler
          </h2>
          <p className="text-gray-400">
            Choose your components and AI will assemble a cohesive ad with modular logic
          </p>
        </div>

        {!assembledAd ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hook Style */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <label className="text-white font-medium">Hook Style</label>
                  </div>
                  <select
                    value={hookStyle}
                    onChange={(e) => setHookStyle(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Hook Style</option>
                    {hookStyles.map((style) => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                {/* Tone */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <label className="text-white font-medium">Tone</label>
                  </div>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Tone</option>
                    {tones.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* CTA Format */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MousePointer className="w-5 h-5 text-green-400" />
                    <label className="text-white font-medium">CTA Format</label>
                  </div>
                  <select
                    value={ctaFormat}
                    onChange={(e) => setCTAFormat(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select CTA Format</option>
                    {ctaFormats.map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                </div>

                {/* Problem Type */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <label className="text-white font-medium">Problem Type</label>
                  </div>
                  <select
                    value={problemType}
                    onChange={(e) => setProblemType(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Problem Type</option>
                    {problemTypes.map((problem) => (
                      <option key={problem} value={problem}>{problem}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleAssemble}
                disabled={isAssembling || !isFormComplete}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAssembling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Assembling Ad...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Ad Assembler - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Blocks className="w-5 h-5" />
                    <span>Assemble My Ad</span>
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
            {/* Selected Components */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🧩 Selected Components</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-blue-400 font-semibold text-sm">Hook Style</h4>
                  <p className="text-white text-sm">{assembledAd.components.hookStyle}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <Palette className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-purple-400 font-semibold text-sm">Tone</h4>
                  <p className="text-white text-sm">{assembledAd.components.tone}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <MousePointer className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <h4 className="text-green-400 font-semibold text-sm">CTA Format</h4>
                  <p className="text-white text-sm">{assembledAd.components.ctaFormat}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <h4 className="text-red-400 font-semibold text-sm">Problem Type</h4>
                  <p className="text-white text-sm">{assembledAd.components.problemType}</p>
                </div>
              </div>
            </div>

            {/* Assembled Ad */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">🎯 Assembled Ad</h3>
                <button
                  onClick={() => handleCopy(assembledAd.assembledAd)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{assembledAd.assembledAd}</p>
              </div>
            </div>

            {/* Component Breakdown */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🔧 Component Breakdown</h3>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-blue-400 font-semibold">🎣 Hook Section</h4>
                    <button
                      onClick={() => handleCopy(assembledAd.breakdown.hook)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{assembledAd.breakdown.hook}</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-purple-400 font-semibold">📝 Body Section</h4>
                    <button
                      onClick={() => handleCopy(assembledAd.breakdown.body)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{assembledAd.breakdown.body}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-green-400 font-semibold">🎯 CTA Section</h4>
                    <button
                      onClick={() => handleCopy(assembledAd.breakdown.cta)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">{assembledAd.breakdown.cta}</p>
                </div>
              </div>
            </div>

            {/* Alternative Versions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🔄 Alternative Versions</h3>
              <div className="space-y-4">
                {assembledAd.alternatives.map((alternative, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">Alternative #{index + 1}</h4>
                      <button
                        onClick={() => handleCopy(alternative)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxe">{alternative}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">💡 Optimization Tips</h3>
              <div className="space-y-3">
                {assembledAd.optimizationTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{tip}</p>
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

export default AdBuildingBlockAssembler;