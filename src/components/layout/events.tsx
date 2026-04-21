import React from 'react'
import { formatDate } from '../../lib/helpers/date';
import { Tag } from 'lucide-react';
import { useUrlParams } from '../../lib/hooks/use-url-params';
import { useDebounce } from '../../lib/hooks/use-debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryParams } from '../../lib/hooks/use-query-params';
import { Link } from 'gatsby';
type TProps = {
   data: {
      id: string;
      title: string;
      slug: string;
      date: Date | string;
      category: string;
      thumbnail: string;
      gallery: string[];
      description: string;
   }[]
   search: string
}
function navigateWithTransition(to: string) {
   if (!document.startViewTransition) {
      window.location.href = to
      return
   }
   document.startViewTransition(() => {
      window.location.href = to
   })
}
const EventsCards = ({ data, search }: TProps) => {
   // 🔎 filtro (case insensitive)
   const debouncedSearch = useDebounce(search, 400);
   const filteredData = data.filter((item) => {

      return item.title
         .toLowerCase()
         .includes(debouncedSearch.toLowerCase());
   });
   return (
      <div className="grid grid-cols-3 gap-10">
         <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
               filteredData.map((event) => (
                  <motion.div
                     key={event.id}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.3 }}
                     className="space-y-4"
                  >
                     <Link to={`/evento/${event.slug}`} className='block'>
                        <div className='overflow-hidden' style={{
                           // view-transition-name único por card — CSS inline porque Tailwind não suporta dinâmico
                           viewTransitionName: `evento-image-${event.slug}`,
                        } as React.CSSProperties}>
                           <img
                              className="rounded-lg object-cover h-72 w-full transition-transform duration-500"
                              src={event.thumbnail}
                              alt={event.title}
                           />

                        </div>

                     </Link>

                     <span>{event.date as string}</span>
                     {/* <span>{formatDate(event.date)}</span> */}

                     <h2 className="uppercase tracking-[0.3em] line-clamp-2 text-3xl font-medium">
                        {event.title}
                     </h2>

                     <span className="flex items-center gap-4">
                        <Tag className="text-red-500" /> Universidade
                     </span>
                  </motion.div>
               ))
            ) : (
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3"
               >
                  Sem eventos
               </motion.p>
            )}
         </AnimatePresence>
      </div>
   )
}

export default EventsCards;
