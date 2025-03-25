const express = require('express');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET /api/user/profile - Get user profile
router.get('/profile', (req, res) => {
  // Placeholder route - will be implemented in userController
  res.status(200).json({
    success: true,
    message: 'Get user profile endpoint'
  });
});

// PUT /api/user/profile - Update user profile
router.put('/profile', (req, res) => {
  // Placeholder route - will be implemented in userController
  res.status(200).json({
    success: true,
    message: 'Update user profile endpoint'
  });
});

// GET /api/user/stats - Get user game statistics
router.get('/stats', (req, res) => {
  // Placeholder route - will be implemented in userController
  res.status(200).json({
    success: true,
    message: 'Get user statistics endpoint'
  });
});

// Admin routes
router.use(admin);

// GET /api/user - Get all users (admin only)
router.get('/', (req, res) => {
  // Placeholder route - will be implemented in userController
  res.status(200).json({
    success: true,
    message: 'Get all users endpoint (admin only)'
  });
});

// DELETE /api/user/:id - Delete a user (admin only)
router.delete('/:id', (req, res) => {
  // Placeholder route - will be implemented in userController
  res.status(200).json({
    success: true,
    message: `Delete user ${req.params.id} endpoint (admin only)`
  });
});

module.exports = router; 