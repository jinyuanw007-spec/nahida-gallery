# 纳西妲主题个人作品集网站 - 任务分解

## 任务总览
根据 PRD、技术设计和开发指令，将网站开发拆分为以下模块任务：

---

## 一、项目初始化与基础配置

### 任务 1.1：项目环境搭建
- 使用 Vite + React + TypeScript 模板初始化项目
- 安装 Tailwind CSS 3.x 及相关依赖
- 配置 Tailwind CSS（tailwind.config.js、index.css）
- 安装 React Router、Framer Motion

### 任务 1.2：基础配置文件
- 配置 tsconfig.json 路径别名
- 创建 .gitignore 文件
- 配置 ESLint 和 Prettier

---

## 二、类型定义与数据管理

### 任务 2.1：TypeScript 类型定义
- 创建 types/index.ts
- 定义 GalleryImage、Credit、SocialLink 等接口

### 任务 2.2：数据文件创建
- 创建 data/images.ts（自动生成1000+图片列表）
- 创建 data/credits.ts（致谢名单）
- 创建 data/socialLinks.ts（社交链接配置）

---

## 三、公共组件开发

### 任务 3.1：Layout 布局组件
- 创建 components/common/Layout.tsx
- 实现整体布局结构

### 任务 3.2：Header 导航栏
- 创建 components/common/Header.tsx
- 包含音乐开关按钮（可选功能）

### 任务 3.3：Footer 页脚
- 创建 components/common/Footer.tsx
- 展示致谢信息

---

## 四、首页开发

### 任务 4.1：Hero 组件
- 创建 components/home/Hero.tsx
- 大标题「纳西妲 · 智慧与草木的诗篇」
- 副标题角色介绍

### 任务 4.2：EnterButton 入口按钮
- 创建 components/home/EnterButton.tsx
- 点击跳转至九宫格预览页

---

## 五、九宫格预览页（新增需求）

### 任务 5.1：PreviewGrid 组件
- 创建 components/preview/PreviewGrid.tsx
- 3×3 全屏九宫格布局
- 展示9张精选照片

### 任务 5.2：预览页交互
- 图片悬停缩放/草绿色光效
- 点击图片跳转至水平相册
- 退出按钮返回首页

---

## 六、水平滚动相册（核心功能）

### 任务 6.1：HorizontalGallery 核心组件
- 创建 components/gallery/HorizontalGallery.tsx
- 实现水平滚动容器
- 隐藏原生滚动条

### 任务 6.2：GalleryItem 图片卡片
- 创建 components/gallery/GalleryItem.tsx
- 展示缩略图和图片编号
- 悬停效果

### 任务 6.3：ScrollProgress 进度指示器
- 创建 components/gallery/ScrollProgress.tsx
- 显示当前滚动位置/进度

---

## 七、图片模态框

### 任务 7.1：Lightbox 组件
- 创建 components/gallery/Lightbox.tsx
- 弹窗展示原图
- 支持键盘左右键切换

---

## 八、自定义 Hooks

### 任务 8.1：useHorizontalScroll
- 创建 hooks/useHorizontalScroll.ts
- 水平滚动逻辑（支持鼠标滚轮横向滚动）
- 惯性滚动效果55

### 任务 8.2：useKeyboardNavigation
- 创建 hooks/useKeyboardNavigation.ts
- 键盘左右箭头控制

### 任务 8.3：useLazyLoad
- 创建 hooks/useLazyLoad.ts
- Intersection Observer API 实现图片懒加载

---

## 九、关于页面

### 任务 9.1：AboutContent 内容组件
- 创建 components/about/AboutContent.tsx
- 网站设计理念说明
- 纳西妲角色介绍

### 任务 9.2：CreditsList 致谢列表
- 创建 components/about/CreditsList.tsx
- 图片来源致谢（画师、二创来源链接）
- 技术栈说明

---

## 十、联系方式页面

### 任务 10.1：ContactLinks 组件
- 创建 components/contact/ContactLinks.tsx
- GitHub 链接
- 其他社交平台链接（可选）

---

## 十一、路由配置

### 任务 11.1：App.tsx 路由配置
- 配置 React Router 路由
- 首页 `/`
- 九宫格预览 `/preview`
- 水平相册 `/gallery`
- 关于页面 `/about`
- 联系方式 `/contact`

---

## 十二、样式与动画

### 任务 12.1：全局样式
- 配置主题色（草木绿、淡雅金、深色背景）
- 玻璃态效果（backdrop-blur）
- 字体配置（思源宋体/黑体）

### 任务 12.2：动画效果
- 页面入场动画（Framer Motion）
- 图片悬停微视差效果
- 平滑滚动动画

---

## 十三、性能优化

### 任务 13.1：图片优化
- 缩略图生成（宽400-600px）
- WebP 格式优先配置
- 使用 will-change 优化滚动性能

### 任务 13.2：懒加载实现
- 仅加载视口附近图片
- 渐进式图片加载

---

## 十四、响应式设计

### 任务 14.1：移动端适配
- 触摸滑动支持（横向滚动）
- 图片大小自适应
- 导航栏移动端适配

---

## 十五、测试与部署

### 任务 15.1：功能测试
- 各页面路由跳转测试
- 键盘导航测试
- 模态框关闭测试

### 任务 15.2：构建部署
- npm run build 构建测试
- GitHub Pages 部署配置

---

## 任务优先级参考

| 优先级 | 任务模块 | 说明 |
|--------|----------|------|
| P0 | 项目初始化、路由配置 | 基础必备 |
| P0 | 首页 + 九宫格预览页 | 用户第一接触点 |
| P1 | 水平滚动相册核心 | 核心功能 |
| P1 | 图片模态框 | 核心交互 |
| P2 | 关于/联系方式页面 | 补充内容 |
| P2 | 性能优化、响应式 | 用户体验 |
| P3 | 音乐开关（可选） | 附加功能 |

---

## 开发顺序建议

1. 项目初始化 → 类型定义 → 数据文件
2. 公共组件（Layout、Header、Footer）
3. 首页 → 九宫格预览页 → 水平相册
4. 图片模态框 → 自定义 Hooks
5. 关于页 → 联系方式页
6. 样式优化 → 动画效果
7. 性能优化 → 响应式适配
8. 测试 → 部署
