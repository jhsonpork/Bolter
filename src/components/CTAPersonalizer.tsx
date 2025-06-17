import React, { useState } from 'react';
import { UserPlus, Loader2, Lock, Copy, Target, Heart, Zap } from 'lucide-react';
import { personalizeCTA } from '../services/newFeatures2';
import { CTAPersonalizer as CTAPersonalizerType } from '../types/newFeatures2';

interface CTAPersonalizerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CTAPersonalizer: React.FC<CTAPersonalizerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [audience, setAudience] = useState('');
  const [product, setProduct] = useState('');
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [personalizedCTAs, setPersonalizedCTAs] = useState<CTAPersonalizerType | null>(null);

  const audienceExamples = [
    'Busy working moms',
    'College students on a budget',
    'Tech startup founders',
    'Fitness enthusiasts',
    'Small business owners',
    'Remote workers',
    'New parents',
    'Retirees'
  ];

  const handlePersonalize = async () => {
    if (!audience.trim() || !product.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsPersonalizing(true);
    try {
      const result = await personalizeCTA(audience, product);
      setPersonalizedCTAs(result);
    } catch (error) {
      console.error('Error personalizing CTAs:', error);
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getUrgencyColor = (level: number) => {
    if (level >= 8) return 'text-red-400';
    if (level >= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getToneColor = (tone: string) => {
    const colors: { [key: string]: string } = {
      'urgent': 'bg-red-500/20 text-red-400',
      'casual': 'bg-green-500/20 text-green-400',
      'professional': 'bg-blue-500/20 text-blue-400',
      'friendly': 'bg-yellow-500/20 text-yellow-400',
      'edgy': 'bg-purple-500/20 text-purple-400'
    };
    return colors[tone.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            CTA Personalizer
          </h2>
          <p className="text-gray-400">
            Create CTAs perfectly matched to specific audience personas and identities
          </p>
        </div>

        {!personalizedCTAs ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Target Audience</label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., busy working moms, college students, startup founders..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                  <div className="mt-2">
                    <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {audienceExamples.slice(0, 4).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setAudience(example)}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Product/Service</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g., productivity app, fitness course, meal planning service..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={handlePersonalize}
                disabled={isPersonalizing || !audience.trim() || !product.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPersonalizing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Personalizing CTAs...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock CTA Personalizer - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Generate 5 Personalized CTAs</span>
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
            {/* Audience & Product */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎯 CTAs for {personalizedCTAs.audience}
              </h3>
              <p className="text-gray-400">Product: {personalizedCTAs.product}</p>
            </div>

            {/* Audience Insights */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Audience Psychology</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h5 className="text-blue-400 font-semibold">Language</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{personalizedCTAs.audienceInsights.language}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <h5 className="text-pink-400 font-semibold">Motivations</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{personalizedCTAs.audienceInsights.motivations}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-red-400" />
                    <h5 className="text-red-400 font-semibold">Objections</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{personalizedCTAs.audienceInsights.objections}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Triggers</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{personalizedCTAs.audienceInsights.triggers}</p>
                </div>
              </div>
            </div>

            {/* Personalized CTAs */}
            <div className="grid lg:grid-cols-2 gap-6">
              {personalizedCTAs.personalizedCTAs.map((cta, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-yellow-400 font-bold text-lg">CTA #{index + 1}</h4>
                    <button
                      onClick={() => handleCopy(cta.cta)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* CTA Text */}
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <p className="text-white font-semibold text-lg">"{cta.cta}"</p>
                  </div>

                  {/* CTA Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tone:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getToneColor(cta.tone)}`}>
                        {cta.tone}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Urgency Level:</span>
                      <span className={`font-bold ${getUrgencyColor(cta.urgency)}`}>
                        {cta.urgency}/10
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Best Platform:</span>
                      <span className="text-blue-400 font-medium">{cta.platform}</span>
                    </div>
                  </div>

                  {/* Personalization */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
                    <h5 className="text-purple-400 font-semibold mb-2">🎯 Personalization</h5>
                    <p className="text-gray-300 text-sm">{cta.personalization}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Avoid List */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-red-400 font-bold text-lg mb-4">❌ CTA Styles to Avoid</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {personalizedCTAs.avoidList.map((avoid, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{avoid}</p>
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

export default CTAPersonalizer;