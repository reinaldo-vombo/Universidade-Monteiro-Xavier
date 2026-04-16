import { useQuery } from '@tanstack/react-query';
import { Link } from 'gatsby';
import React from 'react'
import { api } from '../../../lib/services/api';
import { TAcademicFaculty } from '../../../types';
import AdmitionExameForm from '../../../forms/adimition-registration';
type TProps = {
   data: TAcademicFaculty[]
}
const RegisterPage = () => {
   const { data: result, isPending } = useQuery<TProps>({
      queryKey: ['facultys',],
      queryFn: () => api.unidades.list(),
      staleTime: 1000 * 60 * 2,
   })
   return (
      <div className=''>
         <div className="bg-[#0D0D0D] h-1/2 px-6 md:px-20 pt-36 pb-16">
            <Link
               to="/exames-de-acesso"
               className="text-xs tracking-widest text-white/40 uppercase hover:text-white/70
                                          transition-colors mb-10 inline-block"
            >
               ← Todos os registos
            </Link>

            <h1 className="text-5xl md:text-7xl font-light text-white leading-none tracking-tight">
               Exames de Acesso - 2025
            </h1>
            <p className="text-white/50 mt-6 text-lg font-light max-w-xl">
               Acompanha todas as fases do processo de candidatura e admissão.
            </p>
         </div>
         <div className='rounded-md border-card mt-16 p-4'>
            <AdmitionExameForm data={result?.data} />
         </div>
      </div>
   )
}

export default RegisterPage;
