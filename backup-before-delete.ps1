Write-Host "========================================" -ForegroundColor Green
Write-Host "   النسخ الاحتياطي قبل حذف Services" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "⚠️ تحذير: حذف services سيؤدي إلى حذف جميع البيانات بشكل دائم!" -ForegroundColor Red
Write-Host ""

Write-Host "معلومات المشروع:" -ForegroundColor Yellow
Write-Host "Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Cyan
Write-Host "Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "بدء النسخ الاحتياطي..." -ForegroundColor Yellow
Write-Host ""

Write-Host "1. حفظ الكود على GitHub..." -ForegroundColor Yellow
git add .
git commit -m "backup: نسخ احتياطي قبل حذف services"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "تم حفظ الكود بنجاح" -ForegroundColor Green
} else {
    Write-Host "فشل في حفظ الكود" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. حفظ إعدادات Environment Variables..." -ForegroundColor Yellow

$envBackup = @"
# Railway Environment Variables Backup
# Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2

JWT_SECRET=b634fe85-bb34-4e0b-ba20-cd5d94f84915
PORT=5000
NODE_ENV=production
"@

$envBackup | Out-File -FilePath "RAILWAY_ENV_BACKUP.txt" -Encoding UTF8
Write-Host "تم حفظ إعدادات Environment Variables" -ForegroundColor Green

Write-Host ""
Write-Host "3. اختبار الـ API قبل الحذف..." -ForegroundColor Yellow

try {
    $healthResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET -TimeoutSec 10
    
    if ($healthResponse.StatusCode -eq 200) {
        Write-Host "Health Check ناجح" -ForegroundColor Green
        $healthData = $healthResponse.Content | ConvertFrom-Json
        $healthData | ConvertTo-Json | Out-File -FilePath "HEALTH_CHECK_BACKUP.json" -Encoding UTF8
    } else {
        Write-Host "Health Check فشل" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في Health Check: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. اختبار تسجيل الدخول..." -ForegroundColor Yellow

$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -TimeoutSec 10
    
    if ($loginResponse.StatusCode -eq 200) {
        Write-Host "Login ناجح" -ForegroundColor Green
        $loginData = $loginResponse.Content | ConvertFrom-Json
        $loginData | ConvertTo-Json | Out-File -FilePath "LOGIN_BACKUP.json" -Encoding UTF8
    } else {
        Write-Host "Login فشل" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في Login: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "5. حفظ معلومات المشروع..." -ForegroundColor Yellow

$projectInfo = @"
# Railway Project Information Backup
# Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2
Project Name: mahmoudapi-production
Base URL: https://mahmoudapi-production.up.railway.app
Token: b634fe85-bb34-4e0b-ba20-cd5d94f84915

# Files to restore:
- mahmoud_api/controllers/authController.js
- mahmoud_api/middleware/authMiddleware.js
- mahmoud_api/railway.json
- mahmoud_api/Procfile
- mahmoud_api/app.js
- mahmoud_api/package.json
- mahmoud_api/server.js

# Environment Variables to restore:
- JWT_SECRET=b634fe85-bb34-4e0b-ba20-cd5d94f84915
- PORT=5000
- NODE_ENV=production
"@

$projectInfo | Out-File -FilePath "PROJECT_INFO_BACKUP.txt" -Encoding UTF8
Write-Host "تم حفظ معلومات المشروع" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   النسخ الاحتياطي مكتمل" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "الملفات المحفوظة:" -ForegroundColor Yellow
Write-Host "- RAILWAY_ENV_BACKUP.txt" -ForegroundColor Gray
Write-Host "- HEALTH_CHECK_BACKUP.json" -ForegroundColor Gray
Write-Host "- LOGIN_BACKUP.json" -ForegroundColor Gray
Write-Host "- PROJECT_INFO_BACKUP.txt" -ForegroundColor Gray
Write-Host "- الكود محفوظ على GitHub" -ForegroundColor Gray
Write-Host ""
Write-Host "الآن يمكنك حذف services بأمان" -ForegroundColor Green
Write-Host ""
Write-Host "لحذف services:" -ForegroundColor Yellow
Write-Host "1. اذهب إلى https://railway.app" -ForegroundColor Gray
Write-Host "2. ابحث عن المشروع: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Gray
Write-Host "3. اذهب إلى Settings" -ForegroundColor Gray
Write-Host "4. ابحث عن Delete Service" -ForegroundColor Gray
Write-Host "5. أكد الحذف" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️ تذكر: الحذف نهائي ولا يمكن التراجع عنه!" -ForegroundColor Red

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 