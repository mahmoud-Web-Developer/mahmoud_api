/**
 * Data Validator Utility
 * للتحقق من صحة البيانات والتحقق من وجود البيانات في قاعدة البيانات
 */

const { 
  services, 
  portfolio, 
  news, 
  contactRequests, 
  meetings, 
  briefs, 
  users, 
  dashboard, 
  requests 
} = require('../data/dummyData');

// التحقق من وجود خدمة بواسطة ID
const validateServiceExists = (serviceId) => {
  const service = services.find(s => s.id === parseInt(serviceId));
  return {
    exists: !!service,
    data: service
  };
};

// التحقق من وجود مشروع في portfolio بواسطة ID
const validatePortfolioItemExists = (itemId) => {
  const item = portfolio.find(p => p.id === parseInt(itemId));
  return {
    exists: !!item,
    data: item
  };
};

// التحقق من وجود خبر بواسطة ID
const validateNewsExists = (newsId) => {
  const newsItem = news.find(n => n.id === parseInt(newsId));
  return {
    exists: !!newsItem,
    data: newsItem
  };
};

// التحقق من وجود طلب تواصل بواسطة ID
const validateContactRequestExists = (requestId) => {
  const request = contactRequests.find(c => c.id === parseInt(requestId));
  return {
    exists: !!request,
    data: request
  };
};

// التحقق من وجود اجتماع بواسطة ID
const validateMeetingExists = (meetingId) => {
  const meeting = meetings.find(m => m.id === parseInt(meetingId));
  return {
    exists: !!meeting,
    data: meeting
  };
};

// التحقق من وجود brief بواسطة ID
const validateBriefExists = (briefId) => {
  const brief = briefs.find(b => b.id === parseInt(briefId));
  return {
    exists: !!brief,
    data: brief
  };
};

// التحقق من وجود مستخدم بواسطة ID
const validateUserExists = (userId) => {
  const user = users.find(u => u.id === parseInt(userId));
  return {
    exists: !!user,
    data: user
  };
};

// التحقق من وجود مستخدم بواسطة username
const validateUserByUsername = (username) => {
  const user = users.find(u => u.username === username);
  return {
    exists: !!user,
    data: user
  };
};

// التحقق من وجود طلب بواسطة ID
const validateRequestExists = (requestId) => {
  const request = requests.find(r => r.id === parseInt(requestId));
  return {
    exists: !!request,
    data: request
  };
};

// التحقق من صحة بيانات الخدمة
const validateServiceData = (serviceData) => {
  const errors = [];
  
  if (!serviceData.name || serviceData.name.trim().length < 3) {
    errors.push('اسم الخدمة يجب أن يكون 3 أحرف على الأقل');
  }
  
  if (!serviceData.description || serviceData.description.trim().length < 10) {
    errors.push('وصف الخدمة يجب أن يكون 10 أحرف على الأقل');
  }
  
  if (!serviceData.icon || serviceData.icon.trim().length < 3) {
    errors.push('أيقونة الخدمة مطلوبة');
  }
  
  if (serviceData.price !== undefined && (isNaN(serviceData.price) || serviceData.price < 0)) {
    errors.push('سعر الخدمة يجب أن يكون رقم موجب');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات المشروع
const validatePortfolioData = (portfolioData) => {
  const errors = [];
  
  if (!portfolioData.title || portfolioData.title.trim().length < 5) {
    errors.push('عنوان المشروع يجب أن يكون 5 أحرف على الأقل');
  }
  
  if (!portfolioData.description || portfolioData.description.trim().length < 20) {
    errors.push('وصف المشروع يجب أن يكون 20 حرف على الأقل');
  }
  
  if (!portfolioData.category || portfolioData.category.trim().length < 2) {
    errors.push('فئة المشروع مطلوبة');
  }
  
  if (!portfolioData.image || portfolioData.image.trim().length < 10) {
    errors.push('صورة المشروع مطلوبة');
  }
  
  // التحقق من أن الصورة هي رابط صحيح
  if (portfolioData.image && !portfolioData.image.startsWith('http')) {
    errors.push('صورة المشروع يجب أن تكون رابط صحيح');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات الخبر
const validateNewsData = (newsData) => {
  const errors = [];
  
  if (!newsData.title || newsData.title.trim().length < 5) {
    errors.push('عنوان الخبر يجب أن يكون 5 أحرف على الأقل');
  }
  
  if (!newsData.content || newsData.content.trim().length < 20) {
    errors.push('محتوى الخبر يجب أن يكون 20 حرف على الأقل');
  }
  
  if (!newsData.author || newsData.author.trim().length < 2) {
    errors.push('اسم الكاتب مطلوب');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات طلب التواصل
const validateContactRequestData = (requestData) => {
  const errors = [];
  
  if (!requestData.fullName || requestData.fullName.trim().length < 2) {
    errors.push('الاسم الكامل يجب أن يكون حرفين على الأقل');
  }
  
  if (!requestData.phoneNumber) {
    errors.push('رقم الهاتف مطلوب');
  } else {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(requestData.phoneNumber)) {
      errors.push('رقم الهاتف غير صحيح');
    }
  }
  
  if (!requestData.purpose || requestData.purpose.trim().length < 5) {
    errors.push('الغرض من التواصل يجب أن يكون 5 أحرف على الأقل');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات الاجتماع
const validateMeetingData = (meetingData) => {
  const errors = [];
  
  if (!meetingData.title || meetingData.title.trim().length < 3) {
    errors.push('عنوان الاجتماع يجب أن يكون 3 أحرف على الأقل');
  }
  
  if (!meetingData.date) {
    errors.push('تاريخ الاجتماع مطلوب');
  } else {
    const meetingDate = new Date(meetingData.date);
    const now = new Date();
    if (meetingDate < now) {
      errors.push('تاريخ الاجتماع يجب أن يكون في المستقبل');
    }
  }
  
  if (!meetingData.time) {
    errors.push('وقت الاجتماع مطلوب');
  }
  
  if (!meetingData.duration || meetingData.duration < 15 || meetingData.duration > 480) {
    errors.push('مدة الاجتماع يجب أن تكون بين 15 و 480 دقيقة');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات Brief
const validateBriefData = (briefData) => {
  const errors = [];
  
  if (!briefData.title || briefData.title.trim().length < 5) {
    errors.push('عنوان المشروع يجب أن يكون 5 أحرف على الأقل');
  }
  
  if (!briefData.description || briefData.description.trim().length < 20) {
    errors.push('وصف المشروع يجب أن يكون 20 حرف على الأقل');
  }
  
  if (!briefData.budget || isNaN(briefData.budget) || briefData.budget < 0) {
    errors.push('الميزانية يجب أن تكون رقم موجب');
  }
  
  if (!briefData.timeline || isNaN(briefData.timeline) || briefData.timeline < 1) {
    errors.push('الجدول الزمني يجب أن يكون رقم موجب');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات المستخدم
const validateUserData = (userData) => {
  const errors = [];
  
  if (!userData.username || userData.username.trim().length < 3) {
    errors.push('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
  } else {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(userData.username)) {
      errors.push('اسم المستخدم يمكن أن يحتوي على أحرف إنجليزية وأرقام وعلامة _ فقط');
    }
  }
  
  if (!userData.password || userData.password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  
  if (userData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة بيانات الطلب
const validateRequestData = (requestData) => {
  const errors = [];
  
  if (!requestData.title || requestData.title.trim().length < 5) {
    errors.push('عنوان الطلب يجب أن يكون 5 أحرف على الأقل');
  }
  
  if (!requestData.description || requestData.description.trim().length < 10) {
    errors.push('وصف الطلب يجب أن يكون 10 أحرف على الأقل');
  }
  
  if (!requestData.type || !['service', 'support', 'inquiry'].includes(requestData.type)) {
    errors.push('نوع الطلب يجب أن يكون service أو support أو inquiry');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// التحقق من صحة ID
const validateId = (id) => {
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return {
      isValid: false,
      error: 'ID غير صحيح'
    };
  }
  return {
    isValid: true,
    id: parseInt(id)
  };
};

// التحقق من صحة pagination parameters
const validatePagination = (page, limit) => {
  const errors = [];
  
  if (page && (isNaN(parseInt(page)) || parseInt(page) < 1)) {
    errors.push('رقم الصفحة يجب أن يكون رقم موجب');
  }
  
  if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    errors.push('عدد العناصر يجب أن يكون بين 1 و 100');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 10
  };
};

module.exports = {
  // Validation functions for data existence
  validateServiceExists,
  validatePortfolioItemExists,
  validateNewsExists,
  validateContactRequestExists,
  validateMeetingExists,
  validateBriefExists,
  validateUserExists,
  validateUserByUsername,
  validateRequestExists,
  
  // Validation functions for data format
  validateServiceData,
  validatePortfolioData,
  validateNewsData,
  validateContactRequestData,
  validateMeetingData,
  validateBriefData,
  validateUserData,
  validateRequestData,
  
  // Utility validation functions
  validateId,
  validatePagination
}; 