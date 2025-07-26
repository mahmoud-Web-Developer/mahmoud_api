// Validation middleware للتحقق من صحة المدخلات

// التحقق من بيانات تسجيل الدخول
exports.validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || username.trim().length === 0) {
    errors.push('اسم المستخدم مطلوب');
  }

  if (!password || password.length === 0) {
    errors.push('كلمة المرور مطلوبة');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات التسجيل
exports.validateSignup = (req, res, next) => {
  const { username, password, email } = req.body;
  const errors = [];

  // التحقق من اسم المستخدم
  if (!username || username.trim().length < 3) {
    errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  } else {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      errors.push('اسم المستخدم يمكن أن يحتوي على أحرف إنجليزية وأرقام وعلامة _ فقط');
    }
  }

  // التحقق من كلمة المرور
  if (!password || password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }

  // التحقق من البريد الإلكتروني (اختياري)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات طلب التواصل
exports.validateContactRequest = (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('الاسم يجب أن يكون حرفين على الأقل');
  }

  if (!email) {
    errors.push('البريد الإلكتروني مطلوب');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  if (!phone) {
    errors.push('رقم الهاتف مطلوب');
  } else {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('رقم الهاتف غير صحيح');
    }
  }

  if (!message || message.trim().length < 10) {
    errors.push('الرسالة يجب أن تكون 10 أحرف على الأقل');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات الاجتماع
exports.validateMeeting = (req, res, next) => {
  const { title, date, time, duration, description } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('عنوان الاجتماع يجب أن يكون 3 أحرف على الأقل');
  }

  if (!date) {
    errors.push('تاريخ الاجتماع مطلوب');
  } else {
    const meetingDate = new Date(date);
    const now = new Date();
    if (meetingDate < now) {
      errors.push('تاريخ الاجتماع يجب أن يكون في المستقبل');
    }
  }

  if (!time) {
    errors.push('وقت الاجتماع مطلوب');
  }

  if (!duration || duration < 15 || duration > 480) {
    errors.push('مدة الاجتماع يجب أن تكون بين 15 و 480 دقيقة');
  }

  if (!description || description.trim().length < 10) {
    errors.push('وصف الاجتماع يجب أن يكون 10 أحرف على الأقل');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات Brief
exports.validateBrief = (req, res, next) => {
  const { title, description, budget, timeline, requirements } = req.body;
  const errors = [];

  if (!title || title.trim().length < 5) {
    errors.push('عنوان المشروع يجب أن يكون 5 أحرف على الأقل');
  }

  if (!description || description.trim().length < 20) {
    errors.push('وصف المشروع يجب أن يكون 20 حرف على الأقل');
  }

  if (!budget) {
    errors.push('الميزانية مطلوبة');
  } else if (isNaN(budget) || budget < 0) {
    errors.push('الميزانية يجب أن تكون رقم موجب');
  }

  if (!timeline) {
    errors.push('الجدول الزمني مطلوب');
  } else if (isNaN(timeline) || timeline < 1) {
    errors.push('الجدول الزمني يجب أن يكون رقم موجب');
  }

  if (!requirements || requirements.trim().length < 10) {
    errors.push('المتطلبات يجب أن تكون 10 أحرف على الأقل');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات الخدمة
exports.validateService = (req, res, next) => {
  const { name, description, isActive } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('اسم الخدمة يجب أن يكون 3 أحرف على الأقل');
  }

  if (!description || description.trim().length < 10) {
    errors.push('وصف الخدمة يجب أن يكون 10 أحرف على الأقل');
  }

  if (typeof isActive !== 'boolean' && isActive !== undefined) {
    errors.push('حالة الخدمة يجب أن تكون true أو false');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من بيانات المستخدم (للـ admin)
exports.validateUser = (req, res, next) => {
  const { username, email, password, role } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  } else {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      errors.push('اسم المستخدم يمكن أن يحتوي على أحرف إنجليزية وأرقام وعلامة _ فقط');
    }
  }

  if (!email) {
    errors.push('البريد الإلكتروني مطلوب');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  if (!password || password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }

  if (role && !['admin', 'user', 'moderator'].includes(role)) {
    errors.push('الدور يجب أن يكون admin أو user أو moderator');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors
    });
  }

  next();
};

// التحقق من ID
exports.validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'ID غير صحيح'
    });
  }

  next();
};

// التحقق من pagination parameters
exports.validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  
  if (page && (isNaN(parseInt(page)) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'رقم الصفحة يجب أن يكون رقم موجب'
    });
  }

  if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'عدد العناصر يجب أن يكون بين 1 و 100'
    });
  }

  next();
}; 