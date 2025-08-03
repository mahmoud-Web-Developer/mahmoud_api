const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.post('/contact', requestsController.createContactRequest);
router.post('/meeting', requestsController.createMeetingRequest);
router.post('/brief', requestsController.createBriefRequest);

module.exports = router; 