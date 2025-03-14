const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL);


// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: 'goal_tracker',
//   username: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
// //   port: 5432,
// });



module.exports = sequelize;
