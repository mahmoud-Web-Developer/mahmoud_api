# APIs Documentation

## 📁 محتويات المجلد

### 📋 ملفات التوثيق:
- **APIS_LIST.txt** - قائمة سريعة للـ APIs
- **API_GUIDE.txt** - دليل مفصل للـ APIs
- **ALL_APIS_COMPLETE.txt** - قائمة شاملة مفصلة
- **APIS_QUICK_REFERENCE.txt** - مرجع سريع
- **API_TESTING_GUIDE.txt** - دليل اختبار الـ APIs
- **API_COMPARISON.txt** - مقارنة الـ APIs
- **api.txt** - قائمة الـ APIs

### 🧪 ملفات الاختبار:
- **test-apis.ps1** - script اختبار شامل

## 🌐 الـ Base URL
https://mahmoudapi-production.up.railway.app

## 📊 إحصائيات الـ APIs

### إجمالي الـ APIs: 18 API
- **Authentication APIs**: 2 APIs
- **Content APIs**: 3 APIs
- **Request APIs**: 4 APIs
- **Dashboard & Admin APIs**: 4 APIs
- **Clients Management APIs**: 3 APIs
- **System APIs**: 2 APIs

### تصنيف الـ APIs:
- **APIs عامة**: 10 APIs (لا تحتاج مصادقة)
- **APIs محمية**: 8 APIs (تحتاج JWT Token)

## 🔑 المصادقة

### JWT Token
```
Authorization: Bearer JWT_TOKEN
```

### الأدوار المتاحة:
- **user**: مستخدم عادي
- **admin**: مدير النظام

## 🧪 اختبار الـ APIs

### الطريقة الأولى (Script PowerShell):
```powershell
.\test-apis.ps1
```

### الطريقة الثانية (PowerShell مباشر):
```powershell
Invoke-RestMethod -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET
```

### الطريقة الثالثة (موقع الاختبار التفاعلي):
```
https://mahmoudapi-production.up.railway.app
```

## 📋 قائمة سريعة للـ APIs

### 🔐 Authentication APIs
- `POST /auth/signup` - تسجيل مستخدم جديد
- `POST /auth/login` - تسجيل الدخول

### 📄 Content APIs
- `GET /services` - جلب الخدمات
- `GET /portfolio` - جلب البورتفوليو
- `GET /news` - جلب الأخبار

### 📝 Request APIs
- `POST /contact-requests` - إرسال طلب تواصل
- `GET /meetings/slots` - أوقات الاجتماعات
- `POST /meetings` - حجز اجتماع
- `POST /briefs` - إرسال Brief

### 🎛️ Dashboard & Admin APIs
- `GET /dashboard` - لوحة التحكم
- `POST /requests/contact` - طلب تواصل
- `POST /requests/meeting` - طلب اجتماع
- `POST /requests/brief` - طلب Brief

### 👥 Clients Management APIs
- `POST /clients` - إضافة عميل
- `GET /clients` - جلب العملاء
- `GET /clients/:id` - جلب عميل محدد

### 🔧 System APIs
- `GET /health` - فحص صحة النظام
- `GET /api` - معلومات الـ API

## 🎯 أمثلة سريعة

### تسجيل الدخول:
```powershell
$loginData = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://mahmoudapi-production.up.railway.app/auth/login" -Method POST -Body $loginData -ContentType "application/json"
```

### جلب الخدمات:
```powershell
Invoke-RestMethod -Uri "https://mahmoudapi-production.up.railway.app/services" -Method GET
```

### فحص صحة النظام:
```powershell
Invoke-RestMethod -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET
```

## 📱 موقع الاختبار التفاعلي
https://mahmoudapi-production.up.railway.app 