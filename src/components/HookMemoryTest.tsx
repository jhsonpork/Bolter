import React, { useState } from 'react';
import { Zap, Loader2, Lock, Copy, Brain, Trophy, Plus, X } from 'lucide-react';
import { testHookMemory } from '../services/newFeatures2';
import { HookMemoryTest as HookMemoryTestType } from '../types/newFeatures2';

interface HookMemoryTestProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const HookMemoryTest: React.FC<HookMemoryTestProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [hooks, setHooks] = useState<string[]>(['', '', '']);
  const [isTesting, setIsTesting] = useState(false);
  const [memoryTest, setMemoryTest] = useState<HookMemoryTestType | null>(null);

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
      const result = await testHookMemory(validHooks);
      setMemoryTest(result);
    } catch (error) {
      console.error('Error testing hook memory:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getMemoryColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hook Memory Test
          </h2>
          <p className="text-gray-400">
            Test which hooks are most memorable and likely to stick in viewers' minds
          </p>
        </div>

        {!memoryTest ? (
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
                      placeholder={`Enter hook ${index + 1}...`}
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
                    <span>Testing Memory...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Memory Test - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Test Hook Memory</span>
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
            {/* Memory Champions */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Memory Champions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-400 font-bold mb-2">🥇 Most Memorable</h4>
                  <p className="text-white font-medium">"{memoryTest.rankings.mostMemorable}"</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-400 font-bold mb-2">🥉 Least Memorable</h4>
                  <p className="text-white font-medium">"{memoryTest.rankings.leastMemorable}"</p>
                </div>
              </div>
              <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{memoryTest.rankings.reasoning}</p>
              </div>
            </div>

            {/* Individual Hook Analysis */}
            <div className="space-y-6">
              <h4 className="text-yellow-400 font-bold text-lg text-center">🧠 Individual Hook Analysis</h4>
              {Array.isArray(memoryTest.hooks) && memoryTest.hooks.map((hook, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <h5 className="text-white font-bold text-lg">Hook #{index + 1}</h5>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className={`font-bold ${getMemoryColor(hook.memoryScore)}`}>
                          {hook.memoryScore}/10
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(hook.text)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-white font-medium">"{hook.text}"</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-green-400 font-semibold mb-2">✅ Memorable Elements</h6>
                      <ul className="space-y-1">
                        {Array.isArray(hook.recallFactors) && hook.recallFactors.map((factor, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="text-red-400 font-semibold mb-2">❌ Forgettable Elements</h6>
                      <ul className="space-y-1">
                        {Array.isArray(hook.forgettableElements) && hook.forgettableElements.map((element, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{element}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <h6 className="text-yellow-400 font-semibold mb-2">💡 Improvements</h6>
                    <ul className="space-y-1">
                      {Array.isArray(hook.improvements) && hook.improvements.map((improvement, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Memory Principles */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Memory Science Principles</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {Array.isArray(memoryTest.memoryPrinciples) && memoryTest.memoryPrinciples.map((principle, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-purple-400 font-semibold mb-2">{principle.principle}</h5>
                    <p className="text-gray-300 text-sm mb-3">{principle.explanation}</p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-purple-300 text-sm">{principle.application}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimized Versions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🚀 Memory-Optimized Versions</h4>
              <div className="space-y-4">
                {Array.isArray(memoryTest.optimizedVersions) && memoryTest.optimizedVersions.map((optimized, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-green-400 font-semibold">Optimized Hook #{index + 1}</h5>
                      <button
                        onClick={() => handleCopy(optimized)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white font-medium">"{optimized}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Scores */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🏆 Community Leaderboard</h4>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300">{memoryTest.communityScores}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HookMemoryTest;