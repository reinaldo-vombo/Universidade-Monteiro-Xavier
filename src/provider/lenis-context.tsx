// context/LenisContext.tsx
'use client'

import React, {
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
   type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useFullPageSnap } from '../lib/hooks/useFullPageSnap'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
   const [lenis, setLenis] = useState<Lenis | null>(null)

   useEffect(() => {
      const instance = new Lenis({
         duration: 1.4,
         easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
         smoothWheel: true,
      })

      gsap.ticker.add((time) => instance.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      instance.on('scroll', ScrollTrigger.update)

      setLenis(instance)

      return () => {
         instance.destroy()
      }
   }, [])

   return (
      <LenisContext.Provider value={lenis}>
         {lenis && <SnapController lenis={lenis} />}
         {children}
      </LenisContext.Provider>
   )
}

// Componente interno que ativa o snap depois do Lenis estar pronto
function SnapController({ lenis }: { lenis: Lenis }) {
   useFullPageSnap({ lenis })
   return null
}

export function useLenis() {
   return useContext(LenisContext)
}