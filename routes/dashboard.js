/**
 * Dashboard Routes
 * مسارات لوحة التحكم
 */

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// ===== إحصائيات لوحة التحكم =====
router.get('/stats', authMiddleware, dashboardController.getDashboardStats);

// ===== المشاريع الحالية =====
router.get('/projects', authMiddleware, dashboardController.getCurrentProjects);
router.post('/projects', authMiddleware, dashboardController.createProject);
router.put('/projects/:id', authMiddleware, dashboardController.updateProject);
router.delete('/projects/:id', authMiddleware, dashboardController.deleteProject);

// ===== إدارة المستخدمين =====
router.get('/users', authMiddleware, dashboardController.getAllUsers);
router.post('/users', authMiddleware, dashboardController.createUser);
router.put('/users/:id', authMiddleware, dashboardController.updateUser);
router.delete('/users/:id', authMiddleware, dashboardController.deleteUser);

// ===== الطلبات الجديدة =====
router.get('/requests', authMiddleware, dashboardController.getAllRequests);
router.post('/requests', dashboardController.createRequest); // عام - لا يحتاج auth

// ===== النشاطات الأخيرة =====
router.get('/activity', authMiddleware, dashboardController.getRecentActivity);

// ===== إعدادات لوحة التحكم =====
router.get('/settings', authMiddleware, dashboardController.getDashboardSettings);
router.put('/settings', authMiddleware, dashboardController.updateDashboardSettings);

module.exports = router; 