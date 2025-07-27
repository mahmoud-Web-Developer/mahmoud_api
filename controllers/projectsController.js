/**
 * Projects Controller
 * تحكم في إدارة المشاريع
 */

const { projects, clients, users } = require('../data/dummyData');

// ===== جلب جميع المشاريع =====
exports.getAllProjects = (req, res) => {
  try {
    const { page = 1, limit = 10, status, clientId, priority } = req.query;
    
    let filteredProjects = [...projects];
    
    // تصفية حسب الحالة
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status);
    }
    
    // تصفية حسب العميل
    if (clientId) {
      filteredProjects = filteredProjects.filter(p => p.clientId === parseInt(clientId));
    }
    
    // تصفية حسب الأولوية
    if (priority) {
      filteredProjects = filteredProjects.filter(p => p.priority === priority);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedProjects,
      count: paginatedProjects.length,
      total: filteredProjects.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredProjects.length / limit)
    });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المشاريع'
    });
  }
};

// ===== جلب مشروع واحد =====
exports.getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = projects.find(p => p.id === parseInt(id));
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المشروع'
    });
  }
};

// ===== إنشاء مشروع جديد =====
exports.createProject = (req, res) => {
  try {
    const {
      title,
      description,
      clientId,
      assignedTo,
      startDate,
      endDate,
      budget,
      priority = 'medium',
      status = 'pending'
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!title || !description || !clientId) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والوصف ومعرف العميل مطلوبة'
      });
    }
    
    // التحقق من وجود العميل
    const client = clients.find(c => c.id === parseInt(clientId));
    if (!client) {
      return res.status(400).json({
        success: false,
        message: 'العميل غير موجود'
      });
    }
    
    // إنشاء مشروع جديد
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      title: title.trim(),
      description: description.trim(),
      clientId: parseInt(clientId),
      clientName: client.name,
      assignedTo: assignedTo || null,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      budget: budget || 0,
      priority: priority,
      status: status,
      progress: 0,
      revenue: 0,
      completionTime: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    projects.push(newProject);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء المشروع بنجاح',
      data: newProject
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء المشروع'
    });
  }
};

// ===== تحديث مشروع =====
exports.updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date()
    };
    
    projects[projectIndex] = updatedProject;
    
    res.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: updatedProject
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث المشروع'
    });
  }
};

// ===== حذف مشروع =====
exports.deleteProject = (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    const deletedProject = projects.splice(projectIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف المشروع بنجاح',
      data: deletedProject
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف المشروع'
    });
  }
};

// ===== تحديث حالة المشروع =====
exports.updateProjectStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status, progress } = req.body;
    
    const project = projects.find(p => p.id === parseInt(id));
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    project.status = status || project.status;
    project.progress = progress !== undefined ? progress : project.progress;
    project.updatedAt = new Date();
    
    // إذا تم إكمال المشروع
    if (status === 'completed') {
      project.completionTime = new Date();
    }
    
    res.json({
      success: true,
      message: 'تم تحديث حالة المشروع بنجاح',
      data: project
    });
  } catch (error) {
    console.error('Update project status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث حالة المشروع'
    });
  }
};

// ===== إحصائيات المشاريع =====
exports.getProjectStats = (req, res) => {
  try {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const pendingProjects = projects.filter(p => p.status === 'pending').length;
    const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
    
    const totalRevenue = projects
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.revenue || 0), 0);
    
    const avgCompletionTime = completedProjects > 0 ? 
      projects
        .filter(p => p.status === 'completed' && p.completionTime)
        .reduce((sum, p) => {
          const start = new Date(p.startDate);
          const end = new Date(p.completionTime);
          return sum + (end - start) / (1000 * 60 * 60 * 24); // بالأيام
        }, 0) / completedProjects : 0;
    
    const stats = {
      total: totalProjects,
      completed: completedProjects,
      pending: pendingProjects,
      inProgress: inProgressProjects,
      totalRevenue: totalRevenue,
      avgCompletionTime: avgCompletionTime.toFixed(1),
      completionRate: totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(1) : 0
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إحصائيات المشاريع'
    });
  }
}; 