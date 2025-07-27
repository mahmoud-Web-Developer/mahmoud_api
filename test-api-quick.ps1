Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار سريع للـ API" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"

Write-Host "اختبار الاتصال بـ Railway API..." -ForegroundColor Yellow
Write-Host "الـ Base URL: $baseUrl" -ForegroundColor Cyan
Write-Host ""

# 1. اختبار صحة النظام
Write-Host "1. اختبار صحة النظام..." -ForegroundColor White
try {
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET -TimeoutSec 10
    Write-Host "✅ صحة النظام:" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.data.status)" -ForegroundColor Gray
    Write-Host "   Version: $($healthResponse.data.version)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في اختبار صحة النظام" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 2. اختبار جلب الخدمات
Write-Host "2. اختبار جلب الخدمات..." -ForegroundColor White
try {
    $servicesResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET -TimeoutSec 10
    Write-Host "✅ الخدمات:" -ForegroundColor Green
    Write-Host "   عدد الخدمات: $($servicesResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب الخدمات" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 3. اختبار جلب البورتفوليو
Write-Host "3. اختبار جلب البورتفوليو..." -ForegroundColor White
try {
    $portfolioResponse = Invoke-RestMethod -Uri "$baseUrl/portfolio" -Method GET -TimeoutSec 10
    Write-Host "✅ البورتفوليو:" -ForegroundColor Green
    Write-Host "   عدد العناصر: $($portfolioResponse.data.length)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب البورتفوليو" -ForegroundColor Red
    Write-Host "   الخطأ: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# 4. اختبار طلب تواصل
Write-Host "4. اختبار طلب تواصل..." -ForegroundColor White
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

Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 رابط الـ API:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 الـ APIs المتاحة:" -ForegroundColor Yellow
Write-Host "   GET /health - صحة النظام" -ForegroundColor Gray
Write-Host "   GET /services - الخدمات" -ForegroundColor Gray
Write-Host "   GET /portfolio - البورتفوليو" -ForegroundColor Gray
Write-Host "   GET /news - الأخبار" -ForegroundColor Gray
Write-Host "   POST /contact-requests - طلب تواصل" -ForegroundColor Gray
Write-Host "   POST /meetings - حجز اجتماع" -ForegroundColor Gray
Write-Host "   POST /briefs - إرسال Brief" -ForegroundColor Gray
Write-Host "   POST /auth/login - تسجيل دخول" -ForegroundColor Gray
Write-Host "   POST /auth/signup - تسجيل مستخدم جديد" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ الـ API جاهز للربط مع الموقع!" -ForegroundColor Green
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 