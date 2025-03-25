import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  comments: number;
  category: 'discussion' | 'theory' | 'announcement' | 'question';
  tags: string[];
}

interface CommunityCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
}

// Mock data - Would come from API in a real app
const mockPosts: CommunityPost[] = [
  {
    id: 'post-001',
    title: 'Hidden connections between "The Truth Covenant" and "Quantum Deception"',
    content: 'After completing both stories, I noticed several recurring symbols and characters...',
    authorId: 'user-123',
    authorName: 'TruthSeeker42',
    authorAvatar: 'https://paradox-media.s3.amazonaws.com/avatars/avatar1.jpg',
    createdAt: '2023-09-15T14:32:00Z',
    likes: 28,
    comments: 12,
    category: 'theory',
    tags: ['story-connections', 'easter-eggs', 'quantum-theory']
  },
  {
    id: 'post-002',
    title: 'Weekly Challenge: Combine 3 fragments to unlock the hidden content',
    content: 'This week\'s challenge is to combine specific fragments from different stories to reveal...',
    authorId: 'user-admin',
    authorName: 'ParadoxAdmin',
    authorAvatar: 'https://paradox-media.s3.amazonaws.com/avatars/admin.jpg',
    createdAt: '2023-09-14T10:15:00Z',
    likes: 45,
    comments: 32,
    category: 'announcement',
    tags: ['challenge', 'fragments', 'rewards']
  },
  {
    id: 'post-003',
    title: 'How to optimize your choices in "Shadow Protocol"',
    content: 'I\'ve played through Shadow Protocol multiple times and found that these choices...',
    authorId: 'user-456',
    authorName: 'StoryExplorer',
    authorAvatar: 'https://paradox-media.s3.amazonaws.com/avatars/avatar3.jpg',
    createdAt: '2023-09-12T16:45:00Z',
    likes: 19,
    comments: 8,
    category: 'discussion',
    tags: ['strategies', 'shadow-protocol', 'optimization']
  },
  {
    id: 'post-004',
    title: 'Can anyone help me understand the ending of "Reality Breach"?',
    content: 'I just finished Reality Breach and I\'m confused about the final scene where...',
    authorId: 'user-789',
    authorName: 'ConfusedReader',
    authorAvatar: 'https://paradox-media.s3.amazonaws.com/avatars/avatar4.jpg',
    createdAt: '2023-09-10T09:22:00Z',
    likes: 7,
    comments: 24,
    category: 'question',
    tags: ['reality-breach', 'ending', 'help']
  },
  {
    id: 'post-005',
    title: 'New feature: Paradox Coin gifting now available',
    content: 'We\'re excited to announce that you can now gift Paradox Coins to your friends...',
    authorId: 'user-admin',
    authorName: 'ParadoxAdmin',
    authorAvatar: 'https://paradox-media.s3.amazonaws.com/avatars/admin.jpg',
    createdAt: '2023-09-08T11:00:00Z',
    likes: 72,
    comments: 18,
    category: 'announcement',
    tags: ['new-feature', 'paradox-coins', 'gifting']
  }
];

const communityCategories: CommunityCategory[] = [
  {
    id: 'cat-discussions',
    name: 'Discussions',
    description: 'General discussions about stories, theories, and gameplay',
    icon: '💬',
    postCount: 254
  },
  {
    id: 'cat-theories',
    name: 'Theories & Analysis',
    description: 'Deep dives into the lore and hidden meanings',
    icon: '🔍',
    postCount: 187
  },
  {
    id: 'cat-announcements',
    name: 'Announcements',
    description: 'Official updates and news from the Paradox team',
    icon: '📢',
    postCount: 42
  },
  {
    id: 'cat-help',
    name: 'Help & Questions',
    description: 'Get help from the community on puzzles and gameplay',
    icon: '❓',
    postCount: 103
  },
  {
    id: 'cat-creative',
    name: 'Creative Corner',
    description: 'Fan fiction, artwork, and other creative content',
    icon: '🎨',
    postCount: 76
  }
];

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

const CommunityPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>('trending');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);
  
  // Filter posts based on active tab, selected category, and search query
  const filteredPosts = React.useMemo(() => {
    let filtered = [...mockPosts];
    
    // Filter by category if selected
    if (selectedCategory) {
      const categoryMap: Record<string, CommunityPost['category']> = {
        'cat-discussions': 'discussion',
        'cat-theories': 'theory',
        'cat-announcements': 'announcement',
        'cat-help': 'question',
      };
      
      const categoryFilter = categoryMap[selectedCategory];
      if (categoryFilter) {
        filtered = filtered.filter(post => post.category === categoryFilter);
      }
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort based on active tab
    if (activeTab === 'trending') {
      filtered.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
    } else if (activeTab === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (activeTab === 'discussed') {
      filtered.sort((a, b) => b.comments - a.comments);
    }
    
    return filtered;
  }, [activeTab, selectedCategory, searchQuery]);
  
  if (!isAuthenticated) {
    return (
      <MainLayout title="Loading - Paradox">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title="Community - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Paradox Community
              </h1>
              <p className="text-gray-400 md:w-2/3">
                Join discussions, share theories, and connect with other Paradox enthusiasts.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
              >
                Create New Post
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                
                {/* Search */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    🔍
                  </div>
                </div>
                
                {/* Category list */}
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                      selectedCategory === null
                        ? 'bg-purple-900/30 text-white'
                        : 'hover:bg-indigo-900/50 text-gray-300'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">📋</span>
                      All Categories
                    </span>
                    <span className="text-sm text-gray-400">{mockPosts.length}</span>
                  </button>
                  
                  {communityCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-purple-900/30 text-white'
                          : 'hover:bg-indigo-900/50 text-gray-300'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-400">{category.postCount}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Community Stats */}
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-4">
                <h2 className="text-xl font-semibold mb-4">Community Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">15.4K</div>
                    <div className="text-gray-400 text-sm">Members</div>
                  </div>
                  <div className="bg-indigo-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">3.2K</div>
                    <div className="text-gray-400 text-sm">Online Now</div>
                  </div>
                  <div className="bg-indigo-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">42.7K</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                  <div className="bg-indigo-900/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">127K</div>
                    <div className="text-gray-400 text-sm">Comments</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-indigo-800/30">
                  <h3 className="font-medium mb-2">Top Contributors</h3>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center text-xs">
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Post List */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-indigo-800/50 mb-6">
                <div className="flex space-x-6">
                  <TabButton 
                    active={activeTab === 'trending'} 
                    onClick={() => setActiveTab('trending')}
                  >
                    Trending
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'newest'} 
                    onClick={() => setActiveTab('newest')}
                  >
                    Newest
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'discussed'} 
                    onClick={() => setActiveTab('discussed')}
                  >
                    Most Discussed
                  </TabButton>
                </div>
              </div>
              
              {/* Post List */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-6">
                  {filteredPosts.map((post: CommunityPost, index: number) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-indigo-950/20 backdrop-blur-sm rounded-xl border border-indigo-900/50">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-gray-400 mb-6">Try a different search term or category</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="px-4 py-2 bg-indigo-800/50 rounded-lg text-white hover:bg-indigo-800/80 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
              
              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded bg-indigo-900/30 text-gray-300">
                      &laquo;
                    </button>
                    <button className="px-3 py-1 rounded bg-purple-600 text-white">
                      1
                    </button>
                    <button className="px-3 py-1 rounded bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/50">
                      2
                    </button>
                    <button className="px-3 py-1 rounded bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/50">
                      3
                    </button>
                    <span className="text-gray-400">...</span>
                    <button className="px-3 py-1 rounded bg-indigo-900/30 text-gray-300 hover:bg-indigo-800/50">
                      12
                    </button>
                    <button className="px-3 py-1 rounded bg-indigo-900/30 text-gray-300">
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`py-3 border-b-2 font-medium transition ${
      active
        ? 'border-purple-500 text-white'
        : 'border-transparent text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

interface PostCardProps {
  post: CommunityPost;
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index }: PostCardProps) => {
  const getCategoryStyles = (category: CommunityPost['category']) => {
    switch(category) {
      case 'announcement':
        return 'bg-blue-900/30 text-blue-400';
      case 'theory':
        return 'bg-purple-900/30 text-purple-400';
      case 'question':
        return 'bg-yellow-900/30 text-yellow-400';
      default:
        return 'bg-green-900/30 text-green-400';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-5 hover:border-indigo-600/70 transition"
    >
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <img src={post.authorAvatar} alt={post.authorName} className="w-8 h-8 rounded-full mr-3" />
          <div>
            <div className="font-medium">{post.authorName}</div>
            <div className="text-gray-400 text-sm">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <div>
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyles(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
        </div>
      </div>
      
      <Link href={`/community/post/${post.id}`} className="block">
        <h3 className="text-xl font-semibold mb-2 hover:text-purple-400 transition">{post.title}</h3>
        <p className="text-gray-300 mb-3 line-clamp-2">{post.content}</p>
      </Link>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="text-xs bg-indigo-900/50 px-2 py-1 rounded-full text-indigo-300">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-indigo-800/30">
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-purple-400 transition flex items-center">
            <span className="mr-1">❤️</span> {post.likes}
          </button>
          <button className="text-gray-400 hover:text-purple-400 transition flex items-center">
            <span className="mr-1">💬</span> {post.comments}
          </button>
        </div>
        <button className="text-gray-400 hover:text-purple-400 transition">
          Share
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityPage; 