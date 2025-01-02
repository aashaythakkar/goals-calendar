const { Task, Category, User } = require('../models');
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

// Apply the authenticateUser middleware to task-related routes
exports.createTask = [authenticateUser, async (req, res) => {
  try {
    const { title, description, due_date, categoryId } = req.body;
    const task = await Task.create({
      title,
      description,
      due_date,
      categoryId,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
}];

exports.getAllTasks = [authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: [{ model: Category }]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error });
  }
}];

exports.getTask = [authenticateUser, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: Category }]
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task', error });
  }
}];

exports.updateTask = [authenticateUser, async (req, res) => {
  try {
    const { title, description, due_date, categoryId } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update({ title, description, due_date, categoryId });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
}];

exports.deleteTask = [authenticateUser, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
}];
