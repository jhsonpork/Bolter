import React, { useState } from 'react';
import { PresentationIcon, Loader2, Lock, Copy, TrendingUp, ShieldAlert, Target } from 'lucide-react';
import { alchemizeBoardMeeting } from '../services/businessFeatures';
import { BoardMeetingResult } from '../types/businessFeatures';

interface BoardMeetingAlchemistProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const BoardMeetingAlchemist: React.FC<BoardMeetingAlchemistProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [metrics, setMetrics] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [boardResult, setBoardResult] = useState<BoardMeetingResult | null>(null);

  const handleTransform = async () => {
    if (!metrics.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsTransforming(true);
    try {
      const result = await alchemizeBoardMeeting(metrics);
      setBoardResult(result);
    } catch (error) {
      console.error('Error transforming board meeting content:', error);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const metricsExamples = [
    "MRR: $125K (+15% MoM), CAC: $850, Churn: 3.2%, ARPU: $95",
    "Revenue: $2.4M (+5% QoQ), Burn rate: $180K/mo, Runway: 8 months",
    "Active users: 45K (+22% MoM), Conversion: 2.8%, Retention: 65%"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Board Meeting Alchemist™
          </h2>
          <p className="text-gray-400">
            Transform raw metrics into compelling board meeting narratives
          </p>
        </div>

        {!boardResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Raw Metrics</label>
                <textarea
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  placeholder="Paste your raw metrics (MRR, CAC, churn, etc.)..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="mt-2">
                  <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                  <div className="flex flex-col space-y-2">
                    {metricsExamples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setMetrics(example)}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleTransform}
                disabled={isTransforming || !metrics.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isTransforming ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transforming Metrics...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Board Meeting Alchemist - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <PresentationIcon className="w-5 h-5" />
                    <span>Transform for Board Meeting</span>
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
            {/* Raw Metrics */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📊 Raw Metrics</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">{boardResult.metrics}</p>
              </div>
            </div>

            {/* Growth Story */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">Growth Story</h4>
                </div>
                <button
                  onClick={() => handleCopy(boardResult.growthStory.narrative)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm">{boardResult.growthStory.narrative}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-2">Key Talking Points</h5>
                  <ul className="space-y-2">
                    {boardResult.growthStory.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Suggested Visualizations</h5>
                  <ul className="space-y-2">
                    {boardResult.growthStory.visualizations.map((viz, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{viz}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Risk Mitigation */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldAlert className="w-6 h-6 text-orange-400" />
                <h4 className="text-orange-400 font-bold text-lg">Risk Mitigation</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-white font-semibold mb-2">Identified Risks</h5>
                  <ul className="space-y-2">
                    {boardResult.riskMitigation.risks.map((risk, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Mitigation Strategies</h5>
                  <ul className="space-y-2">
                    {boardResult.riskMitigation.mitigationStrategies.map((strategy, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Talking Points</h5>
                  <ul className="space-y-2">
                    {boardResult.riskMitigation.talkingPoints.map((point, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ask Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">Ask Strategy</h4>
                </div>
                <button
                  onClick={() => handleCopy(`Request: ${boardResult.askStrategy.request}\n\nJustification: ${boardResult.askStrategy.justification}\n\nFallback Positions: ${boardResult.askStrategy.fallbackPositions.join(', ')}`)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Request</h5>
                  <p className="text-gray-300 text-sm">{boardResult.askStrategy.request}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">Justification</h5>
                  <p className="text-gray-300 text-sm">{boardResult.askStrategy.justification}</p>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Fallback Positions</h5>
                  <div className="space-y-2">
                    {boardResult.askStrategy.fallbackPositions.map((position, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">{position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Board Deck */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-yellow-400 font-bold text-lg">🎯 Board Deck Outline</h4>
                <button
                  onClick={() => handleCopy(`${boardResult.boardDeck.title}\n\n${boardResult.boardDeck.slides.map(slide => `${slide.slideTitle}\n${slide.content}`).join('\n\n')}`)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <h5 className="text-white font-semibold text-lg mb-4">{boardResult.boardDeck.title}</h5>
              <div className="space-y-4">
                {boardResult.boardDeck.slides.map((slide, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h6 className="text-yellow-400 font-semibold mb-2">Slide {index + 1}: {slide.slideTitle}</h6>
                    <p className="text-gray-300 text-sm">{slide.content}</p>
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

export default BoardMeetingAlchemist;