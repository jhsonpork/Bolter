import React, { useState } from 'react';
import { FileText, Loader2, Lock, Copy, PieChart, Users, ArrowDown, TrendingUp } from 'lucide-react';
import { generateChurnAutopsy } from '../services/businessFeatures';
import { ChurnAutopsyResult } from '../types/businessFeatures';

interface ChurnAutopsyReportProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ChurnAutopsyReport: React.FC<ChurnAutopsyReportProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [cancellationFeedback, setCancellationFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autopsyResult, setAutopsyResult] = useState<ChurnAutopsyResult | null>(null);

  const handleAnalyze = async () => {
    if (!cancellationFeedback.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await generateChurnAutopsy(cancellationFeedback);
      setAutopsyResult(result);
    } catch (error) {
      console.error('Error analyzing churn:', error);
    } finally {
      setIsAnalyzing(false);
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
            Churn Autopsy Report™
          </h2>
          <p className="text-gray-400">
            Analyze cancellation feedback to identify root causes and reduce churn
          </p>
        </div>

        {!autopsyResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Customer Cancellation Feedback</label>
                <textarea
                  value={cancellationFeedback}
                  onChange={(e) => setCancellationFeedback(e.target.value)}
                  placeholder="Paste customer cancellation feedback or survey responses here..."
                  className="w-full h-40 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !cancellationFeedback.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Churn Causes...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Churn Autopsy - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    <span>Analyze Cancellation Feedback</span>
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
            {/* Cancellation Feedback */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📝 Cancellation Feedback</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{autopsyResult.cancellationFeedback}</p>
              </div>
            </div>

            {/* Root Causes */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ArrowDown className="w-6 h-6 text-red-400" />
                <h4 className="text-red-400 font-bold text-lg">Root Cause Analysis</h4>
              </div>
              <div className="space-y-4">
                {autopsyResult.rootCauses.map((cause, index) => (
                  <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-white font-semibold">{cause.category}</h5>
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                        {cause.percentage}
                      </span>
                    </div>
                    <div className="mb-3">
                      <h6 className="text-white text-sm font-semibold mb-1">Issues:</h6>
                      <ul className="space-y-1">
                        {cause.issues.map((issue, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-gray-300 text-sm"><strong>Impact:</strong> {cause.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Segments */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <h4 className="text-blue-400 font-bold text-lg">Customer Segment Analysis</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {autopsyResult.customerSegments.map((segment, index) => (
                  <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-white font-semibold">{segment.segment}</h5>
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                        {segment.churnRate}
                      </span>
                    </div>
                    <div>
                      <h6 className="text-white text-sm font-semibold mb-1">Primary Reasons:</h6>
                      <ul className="space-y-1">
                        {segment.primaryReasons.map((reason, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retention Playbook */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h4 className="text-green-400 font-bold text-lg">Retention Playbook</h4>
              </div>
              <div className="space-y-4">
                {autopsyResult.retentionPlaybook.map((strategy, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h5 className="text-white font-semibold mb-2">{strategy.strategy}</h5>
                    <p className="text-gray-300 text-sm mb-3">{strategy.implementation}</p>
                    <div className="bg-green-500/5 p-2 rounded">
                      <p className="text-green-400 text-sm"><strong>Expected Impact:</strong> {strategy.expectedImpact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Fixes */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">⚡ Quick Fixes (Implement Now)</h4>
                <button
                  onClick={() => handleCopy(autopsyResult.quickFixes.join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {autopsyResult.quickFixes.map((fix, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{fix}</p>
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

export default ChurnAutopsyReport;