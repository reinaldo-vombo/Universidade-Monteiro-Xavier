import React from 'react'
import { PASSED_FILTERS, TABS, TabStatus } from '../../constants/exames'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Options } from 'nuqs'
import { TAdmitionExame } from '../../types'

type TProps = {
   setSearch: (value: string) => void
   setPassed: (value: boolean | null) => void
   search: string
   passed: boolean
   registers: TAdmitionExame[]
   status: "ALL" | "CONFIRMED" | "WAITING_LIST" | "CANCELLED"
   setStatus: (value: "ALL" | "CONFIRMED" | "WAITING_LIST" | "CANCELLED") => void
}
const ExameFilter = ({ passed, registers, search, setSearch, setPassed, setStatus, status }: TProps) => {
   const counts: Record<TabStatus, number> = {
      ALL: registers.length || 0,
      CONFIRMED: registers.filter(r => r.status === 'CONFIRMED').length || 0,
      WAITING_LIST: registers?.filter(r => r.status === 'WAITING_LIST').length || 0,
      CANCELLED: registers.filter(r => r.status === 'CANCELLED').length || 0,
   }
   return (
      <>
         <div className="flex overflow-x-auto mb-8 gap-0 border-b border-[#0D0D0D]/10 scrollbar-none">
            {TABS.map(tab => (
               <button
                  key={tab.value}
                  onClick={() => setStatus(tab.value)}
                  className={`shrink-0 flex items-center gap-2 px-5 py-5 text-sm tracking-wide
                                border-b-2 transition-all duration-200
                                ${status === tab.value
                        ? 'border-[#0D0D0D] text-[#0D0D0D] font-medium'
                        : 'border-transparent text-[#0D0D0D]/40 hover:text-[#0D0D0D]/60'
                     }`}
               >
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full
                      ${status === tab.value
                        ? 'bg-[#0D0D0D] text-white'
                        : 'bg-[#0D0D0D]/8 text-[#0D0D0D]/40'
                     }`}>
                     {counts[tab.value]}
                  </span>
               </button>
            ))}
         </div>
         <div className='flex flex-col sm:flex-row items-center justify-between'>
            <div className="relative w-full sm:w-80">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30 text-sm">
                  ⌕
               </span>
               <Input
                  type="text"
                  placeholder="Filtrar por primero nome"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className=""
               />
               {search && (
                  <button
                     onClick={() => setSearch('')}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0D0D0D]/30
                             hover:text-[#0D0D0D]/60 transition-colors text-xs"
                  >
                     ✕
                  </button>
               )}
            </div>
            <div className="flex items-center gap-1 bg-[#0D0D0D]/4 rounded-xl p-1">
               {PASSED_FILTERS.map(f => {
                  const isActive = passed === (f.value ?? null)
                  return (
                     <Button
                        key={String(f.value)}
                        onClick={() => setPassed(f.value ?? null)}
                        className={`flex items-center gap-2 text-xs
                            font-medium transition-all duration-200 whitespace-nowrap
                            ${isActive
                              ? 'bg-white text-[#0D0D0D] shadow-sm'
                              : 'text-[#ffffff] hover:text-[#0D0D0D]/70'
                           }`}
                     >
                        {/* dot colorido por estado */}
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors
                  ${f.value === true ? 'bg-emerald-500' :
                              f.value === false ? 'bg-red-400' :
                                 'bg-[#d10808]/20'}`}
                        />
                        {f.label}
                        {/* contagem */}
                        <span className={`${isActive ? 'text-[#0D0D0D]/40' : 'text-[#0D0D0D]/25'}`}>
                           {f.value === undefined
                              ? registers.length
                              : registers.filter(r => r.passed === f.value).length
                           }
                        </span>
                     </Button>
                  )
               })}
            </div>

         </div>
      </>
   )
}

export default ExameFilter
