const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  loadUsers, 
  addUser, 
  findUser, 
  updateLastLogin, 
  getAllUsers,
  initializeUsersFile 
} = require('../utils/userStorage');

// تهيئة ملف المستخدمين عند بدء التطبيق
initializeUsersFile();

// دالة للتحقق من صحة البيانات المدخلة
const validateUserData = (username, password) => {
  const errors = [];
  
  if (!username || username.trim().length < 3) {
    errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  }
  
  if (!password || password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  
  // التحقق من أن اسم المستخدم يحتوي على أحرف صحيحة فقط
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (username && !usernameRegex.test(username)) {
    errors.push('اسم المستخدم يمكن أن يحتوي على أحرف إنجليزية وأرقام وعلامة _ فقط');
  }
  
  return errors;
};

// دالة تسجيل مستخدم جديد
exports.signup = (req, res) => {
  try {
    // دعم كل من الحروف الكبيرة والصغيرة
    const username = req.body.username || req.body.Username;
    const password = req.body.password || req.body.Password;
    const email = req.body.email || req.body.Email;
    
    // التحقق من وجود البيانات المطلوبة
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'اسم المستخدم وكلمة المرور مطلوبان',
        errors: ['username', 'password']
      });
    }
    
    // التحقق من صحة البيانات
    const validationErrors = validateUserData(username, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validationErrors
      });
    }
    
    // التحقق من عدم تكرار اسم المستخدم
    const existingUser = findUser(username.trim());
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'اسم المستخدم موجود بالفعل',
        errors: ['username']
      });
    }
    
    // تشفير كلمة المرور وإضافة المستخدم
    const hashedPassword = bcrypt.hashSync(password, 12);
    const userData = {
      username: username.trim(),
      password: hashedPassword,
      email: email || null,
      role: 'user'
    };
    
    const result = addUser(userData);
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }
    
    const user = result.user;
    
    res.status(201).json({ 
      success: true,
      message: 'تم تسجيل المستخدم بنجاح',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تسجيل الدخول وإرجاع توكن JWT
exports.login = (req, res) => {
  try {
    // دعم كل من الحروف الكبيرة والصغيرة
    const username = req.body.username || req.body.Username;
    const password = req.body.password || req.body.Password;
    
    // التحقق من وجود البيانات المطلوبة
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'اسم المستخدم وكلمة المرور مطلوبان',
        errors: ['username', 'password']
      });
    }
    
    // البحث عن المستخدم
    const user = findUser(username.trim());
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        errors: ['credentials']
      });
    }
    
    // التحقق من أن الحساب نشط
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        message: 'الحساب معطل، يرجى التواصل مع الإدارة',
        errors: ['account']
      });
    }
    
    // مقارنة كلمة المرور المدخلة مع المشفرة
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        errors: ['credentials']
      });
    }
    
    // تحديث آخر تسجيل دخول
    updateLastLogin(user.id);
    
    // إنشاء توكن JWT صالح لمدة ساعة
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        email: user.email,
        role: user.role
      }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '1h' }
    );
    
    // إنشاء refresh token صالح لمدة 7 أيام
    const refreshToken = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        type: 'refresh'
      }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تحديث التوكن
exports.refreshToken = (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ 
        success: false,
        message: 'Refresh token مطلوب'
      });
    }
    
    // التحقق من صحة refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ 
        success: false,
        message: 'Token غير صحيح'
      });
    }
    
    // البحث عن المستخدم
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    // إنشاء توكن جديد
    const newToken = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        email: user.email,
        role: user.role
      }, 
      process.env.JWT_SECRET || 'your-secret-key', 
      { expiresIn: '1h' }
    );
    
    res.json({ 
      success: true,
      message: 'تم تحديث التوكن بنجاح',
      data: {
        token: newToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Token غير صحيح أو منتهي الصلاحية'
    });
  }
};

// دالة تسجيل الخروج
exports.logout = (req, res) => {
  try {
    // في نظام حقيقي، سنقوم بإضافة التوكن إلى blacklist
    res.json({ 
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة الحصول على معلومات المستخدم الحالي
exports.getProfile = (req, res) => {
  try {
    const users = loadUsers();
    const user = users.find(u => u.id === req.user.id);
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
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة الحصول على جميع المستخدمين (للـ admin فقط)
exports.getAllUsers = (req, res) => {
  try {
    // التحقق من أن المستخدم admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الصفحة'
      });
    }
    
    const users = getAllUsers();
    const usersList = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    }));
    
    res.json({
      success: true,
      data: usersList,
      count: usersList.length
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة البحث عن المستخدمين (للـ admin فقط)
exports.searchUsers = (req, res) => {
  try {
    // التحقق من أن المستخدم admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الصفحة'
      });
    }
    
    const { query, role, isActive, page = 1, limit = 10 } = req.query;
    const users = getAllUsers();
    
    let filteredUsers = users;
    
    // البحث بالكلمة المفتاحية
    if (query) {
      const searchQuery = query.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.username.toLowerCase().includes(searchQuery) ||
        (user.email && user.email.toLowerCase().includes(searchQuery))
      );
    }
    
    // تصفية حسب الدور
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    // تصفية حسب الحالة
    if (isActive !== undefined) {
      const activeStatus = isActive === 'true';
      filteredUsers = filteredUsers.filter(user => user.isActive === activeStatus);
    }
    
    // ترتيب النتائج
    filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // تطبيق الصفحات
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    // تنسيق البيانات للإرسال
    const usersList = paginatedUsers.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    }));
    
    res.json({
      success: true,
      data: usersList,
      count: usersList.length,
      total: filteredUsers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filteredUsers.length / limit)
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة البحث عن مستخدم واحد بالـ ID
exports.getUserById = (req, res) => {
  try {
    // التحقق من أن المستخدم admin أو يبحث عن نفسه
    if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الصفحة'
      });
    }
    
    const userId = parseInt(req.params.id);
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    
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
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة تحديث حالة المستخدم (للـ admin فقط)
exports.updateUserStatus = (req, res) => {
  try {
    // التحقق من أن المستخدم admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الصفحة'
      });
    }
    
    const userId = parseInt(req.params.id);
    const { isActive } = req.body;
    
    if (isActive === undefined) {
      return res.status(400).json({
        success: false,
        message: 'حالة المستخدم مطلوبة'
      });
    }
    
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    // منع تعطيل حساب admin
    if (user.role === 'admin' && !isActive) {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن تعطيل حساب المدير'
      });
    }
    
    // تحديث حالة المستخدم
    const { updateUserStatus } = require('../utils/userStorage');
    const result = updateUserStatus(userId, isActive);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }
    
    res.json({
      success: true,
      message: `تم ${isActive ? 'تفعيل' : 'تعطيل'} المستخدم بنجاح`,
      data: {
        id: user.id,
        username: user.username,
        isActive: isActive
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// دالة حذف المستخدم (للـ admin فقط)
exports.deleteUser = (req, res) => {
  try {
    // التحقق من أن المستخدم admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه الصفحة'
      });
    }
    
    const userId = parseInt(req.params.id);
    
    // منع حذف حساب admin
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }
    
    if (user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن حذف حساب المدير'
      });
    }
    
    // حذف المستخدم
    const { deleteUser } = require('../utils/userStorage');
    const result = deleteUser(userId);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }
    
    res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح',
      data: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
}; 