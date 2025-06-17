import React, { useState } from 'react';
import { FileText, Loader2, Lock, Copy, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzeContract } from '../services/businessFeatures';
import { ContractAnalysisResult } from '../types/businessFeatures';

interface ContractNegotiatorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ContractNegotiator: React.FC<ContractNegotiatorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [contractClause, setContractClause] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ContractAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!contractClause.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeContract(contractClause);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing contract:', error);
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

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Contract Clause Negotiator™
          </h2>
          <p className="text-gray-400">
            Analyze contract clauses for red flags and get negotiation tactics
          </p>
        </div>

        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Contract Clause</label>
                <textarea
                  value={contractClause}
                  onChange={(e) => setContractClause(e.target.value)}
                  placeholder="Paste the contract clause you want to analyze (e.g., indemnification, IP ownership, termination)..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !contractClause.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Clause...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Contract Negotiator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Analyze Contract Clause</span>
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
            {/* Original Clause */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📄 Original Clause</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300">{analysisResult.originalClause}</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-400 font-bold text-lg">Clause Summary</h3>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-gray-300">{analysisResult.summary}</p>
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-red-400 font-bold text-lg">Red Flags</h3>
              </div>
              <div className="space-y-4">
                {analysisResult.redFlags.map((flag, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(flag.severity)}`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold">{flag.issue}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityColor(flag.severity)}`}>
                        {flag.severity}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{flag.explanation}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h5 className="text-white text-sm font-medium mb-1">Business Impact:</h5>
                      <p className="text-gray-400 text-sm">{flag.businessImpact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Tactics */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-green-400 font-bold text-lg">Negotiation Tactics</h3>
                </div>
                <button
                  onClick={() => handleCopy(analysisResult.negotiationTactics.map(t => t.tactic).join('\n\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {analysisResult.negotiationTactics.map((tactic, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Tactic {index + 1}:</h4>
                    <p className="text-gray-300 text-sm mb-3">{tactic.tactic}</p>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h5 className="text-white text-sm font-medium mb-1">Suggested Language:</h5>
                      <p className="text-gray-400 text-sm">{tactic.suggestedLanguage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Wording */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-purple-400 font-bold text-lg">📝 Alternative Wording</h3>
                <button
                  onClick={() => handleCopy(analysisResult.alternativeWording)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-gray-300">{analysisResult.alternativeWording}</p>
              </div>
            </div>

            {/* Power Balance Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">⚖️ Power Balance Analysis</h3>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-gray-300">{analysisResult.powerBalanceAnalysis}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContractNegotiator;