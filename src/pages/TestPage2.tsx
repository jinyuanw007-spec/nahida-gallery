import { motion } from 'framer-motion';

export const TestPage2 = () => {
  return (
    <div className="min-h-screen bg-nahida-dark-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-song text-5xl text-white mb-4">纳西妲</h1>
        <p className="text-nahida-green-400 text-xl">智慧与草木的诗篇</p>
      </motion.div>
    </div>
  );
};
