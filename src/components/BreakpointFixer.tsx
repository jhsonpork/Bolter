import React, { useState } from 'react';
import { Wrench, Loader2, Lock, Copy, AlertTriangle, CheckCircle, Code } from 'lucide-react';
import { generateBreakpointFix } from '../services/businessFeatures';
import { BreakpointFixerResult } from '../types/businessFeatures';

interface BreakpointFixerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const BreakpointFixer: React.FC<BreakpointFixerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [bugDescription, setBugDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isFixing, setIsFixing] = useState(false);
  const [fixResult, setFixResult] = useState<BreakpointFixerResult | null>(null);

  const handleFix = async () => {
    if (!bugDescription.trim() || !codeSnippet.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsFixing(true);
    try {
      const result = await generateBreakpointFix(bugDescription, codeSnippet);
      setFixResult(result);
    } catch (error) {
      console.error('Error generating breakpoint fix:', error);
    } finally {
      setIsFixing(false);
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
            Breakpoint Fixer™
          </h2>
          <p className="text-gray-400">
            Instantly debug and fix code issues with AI-powered analysis
          </p>
        </div>

        {!fixResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Bug Description</label>
                  <textarea
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    placeholder="Describe the bug or issue you're experiencing..."
                    className="w-full h-24 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Code Snippet</label>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="Paste the problematic code here..."
                    className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none font-mono"
                  />
                </div>
              </div>
              
              <button
                onClick={handleFix}
                disabled={isFixing || !bugDescription.trim() || !codeSnippet.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isFixing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Fixing Code...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Breakpoint Fixer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5" />
                    <span>Fix My Code</span>
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
            {/* Bug Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-red-400 font-bold text-lg">Bug Analysis</h3>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Root Cause:</h4>
                <p className="text-gray-300">{fixResult.bugAnalysis.rootCause}</p>
              </div>
            </div>

            {/* Fixed Code */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-green-400 font-bold text-lg">Fixed Code</h3>
                </div>
                <button
                  onClick={() => handleCopy(fixResult.fixedCode)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 overflow-x-auto">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{fixResult.fixedCode}</pre>
              </div>
            </div>

            {/* Changes Made */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🔍 Changes Made</h3>
              <div className="space-y-3">
                {fixResult.changesMade.map((change, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-400 font-bold text-lg">Testing Recommendations</h3>
              </div>
              <div className="space-y-3">
                {fixResult.testingRecommendations.map((rec, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Advice */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-purple-400 font-bold text-lg mb-4">🛡️ Prevention Advice</h3>
              <div className="space-y-3">
                {fixResult.preventionAdvice.map((advice, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{advice}</p>
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

export default BreakpointFixer;