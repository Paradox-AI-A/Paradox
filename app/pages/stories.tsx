import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';

interface Story {
  id: string;
  title: string;
  chapter: 'awakening' | 'training' | 'subversion';
  description: string;
  coverImage: string;
  difficulty: number;
  estimatedTime: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  requiredParadoxLevel?: number;
  requiredTruthFragments?: string[];
}

// Mock data (will be fetched from API in production)
const mockStories: Story[] = [
  {
    id: 'first-lie',
    title: 'The First Lie',
    chapter: 'awakening',
    description: 'Your journey begins when you discover your ability to lie without being detected by the Truth AI.',
    coverImage: '/images/stories/first-lie.jpg',
    difficulty: 1,
    estimatedTime: 15,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'truth-covenant',
    title: 'The Truth Covenant',
    chapter: 'awakening',
    description: 'Explore the inner workings of the Truth Covenant and how they maintain global information order through AI technology.',
    coverImage: '/images/stories/truth-covenant.jpg',
    difficulty: 2,
    estimatedTime: 25,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'resistance-contact',
    title: 'Resistance Contact',
    chapter: 'awakening',
    description: 'Establish first contact with the Paradox Resistance and join their ranks.',
    coverImage: '/images/stories/resistance.jpg',
    difficulty: 2,
    estimatedTime: 20,
    isUnlocked: false,
    isCompleted: false,
    requiredParadoxLevel: 2
  },
  {
    id: 'advanced-deception',
    title: 'Advanced Deception',
    chapter: 'training',
    description: 'Learn advanced deception techniques to improve your lie creativity and truth resistance.',
    coverImage: '/images/stories/advanced-deception.jpg',
    difficulty: 3,
    estimatedTime: 30,
    isUnlocked: false,
    isCompleted: false,
    requiredParadoxLevel: 3,
    requiredTruthFragments: ['basic-theory', 'perception-flaw']
  },
  {
    id: 'perfect-paradox',
    title: 'The Perfect Paradox',
    chapter: 'training',
    description: 'Master the art of creating the perfect paradox - statements that are neither true nor false.',
    coverImage: '/images/stories/perfect-paradox.jpg',
    difficulty: 4,
    estimatedTime: 35,
    isUnlocked: false,
    isCompleted: false,
    requiredParadoxLevel: 4
  },
  {
    id: 'truth-ai-infiltration',
    title: 'Truth AI Infiltration',
    chapter: 'subversion',
    description: 'Infiltrate the Truth Covenant headquarters to obtain information about the inner workings of the Truth AI.',
    coverImage: '/images/stories/infiltration.jpg',
    difficulty: 5,
    estimatedTime: 45,
    isUnlocked: false,
    isCompleted: false,
    requiredParadoxLevel: 5,
    requiredTruthFragments: ['ai-core-vulnerability', 'covenant-structure']
  }
];

// Get stories by chapter
const getStoriesByChapter = (stories: Story[], chapter: string): Story[] => {
  if (chapter === 'all') return stories;
  return stories.filter(story => story.chapter === chapter);
};

const StoriesPage: React.FC = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading story data from API
  useEffect(() => {
    // In a real application, this would be an API call
    setTimeout(() => {
      setStories(mockStories);
      setFilteredStories(mockStories);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter stories based on selected tab
  useEffect(() => {
    setFilteredStories(getStoriesByChapter(stories, activeTab));
  }, [activeTab, stories]);

  return (
    <MainLayout title="Stories - Paradox" description="Explore various stories and adventures in the Paradox world">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          >
            Paradox Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            In this world, truth is enforced by AI, and lying becomes a powerful tool to discover deeper truths.
            Start with awakening, progress through training, and finally reach subversion.
          </motion.p>
        </div>
        
        {/* Chapter selection tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'all'
                ? 'bg-purple-700 text-white'
                : 'bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/40'
            } transition`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('awakening')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'awakening'
                ? 'bg-purple-700 text-white'
                : 'bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/40'
            } transition`}
          >
            Awakening
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'training'
                ? 'bg-purple-700 text-white'
                : 'bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/40'
            } transition`}
          >
            Training
          </button>
          <button
            onClick={() => setActiveTab('subversion')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'subversion'
                ? 'bg-purple-700 text-white'
                : 'bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/40'
            } transition`}
          >
            Subversion
          </button>
        </motion.div>
        
        {/* Story grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-purple-700 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading stories...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Chapter colors mapping
const chapterColors = {
  awakening: 'from-blue-500 to-indigo-600',
  training: 'from-purple-500 to-pink-500',
  subversion: 'from-red-500 to-orange-500'
};

// Chapter names mapping
const chapterNames = {
  introduction: 'Introduction',
  chapter1: 'Chapter 1: The Awakening',
  chapter2: 'Chapter 2: Truth Fragments',
  chapter3: 'Chapter 3: The Revelation',
  chapter4: 'Chapter 4: Paradox Resolution',
  epilogue: 'Epilogue'
};

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, index }) => {
  // Generate stars based on difficulty level
  const difficultyStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < story.difficulty ? 'text-yellow-400' : 'text-gray-600'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-indigo-950/30 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-indigo-900/50 hover:border-indigo-700/50 transition-all duration-300"
    >
      <Link href={story.isUnlocked ? `/stories/${story.id}` : '#'} className="block h-full">
        {/* Story cover image */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500" 
            style={{ backgroundImage: `url(${story.coverImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-70"></div>
          
          {/* Chapter badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${chapterColors[story.chapter]}`}>
            {story.chapter.charAt(0).toUpperCase() + story.chapter.slice(1)}
          </div>
          
          {/* Completion badge */}
          {story.isCompleted && (
            <div className="absolute top-4 right-4 bg-green-500/80 text-white text-xs font-medium px-2 py-1 rounded-full">
              Completed
            </div>
          )}
        </div>
        
        {/* Story info */}
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {story.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{story.description}</p>
          
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
            <div className="flex items-center gap-1">
              {difficultyStars()}
            </div>
            <div>Duration: ~{story.estimatedTime} min</div>
          </div>
          
          {!story.isUnlocked && (
            <div className="mt-4">
              <p className="font-medium text-indigo-300 mb-1">Unlock requirements:</p>
              {story.requiredParadoxLevel && (
                <p className="text-gray-400">• Paradox Level {story.requiredParadoxLevel} required</p>
              )}
              {story.requiredTruthFragments && story.requiredTruthFragments.length > 0 && (
                <p className="text-gray-400">• Requires {story.requiredTruthFragments.length} specific Truth Fragments</p>
              )}
            </div>
          )}
          
          <div className="mt-4">
            <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
              story.isUnlocked 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}>
              Start Story
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoriesPage; 