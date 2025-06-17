import React, { useState } from 'react';
import { Camera, Loader2, Lock, Copy, Clock, Eye, Zap } from 'lucide-react';
import { buildStoryboard } from '../services/advancedFeatures';
import { StoryboardBuilder as StoryboardType } from '../types/advancedFeatures';

interface StoryboardBuilderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const StoryboardBuilder: React.FC<StoryboardBuilderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [product, setProduct] = useState('');
  const [hook, setHook] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [storyboard, setStoryboard] = useState<StoryboardType | null>(null);

  const handleBuild = async () => {
    if (!product.trim() || !hook.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsBuilding(true);
    try {
      const result = await buildStoryboard(product, hook);
      setStoryboard(result);
    } catch (error) {
      console.error('Error building storyboard:', error);
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
            30-Second Storyboard Builder
          </h2>
          <p className="text-gray-400">
            Create detailed 4-shot storyboards for TikTok videos with camera angles and timing
          </p>
        </div>

        {!storyboard ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Product/Service</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g., fitness app, skincare product, online course..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Hook/Opening Line</label>
                  <input
                    type="text"
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    placeholder="e.g., Stop scrolling if you want to lose 10 pounds..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handleBuild}
                disabled={isBuilding || !product.trim() || !hook.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Building Storyboard...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Storyboard Builder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span>Build 4-Shot Storyboard</span>
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
            {/* Storyboard Shots */}
            <div className="grid lg:grid-cols-2 gap-6">
              {storyboard.shots.map((shot, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {shot.shotNumber}
                      </div>
                      <h4 className="text-yellow-400 font-bold text-lg">Shot {shot.shotNumber}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{shot.timing}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2 flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>Scene</span>
                      </h5>
                      <p className="text-gray-300 text-sm">{shot.scene}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2 flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-purple-400" />
                        <span>Camera Angle</span>
                      </h5>
                      <p className="text-gray-300 text-sm">{shot.cameraAngle}</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">Caption Overlay</h5>
                      <p className="text-yellow-400 text-sm font-medium">"{shot.captionOverlay}"</p>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h5 className="text-white font-semibold mb-2">Action</h5>
                      <p className="text-gray-300 text-sm">{shot.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Production Tips */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">CTA Placement</h4>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{storyboard.ctaPlacement}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-purple-400 font-bold text-lg mb-4">Transition Tips</h4>
                <ul className="space-y-2">
                  {storyboard.transitionTips.map((tip, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-orange-400 font-bold text-lg mb-4">Engagement Hooks</h4>
                <ul className="space-y-2">
                  {storyboard.engagementHooks.map((hook, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{hook}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copy Full Storyboard */}
            <div className="text-center">
              <button
                onClick={() => handleCopy(`
STORYBOARD: ${storyboard.product}
Hook: ${storyboard.hook}

${storyboard.shots.map(shot => `
SHOT ${shot.shotNumber} (${shot.timing})
Scene: ${shot.scene}
Camera: ${shot.cameraAngle}
Caption: "${shot.captionOverlay}"
Action: ${shot.action}
`).join('')}

CTA Placement: ${storyboard.ctaPlacement}
                `)}
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 
                         transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Full Storyboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoryboardBuilder;