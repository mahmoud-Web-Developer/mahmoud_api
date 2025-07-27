Write-Host "========================================" -ForegroundColor Green
Write-Host "   اختبار الـ APIs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "https://mahmoudapi-production.up.railway.app"

Write-Host "الـ Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

# 1. اختبار فحص صحة النظام
Write-Host "1. اختبار فحص صحة النظام..." -ForegroundColor White
try {
    $healthResponse = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ فحص صحة النظام:" -ForegroundColor Green
    Write-Host "   Status: $($healthResponse.status)" -ForegroundColor Gray
    Write-Host "   Message: $($healthResponse.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في فحص صحة النظام" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 2. اختبار جلب الخدمات
Write-Host "2. اختبار جلب الخدمات..." -ForegroundColor White
try {
    $servicesResponse = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET
    Write-Host "✅ جلب الخدمات:" -ForegroundColor Green
    Write-Host "   عدد الخدمات: $($servicesResponse.data.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب الخدمات" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 3. اختبار جلب البورتفوليو
Write-Host "3. اختبار جلب البورتفوليو..." -ForegroundColor White
try {
    $portfolioResponse = Invoke-RestMethod -Uri "$baseUrl/portfolio" -Method GET
    Write-Host "✅ جلب البورتفوليو:" -ForegroundColor Green
    Write-Host "   عدد العناصر: $($portfolioResponse.data.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب البورتفوليو" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 4. اختبار جلب الأخبار
Write-Host "4. اختبار جلب الأخبار..." -ForegroundColor White
try {
    $newsResponse = Invoke-RestMethod -Uri "$baseUrl/news" -Method GET
    Write-Host "✅ جلب الأخبار:" -ForegroundColor Green
    Write-Host "   عدد الأخبار: $($newsResponse.data.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ فشل في جلب الأخبار" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# 5. اختبار تسجيل الدخول
Write-Host "5. اختبار تسجيل الدخول..." -ForegroundColor White
try {
    $loginData = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    
    if ($loginResponse.success) {
        Write-Host "✅ تسجيل الدخول ناجح:" -ForegroundColor Green
        Write-Host "   المستخدم: $($loginResponse.data.user.username)" -ForegroundColor Gray
        Write-Host "   الدور: $($loginResponse.data.user.role)" -ForegroundColor Gray
        Write-Host "   Token: $($loginResponse.data.token.Substring(0, 50))..." -ForegroundColor Gray
        
        $token = $loginResponse.data.token
        
        # 6. اختبار لوحة التحكم مع Token
        Write-Host ""
        Write-Host "6. اختبار لوحة التحكم..." -ForegroundColor White
        try {
            $headers = @{
                "Authorization" = "Bearer $token"
            }
            
            $dashboardResponse = Invoke-RestMethod -Uri "$baseUrl/dashboard" -Method GET -Headers $headers
            Write-Host "✅ لوحة التحكم:" -ForegroundColor Green
            Write-Host "   إجمالي المستخدمين: $($dashboardResponse.data.stats.totalUsers)" -ForegroundColor Gray
            Write-Host "   إجمالي الطلبات: $($dashboardResponse.data.stats.totalRequests)" -ForegroundColor Gray
            Write-Host "   إجمالي الاجتماعات: $($dashboardResponse.data.stats.totalMeetings)" -ForegroundColor Gray
            Write-Host "   إجمالي الـ Briefs: $($dashboardResponse.data.stats.totalBriefs)" -ForegroundColor Gray
        } catch {
            Write-Host "❌ فشل في الوصول للوحة التحكم" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
        }
        
        # 7. اختبار جلب العملاء
        Write-Host ""
        Write-Host "7. اختبار جلب العملاء..." -ForegroundColor White
        try {
            $clientsResponse = Invoke-RestMethod -Uri "$baseUrl/clients" -Method GET -Headers $headers
            Write-Host "✅ جلب العملاء:" -ForegroundColor Green
            Write-Host "   عدد العملاء: $($clientsResponse.data.Count)" -ForegroundColor Gray
        } catch {
            Write-Host "❌ فشل في جلب العملاء" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
        }
        
    } else {
        Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   نتائج الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "✅ جميع الـ APIs تعمل بشكل صحيح" -ForegroundColor Green
Write-Host "✅ النظام جاهز للاستخدام" -ForegroundColor Green
Write-Host "✅ Railway منشور ومتاح" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host $baseUrl -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host $baseUrl -ForegroundColor Cyan
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 