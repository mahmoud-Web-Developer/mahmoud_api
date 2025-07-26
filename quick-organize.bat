@echo off
echo ========================================
echo    تنظيم جميع الملفات المتشابهة
echo ========================================
echo.

echo 1. إنشاء المجلدات...
mkdir docs 2>nul
mkdir deploy 2>nul
mkdir tools 2>nul
mkdir images 2>nul
mkdir src 2>nul
mkdir config 2>nul
mkdir assets 2>nul

echo.
echo 2. نقل ملفات التوثيق...
move *.md docs\ 2>nul
move *.txt docs\ 2>nul

echo.
echo 3. نقل ملفات النشر...
move vercel.json deploy\ 2>nul
move Procfile deploy\ 2>nul
move app.json deploy\ 2>nul
move railway.json deploy\ 2>nul
move render.yaml deploy\ 2>nul
move .dockerignore deploy\ 2>nul

echo.
echo 4. نقل الأدوات...
move *.js tools\ 2>nul
move *.bat tools\ 2>nul
move *.ps1 tools\ 2>nul

echo.
echo 5. نقل الصور...
move *.jpg images\ 2>nul
move *.png images\ 2>nul
move *.mp4 images\ 2>nul

echo.
echo 6. نقل الكود الرئيسي...
move app.js src\ 2>nul
move server.js src\ 2>nul

echo.
echo 7. نقل ملفات التكوين...
move package.json config\ 2>nul
move package-lock.json config\ 2>nul
move .gitignore config\ 2>nul
move api.txt config\ 2>nul

echo.
echo 8. نقل الأصول...
move LICENSE assets\ 2>nul

echo.
echo 9. نقل المجلدات...
move controllers src\ 2>nul
move routes src\ 2>nul
move middleware src\ 2>nul
move data src\ 2>nul
move models src\ 2>nul
move utils src\ 2>nul

echo.
echo ========================================
echo    تم تنظيم المشروع بنجاح!
echo ========================================
echo.
echo الهيكل الجديد:
echo ├── docs/ (التوثيق)
echo ├── deploy/ (ملفات النشر)
echo ├── tools/ (الأدوات)
echo ├── images/ (الصور)
echo ├── src/ (الكود الرئيسي)
echo ├── config/ (ملفات التكوين)
echo ├── assets/ (الأصول)
echo ├── public/ (الموقع التفاعلي)
echo └── test/ (الاختبارات)
echo.
pause 