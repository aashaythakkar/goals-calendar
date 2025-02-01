const { Task, Category, Goal, User } = require('../models');

// 1. Create Task
const createTask = async (req, res) => {
  try {
    const { title, date, category_id, goal_id, priority, status } = req.body;
    const user_id = req.user.id; // From the decoded token

    const task = await Task.create({ title, date, category_id, goal_id, priority, status, user_id });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id }, // Filter by logged-in user
      include: [Category, Goal], // Include related Category and Goal data
    });
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};

// 3. Get Single Task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [Category, Goal],
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Update Task
const updateTask = async (req, res) => {
  try {
    const { title, date, category_id, goal_id, priority, status } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.date = date || task.date;
    task.category_id = category_id || task.category_id;
    task.goal_id = goal_id || task.goal_id;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 5. Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.status(204).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 6. Mark Task as Complete/Incomplete
const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = task.status === 'Complete' ? 'Incomplete' : 'Complete';
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};
