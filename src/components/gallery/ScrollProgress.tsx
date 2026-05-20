import type { ScrollProgressProps } from '../../types';

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm font-mono">{Math.round(progress * 100)}%</span>
      <div className="w-32 h-2 bg-nahida-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-nahida-green-500 to-nahida-green-400 transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
