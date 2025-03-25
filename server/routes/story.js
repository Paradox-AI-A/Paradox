const express = require('express');
const { 
  getAvailableStories, 
  getStoryById, 
  getStoryNode, 
  processChoice 
} = require('../controllers/storyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET /api/story - Get available stories for current user
router.get('/', getAvailableStories);

// GET /api/story/:storyId - Get a specific story by ID
router.get('/:storyId', getStoryById);

// GET /api/story/:storyId/node/:nodeId - Get a specific story node
router.get('/:storyId/node/:nodeId', getStoryNode);

// POST /api/story/choice - Process a story choice
router.post('/choice', processChoice);

module.exports = router; 