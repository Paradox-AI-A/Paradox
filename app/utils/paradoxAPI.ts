import axios, { AxiosInstance } from 'axios';

/**
 * API client for Paradox backend services
 */
const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Set the authorization token for API requests
 * @param token JWT token for authentication
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('paradox_auth_token', token);
  } else {
    delete API.defaults.headers.common['Authorization'];
    localStorage.removeItem('paradox_auth_token');
  }
};

/**
 * Initialize the API with a stored token if available
 */
export const initializeAPI = (): void => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('paradox_auth_token');
    if (token) {
      setAuthToken(token);
    }
  }
};

/**
 * Generic error handler for API requests
 * @param error Error object from axios
 * @returns Standardized error object
 */
export const handleApiError = (error: any): { message: string; statusCode?: number } => {
  if (error.response) {
    // The request was made and the server responded with an error status
    return {
      message: error.response.data.message || 'An error occurred with the server response',
      statusCode: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No response received from server. Please check your connection',
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: error.message || 'An unexpected error occurred',
    };
  }
};

/**
 * API service for making authenticated requests to the Paradox backend
 */
const paradoxAPI = {
  // Auth endpoints
  auth: {
    /**
     * Register a new user
     * @param userData User registration data
     */
    register: async (userData: { username: string; email: string; password: string }) => {
      try {
        const response = await API.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Login with email and password
     * @param credentials User login credentials
     */
    login: async (credentials: { email: string; password: string }) => {
      try {
        const response = await API.post('/auth/login', credentials);
        // Set the token if successful
        if (response.data.token) {
          setAuthToken(response.data.token);
        }
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Get the current user's data
     */
    getCurrentUser: async () => {
      try {
        const response = await API.get('/auth/user');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Log out the current user
     */
    logout: () => {
      setAuthToken(null);
    },
  },

  // Stories endpoints
  stories: {
    /**
     * Get all available stories
     */
    getAll: async () => {
      try {
        const response = await API.get('/stories');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Get a specific story by ID
     * @param storyId ID of the story to fetch
     */
    getById: async (storyId: string) => {
      try {
        const response = await API.get(`/stories/${storyId}`);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  },

  // Fragments endpoints
  fragments: {
    /**
     * Get all fragments for the current user
     */
    getAll: async () => {
      try {
        const response = await API.get('/fragments');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Combine fragments to create a new one
     * @param fragmentIds Array of fragment IDs to combine
     */
    combineFragments: async (fragmentIds: string[]) => {
      try {
        const response = await API.post('/fragments/combine', { fragmentIds });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  },

  // Paradox Coins endpoints
  coins: {
    /**
     * Get the current user's coin balance and transaction history
     */
    getBalance: async () => {
      try {
        const response = await API.get('/coins/balance');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Purchase coins
     * @param packageId ID of the coin package to purchase
     */
    purchaseCoins: async (packageId: string) => {
      try {
        const response = await API.post('/coins/purchase', { packageId });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  },

  // Community endpoints
  community: {
    /**
     * Get all community posts
     */
    getPosts: async () => {
      try {
        const response = await API.get('/community/posts');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    /**
     * Create a new community post
     * @param postData Post data to create
     */
    createPost: async (postData: { title: string; content: string; category: string; tags: string[] }) => {
      try {
        const response = await API.post('/community/posts', postData);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  },
};

export default paradoxAPI; 