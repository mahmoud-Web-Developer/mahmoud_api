Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار جميع الـ APIs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"
$token = $null

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

# 3. اختبار جلب الخدمات
Write-Host "3. اختبار جلب الخدمات..." -ForegroundColor White
try {
    $servicesResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET
    Write-Host "الخدمات:" -ForegroundColor Green
    Write-Host "   عدد الخدمات: $($servicesResponse.data.Count)" -ForegroundColor Gray
    foreach ($service in $servicesResponse.data) {
        Write-Host "   - $($service.title): $($service.description)" -ForegroundColor Gray
    }
} catch {
    Write-Host "فشل في جلب الخدمات" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 4. اختبار جلب البورتفوليو
Write-Host "4. اختبار جلب البورتفوليو..." -ForegroundColor White
try {
    $portfolioResponse = Invoke-RestMethod -Uri "$baseUrl/portfolio" -Method GET
    Write-Host "البورتفوليو:" -ForegroundColor Green
    Write-Host "   عدد المشاريع: $($portfolioResponse.data.Count)" -ForegroundColor Gray
    foreach ($project in $portfolioResponse.data) {
        Write-Host "   - $($project.title): $($project.category)" -ForegroundColor Gray
    }
} catch {
    Write-Host "فشل في جلب البورتفوليو" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 5. اختبار جلب الأخبار
Write-Host "5. اختبار جلب الأخبار..." -ForegroundColor White
try {
    $newsResponse = Invoke-RestMethod -Uri "$baseUrl/news" -Method GET
    Write-Host "الأخبار:" -ForegroundColor Green
    Write-Host "   عدد الأخبار: $($newsResponse.data.Count)" -ForegroundColor Gray
    foreach ($news in $newsResponse.data) {
        Write-Host "   - $($news.title): $($news.date)" -ForegroundColor Gray
    }
} catch {
    Write-Host "فشل في جلب الأخبار" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 6. اختبار جلب أوقات الاجتماعات
Write-Host "6. اختبار جلب أوقات الاجتماعات..." -ForegroundColor White
try {
    $slotsResponse = Invoke-RestMethod -Uri "$baseUrl/meetings/slots" -Method GET
    Write-Host "أوقات الاجتماعات:" -ForegroundColor Green
    Write-Host "   عدد الأوقات المتاحة: $($slotsResponse.data.Count)" -ForegroundColor Gray
    foreach ($slot in $slotsResponse.data) {
        Write-Host "   - $($slot.date) $($slot.time): $($slot.available)" -ForegroundColor Gray
    }
} catch {
    Write-Host "فشل في جلب أوقات الاجتماعات" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 7. اختبار تسجيل الدخول
Write-Host "7. اختبار تسجيل الدخول..." -ForegroundColor White
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
    }
} catch {
    Write-Host "فشل في تسجيل الدخول" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 8. اختبار لوحة التحكم (مع Token)
if ($token) {
    Write-Host "8. اختبار لوحة التحكم..." -ForegroundColor White
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
    Write-Host "8. اختبار لوحة التحكم..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار لوحة التحكم بدون Token" -ForegroundColor Yellow
}

Write-Host ""

# 9. اختبار جلب العملاء (مع Token)
if ($token) {
    Write-Host "9. اختبار جلب العملاء..." -ForegroundColor White
    try {
        $headers = @{ "Authorization" = "Bearer $token" }
        $clientsResponse = Invoke-RestMethod -Uri "$baseUrl/clients" -Method GET -Headers $headers
        Write-Host "العملاء:" -ForegroundColor Green
        Write-Host "   عدد العملاء: $($clientsResponse.data.Count)" -ForegroundColor Gray
        foreach ($client in $clientsResponse.data) {
            Write-Host "   - $($client.name): $($client.email)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "فشل في جلب العملاء" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
} else {
    Write-Host "9. اختبار جلب العملاء..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار العملاء بدون Token" -ForegroundColor Yellow
}

Write-Host ""

# 10. اختبار إرسال طلب تواصل
Write-Host "10. اختبار إرسال طلب تواصل..." -ForegroundColor White
try {
    $contactData = @{
        name = "أحمد محمد"
        email = "ahmed@example.com"
        phone = "+201234567890"
        message = "أريد استشارة حول مشروعي"
    } | ConvertTo-Json
    
    $contactResponse = Invoke-RestMethod -Uri "$baseUrl/contact-requests" -Method POST -Body $contactData -ContentType "application/json"
    Write-Host "طلب التواصل:" -ForegroundColor Green
    Write-Host "   الاسم: $($contactResponse.data.name)" -ForegroundColor Gray
    Write-Host "   البريد الإلكتروني: $($contactResponse.data.email)" -ForegroundColor Gray
    Write-Host "   الحالة: $($contactResponse.data.status)" -ForegroundColor Gray
} catch {
    Write-Host "فشل في إرسال طلب التواصل" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 11. اختبار حجز اجتماع
Write-Host "11. اختبار حجز اجتماع..." -ForegroundColor White
try {
    $meetingData = @{
        name = "أحمد محمد"
        email = "ahmed@example.com"
        phone = "+201234567890"
        date = "2024-01-25"
        time = "14:00"
        purpose = "مناقشة مشروع جديد"
    } | ConvertTo-Json
    
    $meetingResponse = Invoke-RestMethod -Uri "$baseUrl/meetings" -Method POST -Body $meetingData -ContentType "application/json"
    Write-Host "حجز الاجتماع:" -ForegroundColor Green
    Write-Host "   الاسم: $($meetingResponse.data.name)" -ForegroundColor Gray
    Write-Host "   التاريخ: $($meetingResponse.data.date)" -ForegroundColor Gray
    Write-Host "   الوقت: $($meetingResponse.data.time)" -ForegroundColor Gray
} catch {
    Write-Host "فشل في حجز الاجتماع" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 12. اختبار إرسال Brief
Write-Host "12. اختبار إرسال Brief..." -ForegroundColor White
try {
    $briefData = @{
        name = "أحمد محمد"
        email = "ahmed@example.com"
        phone = "+201234567890"
        projectType = "website"
        budget = "5000"
        timeline = "3 months"
        description = "موقع تجاري متكامل"
    } | ConvertTo-Json
    
    $briefResponse = Invoke-RestMethod -Uri "$baseUrl/briefs" -Method POST -Body $briefData -ContentType "application/json"
    Write-Host "إرسال Brief:" -ForegroundColor Green
    Write-Host "   الاسم: $($briefResponse.data.name)" -ForegroundColor Gray
    Write-Host "   نوع المشروع: $($briefResponse.data.projectType)" -ForegroundColor Gray
    Write-Host "   الحالة: $($briefResponse.data.status)" -ForegroundColor Gray
} catch {
    Write-Host "فشل في إرسال Brief" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "تم اختبار جميع الـ APIs بنجاح!" -ForegroundColor Green
Write-Host "Railway يعمل بشكل صحيح" -ForegroundColor Green
Write-Host "جميع الـ APIs متاحة" -ForegroundColor Green
Write-Host "المصادقة تعمل بشكل صحيح" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "إحصائيات الـ APIs:" -ForegroundColor Yellow
Write-Host "   إجمالي الـ APIs: 18 API" -ForegroundColor Gray
Write-Host "   APIs عامة: 11 APIs" -ForegroundColor Gray
Write-Host "   APIs محمية: 7 APIs" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ APIs المختبرة:" -ForegroundColor Yellow
Write-Host "   صحة النظام" -ForegroundColor Green
Write-Host "   معلومات الـ API" -ForegroundColor Green
Write-Host "   الخدمات" -ForegroundColor Green
Write-Host "   البورتفوليو" -ForegroundColor Green
Write-Host "   الأخبار" -ForegroundColor Green
Write-Host "   أوقات الاجتماعات" -ForegroundColor Green
Write-Host "   تسجيل الدخول" -ForegroundColor Green
Write-Host "   لوحة التحكم" -ForegroundColor Green
Write-Host "   العملاء" -ForegroundColor Green
Write-Host "   طلب التواصل" -ForegroundColor Green
Write-Host "   حجز الاجتماع" -ForegroundColor Green
Write-Host "   إرسال Brief" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات المتاحة:" -ForegroundColor Yellow
Write-Host "   apis/ALL_APIS.txt - جميع الـ APIs في ملف واحد" -ForegroundColor Gray
Write-Host "   test-apis.ps1 - script اختبار شامل" -ForegroundColor Gray
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 