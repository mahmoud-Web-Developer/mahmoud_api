# 🧪 دليل اختبار الـ APIs باستخدام Postman

## 🚀 الإعداد الأولي

### 1. تشغيل الخادم
```bash
npm start
```

### 2. التأكد من تشغيل الخادم
```bash
curl http://localhost:5000/health
```

**الاستجابة المتوقعة:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "environment": "development",
  "uptime": 123.456
}
```

---

## 🔐 اختبار نظام المصادقة

### 1. تسجيل مستخدم جديد
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/auth/signup`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "role": "user"
}
```

**الاستجابة المتوقعة:**
```json
{
  "success": true,
  "message": "تم تسجيل المستخدم بنجاح",
  "data": {
    "id": "user-id",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

### 2. تسجيل الدخول
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/auth/login`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**الاستجابة المتوقعة:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "أحمد محمد",
      "email": "ahmed@example.com",
      "role": "user"
    }
  }
}
```

### 3. الملف الشخصي
**الطريقة:** `GET`  
**المسار:** `http://localhost:5000/api/auth/profile`  
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**الاستجابة المتوقعة:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "role": "user"
  }
}
```

---

## 📊 اختبار لوحة التحكم

### 1. إحصائيات لوحة التحكم
**الطريقة:** `GET`  
**المسار:** `http://localhost:5000/api/dashboard/stats`  
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**الاستجابة المتوقعة:**
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

### 2. إنشاء مشروع جديد
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/dashboard/projects`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "title": "تصميم موقع شركة التقنية",
  "description": "موقع احترافي لشركة تقنية متخصصة في تطوير البرمجيات",
  "client": "شركة التقنية المحدودة",
  "budget": 25000,
  "startDate": "2024-01-15",
  "endDate": "2024-03-15",
  "status": "active"
}
```

---

## 📝 اختبار إدارة المحتوى

### 1. عرض جميع الخدمات
**الطريقة:** `GET`  
**المسار:** `http://localhost:5000/api/content/services`  
**Headers:** لا يحتاج مصادقة

**الاستجابة المتوقعة:**
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

### 2. إضافة خدمة جديدة
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/content/services`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "title": "تصميم تطبيق موبايل",
  "description": "تصميم تطبيقات iOS و Android احترافية",
  "price": 15000,
  "category": "mobile-app",
  "image": "https://example.com/mobile-app.jpg"
}
```

---

## 📋 اختبار إدارة الطلبات

### 1. إنشاء طلب جديد
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/requests`  
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "سارة أحمد",
  "email": "sara@example.com",
  "phone": "+966501234567",
  "service": "تصميم موقع",
  "message": "أريد موقع احترافي لشركتي الناشئة",
  "budget": 15000,
  "timeline": "شهرين"
}
```

### 2. عرض جميع الطلبات
**الطريقة:** `GET`  
**المسار:** `http://localhost:5000/api/requests`  
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 👥 اختبار إدارة العملاء

### 1. إضافة عميل جديد
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/clients`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "name": "محمد علي",
  "email": "mohamed@company.com",
  "phone": "+966501234568",
  "company": "شركة النجاح للتجارة",
  "address": "الرياض، المملكة العربية السعودية"
}
```

---

## 🔔 اختبار الإشعارات

### 1. إنشاء إشعار جديد
**الطريقة:** `POST`  
**المسار:** `http://localhost:5000/api/notifications`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body (JSON):**
```json
{
  "title": "طلب جديد",
  "message": "تم استلام طلب جديد من سارة أحمد",
  "type": "info",
  "userId": "user-id"
}
```

---

## 🛠️ إعداد Postman Collection

### 1. إنشاء Environment Variables
في Postman، أنشئ متغيرات البيئة التالية:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:5000` | `http://localhost:5000` |
| `token` | (فارغ) | (سيتم تعيينه تلقائياً) |

### 2. إنشاء Collection
أنشئ collection جديد باسم "The Flow API" وأضف المجموعات التالية:

#### 🔐 Authentication
- `POST {{base_url}}/api/auth/signup`
- `POST {{base_url}}/api/auth/login`
- `GET {{base_url}}/api/auth/profile`

#### 📊 Dashboard
- `GET {{base_url}}/api/dashboard/stats`
- `GET {{base_url}}/api/dashboard/projects`
- `POST {{base_url}}/api/dashboard/projects`

#### 📝 Content Management
- `GET {{base_url}}/api/content/services`
- `POST {{base_url}}/api/content/services`
- `GET {{base_url}}/api/content/portfolio`

#### 📋 Requests Management
- `POST {{base_url}}/api/requests`
- `GET {{base_url}}/api/requests`
- `PUT {{base_url}}/api/requests/:id`

### 3. إعداد Pre-request Script للـ Login
أضف هذا الكود في Pre-request Script لطلب تسجيل الدخول:

```javascript
// حفظ التوكن تلقائياً بعد تسجيل الدخول
pm.test("Save token", function () {
    var jsonData = pm.response.json();
    if (jsonData.success && jsonData.data.token) {
        pm.environment.set("token", jsonData.data.token);
    }
});
```

### 4. إعداد Authorization للطلبات المحمية
في الطلبات التي تحتاج مصادقة، استخدم:
- **Type:** Bearer Token
- **Token:** `{{token}}`

---

## 🚨 حل المشاكل الشائعة

### 1. خطأ 404 Not Found
**المشكلة:** المسار غير موجود
**الحل:** تأكد من:
- صحة عنوان URL
- إضافة `/api` قبل المسار
- تشغيل الخادم

### 2. خطأ 401 Unauthorized
**المشكلة:** Token غير صالح
**الحل:** 
- تأكد من تسجيل الدخول أولاً
- تحقق من صحة Token
- تأكد من إرسال Token في Header

### 3. خطأ 422 Unprocessable Entity
**المشكلة:** بيانات غير صحيحة
**الحل:**
- تحقق من صحة JSON
- تأكد من إرسال جميع الحقول المطلوبة
- تحقق من نوع البيانات

### 4. خطأ CORS
**المشكلة:** مشكلة في Cross-Origin
**الحل:**
- تأكد من تفعيل CORS في الخادم
- تحقق من إعدادات Postman

---

## 📋 قائمة الاختبارات السريعة

### اختبار الاتصال الأساسي
```bash
curl http://localhost:5000/health
```

### اختبار تسجيل الدخول
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### اختبار إنشاء طلب
```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "+966501234567",
    "service": "تصميم موقع",
    "message": "أريد موقع احترافي",
    "budget": 10000
  }'
```

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من تشغيل الخادم
2. تأكد من صحة المسارات
3. تحقق من التوثيق الشامل
4. راجع أمثلة الاستخدام

---

*آخر تحديث: يناير 2024* 