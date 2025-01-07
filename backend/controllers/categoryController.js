const { Category, User } = require('../models');

// 1. Create Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user_id = req.user.id; // From the decoded token

    const category = await Category.create({ name, description, user_id });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { user_id: req.user.id }, // Filter by logged-in user
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Get Single Category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Update Category
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 5. Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.status(204).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
