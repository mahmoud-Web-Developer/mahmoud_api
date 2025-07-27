Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار الـ Token الجديد" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Token المقدم:" -ForegroundColor Yellow
Write-Host "b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
Write-Host ""

Write-Host "اختبار تسجيل الدخول..." -ForegroundColor Yellow

$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    
    if ($loginResponse.StatusCode -eq 200) {
        $loginData = $loginResponse.Content | ConvertFrom-Json
        Write-Host "تم تسجيل الدخول بنجاح!" -ForegroundColor Green
        Write-Host "Token: $($loginData.data.token)" -ForegroundColor Cyan
        
        $token = $loginData.data.token
        
        Write-Host ""
        Write-Host "اختبار الـ Token مع Dashboard..." -ForegroundColor Yellow
        
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        
        $dashboardResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/dashboard" -Method GET -Headers $headers
        
        if ($dashboardResponse.StatusCode -eq 200) {
            Write-Host "تم الوصول إلى Dashboard بنجاح!" -ForegroundColor Green
            $dashboardData = $dashboardResponse.Content | ConvertFrom-Json
            Write-Host "Dashboard Data: $($dashboardData | ConvertTo-Json)" -ForegroundColor Gray
        } else {
            Write-Host "فشل في الوصول إلى Dashboard" -ForegroundColor Red
            Write-Host "Status: $($dashboardResponse.StatusCode)" -ForegroundColor Red
        }
        
    } else {
        Write-Host "فشل في تسجيل الدخول" -ForegroundColor Red
        Write-Host "Status: $($loginResponse.StatusCode)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في الاتصال:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "اختبار Health Check..." -ForegroundColor Yellow

try {
    $healthResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET
    
    if ($healthResponse.StatusCode -eq 200) {
        Write-Host "Health Check ناجح!" -ForegroundColor Green
        $healthData = $healthResponse.Content | ConvertFrom-Json
        Write-Host "Status: $($healthData.status)" -ForegroundColor Gray
        Write-Host "Message: $($healthData.message)" -ForegroundColor Gray
    } else {
        Write-Host "Health Check فشل" -ForegroundColor Red
        Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في Health Check:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "اختبار API Info..." -ForegroundColor Yellow

try {
    $apiResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/api" -Method GET
    
    if ($apiResponse.StatusCode -eq 200) {
        Write-Host "API Info ناجح!" -ForegroundColor Green
        $apiData = $apiResponse.Content | ConvertFrom-Json
        Write-Host "Name: $($apiData.name)" -ForegroundColor Gray
        Write-Host "Version: $($apiData.version)" -ForegroundColor Gray
        Write-Host "Status: $($apiData.status)" -ForegroundColor Gray
    } else {
        Write-Host "API Info فشل" -ForegroundColor Red
        Write-Host "Status: $($apiResponse.StatusCode)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في API Info:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "الـ Token الجديد:" -ForegroundColor Yellow
Write-Host "b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
Write-Host ""
Write-Host "الملفات المحدثة:" -ForegroundColor Yellow
Write-Host "- mahmoud_api/controllers/authController.js" -ForegroundColor Gray
Write-Host "- mahmoud_api/middleware/authMiddleware.js" -ForegroundColor Gray
Write-Host ""
Write-Host "لإعادة نشر التغييرات:" -ForegroundColor Yellow
Write-Host ".\redeploy-railway-api.ps1" -ForegroundColor Cyan

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 