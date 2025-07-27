# إنشاء مجلد apis
New-Item -ItemType Directory -Path "apis" -Force

# نقل ملفات الـ APIs
$apiFiles = @(
    "APIS_LIST.txt",
    "API_GUIDE.txt", 
    "ALL_APIS_COMPLETE.txt",
    "APIS_QUICK_REFERENCE.txt",
    "API_TESTING_GUIDE.txt",
    "API_COMPARISON.txt",
    "api.txt",
    "test-apis.ps1"
)

foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        Move-Item $file "apis\" -Force
        Write-Host "✅ تم نقل: $file إلى apis/" -ForegroundColor Green
    }
}

Write-Host "✅ تم إنشاء مجلد apis/ ونقل الملفات" -ForegroundColor Green 