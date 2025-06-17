import React, { useState } from 'react';
import { Shield, Loader2, Lock, Copy, AlertTriangle, CheckCircle } from 'lucide-react';
import { scanRegulationGaps } from '../services/businessFeatures';
import { RegulationGapScan } from '../types/businessFeatures';

interface RegulationGapScannerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const RegulationGapScanner: React.FC<RegulationGapScannerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productDescription, setProductDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<RegulationGapScan | null>(null);

  const handleScan = async () => {
    if (!productDescription.trim() || !targetMarket.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsScanning(true);
    try {
      const result = await scanRegulationGaps(productDescription, targetMarket);
      setScanResults(result);
    } catch (error) {
      console.error('Error scanning regulation gaps:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const marketExamples = [
    "Health app in EU",
    "Fintech in US",
    "E-commerce in California",
    "EdTech for minors",
    "SaaS with global users"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Regulation Gap Scanner™
          </h2>
          <p className="text-gray-400">
            Identify compliance blind spots and get exact mitigation steps
          </p>
        </div>

        {!scanResults ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Product Description</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Describe your product or service in detail..."
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Market</label>
                  <input
                    type="text"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    placeholder="e.g., health app in EU, fintech in US..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                  <div className="mt-2">
                    <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {marketExamples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setTargetMarket(example)}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleScan}
                disabled={isScanning || !productDescription.trim() || !targetMarket.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Scanning Compliance Gaps...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Regulation Scanner - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Scan for Compliance Gaps</span>
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
            {/* Product & Market */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📋 Product & Market</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Product Description</h4>
                  <p className="text-gray-300 text-sm">{scanResults.productDescription}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Target Market</h4>
                  <p className="text-gray-300 text-sm">{scanResults.targetMarket}</p>
                </div>
              </div>
            </div>

            {/* Compliance Issues */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">⚠️ Compliance Issues</h4>
              <div className="space-y-4">
                {scanResults.complianceIssues.map((issue, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h5 className="text-red-400 font-semibold">{issue.regulation}</h5>
                    </div>
                    <p className="text-gray-300 text-sm mb-2"><strong>Violation:</strong> {issue.violation}</p>
                    <p className="text-gray-300 text-sm mb-3"><strong>Risk:</strong> {issue.risk}</p>
                    <div>
                      <h6 className="text-white text-sm font-semibold mb-2">Mitigation Steps:</h6>
                      <ul className="space-y-1">
                        {issue.mitigationSteps.map((step, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blind Spots */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🔍 Compliance Blind Spots</h4>
              <div className="space-y-3">
                {scanResults.blindSpots.map((spot, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{spot}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-launch Checklist */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-green-400 font-bold text-lg">✅ Pre-launch Compliance Checklist</h4>
                <button
                  onClick={() => handleCopy(scanResults.prelaunchChecklist.join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {scanResults.prelaunchChecklist.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
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

export default RegulationGapScanner;