@echo off
echo ========================================
echo    رفع التحديثات على GitHub
echo ========================================
echo.

echo 1. فحص حالة المشروع...
git status

echo.
echo 2. إضافة جميع التحديثات...
git add .

echo.
echo 3. إنشاء commit للتحديثات...
git commit -m "feat: تحديث شامل للمشروع - إضافة موقع اختبار تفاعلي وتحسينات شاملة"

echo.
echo 4. رفع التحديثات...
git push

echo.
echo ========================================
echo    تم رفع التحديثات بنجاح!
echo ========================================
echo.
echo يمكنك الآن زيارة:
echo https://github.com/YOUR_USERNAME/the-flow-api
echo.
pause 