import React, { useState } from 'react';
import { ShieldCheck, Loader2, Lock, Copy, AlertTriangle, FileText } from 'lucide-react';
import { simulateIPStrategy } from '../services/businessFeatures';
import { IPStrategyResult } from '../types/businessFeatures';

interface IPStrategySimulatorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const IPStrategySimulator: React.FC<IPStrategySimulatorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productFeatures, setProductFeatures] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [strategyResult, setStrategyResult] = useState<IPStrategyResult | null>(null);

  const handleSimulate = async () => {
    if (!productFeatures.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsSimulating(true);
    try {
      const result = await simulateIPStrategy(productFeatures);
      setStrategyResult(result);
    } catch (error) {
      console.error('Error simulating IP strategy:', error);
    } finally {
      setIsSimulating(false);
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
            IP Strategy Simulator™
          </h2>
          <p className="text-gray-400">
            Create a protection roadmap for your product features
          </p>
        </div>

        {!strategyResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Product Feature Descriptions</label>
                <textarea
                  value={productFeatures}
                  onChange={(e) => setProductFeatures(e.target.value)}
                  placeholder="Describe your product features in detail..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleSimulate}
                disabled={isSimulating || !productFeatures.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Simulating IP Strategy...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock IP Strategy Simulator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Simulate IP Strategy</span>
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
            {/* Product Features */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📋 Product Features</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{strategyResult.productFeatures}</p>
              </div>
            </div>

            {/* Patentable Elements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-green-400 font-bold text-lg mb-4">🔒 Patentable Elements</h4>
              <div className="space-y-4">
                {strategyResult.patentableElements.map((element, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{element.feature}</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-green-400 text-sm font-medium mb-1">Patentability:</h6>
                        <p className="text-gray-300 text-sm">{element.patentability}</p>
                      </div>
                      <div>
                        <h6 className="text-green-400 text-sm font-medium mb-1">Strategy:</h6>
                        <p className="text-gray-300 text-sm">{element.strategy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trademark Risks */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">⚠️ Trademark Risks</h4>
              <div className="space-y-4">
                {strategyResult.trademarkRisks.map((risk, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h5 className="text-red-400 font-semibold">{risk.term}</h5>
                    </div>
                    <p className="text-gray-300 text-sm mb-3"><strong>Risk:</strong> {risk.risk}</p>
                    <div className="bg-gray-900/50 rounded p-3">
                      <p className="text-gray-300 text-sm"><strong>Alternative:</strong> {risk.alternative}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Source Risks */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-orange-400 font-bold text-lg mb-4">🔄 Open Source Risks</h4>
              <div className="space-y-4">
                {strategyResult.openSourceRisks.map((risk, index) => (
                  <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{risk.component}</h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h6 className="text-orange-400 text-sm font-medium mb-1">License:</h6>
                        <p className="text-gray-300 text-sm">{risk.license}</p>
                      </div>
                      <div>
                        <h6 className="text-orange-400 text-sm font-medium mb-1">Risk:</h6>
                        <p className="text-gray-300 text-sm">{risk.risk}</p>
                      </div>
                      <div>
                        <h6 className="text-orange-400 text-sm font-medium mb-1">Mitigation:</h6>
                        <p className="text-gray-300 text-sm">{risk.mitigation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Protection Roadmap */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-blue-400 font-bold text-lg">🛡️ Protection Roadmap</h4>
                <button
                  onClick={() => handleCopy(strategyResult.protectionRoadmap.join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {strategyResult.protectionRoadmap.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="w-6 h-6 bg-blue-400 text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">Competitor Analysis</h4>
                </div>
                <button
                  onClick={() => handleCopy(strategyResult.competitorAnalysis)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{strategyResult.competitorAnalysis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IPStrategySimulator;