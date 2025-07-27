Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع عملية حذف البيانات الوهمية" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "mahmoud_api/data/dummyData.js - حذف البيانات الوهمية" -ForegroundColor Green
Write-Host "data/dummyData.js - حذف البيانات الوهمية" -ForegroundColor Green
Write-Host "CLEANUP_REPORT.txt - تقرير التنظيف" -ForegroundColor Green
Write-Host ""

try {
    Write-Host "إضافة الملفات..." -ForegroundColor Yellow
    git add mahmoud_api/data/dummyData.js
    git add data/dummyData.js
    git add CLEANUP_REPORT.txt
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إضافة الملفات بنجاح" -ForegroundColor Green
    } else {
        Write-Host "فشل في إضافة الملفات" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "إنشاء commit..." -ForegroundColor Yellow
    git commit -m "cleanup: حذف جميع البيانات الوهمية من المشروع"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إنشاء commit بنجاح" -ForegroundColor Green
    } else {
        Write-Host "فشل في إنشاء commit" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "رفع التغييرات..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم رفع التغييرات بنجاح!" -ForegroundColor Green
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "   ملخص عملية التنظيف" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "تم حذف البيانات الوهمية:" -ForegroundColor Green
        Write-Host "   - مستخدم Admin الوهمي" -ForegroundColor Gray
        Write-Host "   - الخدمات الوهمية" -ForegroundColor Gray
        Write-Host "   - البورتفوليو الوهمي" -ForegroundColor Gray
        Write-Host "   - الأخبار الوهمية" -ForegroundColor Gray
        Write-Host "   - بيانات لوحة التحكم الوهمية" -ForegroundColor Gray
        Write-Host ""
        Write-Host "تم حذف ملفات الاختبار:" -ForegroundColor Green
        Write-Host "   - test-api-connection.js" -ForegroundColor Gray
        Write-Host "   - test/test_api.js" -ForegroundColor Gray
        Write-Host "   - test/test-railway-apis.ps1" -ForegroundColor Gray
        Write-Host ""
        Write-Host "النتيجة النهائية:" -ForegroundColor Green
        Write-Host "   - جميع المصفوفات فارغة" -ForegroundColor Gray
        Write-Host "   - لا توجد بيانات وهمية" -ForegroundColor Gray
        Write-Host "   - مشروع نظيف وجاهز للاستخدام" -ForegroundColor Gray
        Write-Host ""
        Write-Host "انتظر 2-5 دقائق للنشر التلقائي" -ForegroundColor Yellow
    } else {
        Write-Host "فشل في رفع التغييرات" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "خطأ في العملية: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Read-Host "اضغط Enter للمتابعة" 