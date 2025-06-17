import React, { useState } from 'react';
import { Wrench, Loader2, Lock, Copy, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { debugPrompt } from '../services/moreFeatures';
import { PromptDebugger as PromptDebuggerType } from '../types/moreFeatures';

interface PromptDebuggerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PromptDebugger: React.FC<PromptDebuggerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [failedPrompt, setFailedPrompt] = useState('');
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugResult, setDebugResult] = useState<PromptDebuggerType | null>(null);

  const handleDebug = async () => {
    if (!failedPrompt.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsDebugging(true);
    try {
      const result = await debugPrompt(failedPrompt);
      setDebugResult(result);
    } catch (error) {
      console.error('Error debugging prompt:', error);
    } finally {
      setIsDebugging(false);
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
            Gemini-Powered Prompt Debugger
          </h2>
          <p className="text-gray-400">
            Fix failed AI prompts and learn how to write better ones
          </p>
        </div>

        {!debugResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Failed AI Prompt</label>
                <textarea
                  value={failedPrompt}
                  onChange={(e) => setFailedPrompt(e.target.value)}
                  placeholder="Paste your failed AI prompt here to get it fixed and optimized..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleDebug}
                disabled={isDebugging || !failedPrompt.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDebugging ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Debugging Prompt...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Prompt Debugger - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5" />
                    <span>Debug & Fix Prompt</span>
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
            {/* Failed Prompt */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-4">❌ Failed Prompt</h3>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{debugResult.failedPrompt}</p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🔍 Prompt Analysis</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Tone Issues</h5>
                  <p className="text-gray-300 text-sm">{debugResult.analysis.toneIssues}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Vagueness</h5>
                  <p className="text-gray-300 text-sm">{debugResult.analysis.vagueness}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Ambiguity</h5>
                  <p className="text-gray-300 text-sm">{debugResult.analysis.ambiguity}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Structural Problems</h5>
                  <p className="text-gray-300 text-sm">{debugResult.analysis.structuralProblems}</p>
                </div>
              </div>
            </div>

            {/* Optimized Prompts */}
            <div className="space-y-6">
              <h4 className="text-green-400 font-bold text-lg text-center">✅ Optimized Prompt Variants</h4>
              {debugResult.optimizedPrompts.map((variant, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <h5 className="text-green-400 font-bold text-lg">Variant {index + 1}: {variant.variant}</h5>
                    </div>
                    <button
                      onClick={() => handleCopy(variant.prompt)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 text-sm">{variant.prompt}</p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-green-400" />
                      <h6 className="text-green-400 font-semibold text-sm">Improvements</h6>
                    </div>
                    <p className="text-gray-300 text-sm">{variant.improvements}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h4 className="text-yellow-400 font-bold text-lg">Why Your Prompt Failed</h4>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{debugResult.explanation}</p>
              </div>
            </div>

            {/* Prompt Writing Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📝 Prompt Writing Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Structure</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Start with a clear role for the AI</li>
                    <li>• Provide specific context</li>
                    <li>• Use explicit instructions</li>
                    <li>• Specify output format</li>
                    <li>• Break complex tasks into steps</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Language</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Be specific and concrete</li>
                    <li>• Avoid vague terms</li>
                    <li>• Use examples when possible</li>
                    <li>• Clarify ambiguous terms</li>
                    <li>• Match tone to desired output</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromptDebugger;