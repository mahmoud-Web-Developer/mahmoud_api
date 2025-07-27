Write-Host "اختبار سريع للـ API..." -ForegroundColor Green

$baseUrl = "https://mahmoudapi-production.up.railway.app"

# اختبار صحة النظام
Write-Host "1. اختبار صحة النظام..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ صحة النظام: $($health.data.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في اختبار صحة النظام" -ForegroundColor Red
}

# اختبار تسجيل الدخول
Write-Host "2. اختبار تسجيل الدخول..." -ForegroundColor Yellow
try {
    $loginData = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json
    
    $login = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    if ($login.success) {
        Write-Host "✅ تسجيل الدخول ناجح" -ForegroundColor Green
        $token = $login.data.token
        Write-Host "Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
    } else {
        Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ فشل في تسجيل الدخول" -ForegroundColor Red
}

# اختبار لوحة التحكم
if ($token) {
    Write-Host "3. اختبار لوحة التحكم..." -ForegroundColor Yellow
    try {
        $headers = @{ "Authorization" = "Bearer $token" }
        $dashboard = Invoke-RestMethod -Uri "$baseUrl/dashboard" -Method GET -Headers $headers
        Write-Host "✅ لوحة التحكم تعمل" -ForegroundColor Green
    } catch {
        Write-Host "❌ فشل في الوصول للوحة التحكم" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "للاختبار التفاعلي:" -ForegroundColor Cyan
Write-Host "$baseUrl" -ForegroundColor White 