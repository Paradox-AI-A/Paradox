import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

// Story type interface
interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  datePublished: string;
  readTime: number;
  paradoxLevel: number;
  completionRate?: number;
  category: 'recommended' | 'new' | 'trending' | 'completed';
  locked: boolean;
  requiredLevel?: number;
  requiredCoins?: number;
}

// Story category interface
interface StoryCategory {
  id: string;
  name: string;
  description: string;
}

// Static story data
const stories: Story[] = [
  {
    id: 'the-truth-covenant',
    title: 'The Truth Covenant',
    description: 'Explore the secrets of a mysterious organization and reveal their hidden truths and intentions.',
    coverImage: '/images/truth-covenant.jpg',
    author: 'Alex Mercer',
    datePublished: '2023-04-15',
    readTime: 25,
    paradoxLevel: 3,
    completionRate: 25,
    category: 'recommended',
    locked: false
  },
  {
    id: 'quantum-deception',
    title: 'Quantum Deception',
    description: 'In a world of quantum computing breakthroughs, the line between truth and lies becomes blurred.',
    coverImage: '/images/quantum-deception.jpg',
    author: 'Maya Chen',
    datePublished: '2023-06-22',
    readTime: 30,
    paradoxLevel: 4,
    category: 'new',
    locked: false
  },
  {
    id: 'paradox-mind',
    title: 'Paradox Mind',
    description: 'A brilliant scientist creates an AI capable of detecting lies, but it begins to question its own judgments.',
    coverImage: '/images/paradox-mind.jpg',
    author: 'Robin Zhao',
    datePublished: '2023-05-10',
    readTime: 35,
    paradoxLevel: 5,
    category: 'trending',
    locked: true,
    requiredLevel: 3
  },
  {
    id: 'the-forgotten-revelation',
    title: 'The Forgotten Revelation',
    description: 'Investigate a crucial historical event forgotten by the world, uncovering hidden historical truths.',
    coverImage: '/images/forgotten-revelation.jpg',
    author: 'Samantha Wells',
    datePublished: '2023-07-05',
    readTime: 40,
    paradoxLevel: 4,
    category: 'new',
    locked: true,
    requiredCoins: 150
  },
  {
    id: 'digital-whispers',
    title: 'Digital Whispers',
    description: 'When mysterious messages appear on the network, a group of hackers begins tracking the source.',
    coverImage: '/images/digital-whispers.jpg',
    author: 'Tarik Johnson',
    datePublished: '2023-03-18',
    readTime: 20,
    paradoxLevel: 2,
    completionRate: 100,
    category: 'completed',
    locked: false
  },
  {
    id: 'mirror-truths',
    title: 'Mirror Truths',
    description: 'In a parallel universe, the concepts of truth and lies are completely reversed.',
    coverImage: '/images/mirror-truths.jpg',
    author: 'Eliza Kim',
    datePublished: '2023-08-01',
    readTime: 45,
    paradoxLevel: 5,
    category: 'trending',
    locked: true,
    requiredLevel: 4,
    requiredCoins: 200
  }
];

// Story category data
const categories: StoryCategory[] = [
  {
    id: 'all',
    name: 'All Stories',
    description: 'Browse all available Paradox stories'
  },
  {
    id: 'recommended',
    name: 'Recommended',
    description: 'Stories recommended based on your reading history'
  },
  {
    id: 'new',
    name: 'Latest',
    description: 'Recently added stories'
  },
  {
    id: 'trending',
    name: 'Trending',
    description: 'Most popular stories in the community'
  },
  {
    id: 'completed',
    name: 'Completed',
    description: 'Stories you have already completed'
  }
];

const StoriesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [filteredStories, setFilteredStories] = React.useState<Story[]>(stories);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Filter stories
  React.useEffect(() => {
    let filtered = stories;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        story => 
          story.title.toLowerCase().includes(query) || 
          story.description.toLowerCase().includes(query) ||
          story.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredStories(filtered);
  }, [selectedCategory, searchQuery]);

  // Check if user can access story
  const canAccess = (story: Story): boolean => {
    if (!story.locked) return true;
    if (!isAuthenticated) return false;
    
    // Check user level
    if (story.requiredLevel && user?.gameState.paradoxLevel < story.requiredLevel) {
      return false;
    }
    
    // Check Paradox Coins
    if (story.requiredCoins && user?.digitalAssets.paradoxCoins < story.requiredCoins) {
      return false;
    }
    
    return true;
  };

  // Unlock requirements text
  const getUnlockRequirements = (story: Story): string => {
    const requirements = [];
    
    if (story.requiredLevel) {
      requirements.push(`Requires Paradox Level ${story.requiredLevel}`);
    }
    
    if (story.requiredCoins) {
      requirements.push(`Requires ${story.requiredCoins} Paradox Coins`);
    }
    
    return requirements.join(' and ');
  };

  return (
    <MainLayout title="Story Library - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="text-purple-400">Paradox</span> World Stories
          </h1>
          <p className="text-gray-400 mb-6 md:w-2/3">
            Each story is a journey challenging the truth, using carefully crafted lies to reveal deeper realities.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search stories, authors..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="w-full bg-indigo-950/30 border border-indigo-800/50 rounded-lg py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <div className="absolute right-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-indigo-950/30 text-gray-300 hover:bg-indigo-900/50'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Category description */}
        {selectedCategory !== 'all' && (
          <div className="mb-6 p-4 bg-indigo-950/30 backdrop-blur-sm rounded-lg border border-indigo-900/50">
            <p className="text-gray-300">
              {categories.find(cat => cat.id === selectedCategory)?.description}
            </p>
          </div>
        )}
        
        {/* Story grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <StoryCard 
                key={story.id}
                story={story}
                canAccess={canAccess(story)}
                unlockRequirements={getUnlockRequirements(story)}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No matching stories found</h3>
            <p className="text-gray-400">Try different search terms or select another category</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

interface StoryCardProps {
  story: Story;
  canAccess: boolean;
  unlockRequirements: string;
  delay?: number;
}

// Story card component
const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  canAccess, 
  unlockRequirements, 
  delay = 0 
}: StoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-indigo-950/30 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-900/50 hover:border-indigo-700/50 transition-all duration-300"
  >
    {/* Story cover */}
    <div className="h-52 relative">
      <img 
        src={story.coverImage} 
        alt={story.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-70"></div>
      
      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
          story.category === 'recommended' ? 'bg-blue-600/80' :
          story.category === 'new' ? 'bg-green-600/80' :
          story.category === 'trending' ? 'bg-purple-600/80' : 'bg-yellow-600/80'
        }`}>
          {story.category === 'recommended' ? 'Recommended' :
           story.category === 'new' ? 'New' :
           story.category === 'trending' ? 'Trending' : 'Completed'}
        </span>
      </div>
      
      {/* Story info overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <h3 className="text-xl font-bold text-white">{story.title}</h3>
        <div className="flex items-center text-gray-300 text-sm mt-1">
          <span>{story.author}</span>
          <span className="mx-2">•</span>
          <span>{story.datePublished}</span>
        </div>
      </div>
      
      {/* Progress overlay */}
      {story.completionRate !== undefined && (
        <div className="absolute top-3 right-3">
          <div className="px-2 py-1 bg-indigo-800/80 backdrop-blur-sm rounded-md text-xs font-medium text-white">
            {/* Progress label */}
            <div className="flex items-center">
              In Progress {story.completionRate}%
            </div>
          </div>
        </div>
      )}
    </div>
    
    {/* Story content */}
    <div className="p-4">
      {!canAccess && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-900/40 rounded-lg">
          <div className="text-white font-medium mb-1">Story Locked</div>
          <div className="text-gray-400 text-sm">{unlockRequirements}</div>
        </div>
      )}
      
      <p className="text-gray-300 text-sm line-clamp-3 mb-4">{story.description}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>Estimated reading time: {story.readTime} minutes</div>
        </div>
      </div>
      
      <div className="mt-4">
        <Link 
          href={canAccess ? `/stories/${story.id}` : '#'}
          className={`block w-full py-2 px-4 rounded-lg text-center ${
            canAccess 
              ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-500 transition'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canAccess ? 'Read Story' : 'Locked'}
        </Link>
      </div>
    </div>
  </motion.div>
);

export default StoriesPage; 