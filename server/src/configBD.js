const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cqf', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;