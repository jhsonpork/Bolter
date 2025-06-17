import React, { useState } from 'react';
import { Users, Loader2, Lock, Copy, Target, AlertTriangle, Zap } from 'lucide-react';
import { generatePersonas } from '../services/analysis';
import { CustomerPersona } from '../types/analysis';

interface PersonaProfilerProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const PersonaProfiler: React.FC<PersonaProfilerProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [productOrNiche, setProductOrNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [personas, setPersonas] = useState<CustomerPersona[] | null>(null);

  const handleGenerate = async () => {
    if (!productOrNiche.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generatePersonas(productOrNiche);
      setPersonas(result);
    } catch (error) {
      console.error('Error generating personas:', error);
    } finally {
      setIsGenerating(false);
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
            AI Persona Profiler
          </h2>
          <p className="text-gray-400">
            Generate detailed customer personas with buying triggers and objection points
          </p>
        </div>

        {!personas ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Product or Niche</label>
                <input
                  type="text"
                  value={productOrNiche}
                  onChange={(e) => setProductOrNiche(e.target.value)}
                  placeholder="e.g., fitness coaching, SaaS productivity tool, organic skincare..."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !productOrNiche.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Personas...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Persona Profiler - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    <span>Generate Customer Personas</span>
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
                Customer Personas for {productOrNiche}
              </h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {personas.map((persona, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-yellow-400 font-bold text-lg">{persona.name}</h4>
                    <button
                      onClick={() => handleCopy(JSON.stringify(persona, null, 2))}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">
                        <strong>Age:</strong> {persona.age}
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Occupation:</strong> {persona.occupation}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <h5 className="text-white font-semibold">Pain Points</h5>
                      </div>
                      <ul className="space-y-1">
                        {persona.painPoints.map((point, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {point}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <h5 className="text-white font-semibold">Buying Triggers</h5>
                      </div>
                      <ul className="space-y-1">
                        {persona.buyingTriggers.map((trigger, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {trigger}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <h5 className="text-white font-semibold">Objections</h5>
                      </div>
                      <ul className="space-y-1">
                        {persona.objections.map((objection, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {objection}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <h5 className="text-white font-semibold mb-2">Preferred Channels</h5>
                      <p className="text-gray-300 text-sm">{persona.preferredChannels.join(', ')}</p>
                    </div>

                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">Messaging Style</h5>
                      <p className="text-gray-300 text-sm">{persona.messagingStyle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonaProfiler;