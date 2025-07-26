@echo off
echo ========================================
echo    رفع التغييرات تلقائياً
echo ========================================
echo.

echo 1. إضافة جميع الملفات...
git add .
if %errorlevel% equ 0 (
    echo ✅ تم إضافة جميع الملفات
) else (
    echo ❌ فشل في إضافة الملفات
)

echo.
echo 2. إنشاء commit...
git commit -m "feat: تنظيف المشروع وحذف الملفات غير المهمة"
if %errorlevel% equ 0 (
    echo ✅ تم إنشاء commit بنجاح
) else (
    echo ❌ فشل في إنشاء commit
)

echo.
echo 3. إضافة remote...
git remote add origin https://github.com/mahmoud-Web-Developer/mahmoud_api.git
if %errorlevel% equ 0 (
    echo ✅ تم إضافة remote
) else (
    echo ⚠️ Remote موجود بالفعل
)

echo.
echo 4. رفع التغييرات...
git push -u origin main
if %errorlevel% equ 0 (
    echo ✅ تم رفع التغييرات بنجاح!
) else (
    echo ❌ فشل في رفع التغييرات
    echo جرب الأمر يدوياً: git push -u origin main
)

echo.
echo ========================================
echo    النتيجة النهائية
echo ========================================
echo.
echo ✅ المشروع نظيف ومنظم
echo ✅ تم حذف الملفات غير المهمة
echo ✅ جاهز للتنظيم النهائي
echo ✅ Railway سيقوم بالنشر التلقائي
echo.
echo الـ Base URL:
echo https://mahmoudapi-production.up.railway.app
echo.
echo جاهز للاستخدام!
echo.

pause 