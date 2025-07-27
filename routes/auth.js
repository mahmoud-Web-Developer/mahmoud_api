const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes (المسارات العامة)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

// Protected routes (المسارات المحمية)
router.post('/logout', authMiddleware, authController.logout);
router.get('/profile', authMiddleware, authController.getProfile);

// Admin routes (مسارات المدير)
router.get('/users', authMiddleware, authController.getAllUsers);
router.get('/users/search', authMiddleware, authController.searchUsers);
router.get('/users/:id', authMiddleware, authController.getUserById);
router.patch('/users/:id/status', authMiddleware, authController.updateUserStatus);
router.delete('/users/:id', authMiddleware, authController.deleteUser);

module.exports = router; 