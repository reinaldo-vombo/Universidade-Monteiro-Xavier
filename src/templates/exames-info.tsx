import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { QueryData, Tab } from '../types/ql';
import { SEO } from '../components/seo';

export const query = graphql`
  query ExamesInfoQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/constants/data/exame/" } }
    ) {
      nodes {
        frontmatter {
          title
          tab
          order
          image {
            childImageSharp {
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        html
      }
    }
  }
`
const AdmitionExame = ({ data }: PageProps<QueryData>) => {
   const tabs: Tab[] = data.allMarkdownRemark.nodes
      .map(n => ({
         tab: n.frontmatter.tab,
         title: n.frontmatter.title,
         order: n.frontmatter.order,
         html: n.html,
         image: n.frontmatter.image,
      }))
      .sort((a, b) => a.order - b.order)


   const [active, setActive] = useState(tabs[0]?.tab ?? '')
   const current = tabs.find(t => t.tab === active) ?? tabs[0]
   const image = current?.image ? getImage(current.image) : null
   return (
      <div className="bg-[#F7F5F0] ">
         <div className="bg-[#0D0D0D] relative h-1/2">
            <div className="px-6 md:px-20 pt-36 pb-20 relative z-10">
               <Link
                  to="/exames-de-acesso/listas"
                  className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                 transition-colors mb-10 inline-block"
               >
                  ← Todos os registos
               </Link>

               <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Admissão</p>
               <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
                  Exames de Admissão
               </h1>
               <p className="text-white/40 mt-4 text-base font-light max-w-lg">
                  Tudo o que precisas de saber para te candidatares.
               </p>

            </div>
         </div>

         {/* Tabs */}
         <div className="sticky top-0 z-20 bg-[#F7F5F0] border-b border-[#0D0D0D]/10">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
               <div className="flex overflow-x-auto scrollbar-none">
                  {tabs.map(tab => (
                     <button
                        key={tab.tab}
                        onClick={() => setActive(tab.tab)}
                        className={`relative shrink-0 px-6 py-5 text-sm tracking-wide
                            transition-colors duration-200
                            ${active === tab.tab
                              ? 'text-[#0D0D0D] font-medium'
                              : 'text-[#0D0D0D]/40 hover:text-[#0D0D0D]/60'
                           }`}
                     >
                        {tab.title}
                        {/* Underline animado */}
                        {active === tab.tab && (
                           <motion.div
                              layoutId="tab-underline"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D0D0D]"
                              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                           />
                        )}
                     </button>
                  ))}
               </div>
            </div>
         </div>


         <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
            <AnimatePresence mode="wait">
               <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
               >

                  <div>
                     <h2 className="text-3xl md:text-4xl font-light text-[#0D0D0D] mb-8 leading-tight">
                        {current?.title}
                     </h2>
                     <div
                        className="prose prose-lg prose-neutral max-w-none
                           prose-headings:font-medium prose-headings:text-[#0D0D0D]
                           prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                           prose-p:text-[#0D0D0D]/70 prose-p:leading-relaxed
                           prose-li:text-[#0D0D0D]/70
                           prose-strong:text-[#0D0D0D] prose-strong:font-medium
                           prose-ul:space-y-2"
                        dangerouslySetInnerHTML={{ __html: current?.html ?? '' }}
                     />

                     {/* CTA para registos */}
                     {active === 'sobre' && (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.2 }}
                           className="mt-10"
                        >
                           <Link
                              to="/exames-de-acesso/set-up"
                              className="inline-flex items-center gap-3 bg-[#0D0D0D] text-white
                               text-sm tracking-wide px-7 py-4 rounded-xl
                               hover:bg-[#0D0D0D]/80 transition-colors duration-300"
                           >
                              Fazer registo
                              <span className="text-white/50">→</span>
                           </Link>
                        </motion.div>
                     )}
                  </div>

                  {/* Imagem */}
                  {image && (
                     <div className="lg:sticky lg:top-32">
                        <div className="rounded-2xl overflow-hidden aspect-4/3">
                           <GatsbyImage
                              image={image}
                              alt={current?.title ?? ''}
                              className="w-full h-full object-cover"
                           />
                        </div>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
   )
}

export default AdmitionExame;
export const Head: HeadFC = () =>
   <SEO title='Exames de Admissão'
      description='Informações sobre os exames de admissão, documentos necessários, preços e perguntas frequentes.'
   />
