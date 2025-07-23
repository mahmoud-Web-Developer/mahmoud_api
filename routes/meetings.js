const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.get('/slots', meetingsController.getAvailableSlots);
router.post('/', meetingsController.scheduleMeeting);

module.exports = router; 