import React, { useState } from 'react';
import { Monitor, Loader2, Lock, Copy, Palette, Type, Image, Layout } from 'lucide-react';
import { buildVisualAd } from '../services/newFeatures2';
import { VisualAdBuilder as VisualAdBuilderType } from '../types/newFeatures2';

interface VisualAdBuilderProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const VisualAdBuilder: React.FC<VisualAdBuilderProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [adCopy, setAdCopy] = useState('');
  const [platform, setPlatform] = useState('');
  const [isBuilding, setIsBuilding] = useState(false);
  const [visualAd, setVisualAd] = useState<VisualAdBuilderType | null>(null);

  const platforms = [
    'TikTok',
    'Instagram Reels',
    'Instagram Stories',
    'Facebook Feed',
    'YouTube Shorts',
    'Twitter/X',
    'LinkedIn'
  ];

  const handleBuild = async () => {
    if (!adCopy.trim() || !platform.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsBuilding(true);
    try {
      const result = await buildVisualAd(adCopy, platform);
      setVisualAd(result);
    } catch (error) {
      console.error('Error building visual ad:', error);
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
            Visual Ad Builder
          </h2>
          <p className="text-gray-400">
            Get detailed visual design instructions for your ad copy across different platforms
          </p>
        </div>

        {!visualAd ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Ad Copy</label>
                  <textarea
                    value={adCopy}
                    onChange={(e) => setAdCopy(e.target.value)}
                    placeholder="Paste your ad copy here to get visual design instructions..."
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Platform</label>
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
                onClick={handleBuild}
                disabled={isBuilding || !adCopy.trim() || !platform.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Building Visual Instructions...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Visual Builder - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-5 h-5" />
                    <span>Build Visual Ad Instructions</span>
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
            {/* Platform & Copy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📱 {visualAd.platform} Visual Ad</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm leading-relaxed">{visualAd.adCopy}</p>
              </div>
            </div>

            {/* Visual Elements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🎨 Visual Design Elements</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Layout className="w-5 h-5 text-blue-400" />
                    <h5 className="text-blue-400 font-semibold">Layout</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{visualAd.visualElements.layout}</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <h5 className="text-purple-400 font-semibold">Colors</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{visualAd.visualElements.colorScheme}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Type className="w-5 h-5 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Typography</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{visualAd.visualElements.typography}</p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Image className="w-5 h-5 text-orange-400" />
                    <h5 className="text-orange-400 font-semibold">Imagery</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{visualAd.visualElements.imagery}</p>
                </div>
              </div>
            </div>

            {/* Overlay Elements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📝 Text Overlay Elements</h4>
              <div className="space-y-4">
                {visualAd.overlayElements.map((overlay, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <h5 className="text-white font-semibold mb-2">Text</h5>
                        <p className="text-gray-300 text-sm">"{overlay.text}"</p>
                      </div>
                      <div>
                        <h5 className="text-blue-400 font-semibold mb-2">Timing</h5>
                        <p className="text-gray-300 text-sm">{overlay.timing}</p>
                      </div>
                      <div>
                        <h5 className="text-green-400 font-semibold mb-2">Position</h5>
                        <p className="text-gray-300 text-sm">{overlay.position}</p>
                      </div>
                      <div>
                        <h5 className="text-purple-400 font-semibold mb-2">Style</h5>
                        <p className="text-gray-300 text-sm">{overlay.style}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Specifications */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📐 Technical Specifications</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-blue-400 font-semibold mb-2">Dimensions</h5>
                  <p className="text-white text-sm">{visualAd.designSpecs.dimensions}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-green-400 font-semibold mb-2">Aspect Ratio</h5>
                  <p className="text-white text-sm">{visualAd.designSpecs.aspectRatio}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-purple-400 font-semibold mb-2">File Format</h5>
                  <p className="text-white text-sm">{visualAd.designSpecs.fileFormat}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h5 className="text-orange-400 font-semibold mb-2">Duration</h5>
                  <p className="text-white text-sm">{visualAd.designSpecs.duration}</p>
                </div>
              </div>
            </div>

            {/* Mockup Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">🖼️ Complete Visual Mockup</h4>
                <button
                  onClick={() => handleCopy(visualAd.mockupDescription)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{visualAd.mockupDescription}</p>
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💡 Platform-Specific Design Tips</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {visualAd.designTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{tip}</p>
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

export default VisualAdBuilder;