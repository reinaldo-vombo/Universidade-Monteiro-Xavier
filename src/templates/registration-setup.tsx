import React, { useState } from 'react'
import { TBulkAcademicFaculty } from '../types';
import { HeadFC, Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { SEO } from '../components/seo';
interface Props {
   pageContext: { bulkFacultys: TBulkAcademicFaculty[] }
}
const RegistrationSetup = ({ pageContext }: Props) => {
   const { bulkFacultys } = pageContext;
   console.log(pageContext);

   const [selected, setSelected] = useState<string | null>(null)
   const [expandedDep, setExpandedDep] = useState<string | null>(null)

   const selectedFaculty = bulkFacultys.find(f => f.id === selected)

   const totalCourses = (f: TBulkAcademicFaculty) =>
      f.academicDepartments.reduce((s, d) => s + d.courses.length, 0)

   return (
      <div className="min-h-screen bg-[#0D0D0D]">

         {/* Hero */}
         <div className="px-6 md:px-16 pt-36 pb-20 max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.3em] text-white/30 uppercase mb-5">
               Admissão · Passo 1 de 3
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Escolhe a tua<br />
               <span className="text-white/30">unidade académica</span>
            </h1>
            <p className="text-white/40 mt-6 text-base font-light max-w-md">
               Selecciona a unidade para a qual pretendes candidatar-te. Podes consultar os departamentos e cursos disponíveis antes de prosseguir.
            </p>
         </div>

         {/* Grid de unidades */}
         <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {bulkFacultys.map((faculty, i) => {
                  const isSelected = selected === faculty.id
                  const courses = totalCourses(faculty)
                  const price = faculty.examePrice?.amount

                  return (
                     <motion.button
                        key={faculty.id}
                        onClick={() => setSelected(isSelected ? null : faculty.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                        className={`relative text-left rounded-2xl p-7 border transition-all duration-300
                            cursor-pointer group
                            ${isSelected
                              ? 'bg-white border-white'
                              : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                           }`}
                     >
                        {/* Número */}
                        <span className={`text-[10px] font-mono tracking-widest mb-4 block
                                  ${isSelected ? 'text-black/30' : 'text-white/20'}`}>
                           {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Título */}
                        <h3 className={`text-xl font-medium leading-snug mb-5
                                ${isSelected ? 'text-[#0D0D0D]' : 'text-white'}`}>
                           {faculty.title}
                        </h3>

                        {/* Stats */}
                        <div className="flex gap-6 mb-6">
                           {[
                              { label: 'Departamentos', value: faculty.academicDepartments.length },
                              { label: 'Cursos', value: courses },
                           ].map(s => (
                              <div key={s.label}>
                                 <p className={`text-2xl font-light ${isSelected ? 'text-[#0D0D0D]' : 'text-white'}`}>
                                    {s.value}
                                 </p>
                                 <p className={`text-[10px] tracking-widest uppercase mt-0.5
                                    ${isSelected ? 'text-black/40' : 'text-white/30'}`}>
                                    {s.label}
                                 </p>
                              </div>
                           ))}
                        </div>

                        {/* Preço */}
                        <div className={`flex items-center justify-between pt-5 border-t
                                 ${isSelected ? 'border-black/10' : 'border-white/8'}`}>
                           <div>
                              <p className={`text-[10px] tracking-widest uppercase mb-1
                                   ${isSelected ? 'text-black/40' : 'text-white/30'}`}>
                                 Taxa de inscrição
                              </p>
                              <p className={`text-base font-medium ${isSelected ? 'text-[#0D0D0D]' : 'text-white'}`}>
                                 {price
                                    ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'AOA', minimumFractionDigits: 0 }).format(price)
                                    : 'Gratuito'
                                 }
                              </p>
                           </div>

                           {/* Check */}
                           <div className={`w-6 h-6 rounded-full border flex items-center justify-center
                                   transition-all duration-200
                                   ${isSelected
                                 ? 'bg-[#0D0D0D] border-[#0D0D0D]'
                                 : 'border-white/20 group-hover:border-white/40'
                              }`}>
                              {isSelected && (
                                 <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                              )}
                           </div>
                        </div>
                     </motion.button>
                  )
               })}
            </div>
         </section>

         {/* Painel de detalhes — aparece ao seleccionar */}
         <AnimatePresence>
            {selectedFaculty && (
               <motion.section
                  key={selectedFaculty.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="px-6 md:px-16 pb-16 max-w-7xl mx-auto"
               >
                  <div className="bg-white/4 border border-white/10 rounded-3xl p-8 md:p-12">

                     <div className="flex items-start justify-between mb-10">
                        <div>
                           <p className="text-xs tracking-widest text-white/30 uppercase mb-2">
                              Departamentos e cursos
                           </p>
                           <h2 className="text-2xl font-light text-white">{selectedFaculty.title}</h2>
                        </div>
                        <span className="text-xs text-white/30 font-mono">
                           {selectedFaculty.academicDepartments.length} departamento{selectedFaculty.academicDepartments.length !== 1 ? 's' : ''}
                        </span>
                     </div>

                     {/* Departamentos accordion */}
                     <div className="space-y-3">
                        {selectedFaculty.academicDepartments.map((dep, di) => {
                           const isOpen = expandedDep === dep.title

                           return (
                              <div key={dep.title}
                                 className="border border-white/8 rounded-2xl overflow-hidden">

                                 <Button
                                    onClick={() => setExpandedDep(isOpen ? null : dep.title)}
                                    className="w-full flex items-center justify-between px-6 py-5
                                   hover:bg-white/4 transition-colors text-left"
                                 >
                                    <div className="flex items-center gap-4">
                                       <span className="text-[10px] font-mono text-white/20 w-5">
                                          {String(di + 1).padStart(2, '0')}
                                       </span>
                                       <span className="text-white font-medium">{dep.title}</span>
                                       <span className="text-xs text-white/30 bg-white/6 px-2 py-0.5 rounded-full">
                                          {dep.courses.length} curso{dep.courses.length !== 1 ? 's' : ''}
                                       </span>
                                    </div>

                                    <motion.span
                                       animate={{ rotate: isOpen ? 45 : 0 }}
                                       transition={{ duration: 0.2 }}
                                       className="text-white/30 text-xl leading-none"
                                    >
                                       +
                                    </motion.span>
                                 </Button>

                                 <AnimatePresence>
                                    {isOpen && (
                                       <motion.div
                                          initial={{ height: 0 }}
                                          animate={{ height: 'auto' }}
                                          exit={{ height: 0 }}
                                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                                          className="overflow-hidden"
                                       >
                                          <div className="px-6 pb-5 pt-1 border-t border-white/6">
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                                {dep.courses.map(course => (
                                                   <div key={course.id}
                                                      className="flex items-center justify-between
                                               bg-white/4 rounded-xl px-4 py-3">
                                                      <div>
                                                         <p className="text-sm text-white font-medium leading-tight">
                                                            {course.title}
                                                         </p>
                                                         <p className="text-xs text-white/30 mt-0.5">
                                                            {course.durationInYears} ano{course.durationInYears !== 1 ? 's' : ''}
                                                            {course.credit > 0 && ` · ${course.credit} créditos`}
                                                         </p>
                                                      </div>
                                                   </div>
                                                ))}
                                             </div>
                                          </div>
                                       </motion.div>
                                    )}
                                 </AnimatePresence>
                              </div>
                           )
                        })}
                     </div>

                     {/* CTA para o formulário */}
                     <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center
                              justify-between gap-6 pt-8 border-t border-white/8">
                        <div>
                           <p className="text-white font-medium">Pronto para avançar?</p>
                           <p className="text-white/40 text-sm mt-0.5">
                              Vais ser registado para {selectedFaculty.title}
                           </p>
                        </div>
                        <Link
                           to={`/exames-de-acesso/cadastro/?academicFalcultyId=${selectedFaculty.id}`}
                           className="shrink-0 flex items-center gap-3 bg-white text-[#0D0D0D]
                             text-sm font-medium tracking-wide px-7 py-4 rounded-xl
                             hover:bg-white/90 transition-colors duration-200"
                        >
                           Preencher formulário
                           <svg width="16" height="10" viewBox="0 0 22 12" fill="none">
                              <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="#0D0D0D" />
                           </svg>
                        </Link>
                     </div>
                  </div>
               </motion.section>
            )}
         </AnimatePresence>

         {/* Sticky footer CTA quando há selecção */}
         <AnimatePresence>
            {selected && (
               <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                       bg-white rounded-2xl px-6 py-4 shadow-2xl
                       flex items-center gap-6"
               >
                  <p className="text-sm text-[#0D0D0D] font-medium">
                     {selectedFaculty?.title}
                  </p>
                  <div className="w-px h-4 bg-[#0D0D0D]/15" />
                  <p className="text-sm text-[#0D0D0D]/50">
                     {selectedFaculty?.examePrice?.amount
                        ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'AOA', minimumFractionDigits: 0 }).format(selectedFaculty.examePrice.amount)
                        : 'Gratuito'
                     }
                  </p>
                  <Link
                     to={`/exames-de-acesso/cadastro/?academicFalcultyId=${selected}`}
                     className="bg-[#0D0D0D] text-white text-sm font-medium
                         px-5 py-2.5 rounded-xl hover:bg-[#0D0D0D]/80
                         transition-colors whitespace-nowrap"
                  >
                     Avançar →
                  </Link>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

export default RegistrationSetup;
export const Head: HeadFC = () =>
   <SEO title='Registo no Exame de Admissão'
      description='Regista-te para o exame de admissão. Escolhe a tua unidade académica e preenche o formulário de candidatura.'
   />
