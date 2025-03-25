const express = require('express');
const { protect } = require('../middleware/auth');
const TruthFragment = require('../models/TruthFragment');

const router = express.Router();

// All routes require authentication
router.use(protect);

/**
 * GET /api/assets/truth-fragments - Get all truth fragments owned by the user
 */
router.get('/truth-fragments', async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id)
      .populate('digitalAssets.truthFragments');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        truthFragments: user.digitalAssets.truthFragments || []
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching truth fragments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/assets/truth-fragments/:id - Get a specific truth fragment
 */
router.get('/truth-fragments/:id', async (req, res) => {
  try {
    const fragment = await TruthFragment.findById(req.params.id);
    
    if (!fragment) {
      return res.status(404).json({
        success: false,
        message: 'Truth fragment not found'
      });
    }
    
    // Check if the user owns this fragment
    const user = await require('../models/User').findById(req.user.id);
    const ownedFragmentIds = user.digitalAssets.truthFragments.map(fragment => 
      fragment.toString()
    );
    
    if (!ownedFragmentIds.includes(req.params.id)) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this truth fragment'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        truthFragment: fragment
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching truth fragment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/assets/truth-fragments/combine - Combine truth fragments
 */
router.post('/truth-fragments/combine', async (req, res) => {
  try {
    const { fragmentIds } = req.body;
    
    if (!fragmentIds || !Array.isArray(fragmentIds) || fragmentIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least two fragment IDs are required'
      });
    }
    
    // Check if all fragments exist and are owned by the user
    const user = await require('../models/User').findById(req.user.id);
    const ownedFragmentIds = user.digitalAssets.truthFragments.map(fragment => 
      fragment.toString()
    );
    
    const allOwned = fragmentIds.every(id => ownedFragmentIds.includes(id));
    
    if (!allOwned) {
      return res.status(403).json({
        success: false,
        message: 'You do not own all of these fragments'
      });
    }
    
    // Get the fragments
    const fragments = await TruthFragment.find({
      _id: { $in: fragmentIds }
    });
    
    // Check for a valid combination
    let resultFragment = null;
    for (const fragment of fragments) {
      if (fragment.combinationResults && fragment.combinationResults.length > 0) {
        const match = fragment.combinationResults.find(combo => {
          const comboFragmentIds = combo.fragments.map(f => f.toString());
          const remainingIds = fragmentIds.filter(id => id !== fragment._id.toString());
          return remainingIds.every(id => comboFragmentIds.includes(id));
        });
        
        if (match) {
          resultFragment = await TruthFragment.findById(match.result);
          break;
        }
      }
    }
    
    if (!resultFragment) {
      return res.status(400).json({
        success: false,
        message: 'These fragments cannot be combined'
      });
    }
    
    // Add the new fragment to the user's collection if they don't already have it
    if (!ownedFragmentIds.includes(resultFragment._id.toString())) {
      user.digitalAssets.truthFragments.push(resultFragment._id);
      await user.save();
    }
    
    res.status(200).json({
      success: true,
      data: {
        resultFragment,
        message: 'Fragments successfully combined'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error combining fragments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/assets/coins - Get user's paradox coin balance
 */
router.get('/coins', async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        paradoxCoins: user.digitalAssets.paradoxCoins || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coin balance',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/assets/coins/transfer - Transfer paradox coins to another user
 */
router.post('/coins/transfer', async (req, res) => {
  try {
    const { recipientId, amount } = req.body;
    
    if (!recipientId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipient ID and positive amount are required'
      });
    }
    
    const User = require('../models/User');
    const sender = await User.findById(req.user.id);
    const recipient = await User.findById(recipientId);
    
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }
    
    if (sender.digitalAssets.paradoxCoins < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient coin balance'
      });
    }
    
    // Transfer the coins
    sender.digitalAssets.paradoxCoins -= amount;
    recipient.digitalAssets.paradoxCoins = (recipient.digitalAssets.paradoxCoins || 0) + amount;
    
    await sender.save();
    await recipient.save();
    
    res.status(200).json({
      success: true,
      data: {
        newBalance: sender.digitalAssets.paradoxCoins,
        message: `Successfully transferred ${amount} Paradox Coins to ${recipient.username}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error transferring coins',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 