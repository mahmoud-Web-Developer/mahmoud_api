# 💡 أمثلة عملية لاستخدام الـ APIs

## 🔐 أمثلة المصادقة

### 1. تسجيل مستخدم جديد
```javascript
const signupData = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
  password: "password123",
  role: "user"
};

const response = await fetch('http://localhost:5000/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(signupData)
});

const result = await response.json();
console.log('تم التسجيل:', result);
```

### 2. تسجيل الدخول
```javascript
const loginData = {
  email: "ahmed@example.com",
  password: "password123"
};

const response = await fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(loginData)
});

const { token, user } = await response.json();
console.log('تم تسجيل الدخول:', user.name);
console.log('Token:', token);
```

### 3. الحصول على الملف الشخصي
```javascript
const response = await fetch('http://localhost:5000/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const profile = await response.json();
console.log('الملف الشخصي:', profile);
```

---

## 📊 أمثلة لوحة التحكم

### 1. عرض إحصائيات لوحة التحكم
```javascript
const response = await fetch('http://localhost:5000/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const stats = await response.json();
console.log('إجمالي المستخدمين:', stats.data.totalUsers);
console.log('إجمالي المشاريع:', stats.data.totalProjects);
console.log('إجمالي الطلبات:', stats.data.totalRequests);
```

### 2. إنشاء مشروع جديد
```javascript
const projectData = {
  title: "تصميم موقع شركة التقنية",
  description: "موقع احترافي لشركة تقنية متخصصة في تطوير البرمجيات",
  client: "شركة التقنية المحدودة",
  budget: 25000,
  startDate: "2024-01-15",
  endDate: "2024-03-15",
  status: "active"
};

const response = await fetch('http://localhost:5000/dashboard/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(projectData)
});

const project = await response.json();
console.log('تم إنشاء المشروع:', project);
```

### 3. تحديث مشروع
```javascript
const updateData = {
  title: "تصميم موقع شركة التقنية - محدث",
  status: "completed",
  progress: 100
};

const response = await fetch('http://localhost:5000/dashboard/projects/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
});

const updatedProject = await response.json();
console.log('تم تحديث المشروع:', updatedProject);
```

---

## 📝 أمثلة إدارة المحتوى

### 1. إضافة خدمة جديدة
```javascript
const serviceData = {
  title: "تصميم تطبيق موبايل",
  description: "تصميم تطبيقات iOS و Android احترافية مع واجهات مستخدم متقدمة",
  price: 15000,
  category: "mobile-app",
  image: "https://example.com/mobile-app-design.jpg"
};

const response = await fetch('http://localhost:5000/content/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(serviceData)
});

const service = await response.json();
console.log('تم إضافة الخدمة:', service);
```

### 2. عرض جميع الخدمات
```javascript
const response = await fetch('http://localhost:5000/content/services');
const services = await response.json();

services.data.forEach(service => {
  console.log(`- ${service.title}: ${service.price} ريال`);
});
```

### 3. إضافة مشروع للمعرض
```javascript
const portfolioData = {
  title: "موقع شركة التقنية",
  description: "موقع احترافي لشركة تقنية متخصصة في تطوير البرمجيات",
  client: "شركة التقنية المحدودة",
  category: "web-design",
  image: "https://example.com/tech-company-website.jpg",
  url: "https://tech-company.com"
};

const response = await fetch('http://localhost:5000/content/portfolio', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(portfolioData)
});

const portfolio = await response.json();
console.log('تم إضافة المشروع للمعرض:', portfolio);
```

### 4. إضافة خبر جديد
```javascript
const newsData = {
  title: "إطلاق خدمات تصميم التطبيقات الجديدة",
  content: "نفخر بإعلان إطلاق خدمات تصميم تطبيقات الموبايل المتقدمة...",
  image: "https://example.com/mobile-app-news.jpg",
  category: "technology"
};

const response = await fetch('http://localhost:5000/content/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newsData)
});

const news = await response.json();
console.log('تم إضافة الخبر:', news);
```

---

## 📋 أمثلة إدارة الطلبات

### 1. إنشاء طلب جديد (للعملاء)
```javascript
const requestData = {
  name: "سارة أحمد",
  email: "sara@example.com",
  phone: "+966501234567",
  service: "تصميم موقع",
  message: "أريد موقع احترافي لشركتي الناشئة في مجال التجارة الإلكترونية",
  budget: 15000,
  timeline: "شهرين"
};

const response = await fetch('http://localhost:5000/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
});

const request = await response.json();
console.log('تم إرسال الطلب:', request);
```

### 2. عرض جميع الطلبات (للمدير)
```javascript
const response = await fetch('http://localhost:5000/requests', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const requests = await response.json();
requests.data.forEach(request => {
  console.log(`- ${request.name}: ${request.service} (${request.status})`);
});
```

### 3. تحديث حالة طلب
```javascript
const updateData = {
  status: "in-progress",
  notes: "تم البدء في تصميم الموقع. سيتم إرسال النموذج الأول خلال أسبوع"
};

const response = await fetch('http://localhost:5000/requests/456', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
});

const updatedRequest = await response.json();
console.log('تم تحديث الطلب:', updatedRequest);
```

### 4. البحث في الطلبات
```javascript
const response = await fetch('http://localhost:5000/requests/search?q=سارة', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const searchResults = await response.json();
console.log('نتائج البحث:', searchResults);
```

---

## 👥 أمثلة إدارة العملاء

### 1. إضافة عميل جديد
```javascript
const clientData = {
  name: "محمد علي",
  email: "mohamed@company.com",
  phone: "+966501234568",
  company: "شركة النجاح للتجارة",
  address: "الرياض، المملكة العربية السعودية"
};

const response = await fetch('http://localhost:5000/clients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(clientData)
});

const client = await response.json();
console.log('تم إضافة العميل:', client);
```

### 2. عرض جميع العملاء
```javascript
const response = await fetch('http://localhost:5000/clients', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const clients = await response.json();
clients.data.forEach(client => {
  console.log(`- ${client.name} (${client.company})`);
});
```

### 3. تحديث بيانات العميل
```javascript
const updateData = {
  name: "محمد علي أحمد",
  email: "mohamed.ahmed@company.com",
  phone: "+966501234569"
};

const response = await fetch('http://localhost:5000/clients/789', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
});

const updatedClient = await response.json();
console.log('تم تحديث بيانات العميل:', updatedClient);
```

---

## 📅 أمثلة إدارة الاجتماعات

### 1. جدولة اجتماع جديد
```javascript
const meetingData = {
  title: "مناقشة تصميم الموقع",
  description: "مناقشة تفاصيل تصميم موقع شركة التقنية",
  clientId: "client-123",
  date: "2024-01-20T14:00:00Z",
  duration: 60,
  type: "video-call"
};

const response = await fetch('http://localhost:5000/meetings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(meetingData)
});

const meeting = await response.json();
console.log('تم جدولة الاجتماع:', meeting);
```

### 2. عرض اجتماعات اليوم
```javascript
const response = await fetch('http://localhost:5000/meetings/today', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const todayMeetings = await response.json();
console.log('اجتماعات اليوم:', todayMeetings);
```

### 3. تحديث اجتماع
```javascript
const updateData = {
  title: "مناقشة تصميم الموقع - محدث",
  date: "2024-01-21T15:00:00Z",
  status: "confirmed"
};

const response = await fetch('http://localhost:5000/meetings/101', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
});

const updatedMeeting = await response.json();
console.log('تم تحديث الاجتماع:', updatedMeeting);
```

---

## 🔔 أمثلة الإشعارات

### 1. إنشاء إشعار جديد
```javascript
const notificationData = {
  title: "طلب جديد",
  message: "تم استلام طلب جديد من سارة أحمد",
  type: "info",
  userId: "user-123"
};

const response = await fetch('http://localhost:5000/notifications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(notificationData)
});

const notification = await response.json();
console.log('تم إنشاء الإشعار:', notification);
```

### 2. عرض الإشعارات غير المقروءة
```javascript
const response = await fetch('http://localhost:5000/notifications/unread', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const unreadNotifications = await response.json();
console.log('الإشعارات غير المقروءة:', unreadNotifications);
```

### 3. تحديث حالة الإشعار كمقروء
```javascript
const response = await fetch('http://localhost:5000/notifications/202/read', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const updatedNotification = await response.json();
console.log('تم تحديث حالة الإشعار:', updatedNotification);
```

---

## 👨‍💼 أمثلة إدارة الإدارة

### 1. عرض إحصائيات النظام
```javascript
const response = await fetch('http://localhost:5000/admin/stats', {
  headers: {
    'Authorization': `Bearer ${adminToken}`
  }
});

const systemStats = await response.json();
console.log('إحصائيات النظام:', systemStats);
```

### 2. إنشاء مستخدم جديد
```javascript
const userData = {
  name: "فاطمة أحمد",
  email: "fatima@company.com",
  password: "securePassword123",
  role: "admin"
};

const response = await fetch('http://localhost:5000/admin/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify(userData)
});

const newUser = await response.json();
console.log('تم إنشاء المستخدم:', newUser);
```

### 3. تحديث إعدادات النظام
```javascript
const settingsData = {
  siteName: "شركة التصميم المتقدمة",
  maintenanceMode: false,
  maxFileSize: 10485760,
  allowRegistration: true
};

const response = await fetch('http://localhost:5000/admin/settings', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  body: JSON.stringify(settingsData)
});

const updatedSettings = await response.json();
console.log('تم تحديث إعدادات النظام:', updatedSettings);
```

---

## 🔧 أمثلة باستخدام cURL

### 1. تسجيل الدخول
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 2. إنشاء طلب جديد
```bash
curl -X POST http://localhost:5000/requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "علي محمد",
    "email": "ali@example.com",
    "phone": "+966501234570",
    "service": "تصميم تطبيق موبايل",
    "message": "أريد تطبيق موبايل لشركتي",
    "budget": 20000
  }'
```

### 3. عرض الإحصائيات
```bash
curl -X GET http://localhost:5000/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. إضافة خدمة جديدة
```bash
curl -X POST http://localhost:5000/content/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "تصميم الهوية البصرية",
    "description": "تصميم هوية بصرية متكاملة للشركات",
    "price": 8000,
    "category": "branding",
    "image": "https://example.com/branding.jpg"
  }'
```

---

## 🚨 معالجة الأخطاء

### 1. معالجة أخطاء المصادقة
```javascript
try {
  const response = await fetch('http://localhost:5000/dashboard/stats', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.status === 401) {
    console.log('Token غير صالح، يرجى تسجيل الدخول مرة أخرى');
    // إعادة توجيه لصفحة تسجيل الدخول
  } else if (response.status === 403) {
    console.log('ليس لديك صلاحية للوصول لهذا المورد');
  }
  
  const data = await response.json();
  console.log('البيانات:', data);
} catch (error) {
  console.error('خطأ في الاتصال:', error);
}
```

### 2. معالجة أخطاء التحقق من البيانات
```javascript
try {
  const response = await fetch('http://localhost:5000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "أحمد",
      email: "invalid-email",
      password: "123"
    })
  });
  
  const result = await response.json();
  
  if (!result.success) {
    console.log('أخطاء التحقق:', result.errors);
    // عرض الأخطاء للمستخدم
  }
} catch (error) {
  console.error('خطأ في الاتصال:', error);
}
```

---

*آخر تحديث: يناير 2024* 