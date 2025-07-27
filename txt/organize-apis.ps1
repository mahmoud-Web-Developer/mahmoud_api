Write-Host "========================================" -ForegroundColor Green
Write-Host "   تنظيم ملفات الـ APIs في مجلد" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "إنشاء مجلد APIs..." -ForegroundColor Yellow

# إنشاء مجلد APIs
if (!(Test-Path "apis")) {
    New-Item -ItemType Directory -Path "apis"
    Write-Host "✅ تم إنشاء مجلد: apis" -ForegroundColor Green
} else {
    Write-Host "⚠️ مجلد apis موجود بالفعل" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "نقل ملفات الـ APIs..." -ForegroundColor Yellow

# قائمة ملفات الـ APIs
$apiFiles = @(
    "APIS_LIST.txt",
    "API_GUIDE.txt",
    "APIS_LIST.txt",
    "API_COMPARISON.txt",
    "ALL_APIS_COMPLETE.txt",
    "APIS_QUICK_REFERENCE.txt",
    "API_TESTING_GUIDE.txt",
    "test-apis.ps1",
    "api.txt"
)

foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        Move-Item $file "apis\" -Force
        Write-Host "✅ تم نقل: $file إلى apis/" -ForegroundColor Green
    } else {
        Write-Host "⚠️ غير موجود: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "إنشاء ملف README للـ APIs..." -ForegroundColor Yellow

$readmeContent = @"
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

"@

Set-Content -Path "apis/README.md" -Value $readmeContent
Write-Host "✅ تم إنشاء README.md في مجلد apis/" -ForegroundColor Green

Write-Host ""
Write-Host "إنشاء ملف فهرس للـ APIs..." -ForegroundColor Yellow

$indexContent = @"
=======================================
   فهرس ملفات الـ APIs
=======================================

## 📁 مجلد APIs

### 📋 ملفات التوثيق:
1. **APIS_LIST.txt** - قائمة سريعة للـ APIs
2. **API_GUIDE.txt** - دليل مفصل للـ APIs
3. **ALL_APIS_COMPLETE.txt** - قائمة شاملة مفصلة
4. **APIS_QUICK_REFERENCE.txt** - مرجع سريع
5. **API_TESTING_GUIDE.txt** - دليل اختبار الـ APIs
6. **API_COMPARISON.txt** - مقارنة الـ APIs
7. **api.txt** - قائمة الـ APIs
8. **README.md** - دليل المجلد

### 🧪 ملفات الاختبار:
1. **test-apis.ps1** - script اختبار شامل

## 📊 إحصائيات الملفات

### إجمالي الملفات: 9 ملفات
- ملفات التوثيق: 8 ملفات
- ملفات الاختبار: 1 ملف

## 🎯 الاستخدام

### للوصول للتوثيق:
راجع أي من ملفات التوثيق للحصول على معلومات مفصلة

### لاختبار الـ APIs:
```powershell
cd apis
.\test-apis.ps1
```

### للوصول السريع:
راجع `APIS_QUICK_REFERENCE.txt` للحصول على مرجع سريع

=======================================
"@

Set-Content -Path "apis/INDEX.txt" -Value $indexContent
Write-Host "✅ تم إنشاء INDEX.txt في مجلد apis/" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   تم تنظيم ملفات الـ APIs بنجاح!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "الهيكل الجديد:" -ForegroundColor Yellow
Write-Host "📁 apis/" -ForegroundColor Green
Write-Host "  ├── README.md - دليل المجلد" -ForegroundColor Gray
Write-Host "  ├── INDEX.txt - فهرس الملفات" -ForegroundColor Gray
Write-Host "  ├── APIS_LIST.txt - قائمة سريعة" -ForegroundColor Gray
Write-Host "  ├── API_GUIDE.txt - دليل مفصل" -ForegroundColor Gray
Write-Host "  ├── ALL_APIS_COMPLETE.txt - قائمة شاملة" -ForegroundColor Gray
Write-Host "  ├── APIS_QUICK_REFERENCE.txt - مرجع سريع" -ForegroundColor Gray
Write-Host "  ├── API_TESTING_GUIDE.txt - دليل اختبار" -ForegroundColor Gray
Write-Host "  ├── API_COMPARISON.txt - مقارنة" -ForegroundColor Gray
Write-Host "  ├── api.txt - قائمة الـ APIs" -ForegroundColor Gray
Write-Host "  └── test-apis.ps1 - script اختبار" -ForegroundColor Gray
Write-Host ""

Write-Host "الخطوة التالية:" -ForegroundColor Yellow
Write-Host "1. رفع التغييرات إلى GitHub" -ForegroundColor White
Write-Host "2. Railway سيقوم بالنشر التلقائي" -ForegroundColor White
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 