import React from 'react'
import { Link } from 'gatsby'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/services/api'

interface Props {
   pageContext: { departamento: any }
}

export default function DepartamentoPage({ pageContext }: Props) {
   // console.log(pageContext);
   const { data: dep } = useQuery({
      queryKey: ['departamento', pageContext.departamento.id],
      queryFn: () => api.departamentos.byId(pageContext.departamento.id),
      initialData: pageContext.departamento,
      staleTime: 1000 * 60 * 10,
   })
   const data = dep as any;
   // console.log(dep);





   return (
      <div className="min-h-screen bg-[#F7F5F0]">

         {/* Hero */}
         <section className="relative h-[70vh] bg-[#0D0D0D] overflow-hidden flex items-end">
            <img
               src="/images/departamento-bg.jpg"
               alt=""
               className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            {/* grain overlay */}
            <div className="absolute inset-0 opacity-20"
               style={{ backgroundImage: 'url("/images/grain.png")', backgroundSize: '200px' }} />

            <div className="relative z-10 px-8 md:px-20 pb-16 w-full max-w-7xl mx-auto">
               <p className="text-xs tracking-[0.3em] text-white/50 mb-4 uppercase">
                  {data?.academicFaculty?.title && data?.academicFaculty.title}
               </p>
               <h1 className="text-5xl md:text-8xl font-light text-white leading-none tracking-tight mb-6">
                  {data?.title}
               </h1>
               {/* Stats row */}
               <div className="flex gap-8 mt-8">
                  {[
                     { label: 'Faculdades', value: data?._count.faculties },
                     { label: 'Cursos', value: data?._count.courses },
                     { label: 'Estudantes', value: data?._count.students },
                  ].map(s => (
                     <div key={s.label}>
                        <p className="text-3xl font-light text-white">{s.value}</p>
                        <p className="text-xs tracking-widest text-white/40 uppercase mt-1">{s.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <div className="max-w-7xl mx-auto px-8 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Descrição */}
            <div className="lg:col-span-2">
               <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-6">Sobre</p>
               <p className="text-xl md:text-2xl font-light leading-relaxed text-[#0D0D0D]/80">
                  {data?.description}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto quos aliquam eum exercitationem commodi tempora adipisci odit. Tempore aliquam possimus facilis vero officiis provident, amet, consectetur expedita, voluptatum sint corrupti?
               </p>
            </div>

            {/* Sidebar — Chefe + Info */}
            <aside className="space-y-8">
               {data?.departmentHead && (
                  <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6">
                     <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-4">
                        Chefe de Departamento
                     </p>
                     <div className="flex items-center gap-4">
                        {data?.departmentHead.avatar ? (
                           <img
                              src={data?.departmentHead.avatar}
                              alt={data?.departmentHead.name}
                              className="w-14 h-14 rounded-full object-cover"
                           />
                        ) : (
                           <div className="w-14 h-14 rounded-full bg-[#0D0D0D]/8 flex items-center justify-center text-lg font-light text-[#0D0D0D]/40">
                              {data?.departmentHead.name.charAt(0)}
                           </div>
                        )}
                        <div>
                           <p className="font-medium text-[#0D0D0D]">{data.departmentHead.name}</p>
                           <p className="text-sm text-[#0D0D0D]/50 mt-0.5">Diretor</p>
                        </div>
                     </div>
                  </div>
               )}

               <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6 space-y-4">
                  <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/40 uppercase mb-2">Faculdade</p>
                  <p className="font-medium text-[#0D0D0D]">{data.academicFaculty.title}</p>
               </div>

               <Link
                  to="/cursos"
                  className="block w-full text-center bg-[#0D0D0D] text-white text-sm tracking-widest uppercase
                       py-4 rounded-xl hover:bg-[#0D0D0D]/80 transition-colors duration-300"
               >
                  Ver Cursos →
               </Link>
            </aside>
         </div>
      </div>
   )
}

export const Head = ({ pageContext }: Props) => (
   <>
      <title>{pageContext.departamento.title} — Universidade</title>
      <meta name="description" content={pageContext.departamento.description} />
   </>
)
