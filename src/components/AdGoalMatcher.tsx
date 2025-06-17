import React, { useState } from 'react';
import { Crosshair, Loader2, Lock, Copy, Target, Zap, Users, TrendingUp } from 'lucide-react';
import { matchAdGoal } from '../services/newFeatures2';
import { AdGoalMatcher as AdGoalMatcherType } from '../types/newFeatures2';

interface AdGoalMatcherProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const AdGoalMatcher: React.FC<AdGoalMatcherProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [campaignGoal, setCampaignGoal] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [goalMatch, setGoalMatch] = useState<AdGoalMatcherType | null>(null);

  const goalOptions = [
    'Lead Generation',
    'App Installs',
    'Product Sales',
    'Event Signups',
    'Brand Awareness',
    'Website Traffic',
    'Email Subscribers',
    'Course Enrollments',
    'Consultation Bookings',
    'Free Trial Signups'
  ];

  const businessOptions = [
    'SaaS/Software',
    'E-commerce',
    'Coaching/Consulting',
    'Real Estate',
    'Fitness/Health',
    'Education/Courses',
    'Restaurant/Food',
    'Beauty/Skincare',
    'Finance/Investment',
    'Agency/Services'
  ];

  const handleMatch = async () => {
    if (!campaignGoal.trim() || !businessType.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsMatching(true);
    try {
      const result = await matchAdGoal(campaignGoal, businessType);
      setGoalMatch(result);
    } catch (error) {
      console.error('Error matching ad goal:', error);
    } finally {
      setIsMatching(false);
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
            Ad Goal Matcher
          </h2>
          <p className="text-gray-400">
            Optimize your ad elements for specific campaign goals and business types
          </p>
        </div>

        {!goalMatch ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Campaign Goal</label>
                  <select
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Campaign Goal</option>
                    {goalOptions.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Business Type</option>
                    {businessOptions.map((business) => (
                      <option key={business} value={business}>{business}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleMatch}
                disabled={isMatching || !campaignGoal.trim() || !businessType.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isMatching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Matching Goal...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Goal Matcher - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="w-5 h-5" />
                    <span>Match Ad to Goal</span>
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
            {/* Goal & Business Type */}
            <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎯 Optimized for {goalMatch.campaignGoal} • {goalMatch.businessType}
              </h3>
            </div>

            {/* Optimizations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">⚙️ Goal-Matched Optimizations</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <h5 className="text-blue-400 font-semibold mb-2">Tone</h5>
                  <p className="text-white text-sm">{goalMatch.optimizations.tone}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <h5 className="text-green-400 font-semibold mb-2">CTA Style</h5>
                  <p className="text-white text-sm">{goalMatch.optimizations.cta}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <h5 className="text-red-400 font-semibold mb-2">Urgency</h5>
                  <p className="text-white text-sm">{goalMatch.optimizations.urgency}/10</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <h5 className="text-purple-400 font-semibold mb-2">Platform</h5>
                  <p className="text-white text-sm">{goalMatch.optimizations.platform}</p>
                </div>
              </div>
            </div>

            {/* Additional Optimizations */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h5 className="text-yellow-400 font-semibold mb-3">🎭 Emotional Drivers</h5>
                <ul className="space-y-2">
                  {goalMatch.optimizations.emotionalDrivers.map((driver, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h5 className="text-blue-400 font-semibold mb-3">📏 Content Length</h5>
                <p className="text-gray-300 text-sm mb-3">{goalMatch.optimizations.contentLength}</p>
                <h5 className="text-green-400 font-semibold mb-3">🎨 Visual Style</h5>
                <p className="text-gray-300 text-sm">{goalMatch.optimizations.visualStyle}</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h5 className="text-purple-400 font-semibold mb-3">📊 Key Metrics</h5>
                <ul className="space-y-2">
                  {goalMatch.kpis.map((kpi, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sample Ads */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📝 Goal-Optimized Sample Ads</h4>
              <div className="space-y-4">
                {goalMatch.sampleAds.map((ad, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="text-white font-semibold">{ad.platform} Ad</h5>
                      <button
                        onClick={() => handleCopy(ad.ad)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{ad.ad}</p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-300 text-sm">{ad.reasoning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">💰 Budget Recommendations</h4>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-gray-300">{goalMatch.budgetRecommendations}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdGoalMatcher;