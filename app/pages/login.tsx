import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login, error, loading, isAuthenticated, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string>('');
  
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
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    // Basic validation
    if (!email.trim()) {
      setFormError('Please enter your email address');
      return;
    }
    
    if (!password) {
      setFormError('Please enter your password');
      return;
    }
    
    // Attempt login
    try {
      await login(email, password);
    } catch (err) {
      // Error handling is done by AuthContext
    }
  };
  
  return (
    <MainLayout title="Login - Paradox">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-8 border border-indigo-900/50"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Log in to Paradox</h1>
              <p className="text-gray-400">
                Continue your journey to uncover more paradoxical truths
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
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-gray-300">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-purple-400 text-sm hover:text-purple-300">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full bg-indigo-950/50 border border-indigo-800/50 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="••••••••"
                  disabled={loading}
                />
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
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link 
                    href="/register" 
                    className="text-purple-400 hover:text-purple-300 transition"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-indigo-900/50">
              <p className="text-gray-500 text-center text-sm mb-4">
                Or login with
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
            
            <div className="mt-4">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Link href="/terms" className="hover:text-indigo-400 transition">
                  By logging in, you agree to our Terms of Service and Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage; 