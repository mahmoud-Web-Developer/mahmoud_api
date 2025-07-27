/**
 * Dashboard Controller
 * تحكم في لوحة التحكم الرئيسية
 */

const { 
  users, 
  clients, 
  projects, 
  requests, 
  meetings, 
  briefs,
  services,
  portfolio,
  news,
  contactRequests
} = require('../data/dummyData');

// ===== إحصائيات عامة =====
exports.getDashboardStats = (req, res) => {
  try {
    // حساب الإحصائيات من البيانات الفعلية
    const totalClients = clients.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalProjects = projects.length;
    const avgCompletionTime = totalProjects > 0 ? 
      projects.reduce((sum, p) => sum + (p.completionTime || 0), 0) / totalProjects : 0;
    
    // حساب الإيرادات (من المشاريع المكتملة)
    const totalRevenue = projects
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.revenue || 0), 0);

    // حساب النسبة المئوية للتغيير (مقارنة بالشهر السابق)
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const currentMonthProjects = projects.filter(p => {
      const projectDate = new Date(p.createdAt);
      return projectDate.getMonth() === currentMonth;
    }).length;
    
    const lastMonthProjects = projects.filter(p => {
      const projectDate = new Date(p.createdAt);
      return projectDate.getMonth() === lastMonth;
    }).length;

    const projectChange = lastMonthProjects > 0 ? 
      ((currentMonthProjects - lastMonthProjects) / lastMonthProjects * 100).toFixed(1) : 0;

    const stats = {
      clients: {
        count: totalClients,
        change: "+12%", // يمكن حسابها من البيانات الفعلية
        icon: "users"
      },
      projectsCompleted: {
        count: completedProjects,
        change: `${projectChange > 0 ? '+' : ''}${projectChange}%`,
        icon: "check-circle"
      },
      avgCompletion: {
        count: avgCompletionTime.toFixed(1),
        change: "-1.4%", // يمكن حسابها من البيانات الفعلية
        icon: "clock"
      },
      revenue: {
        count: `$${totalRevenue.toLocaleString()}`,
        change: "+5.4%", // يمكن حسابها من البيانات الفعلية
        icon: "dollar-sign"
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إحصائيات لوحة التحكم'
    });
  }
};

// ===== المشاريع الحالية =====
exports.getCurrentProjects = (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let filteredProjects = [...projects];
    
    // تصفية حسب الحالة
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status);
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
    console.error('Get current projects error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المشاريع الحالية'
    });
  }
};

// ===== إدارة المستخدمين =====
exports.getAllUsers = (req, res) => {
  try {
    const { page = 1, limit = 10, role, status } = req.query;
    
    let filteredUsers = [...users];
    
    // تصفية حسب الدور
    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role);
    }
    
    // تصفية حسب الحالة
    if (status) {
      filteredUsers = filteredUsers.filter(u => u.status === status);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedUsers,
      count: paginatedUsers.length,
      total: filteredUsers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredUsers.length / limit)
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المستخدمين'
    });
  }
};

exports.createUser = (req, res) => {
  try {
    const { name, email, role = 'viewer', password } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'الاسم والبريد الإلكتروني وكلمة المرور مطلوبة'
      });
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }
    
    // التحقق من عدم وجود البريد الإلكتروني مسبقاً
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      });
    }
    
    // إنشاء مستخدم جديد
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      role: role,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء المستخدم بنجاح',
      data: newUser
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء المستخدم'
    });
  }
};

exports.updateUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, role, status } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    // تحديث البيانات
    if (name) users[userIndex].name = name.trim();
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني غير صحيح'
        });
      }
      users[userIndex].email = email.trim();
    }
    if (role) users[userIndex].role = role;
    if (status) users[userIndex].status = status;
    
    users[userIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث المستخدم بنجاح',
      data: users[userIndex]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث المستخدم'
    });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    // منع حذف المستخدم admin
    if (users[userIndex].role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن حذف المستخدم admin'
      });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح',
      data: deletedUser
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف المستخدم'
    });
  }
};

// ===== إدارة المشاريع =====
exports.createProject = (req, res) => {
  try {
    const { 
      name, 
      clientId, 
      description, 
      dueDate, 
      assignedTo,
      budget,
      startDate = new Date()
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!name || !clientId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'اسم المشروع والعميل وتاريخ الاستحقاق مطلوبة'
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
    
    // التحقق من صحة التاريخ
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'تاريخ الاستحقاق غير صحيح'
      });
    }
    
    // إنشاء مشروع جديد
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      name: name.trim(),
      clientId: parseInt(clientId),
      clientName: client.name,
      description: description ? description.trim() : null,
      dueDate: dueDateObj,
      assignedTo: assignedTo ? assignedTo.trim() : null,
      budget: budget ? parseFloat(budget) : 0,
      startDate: new Date(startDate),
      status: 'in-progress',
      progress: 0,
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

exports.updateProject = (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const { 
      name, 
      clientId, 
      description, 
      dueDate, 
      assignedTo,
      budget,
      status,
      progress
    } = req.body;
    
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    // تحديث البيانات
    if (name) projects[projectIndex].name = name.trim();
    if (clientId) {
      const client = clients.find(c => c.id === parseInt(clientId));
      if (client) {
        projects[projectIndex].clientId = parseInt(clientId);
        projects[projectIndex].clientName = client.name;
      }
    }
    if (description !== undefined) projects[projectIndex].description = description ? description.trim() : null;
    if (dueDate) {
      const dueDateObj = new Date(dueDate);
      if (!isNaN(dueDateObj.getTime())) {
        projects[projectIndex].dueDate = dueDateObj;
      }
    }
    if (assignedTo !== undefined) projects[projectIndex].assignedTo = assignedTo ? assignedTo.trim() : null;
    if (budget !== undefined) projects[projectIndex].budget = budget ? parseFloat(budget) : 0;
    if (status) projects[projectIndex].status = status;
    if (progress !== undefined) projects[projectIndex].progress = Math.min(100, Math.max(0, parseInt(progress)));
    
    projects[projectIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: projects[projectIndex]
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث المشروع'
    });
  }
};

exports.deleteProject = (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
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

// ===== الطلبات الجديدة =====
exports.createRequest = (req, res) => {
  try {
    const { 
      type, // 'contact', 'meeting', 'brief'
      name,
      email,
      phone,
      subject,
      description,
      preferredDate,
      budget,
      requirements
    } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!type || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'نوع الطلب والاسم والبريد الإلكتروني مطلوبة'
      });
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني غير صحيح'
      });
    }
    
    // إنشاء طلب جديد
    const newRequest = {
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
      type: type,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      subject: subject ? subject.trim() : null,
      description: description ? description.trim() : null,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      budget: budget ? parseFloat(budget) : null,
      requirements: requirements ? requirements.trim() : null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    requests.push(newRequest);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الطلب بنجاح',
      data: newRequest
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء الطلب'
    });
  }
};

exports.getAllRequests = (req, res) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;
    
    let filteredRequests = [...requests];
    
    // تصفية حسب النوع
    if (type) {
      filteredRequests = filteredRequests.filter(r => r.type === type);
    }
    
    // تصفية حسب الحالة
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    // ترتيب حسب تاريخ الإنشاء
    filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedRequests,
      count: paginatedRequests.length,
      total: filteredRequests.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredRequests.length / limit)
    });
  } catch (error) {
    console.error('Get all requests error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الطلبات'
    });
  }
};

// ===== النشاطات الأخيرة =====
exports.getRecentActivity = (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // جمع جميع النشاطات من مصادر مختلفة
    const allActivities = [];
    
    // نشاطات المشاريع
    projects.forEach(project => {
      allActivities.push({
        id: `project-${project.id}`,
        type: 'project',
        action: project.status === 'completed' ? 'completed' : 'updated',
        description: `Project "${project.name}" ${project.status === 'completed' ? 'completed' : 'updated'}`,
        user: project.assignedTo || 'System',
        timestamp: project.updatedAt,
        icon: 'briefcase'
      });
    });
    
    // نشاطات الطلبات
    requests.forEach(request => {
      allActivities.push({
        id: `request-${request.id}`,
        type: 'request',
        action: 'created',
        description: `New ${request.type} request from ${request.name}`,
        user: request.name,
        timestamp: request.createdAt,
        icon: 'file-text'
      });
    });
    
    // نشاطات المستخدمين
    users.forEach(user => {
      allActivities.push({
        id: `user-${user.id}`,
        type: 'user',
        action: 'created',
        description: `User ${user.name} joined the system`,
        user: user.name,
        timestamp: user.createdAt,
        icon: 'user'
      });
    });
    
    // ترتيب حسب التاريخ
    allActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // تطبيق الحد
    const limitedActivities = allActivities.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: limitedActivities,
      count: limitedActivities.length
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب النشاطات الأخيرة'
    });
  }
};

// ===== إعدادات لوحة التحكم =====
exports.getDashboardSettings = (req, res) => {
  try {
    const settings = {
      account: {
        fullName: req.user ? req.user.name : '',
        email: req.user ? req.user.email : '',
        password: '********'
      },
      preferences: {
        language: 'Arabic',
        theme: 'Dark'
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: false
      }
    };
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get dashboard settings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إعدادات لوحة التحكم'
    });
  }
};

exports.updateDashboardSettings = (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password,
      language,
      theme,
      emailNotifications,
      pushNotifications
    } = req.body;
    
    // هنا يمكن تحديث إعدادات المستخدم
    // في الوقت الحالي نعيد البيانات كما هي
    
    const updatedSettings = {
      account: {
        fullName: fullName || '',
        email: email || '',
        password: '********'
      },
      preferences: {
        language: language || 'Arabic',
        theme: theme || 'Dark'
      },
      notifications: {
        emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
        pushNotifications: pushNotifications !== undefined ? pushNotifications : false
      }
    };
    
    res.json({
      success: true,
      message: 'تم حفظ الإعدادات بنجاح',
      data: updatedSettings
    });
  } catch (error) {
    console.error('Update dashboard settings error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث إعدادات لوحة التحكم'
    });
  }
}; 