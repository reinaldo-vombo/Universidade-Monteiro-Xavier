import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Button } from '../ui/button'
import { ChevronDownIcon, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { useQueryParams } from '../../lib/hooks/use-query-params'

const EventsFilters = () => {
   const { search, setSearch } = useQueryParams()


   return (
      <div className='flex items-center justify-between gap-4 mb-10'>
         <div className='flex items-center gap-10'>
            <div className='rounded-lg border-card'>
               <Collapsible className="rounded-md data-[state=open]:bg-muted">
                  <CollapsibleTrigger asChild>
                     <Button variant="ghost" className="group w-full">
                        Product details
                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                     </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                     <div>
                        This panel can be expanded or collapsed to reveal additional
                        content.
                     </div>
                     <Button size="xs">Learn More</Button>
                  </CollapsibleContent>
               </Collapsible>
            </div>
            <div className='relative'>
               <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='rounded-full' placeholder='PESQUISA ENVENTOS' />
               <Search className='absolute top-2 right-2 text-neutral-500 size-4' />
            </div>
         </div>
         <button>MOSTRAR EVENTOS PASSADOS</button>
      </div>
   )
}

export default EventsFilters
