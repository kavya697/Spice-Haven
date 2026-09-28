import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectClass?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#231A15] via-[#1C1410] to-[#120D0A] text-[#F5EFE6] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Flame className="w-7 h-7 text-[#C84B21] mb-2 opacity-80" />
        <span className="font-display text-lg font-semibold tracking-wide text-[#F5EFE6]">
          {fallbackTitle || alt}
        </span>
        {fallbackSubtitle && (
          <span className="text-xs text-[#B5A496] mt-1">
            {fallbackSubtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
