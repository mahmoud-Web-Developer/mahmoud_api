# 📚 توثيق APIs - نظام إدارة المحتوى والطلبات

## 📋 جدول المحتويات
1. [مقدمة عامة](#مقدمة-عامة)
2. [معلومات أساسية](#معلومات-أساسية)
3. [نظام المصادقة](#نظام-المصادقة)
4. [لوحة التحكم](#لوحة-التحكم)
5. [إدارة المحتوى](#إدارة-المحتوى)
6. [إدارة الطلبات](#إدارة-الطلبات)
7. [إدارة العملاء](#إدارة-العملاء)
8. [إدارة المشاريع](#إدارة-المشاريع)
9. [إدارة الاجتماعات](#إدارة-الاجتماعات)
10. [إدارة الإشعارات](#إدارة-الإشعارات)
11. [إدارة الإدارة](#إدارة-الإدارة)
12. [أمثلة الاستخدام](#أمثلة-الاستخدام)
13. [رموز الأخطاء](#رموز-الأخطاء)

---

## 🚀 مقدمة عامة

هذا النظام يوفر مجموعة شاملة من APIs لإدارة:
- **المصادقة والمستخدمين**: تسجيل الدخول، التسجيل، إدارة الملفات الشخصية
- **لوحة التحكم**: إحصائيات، إدارة المشاريع، النشاطات
- **إدارة المحتوى**: الخدمات، المشاريع، الأخبار
- **إدارة الطلبات**: طلبات العملاء، تتبع الحالة
- **إدارة العملاء**: بيانات العملاء، التواصل
- **إدارة الاجتماعات**: جدولة، إدارة المواعيد
- **الإشعارات**: إشعارات النظام والمستخدمين

---

## ⚙️ معلومات أساسية

### 🔗 Base URL
```
http://localhost:5000/api
```

**ملاحظة مهمة:** جميع الـ APIs تبدأ بـ `/api` قبل المسار المحدد.

### 🔐 المصادقة
معظم الـ APIs تتطلب مصادقة باستخدام JWT Token في header:
```
Authorization: Bearer <your-jwt-token>
```

### 📊 تنسيق الاستجابة
جميع الـ APIs تعيد استجابة بتنسيق JSON:
```json
{
  "success": true,
  "message": "تمت العملية بنجاح",
  "data": { ... }
}
```

### 🚨 تنسيق الخطأ
```json
{
  "success": false,
  "message": "رسالة الخطأ",
  "error": "تفاصيل الخطأ"
}
```

---

## 🔐 نظام المصادقة

### 📝 التسجيل
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "اسم المستخدم",
  "email": "user@example.com",
  "password": "كلمة المرور",
  "role": "user" // أو "admin"
}
```

### 🔑 تسجيل الدخول
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "كلمة المرور"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "اسم المستخدم",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

### 🔄 تحديث التوكن
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh-token-here"
}
```

### 👤 الملف الشخصي
```http
GET /auth/profile
Authorization: Bearer <token>
```

### 🚪 تسجيل الخروج
```http
POST /auth/logout
Authorization: Bearer <token>
```

### 👥 إدارة المستخدمين (للمديرين)
```http
GET /auth/users
Authorization: Bearer <admin-token>
```

```http
GET /auth/users/search?q=اسم
Authorization: Bearer <admin-token>
```

```http
GET /auth/users/:id
Authorization: Bearer <admin-token>
```

```http
PATCH /auth/users/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "active" // أو "inactive"
}
```

```http
DELETE /auth/users/:id
Authorization: Bearer <admin-token>
```

---

## 📊 لوحة التحكم

### 📈 الإحصائيات
```http
GET /dashboard/stats
Authorization: Bearer <token>
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalProjects": 25,
    "totalRequests": 45,
    "activeProjects": 12,
    "pendingRequests": 8,
    "revenue": 50000
  }
}
```

### 📋 المشاريع
```http
GET /dashboard/projects
Authorization: Bearer <token>
```

```http
POST /dashboard/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "اسم المشروع",
  "description": "وصف المشروع",
  "client": "اسم العميل",
  "budget": 10000,
  "startDate": "2024-01-01",
  "endDate": "2024-03-01",
  "status": "active"
}
```

```http
PUT /dashboard/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "اسم المشروع المحدث",
  "status": "completed"
}
```

```http
DELETE /dashboard/projects/:id
Authorization: Bearer <token>
```

### 👥 إدارة المستخدمين
```http
GET /dashboard/users
Authorization: Bearer <token>
```

```http
POST /dashboard/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "اسم المستخدم الجديد",
  "email": "newuser@example.com",
  "password": "كلمة المرور",
  "role": "user"
}
```

```http
PUT /dashboard/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "الاسم المحدث",
  "email": "updated@example.com"
}
```

```http
DELETE /dashboard/users/:id
Authorization: Bearer <token>
```

### 📝 الطلبات
```http
GET /dashboard/requests
Authorization: Bearer <token>
```

```http
POST /dashboard/requests
Content-Type: application/json

{
  "name": "اسم مقدم الطلب",
  "email": "client@example.com",
  "phone": "رقم الهاتف",
  "service": "نوع الخدمة",
  "message": "تفاصيل الطلب",
  "budget": 5000
}
```

### 📈 النشاطات الأخيرة
```http
GET /dashboard/activity
Authorization: Bearer <token>
```

### ⚙️ إعدادات لوحة التحكم
```http
GET /dashboard/settings
Authorization: Bearer <token>
```

```http
PUT /dashboard/settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "notifications": true,
  "autoBackup": true,
  "theme": "dark"
}
```

---

## 📝 إدارة المحتوى

### 🛠️ الخدمات
```http
GET /content/services
```

**الاستجابة:**
```json
{
  "success": true,
  "data": [
    {
      "id": "service-id",
      "title": "تصميم المواقع",
      "description": "تصميم مواقع احترافية",
      "price": 5000,
      "category": "web-design",
      "image": "service-image-url"
    }
  ]
}
```

```http
POST /content/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "اسم الخدمة",
  "description": "وصف الخدمة",
  "price": 5000,
  "category": "web-design",
  "image": "image-url"
}
```

```http
PUT /content/services/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "الاسم المحدث",
  "price": 6000
}
```

```http
DELETE /content/services/:id
Authorization: Bearer <token>
```

### 🎨 المشاريع (Portfolio)
```http
GET /content/portfolio
```

```http
POST /content/portfolio
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "اسم المشروع",
  "description": "وصف المشروع",
  "client": "اسم العميل",
  "category": "web-design",
  "image": "project-image-url",
  "url": "project-url"
}
```

```http
PUT /content/portfolio/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "الاسم المحدث",
  "status": "completed"
}
```

```http
DELETE /content/portfolio/:id
Authorization: Bearer <token>
```

### 📰 الأخبار
```http
GET /content/news
```

```http
POST /content/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "عنوان الخبر",
  "content": "محتوى الخبر",
  "image": "news-image-url",
  "category": "general"
}
```

```http
PUT /content/news/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "العنوان المحدث",
  "content": "المحتوى المحدث"
}
```

```http
DELETE /content/news/:id
Authorization: Bearer <token>
```

---

## 📋 إدارة الطلبات

### 📝 إنشاء طلب جديد
```http
POST /requests
Content-Type: application/json

{
  "name": "اسم مقدم الطلب",
  "email": "client@example.com",
  "phone": "رقم الهاتف",
  "service": "نوع الخدمة المطلوبة",
  "message": "تفاصيل الطلب",
  "budget": 5000,
  "timeline": "شهر واحد"
}
```

### 📊 عرض جميع الطلبات
```http
GET /requests
Authorization: Bearer <token>
```

### 🔍 عرض طلب محدد
```http
GET /requests/:id
Authorization: Bearer <token>
```

### ✏️ تحديث حالة الطلب
```http
PUT /requests/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress", // pending, in-progress, completed, rejected
  "notes": "ملاحظات إضافية"
}
```

### 🗑️ حذف طلب
```http
DELETE /requests/:id
Authorization: Bearer <token>
```

### 🔍 البحث في الطلبات
```http
GET /requests/search?q=اسم العميل
Authorization: Bearer <token>
```

### 📊 تصفية الطلبات
```http
GET /requests?status=pending&service=web-design
Authorization: Bearer <token>
```

---

## 👥 إدارة العملاء

### 👤 عرض جميع العملاء
```http
GET /clients
Authorization: Bearer <token>
```

### ➕ إضافة عميل جديد
```http
POST /clients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "اسم العميل",
  "email": "client@example.com",
  "phone": "رقم الهاتف",
  "company": "اسم الشركة",
  "address": "عنوان العميل"
}
```

### 🔍 عرض عميل محدد
```http
GET /clients/:id
Authorization: Bearer <token>
```

### ✏️ تحديث بيانات العميل
```http
PUT /clients/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "الاسم المحدث",
  "email": "updated@example.com",
  "phone": "رقم الهاتف الجديد"
}
```

### 🗑️ حذف عميل
```http
DELETE /clients/:id
Authorization: Bearer <token>
```

### 🔍 البحث في العملاء
```http
GET /clients/search?q=اسم العميل
Authorization: Bearer <token>
```

---

## 📁 إدارة المشاريع

### 📋 عرض جميع المشاريع
```http
GET /projects
Authorization: Bearer <token>
```

### ➕ إنشاء مشروع جديد
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "اسم المشروع",
  "description": "وصف المشروع",
  "clientId": "client-id",
  "budget": 10000,
  "startDate": "2024-01-01",
  "endDate": "2024-03-01",
  "status": "active"
}
```

### 🔍 عرض مشروع محدد
```http
GET /projects/:id
Authorization: Bearer <token>
```

### ✏️ تحديث المشروع
```http
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "الاسم المحدث",
  "status": "completed",
  "progress": 75
}
```

### 🗑️ حذف مشروع
```http
DELETE /projects/:id
Authorization: Bearer <token>
```

### 🔍 البحث في المشاريع
```http
GET /projects/search?q=اسم المشروع
Authorization: Bearer <token>
```

---

## 📅 إدارة الاجتماعات

### 📅 عرض جميع الاجتماعات
```http
GET /meetings
Authorization: Bearer <token>
```

### ➕ جدولة اجتماع جديد
```http
POST /meetings
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "عنوان الاجتماع",
  "description": "وصف الاجتماع",
  "clientId": "client-id",
  "date": "2024-01-15T10:00:00Z",
  "duration": 60,
  "type": "video-call" // أو "in-person"
}
```

### 🔍 عرض اجتماع محدد
```http
GET /meetings/:id
Authorization: Bearer <token>
```

### ✏️ تحديث الاجتماع
```http
PUT /meetings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "العنوان المحدث",
  "date": "2024-01-16T10:00:00Z",
  "status": "confirmed"
}
```

### 🗑️ إلغاء اجتماع
```http
DELETE /meetings/:id
Authorization: Bearer <token>
```

### 📊 عرض اجتماعات اليوم
```http
GET /meetings/today
Authorization: Bearer <token>
```

---

## 🔔 إدارة الإشعارات

### 📢 عرض جميع الإشعارات
```http
GET /notifications
Authorization: Bearer <token>
```

### ➕ إنشاء إشعار جديد
```http
POST /notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "عنوان الإشعار",
  "message": "محتوى الإشعار",
  "type": "info", // info, warning, error, success
  "userId": "user-id"
}
```

### 🔍 عرض إشعار محدد
```http
GET /notifications/:id
Authorization: Bearer <token>
```

### ✅ تحديث حالة الإشعار
```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

### 🗑️ حذف إشعار
```http
DELETE /notifications/:id
Authorization: Bearer <token>
```

### 📊 الإشعارات غير المقروءة
```http
GET /notifications/unread
Authorization: Bearer <token>
```

---

## 👨‍💼 إدارة الإدارة

### 📊 إحصائيات النظام
```http
GET /admin/stats
Authorization: Bearer <admin-token>
```

### 👥 إدارة المستخدمين
```http
GET /admin/users
Authorization: Bearer <admin-token>
```

```http
POST /admin/users
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "اسم المستخدم",
  "email": "user@example.com",
  "password": "كلمة المرور",
  "role": "admin"
}
```

```http
PUT /admin/users/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "role": "admin",
  "status": "active"
}
```

```http
DELETE /admin/users/:id
Authorization: Bearer <admin-token>
```

### 🔧 إعدادات النظام
```http
GET /admin/settings
Authorization: Bearer <admin-token>
```

```http
PUT /admin/settings
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "siteName": "اسم الموقع",
  "maintenanceMode": false,
  "maxFileSize": 10485760
}
```

### 📊 سجلات النظام
```http
GET /admin/logs
Authorization: Bearer <admin-token>
```

---

## 💡 أمثلة الاستخدام

### 🔐 تسجيل الدخول وإنشاء طلب
```javascript
// 1. تسجيل الدخول
const loginResponse = await fetch('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { token } = await loginResponse.json();

// 2. إنشاء طلب جديد
const requestResponse = await fetch('/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    service: 'تصميم موقع',
    message: 'أريد موقع احترافي لشركتي',
    budget: 10000
  })
});
```

### 📊 عرض إحصائيات لوحة التحكم
```javascript
const statsResponse = await fetch('/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const stats = await statsResponse.json();
console.log('إجمالي المستخدمين:', stats.data.totalUsers);
console.log('إجمالي المشاريع:', stats.data.totalProjects);
```

### 📝 إضافة خدمة جديدة
```javascript
const serviceResponse = await fetch('/content/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'تصميم تطبيق موبايل',
    description: 'تصميم تطبيقات iOS و Android احترافية',
    price: 15000,
    category: 'mobile-app',
    image: 'https://example.com/mobile-app.jpg'
  })
});
```

---

## 🚨 رموز الأخطاء

| الكود | المعنى | الوصف |
|-------|--------|-------|
| 200 | OK | تمت العملية بنجاح |
| 201 | Created | تم إنشاء العنصر بنجاح |
| 400 | Bad Request | بيانات غير صحيحة |
| 401 | Unauthorized | غير مصرح - مطلوب تسجيل دخول |
| 403 | Forbidden | غير مسموح - مطلوب صلاحيات أعلى |
| 404 | Not Found | العنصر غير موجود |
| 409 | Conflict | تعارض في البيانات |
| 422 | Unprocessable Entity | بيانات غير صالحة |
| 500 | Internal Server Error | خطأ في الخادم |

### 📝 أمثلة الأخطاء

```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": {
    "email": "البريد الإلكتروني مطلوب",
    "password": "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
  }
}
```

```json
{
  "success": false,
  "message": "غير مصرح",
  "error": "Token غير صالح أو منتهي الصلاحية"
}
```

---

## 🔧 معلومات تقنية

### 🛠️ التقنيات المستخدمة
- **Backend**: Node.js, Express.js
- **Database**: JSON Storage (Local)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Custom middleware
- **CORS**: Enabled for cross-origin requests

### 📦 التبعيات الرئيسية
```json
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3"
}
```

### 🔧 متغيرات البيئة
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
```

---

## 📞 الدعم والمساعدة

للمساعدة أو الاستفسارات:
- 📧 البريد الإلكتروني: support@example.com
- 📱 الهاتف: +966-50-123-4567
- 🌐 الموقع: https://example.com/support

---

*تم إنشاء هذا التوثيق في: يناير 2024*
*آخر تحديث: يناير 2024* 