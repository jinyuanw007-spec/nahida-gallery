import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllImages } from '../../data/images'
import { GalleryImage } from '../../types'
import { getImagePath } from '../../utils/imageUtils'

// 定义布局模板
interface LayoutTemplate {
  id: string
  name: string
  gridAreas: string[]
  gridTemplate: string
}

const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'layout-1',
    name: '3x3 Grid',
    gridAreas: [
      'area-a',
      'area-b',
      'area-c',
      'area-d',
      'area-e',
      'area-f',
      'area-g',
      'area-h',
      'area-i',
    ],
    gridTemplate: `
      "area-a area-b area-c"
      "area-d area-e area-f"
      "area-g area-h area-i"
    `,
  },
]

// 生成图片组 - 每9张图片为一组
const generateImageGroups = (): GalleryImage[][] => {
  const groups: GalleryImage[][] = []
  const allImages = getAllImages()
  const shuffled = [...allImages].sort(() => Math.random() - 0.5)

  // 每9张图片为一组
  for (let i = 0; i < shuffled.length; i += 9) {
    const group = shuffled.slice(i, i + 9)
    if (group.length === 9) {
      groups.push(group)
    }
  }

  return groups
}

export const FullscreenGallery = () => {
  const [imageGroups] = useState<GalleryImage[][]>(generateImageGroups)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showControls, setShowControls] = useState(false)

  const currentGroup = imageGroups[currentGroupIndex]
  const currentLayout = layoutTemplates[0]

  // 自动轮播
  useEffect(() => {
    if (isTransitioning) return

    const timer = setTimeout(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentGroupIndex((prev) => (prev + 1) % imageGroups.length)
        setIsTransitioning(false)
      }, 300)
    }, 2000) // 停留2秒

    return () => clearTimeout(timer)
  }, [currentGroupIndex, isTransitioning, imageGroups.length])

  // 鼠标移动时显示控制按钮
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => setShowControls(false), 3000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(hideTimer)
    }
  }, [])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % imageGroups.length)
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, imageGroups.length])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentGroupIndex((prev) => (prev - 1 + imageGroups.length) % imageGroups.length)
      setIsTransitioning(false)
    }, 500)
  }, [isTransitioning, imageGroups.length])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-nahida-dark-950">
      {/* 图片网格 - 3x3 九宫格 */}
      <motion.div
        className="absolute inset-0 p-4 md:p-6"
        style={{
          display: 'grid',
          gridTemplateAreas: currentLayout.gridTemplate,
          gap: '12px',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
        }}
      >
        <AnimatePresence mode="wait">
          {currentGroup.map((image, index) => (
            <motion.div
              key={`${currentGroupIndex}-${image.id}`}
              className="overflow-hidden rounded-lg shadow-2xl"
              style={{ gridArea: currentLayout.gridAreas[index] }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={getImagePath(image.path)}
                alt={image.filename}
                className="w-full h-full object-cover"
                initial={{ filter: 'brightness(0.8)' }}
                animate={{ filter: 'brightness(1)' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              {/* 图片信息遮罩 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-white">
                  <span className="text-xs font-mono text-nahida-green-400">
                    #{String(image.id).padStart(3, '0')}
                  </span>
                  <p className="text-xs font-song truncate">{image.filename}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 控制按钮 */}
      <AnimatePresence>
        {showControls && (
          <>
            {/* 上一张按钮 */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goToPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm 
                         rounded-full text-white hover:bg-black/70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* 下一张按钮 */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm 
                         rounded-full text-white hover:bg-black/70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            {/* 指示点 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
            >
              {imageGroups.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentGroupIndex && !isTransitioning) {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setCurrentGroupIndex(index)
                        setIsTransitioning(false)
                      }, 500)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentGroupIndex
                      ? 'bg-nahida-green-400 w-6'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 返回按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm 
                   rounded-lg text-white text-sm hover:bg-black/70 transition-all"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回
        </span>
      </motion.button>

      {/* 布局名称 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-6 right-6 px-3 py-1.5 bg-black/50 backdrop-blur-sm 
                   rounded-full text-white/70 text-xs"
      >
        {currentLayout.name} · 第 {currentGroupIndex + 1} / {imageGroups.length} 组
      </motion.div>
    </div>
  )
}
