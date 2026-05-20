import { motion } from 'framer-motion';
import { PhotoFlowBackground } from './PhotoFlowBackground';
import { EnterButton } from './EnterButton';
import type { HeroProps } from '../../types';
import { IMAGE_COUNT } from '../../data/images';

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-nahida-dark-900" />

      <PhotoFlowBackground />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-nahida-green-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-nahida-gold-500/10 rounded-full blur-3xl -right-32 -bottom-32"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-2 bg-nahida-green-500/20 border border-nahida-green-500/50 rounded-full text-nahida-green-400 text-sm mb-6">
            《原神》纳西妲主题网站
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-song text-5xl md:text-7xl text-white mb-4"
        >
          纳西妲
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-song text-xl md:text-2xl text-nahida-green-400 mb-8 glow-text"
        >
          智慧与草木的诗篇
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          须弥的草神，执掌智慧与草木的权柄。
          <br />
          这里收集了约{IMAGE_COUNT}张精选的纳西妲图片与二创作品，
          <br />
          愿你在这片绿意盎然的世界中找到宁静。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <EnterButton to="/preview" variant="primary" icon="arrow">
            进入相册
          </EnterButton>

          <EnterButton to="/fullscreen" variant="secondary" icon="fullscreen">
            全屏画廊
          </EnterButton>
        </motion.div>
      </div>
    </div>
  );
};
