Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع المشروع على GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "1. تهيئة Git..." -ForegroundColor Yellow
git init

Write-Host ""
Write-Host "2. إضافة جميع الملفات..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "3. إنشاء commit أولي..." -ForegroundColor Yellow
git commit -m "Initial commit: The Flow API - نظام API شامل ومتطور"

Write-Host ""
Write-Host "4. تغيير اسم الفرع إلى main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   تعليمات إكمال الرفع" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. اذهب إلى GitHub.com" -ForegroundColor White
Write-Host "2. أنشئ repository جديد" -ForegroundColor White
Write-Host "3. انسخ رابط الـ repository" -ForegroundColor White
Write-Host "4. شغل الأوامر التالية:" -ForegroundColor White
Write-Host ""
Write-Host "git remote add origin YOUR_REPOSITORY_URL" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   مثال:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "git remote add origin https://github.com/username/the-flow-api.git" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 