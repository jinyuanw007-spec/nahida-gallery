import { motion } from 'framer-motion';
import { useState } from 'react';
import type { GalleryItemProps } from '../../types';
import { getImagePath } from '../../utils/imageUtils';

export const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick, onImageClick, variant = 'default' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (onImageClick) {
      onImageClick(image);
    }
  };

  const isHorizontal = variant === 'horizontal';

  return (
    <motion.div
      className={`cursor-pointer group ${isHorizontal ? 'w-[400px] h-[300px]' : 'aspect-[3/4]'}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden bg-nahida-dark-800/80 border border-white/10 hover:border-nahida-green-500/50 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-nahida-green-500/10 ${
          isHorizontal ? '' : ''
        }`}
      >
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-nahida-dark-800">
            <div className="w-8 h-8 border-2 border-nahida-green-500/30 border-t-nahida-green-500 rounded-full animate-spin" />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-nahida-dark-800 text-gray-500">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <img
          src={getImagePath(image.path)}
          alt={image.filename}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-nahida-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-song truncate block">{image.filename}</span>
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs font-mono">
          {String(image.id).padStart(3, '0')}
        </div>

        {isHorizontal && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <div className="px-4 py-2 bg-nahida-green-500/80 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span>点击查看大图</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
