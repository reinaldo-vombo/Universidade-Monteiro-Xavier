import React from 'react'
import { motion } from 'framer-motion';
import { navigate } from 'gatsby';
import { UpPanel } from './up-panel';
import { BookOpen, Calendar, Home, Info } from 'lucide-react';

interface NavItem {
   label: string;
   href: string;
   icon: React.ReactNode;
}
const spring = { type: 'spring', bounce: 0.18, duration: 0.45 } as const;
const NAV_ITEMS: NavItem[] = [
   { label: 'Início', href: '/', icon: <Home className="h-4 w-4" /> },
   { label: 'Eventos', href: '/eventos', icon: <Calendar className="h-4 w-4" /> },
   { label: 'Exames de Admissão', href: '/exames-de-admissao', icon: <BookOpen className="h-4 w-4" /> },
   { label: 'Sobre', href: '/sobre', icon: <Info className="h-4 w-4" /> },
];
export function MenuPanel({
   onClose,
   currentPath,
}: {
   onClose: () => void;
   currentPath: string;
}) {
   return (
      <UpPanel onClose={onClose}>
         <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
               Menu
            </p>
         </div>

         <nav className="px-2 pb-3">
            {NAV_ITEMS.map((item, i) => {
               const isActive = currentPath === item.href;
               return (
                  <motion.button
                     key={item.href}
                     initial={{ opacity: 0, x: -8 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ ...spring, delay: i * 0.045 }}
                     onClick={() => {
                        navigate(item.href);
                        onClose();
                     }}
                     className={[
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5',
                        'text-left text-sm transition-colors',
                        isActive
                           ? 'bg-zinc-950 text-white'
                           : 'text-zinc-700 hover:bg-zinc-100',
                     ].join(' ')}
                  >
                     <span className={isActive ? 'text-white' : 'text-zinc-400'}>
                        {item.icon}
                     </span>
                     {item.label}
                  </motion.button>
               );
            })}
         </nav>
      </UpPanel>
   );
}