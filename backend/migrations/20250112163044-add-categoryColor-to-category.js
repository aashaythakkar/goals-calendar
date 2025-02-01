'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Categories', 'categoryColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'blue'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Categories', 'categoryColor');
  },
};
