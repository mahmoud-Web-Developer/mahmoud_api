const bcrypt = require('bcryptjs');
const { services, portfolio, news, contactRequests, meetings, briefs } = require('../data/dummyData');

// مصفوفة لتخزين المستخدمين (في نظام حقيقي ستكون قاعدة بيانات)
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@theflow.com',
    password: bcrypt.hashSync('admin123', 12),
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  }
];

// ===== إدارة المستخدمين =====

// جلب جميع المستخدمين
exports.getAllUsers = (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    let filteredUsers = users.filter(user => {
      const matchesSearch = !search || 
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !role || user.role === role;
      return matchesSearch && matchesRole;
    });
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        users: paginatedUsers.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredUsers.length / limit),
          totalUsers: filteredUsers.length,
          hasNext: endIndex < filteredUsers.length,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب المستخدمين'
    });
  }
};

// جلب مستخدم واحد
exports.getUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب بيانات المستخدم'
    });
  }
};

// إنشاء مستخدم جديد
exports.createUser = (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    
    // التحقق من البيانات المطلوبة
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة',
        errors: ['username', 'email', 'password']
      });
    }
    
    // التحقق من عدم تكرار اسم المستخدم أو البريد الإلكتروني
    const existingUser = users.find(u => 
      u.username === username || u.email === email
    );
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'اسم المستخدم أو البريد الإلكتروني موجود بالفعل',
        errors: ['username', 'email']
      });
    }
    
    // إنشاء المستخدم الجديد
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: bcrypt.hashSync(password, 12),
      role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء المستخدم بنجاح',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء المستخدم'
    });
  }
};

// تحديث مستخدم
exports.updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, isActive, password } = req.body;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    const user = users[userIndex];
    
    // تحديث البيانات
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (password) user.password = bcrypt.hashSync(password, 12);
    
    res.json({
      success: true,
      message: 'تم تحديث المستخدم بنجاح',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث المستخدم'
    });
  }
};

// حذف مستخدم
exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    // منع حذف المستخدم admin الرئيسي
    if (users[userIndex].role === 'admin' && users[userIndex].username === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'لا يمكن حذف المستخدم الرئيسي'
      });
    }
    
    users.splice(userIndex, 1);
    
    res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف المستخدم'
    });
  }
};

// ===== إدارة الطلبات =====

// جلب جميع طلبات التواصل
exports.getAllContactRequests = (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    
    let filteredRequests = contactRequests;
    if (status) {
      filteredRequests = contactRequests.filter(req => req.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        requests: paginatedRequests,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredRequests.length / limit),
          totalRequests: filteredRequests.length,
          hasNext: endIndex < filteredRequests.length,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get contact requests error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب طلبات التواصل'
    });
  }
};

// تحديث حالة طلب التواصل
exports.updateContactRequestStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const request = contactRequests.find(r => r.id === parseInt(id));
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    request.status = status;
    if (notes) request.adminNotes = notes;
    request.updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      data: request
    });
  } catch (error) {
    console.error('Update contact request error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الطلب'
    });
  }
};

// ===== إدارة المحتوى =====

// إدارة الخدمات
exports.getAllServices = (req, res) => {
  try {
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب الخدمات'
    });
  }
};

exports.createService = (req, res) => {
  try {
    const { name, description, isActive = true } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'اسم الخدمة والوصف مطلوبان'
      });
    }
    
    const newService = {
      id: services.length + 1,
      name,
      description,
      isActive,
      createdAt: new Date()
    };
    
    services.push(newService);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخدمة بنجاح',
      data: newService
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء الخدمة'
    });
  }
};

exports.updateService = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
    
    const service = services.find(s => s.id === parseInt(id));
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    if (name) service.name = name;
    if (description) service.description = description;
    if (typeof isActive === 'boolean') service.isActive = isActive;
    service.updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث الخدمة بنجاح',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في تحديث الخدمة'
    });
  }
};

exports.deleteService = (req, res) => {
  try {
    const { id } = req.params;
    const serviceIndex = services.findIndex(s => s.id === parseInt(id));
    
    if (serviceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    services.splice(serviceIndex, 1);
    
    res.json({
      success: true,
      message: 'تم حذف الخدمة بنجاح'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في حذف الخدمة'
    });
  }
};

// ===== إحصائيات النظام =====

exports.getSystemStats = (req, res) => {
  try {
    const stats = {
      users: {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        inactive: users.filter(u => !u.isActive).length,
        admins: users.filter(u => u.role === 'admin').length,
        regular: users.filter(u => u.role === 'user').length
      },
      content: {
        services: services.length,
        portfolio: portfolio.length,
        news: news.length
      },
      requests: {
        contact: contactRequests.length,
        meetings: meetings.length,
        briefs: briefs.length,
        total: contactRequests.length + meetings.length + briefs.length
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في جلب إحصائيات النظام'
    });
  }
}; 