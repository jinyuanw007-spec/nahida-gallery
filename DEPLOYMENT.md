# GitHub Pages 部署指南

## 前置准备

1. 在 GitHub 上创建一个新仓库
2. 仓库名称建议：`nahida-gallery`（与配置中的 base 路径一致）

## 修改配置

### 1. vite.config.ts
```typescript
// 将 base 路径修改为你的仓库名
base: '/your-repo-name/',
```

### 2. 可选：修改图片路径
如果图片加载有问题，确保所有图片路径使用相对路径。

## 部署步骤

### 方法一：使用 gh-pages 命令（推荐）

```bash
# 构建并部署
npm run deploy
```

### 方法二：手动部署

```bash
# 1. 构建项目
npm run build

# 2. 将 dist 目录内容推送到 gh-pages 分支
```

### 方法三：GitHub Actions（自动化部署）

在 `.github/workflows/deploy.yml` 创建以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 配置 GitHub Pages

1. 打开仓库 Settings → Pages
2. 在 Source 中选择：
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. 点击 Save

## 访问地址

部署成功后，访问地址为：
```
https://your-username.github.io/your-repo-name/
```

## 注意事项

1. **音频文件**：GitHub Pages 可能无法正常播放音频，建议使用外部音频托管服务
2. **图片大小**：大量图片可能影响加载速度，建议优化图片大小
3. **HTTPS**：GitHub Pages 默认使用 HTTPS，确保所有资源使用相对路径