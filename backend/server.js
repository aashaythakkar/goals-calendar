const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/routes');
const app = express();

app.use(express.json());

// Mount routes
app.use('/api', routes); // Mount the auth routes

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

sequelize.sync().then(() => {
  console.log('Database connected and models synced!');
});

app.listen(5000, () => console.log('Server is running on port 5000'));
