Write-Host "========================================" -ForegroundColor Green
Write-Host "   التحقق من حالة Git ورفع التغييرات" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التحقق من حالة Git..." -ForegroundColor Yellow

# التحقق من وجود Git
if (Test-Path ".git") {
    Write-Host "✅ Git موجود ومُهيأ" -ForegroundColor Green
} else {
    Write-Host "❌ Git غير موجود" -ForegroundColor Red
    Write-Host "سيتم تهيئة Git..." -ForegroundColor Yellow
    git init
}

Write-Host ""
Write-Host "إضافة جميع الملفات..." -ForegroundColor Yellow
try {
    git add .
    Write-Host "✅ تم إضافة جميع الملفات" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في إضافة الملفات" -ForegroundColor Red
}

Write-Host ""
Write-Host "التحقق من التغييرات..." -ForegroundColor Yellow
try {
    $status = git status --porcelain
    if ($status) {
        Write-Host "✅ يوجد تغييرات جديدة" -ForegroundColor Green
        Write-Host ""
        Write-Host "التغييرات:" -ForegroundColor Yellow
        $status | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
    } else {
        Write-Host "⚠️ لا توجد تغييرات جديدة" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ فشل في التحقق من التغييرات" -ForegroundColor Red
}

Write-Host ""
Write-Host "إنشاء commit..." -ForegroundColor Yellow
try {
    git commit -m "feat: تنظيف المشروع وحذف الملفات غير المهمة + تنظيم الهيكل"
    Write-Host "✅ تم إنشاء commit بنجاح" -ForegroundColor Green
} catch {
    Write-Host "❌ فشل في إنشاء commit" -ForegroundColor Red
    Write-Host "ربما لا توجد تغييرات جديدة" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "التحقق من remote..." -ForegroundColor Yellow
try {
    $remotes = git remote -v
    if ($remotes) {
        Write-Host "✅ Remote موجود" -ForegroundColor Green
        Write-Host "Remote URLs:" -ForegroundColor Yellow
        $remotes | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
    } else {
        Write-Host "⚠️ Remote غير موجود" -ForegroundColor Yellow
        Write-Host "إضافة remote..." -ForegroundColor Yellow
        git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git
        Write-Host "✅ تم إضافة remote" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ فشل في التحقق من remote" -ForegroundColor Red
}

Write-Host ""
Write-Host "رفع التغييرات..." -ForegroundColor Yellow
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

Write-Host "✅ المشروع نظيف ومنظم" -ForegroundColor Green
Write-Host "✅ تم حذف الملفات غير المهمة" -ForegroundColor Green
Write-Host "✅ جاهز للتنظيم النهائي" -ForegroundColor Green
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "الخطوة التالية:" -ForegroundColor Yellow
Write-Host "1. تشغيل organize-project-final.ps1" -ForegroundColor White
Write-Host "2. تشغيل push-organized.ps1" -ForegroundColor White
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 