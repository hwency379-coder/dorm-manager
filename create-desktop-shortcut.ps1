#!/usr/bin/env pwsh
# 一键创建 Windows 桌面快捷方式
# 用法：powershell -ExecutionPolicy Bypass -File create-desktop-shortcut.ps1

$ErrorActionPreference = 'Stop'

# 项目根目录（脚本所在目录）
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 读取 README 中的 GitHub 用户名（如果已经填了）或者提示用户输入
$defaultUrl = "https://github.com/你的用户名/dorm-manager"
$readmePath = Join-Path $projectDir "README.md"
$githubUrl = ""

if (Test-Path $readmePath) {
    $content = Get-Content $readmePath -Raw
    if ($content -match "https://([a-zA-Z0-9_-]+)\.github\.io/dorm-manager") {
        $githubUrl = "https://$($matches[1]).github.io/dorm-manager/"
        Write-Host "检测到 GitHub Pages 链接: $githubUrl" -ForegroundColor Green
    }
}

if (-not $githubUrl) {
    Write-Host ""
    Write-Host "=== 创建桌面快捷方式 ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "请输入你的 GitHub 用户名（或仓库名）:" -ForegroundColor Yellow
    Write-Host "提示：如果你还没部署，先完成 GITHUB_DEPLOY_GUIDE.md 中的步骤" -ForegroundColor DarkGray
    Write-Host ""
    $username = Read-Host "GitHub 用户名"
    if ([string]::IsNullOrWhiteSpace($username)) {
        Write-Host "用户名不能为空，退出。" -ForegroundColor Red
        exit 1
    }
    $githubUrl = "https://$username.github.io/dorm-manager/"
    Write-Host ""
    Write-Host "将使用链接: $githubUrl" -ForegroundColor Green
    Write-Host ""
}

# 桌面路径
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "宿舍管理.lnk"
$icoPath = Join-Path $projectDir "favicon.ico"

# 创建 WScript.Shell 对象
$WshShell = New-Object -ComObject WScript.Shell
$shortcut = $WshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $githubUrl
$shortcut.IconLocation = $icoPath
$shortcut.Description = "宿舍极简物品管理工具"
$shortcut.WorkingDirectory = $projectDir
$shortcut.Save()

Write-Host "✅ 桌面快捷方式已创建！" -ForegroundColor Green
Write-Host "   位置: $shortcutPath" -ForegroundColor Gray
Write-Host "   图标: 已设置为项目图标" -ForegroundColor Gray
Write-Host "   链接: $githubUrl" -ForegroundColor Gray
Write-Host ""
Write-Host "双击图标即可打开应用。" -ForegroundColor Cyan

# 如果链接还没部署成功，提示用户
if ($githubUrl -match "你的用户名") {
    Write-Host "⚠️  注意：你还没把代码推送到 GitHub 并开启 Pages，快捷方式暂时打不开。" -ForegroundColor Yellow
    Write-Host "   请先完成 GITHUB_DEPLOY_GUIDE.md 中的步骤。" -ForegroundColor Yellow
}
