@echo off
chcp 65001 >nul
echo ========================================================
echo  🚀 PUSHING ARIYAK STORE TO GITHUB (Ministore)
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/5] Initializing Git repository...
git init

echo [2/5] Connecting to remote https://github.com/romthanun/Ministore.git ...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/romthanun/Ministore.git

echo [3/5] Setting main branch...
git branch -M main

echo [4/5] Staging all files (assets, css, js, index.html, .nojekyll)...
git add .

echo [5/5] Committing and Pushing to GitHub...
git commit -m "Update Ariyak Store: full CSS styles, brand SVG icons, and JS logic"
git push -u origin main --force

echo.
echo ========================================================
if %errorlevel% equ 0 (
    echo  ✅ SUCCESS! Pushed successfully to GitHub!
    echo  👉 Your live website will update in about 1 minute:
    echo     https://romthanun.github.io/Ministore/
) else (
    echo  ⚠️ If push was rejected, please login to GitHub or check permissions.
)
echo ========================================================
echo.
pause