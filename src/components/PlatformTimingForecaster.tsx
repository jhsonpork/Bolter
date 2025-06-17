import React, { useState } from 'react';
import { Clock, Loader2, Lock, Copy, Calendar, Globe } from 'lucide-react';
import { forecastTiming } from '../services/moreFeatures';
import { PlatformTimingForecaster as PlatformTimingForecasterType } from '../types/moreFeatures';

interface PlatformTimingForecasterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PlatformTimingForecaster: React.FC<PlatformTimingForecasterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [contentType, setContentType] = useState('');
  const [timezone, setTimezone] = useState('');
  const [niche, setNiche] = useState('');
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecast, setForecast] = useState<PlatformTimingForecasterType | null>(null);

  const contentTypes = [
    'Educational', 'Entertainment', 'Inspirational', 'Tutorial',
    'Product Review', 'Behind-the-Scenes', 'Day-in-the-Life', 'Trending Challenge'
  ];

  const timezones = [
    'Eastern Time (ET)', 'Central Time (CT)', 'Mountain Time (MT)', 'Pacific Time (PT)',
    'Greenwich Mean Time (GMT)', 'Central European Time (CET)', 'Japan Standard Time (JST)',
    'Australian Eastern Time (AET)'
  ];

  const niches = [
    'Fitness', 'Beauty', 'Finance', 'Tech', 'Food', 'Travel',
    'Business', 'Fashion', 'Gaming', 'Health', 'Education', 'Lifestyle'
  ];

  const handleForecast = async () => {
    if (!contentType.trim() || !timezone.trim() || !niche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsForecasting(true);
    try {
      const result = await forecastTiming(contentType, timezone, niche);
      setForecast(result);
    } catch (error) {
      console.error('Error forecasting timing:', error);
    } finally {
      setIsForecasting(false);
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
            Platform Timing Forecaster
          </h2>
          <p className="text-gray-400">
            Predict the optimal posting times for maximum reach and engagement
          </p>
        </div>

        {!forecast ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Content Type</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Content Type</option>
                    {contentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Timezone</option>
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Niche</label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Niche</option>
                    {niches.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleForecast}
                disabled={isForecasting || !contentType.trim() || !timezone.trim() || !niche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isForecasting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Forecasting Timing...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Timing Forecaster - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    <span>Forecast Optimal Timing</span>
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
            {/* Forecast Parameters */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📊 Forecast Parameters</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-blue-400 font-semibold mb-2">Content Type</h4>
                  <p className="text-white">{forecast.contentType}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-green-400 font-semibold mb-2">Timezone</h4>
                  <p className="text-white">{forecast.timezone}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <h4 className="text-purple-400 font-semibold mb-2">Niche</h4>
                  <p className="text-white">{forecast.niche}</p>
                </div>
              </div>
            </div>

            {/* Platform Predictions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* TikTok */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-pink-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-pink-400" />
                    </div>
                    <h4 className="text-pink-400 font-bold text-lg">TikTok</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(forecast.predictions.tiktok)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{forecast.predictions.tiktok}</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-purple-400 font-bold text-lg">Instagram</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(forecast.predictions.instagram)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{forecast.predictions.instagram}</p>
                </div>
              </div>

              {/* YouTube Shorts */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-red-400" />
                    </div>
                    <h4 className="text-red-400 font-bold text-lg">YouTube Shorts</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(forecast.predictions.youtubeShorts)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{forecast.predictions.youtubeShorts}</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-blue-400 font-bold text-lg">Email</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(forecast.predictions.email)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">{forecast.predictions.email}</p>
                </div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-6 h-6 text-yellow-400" />
                <h4 className="text-yellow-400 font-bold text-lg">Timing Logic</h4>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{forecast.reasoning}</p>
              </div>
            </div>

            {/* Calendar View */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📅 Weekly Calendar View</h4>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center">
                    <div className="bg-gray-700 rounded-t-lg p-2">
                      <span className="text-white font-medium">{day}</span>
                    </div>
                    <div className="bg-gray-900/50 rounded-b-lg p-2 h-24 flex flex-col justify-center">
                      <div className="text-xs text-pink-400 mb-1">TikTok</div>
                      <div className="text-xs text-purple-400 mb-1">Instagram</div>
                      <div className="text-xs text-red-400 mb-1">YouTube</div>
                      <div className="text-xs text-blue-400">Email</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs text-center mt-2">
                * This is a simplified view. Refer to the detailed predictions above for specific times.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlatformTimingForecaster;