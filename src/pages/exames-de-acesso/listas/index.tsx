
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SEO } from '../../../components/seo'
import { TRegistrationStatus } from '../../../types/enum'
import { TAdmitionExame } from '../../../types'
import { api } from '../../../lib/services/api'
import { Input } from '../../../components/ui/input'
import { useUrlParams } from '../../../lib/hooks/use-url-params'
import { RegistosTable } from '../../../components/layout/registos-table'
import { Link } from 'gatsby'


const TABS: { label: string; value: TRegistrationStatus | 'ALL' }[] = [
   { label: 'Todos', value: 'ALL' },
   { label: 'Confirmados', value: 'CONFIRMED' },
   { label: 'Lista de Espera', value: 'WAITING_LIST' },
   { label: 'Cancelados', value: 'CANCELLED' },
]

export default function RegistosExamePage() {
   const {
      values,
   } = useUrlParams({
      search: '',
      exameId: '',
      status: 'ALL',
   })
   const [activeTab, setActiveTab] = useState<TRegistrationStatus | 'ALL'>('ALL')

   const { data: registos = [], isPending } = useQuery<TAdmitionExame[]>({
      queryKey: ['registos-exame', values.exameId, values.search],
      queryFn: () => api.exames.registos({
         exameId: values.exameId || undefined,
         search: values.search || undefined,
      }),
      staleTime: 1000 * 60 * 2,
      placeholderData: (prev) => prev,
   })

   const filtered = values.status === 'ALL'
      ? registos
      : registos.filter(r => r.status === values.status)

   const counts = {
      ALL: registos.length,
      CONFIRMED: registos.filter(r => r.status === 'CONFIRMED').length,
      WAITING_LIST: registos.filter(r => r.status === 'WAITING_LIST').length,
      CANCELLED: registos.filter(r => r.status === 'CANCELLED').length,
   }

   return (
      <div>
         <div className="bg-[#0D0D0D] h-1/2 px-6 md:px-20 pt-36 pb-16">
            <div className="grid">
               <Link
                  to="/exames-de-acesso"
                  className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                 transition-colors mb-10 inline-block"
               >
                  ← Exames de Acesso
               </Link>
               <Link
                  to="/exames-de-acesso/fases-dos-exames"
                  className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                 transition-colors mb-10 inline-block"
               >
                  ← Todas as fases
               </Link>

            </div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Admissão</p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Registos
            </h1>
            <p className="text-white/40 mt-4 text-base font-light">
               Consulta o estado da tua candidatura ao exame de admissão.
            </p>
         </div>

         <div className="max-w-7xl mx-auto px-6 md:px-20">

            {/* Tabs */}

            <div className="flex overflow-x-auto gap-0 border-b border-[#0D0D0D]/10 scrollbar-none">

               {TABS.map(tab => (
                  <button
                     key={tab.value}
                     onClick={() => setActiveTab(tab.value)}
                     className={`shrink-0 flex items-center gap-2 px-5 py-5 text-sm tracking-wide
                          border-b-2 transition-all duration-200
                          ${activeTab === tab.value
                           ? 'border-[#0D0D0D] text-[#0D0D0D] font-medium'
                           : 'border-transparent text-[#0D0D0D]/40 hover:text-[#0D0D0D]/60'
                        }`}
                  >
                     {tab.label}
                     <span className={`text-xs px-2 py-0.5 rounded-full
                ${activeTab === tab.value
                           ? 'bg-[#0D0D0D] text-white'
                           : 'bg-[#0D0D0D]/8 text-[#0D0D0D]/40'
                        }`}>
                        {counts[tab.value]}
                     </span>
                  </button>
               ))}
            </div>

            {/* Lista */}
            <div className="py-10">
               {isPending ? (
                  <LoadingState />
               ) : filtered.length === 0 ? (
                  <EmptyState />
               ) : (
                  <RegistosTable data={registos} status={activeTab} />
               )}
            </div>
         </div>
      </div>
   )
}

function LoadingState() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
         {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6 animate-pulse">
               <div className="flex gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D]/6" />
                  <div className="flex-1 space-y-2">
                     <div className="h-4 bg-[#0D0D0D]/6 rounded w-3/4" />
                     <div className="h-3 bg-[#0D0D0D]/4 rounded w-1/2" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, j) => (
                     <div key={j} className="space-y-1">
                        <div className="h-2 bg-[#0D0D0D]/4 rounded w-1/2" />
                        <div className="h-4 bg-[#0D0D0D]/6 rounded" />
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   )
}

function EmptyState() {
   return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
         <div className="w-16 h-16 rounded-full bg-[#0D0D0D]/6 flex items-center
                      justify-center text-2xl text-[#0D0D0D]/20 mb-4">
            ◎
         </div>
         <p className="text-[#0D0D0D]/40 text-sm">Nenhum registo encontrado</p>
      </div>
   )
}

export const Head = () => <SEO title='Lista dos Exames de Acesso' />
