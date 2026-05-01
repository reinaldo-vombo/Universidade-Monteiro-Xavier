import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
type TProps = {
   content: {
      title: string;
      description: string;
      thumbnail: string;
      link?: string;
   }[]
   contentClassName?: string
}

const StickyScroll = ({ content, contentClassName }: TProps) => {
   const [activeCard, setActiveCard] = useState(0);
   const ref = useRef<HTMLDivElement | null>(null);

   // Altura dinâmica (1 viewport por card)
   const sectionHeight = `${content.length * 100}vh`;

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"],
   });

   useMotionValueEvent(scrollYProgress, "change", (latest) => {
      const breakpoints = content.map((_, i) => i / content.length);

      const closestIndex = breakpoints.reduce((acc, point, i) => {
         const distance = Math.abs(latest - point);
         if (distance < Math.abs(latest - breakpoints[acc])) {
            return i;
         }
         return acc;
      }, 0);

      setActiveCard(closestIndex);
   });

   return (
      <section
         ref={ref}
         style={{ height: sectionHeight }}
         className="relative"
      >
         <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl md:px-6">

               {/* TEXTOS */}
               <div className="hidden lg:flex items-center">
                  <div className="w-full relative h-50">

                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeCard}
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -30 }}
                           transition={{ duration: 0.4 }}
                           className="absolute w-full space-y-6"
                        >
                           <div>
                              <h2 className="font-semibold text-2xl">
                                 {content[activeCard]?.title}
                              </h2>
                           </div>
                           {typeof content[activeCard]?.description === "string" &&
                              content[activeCard]?.description.trim().startsWith("<") ? (
                              <div
                                 dangerouslySetInnerHTML={{ __html: content[activeCard]?.description }}
                              />
                           ) : (
                              null
                           )}

                        </motion.div>
                     </AnimatePresence>

                  </div>
               </div>
               <div className="lg:hidden relative w-full flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                     <h2 className="font-semibold text-2xl">
                        {content[activeCard]?.title}
                     </h2>
                  </div>
                  <div className="relative w-full max-w-md h-[60vh] rounded-xl overflow-hidden">

                     {/* Imagem */}
                     <img
                        src={content[activeCard]?.thumbnail ?? "/logo-black.png"}
                        key={activeCard}
                        alt={content[activeCard]?.title}
                        className="w-full h-full object-fill md:object-cover"
                     />

                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black/40" />

                     {/* Texto centralizado */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <AnimatePresence mode="wait">
                           <motion.div
                              key={activeCard}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.4 }}
                           >

                              <h2 className="text-xl font-bold text-white mb-3">
                                 {content[activeCard]?.title}

                              </h2>
                           </motion.div>
                        </AnimatePresence>
                     </div>

                  </div>
               </div>

               {/* VISUAL / IMAGEM */}
               <div
                  className={`hidden lg:flex items-center justify-center sticky top-20 ${contentClassName}`}
               >
                  <img
                     src={content[activeCard]?.thumbnail ?? '/logo-black.png'}
                     key={activeCard}
                     width={500}
                     height={500}
                     className="rounded-lg size-125 object-cover"
                     alt={content[activeCard]?.title} />
               </div>
            </div>
         </div>
      </section>
   );
};

export default StickyScroll;