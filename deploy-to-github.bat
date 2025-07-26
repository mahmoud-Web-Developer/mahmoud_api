@echo off
echo ========================================
echo    رفع المشروع على GitHub
echo ========================================
echo.

echo 1. تهيئة Git...
git init

echo.
echo 2. إضافة جميع الملفات...
git add .

echo.
echo 3. إنشاء commit أولي...
git commit -m "Initial commit: The Flow API - نظام API شامل ومتطور"

echo.
echo 4. تغيير اسم الفرع إلى main...
git branch -M main

echo.
echo ========================================
echo    تعليمات إكمال الرفع
echo ========================================
echo.
echo 1. اذهب إلى GitHub.com
echo 2. أنشئ repository جديد
echo 3. انسخ رابط الـ repository
echo 4. شغل الأوامر التالية:
echo.
echo git remote add origin YOUR_REPOSITORY_URL
echo git push -u origin main
echo.
echo ========================================
echo    مثال:
echo ========================================
echo git remote add origin https://github.com/username/the-flow-api.git
echo git push -u origin main
echo.
pause 