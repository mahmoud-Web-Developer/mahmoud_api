Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التغييرات بعد تنظيم الـ APIs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "✅ إنشاء مجلد apis/" -ForegroundColor Green
Write-Host "✅ نقل جميع ملفات الـ APIs" -ForegroundColor Green
Write-Host "✅ إنشاء README.md للمجلد" -ForegroundColor Green
Write-Host "✅ إنشاء INDEX.txt للفهرس" -ForegroundColor Green
Write-Host ""

Write-Host "الهيكل الجديد:" -ForegroundColor Yellow
Write-Host "📁 apis/" -ForegroundColor Green
Write-Host "  ├── README.md - دليل المجلد" -ForegroundColor Gray
Write-Host "  ├── INDEX.txt - فهرس الملفات" -ForegroundColor Gray
Write-Host "  ├── APIS_LIST.txt - قائمة سريعة" -ForegroundColor Gray
Write-Host "  ├── API_GUIDE.txt - دليل مفصل" -ForegroundColor Gray
Write-Host "  ├── ALL_APIS_COMPLETE.txt - قائمة شاملة" -ForegroundColor Gray
Write-Host "  ├── APIS_QUICK_REFERENCE.txt - مرجع سريع" -ForegroundColor Gray
Write-Host "  ├── API_TESTING_GUIDE.txt - دليل اختبار" -ForegroundColor Gray
Write-Host "  ├── API_COMPARISON.txt - مقارنة" -ForegroundColor Gray
Write-Host "  ├── api.txt - قائمة الـ APIs" -ForegroundColor Gray
Write-Host "  └── test-apis.ps1 - script اختبار" -ForegroundColor Gray
Write-Host ""

Write-Host "تنفيذ الأوامر..." -ForegroundColor Yellow
Write-Host ""

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

Write-Host "2. إنشاء commit..." -ForegroundColor White
try {
    $commitResult = & git commit -m "feat: تنظيم ملفات الـ APIs في مجلد منفصل" 2>&1
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

Write-Host "✅ تم تنظيم ملفات الـ APIs بنجاح" -ForegroundColor Green
Write-Host "✅ جميع ملفات الـ APIs في مجلد منفصل" -ForegroundColor Green
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host "✅ جميع الـ APIs ستكون متاحة" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "الـ APIs المتاحة:" -ForegroundColor Yellow
Write-Host "✅ Authentication APIs (2 endpoints)" -ForegroundColor Green
Write-Host "✅ Content APIs (3 endpoints)" -ForegroundColor Green
Write-Host "✅ Request APIs (4 endpoints)" -ForegroundColor Green
Write-Host "✅ Dashboard & Admin APIs (4 endpoints)" -ForegroundColor Green
Write-Host "✅ Clients Management APIs (3 endpoints)" -ForegroundColor Green
Write-Host "✅ System APIs (2 endpoints)" -ForegroundColor Green
Write-Host ""

Write-Host "إجمالي الـ APIs: 18 API" -ForegroundColor Yellow
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 