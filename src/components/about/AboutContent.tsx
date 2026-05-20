import { motion } from 'framer-motion';
import { AboutContentProps } from '@/types';
import { designConcept } from '@/data/credits';

export const AboutContent: React.FC<AboutContentProps> = () => {
  return (
    <div className="bg-nahida-dark-900 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-song text-4xl text-white mb-4">关于纳西妲</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-nahida-green-500 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel p-8 mb-8"
        >
          <blockquote className="text-xl text-gray-300 leading-relaxed font-song italic">
            "智慧之神，亦是须弥的守护神。
            <br />
            她以草木为衣，以智慧为刃，
            <br />
            在永恒的轮回中守护着须弥的每一寸土地。"
          </blockquote>
          <p className="mt-4 text-right text-nahida-green-400 text-sm">— 《原神》纳西妲角色介绍</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-song text-2xl text-white mb-4">网站设计理念</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            {designConcept.split('\n').filter(p => p.trim()).map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
