import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      await signUp(email, password, fullName);
      setSuccessMessage('Account created successfully! You can now sign in.');
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Create an Account</h2>
      
      {errorMessage && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4">
          {errorMessage}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-white font-medium mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                     placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                     placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-white font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                     placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            placeholder="Create a password"
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                   font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                   shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;