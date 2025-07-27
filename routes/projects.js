const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// ===== جلب إحصائيات المشاريع (يجب أن يكون قبل /:id) =====
router.get('/stats', projectsController.getProjectStats);

// ===== جلب جميع المشاريع =====
router.get('/', projectsController.getAllProjects);

// ===== جلب مشروع واحد =====
router.get('/:id', projectsController.getProjectById);

// ===== إنشاء مشروع جديد =====
router.post('/', projectsController.createProject);

// ===== تحديث مشروع =====
router.put('/:id', projectsController.updateProject);

// ===== حذف مشروع =====
router.delete('/:id', projectsController.deleteProject);

// ===== تحديث حالة المشروع =====
router.patch('/:id/status', projectsController.updateProjectStatus);

module.exports = router; 