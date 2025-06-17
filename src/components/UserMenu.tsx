import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserMenuProps {
  onShowAuthModal: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onShowAuthModal }) => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <button
        onClick={onShowAuthModal}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg 
                 hover:bg-gray-700/50 transition-colors"
      >
        <User className="w-5 h-5 text-gray-300" />
        <span className="text-gray-300 font-medium">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg 
                 hover:bg-gray-700/50 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">
            {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
          </span>
        </div>
        <span className="text-gray-300 font-medium">
          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 py-1 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-white font-medium truncate">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-gray-400 text-sm truncate">{user.email}</p>
          </div>
          
          <ul>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to saved campaigns
                }}
              >
                <Save className="w-4 h-4" />
                <span>Saved Campaigns</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings
                }}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </li>
            <li className="border-t border-gray-700">
              <button
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 flex items-center space-x-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;