import React, { useState } from 'react';
import { RefreshCw, Loader2, Lock, Copy, ArrowRight } from 'lucide-react';
import { rewriteAd } from '../services/gemini';
import ToneSelector from './ToneSelector';

interface AdRewriterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdRewriter: React.FC<AdRewriterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [originalAd, setOriginalAd] = useState('');
  const [rewrittenAd, setRewrittenAd] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isRewriting, setIsRewriting] = useState(false);

  const handleRewrite = async () => {
    if (!originalAd.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsRewriting(true);
    try {
      const result = await rewriteAd(originalAd, selectedTone);
      setRewrittenAd(result);
    } catch (error) {
      console.error('Error rewriting ad:', error);
    } finally {
      setIsRewriting(false);
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
            AI Ad Rewriter
          </h2>
          <p className="text-gray-400">
            Transform your existing ads into viral content with AI optimization
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Original Ad Input */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Original Ad</h3>
            
            <div className="mb-6">
              <label className="text-white font-medium mb-3 block">Target Tone</label>
              <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
            </div>
            
            <textarea
              value={originalAd}
              onChange={(e) => setOriginalAd(e.target.value)}
              placeholder="Paste your existing ad copy here. Include headlines, body text, or any marketing content you want to improve..."
              className="w-full h-64 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                       placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
            />
            
            <button
              onClick={handleRewrite}
              disabled={isRewriting || !originalAd.trim()}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                       font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                       shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                       disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isRewriting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Rewriting Ad...</span>
                </>
              ) : hasUsedFreeTrial ? (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Unlock Ad Rewriter - $9.99/mo</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Rewrite Ad</span>
                </>
              )}
            </button>
            
            {!hasUsedFreeTrial && (
              <p className="text-center text-gray-400 text-sm mt-3">
                ✨ Free trial • No credit card required
              </p>
            )}
          </div>

          {/* Rewritten Ad Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-yellow-400 font-bold text-lg">Optimized Ad</h3>
              {rewrittenAd && (
                <button
                  onClick={() => handleCopy(rewrittenAd)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {rewrittenAd ? (
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{rewrittenAd}</p>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-400 font-semibold mb-2">Improvements Made:</h4>
                  <ul className="text-green-300 text-sm space-y-1">
                    <li>• Enhanced emotional triggers</li>
                    <li>• Improved call-to-action</li>
                    <li>• Optimized for {selectedTone} tone</li>
                    <li>• Added viral elements</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <ArrowRight className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your rewritten ad will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Before/After Comparison */}
        {rewrittenAd && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-yellow-400 font-bold text-lg mb-6">Before vs After Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-red-400 font-semibold mb-3">Before (Original)</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{originalAd}</p>
                </div>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-3">After (Optimized)</h4>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{rewrittenAd}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdRewriter;