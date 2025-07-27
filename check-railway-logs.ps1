Write-Host "========================================" -ForegroundColor Green
Write-Host "   فحص Railway Logs" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "لفحص Railway logs، اتبع الخطوات التالية:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. اذهب إلى Railway Dashboard:" -ForegroundColor Cyan
Write-Host "   https://railway.app" -ForegroundColor Gray
Write-Host ""

Write-Host "2. سجل دخولك إلى Railway" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. ابحث عن مشروع 'mahmoudapi-production'" -ForegroundColor Cyan
Write-Host ""

Write-Host "4. افتح المشروع" -ForegroundColor Cyan
Write-Host ""

Write-Host "5. اذهب إلى تبويب 'Deployments'" -ForegroundColor Cyan
Write-Host ""

Write-Host "6. فحص الـ logs للأخطاء:" -ForegroundColor Cyan
Write-Host "   - ابحث عن رسائل الخطأ" -ForegroundColor Gray
Write-Host "   - ابحث عن 'Error' أو 'Failed'" -ForegroundColor Gray
Write-Host "   - ابحث عن مشاكل في الـ dependencies" -ForegroundColor Gray
Write-Host ""

Write-Host "7. فحص حالة الـ deployment:" -ForegroundColor Cyan
Write-Host "   - تأكد من أن الـ deployment ناجح" -ForegroundColor Gray
Write-Host "   - فحص وقت آخر deployment" -ForegroundColor Gray
Write-Host ""

Write-Host "8. فحص الـ environment variables:" -ForegroundColor Cyan
Write-Host "   - تأكد من وجود JWT_SECRET" -ForegroundColor Gray
Write-Host "   - تأكد من وجود PORT" -ForegroundColor Gray
Write-Host ""

Write-Host "الأخطاء الشائعة في Railway:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. خطأ في الـ dependencies:" -ForegroundColor Red
Write-Host "   - تأكد من وجود package.json" -ForegroundColor Gray
Write-Host "   - تأكد من وجود جميع الـ dependencies" -ForegroundColor Gray
Write-Host ""

Write-Host "2. خطأ في الـ port:" -ForegroundColor Red
Write-Host "   - تأكد من استخدام process.env.PORT" -ForegroundColor Gray
Write-Host "   - تأكد من أن الـ port متاح" -ForegroundColor Gray
Write-Host ""

Write-Host "3. خطأ في الـ start script:" -ForegroundColor Red
Write-Host "   - تأكد من وجود 'start' script في package.json" -ForegroundColor Gray
Write-Host "   - تأكد من أن server.js موجود" -ForegroundColor Gray
Write-Host ""

Write-Host "4. خطأ في الـ environment variables:" -ForegroundColor Red
Write-Host "   - تأكد من وجود .env أو environment variables" -ForegroundColor Gray
Write-Host "   - تأكد من أن JWT_SECRET موجود" -ForegroundColor Gray
Write-Host ""

Write-Host "لاختبار الـ API بعد إصلاح المشاكل:" -ForegroundColor Cyan
Write-Host "   Invoke-WebRequest -Uri 'https://mahmoudapi-production.up.railway.app/health' -Method GET" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Read-Host "اضغط Enter للمتابعة" 