# Paradox

<div align="center">
  <img src="https://raw.githubusercontent.com/Paradox-AI-A/Paradox/main/public/images/logo.png" alt="Paradox Logo" width="200" height="200">
</div>

A reality-bending narrative experience where truth and fiction intertwine.

---

Paradox is an immersive narrative experience platform that combines cutting-edge AI technology with digital crypto assets to explore the relationship between truth and lies.

## About The Project

Set in the year 2050, Paradox is an interactive storytelling platform where truth is enforced by AI, and your ability to lie becomes your most powerful tool for discovering deeper truths. The world is divided between the Truth Covenant, who control the global information order, and the Paradox Resistance, who've discovered flaws in the Truth AI system.

Players take on the role of Ela Chen, a rare individual with the ability to lie without detection by the Truth AI. As you progress through the narrative, you'll develop your lying skills, collect Truth Fragments (NFTs), earn Paradox Coins (cryptocurrency), and navigate a complex narrative where sometimes a carefully crafted lie is the only path to deeper understanding.

## Key Features

- **Interactive Storytelling**: Immersive narrative where your choices and lies influence the story path
- **Digital Assets**: Earn Paradox Coins and collect Truth Fragments that evolve as you progress
- **Paradox Construction**: Master the art of creating perfect paradoxes to unlock hidden narrative paths
- **Community Features**: Compete in the Lie Arena, exchange clues in the Truth Market, and more
- **Blockchain Integration**: Digital assets secured on the blockchain with real-world value

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: OpenAI API for dynamic narrative generation
- **Blockchain**: Ethereum (ERC20 for Paradox Coins, ERC721 for Truth Fragments)

## System Architecture

Paradox follows a modern fullstack architecture with distinct layers for frontend, backend, and blockchain integration.

```
┌─────────────────────────────────────┐
│              Client                 │
│  ┌─────────────┐   ┌─────────────┐  │
│  │   Next.js   │   │ React/Hooks │  │
│  │  Pages/SSR  │   │  Components │  │
│  └─────────────┘   └─────────────┘  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│            API Layer                │
│  ┌─────────────┐   ┌─────────────┐  │
│  │  Express    │   │  Auth/JWT   │  │
│  │  Routes     │   │  Middleware │  │
│  └─────────────┘   └─────────────┘  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│           Service Layer             │
│  ┌─────────────┐   ┌─────────────┐  │
│  │  Business   │   │  Blockchain │  │
│  │   Logic     │   │   Service   │  │
│  └─────────────┘   └─────────────┘  │
└────────────┬──────────────┬─────────┘
             │              │
             ▼              ▼
┌─────────────────┐  ┌─────────────────┐
│    MongoDB      │  │    Ethereum     │
│  (User data,    │  │ (Digital Assets,│
│  Game state)    │  │  Transactions)  │
└─────────────────┘  └─────────────────┘
```

### Frontend Architecture

The frontend follows a component-based architecture using React and Next.js, with several key patterns:

1. **Context API** for global state management (AuthContext, GameContext)
2. **Custom Hooks** for reusable logic (useApi, useLocalStorage, useFragments)
3. **Pages** for routing and server-side rendering
4. **Components** structured in a modular, reusable design

```
┌─────────────────────────────────────────────────────┐
│                     Next.js App                     │
│                                                     │
│  ┌─────────────────┐        ┌───────────────────┐   │
│  │      Pages      │        │     Components    │   │
│  │  - Home         │        │  - Common         │   │
│  │  - Stories      │        │  - Layout         │   │
│  │  - Fragments    │        │  - Story          │   │
│  │  - Coins        │        │  - Fragment       │   │
│  │  - Community    │        │  - User           │   │
│  └─────────────────┘        └───────────────────┘   │
│                                                     │
│  ┌─────────────────┐        ┌───────────────────┐   │
│  │     Contexts    │        │      Hooks        │   │
│  │  - Auth         │        │  - useApi         │   │
│  │  - Game         │        │  - useFragment    │   │
│  │  - Blockchain   │        │  - useLocalStorage│   │
│  └─────────────────┘        └───────────────────┘   │
│                                                     │
│  ┌─────────────────┐        ┌───────────────────┐   │
│  │     Utils       │        │      Types        │   │
│  │  - API          │        │  - Models         │   │
│  │  - Formatters   │        │  - DTOs           │   │
│  │  - Constants    │        │  - Interfaces     │   │
│  └─────────────────┘        └───────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Backend Architecture

The backend follows a layered architecture for clean separation of concerns:

1. **Routes** define API endpoints and handle HTTP requests
2. **Controllers** process incoming requests and prepare responses
3. **Services** implement business logic and external integrations
4. **Models** define data schemas and database interactions

```
┌─────────────────────────────────────────────────────┐
│                  Express Backend                    │
│                                                     │
│  ┌─────────────────┐        ┌───────────────────┐   │
│  │     Routes      │───────▶│    Controllers    │   │
│  │  - Auth         │        │  - AuthController │   │
│  │  - Story        │        │  - StoryController│   │
│  │  - Fragment     │        │  - FragmentCtrl   │   │
│  │  - Coin         │        │  - CoinController │   │
│  │  - Community    │        │  - CommunityCtrl  │   │
│  └─────────────────┘        └─────────┬─────────┘   │
│                                       │             │
│                                       ▼             │
│  ┌─────────────────┐        ┌───────────────────┐   │
│  │   Middleware    │        │     Services      │   │
│  │  - Auth         │        │  - AuthService    │   │
│  │  - Validation   │        │  - StoryService   │   │
│  │  - Error        │        │  - FragmentService│   │
│  │  - Logging      │        │  - BlockchainSvc  │   │
│  └─────────────────┘        └─────────┬─────────┘   │
│                                       │             │
│                                       ▼             │
│  ┌─────────────────────────────────────────────┐    │
│  │                  Models                     │    │
│  │  - User         - Story      - Fragment     │    │
│  │  - Transaction  - Comment    - Community    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Data Flow

The Paradox platform implements a unidirectional data flow pattern to ensure predictable state management:

```
┌────────────┐         ┌────────────┐         ┌────────────┐
│            │ Action  │            │ Update  │            │
│   User     │─────────▶   Store/   │─────────▶    UI      │
│ Interaction│         │   Context  │         │ Components │
│            │         │            │         │            │
└────────────┘         └────────────┘         └────────────┘
       ▲                                             │
       │                                             │
       └─────────────────────────────────────────────┘
                       Render
```

### Authentication Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│          │    │          │    │          │    │          │    │          │
│   User   │───▶│  Login   │───▶│ API Call │───▶│  JWT     │───▶│  Auth    │
│          │    │  Form    │    │          │    │ Creation │    │ Context  │
│          │    │          │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                                      │
                                                                      ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│          │    │          │    │          │    │          │    │          │
│ Protected│◀───│ Auth     │◀───│ JWT      │◀───│ Local    │◀───│ Store    │
│  Routes  │    │ Middleware│    │ Validation│   │ Storage  │    │ Token    │
│          │    │          │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Blockchain Integration

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│          │    │          │    │          │    │          │
│   User   │───▶│  Action  │───▶│Blockchain│───▶│ Ethereum │
│          │    │  Request │    │ Service  │    │ Network  │
│          │    │          │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │                │
                                     ▼                │
                                ┌──────────┐          │
                                │          │          │
                                │ Mock     │          │
                                │ Response │◀─────────┘
                                │(Dev Mode)│
                                │          │
                                └──────────┘
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Ethereum wallet (for blockchain features)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Paradox-AI-A/Paradox.git
   cd paradox
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory based on `.env.example`

4. Start the development server
   ```
   npm run dev:full
   ```

5. Visit `http://localhost:3000` in your browser

### Environment Variables

```
# Server
PORT=5000
MONGO_URI=mongodb://localhost:27017/paradox
JWT_SECRET=your_jwt_secret

# Blockchain
BLOCKCHAIN_ENABLED=true
PROVIDER_URL=https://mainnet.infura.io/v3/your_infura_id
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
WALLET_PRIVATE_KEY=your_private_key

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Project Structure

```
Paradox/
├── app/                  # Frontend application
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   └── pages/        # Page-specific components
│   ├── contexts/         # Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Next.js pages
│   │   ├── _app.tsx      # App entry point
│   │   ├── index.tsx     # Home page
│   │   ├── stories/      # Story pages
│   │   ├── fragments/    # Fragment pages
│   │   ├── coins/        # Coin pages
│   │   └── community/    # Community pages
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
│       ├── api.ts        # API client
│       ├── constants.ts  # Constants
│       └── formatters.ts # Formatting utilities
├── public/               # Static assets
├── server/               # Backend server
│   ├── controllers/      # API controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic services
│   └── index.js          # Server entry point
├── scripts/              # Build and deployment scripts
│   ├── generateTypes.js  # Generate TypeScript types
│   └── seedDatabase.js   # Seed database with initial data
├── .env.example          # Example environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Package configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Code Examples

### Authentication Context

```typescript
// app/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

const AuthContext = createContext({
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('paradox_auth_token');
    if (storedToken) {
      setToken(storedToken);
      loadUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);
  
  // Set axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  
  // Load user data
  const loadUser = async (authToken) => {
    try {
      const res = await axios.get('/api/auth/user');
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setToken(null);
      setUser(null);
      localStorage.removeItem('paradox_auth_token');
      setLoading(false);
    }
  };
  
  // Auth methods...
  
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
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### Blockchain Service

```javascript
// server/services/blockchainService.js
const { ethers } = require('ethers');

// Simplified ABI for Paradox contracts
const PARADOX_ABI = [
  // ERC20 - Paradox Coins
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  // ERC721 - Truth Fragments
  'function mintTruthFragment(address to, uint256 fragmentId) returns (uint256)',
  'function combineFragments(uint256[] fragmentIds) returns (uint256)',
  // Paradox specific
  'function updateParadoxResolutionRate(uint256 newRate) returns (bool)',
  'function getParadoxLevel() view returns (uint256)'
];

class BlockchainService {
  constructor() {
    this.initialized = false;
    this.provider = null;
    this.contract = null;
    this.wallet = null;
  }
  
  async initializeBlockchain() {
    // Skip if blockchain features are disabled
    if (process.env.BLOCKCHAIN_ENABLED !== 'true') {
      console.log('Blockchain features are disabled');
      return;
    }
    
    try {
      // Setup provider and contract instance
      this.provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
      this.wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, this.provider);
      this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, PARADOX_ABI, this.wallet);
      this.initialized = true;
      console.log('Blockchain service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize blockchain service:', error);
      throw new Error('Blockchain initialization failed');
    }
  }
  
  // Service methods...
}

module.exports = new BlockchainService();
```

### Truth Fragment Component

```typescript
// app/components/common/TruthFragment.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { RARITY_COLORS, RARITY_ICONS } from '../../utils/constants';

export interface TruthFragmentProps {
  id: string;
  name: string;
  description: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
  obtained?: boolean;
  onClick?: () => void;
  className?: string;
  animationDelay?: number;
}

const TruthFragment: React.FC<TruthFragmentProps> = ({
  id,
  name,
  description,
  rarity = 'common',
  obtained = true,
  onClick,
  className = '',
  animationDelay = 0
}) => {
  // Get colors and icon based on rarity from constants
  const colors = RARITY_COLORS[rarity];
  const icon = RARITY_ICONS[rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className={`relative ${colors.bg} ${colors.border} rounded-lg p-4 border ${
        obtained ? '' : 'opacity-50'
      } ${onClick ? 'cursor-pointer hover:shadow-md transition' : ''} ${className}`}
      onClick={obtained && onClick ? onClick : undefined}
    >
      <div className="flex items-start">
        <div className="text-3xl mr-3">{icon}</div>
        <div>
          <h3 className={`font-bold ${colors.text}`}>{name}</h3>
          <p className="text-gray-300 text-sm mt-1">{description}</p>
          {!obtained && (
            <div className="text-xs text-gray-400 mt-2 flex items-center">
              <span className="mr-1">🔒</span> Not yet discovered
            </div>
          )}
        </div>
      </div>
      
      {/* Rarity badge */}
      <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-black/30 text-white capitalize">
        {rarity}
      </div>
    </motion.div>
  );
};

export default TruthFragment;
```

## Development Workflow

### Local Development

1. Start the development server
   ```
   npm run dev:full
   ```

2. Start only the frontend
   ```
   npm run dev
   ```

3. Start only the backend
   ```
   npm run server
   ```

### Database Management

1. Seed the database with initial data
   ```
   npm run seed
   ```

2. Generate TypeScript types from MongoDB schemas
   ```
   npm run generate-types
   ```

### Testing and Deployment

1. Run tests
   ```
   npm test
   ```

2. Build for production
   ```
   npm run build
   ```

3. Start production server
   ```
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- Website: [paradox-world.com](https://paradox-world.com)
- Twitter: [@A_Paradox_AI](https://x.com/A_Paradox_AI)
- GitHub: [Paradox-AI-A](https://github.com/Paradox-AI-A)

## Acknowledgements

- [OpenAI](https://openai.com/)
- [Ethereum](https://ethereum.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/) 