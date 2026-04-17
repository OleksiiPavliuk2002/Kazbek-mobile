const express = require('express');
const router  = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const where = { available: true };
    if (type) where.type = type;

    const items = await MenuItem.findAll({
      where,
      order: [['id', 'ASC']]
    });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/types', async (req, res) => {
  try {
    const types = await MenuItem.findAll({
      where: { available: true },
      attributes: [[MenuItem.sequelize.fn('DISTINCT', MenuItem.sequelize.col('type')), 'type']],
      raw: true
    });
    res.json({ success: true, data: types.map(t => t.type) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, type, portion, price, emoji = '🍽' } = req.body;
    if (!name || !type || !portion || price == null)
      return res.status(400).json({ success: false, message: 'Missing required fields' });

    const item = await MenuItem.create({
      name,
      type,
      portion,
      price,
      emoji
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, type, portion, price, emoji, available } = req.body;
    const [updatedRowsCount] = await MenuItem.update(
      { name, type, portion, price, emoji, available },
      { where: { id: req.params.id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const item = await MenuItem.findByPk(req.params.id);
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsCount = await MenuItem.destroy({
      where: { id: req.params.id }
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
