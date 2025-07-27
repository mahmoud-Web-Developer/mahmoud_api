/**
 * Notifications Routes
 * مسارات نظام الإشعارات
 */

const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const authMiddleware = require('../middleware/authMiddleware');

// جميع المسارات محمية (للداشبورد فقط)
router.use(authMiddleware);

// ===== مسارات الإشعارات =====
router.get('/', notificationsController.getAllNotifications);
router.post('/', notificationsController.createNotification);
router.patch('/:id/status', notificationsController.updateNotificationStatus);
router.delete('/:id', notificationsController.deleteNotification);
router.get('/stats', notificationsController.getNotificationsStats);

module.exports = router; 