const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// مصفوفة لتخزين المستخدمين بشكل مؤقت (بدون قاعدة بيانات)
const users = [];

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
    const { username, password, email } = req.body;
    
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
    const existingUser = users.find(u => u.username === username.trim());
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'اسم المستخدم موجود بالفعل',
        errors: ['username']
      });
    }
    
    // تشفير كلمة المرور
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = { 
      id: users.length + 1, 
      username: username.trim(), 
      password: hashedPassword,
      email: email || null,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    };
    
    users.push(user);
    
    res.status(201).json({ 
      success: true,
      message: 'تم تسجيل المستخدم بنجاح',
      data: {
        id: user.id,
        username: user.username,
        email: user.email
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
    const { username, password } = req.body;
    
    // التحقق من وجود البيانات المطلوبة
    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'اسم المستخدم وكلمة المرور مطلوبان',
        errors: ['username', 'password']
      });
    }
    
    // البحث عن المستخدم
    const user = users.find(u => u.username === username.trim());
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
    user.lastLogin = new Date();
    
    // إنشاء توكن JWT صالح لمدة ساعة
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        email: user.email
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
        email: user.email
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