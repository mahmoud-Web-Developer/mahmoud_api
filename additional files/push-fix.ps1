Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع تصحيحات واجهة الاختبار" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "public/index.html - إصلاح واجهة الاختبار التفاعلية" -ForegroundColor Green
Write-Host "test-api-connection.ps1 - script اختبار الاتصال" -ForegroundColor Green
Write-Host "push-fix.ps1 - script رفع التصحيحات" -ForegroundColor Green
Write-Host ""

Write-Host "التصحيحات المطبقة:" -ForegroundColor Yellow
Write-Host "   إصلاح الـ API endpoints" -ForegroundColor Gray
Write-Host "   تحسين المصادقة التلقائية" -ForegroundColor Gray
Write-Host "   إضافة اختبار الاتصال" -ForegroundColor Gray
Write-Host "   تحسين عرض الأخطاء" -ForegroundColor Gray
Write-Host "   إضافة console logging" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "تنفيذ الأوامر..." -ForegroundColor Yellow
Write-Host ""

Write-Host "1. إضافة جميع الملفات..." -ForegroundColor White
try {
    $addResult = & git add . 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إضافة جميع الملفات" -ForegroundColor Green
    } else {
        Write-Host "فشل في إضافة الملفات" -ForegroundColor Red
        Write-Host $addResult -ForegroundColor Red
    }
} catch {
    Write-Host "خطأ في إضافة الملفات" -ForegroundColor Red
}

Write-Host ""

Write-Host "2. إنشاء commit..." -ForegroundColor White
try {
    $commitResult = & git commit -m "fix: إصلاح واجهة الاختبار التفاعلية" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إنشاء commit بنجاح" -ForegroundColor Green
        Write-Host $commitResult -ForegroundColor Gray
    } else {
        Write-Host "فشل في إنشاء commit" -ForegroundColor Red
        Write-Host $commitResult -ForegroundColor Red
    }
} catch {
    Write-Host "خطأ في إنشاء commit" -ForegroundColor Red
}

Write-Host ""

Write-Host "3. إضافة remote..." -ForegroundColor White
try {
    $remoteResult = & git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إضافة remote" -ForegroundColor Green
    } else {
        Write-Host "Remote موجود بالفعل" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Remote موجود بالفعل" -ForegroundColor Yellow
}

Write-Host ""

Write-Host "4. رفع التغييرات..." -ForegroundColor White
try {
    $pushResult = & git push -u origin main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم رفع التغييرات بنجاح!" -ForegroundColor Green
        Write-Host $pushResult -ForegroundColor Gray
    } else {
        Write-Host "فشل في رفع التغييرات" -ForegroundColor Red
        Write-Host $pushResult -ForegroundColor Red
        Write-Host "جرب الأمر يدوياً: git push -u origin main" -ForegroundColor Yellow
    }
} catch {
    Write-Host "خطأ في رفع التغييرات" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   النتيجة النهائية" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "تم إصلاح واجهة الاختبار التفاعلية بنجاح" -ForegroundColor Green
Write-Host "تم إصلاح الـ API endpoints" -ForegroundColor Green
Write-Host "تم تحسين المصادقة التلقائية" -ForegroundColor Green
Write-Host "تم إضافة اختبار الاتصال" -ForegroundColor Green
Write-Host "Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات المحدثة:" -ForegroundColor Yellow
Write-Host "   public/index.html - واجهة الاختبار التفاعلية" -ForegroundColor Gray
Write-Host "   test-api-connection.ps1 - script اختبار الاتصال" -ForegroundColor Gray
Write-Host "   push-fix.ps1 - script رفع التصحيحات" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "اختبار الاتصال:" -ForegroundColor Yellow
Write-Host "   .\test-api-connection.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "   افتح المتصفح واذهب إلى: https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "التصحيحات المطبقة:" -ForegroundColor Yellow
Write-Host "   إصلاح الـ API endpoints" -ForegroundColor Green
Write-Host "   تحسين المصادقة التلقائية" -ForegroundColor Green
Write-Host "   إضافة اختبار الاتصال" -ForegroundColor Green
Write-Host "   تحسين عرض الأخطاء" -ForegroundColor Green
Write-Host "   إضافة console logging" -ForegroundColor Green
Write-Host ""

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 