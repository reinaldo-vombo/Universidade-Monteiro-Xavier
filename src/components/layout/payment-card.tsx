import React from 'react'

import {
   MorphingDialog,
   MorphingDialogTrigger,
   MorphingDialogContent,
   MorphingDialogTitle,
   MorphingDialogImage,
   MorphingDialogSubtitle,
   MorphingDialogClose,
   MorphingDialogDescription,
   MorphingDialogContainer,
} from '../../components/ui/morphing-dialog';
import { PlusIcon } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { TAcademicFaculty, TBankAccounte } from '../../types';
import { toast } from 'sonner';
type PaymentCardProps = {
   type: string;
   disabled?: boolean;
   data: TAcademicFaculty | undefined
   selectedAccount: TBankAccounte | null
};
const now = new Date()
export function PaymentCard({ type, disabled, data, selectedAccount }: PaymentCardProps) {
   const logo = type === 'INVOICE' ? '/express.webp' : type === 'REFERENCE' ? '/icons8-payment-48.png' : '/icons8-qrcode-24.png'
   const toggle = () => {
      if (disabled) {
         toast.warning('Deve selecionar uma das contas')
      }
   }

   return (
      <MorphingDialog transition={{ type: 'spring', stiffness: 200, damping: 24, }}>
         <MorphingDialogTrigger disabled={disabled} style={{ borderRadius: '4px', }} className='border border-gray-200/60 bg-white'>
            <div className='flex items-center space-x-3 p-3'>
               <MorphingDialogImage
                  src={logo}
                  alt='Multicaixa Express'
                  className={`h-8 w-8 object-cover rounded-lg object-top ${disabled ? 'grayscale-100' : ''} `}
                  style={{
                     borderRadius: '4px',
                  }}
               />
               <div className='flex flex-col items-start justify-center space-y-0'>
                  <MorphingDialogTitle className='text-[10px] font-medium text-black sm:text-xs'>
                     {type === 'INVOICE' ?
                        'Pagamento via BAI Direct ou Multicaixa Express'
                        : type === 'REFERENCE'
                           ? 'Pagamento por Referencia'
                           : 'Pagamento QR'}

                  </MorphingDialogTitle>
                  <MorphingDialogSubtitle className='text-[10px] text-gray-600 sm:text-xs'>
                     {type === 'INVOICE' ? 'Métodos disponíveis' : 'Métodos indisponíveis'}

                  </MorphingDialogSubtitle>
               </div>
            </div>
         </MorphingDialogTrigger>
         <MorphingDialogContainer>
            <MorphingDialogContent
               style={{
                  borderRadius: '12px',
               }}
               className='relative h-auto w-125 border border-gray-100 bg-white'
            >
               <ScrollArea className='h-[90vh]' type='scroll'>
                  <div className='relative p-6'>
                     <div className='flex justify-center py-10'>
                        <MorphingDialogImage
                           src='/express.webp'
                           alt='Multicaixa Express'
                           className='h-auto w-50'
                        />
                     </div>
                     <div className=''>
                        <MorphingDialogTitle className='text-black'>
                           Pagamento via BAI Direct ou Multicaixa Express
                        </MorphingDialogTitle>
                        <MorphingDialogSubtitle className='font-light text-gray-400'>
                           {type === 'INVOICE' ? 'Métodos disponíveis' : 'Métodos indisponíveis'}
                        </MorphingDialogSubtitle>
                        <div className='mt-4 space-y-5 text-sm text-gray-700'>
                           <p>Apenas são validos comprovativo Multicaxa Express e Bai Direct</p>
                           <Separator />
                           <b>Detalhes do pagamento</b>
                           <ul>
                              <li>Exame de Acesso - {now.getFullYear()}</li>
                           </ul>
                           <ul>
                              <li>{data?.title}</li>
                           </ul>
                           <ul>
                              <li>{data?.examePrice?.amount ?? 0}</li>
                           </ul>
                           <div>
                              <h3 className="text-lg font-medium mb-2">
                                 Cordenadas Bancárias da Univercidade
                              </h3>
                              {selectedAccount ? (
                                 <div className="text-sm text-gray-600 space-y-1">
                                    <p>Banco: {selectedAccount.bankName}</p>
                                    <p>Conta: {selectedAccount.accountName}</p>
                                    <p>Nº Conta: {selectedAccount.accountNumber}</p>
                                    <p>IBAN: {selectedAccount.iban}</p>
                                 </div>
                              ) : <p>Cordenadas bancarias não setadas</p>}

                           </div>
                           <div>
                              <h3 className="text-lg font-medium mb-2">
                                 Comprovativo de pagamento
                              </h3>

                              <input type="file" className="w-full" />
                           </div>
                        </div>
                     </div>
                  </div>
               </ScrollArea>
               <MorphingDialogClose className='text-zinc-500' />
            </MorphingDialogContent>
         </MorphingDialogContainer>
      </MorphingDialog>
   );
}
