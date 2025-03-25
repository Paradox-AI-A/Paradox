const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  profileInfo: {
    displayName: String,
    avatar: String,
    bio: String
  },
  lieProfile: {
    lieCreativity: { type: Number, default: 5 }, // 1-10 scale
    truthResistance: { type: Number, default: 5 }, // 1-10 scale
    paradoxAptitude: { type: Number, default: 1 }, // 1-5 scale
    preferredLieTypes: [String]
  },
  gameState: {
    currentChapter: { type: String, default: 'awakening' },
    completedStories: [String],
    unlockedCharacters: [String],
    discoveredTruths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }]
  },
  digitalAssets: {
    paradoxCoins: { type: Number, default: 0 },
    truthFragments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TruthFragment' }],
    walletAddress: String
  },
  socialInteractions: {
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reputation: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User; 