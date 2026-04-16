// components/Departments/ScrollCard.tsx
import React, { useRef } from 'react'
import { Link } from 'gatsby'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { TDepartemant } from '../../types'
interface ScrollCardProps {
   data: TDepartemant
   i: number
   color: string
   progress: MotionValue<number>
   range: [number, number]
   targetScale: number
}
const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg',]
export function ScrollCard({ data, i, color, progress, range, targetScale }: ScrollCardProps) {
   const container = useRef<HTMLDivElement>(null)

   const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start end', 'start start'],
   })

   const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1])
   const scale = useTransform(progress, range, [1, targetScale])

   const courses = data.courses ?? []
   const head = data.departmentHead

   return (
      <div
         ref={container}
         className="h-screen flex items-center justify-center sticky top-0"
      >
         <motion.div
            style={{
               backgroundColor: color,
               scale,
               top: `calc(-5vh + ${i * 25}px)`,
            }}
            className="relative flex flex-col w-[min(90vw,900px)] h-130
                   rounded-[24px] p-10 origin-top overflow-hidden"
         >

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="flex items-start justify-between mb-8">
               <div>
                  {/* Faculdade */}
                  <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-1">
                     {data?.academicFaculty?.title}
                  </p>
                  <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[#121212]">
                     {data.title}
                  </h2>
               </div>

               {/* Nº index */}
               <span className="text-[11px] font-mono opacity-30 mt-1">
                  {String(i + 1).padStart(2, '0')}
               </span>
            </div>


            <div className="flex gap-8 flex-1 min-h-0">
               <div className="flex flex-col justify-between w-[38%] shrink-0">
                  <div className="flex gap-6">
                     {[
                        { label: 'Cursos', value: data._count.courses },
                        { label: 'Estudantes', value: data._count.students },
                     ].map(s => (
                        <div key={s.label}>
                           <p className="text-[22px] font-bold text-[#121212]">{s.value}</p>
                           <p className="text-[11px] tracking-widest uppercase opacity-40">{s.label}</p>
                        </div>
                     ))}
                  </div>
                  {courses.length > 0 && (
                     <div className="flex-1 my-6">
                        <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-3">
                           Cursos
                        </p>
                        <ul className="space-y-1.5">
                           {courses ? courses.slice(0, 4).map(course => (
                              <li key={course.id}
                                 className="text-[13px] text-[#121212]/70 leading-snug
                                 flex items-center gap-2">
                                 <span className="w-1 h-1 rounded-full bg-[#121212]/30 shrink-0" />
                                 {course.title}
                              </li>
                           )) : (<p>Sem cursos</p>)}
                           {courses && courses.length > 4 && (
                              <li className="text-[12px] opacity-40">
                                 +{courses.length - 4} mais
                              </li>
                           )}
                        </ul>
                     </div>
                  )}
                  <div className="mt-auto">
                     {head ? (
                        <div className="flex items-center gap-3 mb-5">
                           {head.avatar ? (
                              <img
                                 src={head.avatar}
                                 alt={head.name}
                                 className="w-8 h-8 rounded-full object-cover"
                              />
                           ) : (
                              <div className="w-8 h-8 rounded-full bg-[#121212]/10
                                    flex items-center justify-center
                                    text-[11px] font-medium text-[#121212]/50">
                                 {head.name.charAt(0)}
                              </div>
                           )}
                           <div>
                              <p className="text-[11px] tracking-widest uppercase opacity-40 leading-none mb-0.5">
                                 Director
                              </p>
                              <p className="text-[13px] font-medium text-[#121212]">{head.name}</p>
                           </div>
                        </div>
                     ) : (
                        <div className="mb-5" />
                     )}
                     <Link
                        to={`/departamentos/${data.id}`}
                        className="inline-flex items-center gap-2 text-[12px] font-medium
                           text-[#121212] hover:opacity-60 transition-opacity group"
                     >
                        <span className="underline underline-offset-2">Ver departamento</span>
                        <svg width="18" height="10" viewBox="0 0 22 12" fill="none"
                           className="group-hover:translate-x-1 transition-transform duration-200">
                           <path
                              d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                              fill="#121212"
                           />
                        </svg>
                     </Link>
                  </div>
               </div>

               {/* RIGHT — imagem */}
               <div className="relative flex-1 rounded-[16px] overflow-hidden">
                  <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                     <img
                        src={images[i] ?? '/logo-black.png'}
                        alt={data.title}
                        className="object-cover w-full h-full"
                     />
                  </motion.div>

                  {/* Badge sobre a imagem */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm
                            rounded-full px-3 py-1.5 text-[11px] font-medium text-white
                            tracking-wide">
                     {data._count.faculties} faculdade{data._count.faculties !== 1 ? 's' : ''}
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   )
}
