import React, { useState } from 'react';
import { LayoutTemplate, Loader2, Lock, Copy, Calendar, FileText, Video } from 'lucide-react';
import { buildContentFramework } from '../services/moreFeatures';
import { ContentFrameworkBuilder as ContentFrameworkBuilderType } from '../types/moreFeatures';

interface ContentFrameworkBuilderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ContentFrameworkBuilder: React.FC<ContentFrameworkBuilderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [niche, setNiche] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [framework, setFramework] = useState<ContentFrameworkBuilderType | null>(null);

  const niches = [
    'Fitness', 'Beauty', 'Finance', 'Tech', 'Food', 'Travel',
    'Business', 'Fashion', 'Gaming', 'Health', 'Education', 'Lifestyle',
    'Parenting', 'Real Estate', 'Marketing', 'Personal Development'
  ];

  const handleBuild = async () => {
    if (!niche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsBuilding(true);
    try {
      const result = await buildContentFramework(niche);
      setFramework(result);
    } catch (error) {
      console.error('Error building content framework:', error);
    } finally {
      setIsBuilding(false);
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
            Instant Content Framework Builder
          </h2>
          <p className="text-gray-400">
            Get a structured viral framework and 7-day content plan for your niche
          </p>
        </div>

        {!framework ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Your Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select Your Niche</option>
                  {niches.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleBuild}
                disabled={isBuilding || !niche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Building Framework...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Framework Builder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <LayoutTemplate className="w-5 h-5" />
                    <span>Build Content Framework</span>
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
            {/* Viral Structure */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">🔥 Viral Structure for {framework.niche}</h3>
                <button
                  onClick={() => handleCopy(framework.framework.structure.join(' → '))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center">
                {framework.framework.structure.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                      <span className="text-white font-medium">{step}</span>
                    </div>
                    {index < framework.framework.structure.length - 1 && (
                      <div className="px-2">
                        <div className="w-6 h-0.5 bg-yellow-400"></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 7-Day Post Plan */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <h4 className="text-blue-400 font-bold text-lg">7-Day Post Plan</h4>
              </div>
              <div className="space-y-4">
                {framework.framework.postPlan.map((post, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-semibold">Day {post.day}: {post.topic}</h5>
                      <button
                        onClick={() => handleCopy(`Day ${post.day}: ${post.topic}\n\nHook: ${post.hook}\n\nContent: ${post.content}`)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="text-blue-400 text-sm font-medium mb-1">Hook</h6>
                        <p className="text-gray-300 text-sm">{post.hook}</p>
                      </div>
                      <div>
                        <h6 className="text-green-400 text-sm font-medium mb-1">Content</h6>
                        <p className="text-gray-300 text-sm">{post.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Script Skeletons */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Shorts */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Video className="w-6 h-6 text-pink-400" />
                    <h4 className="text-pink-400 font-bold text-lg">Shorts</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(framework.framework.scriptSkeletons.shorts)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{framework.framework.scriptSkeletons.shorts}</p>
                </div>
              </div>

              {/* Carousels */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <LayoutTemplate className="w-6 h-6 text-purple-400" />
                    <h4 className="text-purple-400 font-bold text-lg">Carousels</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(framework.framework.scriptSkeletons.carousels)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{framework.framework.scriptSkeletons.carousels}</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-green-400" />
                    <h4 className="text-green-400 font-bold text-lg">Email</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(framework.framework.scriptSkeletons.email)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{framework.framework.scriptSkeletons.email}</p>
                </div>
              </div>
            </div>

            {/* Framework Implementation */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📋 Framework Implementation Guide</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-3">Content Creation</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Batch create all 7 days at once</li>
                    <li>• Use the viral structure for each post</li>
                    <li>• Customize hooks for each platform</li>
                    <li>• Schedule posts at optimal times</li>
                    <li>• Repurpose across all platforms</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Engagement Strategy</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Respond to comments within 1 hour</li>
                    <li>• Ask questions in your captions</li>
                    <li>• Create polls in your stories</li>
                    <li>• Tag relevant accounts</li>
                    <li>• Use trending sounds and hashtags</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-3">Monetization Tips</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Add affiliate links where relevant</li>
                    <li>• Mention your products naturally</li>
                    <li>• Create a lead magnet related to topics</li>
                    <li>• Use day 7 for stronger CTA</li>
                    <li>• Track which topics convert best</li>
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

export default ContentFrameworkBuilder;