require('dotenv').config();
const sequelize = require('./models');
const MenuItem = require('./models/MenuItem');

const MENU = [
  { name: 'Шашлик з баранини', type: 'Гаряче', portion: '300 г', price: 380, emoji: '🍖' },
  { name: 'Шашлик з яловичини', type: 'Гаряче', portion: '300 г', price: 340, emoji: '🥩' },
  { name: 'Шашлик з курки', type: 'Гаряче', portion: '300 г', price: 260, emoji: '🍗' },
  { name: 'Люля-кебаб', type: 'Гаряче', portion: '250 г', price: 290, emoji: '🌯' },
  { name: 'Хінкалі (5 шт.)', type: 'Гаряче', portion: '350 г', price: 210, emoji: '🥟' },
  { name: 'Долма', type: 'Гаряче', portion: '200 г', price: 195, emoji: '🫑' },
  { name: 'Чанахі', type: 'Гаряче', portion: '350 г', price: 265, emoji: '🍲' },
  { name: 'Пити', type: 'Суп', portion: '400 мл', price: 185, emoji: '🍵' },
  { name: 'Харчо', type: 'Суп', portion: '400 мл', price: 175, emoji: '🍜' },
  { name: 'Аджапсандалі', type: 'Закуска', portion: '200 г', price: 155, emoji: '🥗' },
  { name: 'Мацоні із зеленню', type: 'Закуска', portion: '200 г', price: 120, emoji: '🥛' },
  { name: 'Сир Сулугуні', type: 'Закуска', portion: '150 г', price: 140, emoji: '🧀' },
  { name: 'Пхали', type: 'Закуска', portion: '180 г', price: 135, emoji: '🥬' },
  { name: 'Лаваш', type: 'Хліб', portion: '1 шт.', price: 45, emoji: '🫓' },
  { name: 'Лобіані', type: 'Хліб', portion: '1 шт.', price: 95, emoji: '🫓' },
  { name: 'Хачапурі по-аджарськи', type: 'Хліб', portion: '1 шт.', price: 185, emoji: '🥐' },
  { name: 'Чурчхела', type: 'Десерт', portion: '1 шт.', price: 85, emoji: '🍬' },
  { name: 'Пахлава', type: 'Десерт', portion: '150 г', price: 110, emoji: '🍯' },
];

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    await MenuItem.bulkCreate(MENU);
    console.log(`✅ Seeded ${MENU.length} menu items into Sequelize + SQLite`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();