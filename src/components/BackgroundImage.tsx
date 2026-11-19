import { useState } from 'react';

interface BackgroundImageProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Decorative background image that fades in once loaded. */
export default function BackgroundImage({ src, className = '', style }: BackgroundImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={className}
      style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
    />
  );
}
