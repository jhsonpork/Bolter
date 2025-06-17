import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = useState<'signin' | 'signup'>(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-8">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {view === 'signin' ? (
            <SignInForm 
              onSuccess={onClose} 
              onSignUpClick={() => setView('signup')} 
            />
          ) : (
            <SignUpForm 
              onSuccess={onClose} 
              onSignInClick={() => setView('signin')} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;