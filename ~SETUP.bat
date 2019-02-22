@echo off
title Setup
echo Running Setup

rmdir /S /Q tmp
rmdir /S /Q bin
mkdir tmp
mkdir bin

echo Downloading Node
powershell.exe -nologo -noprofile -command "Invoke-WebRequest -OutFile tmp\node.zip -Uri https://nodejs.org/dist/v10.15.1/node-v10.15.1-win-x86.zip"

echo Extracting Node
powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('tmp\node.zip', 'bin'); }"

rmdir /S /Q tmp

echo Installing Dependencies
call .\bin\node-v10.15.1-win-x86\npm.cmd install --only=production --no-audit
echo ----------------------
echo:
echo:
echo Installed
echo:
pause