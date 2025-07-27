# APIs Documentation

## 📁 محتويات المجلد

### 📋 ملفات الـ APIs:

#### 🔐 Authentication APIs (2 APIs):
- **AUTHENTICATION_APIS.txt** - APIs المصادقة
  - POST /auth/signup - تسجيل مستخدم جديد
  - POST /auth/login - تسجيل الدخول والحصول على JWT

#### 📄 Content APIs (3 APIs):
- **CONTENT_APIS.txt** - APIs المحتوى
  - GET /services - جلب جميع الخدمات
  - GET /portfolio - جلب جميع عناصر البورتفوليو
  - GET /news - جلب آخر الأخبار

#### 📝 Request APIs (4 APIs):
- **REQUEST_APIS.txt** - APIs الطلبات
  - POST /contact-requests - إرسال طلب تواصل
  - GET /meetings/slots - جلب أوقات الاجتماعات المتاحة
  - POST /meetings - حجز اجتماع
  - POST /briefs - إرسال Brief جديد

#### 🎛️ Dashboard & Admin APIs (4 APIs):
- **DASHBOARD_ADMIN_APIS.txt** - APIs لوحة التحكم والإدارة
  - GET /dashboard - جلب بيانات لوحة التحكم
  - POST /requests/contact - بدء طلب تواصل
  - POST /requests/meeting - بدء طلب اجتماع
  - POST /requests/brief - بدء طلب Brief

#### 👥 Clients Management APIs (3 APIs):
- **CLIENTS_APIS.txt** - APIs إدارة العملاء
  - POST /clients - إضافة عميل جديد
  - GET /clients - جلب جميع العملاء
  - GET /clients/:id - جلب عميل محدد

#### 🔧 System APIs (2 APIs):
- **SYSTEM_APIS.txt** - APIs النظام
  - GET /health - فحص صحة النظام
  - GET /api - معلومات الـ API

#### 📋 ملفات إضافية:
- **ALL_APIS.txt** - جميع الـ APIs في ملف واحد (18 API)
- **INDEX.txt** - فهرس المجلد
- **README.md** - هذا الملف

## 🌐 الـ Base URL
https://mahmoudapi-production.up.railway.app

## 📊 إحصائيات الـ APIs

### إجمالي الـ APIs: 18 API
- Authentication APIs: 2 APIs
- Content APIs: 3 APIs
- Request APIs: 4 APIs
- Dashboard & Admin APIs: 4 APIs
- Clients Management APIs: 3 APIs
- System APIs: 2 APIs

### تصنيف الـ APIs:
- **APIs عامة**: 11 APIs (لا تحتاج مصادقة)
- **APIs محمية**: 7 APIs (تحتاج JWT Token)

## 🔑 المصادقة

### JWT Token
جميع الـ APIs المحمية تحتاج إلى JWT Token في Header:
```
Authorization: Bearer JWT_TOKEN
```

### الحصول على Token
```bash
curl -X POST https://mahmoudapi-production.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 🧪 اختبار الـ APIs

### الطريقة الأولى (اختبار سريع):
```bash
curl https://mahmoudapi-production.up.railway.app/health
```

### الطريقة الثانية (script PowerShell):
```powershell
.\test-all-apis.ps1
```

### الطريقة الثالثة (موقع الاختبار التفاعلي):
```
https://mahmoudapi-production.up.railway.app
```

## 📱 أمثلة سريعة

### اختبار صحة النظام:
```bash
curl -X GET https://mahmoudapi-production.up.railway.app/health
```

### جلب الخدمات:
```bash
curl -X GET https://mahmoudapi-production.up.railway.app/services
```

### إرسال طلب تواصل:
```bash
curl -X POST https://mahmoudapi-production.up.railway.app/contact-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "+201234567890",
    "message": "أريد استشارة"
  }'
```

### تسجيل الدخول:
```bash
curl -X POST https://mahmoudapi-production.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### لوحة التحكم (مع Token):
```bash
curl -X GET https://mahmoudapi-production.up.railway.app/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Status Codes

### النجاح:
- `200` - OK
- `201` - Created

### أخطاء العميل:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error

### أخطاء الخادم:
- `500` - Internal Server Error
- `503` - Service Unavailable

## 🚀 الاستخدام السريع

### 1. اختبار النظام:
```bash
curl https://mahmoudapi-production.up.railway.app/health
```

### 2. جلب المحتوى:
```bash
curl https://mahmoudapi-production.up.railway.app/services
curl https://mahmoudapi-production.up.railway.app/portfolio
curl https://mahmoudapi-production.up.railway.app/news
```

### 3. إرسال طلب:
```bash
curl -X POST https://mahmoudapi-production.up.railway.app/contact-requests \
  -H "Content-Type: application/json" \
  -d '{"name": "أحمد", "email": "ahmed@example.com", "phone": "+201234567890", "message": "استشارة"}'
```

### 4. تسجيل الدخول والوصول للوحة التحكم:
```bash
# تسجيل الدخول
TOKEN=$(curl -s -X POST https://mahmoudapi-production.up.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | jq -r '.data.token')

# الوصول للوحة التحكم
curl -H "Authorization: Bearer $TOKEN" https://mahmoudapi-production.up.railway.app/dashboard
```

## 🎯 ملخص سريع

- **الـ Base URL**: https://mahmoudapi-production.up.railway.app
- **إجمالي الـ APIs**: 18 API
- **اختبار سريع**: `curl https://mahmoudapi-production.up.railway.app/health`
- **موقع الاختبار**: https://mahmoudapi-production.up.railway.app
- **script الاختبار**: `.\test-all-apis.ps1`

## 📁 الملفات المتاحة

### ملفات الـ APIs:
- `ALL_APIS.txt` - جميع الـ APIs في ملف واحد
- `AUTHENTICATION_APIS.txt` - APIs المصادقة
- `CONTENT_APIS.txt` - APIs المحتوى
- `REQUEST_APIS.txt` - APIs الطلبات
- `DASHBOARD_ADMIN_APIS.txt` - APIs لوحة التحكم والإدارة
- `CLIENTS_APIS.txt` - APIs إدارة العملاء
- `SYSTEM_APIS.txt` - APIs النظام

### ملفات إضافية:
- `INDEX.txt` - فهرس المجلد
- `README.md` - هذا الملف

## 🚀 جاهز للاستخدام!

جميع الـ APIs منظمة في ملفات منفصلة بنفس تنسيق `api.txt`! 🎉 