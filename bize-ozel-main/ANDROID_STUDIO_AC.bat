@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
call npm install
if errorlevel 1 goto :error
call npm run android:open
if errorlevel 1 goto :error
exit /b 0
:error
echo Islem tamamlanamadi. Node.js ve Android Studio kurulumunu kontrol et.
pause
exit /b 1
