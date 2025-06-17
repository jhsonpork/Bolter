import React, { useState } from 'react';
import { Play, Loader2, Lock, Copy, Plus, X, Eye, Clock } from 'lucide-react';
import { testHookFrames } from '../services/moreFeatures';
import { HookFrameTester as HookFrameTesterType } from '../types/moreFeatures';

interface HookFrameTesterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const HookFrameTester: React.FC<HookFrameTesterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [hooks, setHooks] = useState<string[]>(['', '', '']);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<HookFrameTesterType | null>(null);

  const handleAddHook = () => {
    if (hooks.length < 5) {
      setHooks([...hooks, '']);
    }
  };

  const handleRemoveHook = (index: number) => {
    if (hooks.length > 2) {
      setHooks(hooks.filter((_, i) => i !== index));
    }
  };

  const handleHookChange = (index: number, value: string) => {
    const newHooks = [...hooks];
    newHooks[index] = value;
    setHooks(newHooks);
  };

  const handleTest = async () => {
    const validHooks = hooks.filter(h => h.trim());
    if (validHooks.length < 2) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsTesting(true);
    try {
      const result = await testHookFrames(validHooks);
      setTestResults(result);
    } catch (error) {
      console.error('Error testing hook frames:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hook + Frame Split Tester
          </h2>
          <p className="text-gray-400">
            Test your TikTok hooks for scroll-stopping power and retention
          </p>
        </div>

        {!testResults ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                {hooks.map((hook, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-yellow-400 font-semibold w-8">#{index + 1}</span>
                    <input
                      type="text"
                      value={hook}
                      onChange={(e) => handleHookChange(index, e.target.value)}
                      placeholder={`Enter TikTok hook ${index + 1}...`}
                      className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                               placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                    />
                    {hooks.length > 2 && (
                      <button
                        onClick={() => handleRemoveHook(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {hooks.length < 5 && (
                  <button
                    onClick={handleAddHook}
                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 
                             hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 
                             flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Hook</span>
                  </button>
                )}
              </div>
              
              <button
                onClick={handleTest}
                disabled={isTesting || hooks.filter(h => h.trim()).length < 2}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Testing Hooks...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Hook Tester - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Test Hook Performance</span>
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
            {/* Best/Worst Performer */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-4">🏆 Best Performer</h4>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-white font-medium">"{testResults.bestPerformer}"</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">⚠️ Worst Performer</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-white font-medium">"{testResults.worstPerformer}"</p>
                </div>
              </div>
            </div>

            {/* Hook Analysis */}
            <div className="space-y-6">
              <h4 className="text-yellow-400 font-bold text-lg text-center">🔍 Hook Performance Analysis</h4>
              {testResults.hooks.map((hook, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <h5 className="text-white font-bold text-lg">Hook #{index + 1}</h5>
                    </div>
                    <button
                      onClick={() => handleCopy(hook.text)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-white font-medium">"{hook.text}"</p>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(hook.ctrPotential)}`}>
                        {hook.ctrPotential}/10
                      </div>
                      <p className="text-gray-400 text-sm">CTR Potential</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(hook.curiosityGap)}`}>
                        {hook.curiosityGap}/10
                      </div>
                      <p className="text-gray-400 text-sm">Curiosity Gap</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(hook.scrollStickiness)}`}>
                        {hook.scrollStickiness}/10
                      </div>
                      <p className="text-gray-400 text-sm">Scroll Stickiness</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400">{hook.predictedScrollTime}s</span>
                      </div>
                      <p className="text-gray-400 text-sm">Scroll Time</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <h6 className="text-blue-400 font-semibold">Better Opening Shot</h6>
                      </div>
                      <p className="text-gray-300 text-sm">{hook.improvements.betterOpeningShot}</p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Play className="w-4 h-4 text-green-400" />
                        <h6 className="text-green-400 font-semibold">Rewritten Hook</h6>
                      </div>
                      <p className="text-gray-300 text-sm">{hook.improvements.rewrittenHook}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail Suggestions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🖼️ Thumbnail Suggestions</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {testResults.hooks.map((hook, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">Hook #{index + 1}</h5>
                    <p className="text-gray-300 text-sm">{hook.thumbnail}</p>
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

export default HookFrameTester;