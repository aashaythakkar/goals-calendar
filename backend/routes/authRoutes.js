const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const newUser = await User.create({ name, username, email, password: hashedPassword });

    // Create JWT token
    // Create JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log("In login route")
  // console.log(email + " " + password);
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
