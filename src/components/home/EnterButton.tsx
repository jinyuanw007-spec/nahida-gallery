import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface EnterButtonProps {
  to: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: 'arrow' | 'fullscreen';
}

export const EnterButton: React.FC<EnterButtonProps> = ({
  to,
  variant = 'primary',
  children,
  icon = 'arrow',
}) => {
  const baseClasses =
    'inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300';

  const variantClasses = {
    primary:
      'bg-nahida-green-500/20 border border-nahida-green-500/50 text-nahida-green-400 hover:bg-nahida-green-500/30 hover:border-nahida-green-500 hover:shadow-lg hover:shadow-nahida-green-500/20',
    secondary:
      'bg-nahida-gold-500/10 border border-nahida-gold-500/50 text-nahida-gold-400 hover:bg-nahida-gold-500/20 hover:border-nahida-gold-500 hover:shadow-lg hover:shadow-nahida-gold-500/20',
  };

  const icons = {
    arrow: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    fullscreen: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link
        to={to}
        className={`${baseClasses} ${variantClasses[variant]} ${
          variant === 'primary' ? 'animate-glow' : ''
        }`}
      >
        {icon === 'fullscreen' && icons.fullscreen}
        <span>{children}</span>
        {icon === 'arrow' && icons.arrow}
      </Link>
    </motion.div>
  );
};
