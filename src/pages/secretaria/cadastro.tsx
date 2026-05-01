import React from 'react'
import Banner from '../../components/layout/banner'
import FormStepper from '../../components/sections/form-stepper'
import { useQueries } from '@tanstack/react-query'
import { api } from '../../lib/services/api'
import { useUrlParams } from '../../lib/hooks/use-url-params'
import { SEO } from '../../components/seo'

const Cadastro = () => {
   const {
      values,
   } = useUrlParams({
      exameId: '',
      academicFacultyId: ''
   })
   const { academicFacultyId, exameId } = values;


   const results = useQueries({
      queries: [
         {
            queryKey: ['single-candidate', exameId],
            queryFn: () => api.exames.byExameId(exameId),
            staleTime: 1000 * 60 * 5,
            placeholderData: (prev: any) => prev,
         },
         {
            queryKey: ['sigle-department'],
            queryFn: () => api.departamentos.byFaculty({ academicFacultyId }),
            staleTime: 1000 * 60 * 10,
         },
      ],
   });

   // Desestruturar resultados
   const [sigleCandidateQuery, departmentsQuery] = results;


   const isLoading = results.some(q => q.isLoading);
   const isError = results.some(q => q.isError);

   if (isLoading) return <p>Carregando...</p>;
   if (isError) return <p>Erro ao carregar dados</p>;

   //   if(!sigleCandidateQuery.data) return

   return (
      <div>
         <Banner title='Cadastramento para aluno' subTitle='Secretaria' />
         <div className="container">
            {sigleCandidateQuery.data && (
               <FormStepper candidate={sigleCandidateQuery.data} department={departmentsQuery.data} />
            )}
         </div>
      </div>
   )
}

export default Cadastro;
export const Head = () => <SEO title='Cadastramento' />


