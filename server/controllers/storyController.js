const Story = require('../models/Story');
const User = require('../models/User');
const TruthFragment = require('../models/TruthFragment');
const { generateAIResponse } = require('../services/aiService');

/**
 * Get available stories for the current user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAvailableStories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's completed stories and paradox level
    const completedStories = user.gameState.completedStories || [];
    const paradoxLevel = user.lieProfile.paradoxAptitude || 1;
    const truthFragments = user.digitalAssets.truthFragments.map(fragment => 
      typeof fragment === 'object' ? fragment._id : fragment
    );
    
    // Find stories that match the user's criteria
    const stories = await Story.find({
      $or: [
        // Main story based on current chapter
        { 
          isMainStory: true,
          chapter: user.gameState.currentChapter
        },
        // Side stories with matching requirements
        {
          isMainStory: false,
          'requirements.paradoxLevel': { $lte: paradoxLevel },
          'requirements.completedStories': { 
            $not: { $elemMatch: { $nin: completedStories } } 
          }
        }
      ]
    }).select('title description coverImage chapter isMainStory requirements rewards metadata');
    
    res.status(200).json({
      success: true,
      data: {
        stories,
        userProgress: {
          completedStories,
          paradoxLevel,
          currentChapter: user.gameState.currentChapter
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available stories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get a specific story by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        story
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching story',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get a story node by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getStoryNode = async (req, res) => {
  try {
    const { storyId, nodeId } = req.params;
    const story = await Story.findById(storyId);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    // Find the requested node
    const node = story.nodes.find(n => n.nodeId === nodeId);
    
    if (!node) {
      return res.status(404).json({
        success: false,
        message: 'Story node not found'
      });
    }
    
    // For nodes with dynamic content, generate it using AI
    if (node.type === 'dynamic' && process.env.ENABLE_AI_NARRATIVE === 'true') {
      const user = await User.findById(req.user.id);
      
      // Get user profile info for personalization
      const userProfile = {
        lieProfile: user.lieProfile,
        gameState: user.gameState,
        completedStories: user.gameState.completedStories
      };
      
      // Generate dynamic content
      const dynamicContent = await generateAIResponse(node, userProfile, story);
      node.content.text = dynamicContent;
    }
    
    res.status(200).json({
      success: true,
      data: {
        node
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching story node',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Process a story choice
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.processChoice = async (req, res) => {
  try {
    const { storyId, nodeId, choiceIndex } = req.body;
    const user = await User.findById(req.user.id);
    const story = await Story.findById(storyId);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    // Find the current node
    const currentNode = story.nodes.find(n => n.nodeId === nodeId);
    
    if (!currentNode) {
      return res.status(404).json({
        success: false,
        message: 'Story node not found'
      });
    }
    
    // Get the selected choice
    const choice = currentNode.choices[choiceIndex];
    
    if (!choice) {
      return res.status(400).json({
        success: false,
        message: 'Invalid choice'
      });
    }
    
    // Process choice effects
    const effects = choice.effects || {};
    const updates = {};
    
    // Update user items
    if (effects.addItems && effects.addItems.length > 0) {
      // Add implementation to add items to user inventory
    }
    
    if (effects.removeItems && effects.removeItems.length > 0) {
      // Add implementation to remove items from user inventory
    }
    
    // Update user traits
    if (effects.modifyTraits && effects.modifyTraits.length > 0) {
      effects.modifyTraits.forEach(trait => {
        if (trait.name === 'lieCreativity') {
          user.lieProfile.lieCreativity = Math.max(1, Math.min(10, user.lieProfile.lieCreativity + trait.change));
        } else if (trait.name === 'truthResistance') {
          user.lieProfile.truthResistance = Math.max(1, Math.min(10, user.lieProfile.truthResistance + trait.change));
        } else if (trait.name === 'paradoxAptitude') {
          user.lieProfile.paradoxAptitude = Math.max(1, Math.min(5, user.lieProfile.paradoxAptitude + trait.change));
        }
      });
    }
    
    // Award Paradox Coins
    if (effects.paradoxCoins) {
      user.digitalAssets.paradoxCoins = (user.digitalAssets.paradoxCoins || 0) + effects.paradoxCoins;
    }
    
    // Unlock truth fragments
    if (effects.unlockTruth && effects.unlockTruth.length > 0) {
      const truthFragments = await TruthFragment.find({
        name: { $in: effects.unlockTruth }
      });
      
      if (truthFragments.length > 0) {
        truthFragments.forEach(fragment => {
          if (!user.digitalAssets.truthFragments.includes(fragment._id)) {
            user.digitalAssets.truthFragments.push(fragment._id);
          }
        });
      }
    }
    
    // Check if this is the final node of the story
    const nextNode = story.nodes.find(n => n.nodeId === choice.nextNodeId);
    if (!nextNode && !user.gameState.completedStories.includes(story._id.toString())) {
      // Story is completed
      user.gameState.completedStories.push(story._id.toString());
      
      // If this was a main story, update the user's current chapter
      if (story.isMainStory) {
        if (story.chapter === 'awakening') {
          user.gameState.currentChapter = 'training';
        } else if (story.chapter === 'training') {
          user.gameState.currentChapter = 'subversion';
        }
      }
      
      // Award story completion rewards
      if (story.rewards) {
        if (story.rewards.paradoxCoins) {
          user.digitalAssets.paradoxCoins = (user.digitalAssets.paradoxCoins || 0) + story.rewards.paradoxCoins;
        }
        
        if (story.rewards.truthFragments && story.rewards.truthFragments.length > 0) {
          const rewardFragments = await TruthFragment.find({
            name: { $in: story.rewards.truthFragments }
          });
          
          if (rewardFragments.length > 0) {
            rewardFragments.forEach(fragment => {
              if (!user.digitalAssets.truthFragments.includes(fragment._id)) {
                user.digitalAssets.truthFragments.push(fragment._id);
              }
            });
          }
        }
      }
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        nextNodeId: choice.nextNodeId,
        effects: {
          paradoxCoins: effects.paradoxCoins || 0,
          unlockedTruth: effects.unlockTruth || [],
          traitChanges: effects.modifyTraits || []
        },
        storyCompleted: !nextNode,
        userProgress: {
          lieProfile: user.lieProfile,
          paradoxCoins: user.digitalAssets.paradoxCoins,
          completedStories: user.gameState.completedStories,
          currentChapter: user.gameState.currentChapter
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing choice',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 