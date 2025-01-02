const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost/goal_tracker');


// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: 'goal_tracker',
//   username: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
// //   port: 5432,
// });



module.exports = sequelize;
