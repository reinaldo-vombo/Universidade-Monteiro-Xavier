import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function TabButton({
   children,
   active,
   disabled = false,
   onClick,
   ariaLabel,
   tooltip,
}: {
   children: React.ReactNode;
   active: boolean;
   disabled?: boolean;
   onClick?: () => void;
   ariaLabel: string;
   tooltip?: string;
}) {
   return (
      <div className="relative group">
         <button
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
            className={[
               'relative flex h-9 w-9 items-center justify-center rounded-xl',
               'transition-colors duration-150',
               disabled
                  ? 'cursor-not-allowed opacity-30'
                  : active
                     ? 'bg-zinc-950 text-white'
                     : 'text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200',
            ].join(' ')}
         >
            {children}


            <AnimatePresence>
               {active && (
                  <motion.span
                     key="dot"
                     layoutId="tab-dot"
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0 }}
                     className="absolute -bottom-0.5 left-1/2 h-1 w-1
                         -translate-x-1/2 rounded-full bg-white"
                  />
               )}
            </AnimatePresence>
         </button>

         {/* tooltip para botões desativados */}
         {tooltip && (
            <div
               className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                     whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5
                     text-xs text-white opacity-0 pointer-events-none
                     group-hover:opacity-100 transition-opacity duration-200"
            >
               {tooltip}
               <div className="absolute top-full left-1/2 -translate-x-1/2
                          border-4 border-transparent border-t-zinc-900" />
            </div>
         )}
      </div>
   );
}