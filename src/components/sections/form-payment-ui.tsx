import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { clientEnv } from '../../config/env'

const FormPaymentUi = () => {
   return (
      <div className='border rounded-2xl border-neutral-500'>
         <div className='flex items-center justify-between text-sm p-4'>
            <div className='grid gap-1'>
               <span>Recibo Nº</span>
               <b>000321</b>
            </div>
            <div className='flex items-center gap-4'>
               <div className='grid'>
                  <span>Emitido</span>
                  <b>11/24/25</b>
               </div>
               <div className='grid'>
                  <span>Validação</span>
                  <b>11/24/25</b>
               </div>
            </div>
         </div>
         <div className='flex'>
            <div className='w-1/2 border rounded-bl-2xl grid space-y-5 gap-1 border-neutral-500 p-4'>
               <b>De</b>
               <StaticImage
                  src='../../images/logo.png'
                  className='size-12'
                  width={40}
                  height={40}
                  alt='logo' />
               <b>Manuel Xavier</b>
               <span>{clientEnv.GATSBY_UNIVERCITY_EMAIL}</span>
            </div>
            <div className='w-1/2 rounded-br-2xl border grid  border-neutral-500 p-4'>
               <b>Para</b>
               <StaticImage
                  src='../../images/icon.png'
                  className='size-10'
                  width={40}
                  height={40}
                  alt='logo' />
               <b>Reinaldo Vombo</b>
               <span>redx@gmail.com</span>
            </div>
         </div>
         <div className='p-4 flex items-center justify-between'>
            <div>
               <span className='uppercase text-sm'>descrição</span>
               <p className='font-bold'>Confirmação de matricula</p>
            </div>
            <div className='flex items-center justify-between text-sm p-4'>

               <div className='flex items-center gap-4'>
                  <div className='grid'>
                     <span>Preço</span>
                     <b>45.00.00 kz</b>
                  </div>
                  <div className='grid'>
                     <span>Total</span>
                     <b>45.00.00 kx</b>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FormPaymentUi
