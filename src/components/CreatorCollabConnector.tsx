import React, { useState } from 'react';
import { HandshakeIcon, Loader2, Lock, Copy, Users, Video, MessageSquare, TrendingUp } from 'lucide-react';
import { connectCreatorCollabs } from '../services/moreFeatures';
import { CreatorCollabConnector as CreatorCollabConnectorType } from '../types/moreFeatures';

interface CreatorCollabConnectorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CreatorCollabConnector: React.FC<CreatorCollabConnectorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [niche, setNiche] = useState('');
  const [followingSize, setFollowingSize] = useState('');
  const [platform, setPlatform] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [collabs, setCollabs] = useState<CreatorCollabConnectorType | null>(null);

  const followingSizes = [
    'Under 1,000 followers',
    '1,000 - 10,000 followers',
    '10,000 - 50,000 followers',
    '50,000 - 100,000 followers',
    '100,000 - 500,000 followers',
    '500,000+ followers'
  ];

  const platforms = [
    'TikTok', 'Instagram', 'YouTube', 'Twitter/X', 'LinkedIn', 'Twitch'
  ];

  const handleConnect = async () => {
    if (!niche.trim() || !followingSize.trim() || !platform.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsConnecting(true);
    try {
      const result = await connectCreatorCollabs(niche, followingSize, platform);
      setCollabs(result);
    } catch (error) {
      console.error('Error connecting creator collabs:', error);
    } finally {
      setIsConnecting(false);
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
            Creator Collab Connector
          </h2>
          <p className="text-gray-400">
            Build perfect-fit collaboration plans to 10x your reach and virality
          </p>
        </div>

        {!collabs ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Your Niche</label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., fitness, marketing, cooking, personal finance..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Following Size</label>
                  <select
                    value={followingSize}
                    onChange={(e) => setFollowingSize(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Following Size</option>
                    {followingSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Primary Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Platform</option>
                    {platforms.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleConnect}
                disabled={isConnecting || !niche.trim() || !followingSize.trim() || !platform.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Finding Perfect Collabs...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Collab Connector - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <HandshakeIcon className="w-5 h-5" />
                    <span>Find Perfect Collabs</span>
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
            {/* Creator Profile */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">👤 Your Creator Profile</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-blue-400 font-semibold mb-2">Niche</h4>
                  <p className="text-white">{collabs.niche}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-green-400 font-semibold mb-2">Following Size</h4>
                  <p className="text-white">{collabs.followingSize}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-purple-400 font-semibold mb-2">Platform</h4>
                  <p className="text-white">{collabs.platform}</p>
                </div>
              </div>
            </div>

            {/* Collaboration Opportunities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center">🤝 Collaboration Opportunities</h3>
              {collabs.collaborations.map((collab, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <h4 className="text-blue-400 font-bold text-lg">Collab #{index + 1}: {collab.creatorType}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(`Collaboration Format: ${collab.collaborationFormat}\n\nScript Outline: ${collab.scriptOutline}\n\nValue Split: ${collab.valueSplit}\n\nCross-Promo CTA: ${collab.crossPromoCTA}`)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Video className="w-4 h-4 text-pink-400" />
                        <h5 className="text-pink-400 font-semibold">Collaboration Format</h5>
                      </div>
                      <p className="text-gray-300 text-sm">{collab.collaborationFormat}</p>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <h5 className="text-green-400 font-semibold">Value Split</h5>
                      </div>
                      <p className="text-gray-300 text-sm">{collab.valueSplit}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <h5 className="text-purple-400 font-semibold">Script Outline</h5>
                    </div>
                    <p className="text-gray-300 text-sm">{collab.scriptOutline}</p>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cross-Promotion CTA</h5>
                    <p className="text-gray-300 text-sm">{collab.crossPromoCTA}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Outreach Templates */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-green-400 font-bold text-lg">📨 Outreach Templates</h4>
                <button
                  onClick={() => handleCopy(collabs.outreachTemplates.join('\n\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {collabs.outreachTemplates.map((template, index) => (
                  <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">{template}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Benefits & Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-yellow-400 font-bold text-lg mb-4">✨ Collaboration Benefits</h4>
                <ul className="space-y-2">
                  {collabs.collaborationBenefits.map((benefit, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-blue-400 font-bold text-lg mb-4">📊 Success Metrics</h4>
                <ul className="space-y-2">
                  {collabs.successMetrics.map((metric, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Collaboration Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Collaboration Strategy Guide</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Finding Partners</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Search platform-specific hashtags</li>
                    <li>• Look for creators with similar audience size</li>
                    <li>• Focus on complementary niches</li>
                    <li>• Analyze engagement quality, not just quantity</li>
                    <li>• Check their previous collaborations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Executing Collabs</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Set clear expectations in writing</li>
                    <li>• Create a shared content calendar</li>
                    <li>• Prepare promotion assets for each other</li>
                    <li>• Coordinate posting times for maximum impact</li>
                    <li>• Engage with each other's audience comments</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Maximizing Results</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Create multiple pieces of content from one session</li>
                    <li>• Share behind-the-scenes of your collab</li>
                    <li>• Create a joint lead magnet or offer</li>
                    <li>• Plan for ongoing cross-promotion</li>
                    <li>• Track and share results with your partner</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorCollabConnector;