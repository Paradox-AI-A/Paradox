#!/usr/bin/env node

/**
 * Database seeding script for the Paradox application
 * Populates the database with initial data for development and testing
 * 
 * Usage: 
 *   - Development: node scripts/seedDatabase.js
 *   - Production (with caution): NODE_ENV=production node scripts/seedDatabase.js --force
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import models
const User = require('../server/models/User');
const Story = require('../server/models/Story');
const Fragment = require('../server/models/Fragment');
const CombinationRecipe = require('../server/models/CombinationRecipe');
const Transaction = require('../server/models/Transaction');
const CommunityPost = require('../server/models/CommunityPost');

// Configuration
const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/paradox',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@paradox.world',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123', // Only used in development
  dataDir: path.join(__dirname, './seed-data'),
  forceMode: process.argv.includes('--force'),
};

// Security check for production
if (!config.isDevelopment && !config.forceMode) {
  console.error('⚠️ Refusing to seed production database without --force flag');
  process.exit(1);
}

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

// Load seed data from JSON files
function loadSeedData(fileName) {
  try {
    const filePath = path.join(config.dataDir, `${fileName}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    
    // If file doesn't exist, use hardcoded fallback data
    console.warn(`⚠️ Seed data file ${fileName}.json not found, using fallback data`);
    return getFallbackData(fileName);
  } catch (err) {
    console.error(`❌ Error loading seed data for ${fileName}:`, err.message);
    return [];
  }
}

// Generate fallback data if JSON files are not available
function getFallbackData(modelName) {
  switch (modelName) {
    case 'users':
      return [
        {
          username: 'admin',
          email: config.adminEmail,
          password: config.adminPassword,
          profileInfo: { 
            level: 50, 
            premium: true, 
            bio: 'System administrator' 
          },
          lieProfile: {
            lieAbility: 100,
            paradoxResistance: 100,
            truthDiscernment: 100,
            specialAbilities: ['ADMIN_ACCESS', 'INFINITE_COINS']
          },
          digitalAssets: {
            paradoxCoins: 999999
          },
          isAdmin: true,
        },
        {
          username: 'testuser',
          email: 'user@example.com',
          password: 'password123',
          profileInfo: { 
            level: 5, 
            premium: false, 
            bio: 'Just a regular test user' 
          },
          lieProfile: {
            lieAbility: 25,
            paradoxResistance: 15,
            truthDiscernment: 30,
            specialAbilities: []
          },
          digitalAssets: {
            paradoxCoins: 500
          }
        }
      ];
    case 'fragments':
      return [
        {
          name: 'Genesis Truth',
          description: 'Reveals the origins of the Truth Covenant and its founders\' secret intentions.',
          rarity: 'rare',
          combinable: true,
          combinableWith: ['reality-fragment']
        },
        {
          name: 'Reality Fragment',
          description: 'A code snippet suggesting reality might be artificially constructed.',
          rarity: 'uncommon',
          combinable: true,
          combinableWith: ['genesis-truth']
        }
      ];
    case 'stories':
      return [
        {
          title: 'The Truth Covenant',
          description: 'The story of how the global Truth AI came to power and changed society forever.',
          author: 'Paradox Team',
          coverImage: '/images/stories/truth-covenant.jpg',
          difficulty: 'medium',
          premium: false,
          requiredLevel: 1
        }
      ];
    default:
      return [];
  }
}

// Clear all existing data
async function clearDatabase() {
  if (config.isDevelopment || config.forceMode) {
    console.log('🧹 Clearing existing data...');
    
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    
    console.log('✅ Database cleared');
  }
}

// Seed users
async function seedUsers() {
  const users = loadSeedData('users');
  
  console.log(`🌱 Seeding ${users.length} users...`);
  
  for (const userData of users) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create user with hashed password
      await User.create({
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      console.error(`❌ Error seeding user ${userData.email}:`, err.message);
    }
  }
  
  console.log('✅ Users seeded');
}

// Seed stories
async function seedStories() {
  const stories = loadSeedData('stories');
  
  console.log(`🌱 Seeding ${stories.length} stories...`);
  
  for (const storyData of stories) {
    try {
      const newStory = await Story.create({
        ...storyData,
        releaseDate: new Date(),
        completionCount: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`📖 Created story: ${newStory.title}`);
    } catch (err) {
      console.error(`❌ Error seeding story ${storyData.title}:`, err.message);
    }
  }
  
  console.log('✅ Stories seeded');
}

// Seed fragments
async function seedFragments() {
  const fragments = loadSeedData('fragments');
  
  console.log(`🌱 Seeding ${fragments.length} fragments...`);
  
  for (const fragmentData of fragments) {
    try {
      await Fragment.create({
        ...fragmentData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      console.error(`❌ Error seeding fragment ${fragmentData.name}:`, err.message);
    }
  }
  
  console.log('✅ Fragments seeded');
}

// Seed combination recipes
async function seedCombinationRecipes() {
  const recipes = loadSeedData('combinationRecipes');
  
  console.log(`🌱 Seeding ${recipes.length} combination recipes...`);
  
  for (const recipeData of recipes) {
    try {
      await CombinationRecipe.create({
        ...recipeData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      console.error(`❌ Error seeding combination recipe:`, err.message);
    }
  }
  
  console.log('✅ Combination recipes seeded');
}

// Main function
async function seedDatabase() {
  try {
    console.log('🚀 Starting database seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearDatabase();
    
    // Seed collections
    await seedUsers();
    await seedStories();
    await seedFragments();
    await seedCombinationRecipes();
    
    console.log('🎉 Database seeding completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database seeding failed:', err.message);
    process.exit(1);
  }
}

// Create seed-data directory if it doesn't exist
if (!fs.existsSync(config.dataDir)) {
  fs.mkdirSync(config.dataDir, { recursive: true });
  console.log(`📁 Created seed data directory: ${config.dataDir}`);
}

// Run the seeding process
seedDatabase(); 