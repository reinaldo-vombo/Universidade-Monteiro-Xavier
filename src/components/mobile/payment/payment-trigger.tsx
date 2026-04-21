import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const PaymentTrigger = ({ type }: { type: string }) => {
   return (
      <div className='flex items-center'>
         <div>
            {type === 'INVOICE' ?
               <StaticImage
                  src='../../../images/express-m.svg'
                  width={20}
                  height={20}
                  alt='Recibo de pagamento' />
               : type === 'REFERENCE'
                  ? <StaticImage
                     src='../../../images/reference.png'
                     width={20}
                     height={20}
                     alt='Pagamento por referencia' />
                  : <StaticImage
                     src='../../../images/qrcode.png'
                     width={20}
                     height={20}
                     alt='Pagamento por qrcode' />
            }
         </div>
         <div>
            <b>
               {type === 'INVOICE' ? 'Recibo'
                  : type === 'REFERENCE'
                     ? 'Referencia'
                     : 'QR code'
               }
            </b>
         </div>
      </div>
   )
}

export default PaymentTrigger;
