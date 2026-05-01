import React from 'react'
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';

const spring = { type: 'spring', bounce: 0.18, duration: 0.45 } as const;
export function UpPanel({
   children,
   onClose,
   fullWidth = false,
}: {
   children: React.ReactNode;
   onClose: () => void;
   fullWidth?: boolean;
}) {
   return (
      <motion.div
         key="up-panel"
         initial={{ opacity: 0, y: 24, scale: 0.96 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 24, scale: 0.96 }}
         transition={spring}
         className={[
            'absolute bottom-full mb-3',
            'rounded-2xl border border-zinc-950/10 bg-white',
            'shadow-xl shadow-black/10 overflow-hidden',
            fullWidth
               ? 'left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] max-w-md'
               : 'left-0 right-0',
         ].join(' ')}
      >

         <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-7 w-7 items-center
                   justify-center rounded-full bg-zinc-100
                   text-zinc-500 hover:bg-zinc-200 transition-colors"
         >
            <X className="h-3.5 w-3.5" />
         </button>
         {fullWidth ? (
            <ScrollArea className="h-100">
               {children}
            </ScrollArea>
         ) : (
            children
         )}
      </motion.div>
   );
}