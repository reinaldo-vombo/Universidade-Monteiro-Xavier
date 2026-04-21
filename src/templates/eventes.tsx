import React from 'react'
import EventsFilters from '../components/layout/events-filters'
import { EVENTS } from '../constants/events'
import { formatDate } from '../lib/helpers/date'
import EventsCards from '../components/layout/events'
import { useQueryParams } from '../lib/hooks/use-query-params'

const Eventes = () => {
   const events = EVENTS
   const event = events[0]
   const { search } = useQueryParams()
   console.log('hey', search);

   return (
      <div className='space-y-9'>
         <div className="bg-[#0D0D0D] h-1/2 px-6 md:px-20 pt-36 pb-16">
            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Explora novos eventos e workshop
            </h1>
         </div>
         <div className="container">

            <div>
               <div className='grid grid-cols-12 gap-8 mb-10'>
                  <div className="col-span-8">
                     <img
                        className='rounded-4xl w-full h-130 object-cover'
                        src={event.thumbnail}
                        width={400}
                        height={400}
                        alt={event.title} />

                  </div>
                  <div className='space-y-6 col-span-4'>
                     {/* <span>{formatDate(event.date)}</span> */}
                     <span>{event.date}</span>
                     <h2 className='uppercase text-4xl tracking-[0.3em] font-medium'>{event.title}</h2>

                  </div>
               </div>
               <EventsFilters />
               <EventsCards data={events} search={search} />
            </div>

         </div>
      </div>
   )
}

export default Eventes
