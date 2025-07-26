Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التغييرات بدون بيانات وهمية" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التغييرات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "✅ إزالة جميع البيانات الوهمية" -ForegroundColor Green
Write-Host "✅ تحديث dummyData.js" -ForegroundColor Green
Write-Host "✅ تحسين authController.js" -ForegroundColor Green
Write-Host "✅ تحسين صفحة الاختبار" -ForegroundColor Green
Write-Host "✅ إضافة clients routes" -ForegroundColor Green
Write-Host ""

Write-Host "الملفات المحدثة:" -ForegroundColor Yellow
Write-Host "✅ mahmoud_api/data/dummyData.js - إزالة البيانات الوهمية" -ForegroundColor Green
Write-Host "✅ mahmoud_api/controllers/authController.js - تحسين الـ authentication" -ForegroundColor Green
Write-Host "✅ mahmoud_api/app.js - إضافة clients routes" -ForegroundColor Green
Write-Host "✅ public/index.html - تحسين صفحة الاختبار" -ForegroundColor Green
Write-Host "✅ api.txt - تحديث قائمة الـ APIs" -ForegroundColor Green
Write-Host ""

Write-Host "الخطوات لرفع التغييرات:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. تهيئة Git:" -ForegroundColor White
Write-Host "   git init" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. إضافة جميع الملفات:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Cyan
Write-Host ""
Write-Host "3. إنشاء commit:" -ForegroundColor White
Write-Host "   git commit -m \"feat: إزالة البيانات الوهمية وتحسين الـ APIs\"" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. إضافة remote:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. رفع التغييرات:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "أو يمكنك تنفيذ الأوامر يدوياً:" -ForegroundColor Yellow
Write-Host ""
Write-Host "git init" -ForegroundColor White
Write-Host "git add ." -ForegroundColor White
Write-Host "git commit -m \"feat: إزالة البيانات الوهمية وتحسين الـ APIs\"" -ForegroundColor White
Write-Host "git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "بعد الرفع:" -ForegroundColor Yellow
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host "✅ جميع الـ APIs ستكون متاحة" -ForegroundColor Green
Write-Host "✅ التطبيق جاهز للاستخدام" -ForegroundColor Green
Write-Host ""

Write-Host "الـ APIs المتاحة:" -ForegroundColor Yellow
Write-Host "✅ Authentication APIs" -ForegroundColor Green
Write-Host "✅ Content APIs" -ForegroundColor Green
Write-Host "✅ Request APIs" -ForegroundColor Green
Write-Host "✅ Dashboard & Admin APIs" -ForegroundColor Green
Write-Host "✅ Clients Management APIs" -ForegroundColor Green
Write-Host "✅ System APIs" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "جاهز للرفع!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 