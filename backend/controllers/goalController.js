const { Goal, Task, Category, User } = require('../models');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT and extract user info
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Apply the authenticateUser middleware to goal-related routes
exports.createGoal = [authenticateUser, async (req, res) => {
  try {
    const { title, description, start_date, end_date, categoryId } = req.body;
    const goal = await Goal.create({
      title,
      description,
      start_date,
      end_date,
      categoryId,
      userId: req.user.id
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error });
  }
}];

exports.getAllGoals = [authenticateUser, async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { userId: req.user.id },
      include: [{ model: Category }, { model: Task }]
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goals', error });
  }
}];

exports.getGoal = [authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: Category }, { model: Task }]
    });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goal', error });
  }
}];

exports.updateGoal = [authenticateUser, async (req, res) => {
  try {
    const { title, description, start_date, end_date, categoryId } = req.body;
    const goal = await Goal.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    await goal.update({ title, description, start_date, end_date, categoryId });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error });
  }
}];

exports.deleteGoal = [authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    await goal.destroy();
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error });
  }
}];
