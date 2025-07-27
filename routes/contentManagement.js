/**
 * Content Management Routes
 * مسارات إدارة المحتوى للربط بين الويب سايت والداشبورد
 */

const express = require('express');
const router = express.Router();
const contentManagementController = require('../controllers/contentManagementController');
const authMiddleware = require('../middleware/authMiddleware');

// ===== مسارات الخدمات =====
// مسارات عامة (للويب سايت)
router.get('/services', contentManagementController.getAllServices);

// مسارات محمية (للداشبورد)
router.post('/services', authMiddleware, contentManagementController.createService);
router.put('/services/:id', authMiddleware, contentManagementController.updateService);
router.delete('/services/:id', authMiddleware, contentManagementController.deleteService);

// ===== مسارات المشاريع (Portfolio) =====
// مسارات عامة (للويب سايت)
router.get('/portfolio', contentManagementController.getAllPortfolio);

// مسارات محمية (للداشبورد)
router.post('/portfolio', authMiddleware, contentManagementController.createPortfolio);
router.put('/portfolio/:id', authMiddleware, contentManagementController.updatePortfolio);
router.delete('/portfolio/:id', authMiddleware, contentManagementController.deletePortfolio);

// ===== مسارات الأخبار =====
// مسارات عامة (للويب سايت)
router.get('/news', contentManagementController.getAllNews);

// مسارات محمية (للداشبورد)
router.post('/news', authMiddleware, contentManagementController.createNews);
router.put('/news/:id', authMiddleware, contentManagementController.updateNews);
router.delete('/news/:id', authMiddleware, contentManagementController.deleteNews);

module.exports = router; 