Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع عملية حذف الإيموجي" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "CLEANUP_REPORT.txt - حذف الإيموجي" -ForegroundColor Green
Write-Host "push-cleanup.ps1 - حذف الإيموجي" -ForegroundColor Green
Write-Host "API_STATUS_REPORT.txt - حذف الإيموجي" -ForegroundColor Green
Write-Host "API_INTEGRATION_GUIDE.txt - حذف الإيموجي" -ForegroundColor Green
Write-Host "EMOJI_CLEANUP_REPORT.txt - تقرير حذف الإيموجي" -ForegroundColor Green
Write-Host ""

try {
    Write-Host "إضافة الملفات..." -ForegroundColor Yellow
    git add CLEANUP_REPORT.txt
    git add push-cleanup.ps1
    git add API_STATUS_REPORT.txt
    git add API_INTEGRATION_GUIDE.txt
    git add EMOJI_CLEANUP_REPORT.txt
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "تم إضافة الملفات بنجاح" -ForegroundColor Green
    } else {
        Write-Host "فشل في إضافة الملفات" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "إنشاء commit..." -ForegroundColor Yellow
    git commit -m "cleanup: حذف جميع الإيموجي من الملفات"
    
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
        Write-Host "   ملخص عملية حذف الإيموجي" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "تم حذف الإيموجي من:" -ForegroundColor Green
        Write-Host "   - CLEANUP_REPORT.txt" -ForegroundColor Gray
        Write-Host "   - push-cleanup.ps1" -ForegroundColor Gray
        Write-Host "   - API_STATUS_REPORT.txt" -ForegroundColor Gray
        Write-Host "   - API_INTEGRATION_GUIDE.txt" -ForegroundColor Gray
        Write-Host ""
        Write-Host "الإيموجي المحذوفة:" -ForegroundColor Green
        Write-Host "   - علامات النجاح والفشل" -ForegroundColor Gray
        Write-Host "   - إيموجي الوقت والتقنية" -ForegroundColor Gray
        Write-Host "   - إيموجي التنظيف" -ForegroundColor Gray
        Write-Host ""
        Write-Host "النتيجة النهائية:" -ForegroundColor Green
        Write-Host "   - نصوص واضحة ومباشرة" -ForegroundColor Gray
        Write-Host "   - مظهر احترافي" -ForegroundColor Gray
        Write-Host "   - توافق أفضل مع جميع الأنظمة" -ForegroundColor Gray
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