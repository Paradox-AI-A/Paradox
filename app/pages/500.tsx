import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const Custom500Page: React.FC = () => {
  return (
    <MainLayout title="Server Error - Paradox">
      <div className="container mx-auto px-4 py-12 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <div className="mb-6 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
            500
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Paradox Detected
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Reality has encountered a critical error in its computational matrix.
          </p>
          
          <div className="mb-10 p-6 bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50">
            <p className="text-gray-300 italic mb-4">
              "When the system fails, it sometimes reveals the most interesting truths about its architects."
            </p>
            <p className="text-sm text-gray-400">— Quantum Deception, Chapter 7</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
            >
              Return to Safety
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-800/50 px-6 py-3 rounded-lg text-white font-medium hover:bg-indigo-800/80 transition"
            >
              Try Again
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-sm"
        >
          <p>
            Our engineers have been notified and are investigating this anomaly.
          </p>
          <p className="mt-2">
            If the problem persists, please{" "}
            <Link href="/community" className="text-purple-400 hover:text-white transition">
              report it to our support team
            </Link>
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Custom500Page; 