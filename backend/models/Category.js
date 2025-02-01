const sequelize = require('../config/database'); 
const { DataTypes } = require('sequelize');
const User = require('./User');  // Adjust if needed

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
  categoryColor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
});

Category.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Category;
