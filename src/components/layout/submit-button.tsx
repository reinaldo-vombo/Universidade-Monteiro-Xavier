import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STATE_CONFIG = {
   idle: {
      label: 'Enviar comprovativo',
      bg: 'bg-white',
      text: 'text-[#0D0D0D]',
      icon: null,
   },
   loading: {
      label: 'A processar...',
      bg: 'bg-orange-500',
      text: 'text-white',
      icon: <Spinner />,
   },
   success: {
      label: 'Operação concluído',
      bg: 'bg-emerald-500',
      text: 'text-white',
      icon: <CheckIcon />,
   },
   error: {
      label: 'Erro ao enviar',
      bg: 'bg-red-500',
      text: 'text-white',
      icon: <XIcon />,
   },
}
type TSubmitState = {
   submitState: 'idle' | 'loading' | 'success' | 'error'
}

const SubmitButton = ({ submitState }: TSubmitState) => {
   return (
      <motion.button
         type="submit"
         disabled={submitState !== 'idle'}
         animate={{
            scale: submitState === 'loading' ? 0.98 : 1,
         }}
         transition={{ duration: 0.15 }}
         className={`relative cursor-pointer w-full bg-black flex items-center justify-center gap-3
              py-4 rounded-xl font-medium text-sm tracking-wide
              transition-colors duration-500 overflow-hidden
              disabled:cursor-not-allowed
              ${STATE_CONFIG[submitState].bg}
              ${STATE_CONFIG[submitState].text}`}
      >
         <AnimatePresence mode="wait">
            <motion.div
               key={submitState}
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -8 }}
               transition={{ duration: 0.2, ease: 'easeInOut' }}
               className="flex items-center gap-2"
            >
               {STATE_CONFIG[submitState].icon}
               <span>{STATE_CONFIG[submitState].label}</span>
            </motion.div>
         </AnimatePresence>
      </motion.button>
   )
}

export default SubmitButton
function Spinner() {
   return (
      <motion.svg
         width="16" height="16" viewBox="0 0 16 16" fill="none"
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
         <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
         <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
   )
}

function CheckIcon() {
   return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
         <motion.path
            d="M3 8l3.5 3.5L13 4"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
         />
      </svg>
   )
}

function XIcon() {
   return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
         <motion.path
            d="M4 4l8 8M12 4l-8 8"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
         />
      </svg>
   )
}