/**
 * Application-wide constants
 */

// API routes
export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    USER: '/auth/user',
  },
  STORIES: {
    BASE: '/stories',
    CHAPTERS: (storyId: string) => `/stories/${storyId}/chapters`,
    PROGRESS: (storyId: string) => `/stories/${storyId}/progress`,
  },
  FRAGMENTS: {
    BASE: '/fragments',
    COMBINE: '/fragments/combine',
  },
  COINS: {
    BALANCE: '/coins/balance',
    PURCHASE: '/coins/purchase',
    TRANSACTIONS: '/coins/transactions',
  },
  COMMUNITY: {
    POSTS: '/community/posts',
    COMMENTS: (postId: string) => `/community/posts/${postId}/comments`,
  },
  PROFILE: {
    BASE: '/profile',
    PREFERENCES: '/profile/preferences',
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'paradox_auth_token',
  USER_DATA: 'paradox_user_data',
  STORY_PROGRESS: 'paradox_story_progress',
  PREFERENCES: 'paradox_preferences',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please log in again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DEFAULT: 'An unexpected error occurred. Please try again.',
};

// Fragment rarity levels
export const RARITY_LEVELS = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  LEGENDARY: 'legendary',
};

// Fragment rarity colors
export const RARITY_COLORS = {
  common: {
    bg: 'bg-indigo-900/40',
    border: 'border-indigo-800/50',
    text: 'text-indigo-200',
  },
  uncommon: {
    bg: 'bg-blue-900/40',
    border: 'border-blue-800/50',
    text: 'text-blue-200',
  },
  rare: {
    bg: 'bg-purple-900/40',
    border: 'border-purple-700/50',
    text: 'text-purple-200',
  },
  legendary: {
    bg: 'bg-yellow-900/40',
    border: 'border-yellow-600/50',
    text: 'text-yellow-200',
  },
};

// Fragment rarity icons
export const RARITY_ICONS = {
  common: '🧩',
  uncommon: '✨',
  rare: '💫',
  legendary: '🌟',
};

// Coin package sizes
export const COIN_PACKAGES = [
  {
    id: 'pack-small',
    name: 'Small Pack',
    amount: 100,
    price: 0.99,
  },
  {
    id: 'pack-medium',
    name: 'Medium Pack',
    amount: 500,
    price: 4.49,
    discount: 10,
  },
  {
    id: 'pack-large',
    name: 'Large Pack',
    amount: 1000,
    price: 7.99,
    discount: 20,
    popular: true,
  },
  {
    id: 'pack-xl',
    name: 'Extra Large Pack',
    amount: 2500,
    price: 17.99,
    discount: 30,
  },
  {
    id: 'pack-xxl',
    name: 'Mega Pack',
    amount: 5000,
    price: 29.99,
    discount: 40,
  },
];

// Community post categories
export const POST_CATEGORIES = [
  {
    id: 'discussion',
    name: 'Discussion',
    icon: '💬',
  },
  {
    id: 'theory',
    name: 'Theory',
    icon: '🔍',
  },
  {
    id: 'question',
    name: 'Question',
    icon: '❓',
  },
  {
    id: 'announcement',
    name: 'Announcement',
    icon: '📢',
  },
];

// Navigation links
export const NAV_LINKS = [
  { label: 'Stories', path: '/stories' },
  { label: 'Truth Fragments', path: '/fragments' },
  { label: 'Paradox Coins', path: '/coins' },
  { label: 'Community', path: '/community' },
];

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
}; 