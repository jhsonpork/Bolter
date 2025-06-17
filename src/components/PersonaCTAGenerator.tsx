import React, { useState } from 'react';
import { UserCheck, Loader2, Lock, Copy, Target, Heart, Zap } from 'lucide-react';
import { generatePersonaCTAs } from '../services/advancedFeatures';
import { PersonaCTAResult } from '../types/advancedFeatures';

interface PersonaCTAGeneratorProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PersonaCTAGenerator: React.FC<PersonaCTAGeneratorProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [personaType, setPersonaType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ctaResult, setCTAResult] = useState<PersonaCTAResult | null>(null);

  const handleGenerate = async () => {
    if (!personaType.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generatePersonaCTAs(personaType);
      setCTAResult(result);
    } catch (error) {
      console.error('Error generating persona CTAs:', error);
    } finally {
      setIsGenerating(false);
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

  const personaExamples = [
    'Busy working mom',
    'Broke college student', 
    'Startup founder',
    'Retired senior',
    'Fitness enthusiast',
    'Small business owner',
    'Remote worker',
    'New parent'
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Persona-Specific CTA Generator
          </h2>
          <p className="text-gray-400">
            Generate CTAs that speak directly to specific persona identities
          </p>
        </div>

        {!ctaResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Persona Type</label>
                <input
                  type="text"
                  value={personaType}
                  onChange={(e) => setPersonaType(e.target.value)}
                  placeholder="e.g., busy working mom, broke college student, startup founder..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
                <div className="mt-3">
                  <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {personaExamples.slice(0, 4).map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPersonaType(example)}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !personaType.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Persona CTAs...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Persona CTA Generator - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    <span>Generate 5 Persona CTAs</span>
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
                🎯 CTAs for {ctaResult.personaType}
              </h3>
            </div>

            {/* Persona Insights */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">🧠 Persona Psychology</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-5 h-5 text-red-400" />
                    <h5 className="text-red-400 font-semibold">Pain Points</h5>
                  </div>
                  <ul className="space-y-1">
                    {ctaResult.personaInsights.painPoints.map((pain, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-5 h-5 text-green-400" />
                    <h5 className="text-green-400 font-semibold">Motivations</h5>
                  </div>
                  <ul className="space-y-1">
                    {ctaResult.personaInsights.motivations.map((motivation, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{motivation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <h5 className="text-blue-400 font-semibold">Language Style</h5>
                  </div>
                  <ul className="space-y-1">
                    {ctaResult.personaInsights.language.map((lang, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{lang}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Generated CTAs */}
            <div className="grid lg:grid-cols-2 gap-6">
              {ctaResult.ctas.map((cta, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-purple-400 font-bold text-lg">CTA #{index + 1}</h4>
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-blue-400 font-medium">{cta.platform}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Urgency Level:</span>
                      <span className={`font-bold ${getUrgencyColor(cta.urgencyLevel)}`}>
                        {cta.urgencyLevel}/10
                      </span>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <h5 className="text-purple-400 font-semibold mb-2">Why This Works</h5>
                    <p className="text-gray-300 text-sm">{cta.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Usage Strategy */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📈 CTA Strategy for {ctaResult.personaType}</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-green-400 font-semibold mb-3">✅ Best Practices</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Use language that matches their identity</li>
                    <li>• Address their specific time constraints</li>
                    <li>• Reference their unique challenges</li>
                    <li>• Match their communication style</li>
                    <li>• Consider their decision-making process</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-3">❌ Avoid These</h5>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Generic "one-size-fits-all" language</li>
                    <li>• Ignoring their budget constraints</li>
                    <li>• Using inappropriate urgency levels</li>
                    <li>• Mismatching platform expectations</li>
                    <li>• Overlooking their core motivations</li>
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

export default PersonaCTAGenerator;