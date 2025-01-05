const sequelize = require('../config/database'); // Adjust the path if necessary
const { DataTypes } = require('sequelize');
const { User } = require('./index');
const { Task } = require('./index');
const { Goal } = require('./index');

const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
  });
  
// Category.belongsTo(User, { foreignKey: 'user_id' });
// Category.hasMany(Task, { foreignKey: 'category_id' });
// Category.hasMany(Goal, { foreignKey: 'category_id' });

module.exports = Category;