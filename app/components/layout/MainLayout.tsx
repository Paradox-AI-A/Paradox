import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../common/Logo';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Paradox - The Story You Must Lie to Complete',
  description = 'An immersive narrative experience platform that combines cutting-edge AI technology with digital crypto assets to explore the relationship between lies and truth.'
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-950 to-black text-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="border-b border-indigo-900/50 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={50} height={50} />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
              Paradox
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/stories" className="text-gray-300 hover:text-purple-300 transition">
              Stories
            </Link>
            <Link href="/truth-fragments" className="text-gray-300 hover:text-purple-300 transition">
              Truth Fragments
            </Link>
            <Link href="/paradox-coins" className="text-gray-300 hover:text-purple-300 transition">
              Paradox Coins
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-purple-300 transition">
              Community
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-md border border-purple-600 text-purple-400 hover:bg-purple-900/30 transition"
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-indigo-900/50 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Paradox</h3>
              <p className="text-gray-400 text-sm">
                The Story You Must Lie to Complete. An immersive narrative experience exploring the complex relationship between lies and truth.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">Navigate</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-purple-300">Home</Link></li>
                <li><Link href="/stories" className="hover:text-purple-300">Stories</Link></li>
                <li><Link href="/truth-fragments" className="hover:text-purple-300">Truth Fragments</Link></li>
                <li><Link href="/paradox-coins" className="hover:text-purple-300">Paradox Coins</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/community" className="hover:text-purple-300">Community Hub</Link></li>
                <li><Link href="/truth-market" className="hover:text-purple-300">Truth Market</Link></li>
                <li><Link href="/lie-arena" className="hover:text-purple-300">Lie Arena</Link></li>
                <li><Link href="/paradox-academy" className="hover:text-purple-300">Paradox Academy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://paradox-world.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Official Website</a></li>
                <li><a href="https://x.com/A_Paradox_AI" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">Twitter</a></li>
                <li><a href="https://github.com/Paradox-AI-A" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">GitHub</a></li>
                <li><a href="/contact" className="hover:text-purple-300">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-indigo-900/50 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Paradox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 