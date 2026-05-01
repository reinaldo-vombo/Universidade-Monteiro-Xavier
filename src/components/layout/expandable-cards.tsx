import React, { useState } from 'react'
import { Variants, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Link } from 'gatsby';
import { useNavigateWithTransition } from '../../lib/hooks/use-navigate-with-transition';
interface ExpandableCard {
   id: string;
   title: string;
   slug: string;
   description: React.ReactNode;
   thumbnail: string
}

interface ExpandableCardsProps {
   cards: ExpandableCard[];
   defaultExpanded?: string;
   className?: string;
}

export default function ExpandableCards({
   cards,
   defaultExpanded = '1',
   className,
}: ExpandableCardsProps) {
   const [expandedId, setExpandedId] = useState<string>(defaultExpanded);
   const navigateWithTransition = useNavigateWithTransition();

   const cardVariants: Variants = {
      expanded: {
         flex: 3,
         transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
      },
      collapsed: {
         flex: 1,
         transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },

      },
   };

   return (
      <div className={cn('flex gap-3 sm:gap-4 w-full h-full', className)}>
         {cards.map((card) => {
            const isExpanded = expandedId === card.id;

            return (
               <motion.div
                  role='link'
                  key={card.id}
                  className='relative h-full bg-cover bg-center overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer over-layer'
                  variants={cardVariants}
                  onClick={() => navigateWithTransition(`/evento/${card.slug}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigateWithTransition(`/evento/${card.slug}`)}
                  initial={isExpanded ? 'expanded' : 'collapsed'}
                  animate={isExpanded ? 'expanded' : 'collapsed'}
                  onMouseEnter={() => setExpandedId(card.id)}
                  style={{ backgroundImage: `url(${card?.thumbnail})`, viewTransitionName: `evento-image-${card.id}` } as React.CSSProperties}
               >

                  {isExpanded && (
                     <div className='relative z-20 flex items-center justify-center p-4 text-white'>
                        <motion.h2 className='font-bold mt-auto text-center text-2xl' initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.4, delay: 0.7 }}>
                           {card?.title}
                        </motion.h2>
                     </div>
                  )}

                  {isExpanded && (
                     typeof card.description === "string" &&
                        card.description.trim().startsWith("<") ? (
                        <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.4, delay: 0.7 }}
                           className="mt-2 p-3.5 text-sm text-justify relative z-20 text-white font-semibold line-clamp-6"
                           dangerouslySetInnerHTML={{ __html: card?.description }}
                        />
                     ) : (
                        <motion.p
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.4, delay: 0.7 }}
                           className="mt-2 p-3.5 text-sm relative z-20 text-white font-semibold">{card.description}</motion.p>
                     )
                  )}
                  {isExpanded && (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className=" p-3.5 text-sm absolute inset-0 z-10 text-white font-semibold bluer-bg"
                     />
                  )}
               </motion.div>
            );
         })}
      </div>
   );
}