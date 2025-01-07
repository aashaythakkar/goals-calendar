const express = require('express');
const { authMiddleware, attachUserData } = require('../middleware/authMiddleware');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

// 1. Create Category
router.post('/categories/', authMiddleware, attachUserData, createCategory);

// 2. Get All Categories
router.get('/categories/', authMiddleware, attachUserData, getAllCategories);

// 3. Get Category by ID
router.get('/categories/:id', authMiddleware, attachUserData, getCategoryById);

// 4. Update Category
router.put('/categories/:id', authMiddleware, attachUserData, updateCategory);

// 5. Delete Category
router.delete('/categories/:id', authMiddleware, attachUserData, deleteCategory);

module.exports = router;
