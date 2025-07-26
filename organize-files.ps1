Write-Host "تنظيم ملفات المشروع..." -ForegroundColor Green
Write-Host ""

# إنشاء المجلدات
Write-Host "إنشاء المجلدات..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "docs" -Force | Out-Null
New-Item -ItemType Directory -Path "deploy" -Force | Out-Null
New-Item -ItemType Directory -Path "tools" -Force | Out-Null
New-Item -ItemType Directory -Path "images" -Force | Out-Null
New-Item -ItemType Directory -Path "src" -Force | Out-Null
Write-Host "تم إنشاء جميع المجلدات" -ForegroundColor Green

Write-Host ""
Write-Host "نقل ملفات التوثيق..." -ForegroundColor Yellow

# نقل ملفات التوثيق
$docsFiles = @(
    "README.md",
    "API_DOCUMENTATION.md",
    "DEPLOY.md",
    "QUICK_START.md",
    "TROUBLESHOOTING.md",
    "TODO_LIST.md",
    "IMPROVEMENTS_SUMMARY.md",
    "GITHUB_DEPLOY.md",
    "git-commands.md",
    "deploy-scripts.md",
    "UPDATE_GITHUB.md",
    "MANUAL_PUSH.md",
    "FINAL_INSTRUCTIONS.md",
    "GITHUB_INSTRUCTIONS.txt",
    "DOCKER_REMOVAL.md",
    "PROJECT_ORGANIZATION.md"
)

foreach ($file in $docsFiles) {
    if (Test-Path $file) {
        Move-Item $file "docs/" -Force
        Write-Host "تم نقل $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل ملفات النشر..." -ForegroundColor Yellow

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
        Write-Host "تم نقل $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الأدوات..." -ForegroundColor Yellow

# نقل الأدوات
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
    "organize-project.ps1"
)

foreach ($file in $toolsFiles) {
    if (Test-Path $file) {
        Move-Item $file "tools/" -Force
        Write-Host "تم نقل $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الصور..." -ForegroundColor Yellow

# نقل الصور
$imageFiles = @(
    "WhatsApp Image 2025-07-26 at 12.40.03_ed2339be.jpg",
    "WhatsApp Image 2025-07-26 at 12.40.05_98929e98.jpg",
    "WhatsApp Image 2025-07-26 at 15.50.44_41d46691.jpg"
)

foreach ($file in $imageFiles) {
    if (Test-Path $file) {
        Move-Item $file "images/" -Force
        Write-Host "تم نقل $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "نقل الكود الرئيسي..." -ForegroundColor Yellow

# نقل الكود الرئيسي
$srcFiles = @(
    "app.js",
    "server.js"
)

foreach ($file in $srcFiles) {
    if (Test-Path $file) {
        Move-Item $file "src/" -Force
        Write-Host "تم نقل $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "تنظيم المجلدات الموجودة..." -ForegroundColor Yellow

# نقل المجلدات الموجودة
if (Test-Path "controllers") {
    Move-Item "controllers" "src/" -Force
    Write-Host "تم نقل controllers" -ForegroundColor Green
}

if (Test-Path "routes") {
    Move-Item "routes" "src/" -Force
    Write-Host "تم نقل routes" -ForegroundColor Green
}

if (Test-Path "middleware") {
    Move-Item "middleware" "src/" -Force
    Write-Host "تم نقل middleware" -ForegroundColor Green
}

if (Test-Path "data") {
    Move-Item "data" "src/" -Force
    Write-Host "تم نقل data" -ForegroundColor Green
}

if (Test-Path "models") {
    Move-Item "models" "src/" -Force
    Write-Host "تم نقل models" -ForegroundColor Green
}

if (Test-Path "utils") {
    Move-Item "utils" "src/" -Force
    Write-Host "تم نقل utils" -ForegroundColor Green
}

Write-Host ""
Write-Host "تنظيم المشروع مكتمل!" -ForegroundColor Green
Write-Host ""
Write-Host "الهيكل الجديد:" -ForegroundColor Yellow
Write-Host "├── docs/ (التوثيق)" -ForegroundColor White
Write-Host "├── deploy/ (ملفات النشر)" -ForegroundColor White
Write-Host "├── tools/ (الأدوات)" -ForegroundColor White
Write-Host "├── images/ (الصور)" -ForegroundColor White
Write-Host "├── public/ (الموقع التفاعلي)" -ForegroundColor White
Write-Host "└── src/ (الكود الرئيسي)" -ForegroundColor White

Read-Host "اضغط Enter للمتابعة" 