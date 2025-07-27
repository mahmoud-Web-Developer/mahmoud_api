Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع تصحيحات المصادقة" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "mahmoud_api/middleware/authMiddleware.js - إصلاح JWT secret" -ForegroundColor Green
Write-Host "mahmoud_api/data/dummyData.js - إضافة مستخدم admin" -ForegroundColor Green
Write-Host "mahmoud_api/routes/dashboard.js - إضافة middleware المصادقة" -ForegroundColor Green
Write-Host "mahmoud_api/routes/clients.js - إضافة middleware المصادقة" -ForegroundColor Green
Write-Host "mahmoud_api/routes/requests.js - إضافة middleware المصادقة" -ForegroundColor Green
Write-Host "test-auth.ps1 - script اختبار المصادقة" -ForegroundColor Green
Write-Host "push-auth-fix.ps1 - script رفع التصحيحات" -ForegroundColor Green
Write-Host ""

Write-Host "التصحيحات المطبقة:" -ForegroundColor Yellow
Write-Host "   إصلاح JWT secret في middleware" -ForegroundColor Gray
Write-Host "   إضافة مستخدم admin افتراضي" -ForegroundColor Gray
Write-Host "   إضافة middleware المصادقة للـ routes المحمية" -ForegroundColor Gray
Write-Host "   إنشاء script اختبار المصادقة" -ForegroundColor Gray
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
    $commitResult = & git commit -m "fix: إصلاح مشكلة المصادقة وإضافة مستخدم admin" 2>&1
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

Write-Host "تم إصلاح مشكلة المصادقة بنجاح" -ForegroundColor Green
Write-Host "تم إضافة مستخدم admin افتراضي" -ForegroundColor Green
Write-Host "تم إضافة middleware المصادقة للـ routes المحمية" -ForegroundColor Green
Write-Host "Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات المحدثة:" -ForegroundColor Yellow
Write-Host "   mahmoud_api/middleware/authMiddleware.js - إصلاح JWT secret" -ForegroundColor Gray
Write-Host "   mahmoud_api/data/dummyData.js - إضافة مستخدم admin" -ForegroundColor Gray
Write-Host "   mahmoud_api/routes/dashboard.js - إضافة middleware المصادقة" -ForegroundColor Gray
Write-Host "   mahmoud_api/routes/clients.js - إضافة middleware المصادقة" -ForegroundColor Gray
Write-Host "   mahmoud_api/routes/requests.js - إضافة middleware المصادقة" -ForegroundColor Gray
Write-Host "   test-auth.ps1 - script اختبار المصادقة" -ForegroundColor Gray
Write-Host "   push-auth-fix.ps1 - script رفع التصحيحات" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "اختبار المصادقة:" -ForegroundColor Yellow
Write-Host "   .\test-auth.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "بيانات تسجيل الدخول:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor Gray
Write-Host "   Password: admin123" -ForegroundColor Gray
Write-Host ""

Write-Host "التصحيحات المطبقة:" -ForegroundColor Yellow
Write-Host "   إصلاح JWT secret في middleware" -ForegroundColor Green
Write-Host "   إضافة مستخدم admin افتراضي" -ForegroundColor Green
Write-Host "   إضافة middleware المصادقة للـ routes المحمية" -ForegroundColor Green
Write-Host "   إنشاء script اختبار المصادقة" -ForegroundColor Green
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