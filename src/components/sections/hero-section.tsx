import React, { useRef } from 'react'
import FlotingSection from '../layout/floting-section'

export function HeroSection() {

   const sectionRef = useRef<HTMLElement>(null)
   return (
      <section ref={sectionRef} id='hero' className="flex relative flex-col items-center justify-center h-full text-center text-white px-8">
         <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
            <source src="/daf7f413.mp4" type="video/mp4" />
         </video>
         <div className='container relative z-10'>
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-medium leading-none">
               {process.env.GATSBY_APP_UNIVERCITY_NAME}
            </h1>
            <FlotingSection sectionRef={sectionRef} />
         </div>
      </section>
   )
}