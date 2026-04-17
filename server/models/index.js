const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const DB_PATH = process.env.DB_PATH || path.resolve('./kazbek.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH,
  logging: false, 
});

module.exports = sequelize;