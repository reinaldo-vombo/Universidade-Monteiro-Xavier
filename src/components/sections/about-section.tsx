// components/sections/AboutSection.tsx
import React, { useState } from 'react'
import { ABOUT } from '../../constants/data/sobre'
import { AnimatePresence, motion } from 'framer-motion'

export function AboutSection() {
   const tabs = ABOUT
   const [active, setActive] = useState(tabs[0]?.tab ?? '')
   const current = tabs.find(t => t.tab === active) ?? tabs[0];

   return (
      <section className="flex flex-col justify-center h-full">
         <div className="container">
            <p className="text-xs tracking-[0.2em] opacity-60 mb-4 uppercase">Sobre nós</p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium mb-12">
               As nossas directives
            </h2>
            <div className="sticky top-0 z-20 bg-[#F7F5F0] border-b border-[#0D0D0D]/10">
               <div className="max-w-7xl mx-auto px-6 md:px-20">
                  <div className="flex overflow-x-auto scrollbar-none">
                     {tabs.map(tab => (
                        <button
                           key={tab.tab}
                           onClick={() => setActive(tab.tab)}
                           className={`relative shrink-0 px-6 py-5 text-sm tracking-wide
                            transition-colors duration-200
                            ${active === tab.tab
                                 ? 'text-[#0D0D0D] font-medium'
                                 : 'text-[#0D0D0D]/40 hover:text-[#0D0D0D]/60'
                              }`}
                        >
                           {tab.title}
                           {/* Underline animado */}
                           {active === tab.tab && (
                              <motion.div
                                 layoutId="tab-underline"
                                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D0D0D]"
                                 transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                              />
                           )}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={active}
                     initial={{ opacity: 0, y: 16 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -8 }}
                     transition={{ duration: 0.35, ease: 'easeInOut' }}
                     className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
                  >

                     <div>
                        <h2 className="text-3xl md:text-4xl font-light text-[#0D0D0D] mb-8 leading-tight">
                           {current?.title}
                        </h2>
                        <p className="">{current.description}</p>

                     </div>
                     <div className="lg:sticky lg:top-32">
                        <div className="rounded-2xl overflow-hidden aspect-4/3">
                           <img
                              src={current.image ?? '/logo-black.png'}
                              alt={current?.title ?? ''}
                              className="w-full h-full object-cover"
                           />
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>

         </div>
      </section>
   )
}