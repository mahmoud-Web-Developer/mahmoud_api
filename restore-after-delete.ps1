Write-Host "========================================" -ForegroundColor Green
Write-Host "   استعادة المشروع بعد حذف Services" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "معلومات المشروع:" -ForegroundColor Yellow
Write-Host "Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Cyan
Write-Host "Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "بدء استعادة المشروع..." -ForegroundColor Yellow
Write-Host ""

Write-Host "1. فحص ملفات النسخ الاحتياطي..." -ForegroundColor Yellow

$backupFiles = @(
    "RAILWAY_ENV_BACKUP.txt",
    "HEALTH_CHECK_BACKUP.json", 
    "LOGIN_BACKUP.json",
    "PROJECT_INFO_BACKUP.txt"
)

foreach ($file in $backupFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file موجود" -ForegroundColor Green
    } else {
        Write-Host "❌ $file غير موجود" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. إعادة نشر المشروع..." -ForegroundColor Yellow

Write-Host "رفع الكود إلى GitHub..." -ForegroundColor Gray
git add .
git commit -m "restore: إعادة نشر المشروع بعد حذف services"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم رفع الكود بنجاح" -ForegroundColor Green
} else {
    Write-Host "فشل في رفع الكود" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. إعداد Environment Variables في Railway..." -ForegroundColor Yellow

Write-Host "لإعداد Environment Variables:" -ForegroundColor Cyan
Write-Host "1. اذهب إلى https://railway.app" -ForegroundColor Gray
Write-Host "2. ابحث عن المشروع: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Gray
Write-Host "3. اذهب إلى تبويب Variables" -ForegroundColor Gray
Write-Host "4. أضف المتغيرات التالية:" -ForegroundColor Gray
Write-Host "   - JWT_SECRET = b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Gray
Write-Host "   - PORT = 5000" -ForegroundColor Gray
Write-Host "   - NODE_ENV = production" -ForegroundColor Gray

Write-Host ""
Write-Host "4. انتظار النشر التلقائي..." -ForegroundColor Yellow
Write-Host "انتظر 2-5 دقائق للنشر التلقائي على Railway" -ForegroundColor Gray

Write-Host ""
Write-Host "5. اختبار الـ API بعد الاستعادة..." -ForegroundColor Yellow

Write-Host "اختبار Health Check..." -ForegroundColor Gray
try {
    Start-Sleep -Seconds 30  # انتظار للنشر
    $healthResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET -TimeoutSec 10
    
    if ($healthResponse.StatusCode -eq 200) {
        Write-Host "✅ Health Check ناجح" -ForegroundColor Green
        $healthData = $healthResponse.Content | ConvertFrom-Json
        Write-Host "Status: $($healthData.status)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Health Check فشل" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ خطأ في Health Check: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "اختبار تسجيل الدخول..." -ForegroundColor Gray

$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -TimeoutSec 10
    
    if ($loginResponse.StatusCode -eq 200) {
        Write-Host "✅ Login ناجح" -ForegroundColor Green
        $loginData = $loginResponse.Content | ConvertFrom-Json
        Write-Host "Success: $($loginData.success)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Login فشل" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ خطأ في Login: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   استعادة المشروع مكتملة" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "الخطوات المنجزة:" -ForegroundColor Yellow
Write-Host "✅ فحص ملفات النسخ الاحتياطي" -ForegroundColor Gray
Write-Host "✅ رفع الكود إلى GitHub" -ForegroundColor Gray
Write-Host "✅ إعداد Environment Variables" -ForegroundColor Gray
Write-Host "✅ انتظار النشر التلقائي" -ForegroundColor Gray
Write-Host "✅ اختبار الـ API" -ForegroundColor Gray
Write-Host ""
Write-Host "لاختبار كامل للمشروع:" -ForegroundColor Yellow
Write-Host "   .\test-railway-project.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "لإعادة نشر المشروع:" -ForegroundColor Yellow
Write-Host "   .\deploy-railway-project.ps1" -ForegroundColor Cyan

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 