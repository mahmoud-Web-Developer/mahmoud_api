/**
 * Advanced Notifications Routes
 * مسارات الميزات المتقدمة للإشعارات
 */

const express = require('express');
const router = express.Router();
const advancedNotificationsController = require('../controllers/advancedNotificationsController');
const authMiddleware = require('../middleware/authMiddleware');

// جميع المسارات محمية (للداشبورد فقط)
router.use(authMiddleware);

// ===== مسارات الإشعارات المتقدمة =====
router.get('/categorize', advancedNotificationsController.categorizeNotifications);
router.get('/search', advancedNotificationsController.searchNotifications);
router.post('/bulk-update', advancedNotificationsController.bulkUpdateNotifications);
router.get('/advanced-stats', advancedNotificationsController.getAdvancedNotificationStats);
router.get('/settings', advancedNotificationsController.getNotificationSettings);
router.put('/settings', advancedNotificationsController.updateNotificationSettings);
router.delete('/cleanup', advancedNotificationsController.cleanupOldNotifications);

module.exports = router; 