import React, { useState } from 'react';
import { AlertCircle, Loader2, Lock, Copy, Users, FileText, Send, MessageSquare } from 'lucide-react';
import { generateCrisisComms } from '../services/businessFeatures';
import { CrisisCommsResult } from '../types/businessFeatures';

interface CrisisCommsGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CrisisCommsGenerator: React.FC<CrisisCommsGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [crisisScenario, setCrisisScenario] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [commsResult, setCommsResult] = useState<CrisisCommsResult | null>(null);
  const [activeTab, setActiveTab] = useState<'customer' | 'press' | 'internal' | 'escalation' | 'social'>('customer');

  const handleGenerate = async () => {
    if (!crisisScenario.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateCrisisComms(crisisScenario);
      setCommsResult(result);
    } catch (error) {
      console.error('Error generating crisis communications:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const crisisExamples = [
    "Data leak affecting 10K users",
    "Service outage lasting 24 hours",
    "Security breach exposing customer data",
    "Product recall due to safety concerns",
    "Controversial statement by CEO"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Crisis Comms Generator™
          </h2>
          <p className="text-gray-400">
            Generate a complete crisis communications playbook in minutes
          </p>
        </div>

        {!commsResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Crisis Scenario</label>
                <textarea
                  value={crisisScenario}
                  onChange={(e) => setCrisisScenario(e.target.value)}
                  placeholder="Describe the crisis scenario in detail (e.g., data leak affecting 10K users, service outage, security breach)..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="mt-2">
                  <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {crisisExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setCrisisScenario(example)}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !crisisScenario.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Comms Playbook...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Crisis Comms Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Generate Crisis Playbook</span>
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
            {/* Crisis Scenario */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-4">🚨 Crisis Scenario</h3>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-gray-300">{commsResult.crisisScenario}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('customer')}
                  className={`px-4 py-3 font-medium text-sm flex-shrink-0 ${
                    activeTab === 'customer' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Customer Emails
                </button>
                <button
                  onClick={() => setActiveTab('press')}
                  className={`px-4 py-3 font-medium text-sm flex-shrink-0 ${
                    activeTab === 'press' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Press Statements
                </button>
                <button
                  onClick={() => setActiveTab('internal')}
                  className={`px-4 py-3 font-medium text-sm flex-shrink-0 ${
                    activeTab === 'internal' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Internal Memos
                </button>
                <button
                  onClick={() => setActiveTab('escalation')}
                  className={`px-4 py-3 font-medium text-sm flex-shrink-0 ${
                    activeTab === 'escalation' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Escalation Protocol
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`px-4 py-3 font-medium text-sm flex-shrink-0 ${
                    activeTab === 'social' 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  Social Media
                </button>
              </div>

              <div className="p-6">
                {/* Customer Emails */}
                {activeTab === 'customer' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <h4 className="text-blue-400 font-bold text-lg">Customer Emails</h4>
                    </div>
                    {commsResult.customerEmails.map((email, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="text-white font-semibold">{email.subject}</h5>
                            <p className="text-gray-400 text-xs mt-1">
                              <span className="mr-3">Timing: {email.timing}</span>
                              <span>Audience: {email.audience}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopy(`Subject: ${email.subject}\n\n${email.body}`)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <p className="text-gray-300 text-sm whitespace-pre-line">{email.body}</p>
                        </div>
                        <button
                          onClick={() => window.open(`mailto:?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`)}
                          className="mt-3 px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Open in Email</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Press Statements */}
                {activeTab === 'press' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-green-400" />
                      <h4 className="text-green-400 font-bold text-lg">Press Statements</h4>
                    </div>
                    {commsResult.pressStatements.map((statement, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="text-white font-semibold">{statement.headline}</h5>
                            <p className="text-gray-400 text-xs mt-1">Timing: {statement.timing}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(`${statement.headline}\n\n${statement.statement}`)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <p className="text-gray-300 text-sm whitespace-pre-line">{statement.statement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Internal Memos */}
                {activeTab === 'internal' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <h4 className="text-purple-400 font-bold text-lg">Internal Memos</h4>
                    </div>
                    {commsResult.internalMemos.map((memo, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="text-white font-semibold">{memo.subject}</h5>
                            <p className="text-gray-400 text-xs mt-1">Audience: {memo.audience}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(`Subject: ${memo.subject}\n\n${memo.body}`)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                          <p className="text-gray-300 text-sm whitespace-pre-line">{memo.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Escalation Protocol */}
                {activeTab === 'escalation' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h4 className="text-red-400 font-bold text-lg">Escalation Protocol</h4>
                    </div>
                    {commsResult.escalationProtocol.map((protocol, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <h5 className="text-white font-semibold mb-2">Level: {protocol.level}</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-red-400 text-sm font-medium mb-1">Actions:</h6>
                            <ul className="space-y-1">
                              {protocol.actions.map((action, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h6 className="text-red-400 text-sm font-medium mb-1">Stakeholders:</h6>
                            <ul className="space-y-1">
                              {protocol.stakeholders.map((stakeholder, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{stakeholder}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Social Media Responses */}
                {activeTab === 'social' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      <h4 className="text-blue-400 font-bold text-lg">Social Media Responses</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {commsResult.socialMediaResponses.map((response, index) => (
                        <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-blue-400 text-sm font-medium">Response #{index + 1}</h5>
                            <button
                              onClick={() => handleCopy(response)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-gray-300 text-sm">{response}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CrisisCommsGenerator;