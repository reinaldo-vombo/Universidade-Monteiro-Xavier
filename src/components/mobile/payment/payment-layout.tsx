import React, { useState } from 'react'
import { TBankAccounte } from '../../../types'
import { Card, CardContent } from "../../ui/card"
import {
   Carousel as RootCarousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "../../ui/carousel"
import CreditCard from '../../credit-card'
import SheetModal from '../../shared/sheet-modal'
import PaymentTrigger from './payment-trigger'
import PaymentDetails from './payment-details'

type TProps = {
   accounts: TBankAccounte[] | undefined
   exameId: string
   amount: string
   candidateId: string
   paymentId: string
}
const PAYMENT_TYPE = ['INVOICE', 'REFERENCE', 'QR']
const PaymentLayout = ({ accounts, exameId, amount, candidateId, paymentId }: TProps) => {
   const [selectedAccount, setSelectedAccount] = useState<TBankAccounte | null>(null)
   return (
      <div>
         <RootCarousel className="w-full max-w-full sm:max-w-xs">
            <CarouselContent className='bg-transparent'>
               {accounts && accounts.map((account, index) => (
                  <CarouselItem key={index}>
                     <div className="p-1">
                        <Card>
                           <CardContent className="flex bg-transparent aspect-square items-center justify-center p-0">
                              <CreditCard data={account} setSelectedAccount={setSelectedAccount} />
                           </CardContent>
                        </Card>
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </RootCarousel>
         <div className='container space-y-5'>
            <p className='text-center'>Selecione o metodo de pagamento</p>
            {PAYMENT_TYPE.map((type) => {
               const isDisabled =
                  !exameId || selectedAccount === null || type === "REFERENCE" || type === "QR";
               return (
                  <div className='px-6'>
                     <SheetModal
                        side='bottom'
                        key={type}
                        title='Pagamento'
                        triggerStyle='w-full p-8'
                        className='h-full sm:max-w-full'
                        disabled={isDisabled}
                        triggerVariante='outline'
                        trigger={<PaymentTrigger type={type} />}
                        children={<PaymentDetails
                           acoountInfo={selectedAccount}
                           candidateId={candidateId} paymentId={paymentId} price={amount} />
                        }
                     />

                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default PaymentLayout;

