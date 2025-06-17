import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type MoreFeature = {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
};

interface MoreFeaturesDropdownProps {
  moreFeatures: MoreFeature[];
  businessFeatures: MoreFeature[];
  onFeatureSelect: (featureId: string) => void;
  activeFeature: string | null;
}

const MoreFeaturesDropdown: React.FC<MoreFeaturesDropdownProps> = ({ 
  moreFeatures, 
  businessFeatures,
  onFeatureSelect,
  activeFeature
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isMoreFeature = moreFeatures.some(f => f.id === activeFeature);
  const isBusinessFeature = businessFeatures.some(f => f.id === activeFeature);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs relative ${
          isOpen || isMoreFeature || isBusinessFeature
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25'
            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
        }`}
      >
        <span>More</span>
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs px-1 rounded-full font-bold">
          +22
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 w-full animate-fade-in">
          <div className="flex flex-wrap justify-center gap-2">
            {/* Creator Tools Section */}
            <div className="w-full mb-2">
              <h3 className="text-gray-400 text-xs font-semibold mb-2 px-1">Creator Tools</h3>
              <div className="flex flex-wrap gap-2">
                {moreFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => {
                        onFeatureSelect(feature.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs relative ${
                        activeFeature === feature.id
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                      }`}
                    >
                      <IconComponent className="w-3 h-3" />
                      <span>{feature.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Business Tools Section */}
            <div className="w-full">
              <h3 className="text-gray-400 text-xs font-semibold mb-2 px-1">Business Tools</h3>
              <div className="flex flex-wrap gap-2">
                {businessFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => {
                        onFeatureSelect(feature.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs relative ${
                        activeFeature === feature.id
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                      }`}
                    >
                      <IconComponent className="w-3 h-3" />
                      <span>{feature.label}</span>
                      {feature.badge && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full font-bold">
                          {feature.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreFeaturesDropdown;