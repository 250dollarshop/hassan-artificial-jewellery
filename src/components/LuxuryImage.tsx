import React, { useState } from 'react';
import { Gem } from 'lucide-react';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  loading = 'lazy',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4D58D]/55 via-[#FFFBF5] to-[#C9A24B]/45 dark:from-[#4B1A26] dark:via-[#2B0D14] dark:to-[#8B6B28]/40 text-[#B8862B] dark:text-[#F4D58D] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gem className="w-8 h-8 mb-2 opacity-85" strokeWidth={1.5} />
        <span className="font-display text-xs tracking-wide text-[#6B5B53] dark:text-[#DEC9C0]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full h-full ${loaded ? '' : 'bg-[#F6EBD9]/50 dark:bg-[#33131C]/50'}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
    </div>
  );
};
