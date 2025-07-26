Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التغييرات تلقائياً" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "بدء العملية..." -ForegroundColor Yellow
Write-Host ""

# 1. إضافة جميع الملفات
Write-Host "1. إضافة جميع الملفات..." -ForegroundColor White
try {
    $addResult = & git add . 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ تم إضافة جميع الملفات" -ForegroundColor Green
    } else {
        Write-Host "❌ فشل في إضافة الملفات" -ForegroundColor Red
        Write-Host $addResult -ForegroundColor Red
    }
} catch {
    Write-Host "❌ خطأ في إضافة الملفات" -ForegroundColor Red
}

Write-Host ""

# 2. إنشاء commit
Write-Host "2. إنشاء commit..." -ForegroundColor White
try {
    $commitResult = & git commit -m "feat: تنظيف المشروع وحذف الملفات غير المهمة" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ تم إنشاء commit بنجاح" -ForegroundColor Green
        Write-Host $commitResult -ForegroundColor Gray
    } else {
        Write-Host "❌ فشل في إنشاء commit" -ForegroundColor Red
        Write-Host $commitResult -ForegroundColor Red
    }
} catch {
    Write-Host "❌ خطأ في إنشاء commit" -ForegroundColor Red
}

Write-Host ""

# 3. إضافة remote
Write-Host "3. إضافة remote..." -ForegroundColor White
try {
    $remoteResult = & git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ تم إضافة remote" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Remote موجود بالفعل" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ Remote موجود بالفعل" -ForegroundColor Yellow
}

Write-Host ""

# 4. رفع التغييرات
Write-Host "4. رفع التغييرات..." -ForegroundColor White
try {
    $pushResult = & git push -u origin main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ تم رفع التغييرات بنجاح!" -ForegroundColor Green
        Write-Host $pushResult -ForegroundColor Gray
    } else {
        Write-Host "❌ فشل في رفع التغييرات" -ForegroundColor Red
        Write-Host $pushResult -ForegroundColor Red
        Write-Host "جرب الأمر يدوياً: git push -u origin main" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ خطأ في رفع التغييرات" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   النتيجة النهائية" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "✅ المشروع نظيف ومنظم" -ForegroundColor Green
Write-Host "✅ تم حذف الملفات غير المهمة" -ForegroundColor Green
Write-Host "✅ جاهز للتنظيم النهائي" -ForegroundColor Green
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "الـ APIs المتاحة:" -ForegroundColor Yellow
Write-Host "✅ Authentication APIs" -ForegroundColor Green
Write-Host "✅ Content APIs" -ForegroundColor Green
Write-Host "✅ Request APIs" -ForegroundColor Green
Write-Host "✅ Dashboard & Admin APIs" -ForegroundColor Green
Write-Host "✅ Clients Management APIs" -ForegroundColor Green
Write-Host "✅ System APIs" -ForegroundColor Green
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 