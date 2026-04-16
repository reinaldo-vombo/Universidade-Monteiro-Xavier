import React from 'react'
import { useUrlParams } from '../../../lib/hooks/use-url-params';
import { TAcademicFaculty, TSigleFaculty } from '../../../types';
import { useQueries, useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/services/api';
import { PaymentCard } from '../../../components/layout/payment-card';
import Accounts from '../../../components/layout/accounts';
import PaymentSelect from '../../../components/layout/payment-select';
import { SEO } from '../../../components/seo';

type TProps = {
   data: TAcademicFaculty
}

const PaymentPage = () => {
   const {
      values,
   } = useUrlParams({
      exameId: '',
      academicFalcultyId: '',
   })

   // const { data: faculty, isPending } = useQuery<TSigleFaculty>({
   //    queryKey: ['academic-faculty', values.exameId, values.academicFalcultyId],
   //    queryFn: () => api.unidades.byId(values.academicFalcultyId),
   //    staleTime: 1000 * 60 * 2,
   //    placeholderData: (prev) => prev,
   // })
   const results = useQueries({
      queries: [
         {
            queryKey: ['academic-faculty', values.exameId, values.academicFalcultyId],
            queryFn: () => api.unidades.byId(values.academicFalcultyId),
            staleTime: 1000 * 60 * 10,
         },
         {
            queryKey: ['bank-accounts'],
            queryFn: () => api.contas.all(),
            staleTime: 1000 * 60 * 10,
         },
      ],
   });
   const [academicFculty, accounts] = results;
   // console.log({ academicFculty, accounts });


   return (
      <div>
         {/* HERO */}
         <div className="bg-[#0D0D0D] px-6 md:px-20 pt-36 pb-16">
            <h1 className="text-5xl md:text-7xl font-light text-white">
               Pagamento para Exames de Acesso - 2025
            </h1>

            <p className="text-white/50 mt-6 text-lg max-w-xl">
               Faça o pagamento para poder realizar o exame.
            </p>
         </div>

         {/* PAYMENT METHODS */}
         <div className="p-6 md:p-20">
            <p className="mb-6 text-lg">
               Selecione um método de pagamento
            </p>

            <PaymentSelect academicFculty={academicFculty.data} accounts={accounts.data} exameId={values.exameId} />
         </div>
      </div>
   );
};

export default PaymentPage
export const Head = () => <SEO title='Pagamento Para Exame de Acesso' />