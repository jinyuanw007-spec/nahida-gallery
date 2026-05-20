import { Header } from './Header';
import { Footer } from './Footer';
import type { LayoutProps } from '../../types';

export const Layout: React.FC<LayoutProps> = ({
  children,
  onMusicToggle,
  isMusicPlaying,
  showFullFooter = true,
  isAudioLoaded = false,
  isAudioLoading = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-nahida-dark-900">
      <Header
        onMusicToggle={onMusicToggle}
        isMusicPlaying={isMusicPlaying}
        isAudioLoaded={isAudioLoaded}
        isAudioLoading={isAudioLoading}
      />
      <main className="flex-1">{children}</main>
      <Footer showFullContent={showFullFooter} />
    </div>
  );
};
