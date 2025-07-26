const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// جميع routes تتطلب authentication
router.use(authMiddleware);

// ===== إدارة المستخدمين =====
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUser);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// ===== إدارة الطلبات =====
router.get('/contact-requests', adminController.getAllContactRequests);
router.put('/contact-requests/:id/status', adminController.updateContactRequestStatus);

// ===== إدارة المحتوى =====
router.get('/services', adminController.getAllServices);
router.post('/services', adminController.createService);
router.put('/services/:id', adminController.updateService);
router.delete('/services/:id', adminController.deleteService);

// ===== إحصائيات النظام =====
router.get('/system-stats', adminController.getSystemStats);

module.exports = router; 