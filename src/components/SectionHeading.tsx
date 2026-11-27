import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  label: string;
  title: string;
  shimmerWord?: string;
  viewAllTo?: string;
  viewAllLabel?: string;
  inverse?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  shimmerWord,
  viewAllTo,
  viewAllLabel = 'View all',
  inverse = false,
}) => {
  const parts = shimmerWord && title.includes(shimmerWord)
    ? title.split(shimmerWord)
    : [title];

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
      <div>
        <span
          className={`block text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold mb-2 ${
            inverse ? 'text-[#F4D58D]' : 'text-[#B8862B] dark:text-[#F4D58D]'
          }`}
        >
          {label}
        </span>
        <h2
          className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-balance ${
            inverse ? 'text-[#FFFBF5]' : 'text-[#2B1B14] dark:text-[#FBF4E9]'
          }`}
        >
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <span className="text-gold-shimmer">{shimmerWord}</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-[2px] w-12 bg-gold-gradient rounded-full" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A24B]" />
        </div>
      </div>

      {viewAllTo && (
        <Link
          to={viewAllTo}
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider shrink-0 transition-colors group ${
            inverse
              ? 'text-[#F4D58D] hover:text-white'
              : 'text-[#8B0A1A] dark:text-[#F4D58D] hover:text-[#6E0714]'
          }`}
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};
