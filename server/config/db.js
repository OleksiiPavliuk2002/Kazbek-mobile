const sequelize = require('../models');

async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    await sequelize.sync({ force: false }); 
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = { sequelize, initDb };
