import React from 'react';

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  const tones = [
    { id: 'professional', label: 'Professional', emoji: '💼' },
    { id: 'funny', label: 'Funny', emoji: '😂' },
    { id: 'luxury', label: 'Luxury', emoji: '✨' },
    { id: 'genz', label: 'Gen Z', emoji: '🔥' },
    { id: 'corporate', label: 'Corporate', emoji: '🏢' },
    { id: 'spiritual', label: 'Spiritual', emoji: '🧘' },
    { id: 'edgy', label: 'Edgy', emoji: '⚡' },
    { id: 'friendly', label: 'Friendly', emoji: '😊' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {tones.map((tone) => (
        <button
          key={tone.id}
          onClick={() => onToneChange(tone.id)}
          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedTone === tone.id
              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/25'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <div className="text-lg mb-1">{tone.emoji}</div>
          <div>{tone.label}</div>
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;