const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.post('/schedule_service', controller.scheduleService);

router.post('/request_quote', controller.requestQuote);

module.exports = router;
