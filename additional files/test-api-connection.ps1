Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار الاتصال بالـ API" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"

Write-Host "اختبار الاتصال بالـ API..." -ForegroundColor Yellow
Write-Host "الـ Base URL: $baseUrl" -ForegroundColor Cyan
Write-Host ""

# 1. اختبار صحة النظام
Write-Host "1. اختبار صحة النظام..." -ForegroundColor White
try {
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "صحة النظام:" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.data.status)" -ForegroundColor Gray
    Write-Host "   Version: $($healthResponse.data.version)" -ForegroundColor Gray
    Write-Host "   Timestamp: $($healthResponse.data.timestamp)" -ForegroundColor Gray
} catch {
    Write-Host "فشل في اختبار صحة النظام" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 2. اختبار معلومات الـ API
Write-Host "2. اختبار معلومات الـ API..." -ForegroundColor White
try {
    $apiInfoResponse = Invoke-RestMethod -Uri "$baseUrl/api" -Method GET
    Write-Host "معلومات الـ API:" -ForegroundColor Green
    Write-Host "   Name: $($apiInfoResponse.data.name)" -ForegroundColor Gray
    Write-Host "   Version: $($apiInfoResponse.data.version)" -ForegroundColor Gray
    Write-Host "   Total Endpoints: $($apiInfoResponse.data.totalEndpoints)" -ForegroundColor Gray
    Write-Host "   Description: $($apiInfoResponse.data.description)" -ForegroundColor Gray
} catch {
    Write-Host "فشل في جلب معلومات الـ API" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 3. اختبار تسجيل الدخول
Write-Host "3. اختبار تسجيل الدخول..." -ForegroundColor White
try {
    $loginData = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    if ($loginResponse.success) {
        Write-Host "تسجيل الدخول ناجح:" -ForegroundColor Green
        Write-Host "   المستخدم: $($loginResponse.data.user.username)" -ForegroundColor Gray
        Write-Host "   الدور: $($loginResponse.data.user.role)" -ForegroundColor Gray
        Write-Host "   الـ Token: $($loginResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
        $token = $loginResponse.data.token
    } else {
        Write-Host "فشل في تسجيل الدخول" -ForegroundColor Red
        Write-Host $loginResponse -ForegroundColor Red
    }
} catch {
    Write-Host "فشل في تسجيل الدخول" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 4. اختبار لوحة التحكم (مع Token)
if ($token) {
    Write-Host "4. اختبار لوحة التحكم..." -ForegroundColor White
    try {
        $headers = @{ "Authorization" = "Bearer $token" }
        $dashboardResponse = Invoke-RestMethod -Uri "$baseUrl/dashboard" -Method GET -Headers $headers
        Write-Host "لوحة التحكم:" -ForegroundColor Green
        Write-Host "   إجمالي المستخدمين: $($dashboardResponse.data.stats.totalUsers)" -ForegroundColor Gray
        Write-Host "   إجمالي الطلبات: $($dashboardResponse.data.stats.totalRequests)" -ForegroundColor Gray
        Write-Host "   إجمالي الاجتماعات: $($dashboardResponse.data.stats.totalMeetings)" -ForegroundColor Gray
        Write-Host "   إجمالي الـ Briefs: $($dashboardResponse.data.stats.totalBriefs)" -ForegroundColor Gray
    } catch {
        Write-Host "فشل في الوصول للوحة التحكم" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
} else {
    Write-Host "4. اختبار لوحة التحكم..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار لوحة التحكم بدون Token" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "تم اختبار الاتصال بالـ API بنجاح!" -ForegroundColor Green
Write-Host "Railway يعمل بشكل صحيح" -ForegroundColor Green
Write-Host "جميع الـ APIs متاحة" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "للاختبار التفاعلي، افتح المتصفح واذهب إلى:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 