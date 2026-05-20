import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreviewGrid } from '../components/preview/PreviewGrid';

export const PreviewPage = () => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          navigate('/');
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <PreviewGrid />;
};
