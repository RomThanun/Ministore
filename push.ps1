# ========================================================
#  🚀 PUSH ARIYAK STORE TO GITHUB (Ministore)
# ========================================================
Set-Location -Path $PSScriptRoot

Write-Host "1. Initializing Git..." -ForegroundColor Cyan
git init

Write-Host "2. Configuring Remote https://github.com/romthanun/Ministore.git ..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/romthanun/Ministore.git

Write-Host "3. Setting branch to main..." -ForegroundColor Cyan
git branch -M main

Write-Host "4. Adding all files..." -ForegroundColor Cyan
git add .

Write-Host "5. Committing changes..." -ForegroundColor Cyan
git commit -m "Update Ariyak Store Telegram Mini App"

Write-Host "6. Pushing to GitHub (main branch)..." -ForegroundColor Cyan
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCCESS! Pushed to https://github.com/romthanun/Ministore" -ForegroundColor Green
    Write-Host "👉 Live site: https://romthanun.github.io/Ministore/`n" -ForegroundColor Yellow
} else {
    Write-Host "`n⚠️ Push failed. Please check your GitHub credentials.`n" -ForegroundColor Red
}

pause