const mongoose = require('mongoose');

const StoryNodeSchema = new mongoose.Schema({
  nodeId: {
    type: String,
    required: true
  },
  content: {
    text: String,
    image: String,
    background: String,
    audio: String
  },
  choices: [{
    text: String,
    nextNodeId: String,
    requires: {
      items: [String],
      traits: [{
        name: String,
        level: Number
      }],
      truth: [String]
    },
    effects: {
      addItems: [String],
      removeItems: [String],
      modifyTraits: [{
        name: String,
        change: Number
      }],
      unlockTruth: [String],
      paradoxCoins: Number
    },
    truthLevel: {
      type: Number,
      min: 0,
      max: 5, // 0: true, 5: complete paradox
      default: 0
    }
  }],
  type: {
    type: String,
    enum: ['narrative', 'dialogue', 'puzzle', 'paradox', 'choice'],
    default: 'narrative'
  },
  metadata: {
    location: String,
    characters: [String],
    mood: String,
    timePeriod: String
  }
});

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true,
    enum: ['awakening', 'training', 'subversion']
  },
  description: String,
  coverImage: String,
  isMainStory: {
    type: Boolean,
    default: false
  },
  startingNodeId: {
    type: String,
    required: true
  },
  nodes: [StoryNodeSchema],
  requirements: {
    completedStories: [String],
    paradoxLevel: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    truthFragments: [String]
  },
  rewards: {
    paradoxCoins: Number,
    truthFragments: [String],
    unlockStories: [String]
  },
  metadata: {
    author: String,
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    estimatedTime: Number, // in minutes
    tags: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story; 