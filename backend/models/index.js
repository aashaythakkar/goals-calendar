const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Task = require('./Task');
const Goal = require('./Goal');

// Define associations
User.hasMany(Category, { foreignKey: 'user_id' });
Category.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Goal, { foreignKey: 'user_id' });
Goal.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Goal, { foreignKey: 'category_id' });
Goal.belongsTo(Category, { foreignKey: 'category_id' });

Goal.hasMany(Task, { foreignKey: 'goal_id' });
Task.belongsTo(Goal, { foreignKey: 'goal_id' });

Task.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Task, { foreignKey: 'category_id' });


module.exports = { User, Category, Task, Goal, sequelize };

