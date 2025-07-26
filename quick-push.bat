@echo off
echo ======================================
echo    رفع التحديثات إلى GitHub
echo ======================================
echo.

echo تهيئة Git...
git init

echo.
echo إضافة جميع الملفات...
git add .

echo.
echo إنشاء commit...
git commit -m "feat: إضافة clients APIs وتحديث app.js"

echo.
echo إضافة remote...
git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git

echo.
echo رفع التحديثات...
git push -u origin main

echo.
echo ======================================
echo    تم رفع التحديثات بنجاح!
echo ======================================
echo.
echo Railway سيقوم بالنشر التلقائي
echo جميع الـ APIs ستكون متاحة قريباً
echo.
echo الـ Base URL:
echo https://mahmoudapi-production.up.railway.app
echo.
pause 