import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg">
                <X className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Nexus<span className="text-yellow-400">AI</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setMode('signin')}
                className={`px-4 py-2 font-medium text-sm flex-1 ${
                  mode === 'signin'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`px-4 py-2 font-medium text-sm flex-1 ${
                  mode === 'signup'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            {mode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Create one
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;