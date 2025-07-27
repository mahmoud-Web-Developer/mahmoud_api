Write-Host "========================================" -ForegroundColor Green
Write-Host "   إعادة نشر Railway API مع الـ Token الجديد" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Token المقدم:" -ForegroundColor Yellow
Write-Host "b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
Write-Host ""

Write-Host "فحص حالة المشروع..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "إضافة الملفات المحدثة..." -ForegroundColor Yellow
git add mahmoud_api/controllers/authController.js
git add mahmoud_api/middleware/authMiddleware.js
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
git commit -m "feat: إضافة الـ Token الجديد وإصلاح Railway API"

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
    Write-Host "   Railway API - إعادة النشر مع الـ Token" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "الـ Token الجديد:" -ForegroundColor Green
    Write-Host "b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "الملفات المحدثة:" -ForegroundColor Green
    Write-Host "   - mahmoud_api/controllers/authController.js" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/middleware/authMiddleware.js" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/railway.json" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/Procfile" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/app.js" -ForegroundColor Gray
    Write-Host ""
    Write-Host "التحسينات:" -ForegroundColor Green
    Write-Host "   - إضافة الـ Token الجديد" -ForegroundColor Gray
    Write-Host "   - إضافة health check route" -ForegroundColor Gray
    Write-Host "   - إضافة API info route" -ForegroundColor Gray
    Write-Host "   - تحسين إعدادات Railway" -ForegroundColor Gray
    Write-Host ""
    Write-Host "انتظر 2-5 دقائق للنشر التلقائي على Railway" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "لاختبار الـ API بعد النشر:" -ForegroundColor Cyan
    Write-Host "   .\test-token.ps1" -ForegroundColor Gray
    Write-Host ""
    Write-Host "لإضافة Environment Variables في Railway:" -ForegroundColor Cyan
    Write-Host "   - اذهب إلى Railway Dashboard" -ForegroundColor Gray
    Write-Host "   - أضف JWT_SECRET = b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Gray
} else {
    Write-Host "فشل في رفع التغييرات" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 