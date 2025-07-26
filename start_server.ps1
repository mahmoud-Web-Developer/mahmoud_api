Write-Host "Starting The Flow API Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Make sure you have Node.js installed" -ForegroundColor Yellow
Write-Host ""

try {
    node test_simple.js
} catch {
    Write-Host "Error starting server: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please make sure:" -ForegroundColor Yellow
    Write-Host "1. Node.js is installed" -ForegroundColor White
    Write-Host "2. All dependencies are installed (run: npm install)" -ForegroundColor White
    Write-Host "3. You're in the correct directory" -ForegroundColor White
}

Read-Host "Press Enter to continue" 