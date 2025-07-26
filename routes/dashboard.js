const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// جميع routes تتطلب authentication
router.use(authMiddleware);

// جلب بيانات لوحة التحكم الرئيسية
router.get('/', dashboardController.getDashboard);

// جلب الإحصائيات
router.get('/stats', dashboardController.getStats);

// جلب النشاطات الأخيرة
router.get('/recent-activity', dashboardController.getRecentActivity);

// جلب التقارير
router.get('/reports', dashboardController.getReports);

// تحديث إعدادات لوحة التحكم
router.put('/settings', dashboardController.updateDashboardSettings);

module.exports = router; 