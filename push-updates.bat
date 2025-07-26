@echo off
echo ========================================
echo    رفع التحديثات على GitHub
echo ========================================
echo.

echo 1. تهيئة Git...
git init

echo.
echo 2. إضافة جميع الملفات...
git add .

echo.
echo 3. إنشاء commit...
git commit -m "feat: تحديث شامل للمشروع - إضافة موقع اختبار تفاعلي وتحسينات شاملة"

echo.
echo 4. إضافة remote (استبدل YOUR_USERNAME باسم المستخدم الحقيقي)...
echo git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git

echo.
echo 5. رفع التحديثات...
echo git push -u origin main

echo.
echo ========================================
echo    تم إعداد الأوامر!
echo ========================================
echo.
echo الآن قم بتنفيذ الأوامر التالية:
echo.
echo 1. git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git
echo 2. git push -u origin main
echo.
echo استبدل YOUR_USERNAME باسم المستخدم الحقيقي على GitHub
echo.
pause 