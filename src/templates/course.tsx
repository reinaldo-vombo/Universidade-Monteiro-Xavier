import React from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import { TCourse } from '../types'
import { api } from '../lib/services/api'

interface Props {
   pageContext: { curso: TCourse }
}

export default function CursoPage({ pageContext }: Props) {
   const { data: curso } = useQuery({
      queryKey: ['curso', pageContext.curso.id],
      queryFn: () => api.cursos.byId(pageContext.curso.id),
      initialData: pageContext.curso,
   })

   const preco = curso.price
   const turnos = curso.CourseShift.map(cs => cs.shift.name)

   // Agrupa docentes sem duplicar
   const docentes = curso.faculties.map(f => f.faculty)

   // Agrupa secções da oferta curricular
   const seccoes = curso.offeredCourses.flatMap(oc => oc.offeredCourseSections)

   return (
      <div className="min-h-screen bg-[#F7F5F0]">

         {/* Hero */}
         <section className="relative h-[65vh] bg-[#0D0D0D] overflow-hidden flex items-end">
            <img
               src="/images/curso-bg.jpg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 px-8 md:px-20 pb-16 w-full max-w-7xl mx-auto">
               <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-xs tracking-widest uppercase text-white/50 border border-white/20 px-3 py-1 rounded-full">
                     {curso.academicDepartment.title}
                  </span>
                  {turnos.map(t => (
                     <span key={t} className="text-xs tracking-widest uppercase text-white/50 border border-white/20 px-3 py-1 rounded-full">
                        {t}
                     </span>
                  ))}
               </div>
               <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
                  {curso.title}
               </h1>
               <div className="flex flex-wrap gap-10 mt-8">
                  <div>
                     <p className="text-3xl font-light text-white">{curso.durationInYears}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Anos</p>
                  </div>
                  {preco && (
                     <div>
                        <p className="text-3xl font-light text-white">
                           {preco.amount.toLocaleString('pt-PT')} <span className="text-xl">{preco.currency}</span>
                        </p>
                        <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Propina / Ano</p>
                     </div>
                  )}
                  <div>
                     <p className="text-3xl font-light text-white">{curso.courseDisciplines.length}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Disciplinas</p>
                  </div>
                  <div>
                     <p className="text-3xl font-light text-white">{docentes.length}</p>
                     <p className="text-xs tracking-widest text-white/40 uppercase mt-1">Docentes</p>
                  </div>
               </div>
            </div>
         </section>

         <div className="max-w-7xl mx-auto px-8 md:px-20 py-20 space-y-20">

            {/* CTA Grade Curricular — destaque */}
            <div className="bg-[#0D0D0D] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row
                        items-start md:items-center justify-between gap-8">
               <div>
                  <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-3">Grade Curricular</p>
                  <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                     {curso.courseDisciplines.length} disciplinas<br />
                     ao longo de {curso.durationInYears} anos
                  </h2>
               </div>
               <Link
                  to={`/cursos/${curso.id}/grade-curricular`}
                  className="shrink-0 bg-white text-[#0D0D0D] text-sm tracking-widest uppercase
                       px-8 py-4 rounded-xl hover:bg-white/90 transition-colors duration-300 font-medium"
               >
                  Ver Grade Curricular →
               </Link>
            </div>

            {/* Secções / Capacidade */}
            {seccoes.length > 0 && (
               <div>
                  <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-8">Turmas</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {seccoes.map((s, i) => (
                        <div key={i} className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6">
                           <p className="font-medium text-[#0D0D0D] mb-3">{s.title}</p>
                           <div className="flex justify-between text-sm text-[#0D0D0D]/50">
                              <span>Capacidade</span>
                              <span className="font-medium text-[#0D0D0D]">{s.maxCapacity}</span>
                           </div>
                           {s.price && (
                              <div className="flex justify-between text-sm text-[#0D0D0D]/50 mt-2">
                                 <span>Propina</span>
                                 <span className="font-medium text-[#0D0D0D]">
                                    {s.price.amount.toLocaleString('pt-PT')} {preco?.currency}
                                 </span>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Docentes */}
            {docentes.length > 0 && (
               <div>
                  <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-8">Docentes</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                     {docentes.map(d => (
                        <div key={d.id} className="flex flex-col items-center text-center">
                           {d.profileImage ? (
                              <img
                                 src={d.profileImage}
                                 alt={`${d.firstName} ${d.lastName}`}
                                 className="w-20 h-20 rounded-full object-cover mb-3"
                              />
                           ) : (
                              <div className="w-20 h-20 rounded-full bg-[#0D0D0D]/8 flex items-center
                                    justify-center text-2xl font-light text-[#0D0D0D]/30 mb-3">
                                 {d.firstName.charAt(0)}{d.lastName.charAt(0)}
                              </div>
                           )}
                           <p className="font-medium text-sm text-[#0D0D0D]">
                              {d.firstName} {d.lastName}
                           </p>
                           <p className="text-xs text-[#0D0D0D]/40 mt-0.5">Docente</p>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export const Head = ({ pageContext }: Props) => (
   <title>{pageContext.curso.title} — Universidade</title>
)
