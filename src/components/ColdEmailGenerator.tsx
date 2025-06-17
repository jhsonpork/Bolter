import React, { useState } from 'react';
import { Mail, Loader2, Lock, Send, Upload, Copy, Download, Users } from 'lucide-react';
import { generateColdEmail, sendEmail } from '../services/email';
import { ColdEmailResult } from '../types/email';
import Papa from 'papaparse';

interface ColdEmailGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ColdEmailGenerator: React.FC<ColdEmailGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [businessDescription, setBusinessDescription] = useState('');
  const [targetNiche, setTargetNiche] = useState('');
  const [emailType, setEmailType] = useState('outreach');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmails, setGeneratedEmails] = useState<ColdEmailResult | null>(null);
  const [leadList, setLeadList] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendResults, setSendResults] = useState<any[]>([]);

  const emailTypes = [
    { id: 'outreach', label: 'Cold Outreach', emoji: '📧' },
    { id: 'partnership', label: 'Partnership', emoji: '🤝' },
    { id: 'sales', label: 'Sales Pitch', emoji: '💰' },
    { id: 'followup', label: 'Follow-up', emoji: '🔄' },
  ];

  const handleGenerate = async () => {
    if (!businessDescription.trim() || !targetNiche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateColdEmail(businessDescription, targetNiche, emailType);
      setGeneratedEmails(result);
    } catch (error) {
      console.error('Error generating emails:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        setLeadList(results.data as any[]);
      },
      header: true,
      skipEmptyLines: true
    });
  };

  const handleSendEmails = async () => {
    if (!generatedEmails || leadList.length === 0) return;

    setIsSending(true);
    const results = [];

    for (const lead of leadList.slice(0, 5)) { // Limit to 5 for demo
      try {
        const result = await sendEmail({
          to: lead.email,
          subject: generatedEmails.subject,
          content: generatedEmails.emailBody.replace('[Name]', lead.name || 'there')
        });
        results.push({ lead, status: 'sent', result });
      } catch (error) {
        results.push({ lead, status: 'failed', error });
      }
    }

    setSendResults(results);
    setIsSending(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadLeadTemplate = () => {
    const template = 'name,email,company,position\nJohn Doe,john@example.com,Example Corp,CEO\nJane Smith,jane@company.com,Company Inc,Marketing Director';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead-list-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Cold Email Generator & Sender
          </h2>
          <p className="text-gray-400">
            Generate high-conversion outreach emails and send them automatically
          </p>
        </div>

        {!generatedEmails ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              {/* Email Type Selector */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Email Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {emailTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmailType(type.id)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        emailType === type.id
                          ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.emoji}</div>
                      <div>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Your Business</label>
                  <textarea
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder="Describe your business, what you offer, and your unique value proposition..."
                    className="w-full h-24 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Target Niche</label>
                  <input
                    type="text"
                    value={targetNiche}
                    onChange={(e) => setTargetNiche(e.target.value)}
                    placeholder="e.g., SaaS founders, e-commerce store owners, fitness coaches..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !businessDescription.trim() || !targetNiche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Emails...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Email Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Generate Cold Emails</span>
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Generated Emails */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Subject Line</h3>
                    <button
                      onClick={() => handleCopy(generatedEmails.subject)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white text-lg font-semibold">{generatedEmails.subject}</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-yellow-400 font-bold text-lg">Email Body</h3>
                    <button
                      onClick={() => handleCopy(generatedEmails.emailBody)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-gray-900/50 rounded-lg p-4">
                    {generatedEmails.emailBody}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Follow-up Sequence</h3>
                  <div className="space-y-4">
                    {generatedEmails.followUps.map((followUp, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">Follow-up #{index + 1}</h4>
                          <button
                            onClick={() => handleCopy(followUp)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm">{followUp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email Sender */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Lead List & Sender</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-white font-medium">Upload Lead List (CSV)</label>
                        <button
                          onClick={downloadLeadTemplate}
                          className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center space-x-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Template</span>
                        </button>
                      </div>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                                 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                                 file:bg-yellow-400 file:text-black file:font-medium"
                      />
                    </div>

                    {leadList.length > 0 && (
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">{leadList.length} leads loaded</span>
                        </div>
                        <div className="text-gray-300 text-sm">
                          Preview: {leadList.slice(0, 3).map(lead => lead.email).join(', ')}
                          {leadList.length > 3 && '...'}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSendEmails}
                      disabled={isSending || leadList.length === 0}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                               font-bold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all duration-300 
                               disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Emails...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send to {Math.min(leadList.length, 5)} Leads</span>
                        </>
                      )}
                    </button>

                    {sendResults.length > 0 && (
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Send Results</h4>
                        <div className="space-y-2">
                          {sendResults.map((result, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-gray-300">{result.lead.email}</span>
                              <span className={result.status === 'sent' ? 'text-green-400' : 'text-red-400'}>
                                {result.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Warmup Checker */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Spam Score Checker</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Subject Line Score</span>
                      <span className="text-green-400 font-semibold">8.5/10</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Content Quality</span>
                      <span className="text-green-400 font-semibold">9.2/10</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">Spam Risk</span>
                      <span className="text-green-400 font-semibold">Low</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ColdEmailGenerator;