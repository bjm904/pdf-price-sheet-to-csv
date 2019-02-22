@echo off
title PDF Price Sheet Convert to CSV
echo Running program on "%~1"
call .\bin\node-v10.15.1-win-x86\node.exe ./src/index.js "%~1"
echo Cleaning up
rmdir /S /Q tmp
echo:
echo:
pause