import React, { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onSignInClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        setError(error.message);
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400">Sign up to start creating viral ads</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                   font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                   shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-70 
                   disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create account</span>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <button 
            onClick={onSignInClick}
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;