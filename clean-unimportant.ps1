Write-Host "========================================" -ForegroundColor Green
Write-Host "   حذف الملفات غير المهمة" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات التي سيتم حذفها:" -ForegroundColor Yellow
Write-Host ""

# قائمة الملفات غير المهمة للحذف
$filesToDelete = @(
    # ملفات التنظيم القديمة
    "organize-all-files.ps1",
    "organize-files.ps1", 
    "organize-project.ps1",
    "quick-organize.bat",
    
    # ملفات الـ push القديمة
    "push-clean-data.ps1",
    "push-clean.bat",
    "push-final.ps1",
    "push-to-github.ps1",
    "push-updates.bat",
    "quick-push.bat",
    "update-github.bat",
    "update-github.ps1",
    "update-railway.ps1",
    "deploy-to-github.ps1",
    "deploy-to-github.bat",
    "FINAL_PUSH.ps1",
    "push-final.ps1",
    
    # ملفات التعليمات القديمة
    "PUSH_INSTRUCTIONS.txt",
    "GITHUB_PUSH_INSTRUCTIONS.txt",
    "GITHUB_INSTRUCTIONS.txt",
    "MANUAL_PUSH.txt",
    "fix-authentication.ps1",
    
    # ملفات النشر القديمة
    "railway-deploy.md",
    "RAILWAY_APIS.txt",
    "deploy-railway.ps1",
    
    # ملفات أخرى غير مهمة
    "test_simple.js",
    "start_server.bat",
    "start_server.ps1",
    
    # ملفات Docker (تم حذفها مسبقاً)
    ".dockerignore",
    
    # ملفات النشر غير المستخدمة
    "render.yaml",
    "vercel.json",
    "app.json",
    "Procfile"
)

Write-Host "الملفات المحددة للحذف:" -ForegroundColor Red
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Write-Host "❌ $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "الملفات المهمة التي ستبقى:" -ForegroundColor Green
Write-Host "✅ app.js - التطبيق الرئيسي" -ForegroundColor Green
Write-Host "✅ server.js - خادم التطبيق" -ForegroundColor Green
Write-Host "✅ package.json - إعدادات المشروع" -ForegroundColor Green
Write-Host "✅ package-lock.json - قفل الإصدارات" -ForegroundColor Green
Write-Host "✅ railway.json - إعدادات Railway" -ForegroundColor Green
Write-Host "✅ .gitignore - تجاهل Git" -ForegroundColor Green
Write-Host "✅ LICENSE - رخصة المشروع" -ForegroundColor Green
Write-Host "✅ README.txt - دليل المشروع" -ForegroundColor Green
Write-Host "✅ api.txt - قائمة الـ APIs" -ForegroundColor Green
Write-Host "✅ API_GUIDE.txt - دليل الـ APIs" -ForegroundColor Green
Write-Host "✅ APIS_LIST.txt - قائمة الـ APIs" -ForegroundColor Green
Write-Host "✅ API_COMPARISON.txt - مقارنة الـ APIs" -ForegroundColor Green
Write-Host "✅ organize-project-final.ps1 - script التنظيم" -ForegroundColor Green
Write-Host "✅ push-organized.ps1 - script رفع التغييرات" -ForegroundColor Green
Write-Host "✅ ORGANIZATION_GUIDE.txt - دليل التنظيم" -ForegroundColor Green

Write-Host ""
Write-Host "المجلدات المهمة:" -ForegroundColor Green
Write-Host "✅ mahmoud_api/ - الكود المصدري" -ForegroundColor Green
Write-Host "✅ public/ - الملفات العامة" -ForegroundColor Green
Write-Host "✅ controllers/ - وحدات التحكم" -ForegroundColor Green
Write-Host "✅ routes/ - مسارات الـ API" -ForegroundColor Green
Write-Host "✅ middleware/ - الوسائط البرمجية" -ForegroundColor Green
Write-Host "✅ data/ - البيانات" -ForegroundColor Green
Write-Host "✅ utils/ - الأدوات المساعدة" -ForegroundColor Green
Write-Host "✅ models/ - النماذج" -ForegroundColor Green

Write-Host ""
Write-Host "هل تريد المتابعة؟ (Y/N)" -ForegroundColor Yellow
$confirmation = Read-Host

if ($confirmation -eq "Y" -or $confirmation -eq "y") {
    Write-Host ""
    Write-Host "بدء عملية الحذف..." -ForegroundColor Yellow
    
    $deletedCount = 0
    $notFoundCount = 0
    
    foreach ($file in $filesToDelete) {
        if (Test-Path $file) {
            try {
                Remove-Item $file -Force
                Write-Host "✅ تم حذف: $file" -ForegroundColor Green
                $deletedCount++
            } catch {
                Write-Host "❌ فشل في حذف: $file" -ForegroundColor Red
            }
        } else {
            Write-Host "⚠️ غير موجود: $file" -ForegroundColor Yellow
            $notFoundCount++
        }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   نتائج عملية الحذف" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ تم حذف: $deletedCount ملف" -ForegroundColor Green
    Write-Host "⚠️ غير موجود: $notFoundCount ملف" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "✅ المشروع نظيف ومنظم" -ForegroundColor Green
    Write-Host "✅ الملفات المهمة محفوظة" -ForegroundColor Green
    Write-Host "✅ جاهز للرفع إلى GitHub" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "الخطوة التالية:" -ForegroundColor Yellow
    Write-Host "1. تشغيل organize-project-final.ps1" -ForegroundColor White
    Write-Host "2. تشغيل push-organized.ps1" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "❌ تم إلغاء العملية" -ForegroundColor Red
}

Read-Host "اضغط Enter للمتابعة" 