const mongoose = require('mongoose');

const ParadoxCoinSchema = new mongoose.Schema({
  // Blockchain data
  tokenName: {
    type: String,
    default: 'ParadoxCoin'
  },
  symbol: {
    type: String,
    default: 'PRDX'
  },
  contractAddress: String,
  
  // Token economics
  totalSupply: {
    type: Number,
    default: 0
  },
  currentSupply: {
    type: Number,
    default: 0
  },
  reserveSupply: {
    type: Number,
    default: 0
  },
  
  // Distribution parameters
  playerAllocation: {
    type: Number,
    default: 50 // percentage
  },
  teamAllocation: {
    type: Number,
    default: 20 // percentage
  },
  marketingAllocation: {
    type: Number,
    default: 15 // percentage
  },
  reserveAllocation: {
    type: Number,
    default: 15 // percentage
  },
  
  // Global mechanics
  paradoxResolutionRate: {
    type: Number,
    default: 0.5, // 0-1 scale
    min: 0,
    max: 1
  },
  truthLevelUnlocked: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  
  // Coin levels and their requirements
  levels: [{
    name: {
      type: String,
      enum: ['lie', 'contradiction', 'paradox', 'hyperreal', 'metatruth']
    },
    unlocked: {
      type: Boolean,
      default: false
    },
    unlockRequirement: {
      globalParadoxResolution: Number, // Minimum resolution rate to unlock
      storyProgress: String, // Chapter required
      activePlayers: Number // Minimum number of active players
    },
    valueMultiplier: Number, // Value relative to base coin
    specialAbilities: [String]
  }],
  
  // Transaction rules
  transactionRules: {
    transferFee: {
      type: Number,
      default: 0.01 // 1%
    },
    burnRate: {
      type: Number,
      default: 0.005 // 0.5%
    },
    tradeRestrictions: {
      minimumHoldTime: {
        type: Number,
        default: 0 // in hours
      },
      requiresTruthFragment: {
        type: Boolean,
        default: false
      }
    }
  },
  
  // Coin minting parameters
  mintingRules: {
    storyCompletion: {
      type: Number,
      default: 50 // coins
    },
    paradoxCreation: {
      type: Number,
      default: 100 // coins
    },
    truthDiscovery: {
      type: Number,
      default: 75 // coins
    },
    dailyLimit: {
      type: Number,
      default: 250 // coins
    }
  },
  
  // Ecosystem metrics
  metrics: {
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    averageTransactionsPerDay: {
      type: Number,
      default: 0
    },
    totalTransactions: {
      type: Number,
      default: 0
    },
    uniqueHolders: {
      type: Number,
      default: 0
    }
  }
});

const ParadoxCoin = mongoose.model('ParadoxCoin', ParadoxCoinSchema);

module.exports = ParadoxCoin; 