const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const attachUserData = require('../middleware/attachUserData');
const {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

// Create a goal
router.post('/goals', authMiddleware, attachUserData, createGoal);

// Get all goals
router.get('/goals', authMiddleware, attachUserData, getAllGoals);

// Get a single goal by ID
router.get('/goals/:id', authMiddleware, attachUserData, getGoalById);

// Update a goal by ID
router.put('/goals/:id', authMiddleware, attachUserData, updateGoal);

// Delete a goal by ID
router.delete('/goals/:id', authMiddleware, attachUserData, deleteGoal);

module.exports = router;
