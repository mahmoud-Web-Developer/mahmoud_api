Write-Host "========================================" -ForegroundColor Green
Write-Host "   رفع التحديثات إلى GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التحديثات المطلوبة رفعها:" -ForegroundColor Yellow
Write-Host "✅ إضافة clients routes إلى app.js" -ForegroundColor Green
Write-Host "✅ تحديث api.txt" -ForegroundColor Green
Write-Host "✅ إنشاء API_COMPARISON.txt" -ForegroundColor Green
Write-Host "✅ إنشاء update-railway.ps1" -ForegroundColor Green
Write-Host "✅ إنشاء push-to-github.ps1" -ForegroundColor Green
Write-Host ""

Write-Host "الخطوات المطلوبة:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. تهيئة Git:" -ForegroundColor White
Write-Host "   git init" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. إضافة جميع الملفات:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Cyan
Write-Host ""
Write-Host "3. إنشاء commit:" -ForegroundColor White
Write-Host "   git commit -m \"feat: إضافة clients APIs وتحديث app.js\"" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. إضافة remote:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. رفع التحديثات:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "أو يمكنك تنفيذ الأوامر يدوياً:" -ForegroundColor Yellow
Write-Host ""
Write-Host "git init" -ForegroundColor White
Write-Host "git add ." -ForegroundColor White
Write-Host "git commit -m \"feat: إضافة clients APIs وتحديث app.js\"" -ForegroundColor White
Write-Host "git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "بعد الرفع:" -ForegroundColor Yellow
Write-Host "✅ Railway سيقوم بالنشر التلقائي" -ForegroundColor Green
Write-Host "✅ جميع الـ APIs ستكون متاحة" -ForegroundColor Green
Write-Host "✅ التطبيق محدث على الإنترنت" -ForegroundColor Green
Write-Host ""

Write-Host "الـ APIs المحدثة:" -ForegroundColor Yellow
Write-Host "✅ POST /auth/signup" -ForegroundColor Green
Write-Host "✅ POST /auth/login" -ForegroundColor Green
Write-Host "✅ GET /services" -ForegroundColor Green
Write-Host "✅ GET /portfolio" -ForegroundColor Green
Write-Host "✅ GET /news" -ForegroundColor Green
Write-Host "✅ POST /contact-requests" -ForegroundColor Green
Write-Host "✅ GET /meetings/slots" -ForegroundColor Green
Write-Host "✅ POST /meetings" -ForegroundColor Green
Write-Host "✅ POST /briefs" -ForegroundColor Green
Write-Host "✅ GET /dashboard" -ForegroundColor Green
Write-Host "✅ POST /requests/contact" -ForegroundColor Green
Write-Host "✅ POST /requests/meeting" -ForegroundColor Green
Write-Host "✅ POST /requests/brief" -ForegroundColor Green
Write-Host "✅ POST /clients" -ForegroundColor Green
Write-Host "✅ GET /clients" -ForegroundColor Green
Write-Host "✅ GET /clients/:id" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "جاهز للرفع!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 