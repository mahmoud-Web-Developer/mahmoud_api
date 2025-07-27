const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

// ===== مسارات الخدمات =====

// Public routes (المسارات العامة)
router.get('/services', contentController.getAllServices);

// Protected routes (المسارات المحمية)
router.post('/services', authMiddleware, contentController.createService);
router.put('/services/:id', authMiddleware, contentController.updateService);
router.delete('/services/:id', authMiddleware, contentController.deleteService);

// ===== مسارات المشاريع =====

// Public routes (المسارات العامة)
router.get('/portfolio', contentController.getAllPortfolio);

// Protected routes (المسارات المحمية)
router.post('/portfolio', authMiddleware, contentController.createPortfolio);
router.put('/portfolio/:id', authMiddleware, contentController.updatePortfolio);
router.delete('/portfolio/:id', authMiddleware, contentController.deletePortfolio);

// ===== مسارات الأخبار =====

// Public routes (المسارات العامة)
router.get('/news', contentController.getAllNews);

// Protected routes (المسارات المحمية)
router.post('/news', authMiddleware, contentController.createNews);
router.put('/news/:id', authMiddleware, contentController.updateNews);
router.delete('/news/:id', authMiddleware, contentController.deleteNews);

module.exports = router; 