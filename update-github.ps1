Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التحديثات على GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "1. فحص حالة المشروع..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "2. إضافة جميع التحديثات..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "3. إنشاء commit للتحديثات..." -ForegroundColor Yellow
git commit -m "feat: تحديث شامل للمشروع - إضافة موقع اختبار تفاعلي وتحسينات شاملة"

Write-Host ""
Write-Host "4. رفع التحديثات..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   تم رفع التحديثات بنجاح!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "يمكنك الآن زيارة:" -ForegroundColor White
Write-Host "https://github.com/YOUR_USERNAME/the-flow-api" -ForegroundColor Cyan
Write-Host ""

Read-Host "اضغط Enter للمتابعة" 