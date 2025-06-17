import React, { useState } from 'react';
import { Puzzle, Loader2, Lock, Copy, Shuffle, Star } from 'lucide-react';
import { assembleModularAd } from '../services/newFeatures2';
import { ModularAdAssembler as ModularAdAssemblerType } from '../types/newFeatures2';

interface ModularAdAssemblerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ModularAdAssembler: React.FC<ModularAdAssemblerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [hook, setHook] = useState('');
  const [pain, setPain] = useState('');
  const [solution, setSolution] = useState('');
  const [cta, setCTA] = useState('');
  const [isAssembling, setIsAssembling] = useState(false);
  const [assembledAd, setAssembledAd] = useState<ModularAdAssemblerType | null>(null);

  const handleAssemble = async () => {
    if (!hook.trim() || !pain.trim() || !solution.trim() || !cta.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAssembling(true);
    try {
      const result = await assembleModularAd(hook, pain, solution, cta);
      setAssembledAd(result);
    } catch (error) {
      console.error('Error assembling modular ad:', error);
    } finally {
      setIsAssembling(false);
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

  const isFormComplete = hook && pain && solution && cta;

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Modular Ad Assembler 2.0
          </h2>
          <p className="text-gray-400">
            Build ads by choosing components and see how different arrangements affect performance
          </p>
        </div>

        {!assembledAd ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Hook</label>
                  <input
                    type="text"
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    placeholder="e.g., Stop scrolling if you want to lose 10 pounds..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Pain Point</label>
                  <input
                    type="text"
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                    placeholder="e.g., Tired of diets that don't work..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Solution</label>
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="e.g., This app tracks everything automatically..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Call to Action</label>
                  <input
                    type="text"
                    value={cta}
                    onChange={(e) => setCTA(e.target.value)}
                    placeholder="e.g., Download now and start today..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAssemble}
                disabled={isAssembling || !isFormComplete}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAssembling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Assembling Ads...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Modular Assembler - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Puzzle className="w-5 h-5" />
                    <span>Assemble Multiple Versions</span>
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
            {/* Components Used */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🧩 Components Used</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <h4 className="text-blue-400 font-semibold text-sm mb-2">Hook</h4>
                  <p className="text-white text-sm">{assembledAd.components.hook}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <h4 className="text-red-400 font-semibold text-sm mb-2">Pain</h4>
                  <p className="text-white text-sm">{assembledAd.components.pain}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Solution</h4>
                  <p className="text-white text-sm">{assembledAd.components.solution}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <h4 className="text-purple-400 font-semibold text-sm mb-2">CTA</h4>
                  <p className="text-white text-sm">{assembledAd.components.cta}</p>
                </div>
              </div>
            </div>

            {/* Assembled Versions */}
            <div className="grid lg:grid-cols-3 gap-6">
              {assembledAd.assembledAds.map((ad, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-yellow-400 font-bold text-lg">{ad.version}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className={`font-bold ${getEffectivenessColor(ad.effectiveness)}`}>
                          {ad.effectiveness}/10
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(ad.fullAd)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{ad.fullAd}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Templates */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Reusable Templates</h4>
              <div className="space-y-3">
                {assembledAd.templates.map((template, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-semibold">Template #{index + 1}</h5>
                      <button
                        onClick={() => handleCopy(template)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{template}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Randomized Version */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shuffle className="w-6 h-6 text-orange-400" />
                <h4 className="text-orange-400 font-bold text-lg">Randomized Component Order</h4>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-300 leading-relaxed">{assembledAd.randomizedVersion}</p>
                  <button
                    onClick={() => handleCopy(assembledAd.randomizedVersion)}
                    className="p-2 text-gray-400 hover:text-white transition-colors ml-4"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModularAdAssembler;