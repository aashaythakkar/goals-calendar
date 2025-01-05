const sequelize = require('../config/database'); // Adjust the path if necessary
const { DataTypes } = require('sequelize');


const Goal = sequelize.define('Goal', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
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
  
//   Goal.belongsTo(User, { foreignKey: 'user_id' });
//   Goal.belongsTo(Category, { foreignKey: 'category_id' });
//   Goal.hasMany(Task, { foreignKey: 'goal_id' });
  
  module.exports = Goal;