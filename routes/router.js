const express = require('express');
const router = express.Router();
const Appointment = require('../model/appointmentModel');
const path = require('path');
require('dotenv').config();

const { MailtrapTransport } = require('mailtrap');
const Nodemailer = require('nodemailer');

const TOKEN = process.env.MAIL_TOKEN;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: 'hello@demomailtrap.com',
  name: 'Cooler Than You HVAC',
};

router.post('/schedule_service', async (req, res) => {
  const { name, email, phone, date } = req.body;

  let scheduleEmailText = `We've received your request to schedule an appointment on ${date}.
  We'll give you a call at ${phone} to find a time that works for you.
  Sincerely,
  Cooler Than You HVAC Team`;

  try {
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
    });
    await newAppointment.save();

    transport.sendMail({
      from: sender,
      to: email,
      subject: 'HVAC Appointment Request',
      text: scheduleEmailText,
      category: 'Schedule Service',
    });

    res.sendFile(path.join(__dirname, '../views/bookSuccess.html'));
  } catch (err) {
    console.error(err);
    res.sendFile(path.join(__dirname, '../views/bookError.html'));
  }
});

module.exports = router;
