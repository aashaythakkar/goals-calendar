const { Goal, Category, Task, User } = require('../models');

// 1. Create Goal
const createGoal = async (req, res) => {
  try {
    const { title, startdate, enddate, category_id } = req.body;
    const user_id = req.user.id; // From the decoded token

    const goal = await Goal.create({ title, startdate, enddate, category_id, user_id });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. Get All Goals
const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { user_id: req.user.id }, // Filter by logged-in user
      include: [Category], // Include related Category data
    });
    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Get Goal by ID
const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [Category],
    });
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Update Goal
const updateGoal = async (req, res) => {
  try {
    const { title, startdate, enddate, category_id } = req.body;
    const goal = await Goal.findOne({ where: { id: req.params.id, user_id: req.user.id } });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    goal.title = title || goal.title;
    goal.startDate = startdate || goal.startdate;
    goal.endDate = enddate || goal.enddate;
    goal.category_id = category_id || goal.category_id;

    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 5. Delete Goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ where: { id: req.params.id, user_id: req.user.id } });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    await goal.destroy();
    res.status(204).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};
