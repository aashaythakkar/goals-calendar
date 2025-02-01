const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/routes');
const app = express();
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api', routes); // Mount the auth routes
app.use('/auth', authRoutes);
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

sequelize.sync().then(() => {
  console.log('Database connected and models synced!');
});

app.listen(5000, () => console.log('Server is running on port 5000'));
