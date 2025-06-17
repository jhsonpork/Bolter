import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignInFormProps {
  onSuccess?: () => void;
  onSignUpClick: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
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
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to access your viral ad campaigns</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
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
              className="bg-gray-900/50 border border-gray-700 text-white rounded-lg block w-full pl-10 pr-3 py-3 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-700 rounded bg-gray-900/50"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-yellow-400 hover:text-yellow-300">
              Forgot password?
            </a>
          </div>
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
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button 
            onClick={onSignUpClick}
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;