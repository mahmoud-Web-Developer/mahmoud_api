/**
 * Requests Management Routes
 * مسارات إدارة الطلبات للربط بين النماذج والداشبورد
 */

const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');
const authMiddleware = require('../middleware/authMiddleware');

// ===== مسارات طلبات التواصل =====
// مسار عام (للويب سايت)
router.post('/contact', requestsController.createContactRequest);

// مسارات محمية (للداشبورد)
router.get('/contact', authMiddleware, requestsController.getAllContactRequests);
router.patch('/contact/:id/status', authMiddleware, requestsController.updateContactRequestStatus);

// ===== مسارات طلبات الاجتماعات =====
// مسار عام (للويب سايت)
router.post('/meeting', requestsController.createMeetingRequest);

// مسارات محمية (للداشبورد)
router.get('/meeting', authMiddleware, requestsController.getAllMeetingRequests);
router.patch('/meeting/:id/status', authMiddleware, requestsController.updateMeetingRequestStatus);

// ===== مسارات طلبات Briefs =====
// مسار عام (للويب سايت)
router.post('/brief', requestsController.createBriefRequest);

// مسارات محمية (للداشبورد)
router.get('/brief', authMiddleware, requestsController.getAllBriefRequests);
router.patch('/brief/:id/status', authMiddleware, requestsController.updateBriefRequestStatus);

// ===== مسارات الإحصائيات =====
// مسار محمي (للداشبورد)
router.get('/stats', authMiddleware, requestsController.getRequestsStats);

module.exports = router; 