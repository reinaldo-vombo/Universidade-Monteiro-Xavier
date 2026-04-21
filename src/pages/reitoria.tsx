import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Reitoria = () => {
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
               Reitoria
            </h1>
         </div>
         <div className="container h-screen">
            <div className="grid grid-cols-2 gap-8 h-full">
               <div>
                  <StaticImage
                     src='../images/R.jpeg'
                     width={700}
                     height={700}
                     alt='Dr. João Manuel'
                     className="rounded-2xl"
                  />
                  <div
                     className="shadow-lg"
                  >

                     <div className="p-6">
                        <h2 className="text-xl font-semibold">
                           Dr. João Manuel
                        </h2>

                        <p className="text-sm text-gray-500 mb-4">
                           Reitor
                        </p>
                     </div>
                  </div>

               </div>
               <div>
                  <p className="text-gray-600 leading-7">
                     Responsável pela direção estratégica da universidade e pela coordenação das atividades académicas e administrativas.
                  </p>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Reitoria
