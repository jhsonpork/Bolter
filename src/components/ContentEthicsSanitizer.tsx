import React, { useState } from 'react';
import { Shield, Loader2, Lock, Copy, AlertTriangle, CheckCircle } from 'lucide-react';
import { sanitizeContent } from '../services/moreFeatures';
import { ContentEthicsSanitizer as ContentEthicsSanitizerType } from '../types/moreFeatures';

interface ContentEthicsSanitizerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ContentEthicsSanitizer: React.FC<ContentEthicsSanitizerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [content, setContent] = useState('');
  const [isSanitizing, setIsSanitizing] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState<ContentEthicsSanitizerType | null>(null);

  const handleSanitize = async () => {
    if (!content.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsSanitizing(true);
    try {
      const result = await sanitizeContent(content);
      setSanitizedContent(result);
    } catch (error) {
      console.error('Error sanitizing content:', error);
    } finally {
      setIsSanitizing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'High') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (severity === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            AI Content Ethics Sanitizer
          </h2>
          <p className="text-gray-400">
            Keep your content viral and safe from platform takedowns
          </p>
        </div>

        {!sanitizedContent ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Content to Sanitize</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your script, copy, or ad here to check for platform safety issues..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleSanitize}
                disabled={isSanitizing || !content.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSanitizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sanitizing Content...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Ethics Sanitizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Sanitize Content</span>
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
            {/* Compliance Score */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Content Compliance Score</h3>
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${
                sanitizedContent.complianceScore >= 8 
                  ? 'bg-green-500/20' 
                  : sanitizedContent.complianceScore >= 6 
                    ? 'bg-yellow-500/20' 
                    : 'bg-red-500/20'
              }`}>
                <Shield className="w-6 h-6 text-white" />
                <span className={`text-3xl font-bold ${getScoreColor(sanitizedContent.complianceScore)}`}>
                  {sanitizedContent.complianceScore}/10
                </span>
              </div>
            </div>

            {/* Flags */}
            {sanitizedContent.flags.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h4 className="text-red-400 font-bold text-lg">Content Flags</h4>
                </div>
                <div className="space-y-4">
                  {sanitizedContent.flags.map((flag, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(flag.severity)}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-bold">{flag.issue}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityColor(flag.severity)}`}>
                          {flag.severity}
                        </span>
                      </div>
                      <p className="text-sm mb-2"><strong>Platform:</strong> {flag.platform}</p>
                      <p className="text-sm">{flag.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Before/After Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold text-lg mb-4">❌ Original Content</h4>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{sanitizedContent.originalContent}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-green-400 font-bold text-lg">✅ Sanitized Content</h4>
                  <button
                    onClick={() => handleCopy(sanitizedContent.sanitizedContent)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{sanitizedContent.sanitizedContent}</p>
                </div>
              </div>
            </div>

            {/* Platform Guidelines */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Platform Guidelines</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-pink-400 font-semibold mb-2">TikTok</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Avoid direct mentions of competitors</li>
                    <li>• No explicit health claims</li>
                    <li>• Avoid "banned" words that trigger filters</li>
                    <li>• No direct calls for engagement</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-blue-400 font-semibold mb-2">Facebook/Instagram</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• No "you" statements about appearance</li>
                    <li>• Avoid personal attributes targeting</li>
                    <li>• No misleading claims or clickbait</li>
                    <li>• Careful with before/after imagery</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h5 className="text-red-400 font-semibold mb-2">YouTube</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Avoid controversial keywords in titles</li>
                    <li>• No medical misinformation</li>
                    <li>• Careful with income claims</li>
                    <li>• Disclose sponsored content</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Compliance Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🛡️ Staying Compliant While Going Viral</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Use "pattern interrupts" instead of controversial statements</p>
                </div>
                <div className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Frame claims as personal experiences rather than universal truths</p>
                </div>
                <div className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Use "creative spelling" for sensitive topics (e.g., "m0ney" instead of "money")</p>
                </div>
                <div className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Create multiple versions of high-risk content for different platforms</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentEthicsSanitizer;