# أمثلة تطبيقية لنظام التحقق من البيانات
## Implementation Examples for Data Validation System

### 1. مثال: كنترولر الخدمات المحدث

```javascript
const { services } = require('../data/dummyData');
const { validateServiceExists, validateServiceData } = require('../utils/dataValidator');

// الحصول على خدمة واحدة
exports.getServiceById = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateServiceExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الخدمة غير موجودة'
      });
    }
    
    res.json({
      success: true,
      data: validation.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// إنشاء خدمة جديدة
exports.createService = (req, res) => {
  try {
    const validation = validateServiceData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const newService = {
      id: services.length + 1,
      ...req.body,
      createdAt: new Date(),
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    
    services.push(newService);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخدمة بنجاح',
      data: newService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};
```

### 2. مثال: كنترولر طلبات التواصل المحدث

```javascript
const { contactRequests } = require('../data/dummyData');
const { validateContactRequestExists, validateContactRequestData } = require('../utils/dataValidator');

// إنشاء طلب تواصل جديد
exports.createContactRequest = (req, res) => {
  try {
    const validation = validateContactRequestData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const newRequest = {
      id: contactRequests.length + 1,
      ...req.body,
      createdAt: new Date(),
      status: 'pending'
    };
    
    contactRequests.push(newRequest);
    
    res.status(201).json({
      success: true,
      message: 'تم استلام طلبك بنجاح. سنتواصل معك قريباً.',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// تحديث حالة طلب التواصل
exports.updateContactRequestStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validation = validateContactRequestExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'طلب التواصل غير موجود'
      });
    }
    
    if (!status || !['pending', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'حالة غير صحيحة'
      });
    }
    
    const requestIndex = contactRequests.findIndex(r => r.id === parseInt(id));
    contactRequests[requestIndex].status = status;
    contactRequests[requestIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      data: contactRequests[requestIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};
```

### 3. مثال: استخدام Middleware في الـ Routes

```javascript
const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const contactController = require('../controllers/contactController');
const { 
  validateServiceExists, 
  validateService,
  validateContactRequestExists,
  validateContactRequest
} = require('../middleware/validationMiddleware');

// Routes للخدمات
router.get('/services', servicesController.getServices);
router.get('/services/:id', validateServiceExists, servicesController.getServiceById);
router.post('/services', validateService, servicesController.createService);
router.put('/services/:id', validateServiceExists, validateService, servicesController.updateService);
router.delete('/services/:id', validateServiceExists, servicesController.deleteService);

// Routes لطلبات التواصل
router.get('/contact-requests', contactController.getContactRequests);
router.get('/contact-requests/:id', validateContactRequestExists, contactController.getContactRequestById);
router.post('/contact-requests', validateContactRequest, contactController.createContactRequest);
router.put('/contact-requests/:id/status', validateContactRequestExists, contactController.updateContactRequestStatus);
router.delete('/contact-requests/:id', validateContactRequestExists, contactController.deleteContactRequest);

module.exports = router;
```

### 4. مثال: تطبيق على كنترولر المستخدمين

```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../data/dummyData');
const { validateUserExists, validateUserByUsername, validateUserData } = require('../utils/dataValidator');

// تسجيل مستخدم جديد
exports.signup = (req, res) => {
  try {
    const validation = validateUserData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const { username, password, email } = req.body;
    
    // التحقق من عدم تكرار اسم المستخدم
    const existingUser = validateUserByUsername(username);
    if (existingUser.exists) {
      return res.status(409).json({
        success: false,
        message: 'اسم المستخدم موجود بالفعل'
      });
    }
    
    // تشفير كلمة المرور
    const hashedPassword = bcrypt.hashSync(password, 12);
    
    const newUser = {
      id: users.length + 1,
      username: username.trim(),
      password: hashedPassword,
      email: email || null,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'تم تسجيل المستخدم بنجاح',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// تسجيل الدخول
exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'اسم المستخدم وكلمة المرور مطلوبان'
      });
    }
    
    // البحث عن المستخدم
    const userValidation = validateUserByUsername(username);
    if (!userValidation.exists) {
      return res.status(401).json({
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
      });
    }
    
    const user = userValidation.data;
    
    // التحقق من أن الحساب نشط
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'الحساب معطل، يرجى التواصل مع الإدارة'
      });
    }
    
    // مقارنة كلمة المرور
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
      });
    }
    
    // تحديث آخر تسجيل دخول
    user.lastLogin = new Date();
    
    // إنشاء توكن
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          lastLogin: user.lastLogin
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};
```

### 5. مثال: تطبيق على كنترولر الاجتماعات

```javascript
const { meetings } = require('../data/dummyData');
const { validateMeetingExists, validateMeetingData } = require('../utils/dataValidator');

// إنشاء اجتماع جديد
exports.createMeeting = (req, res) => {
  try {
    const validation = validateMeetingData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const newMeeting = {
      id: meetings.length + 1,
      ...req.body,
      createdAt: new Date(),
      status: 'scheduled'
    };
    
    meetings.push(newMeeting);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الاجتماع بنجاح',
      data: newMeeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// الحصول على اجتماع واحد
exports.getMeetingById = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateMeetingExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الاجتماع غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: validation.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// تحديث اجتماع
exports.updateMeeting = (req, res) => {
  try {
    const { id } = req.params;
    
    const existenceValidation = validateMeetingExists(id);
    if (!existenceValidation.exists) {
      return res.status(404).json({
        success: false,
        message: 'الاجتماع غير موجود'
      });
    }
    
    const dataValidation = validateMeetingData(req.body);
    if (!dataValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: dataValidation.errors
      });
    }
    
    const meetingIndex = meetings.findIndex(m => m.id === parseInt(id));
    const updatedMeeting = {
      ...meetings[meetingIndex],
      ...req.body,
      updatedAt: new Date()
    };
    
    meetings[meetingIndex] = updatedMeeting;
    
    res.json({
      success: true,
      message: 'تم تحديث الاجتماع بنجاح',
      data: updatedMeeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};
```

### 6. مثال: تطبيق على كنترولر Briefs

```javascript
const { briefs } = require('../data/dummyData');
const { validateBriefExists, validateBriefData } = require('../utils/dataValidator');

// إنشاء brief جديد
exports.createBrief = (req, res) => {
  try {
    const validation = validateBriefData(req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: validation.errors
      });
    }
    
    const newBrief = {
      id: briefs.length + 1,
      ...req.body,
      createdAt: new Date(),
      status: 'pending'
    };
    
    briefs.push(newBrief);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء المشروع بنجاح',
      data: newBrief
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};

// الحصول على brief واحد
exports.getBriefById = (req, res) => {
  try {
    const { id } = req.params;
    const validation = validateBriefExists(id);
    
    if (!validation.exists) {
      return res.status(404).json({
        success: false,
        message: 'المشروع غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: validation.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
};
```

### ملاحظات مهمة:

1. **التحقق المزدوج**: دائماً نتحقق من وجود البيانات أولاً، ثم من صحة البيانات الجديدة
2. **رسائل واضحة**: نستخدم رسائل خطأ واضحة باللغة العربية
3. **معالجة الأخطاء**: نستخدم try-catch لمعالجة جميع الأخطاء
4. **استجابة موحدة**: نستخدم تنسيق موحد للاستجابة
5. **الأمان**: نتحقق من جميع المدخلات قبل معالجتها

هذا النظام يضمن أن التطبيق يعمل بشكل آمن وموثوق، ويقبل فقط البيانات الصحيحة والموجودة في قاعدة البيانات. 