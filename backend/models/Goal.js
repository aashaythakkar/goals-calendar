const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Goal = sequelize.define('Goal', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT, // Optional field for more details
        allowNull: true,
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    enddate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id',
        },
        allowNull: true, // Optional association with a category
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

module.exports = Goal;