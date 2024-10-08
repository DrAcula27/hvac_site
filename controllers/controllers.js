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

exports.scheduleService = async (req, res) => {
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
};

exports.requestQuote = async (req, res) => {
  const { name, email, service, message } = req.body;

  let scheduleEmailText = `Dear ${name},
  We're honored that you're considering us for your ${service} needs!
  One of our knowledgeable reps will email you at this address within one business day to hear more about how we can assist you.
  For your records, your message to us is below:

  ${message}

  Sincerely,
  Cooler Than You HVAC Team`;

  try {
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
};
