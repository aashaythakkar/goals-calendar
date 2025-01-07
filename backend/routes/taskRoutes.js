const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, toggleTaskStatus } = require('../controllers/taskController');
const { authMiddleware, attachUserData} = require('../middleware/authMiddleware');

const router = express.Router();

// Protect routes with authMiddleware to verify token
router.post('/tasks', authMiddleware,attachUserData, createTask);  // Create a task
router.get('/tasks', authMiddleware, attachUserData, getAllTasks);  // Get all tasks
router.get('/tasks/:id', authMiddleware, attachUserData, getTaskById);  // Get task by ID
router.put('/tasks/:id', authMiddleware, attachUserData, updateTask);  // Update task by ID
router.delete('/tasks/:id', authMiddleware, attachUserData, deleteTask);  // Delete task by ID
router.patch('/tasks/:id/status', authMiddleware, attachUserData, toggleTaskStatus);  // Toggle task status

module.exports = router;
