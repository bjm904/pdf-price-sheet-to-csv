@echo off
title Setup
echo Running Setup
call .\bin\node-v10.15.1-win-x86\npm.cmd install --only=production
echo ----------------------
echo:
echo:
echo Installed
echo:
pause