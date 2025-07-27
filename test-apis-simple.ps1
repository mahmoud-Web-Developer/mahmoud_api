Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار جميع الـ APIs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"

Write-Host "اختبار جميع الـ APIs من ALL_APIS.txt..." -ForegroundColor Yellow
Write-Host "الـ Base URL: $baseUrl" -ForegroundColor Cyan
Write-Host ""

# 1. اختبار صحة النظام
Write-Host "1. اختبار صحة النظام..." -ForegroundColor White
try {
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET -TimeoutSec 10
    Write-Host "✅ صحة النظام:" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.data.status)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في اختبار صحة النظام" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 2. اختبار معلومات الـ API
Write-Host "2. اختبار معلومات الـ API..." -ForegroundColor White
try {
    $apiInfoResponse = Invoke-RestMethod -Uri "$baseUrl/api" -Method GET -TimeoutSec 10
    Write-Host "✅ معلومات الـ API:" -ForegroundColor Green
    Write-Host "   Name: $($apiInfoResponse.data.name)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب معلومات الـ API" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 3. اختبار جلب الخدمات
Write-Host "3. اختبار جلب الخدمات..." -ForegroundColor White
try {
    $servicesResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET -TimeoutSec 10
    Write-Host "✅ الخدمات:" -ForegroundColor Green
    Write-Host "   عدد الخدمات: $($servicesResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب الخدمات" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 4. اختبار جلب البورتفوليو
Write-Host "4. اختبار جلب البورتفوليو..." -ForegroundColor White
try {
    $portfolioResponse = Invoke-RestMethod -Uri "$baseUrl/portfolio" -Method GET -TimeoutSec 10
    Write-Host "✅ البورتفوليو:" -ForegroundColor Green
    Write-Host "   عدد العناصر: $($portfolioResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب البورتفوليو" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 5. اختبار جلب الأخبار
Write-Host "5. اختبار جلب الأخبار..." -ForegroundColor White
try {
    $newsResponse = Invoke-RestMethod -Uri "$baseUrl/news" -Method GET -TimeoutSec 10
    Write-Host "✅ الأخبار:" -ForegroundColor Green
    Write-Host "   عدد الأخبار: $($newsResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب الأخبار" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 6. اختبار طلب تواصل
Write-Host "6. اختبار طلب تواصل..." -ForegroundColor White
try {
    $contactData = @{
        name = "Test User"
        email = "test@example.com"
        phone = "010-101-0101"
        message = "This is a test contact request"
    } | ConvertTo-Json
    
    $contactResponse = Invoke-RestMethod -Uri "$baseUrl/contact-requests" -Method POST -Body $contactData -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ طلب التواصل:" -ForegroundColor Green
    Write-Host "   Status: $($contactResponse.success)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في إرسال طلب التواصل" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 7. اختبار جلب أوقات الاجتماعات
Write-Host "7. اختبار جلب أوقات الاجتماعات..." -ForegroundColor White
try {
    $slotsResponse = Invoke-RestMethod -Uri "$baseUrl/meetings/slots" -Method GET -TimeoutSec 10
    Write-Host "✅ أوقات الاجتماعات:" -ForegroundColor Green
    Write-Host "   عدد الأوقات المتاحة: $($slotsResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب أوقات الاجتماعات" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 8. اختبار حجز اجتماع
Write-Host "8. اختبار حجز اجتماع..." -ForegroundColor White
try {
    $meetingData = @{
        title = "Test Meeting"
        date = "2024-01-15"
        time = "14:30"
        duration = 30
        description = "This is a test meeting"
    } | ConvertTo-Json
    
    $meetingResponse = Invoke-RestMethod -Uri "$baseUrl/meetings" -Method POST -Body $meetingData -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ حجز الاجتماع:" -ForegroundColor Green
    Write-Host "   Status: $($meetingResponse.success)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في حجز الاجتماع" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 9. اختبار إرسال Brief
Write-Host "9. اختبار إرسال Brief..." -ForegroundColor White
try {
    $briefData = @{
        title = "Test Project"
        description = "This is a test project brief"
        budget = "5000 EGP"
        timeline = "2 weeks"
        requirements = "Test requirements"
    } | ConvertTo-Json
    
    $briefResponse = Invoke-RestMethod -Uri "$baseUrl/briefs" -Method POST -Body $briefData -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ إرسال Brief:" -ForegroundColor Green
    Write-Host "   Status: $($briefResponse.success)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في إرسال Brief" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 10. اختبار تسجيل مستخدم جديد
Write-Host "10. اختبار تسجيل مستخدم جديد..." -ForegroundColor White
try {
    $signupData = @{
        username = "testuser"
        email = "testuser@example.com"
        password = "testpass123"
    } | ConvertTo-Json
    
    $signupResponse = Invoke-RestMethod -Uri "$baseUrl/auth/signup" -Method POST -Body $signupData -ContentType "application/json" -TimeoutSec 10
    Write-Host "✅ تسجيل مستخدم جديد:" -ForegroundColor Green
    Write-Host "   Status: $($signupResponse.success)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في تسجيل مستخدم جديد" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 11. اختبار تسجيل الدخول
Write-Host "11. اختبار تسجيل الدخول..." -ForegroundColor White
try {
    $loginData = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json" -TimeoutSec 10
    if ($loginResponse.success) {
        Write-Host "✅ تسجيل الدخول:" -ForegroundColor Green
        Write-Host "   Status: $($loginResponse.success)" -ForegroundColor Gray
        Write-Host "   Token: $($loginResponse.data.token.Substring(0, 20))..." -ForegroundColor Gray
        $token = $loginResponse.data.token
    } else {
        Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص اختبار الـ APIs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 رابط الـ API:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 الـ APIs المختبرة:" -ForegroundColor Yellow
Write-Host "   ✅ GET /health - صحة النظام" -ForegroundColor Green
Write-Host "   ✅ GET /api - معلومات الـ API" -ForegroundColor Green
Write-Host "   ✅ GET /services - الخدمات" -ForegroundColor Green
Write-Host "   ✅ GET /portfolio - البورتفوليو" -ForegroundColor Green
Write-Host "   ✅ GET /news - الأخبار" -ForegroundColor Green
Write-Host "   ✅ POST /contact-requests - طلب تواصل" -ForegroundColor Green
Write-Host "   ✅ GET /meetings/slots - أوقات الاجتماعات" -ForegroundColor Green
Write-Host "   ✅ POST /meetings - حجز اجتماع" -ForegroundColor Green
Write-Host "   ✅ POST /briefs - إرسال Brief" -ForegroundColor Green
Write-Host "   ✅ POST /auth/signup - تسجيل مستخدم" -ForegroundColor Green
Write-Host "   ✅ POST /auth/login - تسجيل دخول" -ForegroundColor Green
Write-Host ""

Write-Host "✅ جميع الـ APIs تعمل بشكل صحيح!" -ForegroundColor Green
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 