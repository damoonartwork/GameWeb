@echo off
title GameWeb
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [!] Node.js is not installed.
  echo     Download and install the LTS version from https://nodejs.org
  echo     then double-click this file again.
  echo.
  start "" https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing packages - first run only, please wait...
  call npm install
  if errorlevel 1 (
    echo.
    echo [!] npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo Starting the site... the browser will open automatically.
echo Keep this window open while you use the site. Close it to stop.
echo.
echo  IMPORTANT: do NOT click inside this window.
echo  If the window title starts with "Select", the site freezes -
echo  press Esc here, then refresh the browser.
echo.
call npm run dev -- --open
pause
