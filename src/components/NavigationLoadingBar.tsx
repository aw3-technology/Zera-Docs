import { useEffect, useRef } from 'react';

interface NavigationLoadingBarProps {
  primaryColor?: string;
}

export function NavigationLoadingBar({ primaryColor = '#D97706' }: NavigationLoadingBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const animationRef = useRef<number>();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const startLoading = () => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      progressRef.current = 0;

      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }

      // Smooth ease-out progress that slows down as it approaches 90%
      const animate = () => {
        // Fast start, asymptotic slowdown
        const remaining = 90 - progressRef.current;
        progressRef.current += remaining * 0.08;

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progressRef.current / 100})`;
        }

        if (isNavigatingRef.current && progressRef.current < 89.5) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const completeLoading = () => {
      if (!isNavigatingRef.current) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Quickly finish to 100%
      if (barRef.current) {
        barRef.current.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        barRef.current.style.transform = 'scaleX(1)';
      }

      // Fade out
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
        }
      }, 250);

      // Reset for next navigation
      setTimeout(() => {
        if (barRef.current) {
          barRef.current.style.transition = 'none';
          barRef.current.style.transform = 'scaleX(0)';
        }
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
        }
        isNavigatingRef.current = false;
        progressRef.current = 0;
      }, 500);
    };

    document.addEventListener('astro:before-preparation', startLoading);
    document.addEventListener('astro:after-preparation', completeLoading);

    return () => {
      document.removeEventListener('astro:before-preparation', startLoading);
      document.removeEventListener('astro:after-preparation', completeLoading);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-50"
      style={{
        opacity: 0,
        transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: primaryColor,
          boxShadow: `0 0 8px ${primaryColor}80, 0 0 2px ${primaryColor}40`,
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}
