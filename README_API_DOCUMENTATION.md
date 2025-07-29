# 📚 توثيق APIs - دليل شامل

## 🎯 نظرة عامة

هذا المشروع يوفر مجموعة شاملة من APIs لإدارة نظام متكامل يتضمن:
- **نظام المصادقة والمستخدمين**
- **لوحة التحكم والإحصائيات**
- **إدارة المحتوى (الخدمات، المشاريع، الأخبار)**
- **إدارة الطلبات والعملاء**
- **إدارة الاجتماعات والإشعارات**
- **نظام الإدارة المتقدم**

---

## 📋 ملفات التوثيق

### 1. 📖 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
**التوثيق الشامل والتفصيلي**
- شرح مفصل لجميع الـ APIs
- أمثلة الاستجابة لكل endpoint
- شرح نظام المصادقة والأمان
- رموز الأخطاء وحلولها
- معلومات تقنية مفصلة

### 2. 🚀 [API_QUICK_REFERENCE.md](./API_QUICK_REFERENCE.md)
**الدليل السريع والمرجعي**
- جدول سريع لجميع الـ endpoints
- رموز المصادقة المطلوبة
- حالات الطلبات وأنواع المحتوى
- أمثلة cURL سريعة

### 3. 💡 [API_EXAMPLES.md](./API_EXAMPLES.md)
**أمثلة عملية مفصلة**
- أمثلة JavaScript لجميع العمليات
- أمثلة cURL للاختبار السريع
- معالجة الأخطاء والاستثناءات
- سيناريوهات الاستخدام المختلفة

---

## 🚀 البدء السريع

### 1. تشغيل الخادم
```bash
npm install
npm start
```

### 2. اختبار الاتصال
```bash
curl http://localhost:5000/health
```

### 3. تسجيل الدخول
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

---

## 🔑 معلومات المصادقة

### JWT Token
معظم الـ APIs تتطلب JWT Token في header:
```
Authorization: Bearer <your-jwt-token>
```

### الحصول على Token
```javascript
const response = await fetch('http://localhost:5000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { token } = await response.json();
```

---

## 📊 الـ APIs الرئيسية

### 🔐 المصادقة
- `POST /auth/signup` - تسجيل مستخدم جديد
- `POST /auth/login` - تسجيل الدخول
- `GET /auth/profile` - الملف الشخصي
- `POST /auth/logout` - تسجيل الخروج

### 📊 لوحة التحكم
- `GET /dashboard/stats` - إحصائيات النظام
- `GET /dashboard/projects` - المشاريع الحالية
- `GET /dashboard/requests` - الطلبات الجديدة
- `GET /dashboard/activity` - النشاطات الأخيرة

### 📝 إدارة المحتوى
- `GET /content/services` - عرض الخدمات
- `POST /content/services` - إضافة خدمة جديدة
- `GET /content/portfolio` - عرض المشاريع
- `GET /content/news` - عرض الأخبار

### 📋 إدارة الطلبات
- `POST /requests` - إنشاء طلب جديد
- `GET /requests` - عرض جميع الطلبات
- `PUT /requests/:id` - تحديث حالة الطلب

### 👥 إدارة العملاء
- `GET /clients` - عرض جميع العملاء
- `POST /clients` - إضافة عميل جديد
- `PUT /clients/:id` - تحديث بيانات العميل

---

## 🎯 حالات الاستخدام الشائعة

### 1. إنشاء طلب جديد (للعملاء)
```javascript
const requestData = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "+966501234567",
  service: "تصميم موقع",
  message: "أريد موقع احترافي لشركتي",
  budget: 10000
};

const response = await fetch('http://localhost:5000/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
});
```

### 2. عرض إحصائيات لوحة التحكم
```javascript
const response = await fetch('http://localhost:5000/dashboard/stats', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const stats = await response.json();
console.log('إجمالي المستخدمين:', stats.data.totalUsers);
```

### 3. إضافة خدمة جديدة
```javascript
const serviceData = {
  title: "تصميم تطبيق موبايل",
  description: "تصميم تطبيقات iOS و Android احترافية",
  price: 15000,
  category: "mobile-app"
};

const response = await fetch('http://localhost:5000/content/services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(serviceData)
});
```

---

## 🚨 رموز الأخطاء الشائعة

| الكود | المعنى | الحل |
|-------|--------|------|
| 401 | غير مصرح | تأكد من إرسال JWT Token صحيح |
| 403 | ممنوع | تأكد من الصلاحيات المطلوبة |
| 404 | غير موجود | تأكد من صحة المسار |
| 422 | بيانات غير صالحة | تأكد من صحة البيانات المرسلة |

---

## 🔧 معلومات تقنية

### التقنيات المستخدمة
- **Backend**: Node.js, Express.js
- **Database**: JSON Storage (Local)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Custom middleware
- **CORS**: Enabled for cross-origin requests

### متغيرات البيئة
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
```

---

## 📞 الدعم والمساعدة

### للمساعدة أو الاستفسارات:
- 📧 البريد الإلكتروني: support@example.com
- 📱 الهاتف: +966-50-123-4567
- 🌐 الموقع: https://example.com/support

### روابط سريعة:
- [التوثيق الشامل](./API_DOCUMENTATION.md)
- [الدليل السريع](./API_QUICK_REFERENCE.md)
- [الأمثلة العملية](./API_EXAMPLES.md)

---

## 📝 ملاحظات مهمة

1. **المصادقة**: معظم الـ APIs تتطلب JWT Token في header
2. **البيانات**: جميع البيانات تُرسل وتُستقبل بتنسيق JSON
3. **الأخطاء**: جميع الأخطاء تعيد استجابة بتنسيق موحد
4. **CORS**: مفعل للسماح بالطلبات من مصادر مختلفة
5. **التحقق**: يتم التحقق من صحة البيانات قبل المعالجة

---

## 🔄 التحديثات الأخيرة

- ✅ إضافة نظام المصادقة الكامل
- ✅ إضافة لوحة التحكم المتقدمة
- ✅ إضافة إدارة المحتوى الشاملة
- ✅ إضافة نظام الطلبات والعملاء
- ✅ إضافة نظام الإشعارات والاجتماعات
- ✅ إضافة نظام الإدارة المتقدم
- ✅ إصلاح مسارات الـ APIs (إضافة /api prefix)
- ✅ إعداد ملفات النشر على Railway
- ✅ إنشاء دليل شامل للنشر والاختبار

---

*تم إنشاء هذا التوثيق في: يناير 2024*
*آخر تحديث: يناير 2024*

---

## 📚 روابط سريعة للتوثيق

| الملف | الوصف | الرابط |
|-------|--------|--------|
| API_DOCUMENTATION.md | التوثيق الشامل والتفصيلي | [📖 اقرأ التوثيق](./API_DOCUMENTATION.md) |
| API_QUICK_REFERENCE.md | الدليل السريع والمرجعي | [🚀 الدليل السريع](./API_QUICK_REFERENCE.md) |
| API_EXAMPLES.md | أمثلة عملية مفصلة | [💡 الأمثلة العملية](./API_EXAMPLES.md) | 