const express = require('express');
const router = express.Router();

const { createUser, getUserById } = require('../controllers/userController');
const { createGoal, getAllGoals, getGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { createTask, getAllTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const  authenticate = require('../middlewares/authMiddleware');

// User Routes
router.post('/users', createUser);
router.get('/users/:id', authenticate, getUserById);

// Goal Routes
router.post('/goals', authenticate, createGoal);
router.get('/goals', authenticate, getAllGoals);
router.get('/goals/:id', authenticate, getGoal);
router.put('/goals/:id', authenticate, updateGoal);
router.delete('/goals/:id', authenticate, deleteGoal);

// Task Routes
router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getAllTasks);
router.get('/tasks/:id', authenticate, getTask);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

// Category Routes
router.post('/categories', authenticate, createCategory);
router.get('/categories', authenticate, getAllCategories);
router.get('/categories/:id', authenticate, getCategoryById);
router.put('/categories/:id', authenticate, updateCategory);
router.delete('/categories/:id', authenticate, deleteCategory);

module.exports = router;
