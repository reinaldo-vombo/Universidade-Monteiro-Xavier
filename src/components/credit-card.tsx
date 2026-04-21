import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TBankAccounte } from '../types'
import { StaticImage } from 'gatsby-plugin-image'
type TProps = {
   data: TBankAccounte;
   setSelectedAccount: React.Dispatch<React.SetStateAction<TBankAccounte | null>>
}

const BANK_THEMES: Record<string, { from: string; to: string; chip: string }> = {
   BAI: { from: '#002d74', to: '#0056b3', chip: '#0d3a8c' },
   BFA: { from: '#d0021b', to: '#f7b17d', chip: '#a80015' },
   BIC: { from: '#820b11', to: '#e20a17', chip: '#5c0810' },
}

const DEFAULT_THEME = { from: '#1a1a1a', to: '#333', chip: '#111' }

function getTheme(bankName: string) {
   const key = Object.keys(BANK_THEMES).find(k =>
      bankName.toUpperCase().includes(k)
   )
   return key ? BANK_THEMES[key] : DEFAULT_THEME
}


const CreditCard = ({ data, setSelectedAccount }: TProps) => {
   const [flipped, setFlipped] = useState(false)
   const theme = getTheme(data.bankName)

   const cardStyle = {
      background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)`,
   }
   function togglePayment() {
      setFlipped(f => !f)
      setSelectedAccount(data)
   }

   return (
      <div
         onClick={() => togglePayment()}
         style={{ width: 340, height: 210, perspective: 1000 }}
         className="cursor-pointer select-none"
      >
         <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
         >
            <div
               style={{
                  ...cardStyle,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  position: 'absolute', inset: 0,
                  borderRadius: 18, padding: 24,
                  display: 'flex', flexDirection: 'column',
               }}
            >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* <span style={{ color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
                        {data.bankName}
                     </span> */}
                  {data.bankName === 'BAI' ?
                     <StaticImage
                        src='../images/bai-w.png'
                        width={90}
                        height={28}
                        alt={data.accountName} />
                     : data.bankName === 'BFA' ? (<StaticImage
                        src='../images/bfa.png'
                        width={90}
                        height={28}
                        alt={data.accountName} />) : data.bankName === 'BIC' ? (
                           <StaticImage
                              src='../images/bfa.png'
                              width={90}
                              height={28}
                              alt={data.accountName} />
                        ) : null}
               </div>

               <div style={{ marginTop: 16 }}>
                  <StaticImage
                     src='../images/chip-card.png'
                     width={36}
                     height={28}
                     alt='chip card logo' />
               </div>

               <div style={{ marginTop: 'auto' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                     Titular
                  </p>
                  <p style={{ color: '#fff', fontSize: 14, fontWeight: 500, margin: '2px 0 0' }}>
                     {data.accountName}
                  </p>
               </div>
            </div>
            <div
               style={{
                  ...cardStyle,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  position: 'absolute', inset: 0,
                  borderRadius: 18, padding: 24,
                  display: 'flex', flexDirection: 'column',
               }}
            >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{data.bankName}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.1em' }}>ANGOLA</span>
               </div>

               <div style={{ marginBottom: 12 }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 2px' }}>
                     Nº de conta
                  </p>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, margin: 0, letterSpacing: '0.08em' }}>
                     {data.accountNumber}
                  </p>
               </div>

               <div style={{ marginBottom: 12 }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 2px' }}>
                     IBAN
                  </p>
                  <p style={{ color: '#fff', fontSize: 12, fontWeight: 500, margin: 0, letterSpacing: '0.06em' }}>
                     {data.iban}
                  </p>
               </div>

               <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 'auto' }}>
                  {data.swift && (
                     <div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 2px' }}>
                           SWIFT
                        </p>
                        <p style={{ color: '#fff', fontSize: 12, fontWeight: 500, margin: 0 }}>
                           {data.swift}
                        </p>
                     </div>
                  )}
                  <div style={{ marginLeft: 'auto' }}>
                     <StaticImage src='../images/multicaixa.svg' width={44} height={28} alt='Multicaixa' />
                  </div>
               </div>
            </div>

         </motion.div>
      </div>
   )
}

export default CreditCard;