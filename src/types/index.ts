import { ReactNode } from 'react';

export interface GalleryImage {
  id: number;
  filename: string;
  path: string;
  originalPath: string;
  description?: string;
}

export interface PreviewImage {
  id: number;
  filename: string;
  path: string;
  originalPath: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CreditItem {
  name: string;
  url?: string;
  description?: string;
}

export type PageType = 'home' | 'preview' | 'gallery' | 'about' | 'contact';

export interface LayoutProps {
  children: ReactNode;
  onMusicToggle?: (playing: boolean) => void;
  isMusicPlaying?: boolean;
  showFullFooter?: boolean;
  isAudioLoaded?: boolean;
  isAudioLoading?: boolean;
}

export interface HeaderProps {
  onMusicToggle?: (playing: boolean) => void;
  isMusicPlaying?: boolean;
  isAudioLoaded?: boolean;
  isAudioLoading?: boolean;
}

export interface FooterProps {
  showFullContent?: boolean;
}

export interface GalleryItemProps {
  image: GalleryImage;
  index?: number;
  onImageClick?: (image: GalleryImage, index?: number) => void;
  onClick?: () => void;
  variant?: 'default' | 'horizontal';
}

export interface LightboxProps {
  image: GalleryImage;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export interface ScrollProgressProps {
  progress: number;
}

export interface HorizontalGalleryProps {
  layout?: 'grid' | 'masonry' | 'horizontal';
  showScrollProgress?: boolean;
  onImageClick?: (image: GalleryImage) => void;
}

export interface HeroProps {
  onEnterClick?: () => void;
}

export interface PreviewGridProps {
  images?: GalleryImage[];
  onImageClick?: () => void;
  onExit?: () => void;
}

export interface AboutContentProps {
  showFull?: boolean;
}

export interface CreditsListProps {
  credits?: CreditItem[];
}

export interface ContactLinksProps {
  links: SocialLink[];
}

export interface ImageData {
  id: number;
  filename: string;
  path: string;
  originalPath: string;
  description?: string;
}

export interface ScrollState {
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}
