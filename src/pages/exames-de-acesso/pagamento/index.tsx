import React, { useEffect, useState } from 'react'
import { useUrlParams } from '../../../lib/hooks/use-url-params';
import { useQueries, useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/services/api';
import PaymentSelect from '../../../components/layout/payment-select';
import { SEO } from '../../../components/seo';
import Banner from '../../../components/layout/banner';
import { useMediaQuery } from '../../../lib/hooks/use-media-query';
import PaymentLayout from '../../../components/mobile/payment/payment-layout';
import { navigate } from 'gatsby';

const PaymentPage = () => {
   const isDesktop = useMediaQuery("(min-width: 768px)");

   // ⛔ evita hydration mismatch
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   const {
      values,
   } = useUrlParams({
      exameId: '',
      candidateId: '',
      paymentId: '',
      totalAmout: ''
   })
   const { candidateId, exameId, paymentId, totalAmout } = values;

   if (!candidateId || !exameId || !paymentId || !totalAmout) {
      navigate('/exames-de-acesso/listas')
   }

   const { data: accounts } = useQuery({
      queryKey: ['bank-accounts'],
      queryFn: () => api.contas.all(),
      staleTime: 1000 * 60 * 10,
   });
   // console.log({ academicFculty, accounts });
   if (!mounted) return null;

   return (
      <div className='min-h-dvh'>
         <Banner title='Pagamento para Exames de Acesso - 2025' description=' Faça o pagamento para poder realizar o exame.' />

         {isDesktop ? (
            <div className="p-6 md:p-20">
               <p className="mb-6 text-lg">
                  Selecione um método de pagamento
               </p>
               <PaymentSelect
                  paymentId={values.paymentId}
                  amount={totalAmout}
                  candidateId={candidateId}
                  accounts={accounts}
                  exameId={exameId} />
            </div>

         ) : (<PaymentLayout
            accounts={accounts}
            exameId={exameId}
            paymentId={paymentId}
            amount={totalAmout}
            candidateId={candidateId}
         />
         )}

      </div>
   );
};

export default PaymentPage
export const Head = () => <SEO title='Pagamento Para Exame de Acesso' />