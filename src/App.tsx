import { useState, useRef, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/common/Layout'
import { HomePage } from './pages/HomePage'
import { GalleryPage } from './pages/GalleryPage'
import { AboutPage } from './pages/AboutPage'
import { FullscreenGalleryPage } from './pages/FullscreenGalleryPage'
import { PreviewPage } from './pages/PreviewPage'

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const initAudio = useCallback(() => {
    if (audioRef.current) return
    
    setIsAudioLoading(true)
    const baseUrl = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/nahida-gallery/'
    const audioPath = `${baseUrl}music.mp3?v=${Date.now()}`
    const audio = new Audio(audioPath)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    console.log('尝试加载音频:', audioPath)

    audio.addEventListener('canplaythrough', () => {
      console.log('音频加载成功')
      setIsAudioLoading(false)
      setIsAudioLoaded(true)
      setAudioError(null)
    })

    audio.addEventListener('canplay', () => {
      console.log('音频可以播放')
      setIsAudioLoading(false)
      if (!isAudioLoaded) {
        setIsAudioLoaded(true)
        setAudioError(null)
      }
    })

    audio.addEventListener('error', (e) => {
      console.error('音频加载失败:', e)
      console.error('错误代码:', audio.error?.code)
      setIsAudioLoading(false)
      setIsAudioLoaded(false)
      setAudioError('音频加载失败')
    })

    audio.load()
  }, [isAudioLoaded])

  const handleMusicToggle = useCallback((playing: boolean) => {
    if (!audioRef.current) {
      initAudio()
    }

    if (!audioRef.current || !isAudioLoaded) {
      // 如果正在初始化，等待一下
      if (!audioRef.current) {
        setAudioError('音频加载中...')
        setTimeout(() => {
          const currentAudio = audioRef.current
          if (currentAudio && currentAudio.readyState >= 2) {
            setIsAudioLoaded(true)
            setAudioError(null)
            currentAudio.play().then(() => setIsMusicPlaying(true))
          } else {
            setAudioError('音频功能不可用')
            setTimeout(() => setAudioError(null), 3000)
          }
        }, 1000)
      } else {
        setAudioError('音频功能不可用')
        setTimeout(() => setAudioError(null), 3000)
      }
      return
    }

    const audio = audioRef.current
    if (playing && audio) {
      audio
        .play()
        .then(() => {
          setIsMusicPlaying(true)
          setAudioError(null)
        })
        .catch((error) => {
          setAudioError('播放失败：' + error.message)
          console.log('音乐播放失败:', error)
        })
    } else if (audio) {
      audio.pause()
      setIsMusicPlaying(false)
    }
  }, [isAudioLoaded])

  return (
    <>
      {/* 音频错误提示 */}
      {audioError && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-red-500/90 text-white text-sm rounded-lg">
          {audioError}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onMusicToggle={handleMusicToggle}
              isMusicPlaying={isMusicPlaying}
              showFullFooter={true}
              isAudioLoaded={isAudioLoaded}
              isAudioLoading={isAudioLoading}
            >
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/gallery"
          element={
            <Layout
              onMusicToggle={handleMusicToggle}
              isMusicPlaying={isMusicPlaying}
              showFullFooter={false}
              isAudioLoaded={isAudioLoaded}
              isAudioLoading={isAudioLoading}
            >
              <GalleryPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout
              onMusicToggle={handleMusicToggle}
              isMusicPlaying={isMusicPlaying}
              showFullFooter={false}
              isAudioLoaded={isAudioLoaded}
              isAudioLoading={isAudioLoading}
            >
              <AboutPage />
            </Layout>
          }
        />
        {/* 全屏画廊页面 - 不使用 Layout，独立全屏展示 */}
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/fullscreen" element={<FullscreenGalleryPage />} />
      </Routes>
    </>
  )
}

export default App
