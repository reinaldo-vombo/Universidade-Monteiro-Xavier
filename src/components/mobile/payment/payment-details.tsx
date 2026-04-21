import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { TBankAccounte } from '../../../types'
import { clientEnv } from '../../../config/env'
import { Separator } from '../../ui/separator'
import AdmitionExamePaymentForm from '../../../forms/adimition-payment'
type TProps = {
   acoountInfo: TBankAccounte | null
   price: string
   candidateId: string
   paymentId: string

}
const now = new Date()
// const url = `${clientEnv.GATSBY_API_BASE_URL}/invoice/${}/candidate/${}`
const PaymentDetails = ({ acoountInfo, candidateId, paymentId, price }: TProps) => {
   return (
      <div className=''>
         <div className='flex'>
            <StaticImage
               src='../../../images/multicaixa.svg'
               className='m-auto'
               width={44}
               height={28}
               alt='Multicaixa' />
         </div>
         <div className='mt-4 space-y-5 text-sm text-gray-700'>
            <p>Apenas são validos comprovativo Multicaxa Express e Bai Direct</p>
            <Separator />
            <b>Detalhes do pagamento</b>
            <ul>
               <li>Exame de Acesso - {now.getFullYear()}</li>
            </ul>
            <ul>
               <li>{price}</li>
            </ul>
            <div>
               <h3 className="text-lg font-medium mb-2">
                  Cordenadas Bancárias da Univercidade
               </h3>
               {acoountInfo ? (
                  <div className="text-sm text-gray-600 space-y-1">
                     <p>Banco: {acoountInfo.bankName}</p>
                     <p>Conta: {acoountInfo.accountName}</p>
                     <p>Nº Conta: {acoountInfo.accountNumber}</p>
                     <p>IBAN: {acoountInfo.iban}</p>
                  </div>
               ) : <p>Cordenadas bancarias não setadas</p>}

            </div>
            <AdmitionExamePaymentForm candidateId={candidateId} paymentId={paymentId} />

         </div>
      </div>
   )
}

export default PaymentDetails
