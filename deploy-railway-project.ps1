Write-Host "========================================" -ForegroundColor Green
Write-Host "   إعادة نشر مشروع Railway" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "معلومات المشروع:" -ForegroundColor Yellow
Write-Host "Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Cyan
Write-Host "Token: b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
Write-Host "Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "فحص حالة المشروع..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "إضافة جميع الملفات المحدثة..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم إضافة الملفات بنجاح" -ForegroundColor Green
} else {
    Write-Host "فشل في إضافة الملفات" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "إنشاء commit..." -ForegroundColor Yellow
git commit -m "feat: إعادة نشر مشروع Railway مع Project ID و Token الجديد"

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
    Write-Host "   Railway Project - إعادة النشر" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "معلومات المشروع:" -ForegroundColor Green
    Write-Host "   Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Gray
    Write-Host "   Token: b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Gray
    Write-Host "   Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Gray
    Write-Host ""
    Write-Host "الملفات المحدثة:" -ForegroundColor Green
    Write-Host "   - mahmoud_api/controllers/authController.js" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/middleware/authMiddleware.js" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/railway.json" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/Procfile" -ForegroundColor Gray
    Write-Host "   - mahmoud_api/app.js" -ForegroundColor Gray
    Write-Host "   - RAILWAY_PROJECT_INFO.txt" -ForegroundColor Gray
    Write-Host ""
    Write-Host "التحسينات:" -ForegroundColor Green
    Write-Host "   - إضافة Project ID" -ForegroundColor Gray
    Write-Host "   - إضافة Token الجديد" -ForegroundColor Gray
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
    Write-Host "   1. اذهب إلى https://railway.app" -ForegroundColor Gray
    Write-Host "   2. ابحث عن المشروع: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Gray
    Write-Host "   3. اذهب إلى تبويب Variables" -ForegroundColor Gray
    Write-Host "   4. أضف JWT_SECRET = b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Gray
} else {
    Write-Host "فشل في رفع التغييرات" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 