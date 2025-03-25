import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const { register, error, loading, isAuthenticated, clearError } = useAuth();
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  
  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
    
    // Clear previous errors
    return () => {
      clearError();
    };
  }, [isAuthenticated, router, clearError]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    // Form validation
    if (!username.trim()) {
      setFormError('Please enter a username');
      return;
    }
    
    if (!email) {
      setFormError('Please enter your email address');
      return;
    }
    
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      setFormError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    // Attempt registration
    await register(username, email, password);
  };
  
  return (
    <MainLayout title="Register - Paradox">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-8 border border-indigo-900/50"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Join Paradox</h1>
              <p className="text-gray-400">
                Create an account to begin your journey of paradoxical exploration
              </p>
            </div>
            
            {/* Error message */}
            {(error || formError) && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-400">{error || formError}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className="w-full bg-indigo-950/50 border border-indigo-800/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Choose a unique username"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full bg-indigo-950/50 border border-indigo-800/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full bg-indigo-950/50 border border-indigo-800/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="At least 8 characters"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  className="w-full bg-indigo-950/50 border border-indigo-800/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter password again"
                  disabled={loading}
                />
              </div>
              
              <div className="flex items-center mt-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    loading
                      ? 'bg-indigo-800/50 text-gray-300 cursor-wait'
                      : 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-500'
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-indigo-900/50">
              <p className="text-gray-500 text-center text-sm mb-4">
                Or register with
              </p>
              <div className="flex gap-4">
                <button 
                  className="flex-1 py-3 px-4 bg-indigo-950/50 border border-indigo-800/50 rounded-lg text-white hover:bg-indigo-900/50 transition flex items-center justify-center"
                  disabled={loading}
                >
                  <span className="mr-2">🌐</span> Google
                </button>
                <button 
                  className="flex-1 py-3 px-4 bg-indigo-950/50 border border-indigo-800/50 rounded-lg text-white hover:bg-indigo-900/50 transition flex items-center justify-center"
                  disabled={loading}
                >
                  <span className="mr-2">🔑</span> Metamask
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage; 