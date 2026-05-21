import { motion } from 'framer-motion';
import { EnterButton } from './EnterButton';

export const HeroSimple = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nahida-dark-900">
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
          className="font-song text-xl md:text-2xl text-nahida-green-400 mb-8"
        >
          智慧与草木的诗篇
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
