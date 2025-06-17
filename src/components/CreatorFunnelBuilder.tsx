import React, { useState } from 'react';
import { Fuel as Funnel, Loader2, Lock, Copy, Download, FileText, Mail, DollarSign } from 'lucide-react';
import { buildCreatorFunnel } from '../services/moreFeatures';
import { CreatorFunnelBuilder as CreatorFunnelBuilderType } from '../types/moreFeatures';

interface CreatorFunnelBuilderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CreatorFunnelBuilder: React.FC<CreatorFunnelBuilderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [accountHandle, setAccountHandle] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [funnel, setFunnel] = useState<CreatorFunnelBuilderType | null>(null);

  const handleBuild = async () => {
    if (!accountHandle.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsBuilding(true);
    try {
      const result = await buildCreatorFunnel(accountHandle);
      setFunnel(result);
    } catch (error) {
      console.error('Error building creator funnel:', error);
    } finally {
      setIsBuilding(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (!funnel) return;

    const content = `
CREATOR FUNNEL FOR: ${funnel.accountHandle}
Generated: ${new Date().toLocaleDateString()}

LEAD MAGNET IDEA
---------------
${funnel.leadMagnetIdea}

EMAIL SEQUENCE
-------------
${funnel.emailSequence.map((email, i) => `Email ${i + 1}: ${email}`).join('\n\n')}

MONETIZATION APPROACH
-------------------
${funnel.monetizationApproach}

LANDING PAGE
-----------
Headline: ${funnel.landingPage.headline}

Social Proof: ${funnel.landingPage.socialProof}

CTA: ${funnel.landingPage.cta}

FAQs:
${funnel.landingPage.faqs.map((faq, i) => `${i + 1}. ${faq}`).join('\n')}

EXPORT FORMAT
------------
${funnel.exportFormat}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creator-funnel-${funnel.accountHandle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Instant Creator Funnel Builder
          </h2>
          <p className="text-gray-400">
            Turn your social media presence into a complete monetization funnel
          </p>
        </div>

        {!funnel ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Social Media Handle</label>
                <input
                  type="text"
                  value={accountHandle}
                  onChange={(e) => setAccountHandle(e.target.value)}
                  placeholder="e.g., @yourhandle or your content niche..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleBuild}
                disabled={isBuilding || !accountHandle.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Building Funnel...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Funnel Builder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Funnel className="w-5 h-5" />
                    <span>Build Complete Funnel</span>
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
            {/* Header with Download */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 Complete Funnel for {funnel.accountHandle}
              </h3>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold 
                         rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         flex items-center space-x-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete Funnel</span>
              </button>
            </div>

            {/* Lead Magnet & Monetization */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-6 h-6 text-blue-400" />
                  <h4 className="text-blue-400 font-bold text-lg">Lead Magnet Idea</h4>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-gray-300">{funnel.leadMagnetIdea}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">Monetization Approach</h4>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300">{funnel.monetizationApproach}</p>
                </div>
              </div>
            </div>

            {/* Email Sequence */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <h4 className="text-purple-400 font-bold text-lg">7-Part Email Sequence</h4>
              </div>
              <div className="space-y-4">
                {funnel.emailSequence.map((email, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-semibold">Email #{index + 1}</h5>
                      <button
                        onClick={() => handleCopy(email)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{email}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Landing Page */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🌐 Landing Page</h4>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Headline</h5>
                  <p className="text-gray-300 text-lg">{funnel.landingPage.headline}</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Social Proof</h5>
                  <p className="text-gray-300 text-sm">{funnel.landingPage.socialProof}</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Call to Action</h5>
                  <p className="text-yellow-400 font-medium">{funnel.landingPage.cta}</p>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">FAQs</h5>
                  <div className="space-y-2">
                    {funnel.landingPage.faqs.map((faq, index) => (
                      <div key={index} className="text-gray-300 text-sm">
                        <p>{faq}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Export Format */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📤 Export Format</h4>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{funnel.exportFormat}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorFunnelBuilder;