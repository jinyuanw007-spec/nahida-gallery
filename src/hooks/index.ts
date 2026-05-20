import { useEffect, useRef, useState, RefObject } from 'react';

export const useLazyLoad = (threshold = 0.1) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-image-id'));
            setLoadedImages((prev) => new Set([...prev, id]));
            observer.current?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '100px' }
    );

    return () => {
      observer.current?.disconnect();
    };
  }, [threshold]);

  const observe = (element: Element | null, id: number) => {
    if (observer.current && element && !loadedImages.has(id)) {
      element.setAttribute('data-image-id', String(id));
      observer.current.observe(element);
    }
  };

  return { loadedImages, observe };
};

export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return { containerRef };
};

export const useKeyboardNavigation = (
  total: number,
  currentIndex: number,
  onNext: () => void,
  onPrev: () => void,
  onClose?: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < total) onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 1) onPrev();
          break;
        case 'Escape':
          onClose?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, total, onNext, onPrev, onClose]);
};
