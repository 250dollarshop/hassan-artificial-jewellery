import React from 'react';
import { formatDualPrice } from '../config/store';
import { useStore } from '../context/StoreContext';

interface PriceDisplayProps {
  pricePKR: number;
  oldPricePKR?: number;
  size?: 'sm' | 'md' | 'lg';
  inverse?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  pricePKR,
  oldPricePKR,
  size = 'md',
  inverse = false,
}) => {
  const { currency } = useStore();
  const main = formatDualPrice(pricePKR, currency);
  const old = oldPricePKR ? formatDualPrice(oldPricePKR, currency) : null;

  const primaryClass =
    size === 'lg'
      ? 'text-2xl sm:text-3xl font-semibold'
      : size === 'sm'
      ? 'text-sm font-semibold'
      : 'text-base sm:text-lg font-semibold';

  return (
    <div className="flex flex-col leading-tight">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span
          className={`tabular-nums font-display ${primaryClass} ${
            inverse ? 'text-[#FFFBF5]' : 'text-[#2B1B14] dark:text-[#FBF4E9]'
          }`}
        >
          {main.primary}
        </span>
        {old && (
          <span
            className={`tabular-nums text-xs line-through ${
              inverse ? 'text-[#EADFCB]/60' : 'text-[#6B5B53]/70 dark:text-[#DEC9C0]/60'
            }`}
          >
            {old.primary}
          </span>
        )}
      </div>
      <span
        className={`tabular-nums text-xs mt-0.5 ${
          inverse ? 'text-[#F4D58D]/85' : 'text-[#6B5B53] dark:text-[#DEC9C0]/80'
        }`}
      >
        {main.secondary}
      </span>
    </div>
  );
};
