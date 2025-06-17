import React, { useState } from 'react';
import { MessageCircle, Loader2, Lock, Copy, TrendingUp, Users, Heart } from 'lucide-react';
import { generateCommentBait } from '../services/advancedFeatures';
import { CommentBaitResult } from '../types/advancedFeatures';

interface CommentBaitGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CommentBaitGenerator: React.FC<CommentBaitGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [postIdea, setPostIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [commentBait, setCommentBait] = useState<CommentBaitResult | null>(null);

  const handleGenerate = async () => {
    if (!postIdea.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateCommentBait(postIdea);
      setCommentBait(result);
    } catch (error) {
      console.error('Error generating comment bait:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getBaitTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('tag')) return '👥';
    if (type.toLowerCase().includes('question')) return '❓';
    if (type.toLowerCase().includes('poll')) return '📊';
    if (type.toLowerCase().includes('controversial')) return '🔥';
    return '💬';
  };

  const getBaitTypeColor = (type: string) => {
    if (type.toLowerCase().includes('tag')) return 'bg-blue-500/20 text-blue-400';
    if (type.toLowerCase().includes('question')) return 'bg-green-500/20 text-green-400';
    if (type.toLowerCase().includes('poll')) return 'bg-purple-500/20 text-purple-400';
    if (type.toLowerCase().includes('controversial')) return 'bg-red-500/20 text-red-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  const getEngagementColor = (level: string) => {
    if (level.toLowerCase().includes('high')) return 'text-green-400';
    if (level.toLowerCase().includes('medium')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comment Bait Generator
          </h2>
          <p className="text-gray-400">
            Generate engagement-boosting comment baits that trigger discussion and saves
          </p>
        </div>

        {!commentBait ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Post Idea or Topic</label>
                <textarea
                  value={postIdea}
                  onChange={(e) => setPostIdea(e.target.value)}
                  placeholder="Describe your post idea or topic you want to create engagement around..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !postIdea.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Comment Baits...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Comment Bait Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>Generate 3 Comment Baits</span>
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
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                💬 Comment Baits for Your Post
              </h3>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 max-w-2xl mx-auto">
                <h4 className="text-yellow-400 font-semibold mb-2">Original Post Idea</h4>
                <p className="text-gray-300 text-sm">{commentBait.postIdea}</p>
              </div>
            </div>

            {/* Comment Baits */}
            <div className="grid lg:grid-cols-3 gap-6">
              {commentBait.commentBaits.map((bait, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getBaitTypeIcon(bait.type)}</span>
                      <h4 className="text-yellow-400 font-bold text-lg">Bait #{index + 1}</h4>
                    </div>
                    <button
                      onClick={() => handleCopy(bait.bait)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bait Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBaitTypeColor(bait.type)}`}>
                      {bait.type}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      {bait.platform}
                    </span>
                    <div className="flex items-center space-x-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span className={getEngagementColor(bait.expectedEngagement)}>
                        {bait.expectedEngagement}
                      </span>
                    </div>
                  </div>

                  {/* Main Bait */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">💬 Comment Bait</h5>
                    <p className="text-green-300 font-medium">"{bait.bait}"</p>
                  </div>

                  {/* Reasoning */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <h5 className="text-purple-400 font-semibold mb-2">🧠 Why This Works</h5>
                    <p className="text-gray-300 text-sm">{bait.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <h4 className="text-pink-400 font-bold text-lg">Additional Engagement Tips</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {commentBait.engagementTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Bait Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📈 Comment Bait Strategy Guide</h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-blue-400" />
                    <h5 className="text-blue-400 font-semibold">Tag Baits</h5>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• "Tag someone who..."</li>
                    <li>• "Send this to your..."</li>
                    <li>• "Who needs to see this?"</li>
                    <li>• Best for: Reach expansion</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Question Baits</h5>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• "What's your biggest..."</li>
                    <li>• "How do you handle..."</li>
                    <li>• "Am I the only one who..."</li>
                    <li>• Best for: Deep engagement</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h5 className="text-purple-400 font-semibold">Poll Baits</h5>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• "A or B?"</li>
                    <li>• "Rate this 1-10"</li>
                    <li>• "Which team are you?"</li>
                    <li>• Best for: Easy participation</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-red-400" />
                    <h5 className="text-red-400 font-semibold">Controversial</h5>
                  </div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• "Unpopular opinion..."</li>
                    <li>• "Change my mind..."</li>
                    <li>• "Hot take:"</li>
                    <li>• Best for: Viral potential</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Response Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Response Strategy</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">✅ Do This</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Respond to comments quickly</li>
                    <li>• Ask follow-up questions</li>
                    <li>• Heart/like every comment</li>
                    <li>• Pin the best responses</li>
                    <li>• Share interesting replies to stories</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">❌ Avoid This</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Ignoring negative comments</li>
                    <li>• Generic "thanks" responses</li>
                    <li>• Arguing with trolls</li>
                    <li>• Deleting constructive criticism</li>
                    <li>• Being too promotional in replies</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold mb-2">🚀 Pro Tips</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Use comment baits in stories too</li>
                    <li>• Create comment-to-DM funnels</li>
                    <li>• Screenshot great comments for content</li>
                    <li>• Turn popular comments into posts</li>
                    <li>• Collaborate with active commenters</li>
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

export default CommentBaitGenerator;