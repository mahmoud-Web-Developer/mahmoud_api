Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار مشروع Railway" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "معلومات المشروع:" -ForegroundColor Yellow
Write-Host "Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Cyan
Write-Host "Token: b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Cyan
Write-Host "Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "اختبار Health Check..." -ForegroundColor Yellow

try {
    $healthResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/health" -Method GET -TimeoutSec 10
    
    if ($healthResponse.StatusCode -eq 200) {
        Write-Host "Health Check ناجح!" -ForegroundColor Green
        $healthData = $healthResponse.Content | ConvertFrom-Json
        Write-Host "Status: $($healthData.status)" -ForegroundColor Gray
        Write-Host "Message: $($healthData.message)" -ForegroundColor Gray
        Write-Host "Timestamp: $($healthData.timestamp)" -ForegroundColor Gray
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
    $apiResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/api" -Method GET -TimeoutSec 10
    
    if ($apiResponse.StatusCode -eq 200) {
        Write-Host "API Info ناجح!" -ForegroundColor Green
        $apiData = $apiResponse.Content | ConvertFrom-Json
        Write-Host "Name: $($apiData.name)" -ForegroundColor Gray
        Write-Host "Version: $($apiData.version)" -ForegroundColor Gray
        Write-Host "Status: $($apiData.status)" -ForegroundColor Gray
        Write-Host "Endpoints: $($apiData.endpoints.Count) endpoints" -ForegroundColor Gray
    } else {
        Write-Host "API Info فشل" -ForegroundColor Red
        Write-Host "Status: $($apiResponse.StatusCode)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في API Info:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "اختبار تسجيل الدخول..." -ForegroundColor Yellow

$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -TimeoutSec 10
    
    if ($loginResponse.StatusCode -eq 200) {
        $loginData = $loginResponse.Content | ConvertFrom-Json
        Write-Host "تم تسجيل الدخول بنجاح!" -ForegroundColor Green
        Write-Host "Success: $($loginData.success)" -ForegroundColor Gray
        Write-Host "Message: $($loginData.message)" -ForegroundColor Gray
        
        if ($loginData.data.token) {
            $token = $loginData.data.token
            Write-Host "Token: $($token.Substring(0, 50))..." -ForegroundColor Cyan
            
            Write-Host ""
            Write-Host "اختبار الـ Token مع Dashboard..." -ForegroundColor Yellow
            
            $headers = @{
                "Authorization" = "Bearer $token"
            }
            
            $dashboardResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/dashboard" -Method GET -Headers $headers -TimeoutSec 10
            
            if ($dashboardResponse.StatusCode -eq 200) {
                Write-Host "تم الوصول إلى Dashboard بنجاح!" -ForegroundColor Green
                $dashboardData = $dashboardResponse.Content | ConvertFrom-Json
                Write-Host "Dashboard Data: $($dashboardData | ConvertTo-Json)" -ForegroundColor Gray
            } else {
                Write-Host "فشل في الوصول إلى Dashboard" -ForegroundColor Red
                Write-Host "Status: $($dashboardResponse.StatusCode)" -ForegroundColor Red
            }
        }
        
    } else {
        Write-Host "فشل في تسجيل الدخول" -ForegroundColor Red
        Write-Host "Status: $($loginResponse.StatusCode)" -ForegroundColor Red
        $errorData = $loginResponse.Content | ConvertFrom-Json
        Write-Host "Error: $($errorData.message)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في تسجيل الدخول:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "اختبار Services..." -ForegroundColor Yellow

try {
    $servicesResponse = Invoke-WebRequest -Uri "https://mahmoudapi-production.up.railway.app/services" -Method GET -TimeoutSec 10
    
    if ($servicesResponse.StatusCode -eq 200) {
        Write-Host "Services ناجح!" -ForegroundColor Green
        $servicesData = $servicesResponse.Content | ConvertFrom-Json
        Write-Host "Services Count: $($servicesData.data.Count)" -ForegroundColor Gray
    } else {
        Write-Host "Services فشل" -ForegroundColor Red
        Write-Host "Status: $($servicesResponse.StatusCode)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "خطأ في Services:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص اختبار المشروع" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "معلومات المشروع:" -ForegroundColor Yellow
Write-Host "   Project ID: 2c10597b-66e9-434a-8152-ea2c706ac3e2" -ForegroundColor Gray
Write-Host "   Token: b634fe85-bb34-4e0b-ba20-cd5d94f84915" -ForegroundColor Gray
Write-Host "   Base URL: https://mahmoudapi-production.up.railway.app" -ForegroundColor Gray
Write-Host ""
Write-Host "الاختبارات المنجزة:" -ForegroundColor Yellow
Write-Host "   - Health Check" -ForegroundColor Gray
Write-Host "   - API Info" -ForegroundColor Gray
Write-Host "   - Login" -ForegroundColor Gray
Write-Host "   - Dashboard Access" -ForegroundColor Gray
Write-Host "   - Services" -ForegroundColor Gray
Write-Host ""
Write-Host "لإعادة نشر المشروع:" -ForegroundColor Yellow
Write-Host "   .\deploy-railway-project.ps1" -ForegroundColor Cyan

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 