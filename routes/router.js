const express = require('express');
const router = express.Router();
const Appointment = require('../model/appointmentModel');
const path = require('path');

router.post('/schedule_service', async (req, res) => {
  const { name, email, phone, date } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
    });
    await newAppointment.save();
    res.sendFile(path.join(__dirname, '../views/bookSuccess.html'));
  } catch (err) {
    console.error(err);
    res.sendFile(path.join(__dirname, '../views/bookError.html'));
  }
});

module.exports = router;
