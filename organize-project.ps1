Write-Host "تنظيم المشروع..." -ForegroundColor Green

# إنشاء مجلدات منظمة
Write-Host "إنشاء مجلدات..." -ForegroundColor Yellow

# مجلد التوثيق
New-Item -ItemType Directory -Path "docs" -Force
Write-Host "تم إنشاء مجلد docs" -ForegroundColor Green

# مجلد النشر
New-Item -ItemType Directory -Path "deploy" -Force
Write-Host "تم إنشاء مجلد deploy" -ForegroundColor Green

# مجلد الأدوات
New-Item -ItemType Directory -Path "tools" -Force
Write-Host "تم إنشاء مجلد tools" -ForegroundColor Green

# مجلد الصور
New-Item -ItemType Directory -Path "images" -Force
Write-Host "تم إنشاء مجلد images" -ForegroundColor Green

Write-Host "تم إنشاء جميع المجلدات بنجاح!" -ForegroundColor Green
Write-Host ""
Write-Host "الآن سيتم نقل الملفات إلى المجلدات المناسبة..." -ForegroundColor Yellow

Read-Host "اضغط Enter للمتابعة" 