const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  portion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  emoji: {
    type: DataTypes.STRING,
    defaultValue: '🍽',
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'menu_items',
  timestamps: false,
});

module.exports = MenuItem;