import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const valores = [
   {
      titulo: "Excelência",
      descricao:
         "Perseguimos os mais elevados padrões académicos e científicos, promovendo uma cultura de rigor, inovação e melhoria contínua em todas as nossas actividades.",
      simbolo: "I",
   },
   {
      titulo: "Integridade",
      descricao:
         "Agimos com honestidade, transparência e responsabilidade ética em todas as dimensões da nossa actividade institucional e académica.",
      simbolo: "II",
   },
   {
      titulo: "Inclusão",
      descricao:
         "Celebramos a diversidade e garantimos igualdade de oportunidades para todos os membros da nossa comunidade, independentemente da sua origem ou condição.",
      simbolo: "III",
   },
   {
      titulo: "Inovação",
      descricao:
         "Fomentamos o pensamento criativo e empreendedor, encorajando soluções originais que respondam aos desafios contemporâneos da sociedade.",
      simbolo: "IV",
   },
   {
      titulo: "Impacto Social",
      descricao:
         "Comprometemo-nos com o desenvolvimento sustentável do país e com a transferência de conhecimento para a sociedade, criando valor que vai além dos muros da universidade.",
      simbolo: "V",
   },
   {
      titulo: "Internacionalização",
      descricao:
         "Cultivamos parcerias globais, acolhemos perspectivas diversas e posicionamos a nossa universidade como referência no panorama académico internacional.",
      simbolo: "VI",
   },
]

const marcos = [
   { ano: "1962", evento: "Fundação da Universidade por Decreto Nacional" },
   { ano: "1975", evento: "Primeira turma de doutoramento conferida" },
   { ano: "1989", evento: "Abertura do Campus de Ciências e Tecnologia" },
   { ano: "2001", evento: "Adesão à Rede Europeia de Universidades de Pesquisa" },
   { ano: "2012", evento: "Inauguração do Centro de Investigação Avançada" },
   { ano: "2020", evento: "Lançamento da Plataforma de Ensino Digital" },
   { ano: "2024", evento: "Top 5 melhores universidades da África Subsariana" },
]
const numeros = [
   { valor: "24 000+", rotulo: "Estudantes Matriculados" },
   { valor: "1 800+", rotulo: "Docentes e Investigadores" },
   { valor: "62", rotulo: "Cursos de Licenciatura" },
   { valor: "38", rotulo: "Programas de Pós-Graduação" },
   { valor: "120+", rotulo: "Parceiros Internacionais" },
   { valor: "4", rotulo: "Campi no País" },
]

const Sobre = () => {
   return (
      <div
         className="min-h-screen"
         style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
         <div className="relative bg-[#0E1B12] overflow-hidden">
            <div
               className="absolute inset-0 opacity-[0.035]"
               style={{
                  backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
               }}
            />
            <div
               className="absolute right-0 top-0 w-[40%] h-full opacity-10"
               style={{
                  background: "linear-gradient(135deg, transparent 40%, #C9A84C 100%)",
               }}
            />

            <div className="relative max-w-7xl mx-auto px-6 md:px-16 pt-40 pb-28">
               <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors mb-12"
               >
                  ← Início
               </Link>

               <div className="max-w-3xl">
                  <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-5">
                     A Universidade
                  </p>
                  <h1 className="text-[64px] md:text-[90px] font-light text-white leading-[0.9] tracking-[-0.02em] mb-8">
                     Sobre Nós
                  </h1>
                  <p className="text-white/50 text-[17px] leading-relaxed max-w-xl font-['Georgia',serif]">
                     Mais de seis décadas dedicadas à produção e disseminação do conhecimento, à formação de líderes e à transformação da sociedade angolana.
                  </p>
               </div>
            </div>
            <div className="h-px bg-linear-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
         </div>
         <div className="max-w-7xl mx-auto px-6 md:px-16 py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#C9A84C]/20">

               <div className="bg-[#F7F5F0] p-12 lg:p-16 hover:bg-white transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-10 h-10 border border-[#C9A84C] flex items-center justify-center">
                        <span className="text-[#C9A84C] text-xs tracking-widest">M</span>
                     </div>
                     <div className="h-px flex-1 bg-[#C9A84C]/30" />
                  </div>

                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
                     Missão
                  </p>
                  <h2 className="text-[38px] md:text-[48px] font-light text-[#0E1B12] leading-tight mb-8">
                     O que nos move
                  </h2>
                  <p className="text-[16px] text-[#444] leading-[1.9] font-['Georgia',serif]">
                     Formar cidadãos com pensamento crítico, competências técnicas de excelência e profundo sentido ético, capazes de contribuir para o desenvolvimento sustentável de Angola e do continente africano. Promovemos investigação científica de relevância global, transferência de conhecimento e inovação, respondendo aos desafios da sociedade contemporânea.
                  </p>
               </div>
               <div className="bg-[#0E1B12] p-12 lg:p-16">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-10 h-10 border border-[#C9A84C]/50 flex items-center justify-center">
                        <span className="text-[#C9A84C] text-xs tracking-widest">V</span>
                     </div>
                     <div className="h-px flex-1 bg-[#C9A84C]/30" />
                  </div>

                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-5">
                     Visão
                  </p>
                  <h2 className="text-[38px] md:text-[48px] font-light text-white leading-tight mb-8">
                     Para onde vamos
                  </h2>
                  <p className="text-[16px] text-white/60 leading-[1.9] font-['Georgia',serif]">
                     Ser reconhecida entre as vinte melhores universidades de língua portuguesa e na vanguarda das instituições africanas de ensino superior, distinguindo-nos pela qualidade da investigação, pela empregabilidade dos nossos graduados e pelo impacto positivo no desenvolvimento socioeconómico do país.
                  </p>
               </div>
            </div>
         </div>
         <section className="bg-[#0E1B12] py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-16">
               <div className="text-center mb-16">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                     Em Números
                  </p>
                  <h2 className="text-[44px] font-light text-white">
                     A nossa dimensão
                  </h2>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#C9A84C]/10">
                  {numeros.map((n) => (
                     <div key={n.rotulo} className="bg-[#0E1B12] p-8 text-center hover:bg-[#0E1B12]/60 transition-colors">
                        <p className="text-[36px] md:text-[42px] font-light text-[#C9A84C] leading-none mb-3">
                           {n.valor}
                        </p>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 leading-tight">
                           {n.rotulo}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>


         <section className="max-w-7xl mx-auto px-6 md:px-16 py-28">
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
               <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                     Princípios Orientadores
                  </p>
                  <h2 className="text-[44px] md:text-[56px] font-light text-[#0E1B12] leading-[1.1]">
                     Os nossos Valores
                  </h2>
               </div>
               <p className="text-[14px] text-[#666] max-w-xs leading-relaxed font-['Georgia',serif]">
                  Os valores que definem quem somos e como agimos em cada dimensão da nossa actividade.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A84C]/20">
               {valores.map((v, i) => (
                  <div
                     key={i}
                     className="bg-[#F7F5F0] hover:bg-white transition-colors duration-500 p-10 group relative overflow-hidden"
                  >
                     {/* Número romano decorativo */}
                     <p className="absolute top-4 right-6 text-[64px] font-light text-[#C9A84C]/08 leading-none select-none group-hover:text-[#C9A84C]/15 transition-colors">
                        {v.simbolo}
                     </p>

                     <div className="w-6 h-px bg-[#C9A84C] mb-8" />

                     <h3 className="text-[26px] font-light text-[#0E1B12] mb-4 leading-tight">
                        {v.titulo}
                     </h3>
                     <p className="text-[14px] text-[#555] leading-[1.85] font-['Georgia',serif]">
                        {v.descricao}
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* ── História / Linha do Tempo ── */}
         <section className="bg-[#EEE9DF] py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-16">
               <div className="mb-16">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
                     Cronologia
                  </p>
                  <h2 className="text-[44px] md:text-[56px] font-light text-[#0E1B12] leading-[1.1]">
                     A nossa História
                  </h2>
               </div>

               <div className="relative">
                  {/* Linha vertical */}
                  <div className="absolute left-21.5 md:left-25.5 top-0 bottom-0 w-px bg-[#C9A84C]/30" />

                  <div className="space-y-0">
                     {marcos.map((m, i) => (
                        <div
                           key={i}
                           className="flex items-start gap-8 md:gap-12 py-8 border-b border-[#C9A84C]/10 last:border-0 hover:bg-[#C9A84C]/5 transition-colors px-4 -mx-4 group"
                        >
                           {/* Ano */}
                           <div className="min-w-17.5 md:md:min-w-21.5 text-right">
                              <span className="text-[#C9A84C] text-[15px] font-light tracking-wider">
                                 {m.ano}
                              </span>
                           </div>

                           {/* Ponto */}
                           <div className="relative flex items-center justify-center mt-1.5">
                              <div className="w-3 h-3 border border-[#C9A84C] bg-[#EEE9DF] group-hover:bg-[#C9A84C] transition-colors z-10" />
                           </div>

                           {/* Evento */}
                           <p className="text-[16px] text-[#333] leading-relaxed font-['Georgia',serif] pt-0.5">
                              {m.evento}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── CTA Final ── */}
         <section className="bg-[#0E1B12] py-24 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-5">
               Faça Parte
            </p>
            <h2 className="text-[40px] md:text-[56px] font-light text-white mb-5 leading-tight">
               Uma comunidade que<br />transforma o futuro
            </h2>
            <p className="text-white/40 text-[15px] mb-10 max-w-md mx-auto font-['Georgia',serif]">
               Junte-se a mais de 24 000 estudantes e contribua para a construção de um Angola mais desenvolvido.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
               <Link
                  to="/admissoes"
                  className="inline-flex items-center gap-3 bg-[#C9A84C] text-[#0E1B12] text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#E0C060] transition-colors duration-300"
               >
                  Candidatar-se →
               </Link>
               <Link
                  to="/reitoria"
                  className="inline-flex items-center gap-3 border border-[#C9A84C]/50 text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#C9A84C]/10 transition-colors duration-300"
               >
                  Conhecer a Reitoria
               </Link>
            </div>
         </section>
      </div>
   )
}

export default Sobre
