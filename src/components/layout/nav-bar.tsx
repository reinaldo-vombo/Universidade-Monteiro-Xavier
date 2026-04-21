// components/Navbar.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const links = [
   { label: 'Início', to: '/' },
   { label: 'Sobre', to: '/sobre' },
   { label: 'Cursos', to: '/cursos' },
   { label: 'Departamentos', to: '/departamentos' },
   { label: 'Exames', to: '/exames-de-acesso' },
   { label: 'Contactos', to: '/contactos' },
]

// Variantes do overlay
const overlayVariants: any = {
   closed: {
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: {
         duration: 0.7,
         ease: 'easeInOut',
         when: 'afterChildren',
      },
   },
   open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
         duration: 0.7,
         ease: 'easeInOut',
         when: 'beforeChildren',
         staggerChildren: 0.08,
         delayChildren: 0.2,
      },
   },
}

// Variantes de cada link
const linkVariants: any = {
   closed: {
      y: 40,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
   },
   open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
   },
}

// Variante do número do link
const indexVariants = {
   closed: { opacity: 0, x: -10 },
   open: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function Navbar() {
   const [open, setOpen] = useState(false)

   return (
      <>
         {/* Header fixo — sempre transparente */}
         <header className="fixed hidden top-0 left-0 right-0 z-50 h-20 md:flex items-center px-6 md:px-12">

            {/* Logo */}
            <div className="flex-1">
               <Link to='/'>
                  <StaticImage
                     src="../../images/logo.png"
                     width={50}
                     height={50}
                     alt="Logo"
                     className="h-10 w-auto"
                  />
               </Link>
            </div>

            {/* Hamburger */}
            <button
               onClick={() => setOpen(prev => !prev)}
               className="relative z-60 w-12 h-12 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
               aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            >
               <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="block h-[1.5px] w-6 bg-white origin-center"
               />
               <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="block h-[1.5px] w-6 bg-white origin-center"
               />
            </button>
         </header>

         {/* Overlay full-page */}
         <AnimatePresence>
            {open && (
               <motion.div
                  key="menu"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={overlayVariants}
                  className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col"
               >
                  {/* Links — centrados verticalmente */}
                  <nav className="flex flex-col justify-center flex-1 px-10 md:px-24 gap-2">
                     {links.map((link, i) => (
                        <motion.div
                           key={link.to}
                           variants={linkVariants}
                           className="overflow-hidden border-b border-white/10 py-5 flex items-baseline gap-4 group"
                        >
                           {/* Número */}
                           <motion.span
                              variants={indexVariants}
                              className="text-xs text-white/40 w-6 shrink-0"
                           >
                              {String(i + 1).padStart(2, '0')}
                           </motion.span>

                           {/* Link */}
                           <Link
                              to={link.to}
                              onClick={() => setOpen(false)}
                              className="text-white text-4xl md:text-6xl font-medium leading-none
                               relative inline-block
                               after:absolute after:bottom-0 after:left-0
                               after:h-px after:w-0 after:bg-white
                               after:transition-all after:duration-500
                               group-hover:after:w-full
                               transition-opacity duration-300 hover:opacity-60"
                           >
                              {link.label}
                           </Link>
                        </motion.div>
                     ))}
                  </nav>

                  {/* Footer do menu */}
                  <motion.div
                     variants={linkVariants}
                     className="px-10 md:px-24 pb-10 flex justify-between items-end"
                  >
                     <p className="text-white/30 text-xs tracking-widest uppercase">
                        Universidade
                     </p>
                     <p className="text-white/30 text-xs">
                        © {new Date().getFullYear()}
                     </p>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   )
}