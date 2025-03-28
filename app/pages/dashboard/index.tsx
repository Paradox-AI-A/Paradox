import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

// Define types
interface UserStats {
  paradoxCoins: number;
  truthFragments: number;
  paradoxLevel: number;
  completedStories: number;
  lieDetectionRate: number;
}

interface RecentActivity {
  id: string;
  type: 'story_completion' | 'coin_earned' | 'fragment_found' | 'level_up';
  title: string;
  description: string;
  date: string;
  relatedId?: string;
}

// Mock data for development
const mockUserNotifications = [
  {
    id: '1',
    type: 'story_completed',
    title: 'Story Completed',
    description: 'You completed the "First Paradox" story',
    date: '2023-07-21T15:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'coin_received',
    title: 'Coins Received',
    description: 'You earned 25 Paradox Coins',
    date: '2023-07-20T10:15:00Z',
    read: true,
  },
  {
    id: '3',
    type: 'fragment_discovered',
    title: 'Fragment Discovered',
    description: 'You found the Truth Fragment: "Genesis Truth"',
    date: '2023-07-18T09:45:00Z',
    read: true,
  },
  {
    id: '4',
    type: 'level_up',
    title: 'Level Up',
    description: 'Your Paradox Level increased to 2',
    date: '2023-07-15T14:20:00Z',
    read: true,
  },
];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [recentActivity, setRecentActivity] = React.useState<RecentActivity[]>([]);
  const [stats, setStats] = React.useState<UserStats>({
    paradoxCoins: 150,
    truthFragments: 7,
    paradoxLevel: 3,
    completedStories: 4,
    lieDetectionRate: 78
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?redirect=dashboard');
    }
  }, [isAuthenticated, router]);

  // Simulate fetching user stats and activity
  React.useEffect(() => {
    // In a real application, this would be an API call
    // Using mock data for now
    const mockActivity: RecentActivity[] = [
      {
        id: '1',
        type: 'story_completion',
        title: 'Story Completed',
        description: 'You completed the "First Paradox" story',
        date: '2023-07-21T10:30:00Z',
        relatedId: 'first-paradox'
      },
      {
        id: '2',
        type: 'coin_earned',
        title: 'Coins Earned',
        description: 'You earned 25 Paradox Coins',
        date: '2023-07-20T14:45:00Z'
      },
      {
        id: '3',
        type: 'fragment_found',
        title: 'Fragment Discovered',
        description: 'You found the Truth Fragment: "Genesis Truth"',
        date: '2023-07-18T09:15:00Z',
        relatedId: 'genesis-truth'
      },
      {
        id: '4',
        type: 'level_up',
        title: 'Level Up',
        description: 'Your Paradox Level increased to 2',
        date: '2023-07-15T16:20:00Z'
      }
    ];

    setRecentActivity(mockActivity);
  }, []);

  // Loading state
  if (!user) {
    return (
      <MainLayout title="Loading - Paradox">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard - Paradox">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, <span className="text-purple-400">{user?.profileInfo.displayName || user?.username}</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Explore your Paradox journey, manage your digital assets, and continue your stories.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard 
            title="Paradox Coins" 
            value={stats.paradoxCoins} 
            icon="💰" 
            description="Used for unlocking stories and purchasing upgrades" 
            delay={0.1}
          />
          <StatCard 
            title="Truth Fragments" 
            value={stats.truthFragments} 
            icon="🧩" 
            description="Collect and combine to unlock hidden content" 
            delay={0.2}
          />
          <StatCard 
            title="Paradox Level" 
            value={stats.paradoxLevel} 
            icon="⭐" 
            description="Unlocks higher-level stories and abilities" 
            delay={0.3}
          />
          <StatCard 
            title="Completed Stories" 
            value={stats.completedStories} 
            icon="📚" 
            description="Number of stories you've completed" 
            delay={0.4}
          />
          <StatCard 
            title="Lie Detection Rate" 
            value={`${stats.lieDetectionRate}%`} 
            icon="🔍" 
            description="Rate at which your lies are accepted" 
            delay={0.5}
          />
        </div>

        {/* Central area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Continue story */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/50 h-full"
            >
              <h2 className="text-2xl font-bold mb-4">Continue Your Journey</h2>
              <div className="relative overflow-hidden h-48 rounded-lg mb-4 bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-70 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url('/images/truth-covenant.jpg')` }}
                ></div>
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white">The Truth Covenant</h3>
                  <p className="text-gray-300 text-sm">Continue exploring the Covenant headquarters</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                You've completed 25% of the story. Continue exploring the Truth Covenant headquarters to find hidden clues.
              </p>
              <button className="paradox-button-primary">Continue Story</button>
            </motion.div>
          </div>

          {/* Recent activity */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/50 h-full"
            >
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Truth Fragments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/50"
          >
            <h2 className="text-2xl font-bold mb-4">Your Truth Fragments</h2>
            <p className="text-gray-400 mb-4">
              Truth Fragments can be combined to unlock hidden content and story clues.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 ${i < stats.truthFragments ? 'bg-indigo-900/40 border border-indigo-700/50' : 'bg-gray-800/50 border border-gray-700/30'}`}>
                  <div className="text-3xl mb-2">{i < stats.truthFragments ? '🧩' : '❓'}</div>
                  <div className="text-sm font-medium">{i < stats.truthFragments ? `Fragment ${i+1}` : 'Undiscovered'}</div>
                </div>
              ))}
            </div>
            
            <button className="w-full paradox-button-secondary mt-4">View All Fragments</button>
          </motion.div>
          
          {/* Paradox Coins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/50"
          >
            <h2 className="text-2xl font-bold mb-4">Paradox Coins</h2>
            <p className="text-gray-400 mb-4">
              Paradox Coins can be used to unlock new stories, purchase skill upgrades, and trade for Truth Fragments.
            </p>
            <div className="flex items-center justify-between mb-6">
              <div className="text-5xl">💰</div>
              <div className="text-4xl font-bold">{stats.paradoxCoins}</div>
            </div>
            <div className="text-sm text-right mb-4 text-gray-400">
              <span className="font-medium">Current Value</span>: 1 PC = $0.12 USD
            </div>
            <button className="w-full paradox-button-secondary">Get More Coins</button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

// Statistics card component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  description: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-5 border border-indigo-900/50"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="text-gray-400 font-medium">{title}</div>
      <div className="text-2xl">{icon}</div>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs text-gray-500">{description}</div>
  </motion.div>
);

// Activity item component
interface ActivityItemProps {
  activity: RecentActivity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }: ActivityItemProps) => {
  // Activity type icons
  const iconMap = {
    'story_completion': '📚',
    'coin_earned': '💰',
    'fragment_found': '🧩',
    'level_up': '⭐'
  };
  
  // Format the date relative to now
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  return (
    <div className="flex items-start space-x-3 p-3 bg-indigo-900/20 rounded-lg hover:bg-indigo-900/30 transition cursor-pointer">
      <div className="text-2xl">{iconMap[activity.type]}</div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="font-medium">{activity.title}</div>
          <div className="text-xs text-gray-500">{formatDate(activity.date)}</div>
        </div>
        <p className="text-sm text-gray-400">{activity.description}</p>
      </div>
    </div>
  );
};

export default Dashboard; 