# 🚀 سكريبت إعادة النشر - The Flow API (PowerShell)
# هذا السكريبت يقوم بإعداد وإعادة نشر المشروع على Railway

Write-Host "🚀 بدء عملية إعادة النشر..." -ForegroundColor Green

# التحقق من وجود Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git غير مثبت. يرجى تثبيت Git أولاً." -ForegroundColor Red
    exit 1
}

# التحقق من وجود Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً." -ForegroundColor Red
    exit 1
}

# التحقق من وجود npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm غير مثبت. يرجى تثبيت npm أولاً." -ForegroundColor Red
    exit 1
}

Write-Host "✅ التحقق من المتطلبات الأساسية مكتمل" -ForegroundColor Green

# تثبيت التبعيات
Write-Host "📦 تثبيت التبعيات..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ فشل في تثبيت التبعيات" -ForegroundColor Red
    exit 1
}

Write-Host "✅ تم تثبيت التبعيات بنجاح" -ForegroundColor Green

# اختبار التطبيق محلياً
Write-Host "🧪 اختبار التطبيق محلياً..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Hidden
$serverProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Select-Object -First 1

# انتظار بدء الخادم
Start-Sleep -Seconds 5

# اختبار الاتصال
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ التطبيق يعمل محلياً بنجاح" -ForegroundColor Green
    } else {
        Write-Host "❌ فشل في تشغيل التطبيق محلياً" -ForegroundColor Red
        if ($serverProcess) { Stop-Process -Id $serverProcess.Id -Force }
        exit 1
    }
} catch {
    Write-Host "❌ فشل في تشغيل التطبيق محلياً" -ForegroundColor Red
    if ($serverProcess) { Stop-Process -Id $serverProcess.Id -Force }
    exit 1
}

# إيقاف الخادم المحلي
if ($serverProcess) {
    Stop-Process -Id $serverProcess.Id -Force
}

# إضافة التغييرات إلى Git
Write-Host "📝 إضافة التغييرات إلى Git..." -ForegroundColor Yellow
git add .

# عمل commit
Write-Host "💾 عمل commit..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Update for redeployment - $timestamp"

# رفع إلى GitHub
Write-Host "⬆️ رفع إلى GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ فشل في رفع الكود إلى GitHub" -ForegroundColor Red
    exit 1
}

Write-Host "✅ تم رفع الكود إلى GitHub بنجاح" -ForegroundColor Green

# التحقق من وجود Railway CLI
if (Get-Command railway -ErrorAction SilentlyContinue) {
    Write-Host "🚂 إعادة النشر باستخدام Railway CLI..." -ForegroundColor Yellow
    railway up
} else {
    Write-Host "ℹ️ Railway CLI غير مثبت. يرجى إعادة النشر يدوياً من Railway Dashboard" -ForegroundColor Yellow
    Write-Host "🔗 اذهب إلى: https://railway.app/dashboard" -ForegroundColor Cyan
}

Write-Host "🎉 عملية إعادة النشر مكتملة!" -ForegroundColor Green
Write-Host "📋 الخطوات التالية:" -ForegroundColor Cyan
Write-Host "1. انتظر حتى يكتمل النشر على Railway" -ForegroundColor White
Write-Host "2. تحقق من المتغيرات البيئية في Railway Dashboard" -ForegroundColor White
Write-Host "3. اختبر التطبيق باستخدام:" -ForegroundColor White
Write-Host "   curl https://your-railway-app.railway.app/health" -ForegroundColor Gray
Write-Host "4. Review Railway logs if you encounter any issues" -ForegroundColor White 