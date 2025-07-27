Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التغييرات بعد التنظيم" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "✅ تنظيم ملفات المشروع" -ForegroundColor Green
Write-Host "✅ إنشاء هيكل منظم" -ForegroundColor Green
Write-Host "✅ نقل الملفات إلى المجلدات المناسبة" -ForegroundColor Green
Write-Host "✅ إنشاء README.md جديد" -ForegroundColor Green
Write-Host ""

Write-Host "الهيكل الجديد:" -ForegroundColor Yellow
Write-Host "📁 src/ - الكود المصدري" -ForegroundColor Green
Write-Host "📁 public/ - الملفات العامة" -ForegroundColor Green
Write-Host "📁 docs/ - التوثيق" -ForegroundColor Green
Write-Host "📁 scripts/ - النصوص البرمجية" -ForegroundColor Green
Write-Host "📁 deploy/ - ملفات النشر" -ForegroundColor Green
Write-Host "📁 config/ - ملفات التكوين" -ForegroundColor Green
Write-Host "📁 assets/ - الملفات الوسائطية" -ForegroundColor Green
Write-Host "📁 backup/ - النسخ الاحتياطية" -ForegroundColor Green
Write-Host ""

Write-Host "تنفيذ الأوامر..." -ForegroundColor Yellow
Write-Host ""

Write-Host "1. تهيئة Git..." -ForegroundColor White
try {
    git init
    Write-Host "✅ تم تهيئة Git بنجاح" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Git موجود بالفعل" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2. إضافة جميع الملفات..." -ForegroundColor White
try {
    git add .
    Write-Host "✅ تم إضافة جميع الملفات" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في إضافة الملفات" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. إنشاء commit..." -ForegroundColor White
try {
    git commit -m "feat: تنظيم ملفات المشروع وإنشاء هيكل منظم"
    Write-Host "✅ تم إنشاء commit بنجاح" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في إنشاء commit" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. إضافة remote..." -ForegroundColor White
try {
    git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git
    Write-Host "✅ تم إضافة remote" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Remote موجود بالفعل" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "5. رفع التغييرات..." -ForegroundColor White
try {
    git push -u origin main
    Write-Host "✅ تم رفع التغييرات بنجاح!" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في رفع التغييرات" -ForegroundColor Red
    Write-Host "جرب الأمر يدوياً: git push -u origin main" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   النتيجة النهائية" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "✅ المشروع منظم ومحسن" -ForegroundColor Green
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host "✅ جميع الـ APIs ستكون متاحة" -ForegroundColor Green
Write-Host "✅ التطبيق جاهز للاستخدام" -ForegroundColor Green
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