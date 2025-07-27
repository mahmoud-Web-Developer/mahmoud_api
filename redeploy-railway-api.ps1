Write-Host "========================================" -ForegroundColor Green
Write-Host "   إعادة نشر Railway API" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "فحص حالة المشروع..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "إضافة الملفات الجديدة..." -ForegroundColor Yellow
git add mahmoud_api/railway.json
git add mahmoud_api/Procfile
git add mahmoud_api/app.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم إضافة الملفات بنجاح" -ForegroundColor Green
} else {
    Write-Host "فشل في إضافة الملفات" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "إنشاء commit..." -ForegroundColor Yellow
git commit -m "fix: إصلاح Railway API - إضافة health check و railway.json"

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم إنشاء commit بنجاح" -ForegroundColor Green
} else {
    Write-Host "فشل في إنشاء commit" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "رفع التغييرات إلى GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم رفع التغييرات بنجاح!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   Railway API - إعادة النشر" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "الملفات المضافة:" -ForegroundColor Green
    Write-Host "   - mahmoud_api/railway.json" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/Procfile" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/app.js (محدث)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "التحسينات:" -ForegroundColor Green
    Write-Host "   - إضافة health check route" -ForegroundColor Gray
    Write-Host "   - إضافة API info route" -ForegroundColor Gray
    Write-Host "   - تحسين إعدادات Railway" -ForegroundColor Gray
    Write-Host ""
    Write-Host "انتظر 2-5 دقائق للنشر التلقائي على Railway" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "لاختبار الـ API بعد النشر:" -ForegroundColor Cyan
    Write-Host "   Invoke-WebRequest -Uri 'https://mahmoudapi-production.up.railway.app/health' -Method GET" -ForegroundColor Gray
} else {
    Write-Host "فشل في رفع التغييرات" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 