const express = require('express');
const { Goal } = require('../models/Goal');

const router = express.Router();

// GET all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.status(200).json(goals);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET a specific goal by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (err) {
    console.error('Error fetching goal:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route for creating a new goal (existing code)
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const goal = await Goal.create({ title, description, dueDate });
    res.status(201).json(goal);
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route for updating a goal
router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const { title, description, dueDate } = req.body;
  
    try {
      const goal = await Goal.findByPk(id);
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      goal.title = title || goal.title;
      goal.description = description || goal.description;
      goal.dueDate = dueDate || goal.dueDate;
  
      await goal.save();
      res.status(200).json(goal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // DELETE route for deleting a goal
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const goal = await Goal.findByPk(id);
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      await goal.destroy();
      res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
