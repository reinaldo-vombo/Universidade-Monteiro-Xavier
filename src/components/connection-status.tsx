
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { useOnlineStatus } from '../lib/hooks/use-online-status'


const ConnectionBanner = () => {

   const isOnline = useOnlineStatus();
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      setVisible(true)
      if (isOnline) {
         const timer = setTimeout(() => setVisible(false), 5000);
         return () => clearTimeout(timer)
      }
   }, [isOnline])

   if (!visible) return null;
   return (
      <AnimatePresence>
         <motion.div
            key={isOnline ? 'online' : 'offline'}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3 text-white shadow-lg ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}
         >
            <span className='font-medium flex items-center gap-2'>
               {isOnline ? 'Online' : 'Nesse momento estas offline'}
            </span>
            <Button type='button'
               aria-label='close banner x icon'
               className='text-white/80 hover:text-white transition'
               onClick={() => setVisible(false)}>
               <X size={18} />
            </Button>
         </motion.div>
      </AnimatePresence>
   )
}

export default ConnectionBanner
