// hooks/useFullPageSnap.ts
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface Options {
  lenis: Lenis;
  ease?: number; // 0.1 = muito suave | 0.3 = mais rápido
}

export function useFullPageSnap({ lenis, ease = 0.12 }: Options) {
  const isSnapping = useRef(false);
  const currentIndex = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section]'),
    );
    if (!sections.length) return;

    function snapToIndex(index: number) {
      const target = sections[index];
      if (!target) return;

      isSnapping.current = true;
      currentIndex.current = index;

      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.1,
        easing: (t) => {
          // ease in-out cubic — suave na entrada e saída
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },
        onComplete: () => {
          isSnapping.current = false;
        },
      });
    }

    function getNearestSection(scrollY: number) {
      let nearest = 0;
      let minDist = Infinity;

      sections.forEach((section, i) => {
        const dist = Math.abs(section.offsetTop - scrollY);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      });

      return nearest;
    }

    function onScroll({
      scroll,
      direction,
    }: {
      scroll: number;
      direction: number;
    }) {
      if (isSnapping.current) return;

      lastScrollY.current = scroll;
    }

    // Detecta quando o scroll para — aí faz o snap
    let timeout: ReturnType<typeof setTimeout>;

    function onWheel() {
      if (isSnapping.current) return;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const nearest = getNearestSection(lastScrollY.current);
        snapToIndex(nearest);
      }, 80); // 80ms sem scroll = considerado parado
    }

    // Teclado: setas e Page Up/Down
    function onKeyDown(e: KeyboardEvent) {
      if (isSnapping.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        snapToIndex(Math.min(currentIndex.current + 1, sections.length - 1));
      }

      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        snapToIndex(Math.max(currentIndex.current - 1, 0));
      }
    }

    lenis.on('scroll', onScroll);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    // Snap inicial
    snapToIndex(0);

    return () => {
      clearTimeout(timeout);
      lenis.off('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lenis]);
}
