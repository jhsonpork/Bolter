import React, { useState } from 'react';
import { MessageSquare, Loader2, Lock, Copy, Video, Hash, Zap } from 'lucide-react';
import { explodeComments } from '../services/moreFeatures';
import { CommentExploder as CommentExploderType } from '../types/moreFeatures';

interface CommentExploderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CommentExploder: React.FC<CommentExploderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [viralPost, setViralPost] = useState('');
  const [isExploding, setIsExploding] = useState(false);
  const [explodedComments, setExplodedComments] = useState<CommentExploderType | null>(null);

  const handleExplode = async () => {
    if (!viralPost.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsExploding(true);
    try {
      const result = await explodeComments(viralPost);
      setExplodedComments(result);
    } catch (error) {
      console.error('Error exploding comments:', error);
    } finally {
      setIsExploding(false);
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
            Gemini-Powered Comment Exploder
          </h2>
          <p className="text-gray-400">
            Turn viral post comments into new content ideas and hooks
          </p>
        </div>

        {!explodedComments ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Viral Post</label>
                <textarea
                  value={viralPost}
                  onChange={(e) => setViralPost(e.target.value)}
                  placeholder="Paste a viral post from Twitter/X, Reddit, TikTok, etc..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleExplode}
                disabled={isExploding || !viralPost.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isExploding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Exploding Comments...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Comment Exploder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5" />
                    <span>Explode Into Content</span>
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
            {/* Original Post */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">🔍 Original Viral Post</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{explodedComments.viralPost}</p>
              </div>
            </div>

            {/* Extracted Comments */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💬 Extracted Comments</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {explodedComments.extractedComments.map((comment, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-semibold">Comment #{index + 1}</h5>
                      <button
                        onClick={() => handleCopy(comment)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm">{comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Content */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* TikTok Hooks */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Video className="w-6 h-6 text-pink-400" />
                  <h4 className="text-pink-400 font-bold text-lg">TikTok Hooks</h4>
                </div>
                <div className="space-y-3">
                  {explodedComments.expandedContent.tiktokHooks.map((hook, index) => (
                    <div key={index} className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-pink-400 text-xs font-medium">Hook #{index + 1}</span>
                        <button
                          onClick={() => handleCopy(hook)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{hook}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tweet Threads */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Hash className="w-6 h-6 text-blue-400" />
                  <h4 className="text-blue-400 font-bold text-lg">Tweet Threads</h4>
                </div>
                <div className="space-y-3">
                  {explodedComments.expandedContent.tweetThreads.map((thread, index) => (
                    <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-blue-400 text-xs font-medium">Thread #{index + 1}</span>
                        <button
                          onClick={() => handleCopy(thread)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{thread}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Angles */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">Video Angles</h4>
                </div>
                <div className="space-y-3">
                  {explodedComments.expandedContent.videoAngles.map((angle, index) => (
                    <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-green-400 text-xs font-medium">Angle #{index + 1}</span>
                        <button
                          onClick={() => handleCopy(angle)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{angle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategy Guide */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Comment Explosion Strategy</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-pink-400 font-semibold mb-3">TikTok Strategy</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Use hooks as direct video openers</li>
                    <li>• Create response videos to original</li>
                    <li>• Stitch with original creator</li>
                    <li>• Tag original creator in caption</li>
                    <li>• Use same sounds/hashtags</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-semibold mb-3">Twitter Strategy</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Quote tweet the original post</li>
                    <li>• Create thread expanding on comments</li>
                    <li>• Tag original creator in first tweet</li>
                    <li>• Use same hashtags as original</li>
                    <li>• Add your unique perspective</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">Content Flywheel</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Create content calendar from angles</li>
                    <li>• Batch record multiple videos</li>
                    <li>• Test different hooks on same topic</li>
                    <li>• Repurpose across all platforms</li>
                    <li>• Monitor which angles perform best</li>
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

export default CommentExploder;