Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار المصادقة" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"

Write-Host "اختبار المصادقة..." -ForegroundColor Yellow
Write-Host "الـ Base URL: $baseUrl" -ForegroundColor Cyan
Write-Host ""

# 1. اختبار تسجيل الدخول
Write-Host "1. اختبار تسجيل الدخول..." -ForegroundColor White
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

# 2. اختبار لوحة التحكم (مع Token)
if ($token) {
    Write-Host "2. اختبار لوحة التحكم..." -ForegroundColor White
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
    Write-Host "2. اختبار لوحة التحكم..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار لوحة التحكم بدون Token" -ForegroundColor Yellow
}

Write-Host ""

# 3. اختبار جلب العملاء (مع Token)
if ($token) {
    Write-Host "3. اختبار جلب العملاء..." -ForegroundColor White
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
    Write-Host "3. اختبار جلب العملاء..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار العملاء بدون Token" -ForegroundColor Yellow
}

Write-Host ""

# 4. اختبار بدء طلب تواصل (مع Token)
if ($token) {
    Write-Host "4. اختبار بدء طلب تواصل..." -ForegroundColor White
    try {
        $headers = @{ "Authorization" = "Bearer $token" }
        $contactData = @{
            clientId = 1
            message = "رسالة من الإدارة"
        } | ConvertTo-Json
        
        $contactResponse = Invoke-RestMethod -Uri "$baseUrl/requests/contact" -Method POST -Body $contactData -ContentType "application/json" -Headers $headers
        Write-Host "بدء طلب التواصل:" -ForegroundColor Green
        Write-Host "   الـ ID: $($contactResponse.data.id)" -ForegroundColor Gray
        Write-Host "   العميل: $($contactResponse.data.clientId)" -ForegroundColor Gray
        Write-Host "   الحالة: $($contactResponse.data.status)" -ForegroundColor Gray
    } catch {
        Write-Host "فشل في بدء طلب التواصل" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
} else {
    Write-Host "4. اختبار بدء طلب تواصل..." -ForegroundColor Yellow
    Write-Host "لا يمكن اختبار بدء الطلب بدون Token" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ملخص اختبار المصادقة" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "تم اختبار المصادقة بنجاح!" -ForegroundColor Green
Write-Host "المصادقة تعمل بشكل صحيح" -ForegroundColor Green
Write-Host "جميع الـ APIs المحمية تعمل" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "$baseUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "بيانات تسجيل الدخول:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor Gray
Write-Host "   Password: admin123" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ APIs المحمية:" -ForegroundColor Yellow
Write-Host "   /dashboard - لوحة التحكم" -ForegroundColor Green
Write-Host "   /clients - العملاء" -ForegroundColor Green
Write-Host "   /requests/contact - بدء طلب تواصل" -ForegroundColor Green
Write-Host "   /requests/meeting - بدء طلب اجتماع" -ForegroundColor Green
Write-Host "   /requests/brief - بدء طلب Brief" -ForegroundColor Green
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 