import React, { useState } from 'react';
import { Shield, Loader2, Lock, Copy, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { deviralizeAd } from '../services/newFeatures2';
import { Deviralizer as DeviralizerType } from '../types/newFeatures2';

interface DeviralizerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const Deviralizer: React.FC<DeviralizerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adText, setAdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DeviralizerType | null>(null);

  const handleAnalyze = async () => {
    if (!adText.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await deviralizeAd(adText);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing ad killers:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getViralityColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Deviralizer (Ad Kill Check)
          </h2>
          <p className="text-gray-400">
            Flag everything that prevents your ad from going viral and get specific fixes
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Ad Text to Analyze</label>
                <textarea
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  placeholder="Paste your ad copy here to identify viral killers..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !adText.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Ad Killers...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Deviralizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Find Ad Killers</span>
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
            {/* Virality Score */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Current Virality Score</h3>
              <div className={`text-6xl font-bold ${getViralityColor(analysis.viralityScore)} mb-2`}>
                {analysis.viralityScore}/10
              </div>
              <p className="text-gray-400">
                {analysis.viralityScore >= 8 ? 'High viral potential!' : 
                 analysis.viralityScore >= 6 ? 'Good potential with improvements' :
                 analysis.viralityScore >= 4 ? 'Needs significant improvements' :
                 'Major viral killers detected'}
              </p>
            </div>

            {/* Ad Killers */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">🚫 Ad Killers Detected</h4>
              <div className="space-y-4">
                {analysis.adKillers.map((killer, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(killer.severity)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <X className="w-5 h-5" />
                        <h5 className="font-bold">{killer.killer}</h5>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityColor(killer.severity)}`}>
                        {killer.severity}
                      </span>
                    </div>
                    <p className="text-sm mb-2"><strong>Location:</strong> {killer.location}</p>
                    <p className="text-sm mb-3"><strong>Impact:</strong> {killer.impact}</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-sm"><strong>Fix:</strong> {killer.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">❌ Original (With Killers)</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{analysis.adText}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-green-400 font-bold text-lg">✅ Fixed Version</h4>
                  <button
                    onClick={() => handleCopy(analysis.fixedVersion)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{analysis.fixedVersion}</p>
                </div>
              </div>
            </div>

            {/* Improvement Areas */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🔧 Improvement Areas</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">Hook</h5>
                  <p className="text-gray-300 text-sm">{analysis.improvementAreas.hook}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h5 className="text-green-400 font-semibold mb-2">Value</h5>
                  <p className="text-gray-300 text-sm">{analysis.improvementAreas.value}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h5 className="text-purple-400 font-semibold mb-2">CTA</h5>
                  <p className="text-gray-300 text-sm">{analysis.improvementAreas.cta}</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h5 className="text-orange-400 font-semibold mb-2">Length</h5>
                  <p className="text-gray-300 text-sm">{analysis.improvementAreas.length}</p>
                </div>
              </div>
            </div>

            {/* Shareability Factors */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📈 Missing Shareability Factors</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.shareabilityFactors.map((factor, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{factor}</p>
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

export default Deviralizer;