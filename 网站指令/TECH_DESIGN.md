# 技术设计

## 技术栈
- React + TypeScript + Vite
- Tailwind CSS
- React Router（多页面：首页、相册、关于、联系方式）
- Framer Motion（入场动画、悬停效果、模态框动画）
- react-spring（可选，用于水平滚动的惯性效果）

## 项目结构
src/
components/
common/
Header.tsx # 导航栏（含音乐开关）
Footer.tsx # 页脚（致谢信息）
Layout.tsx # 布局组件
home/
Hero.tsx # 首页大标题 + 纳西妲形象
EnterButton.tsx # 进入相册按钮
gallery/
HorizontalGallery.tsx # 水平滚动相册核心组件
GalleryItem.tsx # 单张图片卡片（含编号）
Lightbox.tsx # 图片模态框（支持键盘切换）
ScrollProgress.tsx # 滚动进度指示器
about/
AboutContent.tsx # 角色介绍 + 网站理念
CreditsList.tsx # 图片来源致谢列表
contact/
ContactLinks.tsx # 社交链接组件
data/
images.ts # 图片列表（编号、路径、可选描述）
credits.ts # 致谢名单（画师/来源）
socialLinks.ts # 社交链接配置
hooks/
useHorizontalScroll.ts # 自定义Hook：水平滚动逻辑
useKeyboardNavigation.ts # 自定义Hook：键盘左右键控制
useLazyLoad.ts # 自定义Hook：图片懒加载
types/
index.ts # TypeScript 类型定义
App.tsx
main.tsx

## 图片数据管理

### images.ts 数据结构
```typescript
export interface GalleryImage {
  id: number;           // 序号（1-1027）
  filename: string;     // 原始文件名，如 "纳西妲_001.jpg"
  path: string;         // 图片路径（缩略图）
  originalPath: string; // 原图路径
  description?: string; // 可选描述
}

// 自动生成图片列表
// 图片命名规则：纳西妲_001.jpg 到 纳西妲_1027.jpg
export const getAllImages = (): GalleryImage[] => {
  const images: GalleryImage[] = [];
  for (let i = 1; i <= 1027; i++) {
    const num = String(i).padStart(3, '0');
    images.push({
      id: i,
      filename: `纳西妲_${num}.jpg`,
      path: `/thumbnails/纳西妲_${num}.jpg`,
      originalPath: `/originals/纳西妲_${num}.jpg`,
    });
  }
  return images;
};