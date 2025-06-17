import React, { useState } from 'react';
import { Play, Loader2, Lock, Copy, Users, Clock, Camera } from 'lucide-react';
import { convertToSkit } from '../services/advancedFeatures';
import { ScriptToSkit } from '../types/advancedFeatures';

interface ScriptToSkitConverterProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const ScriptToSkitConverter: React.FC<ScriptToSkitConverterProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [basicScript, setBasicScript] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [skit, setSkit] = useState<ScriptToSkit | null>(null);

  const handleConvert = async () => {
    if (!basicScript.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsConverting(true);
    try {
      const result = await convertToSkit(basicScript);
      setSkit(result);
    } catch (error) {
      console.error('Error converting to skit:', error);
    } finally {
      setIsConverting(false);
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
            Script to Skit Converter
          </h2>
          <p className="text-gray-400">
            Transform basic TikTok scripts into engaging 3-character UGC-style skits
          </p>
        </div>

        {!skit ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div>
                <label className="text-white font-medium mb-2 block">Basic TikTok Script</label>
                <textarea
                  value={basicScript}
                  onChange={(e) => setBasicScript(e.target.value)}
                  placeholder="Paste your basic TikTok script here..."
                  className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                           placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
              </div>
              
              <button
                onClick={handleConvert}
                disabled={isConverting || !basicScript.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Converting to Skit...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Script Converter - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Convert to 3-Character Skit</span>
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
            {/* Characters */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-400 font-bold text-lg">Characters</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {skit.characters.map((character, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Character {index + 1}</h4>
                    <p className="text-gray-300 text-sm">{character}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dialogue Script */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-yellow-400 font-bold text-lg">🎬 Skit Dialogue</h3>
                <button
                  onClick={() => handleCopy(skit.dialogue.map(d => `${d.timing} - ${d.character}: ${d.line} (${d.action})`).join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {skit.dialogue.map((line, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">{line.timing}</span>
                      <span className="text-yellow-400 font-semibold">{line.character}</span>
                    </div>
                    <p className="text-white mb-2">"{line.line}"</p>
                    <p className="text-gray-400 text-sm italic">Action: {line.action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <h4 className="text-purple-400 font-bold text-lg">Pacing Suggestions</h4>
                </div>
                <ul className="space-y-2">
                  {skit.pacingSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Camera className="w-6 h-6 text-orange-400" />
                  <h4 className="text-orange-400 font-bold text-lg">Camera Angles</h4>
                </div>
                <ul className="space-y-2">
                  {skit.cameraAngles.map((angle, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{angle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Timing */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">📢 CTA Timing Strategy</h4>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-gray-300">{skit.ctaTiming}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScriptToSkitConverter;