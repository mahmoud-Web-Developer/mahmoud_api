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
git commit -m "feat: تحديث شامل للمشروع"

echo.
echo 4. إضافة remote...
echo.
echo قم بتنفيذ الأمر التالي:
echo git remote add origin https://github.com/YOUR_USERNAME/the-flow-api.git
echo.
echo ثم:
echo git push -u origin main
echo.
echo استبدل YOUR_USERNAME باسم المستخدم الحقيقي على GitHub
echo.

pause 