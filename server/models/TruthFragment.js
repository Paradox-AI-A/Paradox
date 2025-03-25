const mongoose = require('mongoose');

const TruthFragmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'],
    default: 'common'
  },
  fragmentType: {
    type: String,
    enum: ['lie', 'contradiction', 'paradox', 'hyperreal', 'metatruth'],
    required: true
  },
  level: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  attributes: {
    lieStrength: { type: Number, default: 0 },
    paradoxDepth: { type: Number, default: 0 },
    truthClarity: { type: Number, default: 0 },
    socialInfluence: { type: Number, default: 0 }
  },
  unlockRequirements: {
    stories: [String],
    otherFragments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }],
    paradoxLevel: Number,
    lieCreativity: Number
  },
  canCombineWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }],
  combinationResults: [{
    fragments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }],
    result: { type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }
  }],
  storyEffects: {
    unlocksStories: [String],
    unlocksChoices: [String],
    providesHints: [String]
  },
  marketData: {
    baseCoinValue: { type: Number, default: 10 },
    limited: { type: Boolean, default: false },
    totalSupply: Number,
    currentSupply: Number
  },
  metadata: {
    lore: String,
    relatedCharacters: [String],
    obtainMethod: String,
    discoveryDate: Date
  },
  tokenId: String, // For blockchain representation
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TruthFragment = mongoose.model('TruthFragment', TruthFragmentSchema);

module.exports = TruthFragment; 