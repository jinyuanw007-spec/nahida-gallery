import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getPreviewImages } from '../../data/images';
import type { PreviewGridProps } from '../../types';
import { getImagePath } from '../../utils/imageUtils';

const previewImages = getPreviewImages();

export const PreviewGrid: React.FC<PreviewGridProps> = ({ onImageClick, onExit }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onImageClick) {
        onImageClick();
      }
      navigate('/gallery');
    }, 400);
  };

  const handleExit = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onExit) {
        onExit();
      }
      navigate('/');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-nahida-dark-900 overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] bg-nahida-green-500/10 rounded-full blur-3xl -top-1/4 -left-1/4"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] bg-nahida-gold-500/10 rounded-full blur-3xl -bottom-1/4 -right-1/4"
              animate={{
                x: [0, -80, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleExit}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-nahida-green-500/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>返回首页</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 z-20 text-right"
          >
            <h1 className="font-song text-2xl text-white mb-1">纳西妲</h1>
            <p className="text-nahida-green-400 text-sm">精选作品预览</p>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 max-w-5xl w-full aspect-square"
            >
              {previewImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => handleImageClick()}
                  className="relative cursor-pointer overflow-hidden rounded-lg group aspect-square"
                >
                  <img
                    src={getImagePath(image.path)}
                    alt={image.filename}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    className="absolute inset-0 border-2 border-nahida-green-400/0 group-hover:border-nahida-green-400/60 rounded-lg"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(124, 179, 66, 0)',
                        '0 0 20px 5px rgba(124, 179, 66, 0.3)',
                        '0 0 0 0 rgba(124, 179, 66, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />

                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                    {String(image.id).padStart(3, '0')}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-4 py-2 bg-nahida-green-500/80 backdrop-blur-sm rounded-lg text-white text-sm">
                      点击进入相册
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
          >
            <p className="text-gray-400 text-sm">点击任意图片进入完整相册 · 点击左上角返回首页</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
