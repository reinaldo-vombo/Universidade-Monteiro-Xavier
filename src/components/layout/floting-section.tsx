import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Madal from '../shared/madal'
import ContactForm from '../../forms/contact'
type TProps = {
   sectionRef: React.RefObject<HTMLElement>
}
const FlotingSection = ({ sectionRef }: TProps) => {
   const [floated, setFloated] = useState(false)
   const isInView = useInView(sectionRef, { once: true })
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY >= 200) {
            setFloated(true);
         } else {
            setFloated(false);
         }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])
   const flotingVariant = {
      center: {
         position: 'fixed' as const,
         top: '70%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         x: '-50%',
         y: '-50%',
         zIndex: 50,
      },
      floated: {
         position: 'fixed' as const,
         top: 'auto',
         left: 'auto',
         right: '2rem',
         bottom: '2rem',
         x: '0%',
         y: '0%',
         zIndex: 50,
      },
   }

   return (
      <motion.div
         animate={floated ? 'floated' : 'center'}
         variants={flotingVariant}
         transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
         }}
      >
         <Madal
            title='Contact-nos'
            thumbnailMode='icon'
            triggerStyle={{
               backgroundColor: 'black',
               borderRadius: floated ? 50 : 20,
               width: floated ? '5rem' : '10rem',
               height: floated ? '5rem' : 'auto'
            }}
            thumbnail='/logo.png'
            className='bg-black text-white'
            children={<ContactForm />}
         />
      </motion.div>
   )
}

export default FlotingSection
