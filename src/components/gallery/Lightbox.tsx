import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LightboxProps } from '../../types';
import { useKeyboardNavigation } from '../../hooks';
import { getImagePath } from '../../utils/imageUtils';

export const Lightbox: React.FC<LightboxProps> = ({ image, total, onClose, onNext, onPrev }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [image.id]);

  useKeyboardNavigation(total, image.id, onNext, onPrev, onClose);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {image.id > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}

        {image.id < total && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}

        <motion.div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-nahida-dark-800 rounded-lg">
              <div className="w-12 h-12 border-3 border-nahida-green-500/30 border-t-nahida-green-500 rounded-full animate-spin" />
            </div>
          )}

          <motion.img
            src={getImagePath(image.originalPath)}
            alt={image.filename}
            className={`max-w-full max-h-[85vh] object-contain rounded-lg ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onLoad={() => setIsLoaded(true)}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-song text-white text-lg">{image.filename}</p>
                <p className="text-nahida-gold-400 text-sm">
                  {String(image.id).padStart(3, '0')} / {String(total).padStart(3, '0')}
                </p>
              </div>
              {image.description && <p className="text-gray-300 text-sm max-w-xs">{image.description}</p>}
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm"
        >
          使用 ← → 切换图片 · ESC 关闭
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
