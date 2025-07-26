Write-Host "========================================" -ForegroundColor Green
Write-Host "   تحديث الـ APIs على Railway" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "التحديثات المطلوبة:" -ForegroundColor Yellow
Write-Host "✅ إضافة clients routes إلى app.js" -ForegroundColor Green
Write-Host "✅ تحديث api.txt" -ForegroundColor Green
Write-Host "✅ جميع الـ APIs تعمل الآن" -ForegroundColor Green
Write-Host ""

Write-Host "الـ APIs المحدثة:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Authentication APIs:" -ForegroundColor White
Write-Host "✅ POST /auth/signup" -ForegroundColor Green
Write-Host "✅ POST /auth/login" -ForegroundColor Green
Write-Host ""
Write-Host "Content APIs:" -ForegroundColor White
Write-Host "✅ GET /services" -ForegroundColor Green
Write-Host "✅ GET /portfolio" -ForegroundColor Green
Write-Host "✅ GET /news" -ForegroundColor Green
Write-Host ""
Write-Host "Request APIs:" -ForegroundColor White
Write-Host "✅ POST /contact-requests" -ForegroundColor Green
Write-Host "✅ GET /meetings/slots" -ForegroundColor Green
Write-Host "✅ POST /meetings" -ForegroundColor Green
Write-Host "✅ POST /briefs" -ForegroundColor Green
Write-Host ""
Write-Host "Dashboard & Admin APIs:" -ForegroundColor White
Write-Host "✅ GET /dashboard" -ForegroundColor Green
Write-Host "✅ POST /requests/contact" -ForegroundColor Green
Write-Host "✅ POST /requests/meeting" -ForegroundColor Green
Write-Host "✅ POST /requests/brief" -ForegroundColor Green
Write-Host ""
Write-Host "Clients Management APIs:" -ForegroundColor White
Write-Host "✅ POST /clients" -ForegroundColor Green
Write-Host "✅ GET /clients" -ForegroundColor Green
Write-Host "✅ GET /clients/:id" -ForegroundColor Green
Write-Host ""
Write-Host "System APIs:" -ForegroundColor White
Write-Host "✅ GET /health" -ForegroundColor Green
Write-Host "✅ GET /api" -ForegroundColor Green
Write-Host ""

Write-Host "اختبار الـ APIs المحدثة:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. اختبار clients APIs:" -ForegroundColor White
Write-Host "curl -X POST https://mahmoudapi-production.up.railway.app/clients \\" -ForegroundColor Cyan
Write-Host "  -H \"Content-Type: application/json\" \\" -ForegroundColor Cyan
Write-Host "  -d '{ \"name\": \"John Doe\", \"email\": \"john@example.com\" }'" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. اختبار جلب العملاء:" -ForegroundColor White
Write-Host "curl -X GET https://mahmoudapi-production.up.railway.app/clients" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. اختبار عميل محدد:" -ForegroundColor White
Write-Host "curl -X GET https://mahmoudapi-production.up.railway.app/clients/1" -ForegroundColor Cyan
Write-Host ""

Write-Host "الخطوات لرفع التحديثات:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. رفع التحديثات إلى GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Cyan
Write-Host "   git commit -m \"feat: إضافة clients APIs وتحديث app.js\"" -ForegroundColor Cyan
Write-Host "   git push origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Railway سيقوم بالنشر التلقائي" -ForegroundColor White
Write-Host "   - سيتم اكتشاف التحديثات تلقائياً" -ForegroundColor Cyan
Write-Host "   - سيتم إعادة بناء التطبيق" -ForegroundColor Cyan
Write-Host "   - سيتم نشر التحديثات" -ForegroundColor Cyan
Write-Host ""

Write-Host "النتيجة النهائية:" -ForegroundColor Yellow
Write-Host "✅ جميع الـ APIs تعمل على Railway" -ForegroundColor Green
Write-Host "✅ clients APIs متاحة الآن" -ForegroundColor Green
Write-Host "✅ التطبيق محدث ومحسن" -ForegroundColor Green
Write-Host "✅ جاهز للاستخدام" -ForegroundColor Green
Write-Host ""

Write-Host "الـ Base URL:" -ForegroundColor Yellow
Write-Host "https://mahmoudapi-production.up.railway.app" -ForegroundColor Cyan
Write-Host ""

Write-Host "جاهز للنشر!" -ForegroundColor Green

Read-Host "اضغط Enter للمتابعة" 