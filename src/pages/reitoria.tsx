import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const stats = [
   { value: "32+", label: "Anos de Experiência" },
   { value: "180+", label: "Publicações Científicas" },
   { value: "12", label: "Prémios Nacionais" },
   { value: "6", label: "Mandatos" },
]

const viceReitores = [
   {
      nome: "Prof.ª Dra. Carla Mendes",
      cargo: "Vice-Reitora para a Investigação",
      area: "Ciências Naturais e Ambiente",
   },
   {
      nome: "Prof. Dr. António Ferreira",
      cargo: "Vice-Reitor para o Ensino",
      area: "Pedagogia e Inovação Curricular",
   },
   {
      nome: "Prof.ª Dra. Sofia Lopes",
      cargo: "Vice-Reitora para a Cooperação",
      area: "Relações Internacionais",
   },
]
const ViceChandelerPage = () => {
   return (
      <div className="min-h-screen font-['Cormorant_Garamond',Georgia,serif]">
         <div className="relative bg-[#0E1B12] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]"
               style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
                  backgroundSize: "32px 32px",
               }}
            />
            <div className="absolute left-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#C9A84C] to-transparent opacity-40 hidden lg:block" />
            <div className="relative max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-24">
               <Link
                  to="/campus"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors duration-300 mb-12"
               >
                  <span>←</span>
                  <span>Vida no Campus</span>
               </Link>

               <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                  <div>
                     <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-5">
                        Órgão de Gestão Superior
                     </p>
                     <h1
                        className="text-[64px] md:text-[90px] lg:text-[110px] font-light text-white leading-[0.9] tracking-[-0.02em]"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                     >
                        Reitoria
                     </h1>
                  </div>

                  {/* Stats em linha no hero */}
                  <div className="flex gap-10 lg:gap-14 pb-2">
                     {stats.map((s) => (
                        <div key={s.label} className="text-center lg:text-right">
                           <p className="text-[36px] font-light text-[#C9A84C] leading-none">{s.value}</p>
                           <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mt-1 leading-tight">
                              {s.label}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
         </div>
         <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
               <div className="lg:col-span-4 relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C9A84C] opacity-60 z-10" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C9A84C] opacity-60 z-10" />

                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                     <StaticImage
                        src="../images/R.jpeg"
                        alt="Prof. Dr. João Manuel, Reitor"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        style={{ height: "100%" }}
                     />
                     <div className="absolute inset-0 bg-linear-to-t from-[#0E1B12]/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <div className="bg-[#0E1B12]/90 backdrop-blur-sm border border-[#C9A84C]/30 p-4">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-1">
                           Reitor
                        </p>
                        <p className="text-white text-lg font-light">
                           Prof. Dr. João Manuel
                        </p>
                     </div>
                  </div>
               </div>
               <div className="lg:col-span-8 pt-4">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="h-px flex-1 bg-[#C9A84C]/30" />
                     <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]">
                        Mensagem do Reitor
                     </p>
                     <div className="h-px w-12 bg-[#C9A84C]/30" />
                  </div>

                  <blockquote
                     className="text-[28px] md:text-[34px] font-light text-[#0E1B12] leading-tight mb-10"
                     style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                     "A universidade é o espaço onde o conhecimento encontra a responsabilidade, e onde cada geração constrói o amanhã que o mundo necessita."
                  </blockquote>

                  <div className="space-y-5 text-[#3D3D3D] leading-[1.9] text-[15px] font-['Georgia',serif]">
                     <p>
                        É com profundo sentido de missão que assumo a liderança desta instituição centenária, comprometida com a excelência académica, a investigação científica de impacto e a formação integral de cidadãos responsáveis e inovadores.
                     </p>
                     <p>
                        Ao longo dos últimos anos, temos investido na modernização das nossas infraestruturas, no fortalecimento das parcerias internacionais e no apoio ao corpo docente e discente. O nosso compromisso é claro: construir uma universidade aberta ao mundo, inclusiva e preparada para os desafios do século XXI.
                     </p>
                     <p>
                        Convido toda a comunidade académica a ser parte ativa desta jornada transformadora, contribuindo com ideias, dedicação e o espírito crítico que sempre nos distinguiu.
                     </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-[#C9A84C]/20">
                     <div className="flex items-center gap-6">
                        <div>
                           <p className="text-[#0E1B12] font-medium text-lg">Prof. Dr. João Manuel</p>
                           <p className="text-[11px] tracking-[0.2em] uppercase text-[#888] mt-0.5">
                              Reitor · Desde 2018
                           </p>
                        </div>
                        <div className="h-12 w-px bg-[#C9A84C]/30" />
                        <div>
                           <p className="text-[11px] tracking-[0.15em] uppercase text-[#888]">Formação</p>
                           <p className="text-[#0E1B12] text-sm mt-0.5">
                              Doutoramento em Ciências Jurídicas — Universidade de Lisboa
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
         </div>
         <section className="max-w-7xl mx-auto px-6 md:px-16 py-24">
            <div className="mb-16">
               <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
                  Equipa de Gestão
               </p>
               <h2
                  className="text-[44px] md:text-[56px] font-light text-[#0E1B12] leading-[1.1]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
               >
                  Vice-Reitores
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C9A84C]/20">
               {viceReitores.map((vr, i) => (
                  <div
                     key={i}
                     className="bg-[#F7F5F0] hover:bg-white transition-colors duration-500 p-10 group cursor-pointer"
                  >
                     {/* Número decorativo */}
                     <p
                        className="text-[80px] font-light text-[#C9A84C]/15 leading-none mb-6 group-hover:text-[#C9A84C]/25 transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                     >
                        0{i + 1}
                     </p>

                     <div className="w-8 h-px bg-[#C9A84C] mb-6" />

                     <h3
                        className="text-[20px] font-light text-[#0E1B12] mb-2 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                     >
                        {vr.nome}
                     </h3>
                     <p className="text-[11px] tracking-[0.15em] uppercase text-[#C9A84C] mb-3">
                        {vr.cargo}
                     </p>
                     <p className="text-[13px] text-[#666] leading-relaxed">
                        {vr.area}
                     </p>
                  </div>
               ))}
            </div>
         </section>
         <section className="bg-[#0E1B12] py-20 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-4">
               Saiba Mais
            </p>
            <h2
               className="text-[36px] md:text-[48px] font-light text-white mb-8"
               style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
               Conheça a nossa missão e valores
            </h2>
            <Link
               to="/sobre"
               className="inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#C9A84C] hover:text-[#0E1B12] transition-all duration-300"
            >
               Sobre a Universidade →
            </Link>
         </section>
      </div>
   )
}

export default ViceChandelerPage;
