import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import ParadoxCoin from '../../components/common/ParadoxCoin';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface UserActivity {
  id: string;
  type: 'story_completion' | 'fragment_discovery' | 'coin_purchase' | 'login' | 'achievement';
  timestamp: string;
  details: string;
}

interface UserStats {
  storiesCompleted: number;
  fragmentsDiscovered: number;
  timeSpent: number; // in minutes
  completionRate: number; // percentage
  achievementsUnlocked: number;
}

interface UserPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  autoSave: boolean;
  showProgressHints: boolean;
}

// Mock data - This would come from an API in a real app
const mockUserData = {
  id: 'user123',
  username: 'TruthSeeker42',
  email: 'truthseeker@example.com',
  joined: '2023-05-15T00:00:00Z',
  avatar: 'https://paradox-media.s3.amazonaws.com/avatars/avatar1.jpg',
  bio: 'Always searching for the truth behind the illusion. Paradox enthusiast and puzzle solver.',
  level: 14,
  coins: 2450,
  premium: true
};

const mockUserStats: UserStats = {
  storiesCompleted: 8,
  fragmentsDiscovered: 32,
  timeSpent: 1240, // about 20 hours
  completionRate: 85,
  achievementsUnlocked: 12
};

const mockUserActivity: UserActivity[] = [
  {
    id: 'act001',
    type: 'story_completion',
    timestamp: '2023-09-10T15:23:00Z',
    details: 'Completed "Quantum Deception" with 92% accuracy'
  },
  {
    id: 'act002',
    type: 'fragment_discovery',
    timestamp: '2023-09-10T15:10:00Z',
    details: 'Discovered "Reality Shard" fragment'
  },
  {
    id: 'act003',
    type: 'achievement',
    timestamp: '2023-09-10T15:05:00Z',
    details: 'Earned achievement: "Truth Seeker" - Discover 30 fragments'
  },
  {
    id: 'act004',
    type: 'login',
    timestamp: '2023-09-10T14:55:00Z',
    details: 'Daily login - Day 12 streak'
  },
  {
    id: 'act005',
    type: 'coin_purchase',
    timestamp: '2023-09-08T09:30:00Z',
    details: 'Purchased 1000 Paradox Coins'
  }
];

const mockUserPreferences: UserPreferences = {
  emailNotifications: true,
  darkMode: true,
  soundEffects: true,
  autoSave: true,
  showProgressHints: false
};

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>('overview');
  const [userPreferences, setUserPreferences] = React.useState<UserPreferences>(mockUserPreferences);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editableData, setEditableData] = React.useState({
    username: mockUserData.username,
    email: mockUserData.email,
    bio: mockUserData.bio
  });
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);
  
  // Handle preference toggle
  const togglePreference = (key: keyof UserPreferences) => {
    setUserPreferences((prev: UserPreferences) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Handle profile editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableData((prev: {username: string, email: string, bio: string}) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const saveProfileChanges = () => {
    // In a real app, this would call an API to update the user profile
    alert('Profile updated successfully');
    setIsEditing(false);
    // Here we would update the actual user data
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format time
  const formatTimeAgo = (dateString: string): string => {
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
      return formatDate(dateString);
    }
  };
  
  // Format minutes to hours and minutes
  const formatTimeSpent = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
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
    <MainLayout title="My Profile - Paradox">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Profile Header */}
          <div className="relative bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6 mb-8">
            {/* Premium Badge */}
            {mockUserData.premium && (
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <span className="mr-1">⭐</span> PREMIUM
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-600/50 overflow-hidden mr-0 md:mr-6 mb-4 md:mb-0">
                <img 
                  src={mockUserData.avatar} 
                  alt={mockUserData.username} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editableData.username}
                      onChange={handleInputChange}
                      className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-1 px-3 text-white w-full max-w-md"
                    />
                  ) : (
                    mockUserData.username
                  )}
                </h1>
                
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <div className="bg-indigo-900/50 text-white text-xs px-2 py-1 rounded-full mr-2">
                    Level {mockUserData.level}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Joined {formatDate(mockUserData.joined)}
                  </div>
                </div>
                
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editableData.bio}
                    onChange={handleInputChange}
                    className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-3 text-white w-full max-w-md h-20 mb-3"
                  />
                ) : (
                  <p className="text-gray-300 mb-3 max-w-2xl">
                    {mockUserData.bio}
                  </p>
                )}
                
                {isEditing && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editableData.email}
                      onChange={handleInputChange}
                      className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-3 text-white w-full max-w-md"
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={saveProfileChanges}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-800 px-4 py-2 rounded-lg text-white font-medium hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-indigo-800/50 px-4 py-2 rounded-lg text-white font-medium hover:bg-indigo-800/80 transition"
                      >
                        Edit Profile
                      </button>
                      <Link href="/coins" className="flex items-center bg-indigo-900/30 px-4 py-2 rounded-lg text-white font-medium hover:bg-indigo-900/50 transition">
                        <ParadoxCoin amount={mockUserData.coins} showIcon={true} />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-indigo-800/50 mb-6">
            <div className="flex flex-wrap space-x-0 md:space-x-6">
              <TabButton 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </TabButton>
              <TabButton 
                active={activeTab === 'activity'} 
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </TabButton>
              <TabButton 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </TabButton>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                <StatCard 
                  label="Stories Completed" 
                  value={mockUserStats.storiesCompleted.toString()} 
                  icon="📚" 
                />
                <StatCard 
                  label="Fragments Discovered" 
                  value={mockUserStats.fragmentsDiscovered.toString()} 
                  icon="🧩" 
                />
                <StatCard 
                  label="Time Spent" 
                  value={formatTimeSpent(mockUserStats.timeSpent)} 
                  icon="⏱️" 
                />
                <StatCard 
                  label="Completion Rate" 
                  value={`${mockUserStats.completionRate}%`} 
                  icon="📊" 
                />
                <StatCard 
                  label="Achievements" 
                  value={mockUserStats.achievementsUnlocked.toString()} 
                  icon="🏆" 
                />
              </div>
              
              {/* Recent Activity */}
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className="text-sm text-indigo-400 hover:text-white transition"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {mockUserActivity.slice(0, 3).map(activity => (
                    <ActivityItem 
                      key={activity.id} 
                      activity={activity} 
                      formatTimeAgo={formatTimeAgo} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6">
                <h2 className="text-xl font-semibold mb-4">Level Progress</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {mockUserData.level}</span>
                    <span>Level {mockUserData.level + 1}</span>
                  </div>
                  <div className="bg-indigo-900/30 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-400 mt-1">
                    3,245 / 5,000 XP
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">How to earn XP</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Complete story chapters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Discover truth fragments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Unlock achievements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Daily login streak</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Activity History</h2>
              
              <div className="space-y-4">
                {mockUserActivity.map(activity => (
                  <ActivityItem 
                    key={activity.id} 
                    activity={activity} 
                    formatTimeAgo={formatTimeAgo} 
                  />
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  className="text-indigo-400 hover:text-white transition"
                >
                  Load More Activity
                </button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Preferences */}
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                
                <div className="space-y-4">
                  <PreferenceToggle 
                    label="Email Notifications" 
                    description="Receive email updates about new stories and features" 
                    isEnabled={userPreferences.emailNotifications} 
                    toggle={() => togglePreference('emailNotifications')} 
                  />
                  
                  <PreferenceToggle 
                    label="Dark Mode" 
                    description="Use dark theme for better reading at night" 
                    isEnabled={userPreferences.darkMode} 
                    toggle={() => togglePreference('darkMode')} 
                  />
                  
                  <PreferenceToggle 
                    label="Sound Effects" 
                    description="Play sound effects during story interactions" 
                    isEnabled={userPreferences.soundEffects} 
                    toggle={() => togglePreference('soundEffects')} 
                  />
                  
                  <PreferenceToggle 
                    label="Auto Save" 
                    description="Automatically save progress while reading stories" 
                    isEnabled={userPreferences.autoSave} 
                    toggle={() => togglePreference('autoSave')} 
                  />
                  
                  <PreferenceToggle 
                    label="Progress Hints" 
                    description="Show hints for hidden content and story branches" 
                    isEnabled={userPreferences.showProgressHints} 
                    toggle={() => togglePreference('showProgressHints')} 
                  />
                </div>
              </div>
              
              {/* Account Settings */}
              <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-6">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="grid gap-4 max-w-md">
                      <input 
                        type="password" 
                        placeholder="Current Password" 
                        className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input 
                        type="password" 
                        placeholder="New Password" 
                        className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        className="bg-indigo-900/30 border border-indigo-800/50 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        className="bg-indigo-800/50 px-4 py-2 rounded-lg text-white font-medium hover:bg-indigo-800/80 transition"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-indigo-800/30">
                    <h3 className="font-medium mb-2 text-red-400">Danger Zone</h3>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={logout}
                        className="bg-gray-800 px-4 py-2 rounded-lg text-white font-medium hover:bg-gray-700 transition"
                      >
                        Log Out
                      </button>
                      <button
                        className="bg-red-900/30 px-4 py-2 rounded-lg text-red-400 font-medium hover:bg-red-900/50 transition"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

// Subcomponents
interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ children, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`py-3 px-4 border-b-2 font-medium transition ${
      active
        ? 'border-purple-500 text-white'
        : 'border-transparent text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }: StatCardProps) => (
  <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl border border-indigo-900/50 p-4">
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 flex items-center justify-center text-xl mr-2">
        {icon}
      </div>
      <h3 className="font-medium text-gray-300">{label}</h3>
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

interface ActivityItemProps {
  activity: UserActivity;
  formatTimeAgo: (date: string) => string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, formatTimeAgo }: ActivityItemProps) => {
  const getActivityIcon = (type: UserActivity['type']) => {
    switch(type) {
      case 'story_completion': return '📚';
      case 'fragment_discovery': return '🧩';
      case 'coin_purchase': return '💰';
      case 'login': return '🔑';
      case 'achievement': return '🏆';
      default: return '📝';
    }
  };
  
  return (
    <div className="flex items-start p-3 rounded-lg hover:bg-indigo-900/20 transition">
      <div className="text-2xl mr-3">{getActivityIcon(activity.type)}</div>
      <div className="flex-1">
        <div className="font-medium">{activity.details}</div>
        <div className="text-sm text-gray-400">{formatTimeAgo(activity.timestamp)}</div>
      </div>
    </div>
  );
};

interface PreferenceToggleProps {
  label: string;
  description: string;
  isEnabled: boolean;
  toggle: () => void;
}

const PreferenceToggle: React.FC<PreferenceToggleProps> = ({ 
  label, 
  description, 
  isEnabled, 
  toggle 
}: PreferenceToggleProps) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <h3 className="font-medium">{label}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <button
      onClick={toggle}
      className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
        isEnabled ? 'bg-purple-600 justify-end' : 'bg-gray-700 justify-start'
      }`}
    >
      <div className="w-4 h-4 bg-white rounded-full"></div>
    </button>
  </div>
);

export default ProfilePage; 