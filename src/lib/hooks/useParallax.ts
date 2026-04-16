// hooks/useParallax.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    // speed 0 = sem parallax | 1 = move junto com scroll | negativo = sobe mais rápido
    const yMove = `${speed * 100}%`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -parseFloat(yMove) / 2 },
        {
          yPercent: parseFloat(yMove) / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
