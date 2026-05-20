import { motion } from 'framer-motion';
import { techStack } from '@/data/credits';
import type { FooterProps } from '@/types';
import { CreditsList } from '@/components/about/CreditsList';

export const Footer: React.FC<FooterProps> = ({ showFullContent = true }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-nahida-dark-800/50 border-t border-white/10 py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {showFullContent && (
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-song text-lg text-nahida-green-400 mb-4">关于网站</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                这是一个以纳西妲为主题的个人作品集网站，展示精选的纳西妲图片及二创作品。
              </p>
            </div>

            <div>
              <h3 className="font-song text-lg text-nahida-green-400 mb-4">致谢</h3>
              <CreditsList />
            </div>

            <div>
              <h3 className="font-song text-lg text-nahida-green-400 mb-4">技术栈</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-nahida-green-500/10 border border-nahida-green-500/30 
                               rounded-full text-xs text-nahida-green-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          className={`mt-8 pt-6 border-t border-white/10 text-center text-gray-500 text-sm ${showFullContent ? '' : 'mt-0 pt-0 border-0'}`}
        >
          <p>纳西妲 · 智慧与草木的诗篇</p>
          <p className="mt-1">© 2026 原神同人作品 · 仅用于展示</p>
        </div>
      </div>
    </motion.footer>
  );
};
