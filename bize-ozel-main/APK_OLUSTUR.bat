@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo.
echo Bize Ozel APK hazirlaniyor...
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo HATA: Node.js bulunamadi. Once Node.js 22 veya daha yenisini kur.
  pause
  exit /b 1
)

call npm install
if errorlevel 1 goto :error

call npm run android:apk
if errorlevel 1 goto :error

echo.
echo TAMAMLANDI: APK-CIKTISI klasorundeki Bize-Ozel.apk telefona kurulabilir.
echo.
pause
exit /b 0

:error
echo.
echo APK olusturulamadi. Android Studio ve Android SDK kurulu oldugundan emin ol.
echo Ayrintili adimlar APK_HAZIRLAMA_REHBERI.txt dosyasinda.
echo.
pause
exit /b 1
