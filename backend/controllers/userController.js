const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // Check password validity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log("Password is : " + password);
    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);
    // console.log("here");
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    // Extract token from headers
    // console.log("here");
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No auth token found' });

    // console.log("here");
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("here again");
    // Fetch the user by ID
    const user = await User.findByPk(req.params.id);
    if (!user || user.id !== decoded.id) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUser, login, getUserById };
