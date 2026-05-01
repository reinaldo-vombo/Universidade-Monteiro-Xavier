import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Button } from '../ui/button'
import { ChevronDownIcon, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useQueryParams } from '../../lib/hooks/use-query-params'
import { ComboboxBasic } from './drop-dwon'

const EventsFilters = () => {
   const { search, setSearch } = useQueryParams()


   return (
      <div className='flex items-center justify-between gap-4 mb-10'>
         <div className='flex items-center gap-10 flex-col md:flex-row'>
            <div className='rounded-lg border-card'>
               <ComboboxBasic />
            </div>
            <div className='relative hidden md:block'>
               <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='rounded-full' placeholder='PESQUISA ENVENTOS' />
               <Search className='absolute top-2 right-2 text-neutral-500 size-4' />
            </div>
         </div>
         <button className='hidden md:block'>MOSTRAR EVENTOS PASSADOS</button>
      </div>
   )
}

export default EventsFilters
