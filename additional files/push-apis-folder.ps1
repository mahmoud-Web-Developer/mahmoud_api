Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع مجلد الـ APIs المنظم" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "apis/ALL_APIS.txt - جميع الـ APIs في ملف واحد" -ForegroundColor Green
Write-Host "apis/AUTHENTICATION_APIS.txt - APIs المصادقة" -ForegroundColor Green
Write-Host "apis/CONTENT_APIS.txt - APIs المحتوى" -ForegroundColor Green
Write-Host "apis/REQUEST_APIS.txt - APIs الطلبات" -ForegroundColor Green
Write-Host "apis/DASHBOARD_ADMIN_APIS.txt - APIs لوحة التحكم والإدارة" -ForegroundColor Green
Write-Host "apis/CLIENTS_APIS.txt - APIs إدارة العملاء" -ForegroundColor Green
Write-Host "apis/SYSTEM_APIS.txt - APIs النظام" -ForegroundColor Green
Write-Host "apis/INDEX.txt - فهرس المجلد" -ForegroundColor Green
Write-Host "apis/README.md - دليل المجلد" -ForegroundColor Green
Write-Host ""

Write-Host "إحصائيات الـ APIs:" -ForegroundColor Yellow
Write-Host "   إجمالي الـ APIs: 18 API" -ForegroundColor Gray
Write-Host "   Authentication APIs: 2 APIs" -ForegroundColor Gray
Write-Host "   Content APIs: 3 APIs" -ForegroundColor Gray
Write-Host "   Request APIs: 4 APIs" -ForegroundColor Gray
Write-Host "   Dashboard & Admin APIs: 4 APIs" -ForegroundColor Gray
Write-Host "   Clients Management APIs: 3 APIs" -ForegroundColor Gray
Write-Host "   System APIs: 2 APIs" -ForegroundColor Gray
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
    $commitResult = & git commit -m "feat: إضافة مجلد الـ APIs منظم بنفس تنسيق api.txt" 2>&1
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

Write-Host "تم إنشاء مجلد الـ APIs المنظم بنجاح" -ForegroundColor Green
Write-Host "جميع الـ APIs منظمة في ملفات منفصلة" -ForegroundColor Green
Write-Host "نفس تنسيق api.txt مطبق على جميع الملفات" -ForegroundColor Green
Write-Host "Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات الجديدة:" -ForegroundColor Yellow
Write-Host "   apis/ALL_APIS.txt - جميع الـ APIs في ملف واحد" -ForegroundColor Gray
Write-Host "   apis/AUTHENTICATION_APIS.txt - APIs المصادقة" -ForegroundColor Gray
Write-Host "   apis/CONTENT_APIS.txt - APIs المحتوى" -ForegroundColor Gray
Write-Host "   apis/REQUEST_APIS.txt - APIs الطلبات" -ForegroundColor Gray
Write-Host "   apis/DASHBOARD_ADMIN_APIS.txt - APIs لوحة التحكم والإدارة" -ForegroundColor Gray
Write-Host "   apis/CLIENTS_APIS.txt - APIs إدارة العملاء" -ForegroundColor Gray
Write-Host "   apis/SYSTEM_APIS.txt - APIs النظام" -ForegroundColor Gray
Write-Host "   apis/INDEX.txt - فهرس المجلد" -ForegroundColor Gray
Write-Host "   apis/README.md - دليل المجلد" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "موقع الاختبار التفاعلي:" -ForegroundColor Yellow
Write-Host "   https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "اختبار الـ APIs:" -ForegroundColor Yellow
Write-Host "   .\test-all-apis.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "إحصائيات الـ APIs:" -ForegroundColor Yellow
Write-Host "   إجمالي الـ APIs: 18 API" -ForegroundColor Gray
Write-Host "   Authentication APIs: 2 APIs" -ForegroundColor Gray
Write-Host "   Content APIs: 3 APIs" -ForegroundColor Gray
Write-Host "   Request APIs: 4 APIs" -ForegroundColor Gray
Write-Host "   Dashboard & Admin APIs: 4 APIs" -ForegroundColor Gray
Write-Host "   Clients Management APIs: 3 APIs" -ForegroundColor Gray
Write-Host "   System APIs: 2 APIs" -ForegroundColor Gray
Write-Host ""

Write-Host "الـ APIs المتاحة:" -ForegroundColor Yellow
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

Write-Host "جاهز للاستخدام!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 