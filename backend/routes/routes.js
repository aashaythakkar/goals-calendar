const express = require('express');
const router = express.Router();

const { createUser, getUserById } = require('../controllers/userController');
const { createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal } = require('../controllers/goalController');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, toggleTaskStatus } = require('../controllers/taskController');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authMiddleware, attachUserData} = require('../middleware/authMiddleware');


// User Routes
router.post('/users', createUser);
router.get('/users/:id', authMiddleware, getUserById);

// Goal Routes
router.post('/goals', authMiddleware, attachUserData, createGoal);
router.get('/goals', authMiddleware, attachUserData, getAllGoals);
router.get('/goals/:id', authMiddleware, attachUserData, getGoalById);
router.put('/goals/:id', authMiddleware, attachUserData, updateGoal);
router.delete('/goals/:id', authMiddleware, attachUserData, deleteGoal);

// Task Routes
router.post('/tasks', authMiddleware,attachUserData, createTask);  // Create a task
router.get('/tasks', authMiddleware, attachUserData, getAllTasks);  // Get all tasks
router.get('/tasks/:id', authMiddleware, attachUserData, getTaskById);  // Get task by ID
router.put('/tasks/:id', authMiddleware, attachUserData, updateTask);  // Update task by ID
router.delete('/tasks/:id', authMiddleware, attachUserData, deleteTask);  // Delete task by ID
router.patch('/tasks/:id/status', authMiddleware, attachUserData, toggleTaskStatus);  // Toggle task status

// Category Routes
router.post('/categories/', authMiddleware, attachUserData, createCategory);
router.get('/categories/', authMiddleware, attachUserData, getAllCategories);
router.get('/categories/:id', authMiddleware, attachUserData, getCategoryById);
router.put('/categories/:id', authMiddleware, attachUserData, updateCategory);
router.delete('/categories/:id', authMiddleware, attachUserData, deleteCategory);

module.exports = router;
