/**
 * Advanced Requests Routes
 * مسارات الميزات المتقدمة للطلبات
 */

const express = require('express');
const router = express.Router();
const advancedRequestsController = require('../controllers/advancedRequestsController');
const authMiddleware = require('../middleware/authMiddleware');

// جميع المسارات محمية (للداشبورد فقط)
router.use(authMiddleware);

// ===== مسارات الطلبات المتقدمة =====
router.get('/categorize', advancedRequestsController.categorizeRequests);
router.get('/search', advancedRequestsController.searchRequests);
router.get('/advanced-stats', advancedRequestsController.getAdvancedStats);
router.get('/export', advancedRequestsController.exportRequests);

module.exports = router; 