const express = require('express');
const router  = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  try {
    const { name, phone, date, time, guests, comment = '' } = req.body;
    if (!name || !phone || !date || !time)
      return res.status(400).json({ success: false, message: 'Заповніть обов\'язкові поля' });

    const booking = await Booking.create({
      name,
      phone,
      date,
      time,
      guests: guests || 2,
      comment
    });

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Стол успішно заброньований! Ми зв\'яжемося з вами для підтвердження.'
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const [updatedRowsCount] = await Booking.update(
      { status },
      { where: { id: req.params.id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const booking = await Booking.findByPk(req.params.id);
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
