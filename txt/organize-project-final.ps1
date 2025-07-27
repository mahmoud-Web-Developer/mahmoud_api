Write-Host "========================================" -ForegroundColor Green
Write-Host "   تنظيم ملفات المشروع" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "إنشاء المجلدات الجديدة..." -ForegroundColor Yellow

# إنشاء مجلدات التنظيم
$folders = @(
    "docs",
    "scripts", 
    "deploy",
    "assets",
    "config",
    "backup"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder
        Write-Host "✅ تم إنشاء مجلد: $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الملفات إلى المجلدات المناسبة..." -ForegroundColor Yellow

# نقل ملفات التوثيق
$docsFiles = @(
    "README.txt",
    "API_GUIDE.txt", 
    "APIS_LIST.txt",
    "API_COMPARISON.txt",
    "RAILWAY_APIS.txt",
    "railway-deploy.md"
)

foreach ($file in $docsFiles) {
    if (Test-Path $file) {
        Move-Item $file "docs\" -Force
        Write-Host "✅ تم نقل: $file إلى docs/" -ForegroundColor Green
    }
}

# نقل ملفات النشر
$deployFiles = @(
    "railway.json",
    "vercel.json",
    "render.yaml",
    "app.json",
    "Procfile",
    ".dockerignore"
)

foreach ($file in $deployFiles) {
    if (Test-Path $file) {
        Move-Item $file "deploy\" -Force
        Write-Host "✅ تم نقل: $file إلى deploy/" -ForegroundColor Green
    }
}

# نقل الـ scripts
$scriptFiles = @(
    "*.ps1",
    "*.bat"
)

foreach ($pattern in $scriptFiles) {
    Get-ChildItem -Path $pattern | ForEach-Object {
        if ($_.Name -notlike "*organize*") {
            Move-Item $_.FullName "scripts\" -Force
            Write-Host "✅ تم نقل: $($_.Name) إلى scripts/" -ForegroundColor Green
        }
    }
}

# نقل ملفات التكوين
$configFiles = @(
    "env.example",
    ".gitignore",
    "package.json",
    "package-lock.json"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Move-Item $file "config\" -Force
        Write-Host "✅ تم نقل: $file إلى config/" -ForegroundColor Green
    }
}

# نقل الصور
$imageFiles = @(
    "*.jpg",
    "*.png",
    "*.gif"
)

foreach ($pattern in $imageFiles) {
    Get-ChildItem -Path $pattern | ForEach-Object {
        Move-Item $_.FullName "assets\" -Force
        Write-Host "✅ تم نقل: $($_.Name) إلى assets/" -ForegroundColor Green
    }
}

# نقل ملفات أخرى
$otherFiles = @(
    "api.txt",
    "LICENSE"
)

foreach ($file in $otherFiles) {
    if (Test-Path $file) {
        Move-Item $file "docs\" -Force
        Write-Host "✅ تم نقل: $file إلى docs/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "تنظيم المجلدات الموجودة..." -ForegroundColor Yellow

# نقل المجلدات إلى src
$srcFolders = @(
    "controllers",
    "routes", 
    "middleware",
    "data",
    "utils",
    "models"
)

foreach ($folder in $srcFolders) {
    if (Test-Path $folder) {
        if (!(Test-Path "src")) {
            New-Item -ItemType Directory -Path "src"
        }
        Move-Item $folder "src\" -Force
        Write-Host "✅ تم نقل مجلد: $folder إلى src/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "إنشاء ملف README جديد..." -ForegroundColor Yellow

$readmeContent = @"
# The Flow API

## نظرة عامة
مشروع API شامل مع نظام مصادقة متقدم، لوحة تحكم قوية، وموقع اختبار تفاعلي.

## هيكل المشروع

### 📁 المجلدات الرئيسية
- **src/** - الكود المصدري
  - controllers/ - وحدات التحكم
  - routes/ - مسارات الـ API
  - middleware/ - الوسائط البرمجية
  - data/ - البيانات
  - utils/ - الأدوات المساعدة
  - models/ - النماذج

- **public/** - الملفات العامة
  - index.html - موقع الاختبار

- **docs/** - التوثيق
  - API_GUIDE.txt - دليل الـ APIs
  - APIS_LIST.txt - قائمة الـ APIs
  - README.txt - دليل المشروع

- **scripts/** - النصوص البرمجية
  - *.ps1 - PowerShell scripts
  - *.bat - Batch scripts

- **deploy/** - ملفات النشر
  - railway.json - إعدادات Railway
  - vercel.json - إعدادات Vercel
  - render.yaml - إعدادات Render

- **config/** - ملفات التكوين
  - package.json - إعدادات المشروع
  - env.example - متغيرات البيئة

- **assets/** - الملفات الوسائطية
  - *.jpg, *.png - الصور

## الميزات

### ✅ Authentication APIs
- تسجيل مستخدم جديد
- تسجيل الدخول
- تجديد الـ token

### ✅ Content APIs  
- الخدمات
- البورتفوليو
- الأخبار

### ✅ Request APIs
- طلبات التواصل
- حجز الاجتماعات
- إرسال Briefs

### ✅ Dashboard & Admin APIs
- لوحة التحكم
- إدارة المستخدمين
- إحصائيات النظام

### ✅ Clients Management APIs
- إدارة العملاء
- CRUD operations

## التشغيل

### التطوير المحلي
```bash
npm install
npm start
```

### النشر على Railway
```bash
# Railway سيقوم بالنشر التلقائي من GitHub
```

## الـ Base URL
https://mahmoudapi-production.up.railway.app

## التوثيق
راجع مجلد `docs/` للحصول على توثيق مفصل.

## النصوص البرمجية
راجع مجلد `scripts/` للحصول على نصوص برمجية مفيدة.

"@

Set-Content -Path "README.md" -Value $readmeContent
Write-Host "✅ تم إنشاء README.md" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   تم تنظيم المشروع بنجاح!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "الهيكل الجديد:" -ForegroundColor Yellow
Write-Host "📁 src/ - الكود المصدري" -ForegroundColor Green
Write-Host "📁 public/ - الملفات العامة" -ForegroundColor Green
Write-Host "📁 docs/ - التوثيق" -ForegroundColor Green
Write-Host "📁 scripts/ - النصوص البرمجية" -ForegroundColor Green
Write-Host "📁 deploy/ - ملفات النشر" -ForegroundColor Green
Write-Host "📁 config/ - ملفات التكوين" -ForegroundColor Green
Write-Host "📁 assets/ - الملفات الوسائطية" -ForegroundColor Green
Write-Host "📁 backup/ - النسخ الاحتياطية" -ForegroundColor Green

Write-Host ""
Write-Host "الخطوة التالية:" -ForegroundColor Yellow
Write-Host "1. رفع التغييرات إلى GitHub" -ForegroundColor White
Write-Host "2. Railway سيقوم بالنشر التلقائي" -ForegroundColor White
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 