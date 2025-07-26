Write-Host "تنظيم جميع الملفات المتشابهة في مجلدات..." -ForegroundColor Green
Write-Host ""

# إنشاء جميع المجلدات المطلوبة
Write-Host "إنشاء المجلدات..." -ForegroundColor Yellow

$folders = @(
    "docs",
    "deploy", 
    "tools",
    "images",
    "src",
    "scripts",
    "config",
    "assets"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "تم إنشاء مجلد $folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "نقل ملفات التوثيق (.md) إلى docs/..." -ForegroundColor Yellow

# نقل جميع ملفات .md إلى docs/
$mdFiles = Get-ChildItem -Path "." -Filter "*.md" -File
foreach ($file in $mdFiles) {
    Move-Item $file.FullName "docs/" -Force
    Write-Host "تم نقل $($file.Name) إلى docs/" -ForegroundColor Green
}

Write-Host ""
Write-Host "نقل ملفات النشر إلى deploy/..." -ForegroundColor Yellow

# نقل ملفات النشر
$deployFiles = @(
    "vercel.json",
    "Procfile", 
    "app.json",
    "railway.json",
    "render.yaml",
    ".dockerignore"
)

foreach ($file in $deployFiles) {
    if (Test-Path $file) {
        Move-Item $file "deploy/" -Force
        Write-Host "تم نقل $file إلى deploy/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الأدوات والـ Scripts إلى tools/..." -ForegroundColor Yellow

# نقل الأدوات والـ Scripts
$toolsFiles = @(
    "test_simple.js",
    "start_server.bat",
    "start_server.ps1",
    "deploy-to-github.bat",
    "deploy-to-github.ps1", 
    "update-github.bat",
    "update-github.ps1",
    "push-updates.bat",
    "quick-push.bat",
    "FINAL_PUSH.ps1",
    "organize-project.ps1",
    "organize-files.ps1",
    "organize-all-files.ps1"
)

foreach ($file in $toolsFiles) {
    if (Test-Path $file) {
        Move-Item $file "tools/" -Force
        Write-Host "تم نقل $file إلى tools/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الصور والوسائط إلى images/..." -ForegroundColor Yellow

# نقل الصور والوسائط
$mediaFiles = @(
    "*.jpg",
    "*.jpeg", 
    "*.png",
    "*.gif",
    "*.mp4",
    "*.avi",
    "*.mov"
)

foreach ($pattern in $mediaFiles) {
    $files = Get-ChildItem -Path "." -Filter $pattern -File
    foreach ($file in $files) {
        Move-Item $file.FullName "images/" -Force
        Write-Host "تم نقل $($file.Name) إلى images/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الكود الرئيسي إلى src/..." -ForegroundColor Yellow

# نقل الكود الرئيسي
$srcFiles = @(
    "app.js",
    "server.js"
)

foreach ($file in $srcFiles) {
    if (Test-Path $file) {
        Move-Item $file "src/" -Force
        Write-Host "تم نقل $file إلى src/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل ملفات التكوين إلى config/..." -ForegroundColor Yellow

# نقل ملفات التكوين
$configFiles = @(
    "package.json",
    "package-lock.json",
    ".gitignore",
    "api.txt"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Move-Item $file "config/" -Force
        Write-Host "تم نقل $file إلى config/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الأصول إلى assets/..." -ForegroundColor Yellow

# نقل الأصول
$assetFiles = @(
    "LICENSE"
)

foreach ($file in $assetFiles) {
    if (Test-Path $file) {
        Move-Item $file "assets/" -Force
        Write-Host "تم نقل $file إلى assets/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل المجلدات الموجودة إلى src/..." -ForegroundColor Yellow

# نقل المجلدات الموجودة إلى src/
$srcFolders = @(
    "controllers",
    "routes", 
    "middleware",
    "data",
    "models",
    "utils"
)

foreach ($folder in $srcFolders) {
    if (Test-Path $folder) {
        Move-Item $folder "src/" -Force
        Write-Host "تم نقل مجلد $folder إلى src/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "تنظيم المجلدات الخاصة..." -ForegroundColor Yellow

# نقل مجلد testr إلى test إذا لم يكن موجود
if (Test-Path "testr" -and -not (Test-Path "test")) {
    Move-Item "testr" "test" -Force
    Write-Host "تم نقل testr إلى test" -ForegroundColor Green
}

Write-Host ""
Write-Host "تنظيم المشروع مكتمل!" -ForegroundColor Green
Write-Host ""
Write-Host "الهيكل النهائي:" -ForegroundColor Yellow
Write-Host "├── docs/ (التوثيق - جميع ملفات .md)" -ForegroundColor White
Write-Host "├── deploy/ (ملفات النشر)" -ForegroundColor White
Write-Host "├── tools/ (الأدوات والـ Scripts)" -ForegroundColor White
Write-Host "├── images/ (الصور والوسائط)" -ForegroundColor White
Write-Host "├── src/ (الكود الرئيسي)" -ForegroundColor White
Write-Host "├── config/ (ملفات التكوين)" -ForegroundColor White
Write-Host "├── assets/ (الأصول)" -ForegroundColor White
Write-Host "├── public/ (الموقع التفاعلي)" -ForegroundColor White
Write-Host "└── test/ (الاختبارات)" -ForegroundColor White

Write-Host ""
Write-Host "ملاحظات مهمة:" -ForegroundColor Yellow
Write-Host "- تم نقل جميع ملفات .md إلى docs/" -ForegroundColor White
Write-Host "- تم نقل جميع الأدوات إلى tools/" -ForegroundColor White
Write-Host "- تم نقل جميع الصور إلى images/" -ForegroundColor White
Write-Host "- تم نقل الكود الرئيسي إلى src/" -ForegroundColor White
Write-Host "- تم نقل ملفات التكوين إلى config/" -ForegroundColor White

Read-Host "اضغط Enter للمتابعة" 