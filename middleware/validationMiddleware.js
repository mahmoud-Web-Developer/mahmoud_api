// Validation middleware للتحقق من صحة المدخلات
const { 
  validateServiceExists,
  validatePortfolioItemExists,
  validateNewsExists,
  validateContactRequestExists,
  validateMeetingExists,
  validateBriefExists,
  validateUserExists,
  validateUserByUsername,
  validateRequestExists,
  validateServiceData,
  validatePortfolioData,
  validateNewsData,
  validateContactRequestData,
  validateMeetingData,
  validateBriefData,
  validateUserData,
  validateRequestData,
  validateId,
  validatePagination
} = require('../utils/dataValidator');

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
  const validation = validateContactRequestData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات الاجتماع
exports.validateMeeting = (req, res, next) => {
  const validation = validateMeetingData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات Brief
exports.validateBrief = (req, res, next) => {
  const validation = validateBriefData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات الخدمة
exports.validateService = (req, res, next) => {
  const validation = validateServiceData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات المشروع
exports.validatePortfolio = (req, res, next) => {
  const validation = validatePortfolioData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات الخبر
exports.validateNews = (req, res, next) => {
  const validation = validateNewsData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات المستخدم (للـ admin)
exports.validateUser = (req, res, next) => {
  const validation = validateUserData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من بيانات الطلب
exports.validateRequest = (req, res, next) => {
  const validation = validateRequestData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  next();
};

// التحقق من وجود خدمة
exports.validateServiceExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateServiceExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'الخدمة غير موجودة'
    });
  }
  
  req.service = validation.data;
  next();
};

// التحقق من وجود مشروع في portfolio
exports.validatePortfolioItemExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validatePortfolioItemExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'المشروع غير موجود'
    });
  }
  
  req.portfolioItem = validation.data;
  next();
};

// التحقق من وجود خبر
exports.validateNewsExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateNewsExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'الخبر غير موجود'
    });
  }
  
  req.newsItem = validation.data;
  next();
};

// التحقق من وجود طلب تواصل
exports.validateContactRequestExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateContactRequestExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'طلب التواصل غير موجود'
    });
  }
  
  req.contactRequest = validation.data;
  next();
};

// التحقق من وجود اجتماع
exports.validateMeetingExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateMeetingExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'الاجتماع غير موجود'
    });
  }
  
  req.meeting = validation.data;
  next();
};

// التحقق من وجود brief
exports.validateBriefExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateBriefExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'المشروع غير موجود'
    });
  }
  
  req.brief = validation.data;
  next();
};

// التحقق من وجود مستخدم
exports.validateUserExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateUserExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'المستخدم غير موجود'
    });
  }
  
  req.user = validation.data;
  next();
};

// التحقق من وجود طلب
exports.validateRequestExists = (req, res, next) => {
  const { id } = req.params;
  const idValidation = validateId(id);
  
  if (!idValidation.isValid) {
    return res.status(400).json({
      success: false,
      message: idValidation.error
    });
  }
  
  const validation = validateRequestExists(id);
  
  if (!validation.exists) {
    return res.status(404).json({
      success: false,
      message: 'الطلب غير موجود'
    });
  }
  
  req.request = validation.data;
  next();
};

// التحقق من ID
exports.validateId = (req, res, next) => {
  const { id } = req.params;
  const validation = validateId(id);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: validation.error
    });
  }

  next();
};

// التحقق من pagination parameters
exports.validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  const validation = validatePagination(page, limit);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }

  req.pagination = {
    page: validation.page,
    limit: validation.limit
  };

  next();
}; 