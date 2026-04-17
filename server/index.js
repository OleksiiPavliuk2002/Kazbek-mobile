require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const { initDb } = require('./config/db');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/menu',     require('./routes/menu'));
app.use('/api/bookings', require('./routes/bookings'));
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '🌿 Kazbek Mobile API is running', db: 'Sequelize + SQLite' });
});

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 Database: Sequelize + SQLite (kazbek.db)`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
