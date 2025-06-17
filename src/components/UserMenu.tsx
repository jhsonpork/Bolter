import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserMenuProps {
  onUpgradeClick: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onUpgradeClick }) => {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
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

  // Get initials from full name or email
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-black font-bold">
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.full_name || 'User'} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials()
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-white font-medium truncate">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-gray-400 text-sm truncate">
              {user?.email}
            </p>
          </div>
          
          <div className="py-1">
            <button
              onClick={onUpgradeClick}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-yellow-400 hover:bg-gray-700"
            >
              <Zap className="w-4 h-4" />
              <span>Upgrade to Pro</span>
            </button>
            
            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to profile settings
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </button>
          </div>
          
          <div className="border-t border-gray-700 py-1">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;