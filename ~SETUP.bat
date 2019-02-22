@echo off
title Setup
echo " /$$$$$$$                                            "
echo "| $$__  $$                                           "
echo "| $$  \ $$  /$$$$$$  /$$   /$$  /$$$$$$$  /$$$$$$    "
echo "| $$$$$$$  /$$__  $$| $$  | $$ /$$_____/ /$$__  $$   "
echo "| $$__  $$| $$  \__/| $$  | $$| $$      | $$$$$$$$   "
echo "| $$  \ $$| $$      | $$  | $$| $$      | $$_____/   "
echo "| $$$$$$$/| $$      |  $$$$$$$|  $$$$$$$|  $$$$$$$   "
echo "|_______/ |__/       \____  $$ \_______/ \_______/   "
echo "                     /$$  | $$                       "
echo "                    |  $$$$$$/                       "
echo "                     \______/                        "
echo " /$$      /$$                                        "
echo "| $$$    /$$$                                        "
echo "| $$$$  /$$$$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$ "
echo "| $$ $$/$$ $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$"
echo "| $$  $$$| $$| $$$$$$$$| $$  | $$| $$$$$$$$| $$  \__/"
echo "| $$\  $ | $$| $$_____/| $$  | $$| $$_____/| $$      "
echo "| $$ \/  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$      "
echo "|__/     |__/ \_______/ \____  $$ \_______/|__/      "
echo "                        /$$  | $$                    "
echo "                       |  $$$$$$/                    "
echo "                        \______/                     "
                          
echo Running Setup

rmdir /S /Q tmp > nul 2> nul
rmdir /S /Q bin > nul 2> nul
mkdir tmp
mkdir bin

echo Downloading Node
powershell.exe -nologo -noprofile -command "Invoke-WebRequest -OutFile tmp\node.zip -Uri https://nodejs.org/dist/v10.15.1/node-v10.15.1-win-x86.zip"

echo Extracting Node
powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('tmp\node.zip', 'bin'); }"

rmdir /S /Q tmp > nul 2> nul

echo Installing Dependencies
call .\bin\node-v10.15.1-win-x86\npm.cmd install --only=production --no-audit
echo ----------------------
echo:
echo:
echo Installed
echo:
pause