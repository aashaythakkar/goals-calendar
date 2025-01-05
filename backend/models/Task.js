const sequelize = require('../config/database'); // Adjust the path if necessary
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
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      allowNull: false,
    },
  });
  
// Task.belongsTo(User, { foreignKey: 'user_id' });
// Task.belongsTo(Category, { foreignKey: 'category_id' });
// Task.belongsTo(Goal, { foreignKey: 'goal_id' });

module.exports = Task;