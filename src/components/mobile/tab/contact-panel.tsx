import React from 'react'
import { motion } from 'framer-motion';
import { UpPanel } from './up-panel';
import ContactForm from '../../../forms/contact';

const spring = { type: 'spring', bounce: 0.18, duration: 0.45 } as const;
export function ContactPanel({ onClose }: { onClose: () => void }) {
   return (
      <>
         <UpPanel onClose={onClose} fullWidth={true}>
            <div className="px-4 pt-4 pb-2">
               <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Contacto
               </p>
            </div>

            <div className="px-4 pb-4 space-y-3">
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.05 }}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 space-y-0.5"
               >
                  <p className="text-xs text-zinc-400">Telefone</p>

                  <a href="tel:+244900000000"
                     className="text-sm font-medium text-zinc-900 hover:text-zinc-600"
                  >
                     +244 900 000 000
                  </a>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.1 }}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 space-y-0.5"
               >
                  <p className="text-xs text-zinc-400">Email</p>


                  <a href="mailto:geral@exemplo.ao"
                     className="text-sm font-medium text-zinc-900 hover:text-zinc-600">
                     geral@exemplo.ao
                  </a>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.15 }}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 space-y-0.5"
               >
                  <p className="text-xs text-zinc-400">Morada</p>
                  <p className="text-sm font-medium text-zinc-900">
                     Rua Exemplo, nº 123, Luanda
                  </p>
               </motion.div>
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.15 }}
                  className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 space-y-0.5"
               >
                  <p className="text-xs text-zinc-400">Entre em contato conosco</p>
                  <ContactForm />
               </motion.div>
            </div>
         </UpPanel>
      </>
   );
}