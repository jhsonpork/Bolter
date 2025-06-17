import React from 'react';
import { Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserMenu from './UserMenu';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  onUpgradeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUpgradeClick }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authView, setAuthView] = React.useState<'signin' | 'signup'>('signin');

  const handleSignInClick = () => {
    setAuthView('signin');
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setAuthView('signup');
    setShowAuthModal(true);
  };

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
        
        <div className="flex items-center space-x-4">
          {user ? (
            <UserMenu onUpgradeClick={onUpgradeClick} />
          ) : (
            <>
              <button
                onClick={handleSignInClick}
                className="px-4 py-2 text-white font-medium hover:text-yellow-400 transition-colors"
              >
                Sign in
              </button>
              
              <button
                onClick={handleSignUpClick}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg 
                         hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-yellow-400/25
                         hover:shadow-yellow-400/40 hover:scale-105"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialView={authView}
      />
    </header>
  );
};

export default Header;