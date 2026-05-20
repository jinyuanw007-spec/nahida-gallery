import type { CreditsListProps } from '@/types';
import { credits } from '@/data/credits';

export const CreditsList: React.FC<CreditsListProps> = ({ credits: creditList = credits }) => {
  return (
    <ul className="space-y-2">
      {creditList.map((credit, index) => (
        <li key={index}>
          {credit.url ? (
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-nahida-green-400 transition-colors"
            >
              {credit.name}
            </a>
          ) : (
            <span className="text-gray-400 text-sm">{credit.name}</span>
          )}
          {credit.description && (
            <span className="text-gray-500 text-xs ml-2">({credit.description})</span>
          )}
        </li>
      ))}
    </ul>
  );
};
