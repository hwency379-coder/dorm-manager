@echo off
chcp 65001 >nul
title 创建宿舍管理桌面快捷方式

echo.
echo ============================================
echo    宿舍极简物品管理 - 桌面快捷方式创建
echo ============================================
echo.
echo 本脚本需要 PowerShell 支持，将自动调用 PowerShell 运行。
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0create-desktop-shortcut.ps1"

echo.
echo 按任意键退出...
pause >nul
