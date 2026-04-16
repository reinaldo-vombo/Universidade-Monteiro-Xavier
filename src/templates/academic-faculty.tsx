import React from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import { TAcademicFaculty, TDepartemant } from '../types'
import { api } from '../lib/services/api'

interface Props {
   pageContext: {
      unidade: TAcademicFaculty
      departamentos: {
         data: TDepartemant[]
      }
   }
}

export default function UnidadePage({ pageContext }: Props) {
   const { data: departamentos } = useQuery({
      queryKey: ['departamentos-by-faculty', pageContext.unidade.id],
      queryFn: () => api.departamentos.byFaculty(pageContext.unidade.id),
      initialData: pageContext.departamentos,
   })


   const totalCursos = departamentos.data.reduce((s: any, d: any) => s + d._count.courses, 0)
   const totalEstudantes = departamentos.data.reduce((s: any, d: any) => s + d._count.students, 0)

   return (
      <div className="min-h-screen bg-[#F7F5F0]">

         {/* Hero */}
         <section className="relative h-[60vh] bg-[#0D0D0D] overflow-hidden flex items-end">
            <img
               src="/img1.jpg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 px-8 md:px-20 pb-16 w-full max-w-7xl mx-auto">
               <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">
                  Unidade Académica
               </p>
               <h1 className="text-5xl md:text-8xl font-light text-white leading-none tracking-tight">
                  {pageContext.unidade.title}
               </h1>
               <div className="flex gap-10 mt-8">
                  <div>
                     <p className="text-3xl font-light text-white">{departamentos.data.length}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Departamentos</p>
                  </div>
                  <div>
                     <p className="text-3xl font-light text-white">{totalCursos}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Cursos</p>
                  </div>
                  <div>
                     <p className="text-3xl font-light text-white">{totalEstudantes.toLocaleString('pt-PT')}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Estudantes</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Departamentos */}
         <div className="max-w-7xl mx-auto px-8 md:px-20 py-20">
            <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-12">Departamentos</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {departamentos.data.map((dep: any) => (
                  <Link
                     key={dep.id}
                     to={`/departamentos/${dep.id}`}
                     className="group block bg-white border border-[#0D0D0D]/8 rounded-2xl p-8
                         hover:border-[#0D0D0D]/20 hover:shadow-sm transition-all duration-300"
                  >
                     <div className="flex items-start justify-between mb-6">
                        <h3 className="text-xl font-medium text-[#0D0D0D] leading-snug max-w-[70%]">
                           {dep.title}
                        </h3>
                        <span className="text-[#0D0D0D]/20 group-hover:text-[#0D0D0D]/50
                                 transition-colors text-xl mt-0.5">→</span>
                     </div>

                     <p className="text-sm text-[#0D0D0D]/60 leading-relaxed line-clamp-2 mb-8">
                        {dep.description}
                     </p>

                     <div className="flex gap-6 pt-6 border-t border-[#0D0D0D]/6">
                        {[
                           { label: 'Cursos', value: dep._count.courses },
                           { label: 'Estudantes', value: dep._count.students },
                           { label: 'Faculdades', value: dep._count.faculties },
                        ].map(s => (
                           <div key={s.label}>
                              <p className="text-lg font-light text-[#0D0D0D]">{s.value}</p>
                              <p className="text-xs text-[#0D0D0D]/40 tracking-wide mt-0.5">{s.label}</p>
                           </div>
                        ))}
                     </div>

                     {dep.departmentHead && (
                        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#0D0D0D]/6">
                           {dep.departmentHead.avatar ? (
                              <img
                                 src={dep.departmentHead.avatar}
                                 alt={dep.departmentHead.name}
                                 className="w-8 h-8 rounded-full object-cover"
                              />
                           ) : (
                              <div className="w-8 h-8 rounded-full bg-[#0D0D0D]/8 flex items-center
                                    justify-center text-xs text-[#0D0D0D]/40">
                                 {dep.departmentHead.name.charAt(0)}
                              </div>
                           )}
                           <p className="text-xs text-[#0D0D0D]/50">{dep.departmentHead.name}</p>
                        </div>
                     )}
                  </Link>
               ))}
            </div>
         </div>
      </div>
   )
}

export const Head = ({ pageContext }: Props) => (
   <title>{pageContext.unidade.title} — Universidade</title>
)
