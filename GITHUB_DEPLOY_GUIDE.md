# 🚀 GitHub 部署 + 桌面快捷方式 完整指南

> 跟着本指南操作，30 分钟内完成部署，获得永久在线链接 + 桌面图标。

---

## 一、准备工作（5 分钟）

### 1.1 确认已有 GitHub 账号

如果你**已经有** GitHub 账号，跳到 **1.2**。

如果你**还没有**：

1. 打开 https://github.com/signup
2. 用邮箱注册，设置用户名（建议用英文，比如 `wency-dorm`）
3. 完成验证，登录 GitHub

### 1.2 确认本机已安装 Git

在 **Git Bash**（或 Windows 命令提示符）中输入：

```bash
git --version
```

如果显示版本号（如 `git version 2.54.0`），说明已安装。  
如果未安装，去 https://git-scm.com/download/win 下载安装，一路默认即可。

---

## 二、在 GitHub 上创建仓库（5 分钟）

### 2.1 新建仓库

1. 登录 https://github.com
2. 点击右上角 **+** → **New repository**
3. 填写信息：
   - **Repository name**：`dorm-manager`（或你喜欢的名字）
   - **Description**：宿舍极简物品管理工具
   - **Public** ✅（必须公开，GitHub Pages 才能免费部署）
   - **Initialize this repository with**：
     - ✅ `Add a README file`（先勾上，后面会覆盖）
4. 点击 **Create repository**

### 2.2 获取仓库地址

创建完成后，在页面中找到绿色按钮 **Code**，复制 HTTPS 地址：

```
https://github.com/你的用户名/dorm-manager.git
```

（示例：`https://github.com/wency-dorm/dorm-manager.git`）

---

## 三、推送代码到 GitHub（10 分钟）

### 3.1 打开项目文件夹

在 **Git Bash** 中执行：

```bash
cd "C:\Users\wency\Desktop\物品整理宿舍布置项目\dorm-manager"
```

### 3.2 初始化 Git 并关联远程仓库

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 提交第一个版本（Git 会永久保存这个版本）
git commit -m "feat: v3.0 宿舍物品管理 - 首次发布"

# 关联 GitHub 远程仓库（把下面的地址换成你自己的）
git remote add origin https://github.com/你的用户名/dorm-manager.git

# 推送代码到 GitHub
git push -u origin main
```

> ⚠️ 如果提示输入用户名和密码，输入 GitHub 用户名，密码用 **Personal Access Token**（不是登录密码）。  
> 获取 Token 方法：GitHub 网页 → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → 勾选 `repo` 权限 → 复制 Token 作为密码输入。

推送成功后，刷新 GitHub 网页，应该能看到所有文件。

---

## 四、启用 GitHub Pages（5 分钟）

### 4.1 开启 Pages 功能

1. 在 GitHub 仓库页面，点击顶部 **Settings**
2. 左侧菜单拉到最下面，点击 **Pages**
3. 在 **Source** 区域：
   - **Branch**：选择 `main`
   - **Folder**：选择 `/(root)`
   - 点击 **Save**
4. 等待 1~3 分钟，页面刷新后会出现绿色提示：
   > 🟢 **Your site is live at `https://你的用户名.github.io/dorm-manager/`**

### 4.2 验证链接

点击这个链接，确认页面能正常打开、功能正常。

把这个链接收藏到浏览器书签，或发到微信文件传输助手，随时可用。

---

## 五、桌面快捷方式（3 种方法）

### 方法 1：浏览器"安装"（推荐，最像原生 App）

#### Chrome / Edge（Windows）

1. 用 Chrome 或 Edge 打开 GitHub Pages 链接
2. 地址栏右侧会出现 **⊕ 安装**（或 🔧 菜单 → 安装）图标
3. 点击 **安装** → 选择 **安装**
4. 安装完成后：
   - 桌面会出现 **"宿舍管理"** 图标
   - 开始菜单里也会添加
   - 打开后没有浏览器地址栏，像真正的 App

#### 手机（Android / iOS）

- **Android Chrome**：打开链接 → 底部弹出"添加至主屏幕" → 点击添加
- **iOS Safari**：打开链接 → 点击底部分享按钮 → 选择"添加到主屏幕"

### 方法 2：Windows 快捷方式（手动创建）

如果浏览器没有显示安装按钮，可以手动创建：

1. 在桌面空白处 **右键** → **新建** → **快捷方式**
2. 在位置框输入 GitHub Pages 链接：
   ```
   https://你的用户名.github.io/dorm-manager/
   ```
3. 点击 **下一步** → 名称输入 **"宿舍管理"** → 点击 **完成**
4. 右键快捷方式 → **属性** → **更改图标** → 浏览到项目里的 `favicon.ico` → 确定

### 方法 3：Edge 应用（Windows 专属）

1. 用 Edge 打开链接
2. 右上角 **⋯** → **应用** → **将此站点作为应用安装**
3. 勾选"创建桌面快捷方式" → 点击 **安装**

---

## 六、后续更新（不会丢失数据）

### 6.1 GitHub 更新后为什么不会丢失数据？

GitHub Pages 只部署 **代码文件**（`index.html`, `script.js`, `style.css` 等）。  
你的 **物品数据** 保存在浏览器 `localStorage` 中，和 GitHub 仓库完全无关。  
所以：
- ✅ 更新 GitHub 代码 → 浏览器里的数据不受影响
- ✅ 重新打开链接 → 之前的物品、平面图、套装都还在

### 6.2 如何更新到新版本

当你修改了代码想发布新版本：

```bash
cd "C:\Users\wency\Desktop\物品整理宿舍布置项目\dorm-manager"

git add .
git commit -m "feat: 更新了什么功能（写清楚）"
git push
```

GitHub 会自动重新部署，等待 1~2 分钟后刷新 GitHub Pages 链接即可看到更新。

> 🔔 Git 的 `git push` 会把所有历史版本都保留在 GitHub 上。如果新版本出问题，随时可以 `git revert` 回退到旧版本。

### 6.3 数据备份（重要）

虽然 GitHub 更新不影响数据，但浏览器缓存清理、换电脑、换手机会丢失数据。  
**定期操作**：

1. 打开应用 → 首页右上角 **设置图标** ⚙️
2. 点击 **导出 JSON 备份** → 下载到安全位置（如电脑桌面、微信收藏、云盘）
3. 换设备或清理缓存后，用 **从 JSON 导入** 恢复

---

## 七、常见问题

| 问题 | 解决方式 |
|------|----------|
| 推送时报 "Authentication failed" | 用 Personal Access Token 代替密码，见 3.2 |
| GitHub Pages 链接打不开 | 确认仓库是 Public，等 3 分钟再刷新 |
| 手机打开后没有图标 | 尝试用 Chrome/Safari 的"添加到主屏幕"功能 |
| 更新后页面没变 | 清除浏览器缓存（Ctrl+Shift+R 强制刷新） |
| 数据突然没了 | 回忆是否清理了浏览器缓存，下次记得导出 JSON 备份 |

---

## 八、快速检查清单

- [ ] 已注册 GitHub 账号
- [ ] 已创建 `dorm-manager` 公开仓库
- [ ] 已复制仓库 HTTPS 地址
- [ ] 已在本机 `git init` 并 `git push`
- [ ] 已在 GitHub Settings → Pages 中开启 `main` 分支
- [ ] 已打开 GitHub Pages 链接并确认正常
- [ ] 已创建桌面快捷方式（或浏览器安装）
- [ ] 已导出一次 JSON 备份作为测试

---

**祝你使用愉快！** 如果卡在某一步，把报错信息复制下来问 Kimi，可以快速解决。
