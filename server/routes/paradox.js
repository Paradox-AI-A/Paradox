const express = require('express');
const { protect } = require('../middleware/auth');
const { analyzeTruth } = require('../services/aiService');

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * POST /api/paradox/analyze - Analyze a player's statement for truthfulness and paradox elements
 */
router.post('/analyze', async (req, res) => {
  try {
    const { statement, context } = req.body;
    
    if (!statement) {
      return res.status(400).json({
        success: false,
        message: 'Statement is required'
      });
    }
    
    // Call the AI service to analyze the statement
    const analysis = await analyzeTruth(statement, context || {
      currentNode: 'unknown',
      character: 'unknown',
      previousStatements: []
    });
    
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error analyzing statement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/paradox/levels - Get information about paradox levels
 */
router.get('/levels', (req, res) => {
  // Placeholder route - will be implemented later
  const levels = [
    {
      id: 'lie',
      name: 'Lie Level',
      description: 'Basic fabrications and simple untruths',
      requirements: 'None - available to all players',
      abilities: ['Basic story manipulation', 'Simple deception tactics']
    },
    {
      id: 'contradiction',
      name: 'Contradiction Level',
      description: 'Statements that contradict established facts',
      requirements: 'Complete at least one Awakening story',
      abilities: ['Access to side quests', 'Ability to influence NPC trust']
    },
    {
      id: 'paradox',
      name: 'Paradox Level',
      description: 'Self-referential statements that create logical paradoxes',
      requirements: 'Paradox Aptitude of at least 3',
      abilities: ['Access to advanced story branches', 'Truth fragment combination']
    },
    {
      id: 'hyperreal',
      name: 'Hyperreal Level',
      description: 'Lies that are more convincing than the truth itself',
      requirements: 'Lie Creativity of at least 8',
      abilities: ['Truth manipulation', 'Reality distortion within narratives']
    },
    {
      id: 'metatruth',
      name: 'Meta-Truth Level',
      description: 'Transcendent understanding of the nature of truth itself',
      requirements: 'Complete the Training chapter',
      abilities: ['Access to hidden story content', 'Ability to create custom paradoxes']
    }
  ];
  
  res.status(200).json({
    success: true,
    data: {
      levels
    }
  });
});

/**
 * POST /api/paradox/create - Create a custom paradox
 */
router.post('/create', (req, res) => {
  // Placeholder route - will be implemented later
  res.status(200).json({
    success: true,
    message: 'Create custom paradox endpoint'
  });
});

module.exports = router; 