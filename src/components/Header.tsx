import React from 'react';
import { Zap } from 'lucide-react';

interface HeaderProps {
  onUpgradeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUpgradeClick }) => {
  return (
    <header className="relative z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg shadow-lg shadow-yellow-400/25">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">
            Nexus<span className="text-yellow-400">AI</span>
          </span>
        </div>
        
        <button
          onClick={onUpgradeClick}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg 
                   hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-yellow-400/25
                   hover:shadow-yellow-400/40 hover:scale-105"
        >
          Get Pro Access
        </button>
      </div>
    </header>
  );
};

export default Header;