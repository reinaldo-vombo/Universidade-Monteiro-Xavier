import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Sobre = () => {
   return (
      <div>
         <div className="bg-[#0D0D0D] h-1/2 px-6 md:px-20 pt-36 pb-16">
            <Link
               to="/campus"
               className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                                transition-colors mb-10 inline-block"
            >
               ← Vida no Campus
            </Link>

            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Sobre nós
            </h1>
         </div>
         <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <StaticImage
                     src="../images/logo-black.png"
                     width={500}
                     height={500}
                     alt="Sobre a universidade"
                     className="w-full"
                  />
               </div>

               <div>
                  <p className="uppercase tracking-[0.2em] text-sm opacity-60 mb-4">
                     Institucional
                  </p>

                  <h1 className="text-4xl md:text-5xl font-semibold mb-6">
                     Sobre a Universidade
                  </h1>

                  <p className="text-lg leading-8 text-gray-600">
                     A nossa universidade dedica-se à formação de profissionais
                     qualificados, promovendo excelência académica, investigação
                     científica e desenvolvimento social. Trabalhamos para criar um
                     ambiente inovador onde estudantes podem desenvolver conhecimento,
                     liderança e compromisso com a sociedade.
                  </p>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Sobre
