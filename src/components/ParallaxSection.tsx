// components/ParallaxSection.tsx
import React from 'react'
import { useParallax } from '../lib/hooks/useParallax'

interface Props {
   image: string
   index: number
   speed?: number
   children: React.ReactNode
}

export function ParallaxSection({ image, index, speed = 0.4, children }: Props) {
   const bgRef = useParallax(speed)

   return (
      <section
         data-section
         data-index={index}
         className="relative h-screen overflow-hidden"
      >
         <div
            ref={bgRef}
            className="absolute will-change-transform"
            style={{
               inset: '-20%',
               backgroundImage: `url(${image})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         />

         {/* Overlay */}
         <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/50" />

         {/* Conteúdo */}
         <div className="relative z-10 h-full">
            {children}
         </div>
      </section>
   )
}