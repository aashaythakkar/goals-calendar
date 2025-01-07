const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id',
    },
    allowNull: false,
  },
  goal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Goals',
      key: 'id',
    },
    allowNull: true, // Task can exist without a goal initially
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Medium', // Default priority
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Incomplete', // Default status is Incomplete
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Task;
