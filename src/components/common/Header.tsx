import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onMusicToggle?: (isPlaying: boolean) => void
  isMusicPlaying?: boolean
  isAudioLoaded?: boolean
  isAudioLoading?: boolean
}

export const Header = ({ onMusicToggle, isMusicPlaying, isAudioLoaded, isAudioLoading }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-end">
        <button
          onClick={() => onMusicToggle?.(!isMusicPlaying)}
          className={`p-2 rounded-lg border transition-all ${
            isAudioLoaded
              ? isMusicPlaying
                ? 'bg-nahida-green-500/20 border-nahida-green-500 text-nahida-green-400'
                : 'bg-nahida-green-500/10 border-nahida-green-500/30 text-nahida-green-400 hover:bg-nahida-green-500/20'
              : isAudioLoading
                ? 'bg-nahida-green-500/10 border-nahida-green-500/30 text-nahida-green-400'
                : 'bg-gray-700/30 border-gray-600/30 text-gray-500 hover:bg-gray-600/30'
          }`}
          title={isMusicPlaying ? '关闭音乐' : '播放音乐'}
        >
          {isAudioLoading ? (
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : isAudioLoaded && isMusicPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          )}
        </button>
      </div>
    </motion.header>
  )
}
