import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from './GalleryItem';
import { Lightbox } from './Lightbox';
import { ScrollProgress } from './ScrollProgress';
import { getAllImages } from '../../data/images';
import type { GalleryImage, HorizontalGalleryProps } from '../../types';
import { getImagePath } from '../../utils/imageUtils';

const getImageAspectRatio = (id: number): number => {
  const ratios = [1.5, 1.33, 0.75, 1.2, 0.85, 1.4, 1.1, 0.9, 1.3, 1.6];
  return ratios[(id - 1) % ratios.length];
};

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  layout = 'grid',
  showScrollProgress = true,
  onImageClick,
}) => {
  const images = getAllImages();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'masonry' | 'horizontal'>(
    layout === 'horizontal' ? 'horizontal' : layout
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback(
    (image: GalleryImage) => {
      setSelectedImage(image);
      document.body.style.overflow = 'hidden';
      if (onImageClick) {
        onImageClick(image);
      }
    },
    [onImageClick]
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  const goToNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  }, [selectedImage, images]);

  const goToPrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  }, [selectedImage, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, goToNext, goToPrev, closeLightbox]);

  const handleHorizontalScroll = useCallback(() => {
    if (!horizontalRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = horizontalRef.current;
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-[#0a1f0a]">
          <img
            src="/背景图.jpg"
            alt="背景图"
            className="max-w-full max-h-full mx-auto object-contain"
            style={{ backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
          />
        </div>
        <div className="absolute inset-0 bg-[#0a1f0a] pointer-events-none">
          <img
            src="/背景图.jpg"
            alt=""
            className="max-w-full max-h-full mx-auto object-contain opacity-0"
            style={{ visibility: 'hidden' }}
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-10">
            <h2 className="font-song text-3xl md:text-4xl text-white">纳西妲相册</h2>
            <p className="text-gray-400 text-sm mt-3">共 {images.length} 张图片</p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="text-gray-500 text-sm">展示方式：</span>
              {(['grid', 'masonry', 'horizontal'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLayoutMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    layoutMode === mode
                      ? 'bg-nahida-green-500 text-white shadow-lg shadow-nahida-green-500/30'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {mode === 'grid' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )}
                    {mode === 'masonry' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM9 4v16M15 4v16M4 9h16M4 15h16" />
                      </svg>
                    )}
                    {mode === 'horizontal' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    )}
                    <span>{mode === 'grid' ? '网格' : mode === 'masonry' ? '瀑布流' : '横向'}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {layoutMode === 'horizontal' && showScrollProgress && (
            <ScrollProgress progress={scrollProgress} />
          )}

          <AnimatePresence mode="wait">
            {layoutMode === 'grid' && (
              <motion.div
                key="grid"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                  >
                    <GalleryItem image={image} onImageClick={openLightbox} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {layoutMode === 'masonry' && (
              <motion.div
                key="masonry"
                className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.015 }}
                    className="break-inside-avoid"
                  >
                    <motion.div
                      className="rounded-xl overflow-hidden bg-nahida-dark-800/80 border border-white/10 hover:border-nahida-green-500/50 transition-all duration-300 cursor-pointer shadow-lg shadow-black/30 hover:shadow-nahida-green-500/10"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openLightbox(image)}
                    >
                      <div className="relative" style={{ aspectRatio: getImageAspectRatio(image.id) }}>
                        <img src={getImagePath(image.path)} alt={image.filename} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-nahida-dark-900/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xs font-song truncate block">{image.filename}</span>
                        </div>
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-xs font-mono">
                          {String(image.id).padStart(3, '0')}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {layoutMode === 'horizontal' && (
              <motion.div
                key="horizontal"
                ref={horizontalRef}
                className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onScroll={handleHorizontalScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.02 }}
                    className="flex-shrink-0 snap-start"
                  >
                    <GalleryItem
                      image={image}
                      onImageClick={openLightbox}
                      variant="horizontal"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          total={images.length}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};
