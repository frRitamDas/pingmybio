import { useEffect, useRef } from 'react';

interface LoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

const FADE_SECONDS = 0.5;
const RESTART_DELAY_MS = 100;

/**
 * Looping background video with a manual fade in, fade out and restart.
 * requestAnimationFrame drives opacity from currentTime and duration.
 */
export default function LoopVideo({ src, poster, className, style }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let frame = 0;
    let restartTimer: number | undefined;

    const setOpacity = (value: number) => {
      video.style.opacity = String(Math.min(1, Math.max(0, value)));
    };

    const tick = () => {
      const { currentTime, duration } = video;
      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < FADE_SECONDS) {
          setOpacity(currentTime / FADE_SECONDS); // fade in
        } else if (duration - currentTime < FADE_SECONDS) {
          setOpacity((duration - currentTime) / FADE_SECONDS); // fade out before the end
        } else {
          setOpacity(1);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      setOpacity(0);
      restartTimer = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      }, RESTART_DELAY_MS);
    };

    video.style.opacity = '0';
    video.addEventListener('ended', onEnded);
    frame = requestAnimationFrame(tick);
    void video.play().catch(() => undefined);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(restartTimer);
      video.removeEventListener('ended', onEnded);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
