const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.post('/contact', requestsController.newContactRequest);
router.post('/meeting', requestsController.newMeetingRequest);
router.post('/brief', requestsController.newBriefRequest);

module.exports = router; 