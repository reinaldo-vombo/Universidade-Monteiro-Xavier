// hooks/useSmoothScroll.ts
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
   useEffect(() => {
      const lenis = new Lenis({
         duration: 1.2,
         // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
         orientation: 'vertical',
         smoothWheel: true,
      })

      // Liga Lenis ao ticker do GSAP (essencial pro ScrollTrigger funcionar)
      gsap.ticker.add((time) => {
         lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // ScrollTrigger usa o scroll do Lenis
      lenis.on('scroll', ScrollTrigger.update)

      return () => {
         lenis.destroy()
         gsap.ticker.remove((time) => lenis.raf(time * 1000))
      }
   }, [])
}