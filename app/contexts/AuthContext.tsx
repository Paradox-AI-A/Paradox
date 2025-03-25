import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define user interface
interface User {
  _id: string;
  username: string;
  email: string;
  profileInfo: {
    level: number;
    premium: boolean;
    bio?: string;
    avatar?: string;
  };
  lieProfile: {
    lieAbility: number;
    paradoxResistance: number;
    truthDiscernment: number;
    specialAbilities: string[];
  };
  gameState: {
    completedStories: string[];
    currentStory?: string;
  };
  digitalAssets: {
    paradoxCoins: number;
    fragments: string[];
  };
}

// Define AuthContext interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Define AuthProvider props interface
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create Auth Context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('paradox_auth_token');
    if (storedToken) {
      setToken(storedToken);
      loadUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Set Axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user data from API
  const loadUser = async (authToken: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading user:', err);
      setToken(null);
      setUser(null);
      localStorage.removeItem('paradox_auth_token');
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('paradox_auth_token', res.data.token);
        setToken(res.data.token);
        await loadUser(res.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  // Login a user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('paradox_auth_token', res.data.token);
        setToken(res.data.token);
        await loadUser(res.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('paradox_auth_token');
    setToken(null);
    setUser(null);
  };

  // Clear error state
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 