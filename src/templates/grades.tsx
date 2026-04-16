import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import { TCourse } from '../types'
import { api } from '../lib/services/api'

interface Props {
   pageContext: { curso: TCourse }
}

const YEAR_LABEL: Record<string, string> = {
   FIRST_YEAR: '1º Ano',
   SECOND_YEAR: '2º Ano',
   THIRD_YEAR: '3º Ano',
   FOURTH_YEAR: '4º Ano',
   FIFTH_YEAR: '5º Ano',
}

export default function GradeCurricularPage({ pageContext }: Props) {
   const { data: curso } = useQuery({
      queryKey: ['curso', pageContext.curso.id],
      queryFn: () => api.cursos.byId(pageContext.curso.id),
      initialData: pageContext.curso,
      initialDataUpdatedAt: 0,
      staleTime: 1000 * 60 * 10,
   })

   // Agrupa por yearLevel → semesterId
   const grouped = curso.courseDisciplines.reduce<
      Record<string, Record<string, typeof curso.courseDisciplines>>
   >((acc, cd) => {
      const year = cd.yearLevel as string
      const sem = cd.semesterId
      if (!acc[year]) acc[year] = {}
      if (!acc[year][sem]) acc[year][sem] = []
      acc[year][sem].push(cd)
      return acc
   }, {})

   const years = Object.keys(grouped).sort()
   const [activeYear, setActiveYear] = useState(years[0] ?? '')

   return (
      <main className="min-h-screen bg-[#F7F5F0]">

         {/* Header */}
         <section className="bg-[#0D0D0D] px-8 md:px-20 pt-32 pb-16">
            <Link
               to={`/cursos/${curso.id}`}
               className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                     transition-colors mb-8 inline-block"
            >
               ← {curso.title}
            </Link>
            <h1 className="text-4xl md:text-6xl font-light text-white leading-none">
               Grade Curricular
            </h1>
            <p className="text-white/50 mt-4 text-lg font-light">
               {curso.courseDisciplines.length} disciplinas · {curso.durationInYears} anos
            </p>
         </section>

         {/* Year tabs */}
         <div className="sticky top-0 z-20 bg-[#F7F5F0] border-b border-[#0D0D0D]/10">
            <div className="max-w-7xl mx-auto px-8 md:px-20">
               <div className="flex overflow-x-auto gap-0 scrollbar-none">
                  {years.map(year => (
                     <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`shrink-0 px-6 py-5 text-sm tracking-widest uppercase transition-all duration-300
                  border-b-2 ${activeYear === year
                              ? 'border-[#0D0D0D] text-[#0D0D0D] font-medium'
                              : 'border-transparent text-[#0D0D0D]/40 hover:text-[#0D0D0D]/70'
                           }`}
                     >
                        {YEAR_LABEL[year] ?? year}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Disciplinas do ano seleccionado */}
         <div className="max-w-7xl mx-auto px-8 md:px-20 py-16">
            {activeYear && grouped[activeYear] && (
               <div className="space-y-12">
                  {Object.entries(grouped[activeYear])
                     .sort(([a], [b]) => a.localeCompare(b))
                     .map(([semId, disciplinas], semIdx) => (
                        <div key={semId}>
                           <p className="text-xs tracking-[0.25em] text-[#0D0D0D]/40 uppercase mb-6">
                              {semIdx + 1}º Semestre
                           </p>

                           {/* Tabela */}
                           <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl overflow-hidden">
                              <table className="w-full text-sm">
                                 <thead>
                                    <tr className="border-b border-[#0D0D0D]/8">
                                       <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#0D0D0D]/40 font-normal w-8">
                                          #
                                       </th>
                                       <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#0D0D0D]/40 font-normal">
                                          Disciplina
                                       </th>
                                       <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#0D0D0D]/40 font-normal hidden md:table-cell">
                                          Ano
                                       </th>
                                       <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#0D0D0D]/40 font-normal hidden lg:table-cell">
                                          Semestre
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {disciplinas.map((cd, i) => (
                                       <tr
                                          key={cd.id}
                                          className="border-b border-[#0D0D0D]/5 last:border-0
                                       hover:bg-[#0D0D0D]/2 transition-colors"
                                       >
                                          <td className="px-6 py-4 text-[#0D0D0D]/30 tabular-nums">
                                             {String(i + 1).padStart(2, '0')}
                                          </td>
                                          <td className="px-6 py-4 font-medium text-[#0D0D0D]">
                                             {cd.discipline.name}
                                          </td>
                                          <td className="px-6 py-4 text-[#0D0D0D]/50 hidden md:table-cell">
                                             {YEAR_LABEL[cd.yearLevel as string] ?? cd.yearLevel}
                                          </td>
                                          <td className="px-6 py-4 text-[#0D0D0D]/50 hidden lg:table-cell">
                                             {semIdx + 1}º
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     ))}
               </div>
            )}
         </div>
      </main>
   )
}

export const Head = ({ pageContext }: Props) => (
   <title>Grade Curricular — {pageContext.curso.title}</title>
)
