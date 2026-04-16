import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TAdmitionExameFase } from '../types'
import { api } from '../lib/services/api'
import { formatDateShort, isActive, isPast } from '../lib/helpers/exame-fase'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'

type View = 'timeline' | 'tabela'
interface Props {
   pageContext: { exameFase: TAdmitionExameFase }
}

export default function ExamesPage({ pageContext }: Props) {
   const [view, setView] = useState<View>('timeline')

   const { data: fases = [], isPending } = useQuery<any>({
      queryKey: ['exame-fases'],
      queryFn: api.exames.fases,
      staleTime: 1000 * 60 * 5,
      // Mantém lista anterior visível enquanto refetch
      placeholderData: (prev: any) => prev,
   })

   if (isPending) return <p>Carregando...</p>;


   const sorted = [...fases.data].sort((a, b) => a.ordem - b.ordem)

   return (
      <div className="min-h-screen bg-[#F7F5F0]">
         <div className="bg-[#0D0D0D] h-1/2 px-8 md:px-20 pt-40 pb-14 relative">
            <Link
               to="/exames-de-acesso"
               className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                 transition-colors mb-10 inline-block"
            >
               ← Todos os registos
            </Link>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
               Admissão
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Fase dos Exames de Admissão
            </h1>
            <p className="text-white/50 mt-6 text-lg font-light max-w-xl">
               Acompanha todas as fases do processo de candidatura e admissão.
            </p>

            {/* Toggle view */}
            <div className="flex gap-2 mt-12">
               {(['timeline', 'tabela'] as View[]).map(v => (
                  <button
                     key={v}
                     onClick={() => setView(v)}
                     className={`px-5 py-2 text-xs tracking-widest uppercase rounded-full transition-all duration-300
                ${view === v
                           ? 'bg-white text-[#0D0D0D]'
                           : 'border border-white/20 text-white/50 hover:text-white/80'
                        }`}
                  >
                     {v}
                  </button>
               ))}
            </div>
         </div>

         <div className="max-w-5xl mx-auto px-8 md:px-20 py-20">

            {isPending ? (
               <div className="flex items-center justify-center py-32">
                  <p className="text-sm tracking-widest text-[#0D0D0D]/30 uppercase">A carregar...</p>
               </div>
            ) : view === 'timeline' ? (
               <TimelineView fases={sorted} />
            ) : (
               <TabelaView fases={sorted} />
            )}
         </div>
      </div>
   )
}

/* ─── Timeline ─────────────────────────────────────────── */
function TimelineView({ fases }: { fases: TAdmitionExameFase[] }) {
   return (
      <div className="relative">
         {/* linha vertical */}
         <div className="absolute left-1.75 top-3 bottom-3 w-px bg-[#0D0D0D]/10" />

         <div className="space-y-0">
            {fases.map((fase, i) => {
               const active = isActive(fase)
               const past = isPast(fase)

               return (
                  <div key={fase.id} className="relative flex gap-8 pb-12 last:pb-0">
                     {/* dot */}
                     <div className={`relative z-10 mt-1.5 w-3.5 h-3.5 rounded-full shrink-0 border-2 transition-all
                ${active ? 'bg-[#0D0D0D] border-[#0D0D0D] scale-125'
                           : past ? 'bg-[#0D0D0D]/20 border-[#0D0D0D]/20'
                              : 'bg-white border-[#0D0D0D]/30'
                        }`}
                     />

                     {/* card */}
                     <div className={`flex-1 rounded-2xl p-6 border transition-all duration-300
                ${active
                           ? 'bg-[#0D0D0D] border-[#0D0D0D]'
                           : 'bg-white border-[#0D0D0D]/8 hover:border-[#0D0D0D]/20'
                        }`}>

                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                 <span className={`text-xs tracking-widest uppercase font-medium
                        ${active ? 'text-white/50' : 'text-[#0D0D0D]/30'}`}>
                                    Fase {fase.ordem}
                                 </span>
                                 {active && (
                                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                       Em curso
                                    </span>
                                 )}
                                 {past && (
                                    <b className="text-xs text-[#ff0000]">Encerrada</b>
                                 )}
                              </div>
                              <h3 className={`text-xl font-medium ${active ? 'text-white' : 'text-[#0D0D0D]'}`}>
                                 {fase.name}
                              </h3>
                           </div>

                           {/* Datas */}
                           <div className={`text-right text-sm ${active ? 'text-white/60' : 'text-[#0D0D0D]/50'}`}>
                              <p>{formatDateShort(fase.startDate)} → {formatDateShort(fase.endDate)}</p>
                              {fase.duoDate && (
                                 <p className={`text-xs mt-1 ${active ? 'text-white/40' : 'text-[#0D0D0D]/30'}`}>
                                    Prazo: {formatDateShort(fase.duoDate)}
                                 </p>
                              )}
                           </div>
                        </div>

                        {/* Local */}
                        {(fase.building || fase.room) && (
                           <div className={`flex gap-6 pt-4 border-t text-sm
                    ${active ? 'border-white/10 text-white/50' : 'border-[#0D0D0D]/8 text-[#0D0D0D]/50'}`}>
                              {fase.building && (
                                 <div>
                                    <p className={`text-xs tracking-widest uppercase mb-1
                          ${active ? 'text-white/30' : 'text-[#0D0D0D]/30'}`}>
                                       Edifício
                                    </p>
                                    <p className={active ? 'text-white/70' : ''}>{fase.building.title}</p>
                                 </div>
                              )}
                              {fase.room && (
                                 <div>
                                    <p className={`text-xs tracking-widest uppercase mb-1
                          ${active ? 'text-white/30' : 'text-[#0D0D0D]/30'}`}>
                                       Sala
                                    </p>
                                    <p className={active ? 'text-white/70' : ''}>{fase.room.roomNumber}</p>
                                 </div>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

/* ─── Tabela ─────────────────────────────────────────── */
function TabelaView({ fases }: { fases: TAdmitionExameFase[] }) {
   return (
      <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl overflow-hidden">
         <table className="w-full text-sm">
            <thead>
               <tr className="border-b border-[#0D0D0D]/8">
                  {['Fase', 'Nome', 'Início', 'Fim', 'Prazo', 'Local', 'Estado'].map(h => (
                     <th key={h} className="text-left px-5 py-4 text-xs tracking-widest uppercase text-[#0D0D0D]/40 font-normal first:pl-6 last:pr-6">
                        {h}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {fases.map(fase => {
                  const active = isActive(fase)
                  const past = isPast(fase)
                  return (
                     <tr key={fase.id} className={`border-b border-[#0D0D0D]/5 last:border-0 transition-colors
                ${active ? 'bg-[#0D0D0D]/3' : 'hover:bg-[#0D0D0D]/1'}`}>
                        <td className="pl-6 py-4 text-[#0D0D0D]/40 tabular-nums font-mono text-xs">
                           {String(fase.ordem).padStart(2, '0')}
                        </td>
                        <td className="px-5 py-4 font-medium text-[#0D0D0D]">{fase.name}</td>
                        <td className="px-5 py-4 text-[#0D0D0D]/60 tabular-nums">
                           {formatDateShort(fase.startDate)}
                        </td>
                        <td className="px-5 py-4 text-[#0D0D0D]/60 tabular-nums">
                           {formatDateShort(fase.endDate)}
                        </td>
                        <td className="px-5 py-4 text-[#0D0D0D]/40 tabular-nums text-xs">
                           {fase.duoDate ? formatDateShort(fase.duoDate) : '—'}
                        </td>
                        <td className="px-5 py-4 text-[#0D0D0D]/60 text-xs">
                           {fase.building?.title ?? '—'}
                           {fase.room ? ` · ${fase.room.roomNumber}` : ''}
                        </td>
                        <td className="pr-6 py-4">
                           {active ? (
                              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                 Em curso
                              </span>
                           ) : past ? (
                              <span className="text-xs text-[#0D0D0D]/30">Concluída</span>
                           ) : (
                              <span className="text-xs text-[#0D0D0D]/50">Pendente</span>
                           )}
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   )
}

export const Head = () => <SEO title='Exames de Admissão' />
