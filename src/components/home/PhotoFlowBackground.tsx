import { motion } from 'framer-motion'
import { getImagePath } from '../../utils/imageUtils';

// 精选的纳西妲图片路径（使用缩略图）
const photoPaths = [
  '/thumbnails/纳西妲_001.jpg',
  '/thumbnails/纳西妲_005.jpg',
  '/thumbnails/纳西妲_010.jpg',
  '/thumbnails/纳西妲_015.jpg',
  '/thumbnails/纳西妲_020.jpg',
  '/thumbnails/纳西妲_025.jpg',
  '/thumbnails/纳西妲_030.jpg',
  '/thumbnails/纳西妲_035.jpg',
  '/thumbnails/纳西妲_040.jpg',
  '/thumbnails/纳西妲_045.jpg',
]

export const PhotoFlowBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* 主背景图片层 - 全屏模糊 */}
      <div className="absolute inset-0">
        <motion.img
          src={getImagePath('/images/纳西妲_001.jpg')}
          alt="纳西妲背景"
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(15px)',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* 颜色叠加层 */}
        <div className="absolute inset-0 bg-nahida-dark-900/60" />
      </div>

      {/* 照片流动画容器 - 双层流动 */}
      <div className="absolute inset-0">
        {/* 上层流动 - 从右向左 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...photoPaths, ...photoPaths].map((path, index) => (
              <motion.div
                key={`top-${index}`}
                className="flex-shrink-0 w-32 h-44 md:w-40 md:h-56"
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                  y: [-20, 0, -20],
                }}
                transition={{
                  duration: 0.5,
                  y: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
              >
                <img
                  src={getImagePath(path)}
                  alt={`纳西妲照片 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    filter: 'blur(6px) saturate(1.2)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 下层流动 - 从左向右，速度稍慢 */}
        <div className="absolute inset-0 overflow-hidden mt-24">
          <motion.div
            className="flex gap-8"
            animate={{
              x: ['-50%', '0%'],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...photoPaths, ...photoPaths].map((path, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="flex-shrink-0 w-28 h-40 md:w-36 md:h-52"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  y: [20, 0, 20],
                }}
                transition={{
                  duration: 0.5,
                  y: {
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
              >
                <img
                  src={getImagePath(path)}
                  alt={`纳西妲照片 ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  style={{
                    filter: 'blur(8px) saturate(1.1)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 边缘渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-nahida-dark-900/80 via-transparent to-nahida-dark-900/80" />

      {/* 顶部遮罩 */}
      <div className="absolute top-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-b from-nahida-dark-900 to-transparent" />

      {/* 底部遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-t from-nahida-dark-900 to-transparent" />
    </div>
  )
}