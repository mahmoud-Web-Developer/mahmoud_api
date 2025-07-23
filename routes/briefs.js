const express = require('express');
const router = express.Router();
const briefsController = require('../controllers/briefsController');

router.post('/', briefsController.submitBrief);
 
module.exports = router; 